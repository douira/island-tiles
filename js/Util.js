/*exported Vector, directionOffsets, NonWalkableObject, Sinkable,
Watertight, RequireGone, Item, ReceptacleAllItems, Registered,
Subtyped, Weighted, Projectile, PushProxy, FloatingObject, Pushable,
Receptacle, AnimationParticle, Movable, UnknownObject, Pullable,
NonTeleportable, Teleportable*/

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
      //add to own values
      this.x += x
      this.y += y

      //chaining
      return this
    },

    //multiply by a scalar
    mult(scalar) {
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
    },
  },

  statics: {
    //statically add vectors and create a new vector
    add(v1, v2) {
      //return vector with components added
      return Vector({ x: v1.x + v2.x, y: v1.y + v2.y })
    },

    //statically subtract vectors and create a new vector
    sub(v1, v2) {
      //return vector with components subtracted
      return Vector({ x: v1.x - v2.x, y: v1.y - v2.y })
    },
  },
})

//neighbor offsets translate own position into the position of a neighbor
//map from direction to offset vector
const directionOffsets = [
  Vector({ x: 0, y: -1 }),
  Vector({ x: 1, y: 0 }),
  Vector({ x: 0, y: 1 }),
  Vector({ x: -1, y: 0 }),
]

//handles rendering of a tile
const Displayable = stampit.compose({
  statics: {
    //list of locations to look for the images
    imgLocations: ["tiles", "tiles-common", "tiles-new"],

    //returns the attribute value for a given image name
    makeImgAttrib(forName, index = 0) {
      return `${Displayable.imgLocations[index]}/${forName}.png`
    },

    //list of what location index to use for all images
    imageSourceRegistry: {},

    //returns the current image source for the given image name
    getImageSource(imageName) {
      //set to initial 0 if not present
      if (!(imageName in Displayable.imageSourceRegistry)) {
        Displayable.imageSourceRegistry[imageName] = 0
      }

      //return current
      return Displayable.imageSourceRegistry[imageName]
    },

    //the standard imageName is the only image to preload
    //this should be overwritten for any objects that have more than one image
    getPreloadImages() {
      return [this.compose.properties.imageName].flat()
    },
  },

  methods: {
    //generates a dom object for this tile; an image element
    getImgElem(noReturn) {
      //check that img element doesn't exist yet
      if (!this.elems) {
        //if image name is an object
        if (typeof this.imageName === "object") {
          //if image name is an array
          if (this.imageName instanceof Array) {
            //choose one at random
            if (this.imageName.length === 1) {
              //choose the only one
              this.imageName = this.imageName[0]
            } else {
              //choose one at random
              this.imageName =
                this.imageName[
                  Math.floor(Math.random() * this.imageName.length)
                ]
            }
          } else {
            //is normal object, interpret to display as several layered images
            this.imageName = this.imageName.layers
          }
        }

        //wrap in array if not array yet
        if (!Array.isArray(this.imageName)) {
          this.imageName = [this.imageName]
        }

        //for all image names
        this.elems = this.imageName.map(imageName => {
          //location index for this one image
          const locationIndex = Displayable.getImageSource(imageName)

          //generate new with prepared attribs
          return {
            elem: $("<img>", {
              class: "tile",

              //init with first location
              src: Displayable.makeImgAttrib(imageName, locationIndex),

              //disable dragging to prevent touch inputs sometimes not working
              draggable: false
            }),
            name: imageName,
            ownLocationIndex: locationIndex,
          }
        })

        //attach error handler to switch to next location if current one fails
        this.elems.forEach(item =>
          item.elem.on("error", e => {
            //get current location index
            let locationIndex = Displayable.getImageSource(item.name)

            //stop if no other locations left
            if (locationIndex === Displayable.imgLocations.length - 1) {
              return
            }

            //increment image source location index if current own is the same
            //otherwise many tiles trigger an error and the location is incremented too many times
            if (item.ownLocationIndex === locationIndex) {
              Displayable.imageSourceRegistry[item.name] = ++locationIndex

              //update own
              item.ownLocationIndex = locationIndex
            }

            //set to try other location (increment index)
            $(e.target).attr(
              "src",
              Displayable.makeImgAttrib(item.name, locationIndex)
            )
          })
        )
      }

      //don't make list of elements if not necessary (if flag on)
      if (!noReturn) {
        //return list of elements
        return this.elems.map(item => item.elem)
      }
    },

    //updates the display image with a given new image name
    changeImageName(newImageName = this.imageName, index = 0) {
      //get element item to modify, default to index 0 because the only,
      //tiles that have several layers are terain tiles which don't normally change images
      const item = this.elems[index]

      //stop if image name didn't actually change
      if (newImageName === item.name) {
        return
      }

      //set new as image name
      item.name = newImageName

      //reset location index, new image -> new search
      item.locationIndex = 0

      //set a new name in the img element
      //TODO: don't we need to deal with the location index here?
      item.elem.attr("src", Displayable.makeImgAttrib(item.name))
    },
  },
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
      if (!noUpdate) {
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
    },
  },
})

