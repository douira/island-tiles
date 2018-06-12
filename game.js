//Vector class represents a 2D position
class Vector {
  //makes a vector from two numbers
  constructor(x, y) {
    //use 0 if not given
    this.x = x || 0
    this.y = y || 0
  }

  //can be moved in directions
  add(x, y) {
    //use vector if given
    if (x instanceof Vector) {
      //get x and y
      y = x.y
      x = x.x
    }

    //must be numbers
    if (typeof x !== "number" || typeof y !== "number") {
      throw Error("vector add params must be numbers");
    }

    //add to own values
    this.x += x
    this.y += y

    //chaining
    return this
  }

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
  }

  //statically add vectors and create a new vector
  static add(v1, v2) {
    //require both to be vectors
    if (v1 instanceof Vector && v2 instanceof Vector) {
      //return vector with components added
      return new Vector(v1.x + v2.x, v1.y + v2.y)
    } else {
      throw Error("static vector add needs two vectors to be passed")
    }
  }
}

//handles rendering of a tile
class DisplayTile extends Vector {
  //make this new tile at a position
  constructor(x, y, imageName) {
    //call Vector constructor
    super(x, y)

    //save the name of the tile image file
    //needs to be determined in relaion to other surrounding tiles if not given
    this.imageName = imageName
  }

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
        src: "tiles/" + this.imageName + ".png"
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
  }

  //does nothing if not overriden
  calcImageName() { }
}

//a terrain tile is a displayable tile that can have objects on it
class TerrainTile extends DisplayTile {
  //init like display tile
  constructor(x, y, imageName) {
    //init super
    super(x, y, imageName)

    //init empty list of floating objects
    this.objs = []
  }

  //sets itself up in the specified position in the given table
  //doesn't do anything if it's already set up
  initDisplay(level, table) {
    //update image name with tile config
    this.calcImageName(level)

    //get td of this position
    const tableCellElem = table.children(".row-" + this.y).children(".col-" + this.x)

    //if not set in there already
    if (! tableCellElem.children().length) {
      //add img elem to that table cell
      tableCellElem.append(this.getImgElem())

      //add image elements for all child objects
      this.objs.forEach(o => o.addToCell(tableCellElem))
    }
  }

  //returns id to be put on non moving img element
  getTileIdAttrib() {
    return "tile" + this.x + "-" + this.y
  }

  //adds a floating object to this tile
  addFloatingObj(objs) {
    //if given array, call on each element given
    if (objs instanceof Array) {
      //call on each
      objs.forEach(this.addFloatingObj, this)

      //stop, already processed
      return
    }

    //obj must be of floating object type, TODO: check for that

    //add to list of floating objects
    this.objs.push(objs)
  }
}

//neighbour offsets translate own position into the position of a neighbour
const neighbourOffsets = [
  new Vector(0, -1),
  new Vector(1, 0),
  new Vector(0, 1),
  new Vector(-1, 0)
]

//maps from neighbourhood configs to imageNameMap names,
//i for inside type, o for outside type tiles (first is top going clockwise)
const neighbourConfigNameMap = {
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

//RoundedTile does calculations regarding corners and edges for grass and land tiles
class RoundedTile extends TerrainTile {
  //is given a image name map for all the different positions
  //pass true as insideTypes to accept only self as inside,
  //padd falsy to accept all except for field borders
  constructor(x, y, imageNameMap, insideTypes) {
    //call super to init
    super(x, y)

    //save map and insideTypes behavior spec
    this.imageNameMap = imageNameMap
    this.insideTypes = insideTypes
  }

  //determine image name from surrouding tile types
  calcImageName(level) {
    //for all items, resolve getters if given
    if (this.insideTypes instanceof Array) {
      this.insideTypes = this.insideTypes.map(tileClass => tileClass())
    }

    //for all possible neighbour positions, determine inside or outside status
    const neighbourConfig = neighbourOffsets.map(offset => {
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
        neighbourTile.constructor === this.constructor ||
        this.insideTypes.length && this.insideTypes.includes(neighbourTile.constructor)
      ) ? "i" : "o"
    }).join("")

    //set from name map and choose base image if special one not present
    this.imageName = this.imageNameMap[
      //get name in image name map from neighbourhoodNameMap,
      //choose center if unknown neighbour config
      neighbourConfigNameMap[neighbourConfig] || "center"
    ] || this.imageNameMap.center
  }
}

