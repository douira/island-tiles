/*global stampit*/
//Note: props is apparently shared among all instances of a stamp

//Vector class represents a 2D position
const Vector = stampit.compose({
  //makes a vector from two numbers
  init({ x = 0, y = 0 }) {
    //use 0 if not given
    this.x = x
    this.y = y
  },

  methods: {
    //can be moved in directions
    add({ x = 0, y = 0 }) {
      //must be numbers
      if (typeof x !== "number" || typeof y !== "number") {
        throw Error("vector add params must be numbers");
      }

      //add to own values
      this.x += x
      this.y += y

      //chaining
      return this
    },

    //multiply by a scalar
    mult(scalar) {
      //must be number
      if (typeof scalar !== "number") {
        throw Error("scalar in vector mult must be number")
      }

      //multiply both components
      this.x *= scalar
      this.y *= scalar

      //chaining
      return this
    },

    //gets a new instace of this vector
    getNew() {
      //construct new vector with same values
      return Vector(this)
    }
  },

  statics: {
    //statically add vectors and create a new vector
    add(v1, v2) {
      //return vector with components added
      return Vector({ x: v1.x + v2.x, y: v1.y + v2.y })
    }
  }
})

//handles rendering of a tile
const Displayable = stampit.compose({
  //default tile name
  props: {
    tileType: "NotExtended!"
  },

  statics: {
    //returns the attribute value for a given image name
    makeImgAttrib(forName) {
      return "tiles/" + forName + ".png"
    }
  },

  methods: {
    //generates a dom object for this tile; an image element
    getImgElem() {
      //if image name is an array
      if (this.imageName instanceof Array) {
        //on lengths of array
        if (! this.imageName.length) {
          //error for missing
          throw Error("no image names given in array of names")
        } else if (this.imageName.length === 1) {
          //choose the only one
          this.imageName = this.imageName[0]
        } else {
          //choose one at random
          this.imageName = this.imageName[Math.floor(Math.random() * this.imageName.length)]
        }
      } else if (! this.imageName) {
        throw Error(
          "must pass image name or call calcImageName to generate before getting img element"
        )
      }

      //check that img element doesn't exist yet
      if (! this.elem) {
        //img elem attribs
        const attribs = {
          class: "tile",
          src: Displayable.makeImgAttrib(this.imageName)
        }

        //check if present, and call get tile id (present on terrain tiles)
        if (this.getTileIdAttrib) {
          attribs.id = this.getTileIdAttrib()
        }

        //generate new with prepared attribs
        this.elem = $("<img>", attribs)
      }

      //return current element
      return this.elem
    },

    //updates the display image with a given new image name
    changeImageName(newImageName) {
      //stop if image name didn't actually change
      if (newImageName === this.imageName) {
        return
      }

      //set new as image name
      this.imageName = newImageName

      //set a new name in the img element
      this.elem.attr("src", Displayable.makeImgAttrib(this.imageName))
    }
  }
})