//disallows walking on the tile if this object is on it
const NonWalkableObject = stampit.methods({
  //disallow putting things on this by default, called to check if something can move onto this
  checkMove() {
    return false
  },
})

//movable supplies methods for trying to move (being the subject of the move)
const Movable = stampit.compose({
  statics: {
    //makes a movement object from a direction (generates offset)
    makeMovementDescriptor(direction) {
      return {
        //copy direction
        direction,

        //and lookup offset in movement offsets
        offset: directionOffsets[direction],
      }
    },
  },

  methods: {
    //tries to perform a move
    attemptMove(targetTile, movement, initiator) {
      //construct actors
      const actors = { subject: this, initiator }

      //check if target tile is ok with movement to it, no action if out of bounds
      return (
        targetTile &&
        this.parent.checkLeave(movement, actors, targetTile) &&
        targetTile.checkMove(movement, actors)
      )
    },

    //does the actual moving
    performMove(targetTile, movement, initiator) {
      //build the actors object
      const actors = { subject: this, initiator }

      //notify current tile that this object is leaving
      this.parent.notifyLeave(movement, actors, targetTile)

      //notify terrain tiles and objects and so on
      targetTile.notifyMove(movement, actors)

      //notify tile on opposite side of movement, target tile is this terrain tile is present
      const oppositeTargetTile = this.level.getTileAt(
        Vector.sub(this, movement.offset)
      )
      if (oppositeTargetTile) {
        oppositeTargetTile.oppositeNotifyLeave(movement, actors, this.parent)
      }

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
      //stop if deleted in the mean time
      if (this.deleted) {
        return
      }

      //get target tile for movement
      const targetTile = this.getTargetTile(movement)

      //if target tile is invalid
      if (!targetTile) {
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
    },
  },
})

//pushable allows floating objects to be pushed by the player
const Pushable = Movable.methods({
  //check if next can be walked on by this object
  checkMove(movement, actors) {
    return this.pushableCheckMove(movement, actors)
  },

  //actual checking function, is broken out to make external call possible
  pushableCheckMove(movement, actors) {
    //require subject and initiator to be the same (don't allow double pushing)
    return (
      actors.initiator === actors.subject &&
      //don't allow pushing by projectiles
      !actors.subject.isProjectile &&
      //deny pushing down grass
      !(
        actors.subject.parent.terrainType === "Grass" &&
        this.parent.terrainType === "Land"
      ) &&
      //check if push movement ok in general (for this object)
      (!this.checkPush || this.checkPush(movement, actors)) &&
      //try to move in direction of current movement, keep initiator
      this.attemptMove(this.getTargetTile(movement), movement, actors.initiator)
    )
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
  },
})

//Sinkable object can be pushed into water,
//optional method "sink" can be defined to specify behavior after being pushed into water
const Sinkable = Pushable.props({
  //prop to signal to water to allow pushing this into it
  sinkable: true,
})

//watertight objects can be in water and suport other objects if pushed onto them
const Watertight = stampit.props({
  watertight: true,
  heightPriority: -1,
})

//requires objects with this behavior to be all gone from the field before finishing the level
const RequireGone = stampit.props({
  requireGone: true,
})

//items can be picked up and are stored in a fixed type inventory
const Item = stampit.compose({
  //on composition with pickable
  composers({ stamp, composables }) {
    //copy image name and tile type into statics
    //so inventory can dispaly items of which no instance exists
    const props = composables[composables.length - 1].properties
    stamp.imageName = props.imageName
    stamp.tileType = props.tileType
  },

  props: {
    //signal to be item (for counting on whole level)
    isItem: true,
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
    },
  },
})

