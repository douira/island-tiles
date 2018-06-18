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
      //must be numbers
      if (typeof x !== "number" || typeof y !== "number") {
        throw Error("vector add params must be numbers");
      }

      //add to own values
      this.x += x
      this.y += y

      //chaining
      return this
    },

    //multiply by a scalar
    mult(scalar) {
      //must be number
      if (typeof scalar !== "number") {
        throw Error("scalar in vector mult must be number")
      }

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
    }
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
  //default tile name
  props: {
    tileType: "NotExtended!"
  },

  statics: {
    //returns the attribute value for a given image name
    makeImgAttrib(forName) {
      return "tiles/" + forName + ".png"
    }
  },

  methods: {
    //generates a dom object for this tile; an image element
    getImgElem() {
      //if image name is an array
      if (this.imageName instanceof Array) {
        //on lengths of array
        if (! this.imageName.length) {
          //error for missing
          throw Error("no image names given in array of names")
        } else if (this.imageName.length === 1) {
          //choose the only one
          this.imageName = this.imageName[0]
        } else {
          //choose one at random
          this.imageName = this.imageName[Math.floor(Math.random() * this.imageName.length)]
        }
      } else if (! this.imageName) {
        throw Error(
          "must pass image name or call calcImageName to generate before getting img element"
        )
      }

      //check that img element doesn't exist yet
      if (! this.elem) {
        //img elem attribs
        const attribs = {
          class: "tile",
          src: Displayable.makeImgAttrib(this.imageName)
        }

        //check if present, and call get tile id (present on terrain tiles)
        if (this.getTileIdAttrib) {
          attribs.id = this.getTileIdAttrib()
        }

        //generate new with prepared attribs
        this.elem = $("<img>", attribs)
      }

      //return current element
      return this.elem
    },

    //updates the display image with a given new image name
    changeImageName(newImageName) {
      //stop if image name didn't actually change
      if (newImageName === this.imageName) {
        return
      }

      //set new as image name
      this.imageName = newImageName

      //set a new name in the img element
      this.elem.attr("src", Displayable.makeImgAttrib(this.imageName))
    }
  }
})
