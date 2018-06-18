/*global stampit,
Displayable, Vector, directionOffsets*/
/*exported Rock, Palm, Box, WetBox*/

//always walkable object
/*const WalkableObject = stampit.methods({
  //always allow walking on
  checkMove() {
    return true
  }
})*/

//disallows walking on the tile if this object is on it
const NonWalkableObject = stampit.methods({
  //disallow putting things on this by default, called to check if something can move onto this
  checkMove() {
    return false
  }
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

//pushable allows flaoting objects to be pushed by the player
const Pushable = stampit.compose({
  methods: {
    //check if next can be walked on by this object
    checkMove(movement, actors) {
      //calculate next in direction of movement
      const targetTile = this.level.getTileAt(Vector.add(movement.offset, this))
    }
  }
})

//box can be pushed
const Box = FloatingObject.compose(Pushable).compose({
  props: {
    tileType: "Box",
    imageName: "box"
  }
})

//WetBox is created when box is sunken in water
const WetBox = FloatingObject.compose({
  //configure image
  props: {
    tileType: "WetBox",
    imageName: "box-wet"
  }
})

//represents the player, controllable and deals with interaction
const Player = FloatingObject.compose(NonWalkableObject).compose({
  //set image name
  props: {
    tileType: "Player",
    heightPrio: 100
  },

  statics: {
    //image names for directions
    directionImageNames: [
      "player-t",
      "player-r",
      "player-b",
      "player-l"
    ],

    //map from key codes for WASD and arrow keys to directions
    keyCodeDirections: {
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
  },

  //init registers event handlers
  init() {
    //current tile name
    this.imageName = "player-t"

    //register key interaction handler
    $(document).keydown((function(e) {
      //get key direction
      const keyDirection = Player.keyCodeDirections[e.which]

      //if not present, we don't care about pressing this key
      if (typeof keyDirection !== "number") {
        return
      }

      //prevent default action of moving the page or similar
      e.preventDefault()

      //try to move with offset vector for this direction, also pass direction
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
