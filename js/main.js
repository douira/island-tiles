/*global stampit, Level, Vector*/
//Note: props is a shallow copy and thereby partially shared among instances

//the game object has a field of tiles
const Game = stampit.compose({
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

    //the index of the level the player has reached
    this.reachedIndex = 0

    //the index of the highest completed level
    this.completedIndex = 0

    //init the first level
    this.levelIndex = -1
    this.startNextLevel(1)

    //register handler to start next level when link is clicked
    this.elems.nextBtn.click(e => {
      //dont follow link
      e.preventDefault()

      //start the next level
      this.startNextLevel(1)
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
      Game.setEnabled(this.elems.nextBtn, this.reachedIndex > this.levelIndex, "active-control")

      //update progress info text
      this.elems.progress.text(`(${this.completedIndex}/${this.levels.length} Levels done)`)
    },

    //inits the currently selected level
    startCurrentLevel() {
      //init level in table
      this.currentLevel.initInPage(this, this.elems, this.levelIndex)
    },

    //inits the given level index (or the previous one if -1 passed)
    startNextLevel(delta = 1) {
      //check if a level with this index exists
      if (this.levelIndex < this.levels.length) {
        //hide completed message and reset net button bold
        this.elems.message.addClass("hide-this")
        this.elems.nextBtn.removeClass("bold")

        //increment level counter
        this.levelIndex += delta

        //hide completed message and show controls instead
        this.elems.message.addClass("hide-this")

        //update controls display
        this.updateControls()

        //set as current level
        this.currentLevel = this.levels[this.levelIndex]

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
      console.log(this.completedIndex, this.reachedIndex)
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
    name: "Ukulat B'tiema",
    dim: Vector({ x: 0, y: 0 }),
    field: [
      ["wl", ["l", "bc"], ["l", "bc"]],
      [["l", "r"], ["l", "p"], ["l", "r"], ["l", "bc"]],
      [["l", "mc"], ["l", "bc"], ["l", "b"]],
      ["l", ["l", "st"], "l", ["w", "r"]],
      [["l", "pl"], ["l", "h"], "lw", ["w", "r"]]
    ]
  }),
  Level({
    name: "Mahkilakii",
    dim: Vector({ x: 0, y: 0 }),
    field: [
      ["wwllll", ["l", "h"], "w"],
      ["wl", ["l", "p"], "g", ["g", "r"], "g", ["l", "r"], ["l", "p"]],
      ["wllgg", ["g", "p"], "ll"],
      ["w", ["l"], ["l", "b"], ["l", "pl"], ["l", "b"], "l", ["l", "st"], "l", ["w", "r"]],
      ["wlll", ["w", "wb"], "www"]
    ]
  })
]

//when document is present
$(document).ready(function() {
  //make a game with the first level
  Game({ levels: levels })
});
