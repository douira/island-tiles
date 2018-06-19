/*global stampit, Level, Vector*/
//Note: props is apparently shared among all instances of a stamp (shallow/ref copy)

//the game object has a field of tiles
const Game = stampit.compose({
  //constructed with a level object
  init({ levels }) {
    //get display elements for level display
    this.elems = {
      table: $("#field"),
      levelIndex: $(".level-index"),
      levelName: $("#level-name"),
      message: $("#message-text"),
      nextLevel: $("#next-level")
    }

    //save levels
    this.levels = levels

    //init the first level
    this.levelIndex = -1
    this.startNextLevel()

    //register handler to start next level when link is clicked
    this.elems.nextLevel.click(e => {
      //dont follow link
      e.preventDefault()

      //start the next level
      this.startNextLevel()
    })
  },

  methods: {
    //inits the given level index
    startNextLevel() {
      //check if a level with this index exists
      if (this.levelIndex < this.levels.length) {
        //increment level counter
        this.levelIndex ++

        //hide completed message
        this.elems.message.addClass("hide-this")

        //set as current level
        this.currentLevel = this.levels[this.levelIndex]

        //init level in table
        this.currentLevel.initInPage(this, this.elems, this.levelIndex)
      }
    },

    //called by the current level when the player completes it
    levelCompleted() {
      //make the next level button and text visisble
      this.elems.message.removeClass("hide-this")

      //if there are still levels left
      if (this.levelIndex < this.levels.length - 1) {
        this.elems.nextLevel.text("Next Level").removeClass("no-underline")
      } else {
        //set text to finished and remove link appearance
        this.elems.nextLevel.text("Finished.").addClass("no-underline")
      }
    }
  }
})

//game level definitions, is padded with water if field is smaller than specified size
const levels = [
  Level({
    name: "Uku",
    dim: Vector({ x: 0, y: 0 }),
    field: [
      ["l", ["l", "st"], "l"],
      [["l", "pl"], ["l", "h"], "w"]
    ]
  }),
  Level({
    name: "Mahkilaki",
    dim: Vector({ x: 0, y: 0 }),
    field: [
      ["wwllll", ["l", "h"], "w"],
      ["wl", ["l", "p"], "g", ["g", "r"], "g", ["l", "r"], ["l", "p"]],
      ["wllgg", ["g", "p"], "ll"],
      ["w", ["l"], ["l", "b"], ["l", "pl"], ["l", "b"], "llll"],
      ["wlll", ["w", "wb"], "www"]
    ]
  })
]

//when document is present
$(document).ready(function() {
  //make a game with the first level
  Game({ levels: levels })
});
