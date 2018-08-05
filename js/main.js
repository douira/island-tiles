/*global stampit, Level, Vector, levelData*/
//Note: props is a shallow copy and thereby partially shared among instances

//determine debug mode status
const debugging = window.location.search === "?debug=true"

//the game object has a field of tiles
const Game = stampit.compose({
  props: {
    //enable next starts off disabled
    enableNextBtn: false,

    //the index of the level the player has reached
    reachedIndex: 0,

    //the index of the highest completed level
    completedIndex: -1,

    //start with current index at first level
    levelIndex: 0
  },

  //constructed with a level object
  init({ levels }) {
    //get display elements for level display
    this.elems = {
      table: $("#field"),
      itemDisplay: $("#item-list"),
      levelIndex: $(".level-index"),
      levelName: $("#level-name"),
      message: $("#message-text"),
      nextBtn: $("#next-level"),
      controls: $("#controls"),
      prevBtn: $("#prev-level"),
      resetBtn: $("#reset-level"),
      progress: $("#progress-info")
    }

    //save levels
    this.levels = levels

    //attempt to read previous saved progress
    try {
      this.completedIndex = parseInt(window.localStorage.getItem("completed"), 10)

      //also set reached and current level
      if (this.completedIndex >= 0) {
        this.levelIndex = this.completedIndex + 1
        this.reachedIndex = this.levelIndex

        //update controls for changed info
        this.updateControls()
      } else {
        //set back to original -1 if invalid
        this.completedIndex = -1
      }
    } catch (e) { }

    //init the first level (currently set)
    this.startNextLevel(0)

    //register handler to start next level when link is clicked
    this.elems.nextBtn.on("click.controls", e => {
      //dont follow link
      e.preventDefault()

      //start the next level
      this.startNextLevel(1)
    })

    //or enter is pressed
    $(document).on("keydown.controls", e => {
      //on enter key press
      if (e.which === 13) {
        //don't interact
        e.preventDefault()

        //check that is allowed
        if (this.enableNextBtn) {
          //start next level
          this.startNextLevel(1)
        }
      }
    })

    //handler to reset level
    this.elems.resetBtn.on("click.controls", e => {
      //don't do link action
      e.preventDefault()

      //start current level again
      this.startCurrentLevel()
    })

    //handler to go back one level
    this.elems.prevBtn.on("click.controls", e => {
      //don't do link action
      e.preventDefault()

      //if a previous level exists
      if (this.levelIndex) {
        //go back to previous level
        this.startNextLevel(-1)
      }
    })
  },

  statics: {
    //sets the enabled state of a control element
    setEnabled(elem, enabled, setClass) {
      //add or remove enabling class
      elem[enabled ? "addClass" : "removeClass"](setClass)
    }
  },

  methods: {
    //removes handlers of this game
    remove() {
      //remove all with .controls
      $(document).off(".controls")
      $("#controls").find("*").off(".controls")

      //unregister level handlers
      if (this.currentLevel) {
        this.currentLevel.unregisterHandlers()
      }
    },

    //updates the display of the controls
    updateControls() {
      //prev button is active if not at first level
      Game.setEnabled(this.elems.prevBtn, this.levelIndex, "active-control")

      //reset button is always enabled

      //enable next button when reached level is higher than current level
      this.enableNextBtn = this.reachedIndex > this.levelIndex
      Game.setEnabled(this.elems.nextBtn, debugging || this.enableNextBtn, "active-control")

      //update progress info text
      this.elems.progress.text(`(${this.completedIndex + 1}/${this.levels.length} Levels done)`)
    },

    //inits the currently selected level
    startCurrentLevel() {
      //unregister on last level
      if (this.currentLevel) {
        this.currentLevel.unregisterHandlers()
      }

      //set as current level
      this.currentLevel = this.levels[this.levelIndex]

      //hide completed message and reset net button bold
      this.elems.message.addClass("hide-this")
      this.elems.nextBtn.removeClass("bold")

      //init level in table
      this.currentLevel.initInPage(this, this.elems, this.levelIndex)
    },

    //inits the given level index (or the previous one if -1 passed)
    startNextLevel(delta = 1) {
      //check if a level with this index exists
      if (this.levelIndex < this.levels.length) {
        //increment level counter
        this.levelIndex += delta

        //update controls display
        this.updateControls()

        //start selected level
        this.startCurrentLevel()
      }
    },

    //called by the current level when the player completes it
    levelCompleted() {
      //update max completed
      this.completedIndex = Math.max(this.completedIndex, this.levelIndex)

      //set reached level to at least the next level, cap at max level
      this.reachedIndex = Math.min(this.levels.length - 1, this.completedIndex)

      //try to save reached level in local storage for persistence
      try {
        window.localStorage.setItem("completed", this.completedIndex)
      } catch (e) { }

      //make completed message visible and make next button bold
      this.elems.message.removeClass("hide-this")
      this.elems.nextBtn.addClass("bold")

      //update controls display
      this.updateControls()
    }
  }
})