//ClassRegistry ties up the rounded tile constructors that reference eachother
class ClassRegistry {
  //init an empty or prefilled list of classes
  constructor(init) {
    this.classes = init || { }
  }

  //register a class in the list of classes
  register(name, addClass) {
    //add to list with name
    this.classes[name] = addClass;
  }

  //return a getter function for the class of the specified identifier
  classGetterFor(name) {
    return () => this.classes[name]
  }
}

//make a class registry
const classRegistry = new ClassRegistry();

//the Land tile
class Land extends RoundedTile {
  //init the render tile with the correct image
  constructor(x, y) {
    //init with land image map
    super(x, y, {
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
    }, [classRegistry.classGetterFor("Grass")])
  }
}

//the Grass tile
class Grass extends RoundedTile {
  //init the render tile with the correct image
  constructor(x, y) {
    //init with grass image map
    super(x, y, {
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
    }, true)
  }
}

//the Water tile
class Water extends RoundedTile {
  //init the render tile with the correct image
  constructor(x, y) {
    //init with grass image map
    super(x, y, {
      center: ["water-1", "water-2", "water-3"],
      edgeTop: "water-border-t",
      rightTop: "water-border-t",
      leftTop: "water-border-corner",
      edgeLeft: "water-border-l",
      leftBottom: "water-border-l"
    })
  }
}

//register classes used in definitions of classes that extend RoundedTile
classRegistry.register("Land", Land)
classRegistry.register("Grass", Grass)
classRegistry.register("Water", Water)

//a basic object that can be on top of a terrain tile
class ObjectTile extends DisplayTile {
  //created with a position and the image name
  constructor(x, y, imageName) {
    //init super tile
    super(x, y, imageName)
  }

  //adds the image element for this object to the given table cell
  addToCell(cell) {
    //get img element and save for moving round
    this.imgElem = this.getImgElem()

    //add to cell given
    cell.append(this.imgElem)
  }
}

//rock tile is stationary
class Rock extends ObjectTile {
  //init with image name
  constructor(x, y) {
    //use multiple possible images
    super(x, y, ["rock-1", "rock-2"])
  }
}

//rock palm is stationary
class Palm extends ObjectTile {
  //init with image name
  constructor(x, y) {
    //use multiple possible images
    super(x, y, ["palm-1", "palm-2"])
  }
}

