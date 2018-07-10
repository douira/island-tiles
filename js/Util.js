/*global stampit*/
/*exported directionOffsets*/

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
    }
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

//handles rendering of a tile
const Displayable = stampit.compose({
  statics: {
    //list of locations to look for the images
    imgLocations: [
      "tiles",
      "tiles-new",
      "tiles-common"
    ],

    //returns the attribute value for a given image name
    makeImgAttrib(forName, index = 0) {
      return `${Displayable.imgLocations[index]}/${forName}.png`
    },

    //list of what location idnex to use for all images
    imageSourceRegistry: { },

    //returns the current image source for the given image name
    getImageSource(imageName) {
      //set to initial 0 if not present
      if (! (imageName in Displayable.imageSourceRegistry)) {
        Displayable.imageSourceRegistry[imageName] = 0
      }

      //return current
      return Displayable.imageSourceRegistry[imageName]
    }
  },

  methods: {
    //generates a dom object for this tile; an image element
    getImgElem(noReturn) {
      //check that img element doesn't exist yet
      if (! this.elems) {
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
              this.imageName = this.imageName[Math.floor(Math.random() * this.imageName.length)]
            }
          } else {
            //is normal object, interpret to dispaly as several layered images
            this.imageName = this.imageName.layers
          }
        }

        //wrap in array if not array yet
        if (! (this.imageName instanceof Array)) {
          this.imageName = [this.imageName]
        }

        //for all image names
        this.elems = this.imageName.map(imageName => {
          //locaion index for this one image
          const locationIndex = Displayable.getImageSource(imageName)

          //img elem attribs
          const attribs = {
            class: "tile",

            //init with first location
            src: Displayable.makeImgAttrib(imageName, locationIndex)
          }

          //check if present, and call get tile id (present on terrain tiles)
          if (this.getTileIdAttrib) {
            attribs.id = this.getTileIdAttrib()
          }

          //generate new with prepared attribs
          return {
            elem: $("<img>", attribs),
            name: imageName,
            ownLocationIndex: locationIndex
          }
        })

        //attach error handler to switch to next location if current one fails
        this.elems.forEach(item => item.elem.on("error", e => {
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
          $(e.target).attr("src", Displayable.makeImgAttrib(item.name, locationIndex))
        }))
      }

      //don't make list of elements if not necessary (if flag on)
      if (! noReturn) {
        //return list of elements
        return this.elems.map(item => item.elem)
      }
    },

    //updates the display image with a given new image name
    changeImageName(newImageName, index = 0) {
      //get element itm to modify, default to index 0 because the only,
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
      item.elem.attr("src", Displayable.makeImgAttrib(item.name))
    }
  }
})
