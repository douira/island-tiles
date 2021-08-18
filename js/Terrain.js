/*global Displayable, Vector, directionOffsets*/
/*exported Land, Water, Grass, UnknownTerrain*/

//a terrain tile is a displayable tile that can have objects on it
const Terrain = Displayable.compose(Vector, {
  init({ level }) {
    //starts off with empty list of floating objects
    this.objects = []

    //save level ref
    this.level = level
  },

  methods: {
    //update order of floating objects
    updateImgOrder(needsNoEmpty) {
      //if flag not set, empty container first
      if (!needsNoEmpty) {
        //empty without destroying contained elements (but leave terrain)
        this.tableCellElem.children().slice(this.elems.length).detach()
      }

      //add own img elem to that table cell
      this.tableCellElem.append(this.getImgElem())

      //add image elements for all child objects
      this.objects.forEach(o => o.addToCell(this.tableCellElem))
    },

    //sets itself up in the specified position in the given table
    //doesn't do anything if it's already set up
    initDisplay(level, table) {
      //update image name with tile config
      if (this.calcImageName) {
        this.calcImageName(level)
      }

      //get td of this position
      this.tableCellElem = table
        .children(".row-" + this.y)
        .children(".col-" + this.x)

      //sort floating objects for display
      this.sortobjects()

      //update elements in tile container, newly created and needs no emptying
      this.updateImgOrder(true)
    },

    //updates the display of this tile
    updateDisplay() {
      //sort object with height priority
      this.sortobjects()

      //and update images in display table
      this.updateImgOrder()
    },

    //sets up a given nw object with data from this tile
    setupNewObj(newObj) {
      //attach self as parent
      newObj.parent = this

      //also add level (isn't added in construction for dynamically added objects)
      newObj.level = this.level

      //set position to own position
      newObj.x = this.x
      newObj.y = this.y
    },

    //adds a floating object to this tile
    addObj(objects) {
      //if given array, call on each element given
      if (objects instanceof Array) {
        //call on each
        objects.forEach(o => this.addObj(o))

        //stop, already processed
        return
      }

      //setup object with this terrain tile
      this.setupNewObj(objects)

      //add to list of floating objects
      this.objects.push(objects)
    },

    //sorts the floating objects by height priority
    sortobjects() {
      //sort list of objects by their height priority
      this.objects.sort(
        ({ heightPriority: a = 0 }, { heightPriority: b = 0 }) => a - b
      )

      //filter falsy
      this.objects = this.objects.filter(o => o)
    },

    //remove given object from array of objects, will remove its dom element on its own
    removeObj(obj) {
      //remove from array of objects
      this.objects.splice(this.objects.indexOf(obj), 1)
    },

    //called to check if objects of tile allow leave
    checkLeave(movement, actors, targetTile) {
      //check all objects
      return this.objects.reduce(
        (ok, o) =>
          ok && (!o.checkLeave || o.checkLeave(movement, actors, targetTile)),
        true
      )
    },

    //called by movable right before it leaves this tile
    notifyLeave(movement, actors, targetTile) {
      //notify objects that movement is happening (away from this tile)
      this.objects.forEach(
        ownObj =>
          ownObj.notifyLeave && ownObj.notifyLeave(movement, actors, targetTile)
      )
    },

    //by default, ask all contained objects in order of display order, movement to this tile
    checkMove(movement, actors) {
      //first check tile requirements
      if (this.checkMoveTerrain && !this.checkMoveTerrain(movement, actors)) {
        //stop right away, terrain tile disallows movement
        return false
      }

      //check that all objects are ok with movement
      return this.objects.reduce((moveOk, ownObj) => {
        //call notify check move (doesn't care about return)
        if (ownObj.notifyCheckMove) {
          ownObj.notifyCheckMove(movement, actors)
        }

        //check move
        return (
          moveOk && (!ownObj.checkMove || ownObj.checkMove(movement, actors))
        )
      }, true)
    },

    //notifies the tile in the opposite direction (mainly for squid)
    oppositeNotifyLeave(movement, actors, targetTile) {
      //tell all objects, targeting of the opposite tile is done by the moving object
      this.objects.forEach(
        ownObj =>
          ownObj.oppositeNotifyLeave &&
          ownObj.oppositeNotifyLeave(movement, actors, targetTile)
      )
    },

    //called when movement actually happens, movement of object to this tile
    notifyMove(movement, actors) {
      //do extra notify if present
      if (this.notifyMoveTerrain) {
        this.notifyMoveTerrain(movement, actors)
      }

      //notify objects that movement is actually happening
      this.objects.forEach(
        ownObj => ownObj.notifyMove && ownObj.notifyMove(movement, actors)
      )
    },

    //checks if object of given type is contained in this terrain tile and returns it if found
    getSuchObject(type, useSupertype = false) {
      return this.objects.find(
        //use super tile type is specified but fall back of not present
        o =>
          ((useSupertype ? o.superTileType : o.tileType) || o.tileType) === type
      )
    },
  },
})

