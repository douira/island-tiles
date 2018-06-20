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
    this.elems.nextBtn.click( e => {
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

//when document is present
$(document).ready(function() {
  //make a game with the first level
  Game({ levels: levels })
});
