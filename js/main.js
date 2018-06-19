/*global stampit, Level*/
//Note: props is apparently shared among all instances of a stamp (shallow/ref copy)

//the game object has a field of tiles
const Game = stampit.compose({
  //constructed with a level object
  init({ levels }) {
    //get display elements
    this.elems = {
      table: $("#field"),
      levelIndex: $("#level-index"),
      levelName: $("#level-name")
    }

    //save levels
    this.levels = levels

    //init the first level
    this.startLevel(0)
  },

  methods: {
    //inits the given level index
    startLevel(index) {
      //set as current level
      this.currentLevel = this.levels[index]

      //init level in table
      this.currentLevel.initInPage(this.elems, index)
    }
  }
})

//game level definitions, is padded with water if field is smaller than specified size
const levels = [
  Level({
    name: "Mahkilaki",
    //dim: Vector({ x: 20, y: 12 }),
    field: [
      "wwlllllw",
      ["wllggg", ["l", "r"], ["l", "p"]],
      "wllgggll",
      ["wl", ["l"], ["l", "b"], ["l", "pl"], ["l", "b"], "lll"],
      ["wlll", ["w", "wb"], "www"]
    ]
  })
]

//when document is present
$(document).ready(function() {
  //make a game with the first level
  Game({ levels: levels })
});
