/*global Water, Land, Grass, Rock, Palm, Player, Box, WetBox,
Vector, Goal, Starfish, MommyCrab, BabyCrab, Displayable,
Seed, SeedHole, WaterHole, WaterBottle, Spring, Teleporter, RedTeleporter,
UnknownObject, Figure, Cross, UnknownTerrain, Bomb, BombTrigger,
Buoy, Spikes, SpikesButton, Ice, Pearl, PearlPedestal, Tablet,
Key, Coin, Chest, Pebble, Slingshot, Coconut, CoconutHole, Leaf,
Clam, Barrel, BarrelBase, CoconutPath, CoconutPathTarget, Raft,
Pirate, PirateHut, LeafSwitcher, RevealEye, HiddenPath, ShellGuy,
ShellGuySign, Flower, FlowerSeed, Squid, SmallFlower, FlowerAnchor*/

//handles animation
const AnimationQueue = stampit.compose({
  statics: {
    actionTypeTimes: {
      //interval times for player interaction and normal animation
      interaction: 0,
      animation: 100,
      slowAnimation: 300,
      longAnimation: 600,
    },
  },

  //init with parent level
  init({ level }) {
    this.level = level

    //queue of animation actions
    this.queue = []

    //action timeout lock has to be taken before actions are performed
    this.lock = false
  },

  methods: {
    //registers a new animation action
    registerAction(
      action,
      { delay = -1, actionType = "animation", priority = 0 } = {}
    ) {
      //add to queue
      this.queue.push({
        action,

        //use delay if given, resolve delay time with action type otherwise
        delay:
          delay === -1 ? AnimationQueue.actionTypeTimes[actionType] : delay,

        //use given priority (which defaults to 0)
        //we rely on the fact that sorting with the same priority keeps the items in the same order
        //(although this may not be the case in all environments, it is in most)
        priority,
      })

      //check if the lock hasn't been taken
      if (!this.lock) {
        //perform action now
        this.doAction()
      }
    },

    //do the top most action and take a lock for a action interval
    doAction() {
      //if anything to be done left
      if (this.queue.length) {
        //take lock
        this.lock = true

        //if more than one item present
        if (this.queue.length > 1) {
          //sort by priority, highest priority should be first in array
          this.queue.sort((a, b) => b.priority - a.priority)
        }

        //get item from queue
        const actionDescriptor = this.queue.shift()

        //do next action check in interval time (keep lock until done)
        setTimeout(() => {
          //execute action
          actionDescriptor.action()

          //and check for more actions
          this.doAction()
        }, actionDescriptor.delay)
      } else {
        //release lock as nothing is being processed
        this.lock = false
      }
    },
  },
})

//order of declaration
let Level

