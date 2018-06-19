/*global stampit,
Displayable, Vector, directionOffsets*/
/*exported Rock, Palm, Box, WetBox, Goal, Starfish, MommyCrab, BabyCrab*/

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
    //remove from parent
    this.remove(true)

    //add to object list of new parent tile (will set tile prop in this)
    newTile.addObj(this)

    //add to table cell of new parent
    this.addToCell(this.parent.tableCellElem)

    //update display of the parent
    this.parent.updateDisplay()
  },

  //removes itself from it's parent
  remove(noUpdate) {
    //remove from parent
    this.parent.removeObj(this)

    //update display if not disabled
    if (! noUpdate) {
      this.parent.updateDisplay()
    }
  },

  //changes this object to a new type by creating a new one and re-adding to to the terrain
  mutate(toType) {
    //remove from parent
    this.parent.removeObj(this, true)

    //create new of type and add to parent
    this.parent.addObj(toType())

    //add to table cell of new parent
    this.addToCell(this.parent.tableCellElem)

    //update display of the parent
    this.parent.updateDisplay()
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

//movable supplies methods for trying to move (being the subject of the move)
const Movable = stampit.methods({
  //returns the target tile for a given movement from this tile
  getTargetTile(movement) {
    //add offset to own position and get tile from there from level
    return this.level.getTileAt(Vector.add(this, movement.offset))
  },

  //tries to perform a move
  attemptMove(targetTile, movement, initiator) {
    //check if target tile is ok with movement to it, no action if out of bounds
    return targetTile && targetTile.checkMove(movement, { subject: this, initiator })
  },

  //does the actual moving
  performMove(targetTile, movement, initiator) {
    //notify terrain tiles and objects and so on
    targetTile.notifyMove(movement, { subject: this, initiator })

    //do movement to target tile, if target file is falsy attemptMove wasn't checked first!
    this.moveToTile(targetTile)
  },

  //move is called as the initial impulse (called on initiator)
  move(movement) {
    //get target tile for movement
    const targetTile = this.getTargetTile(movement)

    //check if move is possible
    if (this.attemptMove(targetTile, movement, this)) {
      //perform possible move
      this.performMove(targetTile, movement, this)
    }
  }
})

//pushable allows floating objects to be pushed by the player
const Pushable = Movable.compose({
  methods: {
    //check if next can be walked on by this object
    checkMove(movement, actors) {
      //require subject and initiator to be the same (don't allow double pushing)
      return actors.initiator === actors.subject &&
        //check if push movement ok in general (for this object)
        (! this.checkMoveExtra || this.checkMoveExtra(movement, actors)) &&

        //try to move in direction of current movement, this is the subject but keep initiator
        this.attemptMove(this.getTargetTile(movement), movement, actors.initiator)
    },

    //when move actually happens (movement to parent tile), do move to next tile
    notifyMove(movement, actors) {
      //get target tile for movement on this object
      const targetTile = this.getTargetTile(movement)

      //do own move to tile, has to get target tile again (other target because of push)
      this.performMove(targetTile, movement, actors.initiator)

      //call pushed callback on self
      if (this.notifyPush) {
        this.notifyPush(targetTile, movement, actors)
      }
    }
  }
})

//Sinkable object can be pushed into water,
//optional method "sink" can be defined to specify behavior after being pushed into water
const Sinkable = Pushable.props({
  //prop to signal to water to allow pushing this into it
  sinkable: true
})

//WetBox is created when box is sunken in water
const WetBox = FloatingObject.props({
  //configure image
  tileType: "WetBox",
  imageName: "box-wet"
})

//box can be pushed
const Box = FloatingObject.compose(Sinkable, {
  props: {
    tileType: "Box",
    imageName: "box"
  },

  methods: {
    //upon being pushed into water
    notifySink() {
      //register animation to sink
      this.level.anim.registerAction(() => this.mutate(WetBox))
    }
  }
})

//requires objects with this behavior to be all gone fro mthe field before finishing the level
const RequireGone = stampit.props({
  requireGone: true
})

//Goal triggers the level to check that the finishing conditions are met
const Goal = FloatingObject.compose({
  //set image name
  props: {
    tileType: "Goal",
    imageName: "house"
  },

  methods: {
    //when stepped on
    notifyMove() {
      //trigger level finish check
      this.level.goalTriggered()
    }
  }
})

//starfish only needs to be sunken
const Starfish = FloatingObject.compose(Sinkable, RequireGone, {
  props: {
    tileType: "Starfish",
    imageName: "starfish"
  },

  methods: {
    //remove when sunk
    notifySink() {
      //register animation to sink
      this.level.anim.registerAction(() => this.remove())
    }
  }
})

//items can be picked up and are stored in a fixed type inventory
const Pickable = stampit.compose({
  props: {
    //signal to be item (for counting on whole level)
    isItem: true
  },

  methods: {
    //only allow picking up/walking on by player
    checkMove(movement, actors) {
      return actors.subject.tileType === "Player"
    },

    //when stepped on, remove and increment inventory counter
    notifyMove(movement, actors) {
      //require player to be moving into us
      if (actors.subject.tileType !== "Player") {
        return
      }

      //do as animation
      this.level.anim.registerAction(() => {
        //remove self
        this.remove()

        //register item pickup
        this.level.addItem(this)
      })
    }
  }
})

//baby crabs can be picked up and given to the mother crab all at once
const BabyCrab = FloatingObject.compose(Pickable, RequireGone).props({
  //image name and type
  tileType: "BabyCrab",
  imageName: "crab-small"
})

//can receive items and perform actions when a certain amount of items is reached
const Receptacle = stampit.compose({
  props: {
    //starts off with 0 received items
    receivedItems: 0
  },

  methods: {
    //dont allow walking on but take items when "bumped" into
    checkMove(movement, actors) {
      //require player to be moving into us and moving upwards (receptacle images face downwards)
      if (actors.subject.tileType !== "Player" || movement.direction !== 0) {
        return
      }

      //take all items specified in prop from level
      const gottenItems = this.level.takeItems(this.itemType, this.itemReceiveType || "all")

      //increment received items with new items
      this.receivedItems += gottenItems

      //if present, call callbacck of specific type
      if (this.receiveItems) {
        this.receiveItems(gottenItems)
      }

      //disallow walking however
      return false
    }
  }
})

//receptable that calls a callback when all items on the field of the accepted type are received
const ReceptacleAllItems = Receptacle.methods({
  //on item receive
  receiveItems() {
    //if all received and callback present
    if (this.receivedItems === this.level.initItems[this.itemType] && this.allItemsReceived) {
      this.allItemsReceived()
    }
  }
})

//mommy crab receives all stored baby crabs from the inventory
const MommyCrab = FloatingObject.compose(ReceptacleAllItems, {
  props: {
    tileType: "MommyCrab",
    imageName: "crab-large-sad",

    //also specify type of item to receive
    itemType: "BabyCrab",
    itemReceiveType: "all"
  },

  methods: {
    //when all items are received
    allItemsReceived() {
      //change to happy/done image in animation
      this.level.anim.registerAction(() => this.changeImageName("crab-large-happy"))
    }
  }
})

//represents the player, controllable and deals with interaction
const Player = FloatingObject.compose(NonWalkableObject, Movable, {
  //set image name
  props: {
    tileType: "Player",
    heightPrio: 100,
    imageName: "player-t"
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

  methods: {
    //register event handlers when called on start of level
    registerHandlers() {
      //register key interaction handler
      $(document).on("keydown.interaction", e => {
        //get key direction
        const keyDirection = Player.keyCodeDirections[e.which]

        //if not present, we don't care about pressing this key
        if (typeof keyDirection !== "number") {
          return
        }

        //prevent default action of moving the page or similar
        e.preventDefault()

        //register movement action
        this.level.anim.registerAction(() => {
          //update to face in that direction
          this.changeImageName(Player.directionImageNames[keyDirection])

          //try to move with offset vector for this direction, also pass direction
          this.move({ offset: directionOffsets[keyDirection], direction: keyDirection })
        }, "interaction")
      });
    },

    //remove event handlers
    unregisterHandlers() {
      //remove keydown handler we assigned
      $(document).off(".interaction")
    }
  }
})
