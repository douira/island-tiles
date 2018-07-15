/*global stampit,
Displayable, Vector, directionOffsets*/
/*exported Rock, Palm, Box, WetBox, Goal, Starfish, MommyCrab, BabyCrab,
Seed, SeedHole, WaterHole, WaterBottle, Teleporter, RedTeleporter,
UnknownObject, Figure, Cross, Bomb, BombTrigger, Buoy, Spikes, SpikesButton,
Ice, Pearl, PearlPedestal, Tablet, Key, Coin, Chest, Pebble, Slingshot, Coconut,
CoconutHole, Leaf, Clam, Barrel, BarrelBase, CoconutPath, CoconutPathTarget,
Raft, Pirate, PirateHut, LeafSwitcher, RevealEye, HiddenPath, ShellGuy,
ShellGuySign*/

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
      //if parent set at all
      if (this.parent) {
        //normal remove
        this.remove()
      }

      //unregister from registry
      this.level.registry.unregister(this)

      //set flag for not doing any further movement, even when deleted in notifyMove handler
      this.deleted = true
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

        //and lookup offset in movement offsets
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
      return targetTile && this.parent.checkLeave(movement, actors, targetTile) &&
        targetTile.checkMove(movement, actors)
    },

    //does the actual moving
    performMove(targetTile, movement, initiator) {
      //build the actors object
      const actors = { subject: this, initiator }

      //notify current tile that this object is leaving
      this.parent.notifyLeave(movement, actors, targetTile)

      //notify terrain tiles and objects and so on
      targetTile.notifyMove(movement, actors)

      //stop if deleted in the mean time
      if (this.deleted) {
        //stop doing anything
        return
      }

      //do movement to target tile, if target file is falsy attemptMove wasn't checked first!
      this.moveToTile(targetTile)
    },

    //move is called as the initial impulse (this is default initiator)
    move(movement, initiator = this) {
      //stop if deleted i nthe mean time
      if (this.deleted) {
        return
      }

      //get target tile for movement
      const targetTile = this.getTargetTile(movement)

      //if target tile is invalid
      if (! targetTile) {
        //if handler specified
        if (this.outOfFieldMove) {
          this.outOfFieldMove(movement, initiator)
        }

        //return to stop, nowhere to go
        return
      }

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
      return this.pushableCheckMove(movement, actors)
    },

    //actual checking function, is broken out to make external call possible
    pushableCheckMove(movement, actors) {
      //require subject and initiator to be the same (don't allow double pushing)
      return actors.initiator === actors.subject &&
        //don't allow pushing by projectiles
        ! actors.subject.isProjectile &&

        //deny pushing down grass
        ! (actors.subject.parent.terrainType === "Grass" && this.parent.terrainType === "Land") &&

        //check if push movement ok in general (for this object)
        (! this.checkPush || this.checkPush(movement, actors)) &&

        //try to move in direction of current movement, keep initiator
        this.attemptMove(this.getTargetTile(movement), movement, actors.initiator)
    },

    //when move actually happens (movement to parent tile), do move to next tile
    notifyMove(movement, actors) {
      //no own notify move
      this.pushableNotifyMove(movement, actors)
    },

    //notify move breakout to allow interception of main notify move
    pushableNotifyMove(movement, actors) {
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
  heightPrio: -1
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

//requires objects with this behavior to be all gone from the field before finishing the level
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
const Item = stampit.compose({
  //on composition with pickable
  composers({ stamp, composables }) {
    //copy image name and tile tpye into statics
    //so inventory can dispaly items of which no instance exists
    const props = composables[composables.length - 1].properties
    stamp.imageName = props.imageName
    stamp.tileType = props.tileType
  },

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
        //should theoretically never occur, as checkMove prevents this
        return
      }

      //do as normal animation
      this.level.anim.registerAction(() => {
        //remove self
        this.delete()

        //register item pickup
        this.level.inventory.addItems(this.tileType)
      })
    }
  }
})

