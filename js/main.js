/*global stampit, Level*/
//Note: props is apparently shared among all instances of a stamp

//the game object has a field of tiles
const Game = stampit.compose({
  //constructed with a level object
  init({ level }) {
    //get display table
    this.table = $(".field")

    //save level
    this.level = level

    //setup level in table
    this.level.initInTable(this.table)
  }
})

//game level definitions, is padded with water if field is smaller than specified size
const levels = [
  Level({
    name: "Mahkilaki",
    //dim: Vector({ x: 20, y: 12 }),
    field: [
      "wwlllllw",
      ["wl", ["l", "b"], "ggg", ["l", "r"], ["l", "p"]],
      "wllgggll",
      ["wlll", ["l", "pl"], "lll"],
      ["wlll", ["w", "wb"], "www"]
    ]
  })
]

//when document is present
$(document).ready(function() {
  //make a game with the first level
  Game({ level: levels[0] })
});
