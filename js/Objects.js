/*global stampit,
Displayable, Vector, directionOffsets*/
/*exported Rock, Palm, Box, WetBox, Goal, Starfish, MommyCrab,
BabyCrab, Seed, SeedHole, WaterHole, WaterBottle, Teleporter, RedTeleporter,
UnknownObject, FigureRed, FigureGreen, FigureBlue, CrossRed, CrossGreen, CrossBlue*/

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

  //move is called as the initial impulse (this is default initiator)
  move(movement, initiator = this) {
    //get target tile for movement
    const targetTile = this.getTargetTile(movement)

    //check if move is possible
    if (this.attemptMove(targetTile, movement, initiator)) {
      //perform possible move
      this.performMove(targetTile, movement, initiator)
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
        //deny pushing down grass
        ! (actors.subject.parent.terrainType === "Grass" && this.parent.terrainType === "Land") &&

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
    imageName: "box",
    heightPrio: 1
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
    //only allow movement from bottom side by player
    checkMove(movement, actors) {
      return movement.direction === 0 && actors.subject.tileType === "Player"
    },

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
        this.level.inventory.addItem(this)
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

//seeds can be picked up and planted in a seed hole
const Seed = FloatingObject.compose(Pickable).props({
  //image name and type
  tileType: "Seed",
  imageName: "seed"
})

//can receive items and perform actions when a certain amount of items is reached
const Receptacle = stampit.compose({
  props: {
    //starts off with 0 received items
    receivedItems: 0
  },

  methods: {
    //take items when "bumped" into
    notifyCheckMove(movement, actors) {
      //require player to be moving into us and moving in specified direction if set
      if (
        actors.subject.tileType === "Player" &&
        (typeof this.requireDirection !== "number" || movement.direction === this.requireDirection)
      ) {
        //take all items specified in prop from level
        const gottenItems = this.level.inventory.takeItems(
          this.itemType, this.itemReceiveType || "all")

        //increment received items with new items
        this.receivedItems += gottenItems

        //if present and any items received, call callbacck of specific type
        if (gottenItems && this.receiveItems) {
          this.receiveItems(gottenItems)
        }
      }
    }
  }
})

//receptable that calls a callback when all items on the field of the accepted type are received
const ReceptacleAllItems = Receptacle.methods({
  //on item receive
  receiveItems() {
    //if all received and callback present
    if (
      this.receivedItems === this.level.inventory.initItems[this.itemType] &&
      this.allItemsReceived
    ) {
      this.allItemsReceived()
    }
  }
})

//mommy crab receives all stored baby crabs from the inventory
const MommyCrab = FloatingObject.compose(ReceptacleAllItems, NonWalkableObject, {
  props: {
    tileType: "MommyCrab",
    imageName: "crab-large-sad",

    //also specify type of item to receive
    itemType: "BabyCrab",
    itemReceiveType: "all",
    requireDirection: 0
  },

  methods: {
    //when all items are received
    allItemsReceived() {
      //change to happy/done image in animation
      this.level.anim.registerAction(() => this.changeImageName("crab-large-happy"))
    }
  }
})

//spring is the only thign that allows the player to traverse from land to grass directly
const Spring = FloatingObject.compose({
  props: {
    imageName: "spring",
    tileType: "Spring"
  },

  methods: {
    //on being stepped on
    notifyMove(movement, actors) {
      //by the player
      if (actors.subject.tileType === "Player") {
        //init movement in same direction as animation (otherwise moves infinitely)
        this.level.anim.registerAction(() => actors.subject.move(movement, this))
      }
    }
  }
})

//seed hole can receive seed and full water bottle to become spring
const SeedHole = FloatingObject.compose(Receptacle, {
  props: {
    imageName: "seed-hole",
    tileType: "SeedHole",

    //receive one seed
    itemReceiveType: 1,
    itemType: "Seed",

    //state of seededness
    hasSeed: false
  },

  methods: {
    //when seed is received
    receiveItems() {
      //change to with seed image
      this.changeImageName("seeded-hole")

      //set flag that is seeded
      this.hasSeed = true
    },

    //when something moves onto this
    notifyMove(movement, actors) {
      //if it's a full waterbottle
      if (actors.subject.tileType === "WaterBottle" && actors.subject.filled) {
        //and in animation
        this.level.anim.registerAction(() => {
          //remove waterbottle
          /*it seems removing the waterbottle beforehand (without animation) has no effect,
          as it hasn't actually moved to this terrain tile yet
          and thereby isn't properly dereferenced yet before the animation*/
          actors.subject.remove()

          //mutate to spring
          this.mutate(Spring)
        })
      }
    }
  }
})

//water bottle can be filled up with water at the water hole
const WaterBottle = FloatingObject.compose(Pushable, {
  props: {
    imageName: "bottle",
    tileType: "WaterBottle",
    heightPrio: 1,

    //state of with water or not
    filled: false
  },

  methods: {
    //when pushed into water hole
    notifyPush(targetTile) {
      //when target is water hole and not filled up yet
      if (targetTile.hasSuchObject("WaterHole") && ! this.filled) {
        //set filled flag
        this.filled = true

        //in animation, change to full display
        this.level.anim.registerAction(() => this.changeImageName("bottle-full"))
      }
    }
  }
})

//the water hole can be used to fill the bottle up with water
const WaterHole = FloatingObject.props({
  imageName: "water-hole-land",
  tileType: "WaterHole"
})

//telporter transports player from one teleporter to the other (only the player)
const Teleporter = FloatingObject.compose({
  props: {
    imageName: "teleporter-land",
    tileType: "Teleporter",
    isTeleporter: true
  },

  init({ level }) {
    //register in level
    level.registerTeleporter(this)
  },

  methods: {
    //only teleports players
    checkTeleport(actors) {
      //checks that subject is player
      return actors.subject.tileType === "Player"
    },

    //on being walked on
    notifyMove(movement, actors) {
      //get next teleporter from level store
      const target = this.level.getNextTeleporter(this)

      //if initiator isn't already a teleporter,
      //there is another teleporter to move to and teleport is ok
      if (! actors.initiator.isTeleporter && target && this.checkTeleport(actors)) {
        //in animation, move to
        this.level.anim.registerAction(() => actors.subject.move({
          direction: 0, //not very important

          //offset is vector to next teleporter
          offset: Vector.sub(target, this)
        }, this)) //this is initiator
      }
    }
  }
})

//red teleporter also teleports other objects
const RedTeleporter = Teleporter.compose({
  //set to red derivative type
  props: {
    tileType: "RedTeleporter",
    imageName: "teleporter-red-land"
  },

  methods: {
    checkTeleport() {
      //allow teleporting of everything
      return true
    }
  }
})

//unknown item is a placeholder
const UnknownObject = FloatingObject.props({
  tileType: "UnknownObject",
  imageName: "unknown"
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