//baby crabs can be picked up and given to the mother crab all at once
const BabyCrab = FloatingObject.compose(Item, RequireGone).props({
  //image name and type
  tileType: "BabyCrab",
  imageName: "crab-small"
})

//seeds can be picked up and planted in a seed hole
const Seed = FloatingObject.compose(Item).props({
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

        //in long animation, change to full display
        this.level.anim.registerAction(
          () => this.changeImageName("bottle-full"), { actionType: "slowAnimation" })
      }
    }
  }
})

//the water hole can be used to fill the bottle up with water
const WaterHole = FloatingObject.props({
  imageName: "water-hole-land",
  tileType: "WaterHole"
})

//registers the object in the level registry for things
//where an array of all objects of a certain type needs to be accessed
const Registered = stampit.init(function() {
  //register in level
  this.level.registry.register(this)
})

//telporter transports player from one teleporter to the other (only the player)
const Teleporter = FloatingObject.compose(Registered, {
  props: {
    imageName: "teleporter-land",
    tileType: "Teleporter",
    isTeleporter: true
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
    //save more general tile type
    this.superTileType = this.tileType

    //save reference to static subtype data
    this.subtypes = stamp.subtypes

    //initially setup subtype
    this.setupSubtype(extraInitData)
  },

  methods: {
    //sets this tile up for using a specific subtype
    setupSubtype(subtypeIndex) {
      //get type specific data (expects the composed object to specify a static type array)
      this.typeData = this.subtypes[subtypeIndex]

      //setup image name and specific tileType subtype
      this.imageName = this.typeData.imageName
      this.tileType = this.typeData.tileType
    }
  }
})