//map from key codes for WASD and arrow keys to directions
const keyCodeDirections = {
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

//map from direction to offset vector
const keyDirectionOffsets = [
  //up, right, down, left
  new Vector(0, -1),
  new Vector(1, 0),
  new Vector(0, 1),
  new Vector(-1, 0)
]

//represents the player, controllable and deals with interaction
class Player extends ObjectTile {
  //init with image name
  constructor(x, y) {
    //use starting player image facing upwards
    super(x, y, "player-t")

    //register key interaction handler
    $(document).keydown((function(e) {
      //prevent default action of moving the page or similar
      e.preventDefault()

      //if not present, we don't care about this key
      if (! (e.which in keyCodeDirections)) {
        return
      }

      //get key direction
      const keyDirection = keyCodeDirections[e.which]

      //try to move with offset vector for this direction
      this.move(keyDirectionOffsets[keyDirection])
    }).bind(this));
  }

  //called when the player should move in that direction
  move(movement) {

  }
}

//mapping from position descriptors to tile classes
const positionDescriptorMapping = {
  //first field is always the tile type
  tiles: {
    w: Water,
    l: Land,
    g: Grass
  },

  //all following fields are the floating objects and the player
  objs: {
    r: Rock,
    p: Palm,
    pl: Player,
    /*bw: WetBox,
    h: Goal, //h for house
    b: Box,
    t: Teleporter,
    wh: WaterHole,
    sh: SeedHole,
    s: Seed,
    wb: WaterBottle,
    sp: Spring,
    st: Starfish,
    sp: Spikes,
    sb: SpikeButton
    sl: Slingshot,
    pb: Pebble,
    c: Coconut,
    ch: CoconutHole*/
  }
}

//level describes the configuration of the playing field
class Level {
  //is constructed in the level store, parses the level format
  constructor(name, dim, field) {
    //copy fields
    this.name = name
    this.dim = dim
    this.field = field

    //normalize input
    this.normalize()

    //apply padding to field
    this.applyPadding()

    //parse the field into tiles and floating objects
    this.parseField()
  }

  //normalizes input format
  normalize() {
    //parse fields, split into arrays if seperated with delimiter
    if (typeof this.field === "string") {
      //split on any non alphanumeric char sequence
      this.field = this.field.split(/[^a-zA-Z0-9]+/)
    }

    //must be array at this point
    if (! (this.field instanceof Array)) {
      throw Error("fields must be a string or array")
    }

    //make dim a vector if not one already
    if (typeof this.dim === "number") {
      this.dim = new Vector(this.dim, this.dim)
    } else if (! this.dim) {
      //make null vector, will be adjusted later
      this.dim = new Vector()
    }

    //error if not a vector now
    if (! (this.dim instanceof Vector)) {
      throw Error("dimension parameter must be falsy, a vector or number")
    }

    //parse 2d field
    this.field = this.field
    //must be array or string
    .filter(line => typeof line === "string" || line instanceof Array)

    //split into individual positions if element is string
    .map(line => {
      //if line is string, split into chars
      if (typeof line === "string") {
        line = line.split("")
      }

      //process line, split all remaining strings into chars and wrap
      return line.reduce((arr, item) => {
        //for type of line item
        if (typeof item === "string") {
          //split into chars and wrap into arrays and add individually
          return arr.concat(item.split("").map(c => [c]))
        } else if (item instanceof Array) {
          //push array as whole right away
          arr.push(item)

          //return expanded array
          return arr
        } else {
          throw Error("line items must be a string or array")
        }
      }, [])
    })
  }

  //returns a padding position descriptor or an array of them
  static getPadding(length) {
    //make array if length set as positive number
    if (typeof length === "number" && length >= 1) {
      //init array to fill
      const arr = []

      //fill with specified number of positions
      for (let i = 0; i < length; i ++) {
        arr[i] = Level.getPadding()
      }

      //return filled array
      return arr
    } else {
      //single position
      return ["w"]
    }
  }

  //applies padding to the field
  applyPadding() {
    //determine size of the field
    const fieldDim = new Vector(
      this.field.reduce((max, line) => Math.max(max, line.length), 0),
      this.field.length
    )

    //flag that is set if padding needs to be done
    let needsPadding = false

    //if field is larger or already at than specified size
    if (fieldDim.x >= this.dim.x) {
      //"stretch" dim to fit field
      this.dim.x = fieldDim.x
    } else {
      //set padding necessary flag
      needsPadding = true
    }
    if (fieldDim.y >= this.dim.y) {
      this.dim.y = fieldDim.y
    } else {
      //set paddign necessary flag
      needsPadding = true
    }

    //if padding is necessary
    if (needsPadding) {
      //total padding needed, divide by 2 for the padding needed on each side
      const sidePadding = new Vector(this.dim.x - fieldDim.x, this.dim.y - fieldDim.y).mult(0.5)

      //split padding into pre and post padding on both axis
      const prePadding = new Vector(Math.floor(sidePadding.x), Math.floor(sidePadding.y))
      const postPadding = new Vector(Math.ceil(sidePadding.x), Math.ceil(sidePadding.y))

      //apply post padding and fill out any uneven lines
      for (let y = 0; y < fieldDim.y + postPadding.y; y ++) {
        //if line doesn't exist, create it
        if (! this.field[y]) {
          this.field[y] = [];
        }

        //get the current line
        const line = this.field[y];

        //for every needed position in x direction
        for (let x = 0; x < fieldDim.x + postPadding.x; x ++) {
          //make padding if not present
          if (! line[x]) {
            line[x] = Level.getPadding();
          }
        }
      }

      //if there is any pre x padding
      if (prePadding.x) {
        //add pre x padding, for every present line
        for (let y = 0; y < this.field.length; y ++) {
          //prepend prePadding length of padding
          this.field[y] = Level.getPadding(prePadding.x).concat(this.field[y])
        }
      }

      //if there is any pre y padding
      if (prePadding.y) {
        //prepare array of padding lines
        const padding = []

        //for all pre padding lines
        for (let y = 0; y < prePadding.y; y ++) {
          //make full width padding line
          padding[y] = Level.getPadding(this.dim.x)
        }

        //prepend all padding lines to field
        this.field = padding.concat(this.field);
      }
    }
  }

  //parses the field into tiles and floating objects
  parseField() {
    //init empty list of tiles for better iteration
    this.tileList = []

    //for all positions of the field
    this.tiles = this.field.map((line, y) => line.map((position, x) => {
      //get mapped class from mapping
      const tileClass = positionDescriptorMapping.tiles[position[0]]

      //verify presence (that abbreviation in level description is valid)
      if (! tileClass) {
        throw Error("tile abbrev given in level description is invalid")
      }

      //make new tile with class gotten from mapping
      const tile = new tileClass(x, y)

      //if objects specified
      if (position.length > 1) {
        //make objects
        const objs = position.map((objAbbrev, index) => {
          //not on first elem, that is the tile abbrev
          if (! index) {
            return
          }

          //get obj class, select from obj mapping
          const objClass = positionDescriptorMapping.objs[objAbbrev]

          //check for validity
          if (! objClass) {
            throw Error("obj abbrev given in level description is invalid")
          }

          //return created object
          return new objClass()
        })

        //remove first (is empty and not processed, is the tile itself)
        objs.shift()

        //add all objs to tile
        tile.addFloatingObj(objs)
      }

      //also add tile to linear list of tiles for non position specific iteration
      this.tileList.push(tile)

      //return generated tile
      return tile
    }));
  }

  //adds all tiles to the given table
  initInTable(table) {
    //empty present contents of table
    table.empty()

    //add a table row
    const row = $("<tr>").appendTo(table)

    //add item to row
    const item = $("<td>").appendTo(row)

    //clone column w - 1 times
    for (let i = 1; i < this.dim.x; i ++) {
      //add a item clone and set correct x pos
      row.append(item.clone().addClass("col-" + i))
    }

    //set class for first item
    item.addClass("col-0")

    //clone whole row h - 1 times
    for (let i = 1; i < this.dim.y; i ++) {
      //add cloned row and set correct y pos
      table.append(row.clone().addClass("row-" + i))
    }

    //set class for first row
    row.addClass("row-0")

    //simply iterate and call method on each tile
    this.tileList.forEach(tile => tile.initDisplay(this, table))

    //set min width of table to current width to prevent squishing
    table.css("min-width", table[0].offsetWidth)
  }

  //returns the tile at the given position
  getTileAt(x, y) {
    //init has to be finished at this point as init happens in instantiation

    //use vector if given
    if (x instanceof Vector) {
      //get x and y
      y = x.y
      x = x.x
    }

    //must be numbers
    if (typeof x !== "number" || typeof y !== "number") {
      throw Error("tile get params must be numbers");
    }

    //check to be in bounds
    if (x >= 0 && x < this.dim.x && y >= 0 && y < this.dim.y) {
      //return tile at 2d position
      return this.tiles[y][x]
    } else {
      //return false, is checked by caller and handled accordingly
      return false
    }
  }
}

//the game object has a field of tiles
class Game {
  //constructed with a level object
  constructor(level) {
    //get display table
    this.table = $(".field")

    //save level
    this.level = level

    //setup level in table
    this.level.initInTable(this.table)
  }
}

//game level definitions, is padded with water if field is smaller than specified size
const levels = [
  new Level(
    "Mahkilaki",
    new Vector(20, 12),
    [
      "wwlllwww",
      ["wllggl", ["l", "r"], ["l", "p"]],
      "wllgggll",
      ["wwwl", ["l", "pl"], "lll"],
      "wlllwwww",
      "wlwwwwww",
      "wwlwwwww",
      "wwwwwwww"
    ]
  )
]

//when document is present
$(document).ready(function() {
  //make a game with the first level
  new Game(levels[0])
});