//a terrain tile is a displayable tile that can have objects on it
const Terrain = Displayable.compose(Vector, {
  init() {
    //starts off with empty list of floating objects
    this.objs = []
  },

  methods: {
    //update order of floating objects
    updateObjOrder(needsEmpty) {
      //if flag not set, empty container first
      if (! needsEmpty) {
        //empty without destroying contained elements (but leave terrain)
        this.tableCellElem.children().slice(1).detach()
      }

      //add img elem to that table cell
      this.tableCellElem.append(this.getImgElem())

      //add image elements for all child objects
      this.objs.forEach(o => o.addToCell(this.tableCellElem))
    },

    //sets itself up in the specified position in the given table
    //doesn't do anything if it's already set up
    initDisplay(level, table) {
      //update image name with tile config
      if (this.calcImageName) {
        this.calcImageName(level)
      }

      //get td of this position
      this.tableCellElem = table.children(".row-" + this.y).children(".col-" + this.x)

      //sort floating objects for display
      this.sortObjs()

      //update elements in tile container, newly created and needs no emptying
      this.updateObjOrder(true)
    },

    //returns id to be put on non moving img element
    getTileIdAttrib() {
      return "tile" + this.x + "-" + this.y
    },

    //adds a floating object to this tile
    addFloatingObj(objs, isInit) {
      //if given array, call on each element given
      if (objs instanceof Array) {
        //call on each
        objs.forEach(o => this.addFloatingObj(o, isInit))

        //stop, already processed
        return
      }

      //attach self as parent
      objs.parent = this

      //set position to own position
      objs.x = this.x
      objs.y = this.y

      //add to list of floating objects
      this.objs.push(objs)

      //dont sort if in init
      if (! isInit) {
        this.sortObjs()
      }
    },

    //sorts the floating objects by height priority
    sortObjs() {
      //sort list of objects by their height priority
      this.objs.sort((a, b) => b.heightPrio - a.heightPrio)
    },

    //remove given object from array of objects, will remove its dom element on its own
    removeFloatingObj(obj) {
      //remove from array
      this.objs.splice(this.objs.indexOf(obj), 1)
    },

    //by default, ask all contained objects in order of display order
    checkMove(movement, actors) {
      //first check tile requirements
      if (this.checkMoveTerrain && ! this.checkMoveTerrain(movement, actors)) {
        //stop right away, terrain tile disallows movement
        return false
      }

      //check objects, the last movement reponse that is returned is used
      const moveResponse = this.objs.reduce((response, ownObj) => {
        //if object has to be checked at all
        if (ownObj.checkMove) {
          //get result from floating object
          const result = ownObj.checkMove(movement, actors)

          //set as new response if result is falsy or
          //if current response is truthy and result is object (movement directive)
          if (! result || response && typeof result === "object") {
            response = result
          }
        }

        //return reponse
        return response
      }, true)

      //notify objects that movement is actually happening
      this.objs.forEach(ownObj => ownObj.notifyMove && ownObj.notifyMove(movement, actors))

      //return reponse
      return moveResponse
    }
  }
})

//neighbour offsets translate own position into the position of a neighbour
//map from direction to offset vector
const directionOffsets = [
  Vector({ x: 0, y: -1 }),
  Vector({ x: 1, y: 0 }),
  Vector({ x: 0, y: 1 }),
  Vector({ x: -1, y: 0 })
]

//RoundedTile does calculations regarding corners and edges for grass and land tiles
const RoundedTerrain = Terrain.compose({
  //is given a image name map for all the different positions
  //pass true as insideTypes to accept only self as inside,
  //pass falsy to accept all except for field borders

  statics: {
    //maps from neighbourhood configs to imageNameMap names,
    //i for inside type, o for outside type tiles (first is top going clockwise)
    neighbourConfigNameMap: {
      iiii: "center",
      oooo: "edgeAll",
      ioio: "edgeVertical",
      oioi: "edgeHorizontal",
      ooii: "rightTop",
      iooi: "rightBottom",
      iioo: "leftBottom",
      oiio: "leftTop",
      oiii: "edgeTop",
      ioii: "edgeRight",
      iioi: "edgeBottom",
      iiio: "edgeLeft",
      iooo: "onlyTop",
      oioo: "onlyRight",
      ooio: "onlyBottom",
      oooi: "onlyLeft"
    }
  },

  //determine image name from surrouding tile types
  methods: {
    calcImageName(level) {
      //for all possible neighbour positions, determine inside or outside status
      const neighbourConfig = directionOffsets.map(offset => {
        //get tile at neighbour position
        const neighbourTile = level.getTileAt(Vector.add(this, offset))

        //if tile doesn't exist: border of field, automatically outside
        if (! neighbourTile) {
          return "o"
        }

        //get tile at offsetted position and check if one of the inside classes or same class
        //do not check if none given (accept all as inside)
        return (
          ! this.insideTypes ||
          neighbourTile.tileType === this.tileType ||
          this.insideTypes.length && this.insideTypes.includes(neighbourTile.tileType)
        ) ? "i" : "o"
      }).join("")

      //set from name map and choose base image if special one not present
      this.imageName = this.imageNameMap[
        //get name in image name map from neighbourhoodNameMap,
        //choose center if unknown neighbour config
        RoundedTerrain.neighbourConfigNameMap[neighbourConfig] || "center"
      ] || this.imageNameMap.center
    }
  }
})

