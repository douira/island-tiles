/*global stampit,
Displayable, Vector, directionOffsets*/
/*exported Rock, Palm, Box, WetBox, Goal, Starfish, MommyCrab, BabyCrab,
Seed, SeedHole, WaterHole, WaterBottle, Teleporter, RedTeleporter,
UnknownObject, Figure, Cross, Bomb, BombTrigger, Buoy, Spikes, SpikesButton,
Ice, Pearl, PearlPedestal, Tablet, Key, Coin, Chest, Pebble, Slingshot, Coconut*/

//disallows walking on the tile if this object is on it
const NonWalkableObject = stampit.methods({
  //disallow putting things on this by default, called to check if something can move onto this
  checkMove() {
    return false
  }
})

//a basic object that can be on top of a terrain tile
const FloatingObject = Displayable.compose(Vector, {
  //copy level on init
  init({ level }) {
    this.level = level
  },

  methods: {
    //adds the image element for this object to the given table cell
    addToCell(cell) {
      //get img element and save for moving round
      this.imgElem = this.getImgElem()

      //add to cell given
      cell.append(this.imgElem)
    },

    //adds this object to a terrain tile
    addToTile(newTile) {
      //add to object list of new parent tile (will set tile prop in this)
      newTile.addObj(this)

      //add to table cell of new parent
      this.addToCell(this.parent.tableCellElem)

      //update display of the parent
      this.parent.updateDisplay()

      //chaining
      return this
    },

    //moves the object to another tile
    moveToTile(newTile) {
      //remove from parent
      this.remove(true)

      //add to new tile
      this.addToTile(newTile)

      //chaining
      return this
    },

    //removes itself from it's parent
    remove(noUpdate) {
      //remove from parent
      this.parent.removeObj(this)

      //update display if not disabled
      if (! noUpdate) {
        this.parent.updateDisplay()
      }

      //chaining
      return this
    },

    //removes this object completely (should not be moved afterwards)
    delete() {
      //normal remove
      this.remove()

      //unregister from registry
      this.level.registry.unregister(this)
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

      //chaining
      return this
    },

    //returns the target tile for a given movement away from this tile
    getTargetTile(movement) {
      //add offset to own position and get tile from there from level
      return this.level.getTileAt(Vector.add(this, movement.offset))
    }
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

//movable supplies methods for trying to move (being the subject of the move)
const Movable = stampit.compose({
  statics: {
    //makes a movement object from a direction (generates offset)
    makeMovementDescr(direction) {
      return {
        //copy direction
        direction,

        //and lookup in movement offsets for offset
        offset: directionOffsets[direction]
      }
    }
  },

  methods: {
    //tries to perform a move
    attemptMove(targetTile, movement, initiator) {
      //construct actors
      const actors = { subject: this, initiator }

      //check if target tile is ok with movement to it, no action if out of bounds
      return this.parent.checkLeave(movement, actors, targetTile) &&
        targetTile && targetTile.checkMove(movement, actors)
    },

    //does the actual moving
    performMove(targetTile, movement, initiator) {
      //build the actors object
      const actors = { subject: this, initiator }

      //notify current tile that this object is leaving
      this.parent.notifyLeave(movement, actors)

      //notify terrain tiles and objects and so on
      targetTile.notifyMove(movement, actors)

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

//watertight objects can be in water and suport other objects if pushed onto them
const Watertight = stampit.props({
  watertight: true,
  heightPrio: 0
})

//WetBox is created when box is sunken in water
const WetBox = FloatingObject.compose(Watertight).props({
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
      this.level.anim.registerAction(() => this.delete())
    }
  }
})

//items can be picked up and are stored in a fixed type inventory
const Pickable = stampit.compose({
  props: {
    //signal to be item (for counting on whole level)
    isItem: true
  },

  //register item image name
  init() {
    this.level.inventory.registerImageName(this)
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

      //do as normal animation
      this.level.anim.registerAction(() => {
        //remove self
        this.delete()

        //register item pickup
        this.level.inventory.addItem(this.tileType)
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
        (typeof this.requireDirection !== "number" ||
         movement.direction === this.requireDirection) &&
        (! this.checkReceiveItems || this.checkReceiveItems(movement, actors))
      ) {
        //take all items specified in prop from level
        const gottenItems = this.level.inventory.takeItems(
          this.itemType, this.itemReceiveType) //itemReceiveType is number or "all"

        //increment received items with new items
        this.receivedItems += gottenItems

        //if present and any items received, call callbacck of specific type
        if (gottenItems && this.receiveItems) {
          this.receiveItems(gottenItems, movement)
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
          actors.subject.delete()

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
      if (targetTile.getSuchObject("WaterHole") && ! this.filled) {
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

  init() {
    //register in level
    this.level.registry.register(this)
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
      const target = this.level.registry.getNext(this)

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

//subtyped objects get additional type data so we dont have to make enumerated class names
const Subtyped = stampit.compose({
  //init subtype
  init({ extraInitData }, { stamp }) {
    //get type specific data (expects the composed object to specify a static type array)
    this.typeData = stamp.subtypes[extraInitData]

    //save more general tile type
    this.superTileType = this.tileType

    //setup image name and specific tileType subtype
    this.imageName = this.typeData.imageName
    this.tileType = this.typeData.tileType
  }
})

//figures can be pushed and move all other figures of the same color with it if possible
const Figure = FloatingObject.compose(Subtyped, Pushable, {
  props: {
    heightPrio: 1,
    tileType: "Figure"
  },

  //register
  init() {
    //register figure in level for pushing others of this type
    this.level.registry.register(this)
  },

  statics: {
    //data for three different figure types
    subtypes: {
      r: {
        imageName: "figure-red",
        tileType: "RedFigure",
        crossType: "RedCross"
      },
      g: {
        imageName: "figure-green",
        tileType: "GreenFigure",
        crossType: "GreenCross"
      },
      b: {
        imageName: "figure-blue",
        tileType: "BlueFigure",
        crossType: "BlueCross"
      }
    }
  },

  methods: {
    //when figure is pushed
    notifyPush(targetTile, movement, actors) {
      //get other objects of this type in the level
      const others = this.level.registry.getOthers(this)

      //and if any present
      if (others) {
        //move same as this figure was moved
        others.forEach(o => o.move(movement, actors.initiator))
      }

    },

    //when finish check happens, only ok if on terrain with cross of same color
    checkFinish() {
      //cross type is the tile type of the cross this figure has to be on
      return this.parent.getSuchObject(this.typeData.crossType)
    }
  }
})

//figures are moved onto crosses
const Cross = FloatingObject.compose(Subtyped, {
  props: {
    heightPrio: 0,
    tileType: "Cross"
  },

  statics: {
    subtypes: {
      r: {
        imageName: "cross-red",
        tileType: "RedCross"
      },
      g: {
        imageName: "cross-green",
        tileType: "GreenCross"
      },
      b: {
        imageName: "cross-blue",
        tileType: "BlueCross"
      }
    }
  }
})

//animation particles are used for animation of effects
//(are removed in animation before the player regains control)
const AnimationParticle = FloatingObject.compose({
  props: {
    tileType: "AnimationParticle",
    imageName: "unknown"
  },

  statics: {
    //how long it takes for the animation particle to disappear on its own
    ttl: 50
  },

  //inits with given image name
  init({ imageName, level, ttl = AnimationParticle.ttl }) {
    //copy image name
    this.imageName = imageName

    //level is attached later but used for ttl animation so it's given here too
    if (level) {
      //animation to remove in ttl ms
      level.anim.registerAction(() => this.delete(), { delay: ttl })
    }
  }
})

//Bomb removes rocks directly adjacent to it
const Bomb = FloatingObject.compose(Pushable, {
  props: {
    imageName: "bomb",
    tileType: "Bomb"
  },

  statics: {
    //adjacents and own position
    explosionOffsets: directionOffsets.concat(Vector()),

    //delay time between individual explosions
    explosionDelay: 30
  },

  //register
  init() {
    //register to be found by bomb trigger
    this.level.registry.register(this)
  },

  methods: {
    //called by bomb trigger when stepped on
    bombTriggered() {
      //for all adjacent tile positions and own position
      Bomb.explosionOffsets.forEach((offset, index) => {
        //get tile from level at position
        const tile = this.level.getTileAt(Vector.add(offset, this))

        //if tile present
        if (tile) {
          //get rock object from tile
          const rock = tile.getSuchObject("Rock")

          //in animation with random delay
          this.level.anim.registerAction(() => {
            //if present, remove rock
            if (rock) {
              rock.delete()
            }

            //place animation particle with explosion image onto terrain
            AnimationParticle({ level: this.level, imageName: "bomb-explosion" }).addToTile(tile)
          }, { delay: Math.random() * index * Bomb.explosionDelay })
        }
      })

      //remove self, can only be triggered once
      this.delete()
    }
  }
})

//bomb trigger triggers all bombs
const BombTrigger = FloatingObject.compose({
  props: {
    imageName: "bomb-trigger-land",
    tileType: "BombTrigger"
  },

  methods: {
    //when stepped on
    notifyMove(movement, actors) {
      //if player moved onto this tile
      if (actors.subject.tileType === "Player") {
        //trigger all bombs with increasing delay in animation
        this.level.registry.getOfType("Bomb").forEach(
          (b, index) => this.level.anim.registerAction(
            //action triggers bomb
            () => b.bombTriggered(),

            //wait for last bomb to finish
            index * Bomb.explosionDelay * Bomb.explosionOffsets.length
          )
        )

        //trigger also removes itself
        this.delete()
      }
    }
  }
})

//buoy is non walkable water obstacle
const Buoy = FloatingObject.compose(NonWalkableObject).props({
  imageName: "buoy",
  tileType: "Buoy"
})

//triggers a callback after moves have finished
const Weighted = stampit.compose({
  props: {
    //true when weight (another object) is on this object
    hasWeight: false,

    //is set to true to avoid registering multiple check actions
    checkRegistered: false,

    //extra weight is not present by deafult, can be set though
    extraWeight: false
  },

  init() {
    //initially check weight
    this.checkWeight()
  },

  methods: {
    //on move onto and leave, check weight
    notifyMove() {
      this.checkWeight()
    },
    notifyLeave() {
      this.checkWeight()
    },

    //registers a later function to check if weight is on this object
    checkWeight() {
      //stop if already check registered
      if (this.checkRegistered) {
        return
      }

      //register animation to execute when done with motion
      this.level.anim.registerAction(() => {
        //unset check flag
        this.checkRegistered = false

        //get new weight value, has weight if extra weight set
        //or more than this object present in this tile
        const newHasWeight = this.extraWeight || this.parent.objs.length > 1

        //if weight state changed
        if (newHasWeight !== this.hasWeight) {
          //change state
          this.hasWeight = newHasWeight

          //notify object
          this.weightStateChanged(this.hasWeight)
        }
      }, { delay: 0, priority: -1 })
    },

    //sets the new extra weight state
    setExtraWeight(extraWeight) {
      //if extra weight state changed
      if (this.extraWeight !== extraWeight) {
        //set as new state
        this.extraWeight = extraWeight

        //trigger check on extra weight change
        this.checkWeight()
      }
    }
  }
})

//spikes register and can be changed by a spike button
const Spikes = FloatingObject.compose(Weighted, {
  props: {
    imageName: "spikes-up",
    tileType: "Spikes",

    //draw at bottom
    heightPrio: 0
  },

  //on creation
  init() {
    //register with level for discovery by spike buttons
    this.level.registry.register(this)
  },

  statics: {
    upImageName: "spikes-up",
    downImageName: "spikes-down"
  },

  methods: {
    //when weight state changes
    weightStateChanged() {
      //in animation change display image
      this.level.anim.registerAction(
        () => this.changeImageName(this.hasWeight ? Spikes.downImageName : Spikes.upImageName)
      )
    },

    //allow walk if in down position or already an object on it
    checkMove() {
      return this.hasWeight || this.parent.objs.length > 1
    }
  }
})

//spikes button controlles spike status
const SpikesButton = FloatingObject.compose(Weighted, {
  props: {
    imageName: "spikes-button",
    heightPrio: 0,
    tileType: "SpikesButton",

    //the current state
    pressed: false
  },

  methods: {
    //when weight state changes
    weightStateChanged() {
      //notify all spikes of change by setting extra weight to weight state of button
      this.level.registry.getOfType("Spikes").forEach(o => o.setExtraWeight(this.hasWeight))
    }
  }
})

//ice goes away like spikes come back up once unweighted (ice just goes away)
const Ice = FloatingObject.compose(Weighted, Watertight, {
  props: {
    imageName: "ice",
    tileType: "Ice"
  },

  methods: {
    //on removal of weight
    weightStateChanged() {
      //if no weight now, means we had weight before
      if (! this.hasWeight) {
        //melt, delete itself
        this.delete()
      }
    }
  }
})

//pearl is a item
const Pearl = FloatingObject.compose(Pickable).props({
  imageName: "pearl",
  tileType: "Pearl"
})

//accepts a pearl and goes away once all other pedestals also have a pearl
const PearlPedestal = FloatingObject.compose(Receptacle, NonWalkableObject, RequireGone, {
  props: {
    imageName: "pearl-pedestal",
    tileType: "PearlPedestal",

    //takes one pearl
    itemReceiveType: 1,
    itemType: "Pearl"
  },

  //registers so all can be triggered at once
  init() {
    this.level.registry.register(this)
  },

  methods: {
    //when we get a pearl
    receiveItems() {
      //set to have received an item
      this.hasPearl = true

      //change image to with pearl
      this.changeImageName("pearl-pedestal-filled")

      //get all pdestals
      const pedestals = this.level.registry.getOfType(this)

      //check if all other pedestals have pearls
      if (pedestals.every(p => p.hasPearl)) {
        //in order of list, animate all to disappear
        pedestals.forEach(
          p => this.level.anim.registerAction(() => p.delete(), { actionType: "slowAnimation"}))
      }
    }
  }
})

//unknown item is a placeholder
const UnknownObject = FloatingObject.props({
  tileType: "UnknownObject",
  imageName: "unknown"
})

//represents the player, controllable and deals with interaction
const Player = FloatingObject.compose(Movable, {
  //set image name
  props: {
    tileType: "Player",
    heightPrio: 100,
    imageName: "player-l"
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

        //don't move if any animations are still processing
        if (this.level.anim.lock) {
          return
        }

        //update to face in that direction
        this.changeImageName(Player.directionImageNames[keyDirection])

        //try to move with offset vector for this direction, also pass direction
        this.move(Movable.makeMovementDescr(keyDirection))
      });
    },

    //remove event handlers
    unregisterHandlers() {
      //remove keydown handler we assigned
      $(document).off(".interaction")
    },

    //is walkable if the initiator is itself
    //(pushing a figure that moves a figure that wants to occupy the same space as the player)
    checkMove(movement, actors) {
      return actors.initiator === this
    }
  }
})

//tablet can be pushed and requires pushing of all five in order for them to be valid
const Tablet = FloatingObject.compose(Pushable, {
  props: {
    imageName: "tablet-clear",
    tileType: "Tablet",

    //flag is set to true when this tablet is uncovered properly
    uncovered: false
  },

  //register on init and get number
  init({ extraInitData }) {
    this.level.registry.register(this)

    //parse tablet number
    this.number = parseInt(extraInitData)
  },

  methods: {
    //when pushed, show number and check for other uncovered tablets
    notifyPush() {
      //get all tablets on the field
      const tablets = this.level.registry.getOfType(this)

      //display uncovered
      this.changeImageName("tablet-" + this.number)

      //check if this tablet was opened in the right order,
      //there shouldn't be a covered tablet with a lower number
      if (tablets.some(t => ! t.uncovered && t.number < this.number)) {
        //uncovering is not ok, start animation to cover all
        this.level.anim.registerAction(
          () => tablets.forEach(t => t.changeImageName("tablet-clear")),
          { actionType: "longAnimation" })
      } else {
        //uncovering is ok, set flag
        this.uncovered = true
      }
    },

    //don't allow pushing if uncovered
    checkPush() {
      return ! this.uncovered
    },

    //must be uncovered forfield complestion
    checkFinish() {
      return this.uncovered
    }
  }
})

//coin is a item
const Coin = FloatingObject.compose(Pickable).props({
  imageName: "coin",
  tileType: "Coin"
})

//key is a item that can be used to get coins from chests
const Key = FloatingObject.compose(Pickable).props({
  imageName: "key",
  tileType: "Key"
})

//Chest gives a coin in exchange for a key
const Chest = FloatingObject.compose(Receptacle, NonWalkableObject, {
  props: {
    tileType: "Chest",
    imageName: "chest-closed",

    //interacts with bottom (upwards movement) and receives single keys
    requireDirection: 0,
    itemType: "Key",
    itemReceiveType: 1,

    //flag wether or not this chest has been opened
    opened: false
  },

  //init to register for total coin count
  init() {
    this.level.registry.register(this)
  },

  methods: {
    //only take items if not opened yet
    checkReceiveItems() {
      return ! this.opened
    },

    //when key received
    receiveItems() {
      //mark as open
      this.opened = true

      //in animation
      this.level.anim.registerAction(() => {
        //change image to open chest
        this.changeImageName("chest-open")

        //give player a coin
        this.level.inventory.addItem("Coin")
      })
    }
  }
})

//projectile moves on it's own until it hits something
const Projectile = Movable.compose({
  //init with movement
  init({ movement, startTile }) {
    //immediately add to tile to start at
    this.addToTile(startTile)

    //only do immediate move if given movement
    if (movement) {
      //try to move with offset
      this.move(movement)
    }
  },

  methods: {
    //checkMove can be used to allow or disallow movement

    //when projectile moves to another tile
    checkLeave(movement, actors) {
      //if asking for leaveing of this projectile
      if (actors.subject === this) {
        //check that tile is ok with this projectile leaving (and also does processing with it)
        return this.parent.checkProjLeave(movement, this)
      }

      //don't care otherwise, allow by default
      return true
    },

    //register next movement on leaving (like arrival)
    notifyLeave(movement, actors) {
      //if notified of own arrival
      if (actors.subject === this) {
        //in animation, move again
        this.level.anim.registerAction(() => this.move(movement))
      }
    }
  }
})

//Pebble is an item
const Pebble = FloatingObject.compose(Pickable).props({
  imageName: "pebble",
  tileType: "Pebble"
})

//pebble projectile is created by slingshot
const PebbleProj = FloatingObject.compose(Projectile, {
  props: {
    imageName: "pebble",
    tileType: "PebbleProj"
  }
})

//coconut is projectile that moves in the direction it was pushed
//projectile handler overwrites pushable notify move handler,
//so projectile movement is triggered on push
const Coconut = FloatingObject.compose(Pushable, Projectile).props({
  imageName: "coconut",
  tileType: "Coconut"
})

//Palm tile is stationary
const Palm = FloatingObject.compose({
  props: {
    //init with image name
    tileType: "Palm",
    heightPrio: 0,
    imageName: ["palm-1", "palm-2"]
  },

  methods: {
    //allow pebbles to move onto palm
    checkMove(movement, actors) {
      return actors.subject.tileType === "PebbleProj"
    },

    //when pebble projectile tries to leave
    checkProjLeave(movement, proj) {
      //if pebble projectile
      if (proj.tileType === "PebbleProj") {
        //delete projectile
        proj.delete()

        //add coconut to next tile
        Coconut({ level: this.level, startTile: this.getTargetTile(movement) })

        //absorb projectile
        return false
      } else {
        //allow other projectiles to pass
        return true
      }
    }
  }
})

//singshot shoots pebble items from the inventory
const Slingshot = FloatingObject.compose(Receptacle, NonWalkableObject, {
  props: {
    tileType: "Slingshot",
    imageName: "slingshot-land",

    //interacts with bottom (upwards movement) and receives single pebbles
    requireDirection: 0,
    itemType: "Pebble",
    itemReceiveType: 1
  },

  methods: {
    //when pebble is received
    receiveItems(items, movement) {
      //create a new pebble projectile on this tile that will move itself
      PebbleProj({ level: this.level, movement, startTile: this.parent })
    }
  }
})