//figures can be pushed and move all other figures of the same color with it if possible
const Figure = FloatingObject.compose(Registered, Subtyped, Pushable, {
  props: {
    heightPrio: 1,
    tileType: "Figure"
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
const Bomb = FloatingObject.compose(Registered, Pushable, {
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
const Spikes = FloatingObject.compose(Registered, Weighted, {
  props: {
    imageName: "spikes-up",
    tileType: "Spikes",

    //draw at bottom
    heightPrio: 0
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
const Pearl = FloatingObject.compose(Item).props({
  imageName: "pearl",
  tileType: "Pearl"
})

//accepts a pearl and goes away once all other pedestals also have a pearl
const PearlPedestal = FloatingObject.compose(
  Registered, Receptacle, NonWalkableObject, RequireGone, {
  props: {
    imageName: "pearl-pedestal",
    tileType: "PearlPedestal",

    //takes one pearl
    itemReceiveType: 1,
    itemType: "Pearl"
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
const Tablet = FloatingObject.compose(Registered, Pushable, {
  props: {
    imageName: "tablet-clear",
    tileType: "Tablet",

    //flag is set to true when this tablet is uncovered properly
    uncovered: false
  },

  //register on init and get number
  init({ extraInitData }) {
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
const Coin = FloatingObject.compose(Registered, Item).props({
  imageName: "coin",
  tileType: "Coin"
})

//key is a item that can be used to get coins from chests
const Key = FloatingObject.compose(Item).props({
  imageName: "key",
  tileType: "Key"
})

//Chest gives a coin in exchange for a key
const Chest = FloatingObject.compose(Registered, Receptacle, NonWalkableObject, {
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
        this.level.inventory.addItems("Coin")
      })
    }
  }
})

//Pebble is an item
const Pebble = FloatingObject.compose(Item).props({
  imageName: "pebble",
  tileType: "Pebble"
})

//barrel can be pushed and needs to be on a barrel base to allow finishing
const Barrel = FloatingObject.compose(Pushable, {
  props: {
    imageName: "barrel",
    tileType: "Barrel",
    heightPrio: 1
  },

  methods: {
    //when finish check happens
    checkFinish() {
      //require to be on a base
      return this.parent.getSuchObject("BarrelBase")
    }
  }
})

//barrelBase is used to check that all barrels have been put in the right place
const BarrelBase = FloatingObject.props({
  imageName: "barrel-base",
  tileType: "BarrelBase"
})

//projectile moves on it's own until it hits something
const Projectile = Movable.compose({
  props: {
    isProjectile: true,
    heightPrio: 2
  },

  //init with movement
  init({ movement, startTile }) {
    //if start tile not given, it will be added later (used as initial object in field)
    if (startTile) {
      //immediately add to tile to start at
      this.addToTile(startTile)
    }

    //only do immediate move if given movement
    if (movement) {
      //try to move with offset
      this.move(movement)
    }
  },

  methods: {
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

//pebble projectile is created by slingshot
//is sinkable to allow movement away over water, doesn't actually respond to sink event
const PebbleProj = FloatingObject.compose(Projectile, {
  props: {
    imageName: "pebble",
    tileType: "PebbleProj",

    //allow movement into water tiles
    sinkable: true
  },

  methods: {
    //when moving out of field
    outOfFieldMove() {
      //remove to disappear
      this.delete()
    }
  }
})

//coconut is projectile that moves in the direction it was pushed
//projectile handler overwrites pushable notify move handler,
//so that projectile movement is triggered on push
const Coconut = FloatingObject.compose(Pushable, Projectile).props({
  imageName: "coconut",
  tileType: "Coconut"
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
      PebbleProj({ movement, startTile: this.parent })
    }
  }
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
    //only allow to be entered by pebble
    checkMove(movement, actors) {
      return actors.subject.tileType === "PebbleProj"
    },

    //when object enters palm tile
    notifyMove(movement, actors) {
      //verify that pebble entered
      if (actors.subject.tileType === "PebbleProj") {
        //expect pebble to enter, delete and replace with coconut
        actors.subject.delete()

        //get tile to place coonut on
        const startTile = this.getTargetTile(movement)

        //if no coconut there yet
        if (! startTile.getSuchObject("Coconut")) {
          //add coconut to target start tile
          Coconut({ startTile })
        }
      }
    }
  }
})

//coconut hole is filled by absorbing a coconut projectile
const CoconutHole = FloatingObject.compose(Registered, {
  props: {
    imageName: "dark-hole",
    tileType: "CoconutHole",
    heightPrio: 0,

    //flag wether or not this hole has been filled with a coconut
    filled: false
  },

  methods: {
    //closes this hole (flag and image change)
    closeHole() {
      //set flag to be filled
      this.filled = true

      //change to filled image
      this.changeImageName("dark-hole-closed")
    },

    //when triggered by the coconut projectile
    checkMove(movement, actors) {
      //coconut entering unfilled hole
      if (actors.subject.tileType === "Coconut" && ! this.filled) {
        //in animation
        this.level.anim.registerAction(() => {
          //absorb coconut
          actors.subject.delete()

          //and close hole
          this.closeHole()
        }, { actionType: "animation" })
      }

      //otherweise allow if filled
      return this.filled
    },
  }
})

//incepts checkMove for an additional check, same for notifyMove
//TODO: make animations also halt on object itself,
//now the object is absorbed before it can be displayed on the absorbing tile
const PushProxy = Pushable.methods({
  //on checkMove do specific and push check
  checkMove(movement, actors, targetTile) {
    //if method even present
    if (this.pushProxyCheckMove) {
      //get result from extra check
      const proxyResult = this.pushProxyCheckMove(movement, actors, targetTile)

      //if anything returned, use that
      if (typeof proxyResult !== "undefined") {
        return proxyResult
      }
    }

    //otherwise handle with push
    return this.pushableCheckMove(movement, actors)
  },

  //notify both on check move
  notifyMove(movement, actors) {
    //notify proxied extra first, if handler present
    let doPush = true
    if (this.pushProxyNotifyMove) {
      const result = this.pushProxyNotifyMove(movement, actors)

      //overwrite if result returned
      if (typeof result !== "undefined") {
        doPush = result
      }
    }

    //do push hanlder that triggers push if not disabled
    if (doPush) {
      //then also notify push handler
      this.pushableNotifyMove(movement, actors)
    }
  }
})

//leaf redirects pebble
const Leaf = FloatingObject.compose(Registered, PushProxy, Subtyped, {
  props: {
    tileType: "Leaf"

    //image determined later
  },

  statics: {
    //specify subtypes for leaf directions
    subtypes: {
      0: {
        imageName: "leaf-t",
        tileType: "LeafTop",
        redirection: 0
      },
      1: {
        imageName: "leaf-r",
        tileType: "LeafRight",
        redirection: 1
      },
      2: {
        imageName: "leaf-b",
        tileType: "LeafBottom",
        redirection: 2
      },
      3: {
        imageName: "leaf-l",
        tileType: "LeafLeft",
        redirection: 3
      }
    }
  },

  methods: {
    //on chek move allow pebble proj
    pushProxyCheckMove(movement, actors) {
      //allow pebble to enter
      if (actors.subject.tileType === "PebbleProj") {
        return true
      }

      //push is allowed for permitted objects by a later check when this doesn't return a value
    },

    //when movement to this tile happens
    pushProxyNotifyMove(movement, actors) {
      //pebble is entering tile,
      //redirect if movement is perpendicular to axis, not forward and backwards directions
      if (actors.subject.tileType === "PebbleProj" &&
        movement.direction !== this.typeData.redirection &&
        movement.direction !== (this.typeData.redirection + 2) % 4
      ) {
        //delete projectile to absorb
        actors.subject.delete()

        //in animation
        this.level.anim.registerAction(() => {
          //make movement descriptor for redirected pebble
          const newMovement = Movable.makeMovementDescr(this.typeData.redirection)

          //make new prjectile in redirection direction
          PebbleProj({
            startTile: this.parent,
            movement: newMovement
          })
        })

        //do not allow push
        return false
      }
    }
  }
})

//clam opens and allows pearl item to be taken
const Clam = FloatingObject.compose(PushProxy, {
  props: {
    imageName: "clam-closed",
    tileType: "Clam",

    //state of the clam, 0 is closed, 1 is open with pearl, 2 is open without pearl
    clamState: 0
  },

  statics: {
    //images for the two other states
    clamStates: {
      1: "clam-open",
      2: "clam-empty"
    }
  },

  methods: {
    //changes the calm state and adjusts the image name accordingly
    changeClamState(newState) {
      //set new state
      this.clamState = newState

      //set image with gotten name
      this.changeImageName(Clam.clamStates[this.clamState])
    },

    //on check move, deal with player and projectile
    pushProxyCheckMove(movement, actors) {
      //if clam is open but without pearl and player is pushing, do bump
      if (this.clamState === 1 && actors.subject.tileType === "Player") {
        //in animation
        this.level.anim.registerAction(() => {
          //give player an pearl item
          this.level.inventory.addItems("Pearl")

          //change to open and empty state
          this.changeClamState(2)
        })
      }

      //always allow pebble
      if (actors.subject.tileType === "PebbleProj") {
        return true
      } //disallow push over stage 0
      else if (this.clamState > 0) {
        return false
      }
    },

    //when object moves onto this tile
    pushProxyNotifyMove(movement, actors) {
      //if pebble
      if (actors.subject.tileType === "PebbleProj") {
        //determine if we are absorbing the projectile
        if (this.clamState === 0) {
          //in animation, move to state open with pearl
          this.level.anim.registerAction(() => this.changeClamState(1), { priority: 1 })
        } else {
          //delete pebble projectile (absorb)
          actors.subject.delete()
        }

        //disallow push
        return false
      }
    }
  }
})

//coconut path constrains coconut to move on it
const CoconutPath = FloatingObject.compose({
  props: {
    imageName: "coconut-path",
    tileType: "CoconutPath",
    isCoconutPath: true,
  },

  methods: {
    //when object tries to leave this tile
    checkLeave(movement, actors, targetTile) {
      //allow if not a coconut moving
      if (actors.subject.tileType === "Coconut") {
        //allow if target tile is also a coconut path (has such an object)
        return targetTile.objs.find(o => o.isCoconutPath)
      } else {
        return true
      }
    }
  }
})

//coconut path segment that needs to be filled with a coconut to finish
const CoconutPathTarget = CoconutPath.compose(Registered, {
  props: {
    imageName: "coconut-path-target",
    tileType: "CoconutPathTarget",

    //is set to true when all targets have coconuts and the holes are filled
    stopped: false
  },

  methods: {
    //on movement onto this tile, check for coconut placement on targets
    notifyMove(movement, actors) {
      //not stopped yet and if moving object is coconut
      if (! this.stopped && actors.subject.tileType === "Coconut") {
        //get coconut targets
        const otherTargets = this.level.registry.getOthers(this)

        //if other targets present and all targets have a coconut
        if (otherTargets && otherTargets.every(o => o.parent.getSuchObject("Coconut"))) {
          //mark all targets as stopped
          otherTargets.forEach(o => o.stopped = true)
        }

        //also mark this target as stopped
        this.stopped = true

        //in animation, close all coconut holes
        this.level.registry.getOfType("CoconutHole").forEach(
          hole => this.level.anim.registerAction(() => hole.closeHole()))
      }
    }
  }
})

//raft can be used to travel on water, always moves until it hits an obstacle
//movement is initiated by player moving on it and the raft can move in the direction
//player can move off of the raft by moving on it but and raft can't follow
//raft moves player with it until it can't
const Raft = FloatingObject.compose(Movable, Watertight, {
  props: {
    imageName: "raft",
    tileType: "Raft",

    //allow movement into water tiles
    sinkable: true
  },

  methods: {
    //on check leave the raft will try to move in front of the player
    checkLeave(movement, actors, targetTile) {
      //if dealing with player
      if (actors.subject.tileType === "Player") {
        //try to move with same movement
        //to be present when player does checkMove check on target tile
        this.move(movement, actors.subject)
      } else if (actors.subject.tileType === "Raft") {
        //disallow movement onto walkable water
        return targetTile.terrainType === "Water" && ! targetTile.checkWatertightPresent()
      }

      //otherwise allow leaving
      return true
    },

    //on leave of self
    notifyLeave(movement, actors) {
      //if notified of own leaving this tile, must be player moving it
      if (actors.subject === this) {
        //if player is being dragged along (not on initial move)
        if (actors.initiator === this) {
          //prefetch player from tile as player will be in tile the raft is leaving
          //when player move aniamtion is triggered
          const player = this.parent.getSuchObject("Player")

          //in immediate animation (right after raft is done moving to allow player to move to it)
          this.level.anim.registerAction(
            //move palyer with the raft
            () => player.move(movement, this), { delay: 0, priority: 1 })
        }

        //in animation, move again
        this.level.anim.registerAction(() => this.move(movement))
      }
    }
  }
})

//unmovable pirate hut prop
const PirateHut = FloatingObject.compose(NonWalkableObject).props({
  imageName: "pirate-hut",
  tileType: "PriateHut"
})

//pirate leaves raft behind when received all coins possible in level (also those from chests)
const Pirate = FloatingObject.compose(Receptacle, NonWalkableObject, Watertight, {
  props: {
    imageName: "pirate-raft",
    tileType: "Pirate",
    heightPrio: 1,

    //takes all coins from the player from the left (moving direction is to the right)
    requireDirection: 1,
    itemReceiveType: "all",
    itemType: "Coin"
  },

  methods: {
    //when the pirate gets coins
    receiveItems() {
      //if all coins from the ground and out of chests have been given
      if (this.receivedItems === (this.level.inventory.initItems.Coin || 0) +
        (this.level.inventory.initItems.Chest || 0)) {
        //if no raft present on this tile yet
        if (! this.parent.getSuchObject("Raft")) {
          //create a raft
          Raft().addToTile(this.parent)
        }

        //and remove the priate
        this.delete()
      }
    }
  }
})

//leaf switcher switches all leaves to point in the direction it was dumped in
const LeafSwitcher = FloatingObject.compose({
  props: {
    //start with up direction
    imageName: "leaf-switcher-t",
    tileType: "LeafSwitcher",

    //current facing direction starts off with 0 (up)
    facingDirection: 0
  },

  statics: {
    //images for the four bumpable directions
    switcherDirections: [
      "leaf-switcher-t",
      "leaf-switcher-r",
      "leaf-switcher-b",
      "leaf-switcher-l"
    ]
  },

  methods: {
    //when bumped into
    checkMove(movement, actors) {
      //if player bumped into this and movement direction changed
      if (actors.subject.tileType === "Player" && movement.direction !== this.facingDirection) {
        //change direction
        this.facingDirection = movement.direction

        //in animation
        this.level.anim.registerAction(() => {
          //update image of the switcher with new direction
          this.changeImageName(LeafSwitcher.switcherDirections[this.facingDirection])

          //for all leaves in level, change to the new direction
          this.level.registry.getOfType("Leaf").forEach(leaf => {
            //setup with the new direction subtype
            leaf.setupSubtype(this.facingDirection)

            //update the image display
            leaf.changeImageName()
          })
        })
      }

      //not walkable, just bumpable
      return false
    }
  }
})

//hidden path can be made visible by reveal button
const HiddenPath = FloatingObject.compose(Registered, Watertight, {
  props: {
    imageName: "hidden-path-hidden",
    tileType: "HiddenPath"
  },

  methods: {
    //changes the hidden state of this object
    setVisibility(setVisible) {
      //changes image name to match new set state
      this.changeImageName(setVisible ? "hidden-path-visible" : "hidden-path-hidden")
    }
  }
})

//button that makes hidden path visible while pushed
const RevealEye = FloatingObject.compose(Weighted, {
  props: {
    imageName: "path-reveal-button",
    tileType: "RevealEye"
  },

  methods: {
    //when button push state changes
    weightStateChanged(isPushed) {
      //update all hidden path objects' visibility
      this.level.registry.getOfType("HiddenPath").forEach(p => p.setVisibility(isPushed))
    }
  }
})

//shell guy sig is suptyped but static
const ShellGuySign = FloatingObject.compose(NonWalkableObject, Subtyped, {
  props: {
    tileType: "ShellGuySign"
  },

  statics: {
    //specify subtypes for the three different image components
    subtypes: {
      0: {
        imageName: "shell-guy-stages-1",
        tileType: "ShellGuySignFirst"
      },
      1: {
        imageName: "shell-guy-stages-2",
        tileType: "ShellGuySignSecond"
      },
      2: {
        imageName: "shell-guy-stages-3",
        tileType: "ShellGuySignThird"
      }
    }
  },
})

const ShellGuy = FloatingObject.compose(Pushable, {
  props: {
    tileType: "ShellGuy",
    imageName: "shell-guy-1"

    //current stage is set in init
  },

  //use given stage if present
  init({ extraInitData = "0" }) {
    //parse stage from given extra data string
    this.stage = parseInt(extraInitData, 10)

    //setup image name for the first time if not default
    if (this.stage) {
      this.imageName = ShellGuy.stages[this.stage]
    }
  },

  statics: {
    //the three stages, wraps when out of bounds
    stages: [
      "shell-guy-1",
      "shell-guy-2",
      "shell-guy-3"
    ]
  },

  methods: {
    //when pushed
    notifyPush() {
      //increment stage and wrap to fit stages list
      this.stage = (this.stage + 1) % ShellGuy.stages.length

      //set image name for new stage
      this.changeImageName(ShellGuy.stages[this.stage])
    },

    //require to be in last stage to finish
    checkFinish() {
      return this.stage === ShellGuy.stages.length - 1
    }
  }
})