//disallows walking on the tile if this object is on it
const NonWalkableObject = stampit.methods({
  //disallow putting things on this by default, called to check if something can move onto this
  checkMove() {
    return false
  }
})

//disallows walking on this terrain tile
//terrain is walkable if checkMoveTerrain not present
const NonWalkableTerrain = stampit.methods({
  //disallow walking on terrain tile before checking objects
  checkMoveTerrain() {
    return false
  }
})

//always walkable object
const WalkableObject = stampit.methods({
  //always allow walking on
  checkMove() {
    return true
  }
})

//the Land tile
const Land = RoundedTerrain.props({
  tileType: "Land",
  imageNameMap: {
    center: "land",
    rightTop: "land-corner-rt",
    rightBottom: "land-corner-rb",
    leftBottom: "land-corner-lb",
    leftTop: "land-corner-lt",
    edgeTop: "land-edge-t",
    edgeRight: "land-edge-r",
    edgeBottom: "land-edge-b",
    edgeLeft: "land-edge-l",
    edgeVertical: "land-edge-v",
    edgeHorizontal: "land-edge-h",
    edgeAll: "land-edge-all",
    onlyTop: "land-only-t",
    onlyRight: "land-only-r",
    onlyBottom: "land-only-b",
    onlyLeft: "land-only-l"
  },
  insideTypes: ["Grass"]
})

//the Grass tile
const Grass = RoundedTerrain.compose({
  //configuration
  props: {
    tileType: "Grass",
    imageNameMap: {
      center: "grass",
      rightTop: "grass-corner-rt",
      rightBottom: "grass-corner-rb",
      leftBottom: "grass-corner-lb",
      leftTop: "grass-corner-lt",
      edgeTop: "grass-edge-t",
      edgeRight: "grass-edge-r",
      edgeBottom: "grass-edge-b",
      edgeLeft: "grass-edge-l",
      onlyRight: "grass-corner-lb",
      onlyLeft: "grass-corner-rb"
    },
    insideTypes: true
  },

  methods: {
    //disallow movement not from spring
    checkMoveTerrain(movement, actors) {
      //return false if initiator is not of type spring
      return actors.initiator.tileType === "Spring"
    }
  }
})

//the Water tile
const Water = RoundedTerrain.compose(NonWalkableTerrain).props({
  tileType: "Water",
  imageNameMap: {
    center: ["water-1", "water-2", "water-3"],
    edgeTop: "water-border-t",
    rightTop: "water-border-t",
    leftTop: "water-border-corner",
    edgeLeft: "water-border-l",
    leftBottom: "water-border-l"
  },
  insideTypes: false
})

//a basic object that can be on top of a terrain tile
const FloatingObject = Displayable.compose(Vector).methods({
  //adds the image element for this object to the given table cell
  addToCell(cell) {
    //get img element and save for moving round
    this.imgElem = this.getImgElem()

    //add to cell given
    cell.append(this.imgElem)
  },

  //moves the object to another tile
  moveToTile(newTile) {
    //if this object is in a tile
    if (this.parent) {
      //remove from parent
      this.parent.removeFloatingObj(this)
    }

    //add to object list of new parent tile (will set tile prop in this)
    newTile.addFloatingObj(this)

    //add to table cell of new parent
    this.addToCell(this.parent.tableCellElem)
  }
})