//can receive items and perform actions when a certain amount of items is reached
const Receptacle = stampit.compose({
  props: {
    //starts off with 0 received items
    receivedItems: 0,
  },

  methods: {
    //take items when "bumped" into
    notifyCheckMove(movement, actors) {
      //require player to be moving into us and moving in specified direction if set
      if (
        actors.subject.tileType === "Player" &&
        (typeof this.requireDirection !== "number" ||
          movement.direction === this.requireDirection) &&
        (!this.checkReceiveItems || this.checkReceiveItems(movement, actors))
      ) {
        //take all items specified in prop from level
        const gottenItems = this.level.inventory.takeItems(
          this.itemType,
          this.itemReceiveType
        ) //itemReceiveType is number or "all"

        //increment received items with new items
        this.receivedItems += gottenItems

        //if present and any items received, call callback of specific type
        if (gottenItems && this.receiveItems) {
          this.receiveItems(gottenItems, movement)
        }
      }
    },
  },
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
  },
})

//registers the object in the level registry for things
//where an array of all objects of a certain type needs to be accessed
const Registered = stampit.init(function () {
  //register in level
  this.level.registry.register(this)
})

//subtyped objects get additional type data so we don't have to make enumerated class names
const Subtyped = stampit.compose({
  statics: {
    //return the images of all subtypes
    getPreloadImages() {
      return Object.keys(this.subtypes).map(
        ({ imageName }) => imageName
      )
    },
  },

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
      //save given init data
      this.subtypeIndex = subtypeIndex

      //get type specific data (expects the composed object to specify a static type array)
      this.typeData = this.subtypes[subtypeIndex]

      //setup image name and specific tileType subtype
      this.imageName = this.typeData.imageName
      this.tileType = this.typeData.tileType
    },

    //changes the subtype later
    changeSubtype(newSubtype) {
      //setup with new given subtype
      this.setupSubtype(newSubtype)

      //update image name for new image of subtype (already set so not passing it)
      this.changeImageName()
    },
  },
})

//animation particles are used for animation of effects
//(are removed in animation before the player regains control)
const AnimationParticle = FloatingObject.compose({
  props: {
    tileType: "AnimationParticle",
    imageName: "unknown",
  },

  statics: {
    //how long it takes for the animation particle to disappear on its own
    ttl: 50,
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
  },
})

//triggers a callback after moves have finished
const Weighted = stampit.compose({
  props: {
    //true when weight (another object) is on this object
    hasWeight: false,

    //is set to true to avoid registering multiple check actions
    checkRegistered: false,

    //extra weight is not present by deafult, can be set though
    extraWeight: false,
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
      this.level.anim.registerAction(
        () => {
          //unset check flag
          this.checkRegistered = false

          //get new weight value, has weight if extra weight set
          //or more than this object present in this tile
          const newHasWeight =
            this.extraWeight || this.parent.objects.length > 1

          //if weight state changed
          if (newHasWeight !== this.hasWeight) {
            //change state
            this.hasWeight = newHasWeight

            //notify object
            this.weightStateChanged(this.hasWeight)
          }
        },
        { delay: 0, priority: -1 }
      )
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
    },
  },
})

//unknown item is a placeholder
const UnknownObject = FloatingObject.props({
  tileType: "UnknownObject",
  imageName: "unknown",
})

//disallows teleporting this object
const NonTeleportable = stampit.methods({
  checkNoTeleport() {
    return true
  },
})

//re-allows teleporting this object
const Teleportable = stampit.methods({
  checkNoTeleport() {
    return false
  },
})

//projectile moves on it's own until it hits something
const Projectile = Movable.compose(NonTeleportable, {
  props: {
    isProjectile: true,
    heightPriority: 2,
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
    },
  },
})

//incepts checkMove for an additional check, same for notifyMove
//TODO: make animations also halt on object itself,
//currently the object is absorbed before it can be displayed on the absorbing tile
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

    //do push handler that triggers push if not disabled
    if (doPush) {
      //then also notify push handler
      this.pushableNotifyMove(movement, actors)
    }
  },
})

//moves with pulling, the player moves away after being adjacent and this object follows
const Pullable = Movable.methods({
  //when player moves away
  oppositeNotifyLeave(movement, actors, targetTile) {
    //is player moving
    if (actors.subject.tileType === "Player") {
      //move to target tile which is where player moves away from
      this.move(movement, actors.initiator)

      //if present, execute notify pull,
      //note that this handler is called after the movement
      //as opposed to before the movement like the other notify handlers are
      if (this.notifyPull) {
        this.notifyPull(movement, actors, targetTile)
      }
    }
  },
})