//keeps track of the inventory
const Inventory = stampit.compose({
  statics: {
    //list of item image names
    itemDisplayInfo: {},
  },

  //init itemDisplayInfo with all items from positionDescriptorMap
  init() {
    //if not filled already
    if (!Object.keys(Inventory.itemDisplayInfo).length) {
      //for all objects
      for (const objAbbrev in Level.positionDescriptorMap.objects) {
        //get constructor of object
        const constructor = Level.positionDescriptorMap.objects[objAbbrev]

        //if image name is attached statically, this is a item
        if (constructor.imageName) {
          //register image name
          Inventory.itemDisplayInfo[constructor.tileType] =
            constructor.imageName
        }
      }
    }
  },

  methods: {
    //called after all objects are created
    setup({ tileList, itemDisplayElem }) {
      //init item list
      this.items = {}

      //counts number of present item objects
      this.initItems = {}

      //count all objects
      tileList.forEach(tile =>
        tile.objects.forEach(o => {
          //increment if object is item
          if (o.isItem) {
            //add to type of item
            this.initItems[o.tileType] = (this.initItems[o.tileType] || 0) + 1
          }
        })
      )

      //save display element
      this.itemDisplayElem = itemDisplayElem

      //initial update of item display
      this.updateItemDisplay()
    },

    //updates the item inventory display
    updateItemDisplay() {
      //empty dispaly item list
      this.itemDisplayElem.empty()

      //array of list items to create
      const sortList = []

      //for all item entries
      for (const itemName in this.items) {
        //get item amount
        const itemAmount = this.items[itemName]

        //if any items present
        if (itemAmount) {
          //add to sort list with mapped name (from tile type to image name)
          sortList.push({
            name: itemName,
            amount: itemAmount,
          })
        }
      }

      //if any items present
      if (sortList.length) {
        //sort list of present items by amount
        sortList
          .sort((a, b) => a.amount - b.amount)

          //and for all list items
          .forEach(item => {
            //create displayable instance
            const displayer = Displayable()

            //set image name on displayer
            displayer.imageName = Inventory.itemDisplayInfo[item.name]

            //add a display item to the display list
            this.itemDisplayElem.append(
              //with a span that has an amount and an image of the item tile
              $("<span>").append(item.amount).append(displayer.getImgElem())
            )
          })
      } else {
        //add no items message
        this.itemDisplayElem.append(
          $("<div>", {
            text: "No Items",
            id: "no-items-msg",
          })
        )
      }
    },

    //adds an item of the given name to the item store
    addItems(itemName, amount = 1) {
      //create empty entry if not present and add amount
      this.items[itemName] = (this.items[itemName] || 0) + amount

      //if non null change, update display
      if (amount > 0) {
        this.updateItemDisplay()
      }
    },

    //take out the specified amount (or all) items of the given name
    takeItems(itemName, amount = 1) {
      //init with at least 0
      this.items[itemName] = this.items[itemName] || 0

      //if amount is "all", give all items
      if (amount === "all") {
        //get number of present items
        const present = this.items[itemName]

        //remove from inventory
        this.items[itemName] = 0

        //if change made a difference
        if (present > 0) {
          //update display of items
          this.updateItemDisplay()
        }

        //return amount gotten
        return present
      } else if (amount > this.items[itemName]) {
        //return falsy (0) if more requested than present
        return 0
      } else {
        //decrement number of items by amount
        this.items[itemName] -= amount

        //update display if change happened
        if (amount > 0) {
          this.updateItemDisplay()
        }

        //return requested amount
        return amount
      }
    },
  },
})

//registry keeps track of registered objects
const Registry = stampit.compose({
  init() {
    //init object for lists
    this.objects = {}
  },

  methods: {
    //registers an object of given type
    register(obj) {
      //add this obj to the list
      this.getOfType(obj).push(obj)
    },

    //removes this object from its list, on removal of object
    unregister(obj) {
      //find and remove at index
      const list = this.getOfType(obj)
      list.splice(list.indexOf(obj), 1)
    },

    //gets list of objects for given type
    getOfType(typeOrInstance) {
      //extract type of object
      const type =
        typeof typeOrInstance === "string"
          ? typeOrInstance
          : typeOrInstance.tileType

      //create list of this type if not present
      if (!this.objects[type]) {
        this.objects[type] = []
      }

      //return list
      return this.objects[type]
    },

    //returns all other objects of the object's type
    getOthers(forObj) {
      //get list of objects for this type and filter out the given one
      const otherobjects = this.getOfType(forObj).filter(o => o !== forObj)

      //return if non-empty, falsy otherwise
      if (otherobjects.length) {
        return otherobjects
      }
    },

    //returns the next teleporter for a given teleporter in the list
    getNext(forObj) {
      //get list of objects for this type
      const objects = this.getOfType(forObj)

      //stop if none registered
      if (!objects.length) {
        //returns falsy because not present
        return
      }

      //get index of obj in list of objects
      const index = objects.indexOf(forObj)

      //if is number and not -1 (found)
      if (typeof index === "number" && index >= 0) {
        //return object at next index, wrap around
        return objects[(index + 1) % objects.length]
      } //else returns falsy
    },
  },
})