//rock tile is stationary
const Rock = FloatingObject.compose(NonWalkableObject).props({
  //init with image name
  tileType: "Rock",
  imageName: ["rock-1", "rock-2"],

  //low height prio, isn't on top of anything
  heightPrio: 0
})

//Palm tile is stationary
const Palm = FloatingObject.compose(NonWalkableObject).props({
  //init with image name
  tileType: "Palm",
  heightPrio: 0,
  imageName: ["palm-1", "palm-2"]
})

//map from key codes for WASD and arrow keys to directions
const keyCodeDirections = {
  //WASD
  87: 0,
  68: 1,
  83: 2,
  65: 3,

  //up, right, down, left
  38: 0,
  39: 1,
  40: 2,
  37: 3
}

//represents the player, controllable and deals with interaction
const Player = FloatingObject.compose(NonWalkableObject).compose({
  //set image name
  props: {
    tileType: "Player",
    heightPrio: 100
  },

  //image names for directions
  statics: {
    directionImageNames: [
      "player-t",
      "player-r",
      "player-b",
      "player-l"
    ]
  },

  //init registers event handlers
  init({ level }) {
    //current tile name
    this.imageName = "player-t"

    //needs to save level
    this.level = level

    //register key interaction handler
    $(document).keydown((function(e) {
      //if not present, we don't care about pressing this key
      if (! (e.which in keyCodeDirections)) {
        return
      }

      //prevent default action of moving the page or similar
      e.preventDefault()

      //get key direction
      const keyDirection = keyCodeDirections[e.which]

      //try to move with offset vector for this direction
      this.move({ offset: directionOffsets[keyDirection], direction: keyDirection }, this)
    }).bind(this));
  },

  methods: {
    //called when the player should move in that direction (movement vector)
    move(movement, initiator) {
      //update to face in that direction
      this.changeImageName(Player.directionImageNames[movement.direction])

      //get target (destination tile)
      const targetTile = this.level.getTileAt(Vector.add(this, movement.offset))

      //do not move if no tile present (border of playing field)
      if (targetTile) {
        //check if target tile is ok with movement to it
        const response = targetTile.checkMove(movement, { subject: this, initiator })

        //if reponse is truthy, proceed with movement
        if (response) {
          //do movement to target tile
          this.moveToTile(targetTile)
        }
      }
    }
  }
})

//mapping from position descriptors to tile classes
const positionDescriptorMapping = {
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
    /*bw: WetBox,
    h: Goal, //h for house
    b: Box,
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
}

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
        const tileMaker = positionDescriptorMapping.tiles[position[0]]

        //verify presence (that abbreviation in level description is valid)
        if (! tileMaker) {
          throw Error("tile abbrev given in level description is invalid")
        }

        //make new tile with class gotten from mapping
        const tile = tileMaker({ x, y})

        //if objects specified
        if (position.length > 1) {
          //make objects
          const objs = position.map((objAbbrev, index) => {
            //not on first elem, that is the tile abbrev
            if (! index) {
              return
            }

            //get obj factory, select from obj mapping
            const objMaker = positionDescriptorMapping.objs[objAbbrev]

            //check for validity
            if (! objMaker) {
              throw Error("obj abbrev given in level description is invalid")
            }

            //create object of given class
            const obj = objMaker({ level: this })

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

//the game object has a field of tiles
const Game = stampit.compose({
  //constructed with a level object
  init({ level }) {
    //get display table
    this.table = $(".field")

    //save level
    this.level = level

    //setup level in table
    this.level.initInTable(this.table)
  }
})

//game level definitions, is padded with water if field is smaller than specified size
const levels = [
  Level({
    name: "Mahkilaki",
    //dim: Vector({ x: 20, y: 12 }),
    field: [
      "wwlllllw",
      ["wllggg", ["l", "r"], ["l", "p"]],
      "wllgggll",
      ["wlll", ["l", "pl"], "lll"],
      "wlllwwww"
    ]
  })
]

//when document is present
$(document).ready(function() {
  //make a game with the first level
  Game({ level: levels[0] })
});