//create levels from raw level data
let levels = levelData.map(data => Level(data))

//custom game level definitions, is padded with water if field is smaller than specified size
levels.push(...[
  Level({
    name: "Kramba Radidi",
    dim: Vector({ x: 0, y: 0 }),
    field: [
      [["l", "pa"], "lw", ["l", "pa"], ["l", "pa"], ["l", "ho"], ["l", "rc"]],
      [["l", "tp"], ["l", "st"], "wl", ["l", "pa"], "l", ["l", "tp"]],
      ["wwwl", ["l", "tr"], "w"],
      "wwwl",
      ["w", ["l", "pa"], "ll"],
      [["w", "ra"], "l", ["l", "bx"], "l"],
      ["w", ["l", "pl"], "l", ["l", "tr"]],
    ]
  }),
  Level({
    name: "Ukulat B'tiema",
    dim: Vector({ x: 0, y: 0 }),
    field: [
      ["wwl", ["l", "bc"], ["l", "bc"]],
      ["w", ["l", "rc"], ["l", "pa"], ["l", "rc"], ["l", "bc"]],
      ["w", ["l", "mc"], ["l", "bc"], ["l", "bx"]],
      [["l", "ho"], "l", ["l", "st"], "l", ["w", "rc"]],
      [["l", "pl"], ["l", "bx"], "lllw", ["w", "rc"]],
      [["w", "ic"], ["w", "ic"], ["w", "ic"], ["w", "ic"]]
    ]
  }),
  Level({
    name: "Mahkilakii",
    dim: Vector({ x: 0, y: 0 }),
    field: [
      ["wwwl", ["l", "pa"], ["l", "ho"], "w"],
      ["wwllllw"],
      ["wl", ["l", "pa"], "g", ["g", "rc"], "g", ["l", "rc"], ["l", "pa"]],
      ["wllgg", ["g", "pa"], "ll"],
      ["w", ["l"], ["l", "bx"], ["l", "pl"], ["l", "bx"], "l", ["l", "st"], "l", ["w", "rc"]],
      ["wlll", ["w", "bw"], "www"]
    ]
  }),
  Level({
    name: "Zuumoadila",
    dim: Vector({ x: 0, y: 0 }),
    field: [
      ["lll", ["l", "bx"]],
      ["l", ["l", "wb"], ["l", "wh"], ["l", "sh"],  ["l", "se"]],
      [["l", "pl"], "g", ["g", "ho"], "g", ["l", "pa"]],
      [["l", "rc"], ["g", "pa"], "ggl"],
      ["l", ["l", "rc"], ["l", "rc"], ["l", "pa"],]
    ]
  }),
  Level({
    name: "Karitiki Ta",
    dim: Vector({ x: 0, y: 0 }),
    field: [
      "wwwwwlll",
      ["wwlww", ["l", "bx"], "lll", ["l", "bx"], "ww"],
      ["wwwwll", ["l", "bc"], ["g", "pa"], ["g", "mc"], ["g", "pl"], ["l", "bx"]],
      ["l", ["l", "bc"], "ww", "ll", ["l", "sh"], "gggl"],
      [["l", "se"], ["l", "bx"], "lww", ["l", "wb"],
       ["l", "wh"],  ["l", "rc"], ["l", "ho"], ["l", "bx"]],
      [["l", "bc"], ["l", "bc"], "lwwwllll"],
    ]
  })
])