//level describes the configuration of the playing field
Level = stampit.compose({
  //is constructed in the level store, parses the level format
  init({ name, dim, field, noPadding }) {
    //copy fields
    this.name = name
    this.dim = dim
    this.field = field

    //normalize input
    this.normalize()

    //apply padding to field
    this.applyPadding(noPadding)

    //level cannot be used in this stage yet,
    //needs to parse into tile objects and init in table to work
  },

  statics: {
    //mapping from position descriptors to tile classes
    positionDescriptorMap: {
      //first field is always the tile type
      tiles: {
        w: Water,
        l: Land,
        g: Grass,
        u: UnknownTerrain,
      },

      //all following fields are the floating objects and the player
      objects: {
        rc: Rock,
        //makes a coconut when hit by pebble
        pa: Palm,
        pl: Player,
        bx: Box,
        bw: WetBox,
        //ho for house
        ho: Goal,
        st: Starfish,
        mc: MommyCrab,
        bc: BabyCrab,
        sh: SeedHole,
        se: Seed,
        wh: WaterHole,
        wb: WaterBottle,
        //can be used to transfer from one grass to another
        sp: Spring,
        //only teleports the player
        tp: Teleporter,
        //can also teleport objects, thing is stuck on other side until player comes and takes it
        tr: RedTeleporter,
        uk: UnknownObject,
        //two cannot be pushed at once (in one line)
        fg: Figure,
        //crosses can be hidden beneath rocks (that have to be blown up)
        cr: Cross,
        //removes rocks directly adjacent to it, explosion goes once around
        bm: Bomb,
        //detonates all bombs
        bt: BombTrigger,
        by: Buoy,
        /*stay down if spikes button has something on it,
          stays down if something placed on it,
          if player pushes thing on top of it away it stays down with player on it*/
        sk: Spikes,
        sb: SpikesButton,
        /*on water, disappears once stepped off of (like wetbox until stepped off)
          also acts like blockage for raft (like most other things, just an example)
          acts like spikes and only goes away once nothing is on it anymore*/
        ic: Ice,
        pr: Pearl,
        /*bumpable, goes away after getting pearl, but only if all other pedestals
          have also gotten a pearl (all go away at once then)*/
        pp: PearlPedestal,
        /*pushing triggers roman numeral display on otherwise blank face,
          there are consecutively numbered tablets in the map,
          the number only stays visible for a certain tablet if all previous numbers
          have been "uncovered", (goes away again otherwise)
          all numbers have to be visible to win,
          resets all to no number visible if one pushed out of order*/
        tb: Tablet,
        ky: Key,
        //is bumpable receptacle, gives (1?) coin back for key, only opens from bottom
        ch: Chest,
        ci: Coin,
        /*bumpable, shoots pebble in defined direction,
          triggers action on certain things it hits: hitting clam makes it open
          hitting palm produces a coconut next to the palm in the direction of the pebble
          can open multiple clams in one go
          pebble stops when it makes a coconut and is also stopped by rock piles*/
        sl: Slingshot,
        pb: Pebble,
        /*see slingshot for creation, goes until it hits something, (also stops at water)
          if it hits empty CoconutHole, closes CoconutHole*/
        cc: Coconut,
        //needs to be hit by coconut to close and become walkable
        co: CoconutHole,
        //redirects pebble in direction its pointing, can redirect pebble coming from any side,
        //pass through on exit and opposite of exit side
        lf: Leaf,
        /*pushable,
          can be bumped to receive pearl item once opened by pebble shot
          can get pearl from any side, becomes bumpable when opened
          absorbs flying pebble if already open*/
        cl: Clam,
        //all barrels have to be on a barrel base to finish
        br: Barrel,
        //a spot where a barrel has to be pushed
        bb: BarrelBase,
        //special path on which coconuts move until they hit the end of a path
        cp: CoconutPath,
        //path segment that when all targets have a coconut, triggers all coconut holes to close
        ct: CoconutPathTarget,
        /*raft goes as far as possible on water, movement of player triggers
          raft movement with player on it, if player movement possible, player leaves raft
          things can be pushed over raft like wetbox,
          player can push things standing on land (or on wetbox) from raft
          example: raft can move until it hits another raft (then player can transfer)*/
        ra: Raft,
        /*is next to pirate hut, after getting all money on the map, goes into hut and
          leaves Raft behind (apparently pirate can also go away without a hut)
          only accepts coins from the left*/
        pi: Pirate,
        //basically just an unmovable prop
        ph: PirateHut,
        //switches all leaves to point in the direction the switcher was bumped in
        ls: LeafSwitcher,
        //like wet box, is hidden while not revealed with reveal button
        hp: HiddenPath,
        //makes all hidden path objects visible while pushed (weighted button)
        re: RevealEye,
        //has three stages, every push makes it switch to the next stage
        //and also wraps back to the first, only allows finish in third stage
        sg: ShellGuy,
        //for whatever reason a sign that shows the three stages of the shell guys exists,
        //unwalkable, usually floating in water near the top left corner
        sn: ShellGuySign,
        /*extends with copies until reached terrain border (end of grass),
        pushing any flower makes it extend in that direction,
        cannot be walked on, doesn't go onto the seed of a different color*/
        fl: Flower,
        /*all seeds must be covered with a flower of the same color,
        both flower and flower seed have a red variant that only wants red counterparts
        stops like other obstacle when reached seed of wrong color
        only ever seems to be placed on grass, doesn't propagate down grass*/
        fs: FlowerSeed,
        //can be pulled: moving away from it after being adjacent causes it to follow
        //cannot be pushed in a normal way
        sq: Squid,
        //exists in green and red variant (subtypes), to win,
        //all small flowers on the level have to be of the same type
        sf: SmallFlower,
        /*when the player walks through one of these, a line is drawn out for every step,
        this line cannot be crossed (non walkable) and ends
        when the player steps on another anchor. finishing the line changes the color of all
        touched flowers if only flowers of the same color were touched,
        (doesn't have to touch all flowers of a color in the level to work)
        leaves a walkable closed coconut hole behind,
        can be used without a second one,just as a barrier that
        appears on the player's walking path, can be active and/or present on finish*/
        fa: FlowerAnchor,
      },
    },

    //array of possible tile sizes
    tileSizes: [128, 96, 64, 32, 16],

    //returns a padding position descriptor or an array of them
    getPadding(length) {
      //make array if length set as positive number
      if (typeof length === "number" && length >= 1) {
        //init array to fill
        const arr = []

        //fill with specified number of positions
        for (let i = 0; i < length; i++) {
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
          length: fieldDim.x,
        },
        {
          start: Vector({ x: fieldDim.x - 1, y: 0 }),
          dir: Vector({ x: 0, y: 1 }),
          length: fieldDim.y,
        },
        {
          start: Vector({ x: 0, y: fieldDim.y - 1 }),
          dir: Vector({ x: 1, y: 0 }),
          length: fieldDim.x,
        },
        {
          start: Vector({ x: 0, y: 0 }),
          dir: Vector({ x: 0, y: 1 }),
          length: fieldDim.y,
        },
      ]
    },

    //preloads all images by creating image elements with all images in the game
    //doesn't care about images from other tilesets, yet
    preloadAllImages() {
      //collect preload images from all objects
      const preloadedImages = new Set()

      //for all objects that can be displayed
      Object.values(Level.positionDescriptorMap.tiles)
        .concat(Object.values(Level.positionDescriptorMap.objects))
        .forEach(constructorFunction => {
          constructorFunction.getPreloadImages().forEach(imageName => {
            //if present, add to list of image names to preload
            if (imageName && imageName.length) {
              preloadedImages.add(imageName, true)
            }
          })
        })

      //find the preload container for adding preload elements to
      const preloadContainer = $("#preload-container")
      console.log(preloadedImages.values())
      //preload all unique collected images
      preloadedImages.forEach(imageName =>
        preloadContainer.append(
          $("<img>", {
            src: Displayable.makeImgAttrib(
              imageName,
              Displayable.getImageSource(imageName)
            ),
          })
        )
      )
    },
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
      if (!(this.field instanceof Array)) {
        throw Error("fields must be a string or array")
      }

      //make dim a vector if not one already
      if (typeof this.dim === "number") {
        this.dim = Vector(this.dim, this.dim)
      } else if (!this.dim) {
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
    applyPadding(noPadding) {
      //determine size of the field
      const fieldDim = Vector({
        x: this.field.reduce((max, line) => Math.max(max, line.length), 0),
        y: this.field.length,
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

      //stop if padding disabled
      if (noPadding) {
        return
      }

      //total padding needed on axis, divide by 2 for the padding needed on each side
      const sidePadding = Vector({
        x: this.dim.x - fieldDim.x,
        y: this.dim.y - fieldDim.y,
      }).mult(0.5)

      //split padding into pre and post padding on both axis
      const prePadding = Vector({
        x: Math.floor(sidePadding.x),
        y: Math.floor(sidePadding.y),
      })
      const postPadding = Vector({
        x: Math.ceil(sidePadding.x),
        y: Math.ceil(sidePadding.y),
      })

      //check water bounds if requested
      if (checkWaterBounds) {
        //set of padding in directions
        const directionPaddingAccessors = [
          { o: prePadding, p: "y" },
          { o: postPadding, p: "x" },
          { o: postPadding, p: "y" },
          { o: prePadding, p: "x" },
        ]
          //map to function that sets value and returns value
          .map(descriptor => value => {
            if (typeof value === "number") {
              descriptor.o[descriptor.p] += value

              //also apply to dim
              this.dim[descriptor.p] += value
            }

            //return current
            return descriptor.o[descriptor.p]
          })

        //for all bounds get padding
        checkWaterBounds = Level.waterBounds(fieldDim)

          //calc water padding with bounds
          .map((bound, index) => {
            //don't check for padding if we already have normal padding here
            if (directionPaddingAccessors[index]()) {
              return false
            }

            //current check position
            const pos = bound.start.getNew()

            //checking position index (index in bound)
            let i = 0

            //check bound until end or until non water found
            while (i++ < bound.length) {
              //check for non water
              if (
                this.field[pos.y] &&
                this.field[pos.y][pos.x] &&
                this.field[pos.y][pos.x][0] !== "w"
              ) {
                //found non water, need padding for this bound
                return true
              }

              //add increment vector to position for next position
              pos.add(bound.dir)
            }

            //no non-water found, no padding needed
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

      //if no padding scheduled yet
      if (!(needsPadding || checkWaterBounds)) {
        //check that all lines are the same length
        let lastLength
        for (let line of this.field) {
          //if last line length given and lengths don't match, needs padding
          if (typeof lastLength === "number" && lastLength !== line.length) {
            needsPadding = true

            //stop looking
            break
          }

          //set new line length
          lastLength = line.length
        }
      }

      //if padding is necessary
      if (needsPadding || checkWaterBounds) {
        //apply post padding and fill out any uneven lines
        for (let y = 0; y < fieldDim.y + postPadding.y; y++) {
          //if line doesn't exist, create it
          if (!this.field[y]) {
            this.field[y] = []
          }

          //get the current line
          const line = this.field[y]

          //for every needed position in x direction
          for (let x = 0; x < fieldDim.x + postPadding.x; x++) {
            //make padding if not present
            if (!line[x]) {
              line[x] = Level.getPadding()
            }
          }
        }

        //if there is any pre x padding
        if (prePadding.x) {
          //add pre x padding, for every present line
          for (let y = 0; y < this.field.length; y++) {
            //prepend prePadding length of padding
            this.field[y] = Level.getPadding(prePadding.x).concat(this.field[y])
          }
        }

        //if there is any pre y padding
        if (prePadding.y) {
          //prepare array of padding lines
          const padding = []

          //for all pre padding lines
          for (let y = 0; y < prePadding.y; y++) {
            //make full width padding line
            padding[y] = Level.getPadding(this.dim.x)
          }

          //prepend all padding lines to field
          this.field = padding.concat(this.field)
        }
      }
    },

    //parses the field into tiles and floating objects
    parseField() {
      //init empty list of tiles for better iteration
      this.tileList = []

      //for all positions of the field
      this.tiles = this.field.map((line, y) =>
        line.map((position, x) => {
          //get mapped tile factory from mapping
          const tileMaker = Level.positionDescriptorMap.tiles[position[0]]

          //verify presence (that abbreviation in level description is valid)
          if (!tileMaker) {
            throw Error(
              `tile abbrev given in level description is invalid '${position[0]}'`
            )
          }

          //make new tile with class gotten from mapping
          const tile = tileMaker({ x, y, level: this })

          //if objects specified
          if (position.length > 1) {
            //make objects
            const objects = position.map((objAbbrev, index) => {
              //not on first elem, that is the tile abbrev
              if (!index) {
                return
              }

              //get obj factory, select from obj mapping
              const objMaker =
                Level.positionDescriptorMap.objects[objAbbrev.substr(0, 2)]

              //check for validity
              if (!objMaker) {
                throw Error(
                  `obj abbrev given in level description is invalid '${objAbbrev}'`
                )
              }

              //create object of given class
              return objMaker({
                level: this,

                //extra init data is all that comes after the two char object abbrev
                extraInitData: objAbbrev.substr(2),
              })
            })

            //remove first (is empty and not processed, is the tile itself)
            objects.shift()

            //add all objects to tile in init mode
            tile.addObj(objects, true)
          }

          //also add tile to linear list of tiles for non position specific iteration
          this.tileList.push(tile)

          //return generated tile
          return tile
        })
      )
    },

    //inits the level in the page
    initInPage(game, elems, levelIndex) {
      //init registry for objects that interact with other objects in non-movement related ways
      this.registry = Registry()

      //get a new animation queue manager
      this.anim = AnimationQueue({ level: this })

      //create inventory and allow items to register images
      this.inventory = Inventory()

      //parse the field into tiles and floating objects
      this.parseField()

      //save game
      this.game = game

      //init inventory with item counting after object creation
      this.inventory.setup({
        tileList: this.tileList,
        itemDisplayElem: this.game.elems.itemDisplay,
      })

      //set title text
      elems.levelIndex.text(`#${levelIndex + 1}`)
      elems.levelName.text(this.name)

      //save game size element
      this.gameSize = elems.gameSize

      //save table
      this.table = elems.table

      //empty present contents of table
      this.table.empty()

      //add a table row
      const row = $("<tr>").appendTo(this.table)

      //add item to row
      const item = $("<td>").appendTo(row)

      //clone column w - 1 times
      for (let i = 1; i < this.dim.x; i++) {
        //add a item clone and set correct x pos
        row.append(item.clone().addClass("col-" + i))
      }

      //set class for first item
      item.addClass("col-0")

      //clone whole row h - 1 times
      for (let i = 1; i < this.dim.y; i++) {
        //add cloned row and set correct y pos
        this.table.append(row.clone().addClass("row-" + i))
      }

      //set class for first row
      row.addClass("row-0")

      //simply iterate and call method on each tile
      this.tileList.forEach(tile => tile.initDisplay(this, this.table))

      //update the table size for the new field
      this.updateTableSize()

      //start game by registering event handler of player
      this.player.registerHandlers()
    },

    //updates the size of the image display according to the size of the window
    updateTableSize() {
      //remove the current size class from the table
      this.table.removeClass((i, className) =>
        className.startsWith("img-size-") ? className : ""
      )

      //calculate the maximum acceptable tile size
      const maxTileSize = Math.min(
        ($(window).width() - 35) / this.dim.x,
        ($(window).height() -
          this.gameSize.height() +
          this.table.height() -
          10) /
          this.dim.y
      )

      //current tile size index
      let tileSizeIndex = 0

      //until current chosen tile size fits in max tile size
      while (
        Level.tileSizes[tileSizeIndex] > maxTileSize &&
        tileSizeIndex < Level.tileSizes.length - 1
      ) {
        //increment index
        tileSizeIndex++
      }

      //use largest fitting tile size
      this.table.addClass("img-size-" + Level.tileSizes[tileSizeIndex])
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
    },

    //takes down registered components of this level
    unregisterHandlers() {
      //remove handlers of player
      this.player.unregisterHandlers()
    },

    //triggered when the goal is stepped on,
    //checks for there to be no objects that have to be removed left over
    goalTriggered() {
      //check that there are no stored items
      let itemsPresent = false
      for (const itemName in this.items) {
        //if item present
        if (this.items[itemName]) {
          //set flag and stop loop
          itemsPresent = true
          break
        }
      }

      //there must be no items stored and all objects in all tiles must not be requireGone
      if (
        !itemsPresent &&
        this.tileList.every(
          //check that tile is ok with finish
          t =>
            (!t.checkFinish || t.checkFinish()) &&
            //check that all objects of this tile are ok with finish
            t.objects.every(
              o => !o.requireGone && (!o.checkFinish || o.checkFinish())
            )
        )
      ) {
        //unregister
        this.unregisterHandlers()

        //make game move on to next level
        this.game.levelCompleted()
      }
    },
  },
})
