/*global debugging*/
/*exported Game*/

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
    levelIndex: 0,
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
      progress: $("#progress-info"),
      gameSize: $("#game-size"),
    }

    //save levels
    this.levels = levels

    //attempt to read previous saved progress
    try {
      this.completedIndex = parseInt(
        window.localStorage.getItem("completed"),
        10
      )

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
    } catch (e) {
      //doesn't load anything if can't load
    }

    //init the first level (currently set)
    this.startNextLevel(0)

    //register handler to start next level when link is clicked
    this.elems.nextBtn.on("click.controls", e => {
      //don't follow link
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
    },
  },

  methods: {
    //removes handlers of this game
    unregisterHandlers() {
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
      this.enableNextBtn = this.completedIndex >= this.levelIndex
      Game.setEnabled(
        this.elems.nextBtn,
        debugging || this.enableNextBtn,
        "active-control"
      )

      //update progress info text
      this.elems.progress.text(
        `(${this.completedIndex + 1}/${this.levels.length} Levels done)`
      )
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
      } catch (e) {
        //if can't save then just don't
      }

      //make completed message visible and make next button bold
      this.elems.message.removeClass("hide-this")
      this.elems.nextBtn.addClass("bold")

      //update controls display
      this.updateControls()
    },
  },
})