//RoundedTile does calculations regarding corners and edges for grass and land tiles
const RoundedTerrain = Terrain.compose({
  //is given a image name map for all the different positions
  //pass true as insideTypes to accept only self as inside,
  //pass falsy to accept all except for field borders

  statics: {
    //maps from neighborhood configs to imageNameMap names,
    //i for inside type, o for outside type tiles (first is top going clockwise)
    neighborConfigNameMap: {
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
      oooi: "onlyLeft",
    },

    //small connectors have an extra section for the tip touching tiles,
    //counting starting at top right corner, _ means doesn't matter
    //for respecting and searchign with _, we need to use an array and strings as keys
    connneighborNameMap: [
      {
        pos: "ii__o___",
        name: "connRightTop",
      },
      {
        pos: "_ii__o__",
        name: "connRightBottom",
      },
      {
        pos: "__ii__o_",
        name: "connLeftBottom",
      },
      {
        pos: "i__i___o",
        name: "connLeftTop",
      },
    ],

    //connector directions offsets for tip touching tiles
    tipDirectionOffsets: [
      Vector({ x: 1, y: -1 }),
      Vector({ x: 1, y: 1 }),
      Vector({ x: -1, y: 1 }),
      Vector({ x: -1, y: -1 }),
    ],
  },

  //determine image name from surrounding tile types
  methods: {
    calcImageName(level) {
      //for all possible neighbor positions, determine inside or outside status
      const neighborConfigs = [
        directionOffsets,
        RoundedTerrain.tipDirectionOffsets,
      ].map(map =>
        map
          .map(offset => {
            //get tile at neighbor position
            const neighborTile = level.getTileAt(Vector.add(this, offset))

            //if tile doesn't exist: border of field, automatically outside
            if (!neighborTile) {
              return "o"
            }

            //get tile at offsetted position and check if one of the inside classes or same class
            //do not check if none given (accept all as inside)
            return !this.insideTypes ||
              neighborTile.terrainType === this.terrainType ||
              (this.insideTypes.length &&
                this.insideTypes.includes(neighborTile.terrainType))
              ? "i"
              : "o"
          })
          .join("")
      )

      //set from name map and choose base image if special one not present
      this.imageName =
        this.imageNameMap[
          //get image type in image name map from neighborhoodNameMap,
          //choose center if unknown neighbor config
          RoundedTerrain.neighborConfigNameMap[neighborConfigs[0]] || "center"
        ] || this.imageNameMap.center

      //construct the extended neighborhood config string, split into chars for char comparison
      const extneighbors = neighborConfigs.join("").split("")

      //find a connection neighbor item that fits this extended neighbor config
      const connImageType = RoundedTerrain.connneighborNameMap.find(
        //make sure every positions fits or doesn't matter
        item =>
          extneighbors.every((c, i) => item.pos[i] === "_" || c === item.pos[i])
      )

      //get image name if anything found
      if (connImageType) {
        //get image name from terrain specific map
        const connImageName = this.imageNameMap[connImageType.name]

        //if a connection image name exists
        if (connImageName) {
          //create image name as a object that contains both the base and the extra image name
          this.imageName = { layers: [this.imageName, connImageName] }
        }
      }
    },

    //all images in the image name map need to be preloaded
    getPreloadImages() {
      //don't add anything if imageName is not present
      return Object.values(this.imageNameMap)
        .flat()
        .concat(this.imageName || [])
    },
  },
})

//disallows walking on this terrain tile
//terrain is walkable if checkMoveTerrain not present
const NonWalkableTerrain = stampit.methods({
  //disallow walking on terrain tile before checking objects
  checkMoveTerrain() {
    return false
  },
})

//utility function for generating arrays of tile variation names
const tileVariation = (baseName, variations = 5, connector = "-") =>
  //make array and fill with strings from base name and number suffix after connector
  Array.from({ length: variations }, (e, i) => baseName + connector + (i + 1))

//the Land tile
const Land = RoundedTerrain.props({
  terrainType: "Land",
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
    onlyLeft: "land-only-l",
    /*onlyTop: tileVariation("land-only-t", 2),
    onlyRight: tileVariation("land-only-r", 2),
    onlyBottom: tileVariation("land-only-b", 2),
    onlyLeft: tileVariation("land-only-l", 2),
    connRightTop: "land-conn-rt",
    connRightBottom: "land-conn-rb",
    connLeftBottom: "land-conn-lb",
    connLeftTop: "land-conn-lt"*/
  },
  insideTypes: ["Grass"],
})

//the Grass tile
const Grass = RoundedTerrain.compose({
  //configuration
  props: {
    terrainType: "Grass",
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
      onlyLeft: "grass-corner-rb",
    },
    insideTypes: true,
  },

  methods: {
    //disallow movement not from spring
    checkMoveTerrain(movement, actors) {
      //return false if initiator is not of type spring or not already on grass
      return (
        actors.initiator.tileType === "Spring" ||
        actors.subject.parent.terrainType === "Grass"
      )
    },
  },
})

//the Water tile
const Water = RoundedTerrain.compose(NonWalkableTerrain, {
  props: {
    terrainType: "Water",
    imageNameMap: {
      center: tileVariation("water", 8),
      edgeTop: "water-border-t",
      rightTop: "water-border-t",
      leftTop: "water-border-corner",
      edgeLeft: "water-border-l",
      leftBottom: "water-border-l",
    },
    insideTypes: false,
  },

  methods: {
    //checks  if there is a watertight object on this terrain
    checkWatertightPresent() {
      return this.objects.some(o => o.watertight)
    },

    //allow movement into if wet box is present or submersible object is being pushed
    checkMoveTerrain(movement, actors) {
      //allow only if sinkable or wet box is present (ask wet box)
      return actors.subject.sinkable || this.checkWatertightPresent()
    },

    //notify sinkables
    notifyMoveTerrain(movement, actors) {
      //if actor is sinkable and no wet box present
      if (
        actors.subject.notifySink && //only if handler present at all
        actors.subject.sinkable &&
        !this.checkWatertightPresent()
      ) {
        //notify box of sinking
        actors.subject.notifySink(movement, actors)
      }
    },
  },
})

//unknown terrain
const UnknownTerrain = Terrain.props({
  terrainType: "UnknownTerrain",
  imageName: "unknown-terrain",
})