//loads and processes level files
const LevelFileReader = stampit.compose({
  statics: {
    //mapping from file byte values to object type abbreviations
    binFormatMaps: {
      terrainTypes: {
        29: ["w", "bw"],
        31: "wh",
        32: "sh",
        37: "tp",
        39: "tr",
        26: "crr", //crosses r, b and g
        27: "crb",
        28: "crg",
        36: "bt",
        30: "sb",
        25: "bb",
        46: ["l"], //coconut path helper element that we don't need,
        45: "ct",
        44: "cp",
        38: ["w", "ra"], //pirate doesn't spawn a raft if there is one already beneath it
        43: ["w", "hp"],
        41: "re",
        40: ["w", "ic"],
        47: ["g", "fsy"],
        48: ["g", "fsr"],
        10: "sfg",
        35: "sfr",
        42: ["l"] //also land? appears underneath coconut hole in source level 62
          //but doesn't seem to do anything
      },
      objectTypes: {
        56: "pl",
        51: "pa",
        55: "pa",
        54: "rc",
        75: "ho",
        57: "bx",
        65: "st",
        67: "wb",
        64: "se",
        76: "sp",
        66: "bc",
        73: "mc",
        61: "fgr", //figures r, b and g
        62: "fgb",
        63: "fgg",
        72: "bm",
        91: "by",
        89: "sk",
        81: "pr",
        52: "pp",
        101: "tb1", //translate to tablet numbers
        102: "tb2",
        103: "tb3",
        104: "tb4",
        105: "tb5",
        82: "ci",
        58: "ch",
        60: "ky",
        80: "pb",
        83: "sl",
        71: "co",
        85: "lf0", //leaf directions
        86: "lf1",
        87: "lf2",
        88: "lf3",
        94: "cl",
        116: "br",
        70: "cc",
        90: "pi",
        92: "ph",
        117: "ls", //leafswitcher starting positons
        118: "ls",
        119: "ls",
        120: "ls", //speculative assignment
        53: "sn0", //three shell guy sign types
        100: "sn1",
        113: "sn2",
        97: "sg0",
        98: "sg1",
        99: "sg2", //speculative assignment
        111: "fly",
        112: "flr",
        114: "sq",
        95: "clo", //open clam
        122: "fa"
      }
    },

    //pads a string with the given length of chars
    padString(str, { length = 3, char = "0" } = { }) {
      return (char.repeat(length) + str).substr(-length, length)
    }
  },

  //inits and performes parsing
  init({ arrayBuffer, file }) {
    //save data as uint 8 array
    this.data = new Uint8Array(arrayBuffer)

    //also save file name
    this.fileName = file.name

    //if file not empty
    if (this.data[this.data.length - 1]) {
      //load the level from the data
      this.parseLevelFromData()
    }
  },

  methods: {
    //sets data in the field at a certain positions but clips off the unimportant edges
    setField(type, x, y, data) {
      //if withing interestign range
      if (x && x <= 20 && y && y <= 12) {
        //decrement both to compensate for edges
        x --
        y --

        //create row if missing
        if (! this.field[y]) {
          this.field[y] = []
        }

        //create field if missing
        if (! this.field[y][x]) {
          this.field[y][x] = []
        }

        //set at position
        this.field[y][x][type] = data
      }
    },

    //gets the level from the data
    parseLevelFromData() {
      //print string for level inspection
      let str = ""

      //step counter
      let i = 0

      //byte position calculated from step counter
      let byteAddress = 0

      //init level position field
      this.field = []

      //counts the index in the individual field positions
      let fieldIndex = -1

      //string used to mark unused/empty fields
      const placeholder = "___"

      //read whole file
      while (byteAddress < this.data.length) {
        //for print, insert break every line
        if (i % 14 === 0) {
          str += "\n"
        }

        //insert another break when the block finishes
        if (i % (14 * 22) === 0) {
          str += "\n"

          //also increment piece counter
          fieldIndex ++
        }

        //chars to put in the field/string print
        const add = this.data[byteAddress] || placeholder

        //add padded to
        str += LevelFileReader.padString(add)

        //if still in interesting field part
        if (fieldIndex <= 1) {
          //set in field with coordinates
          this.setField(fieldIndex, Math.floor(i / 14) % 22, i % 14, add)
        }

        //increment byte position
        i ++
        byteAddress = i * 128 + 2
      }

      //read level name at end of file
      this.levelName = this.data.slice(128 * 14 * 22 * 2 + 2)
        //by parsing into chars from char codes
        .reduce((str, c) => str + String.fromCharCode(parseInt(c)), "")

      //print fields visually
      console.log(str)

      //print combined field
      console.log(this.fileName + "\n" + this.field.map(
        //process each line
        l => l.map(i => i.map(f => LevelFileReader.padString(f)).join("")).join("")
      ).join("\n"))

      //build level descriptor from field chars, for each line
      const descr = this.field.map(line => {
        //map line, for each item
        line = line.map(item => {
          //start off position as water base
          let pos = ["w"]

          //terrain is in the first position
          const terrain = item[0]

          //if terrain is a type of flat land object
          const flatLandObject = LevelFileReader.binFormatMaps.terrainTypes[terrain]
          if (flatLandObject) {
            //use whole array if given
            if (Array.isArray(flatLandObject)) {
              pos = flatLandObject.slice(0)
            } else {
              //is land with this object
              pos = ["l", flatLandObject]
            }
          } else {
            //is land if byte is certain ranges
            //10 is the green small flower but all others 1-12 are land types
            if (terrain <= 12) {
              pos[0] = "l"
            } else if (terrain <= 24) {
              pos[0] = "g"
            } else if (terrain !== placeholder) {
              //unknown terrain if out of range but still specified
              pos[0] = "u"
            }
          }

          //if second item is number
          if (typeof item[1] === "number") {
            //map to object abbrev or unknown if not present
            //add all objects, enabled adding of multiple objects in bin format map
            pos = pos.concat(LevelFileReader.binFormatMaps.objectTypes[item[1]] || "uk")
          }

          //return processed position
          return pos
        }).reduce((prev, item) => { //reduce to simplify
          //if this item is just one piece
          if (item.length === 1) {
            //when last is string
            if (typeof prev[prev.length - 1] === "string") {
              //add string to it
              prev[prev.length - 1] += item[0]
            } //if last is array or prev is empty, push only string
            else {
              prev.push(item[0])
            }
          } else {
            //push whole item
            prev.push(item)
          }
          return prev
        }, [])

        //if line collapses into one piece, don't use array to contain
        if (line.length === 1) {
          line = line[0]
        }

        //return processed line
        return line
      })

      //create object for level creation
      this.levelInfo = {
        name: `${this.levelName} (${this.fileName})`,
        noPadding: true,
        field: descr,
        dim: Vector(20, 12)
      }

      //create level with descriptor, file name as name and standard size
      this.level = Level(this.levelInfo)
    }
  }
})

