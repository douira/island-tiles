/*global stampit,
Displayable, Vector, directionOffsets*/
/*exported Land, Water, Grass*/

//a terrain tile is a displayable tile that can have objects on it
const Terrain = Displayable.compose(Vector, {
  init({ level }) {
    //starts off with empty list of floating objects
    this.objs = []

    //save level ref
    this.level = level
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

      //attach level
      objs.level = this.level

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

//disallows walking on this terrain tile
//terrain is walkable if checkMoveTerrain not present
const NonWalkableTerrain = stampit.methods({
  //disallow walking on terrain tile before checking objects
  checkMoveTerrain() {
    return false
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