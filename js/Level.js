/*global stampit,
Water, Land, Grass, Rock, Palm, Player, Box, WetBox, Vector*/

//level describes the configuration of the playing field
const Level = stampit.compose({
  //is constructed in the level store, parses the level format
  init({ name, dim, field }) {
    //copy fields
    this.name = name
    this.dim = dim
    this.field = field

    //normalize input
    this.normalize()

    //apply padding to field
    this.applyPadding()

    //parse the field into tiles and floating objects
    this.parseField()
  },

  statics: {
    //mapping from position descriptors to tile classes
    positionDescriptorMapping: {
      //first field is always the tile type
      tiles: {
        w: Water,
        l: Land,
        g: Grass
      },

      //all following fields are the floating objects and the player
      objs: {
        r: Rock,
        p: Palm,
        pl: Player,
        b: Box,
        wb: WetBox,
        /*bw: WetBox,
        h: Goal, //h for house
        t: Teleporter,
        wh: WaterHole,
        sh: SeedHole,
        s: Seed,
        wb: WaterBottle,
        sp: Spring,
        st: Starfish,
        sp: Spikes,
        sb: SpikeButton
        sl: Slingshot,
        pb: Pebble,
        c: Coconut,
        ch: CoconutHole*/
      }
    },

    //returns a padding position descriptor or an array of them
    getPadding(length) {
      //make array if length set as positive number
      if (typeof length === "number" && length >= 1) {
        //init array to fill
        const arr = []

        //fill with specified number of positions
        for (let i = 0; i < length; i ++) {
          arr[i] = Level.getPadding()
        }

        //return filled array
        return arr
      } else {
        //single position
        return ["w"]
      }
    },

    //describes the bounds to check for water
    waterBounds(fieldDim) {
      return [
        {
          start: Vector({ x: 0, y: 0 }),
          dir: Vector({ x: 1, y: 0 }),
          length: fieldDim.x
        },
        {
          start: Vector({ x: fieldDim.x - 1, y: 0 }),
          dir: Vector({ x: 0, y: 1 }),
          length: fieldDim.y
        },
        {
          start: Vector({ x: 0, y: fieldDim.y - 1 }),
          dir: Vector({ x: 1, y: 0 }),
          length: fieldDim.x
        },
        {
          start: Vector({ x: 0, y: 0 }),
          dir: Vector({ x: 0, y: 1 }),
          length: fieldDim.y
        }
      ]
    }
  },

  methods: {
    //normalizes input format
    normalize() {
      //parse fields, split into arrays if seperated with delimiter
      if (typeof this.field === "string") {
        //split on any non alphanumeric char sequence
        this.field = this.field.split(/[^a-zA-Z0-9]+/)
      }

      //must be array at this point
      if (! (this.field instanceof Array)) {
        throw Error("fields must be a string or array")
      }

      //make dim a vector if not one already
      if (typeof this.dim === "number") {
        this.dim = Vector(this.dim, this.dim)
      } else if (! this.dim) {
        //make null vector, will be adjusted later
        this.dim = Vector()
      }

      //parse 2d field
      this.field = this.field
      //must be array or string
      .filter(line => typeof line === "string" || line instanceof Array)

      //split into individual positions if element is string
      .map(line => {
        //if line is string, split into chars
        if (typeof line === "string") {
          line = line.split("")
        }

        //process line, split all remaining strings into chars and wrap
        return line.reduce((arr, item) => {
          //for type of line item
          if (typeof item === "string") {
            //split into chars and wrap into arrays and add individually
            return arr.concat(item.split("").map(c => [c]))
          } else if (item instanceof Array) {
            //push array as whole right away
            arr.push(item)

            //return expanded array
            return arr
          } else {
            throw Error("line items must be a string or array")
          }
        }, [])
      })
    },

    //applies padding to the field
    applyPadding() {
      //determine size of the field
      const fieldDim = Vector({
        x: this.field.reduce((max, line) => Math.max(max, line.length), 0),
        y: this.field.length
      })

      //flag that is set if padding needs to be done
      let needsPadding = false

      //flag is set to true if we need to check that all bounds are water
      let checkWaterBounds = false

      //if field is larger or already at than specified size
      if (fieldDim.x >= this.dim.x) {
        //"stretch" dim to fit field
        this.dim.x = fieldDim.x

        //set flag for checking bounds
        checkWaterBounds = true
      } else {
        //set padding necessary flag
        needsPadding = true
      }
      if (fieldDim.y >= this.dim.y) {
        this.dim.y = fieldDim.y
        checkWaterBounds = true
      } else {
        //set padding necessary flag
        needsPadding = true
      }

      //total padding needed on axis, divide by 2 for the padding needed on each side
      const sidePadding = Vector({
        x: this.dim.x - fieldDim.x,
        y: this.dim.y - fieldDim.y
      }).mult(0.5)

      //split padding into pre and post padding on both axis
      const prePadding = Vector({
        x: Math.floor(sidePadding.x),
        y: Math.floor(sidePadding.y)
      })
      const postPadding = Vector({
        x: Math.ceil(sidePadding.x),
        y: Math.ceil(sidePadding.y)
      })

      //check water bounds if requested
      if (checkWaterBounds) {
        //set of padding in directions
        const directionPaddingAccessors = [
          { o: prePadding, p: "y" },
          { o: postPadding, p: "x" },
          { o: postPadding, p: "y" },
          { o: prePadding, p: "x" }
        ].map(descr => value => {
          //map to fucntion that sets value and returns value
          if (typeof value === "number") {
            descr.o[descr.p] += value

            //also apply to dim
            this.dim[descr.p] += value
          }

          //return current
          return descr.o[descr.p]
        })

        //for all bounds get padding
        checkWaterBounds = Level.waterBounds(fieldDim)

        //calc water padding with bounds
        .map((bound, index) => {
          //dont check for padding if we already have normal padding here
          if (directionPaddingAccessors[index]()) {
            return false
          }

          //current check position
          const pos = bound.start.getNew()

          //checking position index (index in bound)
          let i = 0

          //check bound until end or until non water found
          while (i++ < bound.length - 1) {
            //check for non water
            if (this.field[pos.y][pos.x][0] !== "w") {
              //found non water, need padding for this bound
              return true
            }

            //add increment vector to position for next position
            pos.add(bound.dir)
          }

          //no non-water found, needs to padding
          return false
        })

        //apply and check for presence of water padding
        .reduce((needsWaterPadding, padding, index) => {
          //if water padding determined to be needed
          if (padding) {
            //add to normal padding
            directionPaddingAccessors[index](1)
          }

          //no padding needed for water if already padding for size or no water padding needed
          return needsWaterPadding || padding
        }, false)
      }

      //if padding is necessary
      if (needsPadding || checkWaterBounds) {
        //apply post padding and fill out any uneven lines
        for (let y = 0; y < fieldDim.y + postPadding.y; y ++) {
          //if line doesn't exist, create it
          if (! this.field[y]) {
            this.field[y] = [];
          }

          //get the current line
          const line = this.field[y];

          //for every needed position in x direction
          for (let x = 0; x < fieldDim.x + postPadding.x; x ++) {
            //make padding if not present
            if (! line[x]) {
              line[x] = Level.getPadding();
            }
          }
        }

        //if there is any pre x padding
        if (prePadding.x) {
          //add pre x padding, for every present line
          for (let y = 0; y < this.field.length; y ++) {
            //prepend prePadding length of padding
            this.field[y] = Level.getPadding(prePadding.x).concat(this.field[y])
          }
        }

        //if there is any pre y padding
        if (prePadding.y) {
          //prepare array of padding lines
          const padding = []

          //for all pre padding lines
          for (let y = 0; y < prePadding.y; y ++) {
            //make full width padding line
            padding[y] = Level.getPadding(this.dim.x)
          }

          //prepend all padding lines to field
          this.field = padding.concat(this.field);
        }
      }
    },

    //parses the field into tiles and floating objects
    parseField() {
      //init empty list of tiles for better iteration
      this.tileList = []

      //for all positions of the field
      this.tiles = this.field.map((line, y) => line.map((position, x) => {
        //get mapped tile factory from mapping
        const tileMaker = Level.positionDescriptorMapping.tiles[position[0]]

        //verify presence (that abbreviation in level description is valid)
        if (! tileMaker) {
          throw Error("tile abbrev given in level description is invalid")
        }

        //make new tile with class gotten from mapping
        const tile = tileMaker({ x, y, level: this })

        //if objects specified
        if (position.length > 1) {
          //make objects
          const objs = position.map((objAbbrev, index) => {
            //not on first elem, that is the tile abbrev
            if (! index) {
              return
            }

            //get obj factory, select from obj mapping
            const objMaker = Level.positionDescriptorMapping.objs[objAbbrev]

            //check for validity
            if (! objMaker) {
              throw Error("obj abbrev given in level description is invalid")
            }

            //create object of given class
            const obj = objMaker()

            //if is player instance
            if (obj instanceof Player) {
              //register as _the_ player
              this.player = obj
            }

            //return created object
            return obj
          })

          //remove first (is empty and not processed, is the tile itself)
          objs.shift()

          //add all objs to tile in init mode
          tile.addFloatingObj(objs, true)
        }

        //also add tile to linear list of tiles for non position specific iteration
        this.tileList.push(tile)

        //return generated tile
        return tile
      }));
    },

    //adds all tiles to the given table
    initInTable(table) {
      //empty present contents of table
      table.empty()

      //add a table row
      const row = $("<tr>").appendTo(table)

      //add item to row
      const item = $("<td>").appendTo(row)

      //clone column w - 1 times
      for (let i = 1; i < this.dim.x; i ++) {
        //add a item clone and set correct x pos
        row.append(item.clone().addClass("col-" + i))
      }

      //set class for first item
      item.addClass("col-0")

      //clone whole row h - 1 times
      for (let i = 1; i < this.dim.y; i ++) {
        //add cloned row and set correct y pos
        table.append(row.clone().addClass("row-" + i))
      }

      //set class for first row
      row.addClass("row-0")

      //simply iterate and call method on each tile
      this.tileList.forEach(tile => tile.initDisplay(this, table))

      //set min width of table to current width to prevent squishing
      table.css("min-width", table[0].offsetWidth)
    },

    //returns the tile at the given position
    getTileAt(at) {
      //init has to be finished at this point as init happens in instantiation

      //check to be in bounds
      if (at.x >= 0 && at.x < this.dim.x && at.y >= 0 && at.y < this.dim.y) {
        //return tile at 2d position
        return this.tiles[at.y][at.x]
      } else {
        //return false, is checked by caller and handled accordingly
        return false
      }
    }
  }
})