//the game instance
let game

//when document is present
$(document).ready(function() {
  //make a game with the levels
  game = Game({ levels })

  //register handler on clear link
  $("#clear").click(() => {
    //remove local storage for this page
    window.localStorage.clear()

    //reload page to set up new
    location.reload()
  })

  //hide file load if not in debugging mode
  if (debugging) {
    //handler on file selection
    $("#files").on("change", e => {
      //for all selected files
      Promise.all(Array.from(e.target.files).map(file => {
        //make a file reader for this file
        const reader = new FileReader()

        //and read the file as an binary array buffer
        reader.readAsArrayBuffer(file)

        //wait for load and parse to complete
        return new Promise((resolve, reject) => {
          //when the file is done loading
          reader.onload = e => {
            //create a level from the binary data
            const levelReader = LevelFileReader({ arrayBuffer: e.target.result, file })

            //finish this level's processing
            resolve(levelReader)
          }

          //fail on error of reader
          reader.onerror = reject
        })
      })).then(levelReaders => {
        //filter out readers with empty levels
        levelReaders = levelReaders.filter(lr => lr.level)

        //print all imported levels at once
        console.log(JSON.stringify(levelReaders.map(lr => lr.levelInfo)))

        //add all levels to list of levels
        levels = levelReaders.map(lr => lr.level).concat(levels)

        //remove previous game
        game.remove()

        //completely restart game with new levels
        game = Game({ levels: levels })
      })
    })
  } else {
    //hide whole wrapper
    $("#file-wrapper").hide()
  }
});
