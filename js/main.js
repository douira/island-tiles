/*global stampit, Level, Vector*/
//Note: props is a shallow copy and thereby partially shared among instances

//the game object has a field of tiles
const Game = stampit.compose({
  props: {
    //enable next starts off disabled
    enableNextBtn: false,

    //the index of the level the player has reached
    reachedIndex: 0,

    //the index of the highest completed level
    completedIndex: 0,

    //start with current index at -1 as init will increment to 0
    levelIndex: -1
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

    //init the first level
    this.startNextLevel(1)

    //register handler to start next level when link is clicked
    this.elems.nextBtn.click(e => {
      //dont follow link
      e.preventDefault()

      //start the next level
      this.startNextLevel(1)
    })

    //or enter is pressed
    $(document).keydown("keydown.controls", e => {
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
    this.elems.resetBtn.click(e => {
      //don't do link action
      e.preventDefault()

      //start current level again
      this.startCurrentLevel()
    })

    //handler to go back one level
    this.elems.prevBtn.click(e => {
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
    //updates the display of the controls
    updateControls() {
      //prev button is active if not at first level
      Game.setEnabled(this.elems.prevBtn, this.levelIndex, "active-control")

      //reset button is always enabled

      //enable next button when reached level is higher than current level
      this.enableNextBtn = this.reachedIndex > this.levelIndex
      Game.setEnabled(this.elems.nextBtn, this.enableNextBtn, "active-control")

      //update progress info text
      this.elems.progress.text(`(${this.completedIndex}/${this.levels.length} Levels done)`)
    },

    //inits the currently selected level
    startCurrentLevel() {
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
      this.completedIndex = Math.max(this.completedIndex, this.reachedIndex, this.levelIndex + 1)

      //set reached level to at least the next level, cap at max level
      this.reachedIndex = Math.min(this.levels.length - 1, this.completedIndex)

      //make completed message visible and make next button bold
      this.elems.message.removeClass("hide-this")
      this.elems.nextBtn.addClass("bold")

      //update controls display
      this.updateControls()
    }
  }
})

//game level definitions, is padded with water if field is smaller than specified size
const levels = [
  Level({
    name: "Kramba Radidi",
    dim: Vector({ x: 0, y: 0 }),
    field: [
      [["l", "pa"], "lw", ["l", "pa"], ["l", "pa"], ["l", "rc"], "l"],
      [["l", "tp"], ["l", "st"], "wl", ["l", "pa"], ["l", "ho"], ["l", "tp"]],
      ["wwwl", ["l", "tr"], "w"],
      "wwwl",
      ["w", ["l", "pa"], "ll"],
      ["wl", ["l", "bx"], "l"],
      ["w", ["l", "pl"], "l", ["l", "tr"]],
    ]
  }),
  Level({
    name: "Zuumoadila",
    dim: Vector({ x: 0, y: 0 }),
    field: [
      ["lll", ["l", "bx"]],
      ["l", ["l", "wb"], ["l", "wh"], ["l", "sh"],  ["l", "se"]],
      [["l", "pl"], "ggg", ["l", "pa"]],
      [["l", "rc"], ["g", "pa"], ["g", "ho"], "gl"],
      ["l", ["l", "rc"], ["l", "rc"], ["l", "pa"],]
    ]
  }),
  Level({
    name: "Karitiki Ta",
    dim: Vector({ x: 0, y: 0 }),
    field: [
      "wwwwwlll",
      ["wwwww", ["l", "bx"], "lll", ["l", "bx"], "ww"],
      ["wwwwll", ["l", "bc"], ["g", "pa"], ["g", "mc"], ["g", "pl"], ["l", "bx"]],
      ["l", ["l", "bc"], "ww", "ll", ["l", "sh"], "gggl"],
      [["l", "se"], ["l", "bx"], "lww", ["l", "wb"],
       ["l", "wh"],  ["l", "rc"], ["l", "ho"], ["l", "bx"]],
      [["l", "bc"], ["l", "bc"], "lwwwllll"],
    ]
  }),
  Level({
    name: "Ukulat B'tiema",
    dim: Vector({ x: 0, y: 0 }),
    field: [
      ["wl", ["l", "bc"], ["l", "bc"]],
      [["l", "rc"], ["l", "pa"], ["l", "rc"], ["l", "bc"]],
      [["l", "mc"], ["l", "bc"], ["l", "bx"]],
      ["l", ["l", "st"], "l", ["w", "rc"]],
      [["l", "pl"], ["l", "ho"], "lw", ["w", "rc"]]
    ]
  }),
  Level({
    name: "Mahkilakii",
    dim: Vector({ x: 0, y: 0 }),
    field: [
      ["wwllll", ["l", "ho"], "w"],
      ["wl", ["l", "pa"], "g", ["g", "rc"], "g", ["l", "rc"], ["l", "pa"]],
      ["wllgg", ["g", "pa"], "ll"],
      ["w", ["l"], ["l", "bx"], ["l", "pl"], ["l", "bx"], "l", ["l", "st"], "l", ["w", "rc"]],
      ["wlll", ["w", "bw"], "www"]
    ]
  }),

]

const binFormatMap = {
  56: "pl",
  51: "pa",
  55: "pa",
  54: "rc",
  75: "ho",
  57: "bx"
}

function setField(field, type, x, y, data) {
  if (x && x <= 20 && y && y <= 12) {
    x --
    y --
    if (! field[y]) {
      field[y] = []
    }
    if (! field[y][x]) {
      field[y][x] = []
    }
    field[y][x][type] = data
  }
}

function pad(str, length = 2) {
  return ("0".repeat(length) + str).substr(-length, length)
}
let game
function consumeData(data, file) {
  let str = ""
  let i = 0
  let loc = 0
  const factor = 128
  const field = []
  let fieldIndex = -1
  while (loc < data.length) {
    if (i % 14 === 0) {
      str += "\n"
    }
    if (i % 308 === 0) {
      str += "\n"
      fieldIndex ++
    }
    const add = data[loc] || "__"
    str += pad(add)
    if (fieldIndex <= 1) {
      setField(field, fieldIndex, Math.floor(i / 14) % 22, i % 14, add)
    }
    i ++
    loc = i * factor + 2
  }
  console.log(str)
  console.log(field.map(l => l.map(i => i.map(f => pad(f)).join("")).join("")).join("\n"))
  const descr = field.map(line => {
    line = line
    .map(item => {
      const pos = ["w"]
      const terrain = item[0]
      if (terrain <= 12 || terrain >= 31 && terrain <= 32) {
        pos[0] = "l"
      } else if (terrain <= 24) {
        pos[0] = "g"
      }
      if (typeof item[1] === "number") {
        pos[1] = binFormatMap[item[1]] || "uk"
      }
      return pos
    })
    .reduce((prev, item) => {
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

    if (line.length === 1) {
      line = line[0]
    }
    return line
  })
  console.log(descr)
  game.levels.unshift(Level({
    name: file.name,
    field: descr
  }))
  game.levelIndex = 0
  game.startCurrentLevel()
}
//when document is present
$(document).ready(function() {
  //make a game with the levels
  game = Game({ levels: levels })

  $("#files").on("change", e => {

    const fileList = Array.from(e.target.files)
    fileList.forEach(file => {
      const reader = new FileReader()
      reader.readAsArrayBuffer(file)
      reader.onload = e => {
        consumeData(new Uint8Array(e.target.result), file)
      }
    })

  })
});
