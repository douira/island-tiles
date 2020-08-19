/*eslint-disable*/
//these are all levels read from the files and put through some processing
const levelData = [
  {
    name: "Maluakiki (1.isl)",
    noPadding: true,
    field: [
      "wwwwwwwwwwwwwwwwwwww",
      "wwwwwwwwwwwwllllllll",
      ["wwwwwwwwwwwllggl", ["l", "pa"], ["l", "ho"], ["l", "pa"], "l"],
      "wwwwwwwwwwlllgglllll",
      "wwwwwwwllllllgggggll",
      ["wwwllllllllllg", ["g", "pa"], ["g", "rc"], ["g", "pa"], "gll"],
      ["wwll", ["l", "pl"], "lggggg", ["l", "pa"], ["l", "pa"], "gg", ["g", "pa"], "ggll"],
      ["wwllllg", ["g", "pa"], ["g", "rc"], ["g", "rc"], ["g", "pa"], "g", ["l", "pa"], "ggggllw"],
      "wwwllllgggggllllllww",
      "wwwwlllllllllwwwwwww",
      "wwwwwlllllllwwwwwwww",
      "wwwwwwwwwwwwwwwwwwww"
    ],
    dim: {
      x: 20,
      y: 12
    }
  },
  {
    name: "Kuka Kuki (2.isl)",
    noPadding: true,
    field: [
      "wwwwwwwwwwwwwwwwwwww",
      ["wwwwwwwwwwwwwll", ["l", "pa"], "llww"],
      ["www", ["l", "pa"], ["l", "ho"], ["l", "pa"], "wwwwwwwl", ["l", "pa"], "l", ["l", "pa"], "lww"],
      ["ww", ["l", "pa"], "lll", ["l", "pa"], "wwwwwwlllllww"],
      ["w", ["l", "pa"], "lggll", ["l", "pa"], "wwwwwwwwwwww"],
      ["wlg", ["g", "rc"], "glll", ["l", "pa"], "wwwwwwwwwww"],
      ["wl", ["g", "rc"], "g", ["g", "rc"], "lll", ["l", "bx"], "l", ["l", "rc"], ["l", "pa"], "lwwwwwww"],
      ["wlgggll", ["l", "bx"], "llll", ["l", "rc"], "wwwwwww"],
      ["wlllll", ["l", "bx"], "lll", ["l", "pl"], "l", ["l", "pa"], "wwwwwww"],
      ["wwwwwwl", ["l", "pa"], "lllllwwwwwww"],
      "wwwwwwwwwwwwwwwwwwww",
      "wwwwwwwwwwwwwwwwwwww"
    ],
    dim: {
      x: 20,
      y: 12
    }
  },
  {
    name: "Jojo Filizia (3.isl)",
    noPadding: true,
    field: [
      "wwwwwwwwwwwwwwwwwwww",
      "wwwwwwwwwwwwwwwwwwww",
      "wwwwwwwwwwwwwwwwwwww",
      ["wwwwl", ["l", "rc"], "lll", ["l", "bx"], "llllllwwww"],
      ["wwwl", ["l", "rc"], "lllgggggg", ["l", "ho"], ["l", "pa"], "wwww"],
      ["wl", ["l", "rc"], "ll", ["l", "pa"], "lggg", ["g", "pa"], ["g", "rc"], ["g", "rc"], "gllwwww"],
      ["w", ["l", "pa"], "l", ["l", "pa"], ["l", "pa"], "lgg", ["g", "pa"], ["g", "pa"], "gg", ["g", "pa"], "gllwwww"],
      ["w", ["l", "rc"], ["l", "pa"], "lllg", ["g", "pa"], "g", ["g", "rc"], "ggglllwwww"],
      ["w", ["l", "pa"], "llllggggggllllwwww"],
      ["wl", ["l", "pl"], "llll", ["l", "bx"], "lll", ["l", "bx"], "llwwwwww"],
      ["wwl", ["l", "pa"], "wwwlllwwwwwwwwww"],
      "wwwwwwwwwwwwwwwwwwww"
    ],
    dim: {
      x: 20,
      y: 12
    }
  },
  {
    name: "Abakaxi (4.isl)",
    noPadding: true,
    field: [
      "wwwwwwwwwwwwwwwwwwww",
      "wwwwwwwwwwwwwwwwwwww",
      "wwwwwwwwwwwwwwwwwwww",
      ["w", ["l", "pa"], ["l", "rc"], ["l", "pa"], "lwwwwwwwwwwwwwww"],
      ["wll", ["l", "pl"], ["l", "rc"], "wwwwwwwwwwwwwww"],
      ["wlg", ["g", "rc"], "g", ["l", "pa"], ["l", "rc"], ["l", "pa"], "wwwwwwwwwwww"],
      ["wlggglllwwwwwwwll", ["l", "pa"], ["l", "pa"], "w"],
      ["wlllll", ["l", "bx"], "lllwwwll", ["l", "pa"], ["l", "pa"], ["l", "ho"], ["l", "pa"], "w"],
      ["w", ["l", "pa"], ["l", "rc"], "lllll", ["l", "bx"], "lwwwlllll", ["l", "pa"], "w"],
      ["wwwwlll", ["l", "bx"], "llwwwll", ["l", "pa"], "l", ["l", "pa"], ["l", "pa"], "w"],
      "wwwwllllllwwwwwwwwww",
      "wwwwwwwwwwwwwwwwwwww"
    ],
    dim: {
      x: 20,
      y: 12
    }
  },
  {
    name: "Kawiki (5.isl)",
    noPadding: true,
    field: [
      "wwwwwwwwwwwwwwwwwwww",
      "wwwwwwwwwwwwwwwwwwww",
      "wwwwwwwwwwwwwwwwwwww",
      ["wwwwwwwwwwwwww", ["l", "rc"], "l", ["l", "pa"], "www"],
      ["wwwwwwwwwwwwwlll", ["l", "pl"], ["l", "pa"], "ww"],
      ["wwwwwwwwl", ["l", "pa"], "lwwl", ["l", "bx"], "ll", ["l", "pa"], "ww"],
      ["wwwwwwww", ["l", "pa"], ["l", "ho"], "lww", ["l", "bx"], "lll", ["l", "pa"], "ww"],
      ["wwwwwwwwllwwwll", ["l", "bx"], "llww"],
      ["wwwwwwwwwwwwwwll", ["l", "pa"], ["l", "rc"], "ww"],
      "wwwwwwwwwwwwwwwwwwww",
      "wwwwwwwwwwwwwwwwwwww",
      "wwwwwwwwwwwwwwwwwwww"
    ],
    dim: {
      x: 20,
      y: 12
    }
  },
  {
    name: "Palmalani (6.isl)",
    noPadding: true,
    field: [
      "wwwwwwwwwwwwwwwwwwww",
      ["wwwwwwwwwwwwwwww", ["l", "pa"], ["l", "ho"], "ww"],
      "wwwwwwwwwwwwwwwlllww",
      ["wllll", ["l", "pa"], ["l", "pa"], "wwwwwwwwl", ["l", "pa"], "www"],
      ["wllllll", ["l", "pa"], "wwwwwwwwwwww"],
      ["wllg", ["g", "bx"], "gll", ["l", "pa"], "wwwwwwwwwww"],
      ["wllgggggllwwwwwll", ["l", "pa"], "lw"],
      ["wllgg", ["g", "bx"], ["g", "pl"], "gllllwwllll", ["l", "pa"], "w"],
      ["wllgggggllll", ["w", "bw"], "wll", ["l", "bx"], "llw"],
      ["wllllllllll", ["l", "pa"], "wwl", ["l", "pa"], "l", ["l", "pa"], "lw"],
      ["wlllllllll", ["l", "pa"], "wwwwwlllw"],
      "wwwwwwwwwwwwwwwwwwww"
    ],
    dim: {
      x: 20,
      y: 12
    }
  },
  {
    name: "Pflanzi Gießi (9.isl)",
    noPadding: true,
    field: [
      "wwwwwwwwwwwwwwwwwwww",
      "wwwwwwwwwwwwwwwwwwww",
      "wwwwwwwwwwwwwwwwwwww",
      "wwwwwwwlllllwwwwwwww",
      ["wwwwwwl", ["g", "pa"], "g", ["g", "ho"], ["g", "pa"], ["l", "pa"], "llwwwwww"],
      ["wwwwwwlg", ["g", "pa"], "ggl", ["l", "wh"], "l", ["l", "rc"], "lllww"],
      ["wwwwwwlgggglllll", ["l", "pl"], "lww"],
      ["wwwwwwll", ["l", "sh"], "l", ["l", "wb"], "lllllllww"],
      ["wwwwww", ["l", "pa"], "llllll", ["l", "se"], "l", ["l", "rc"], "lwww"],
      ["wwwwwwl", ["l", "pa"], ["l", "rc"], ["l", "pa"], "llll", ["l", "rc"], "lwwww"],
      "wwwwwwwwwwwwwwwwwwww",
      "wwwwwwwwwwwwwwwwwwww"
    ],
    dim: {
      x: 20,
      y: 12
    }
  },
  {
    name: "Hala Hula (10.isl)",
    noPadding: true,
    field: [
      "wwwwwwwwwwwwwwwwwwww",
      "wwwwwwwwwwwwwwwwwwww",
      ["wwwwwwwwwwwww", ["l", "rc"], ["l", "ho"], ["l", "pa"], "wwww"],
      ["wll", ["l", "rc"], ["l", "pa"], ["l", "rc"], "lwwwwwlllllwww"],
      ["wl", ["l", "wh"], "ll", ["l", "bx"], "ll", ["l", "bx"], "lwwl", ["l", "se"], "l", ["l", "pa"], "lwww"],
      ["wllllll", ["l", "wb"], "llwwl", ["l", "pa"], "llwwww"],
      ["wll", ["l", "sh"], "gg", ["g", "st"], "gllwwwwwwwwww"],
      ["w", ["l", "rc"], "llg", ["g", "st"], "ggllwwwwwwwwww"],
      ["wl", ["l", "pa"], ["l", "pl"], "lgggllwwwwwwwwww"],
      ["wwl", ["l", "rc"], "lllllwwwwwwwwwww"],
      "wwwwwwwwwwwwwwwwwwww",
      "wwwwwwwwwwwwwwwwwwww"
    ],
    dim: {
      x: 20,
      y: 12
    }
  },
  {
    name: "Puka Puka (11.isl)",
    noPadding: true,
    field: [
      "wwwwwwwwwwwwwwwwwwww",
      "wwwwwwwwwwwwwwwwwwww",
      ["wwwwwwwwwwww", ["w", "bw"], "wwwwwww"],
      ["wwwww", ["l", "pa"], "llll", ["l", "bx"], "l", ["l", "wb"], "l", ["l", "rc"], "lwwww"],
      ["wwwwlllllllllll", ["l", "rc"], "wwww"],
      ["wwww", ["l", "pa"], ["l", "se"], "gg", ["g", "rc"], "lllll", ["l", "pa"], ["l", "pa"], "wwww"],
      ["wwwll", ["g", "rc"], "g", ["g", "st"], "g", ["l", "wh"], "lll", ["l", "pa"], "l", ["l", "ho"], "wwww"],
      ["wwwllgggglllll", ["l", "pl"], "lwwww"],
      ["wwwwl", ["l", "pa"], "l", ["l", "sh"], "lllll", ["l", "pa"], "l", ["l", "pa"], "wwww"],
      ["wwwwwlllll", ["l", "rc"], ["l", "pa"], "lllwwwww"],
      "wwwwwwwwwwwwwwwwwwww",
      "wwwwwwwwwwwwwwwwwwww"
    ],
    dim: {
      x: 20,
      y: 12
    }
  },
  {
    name: "Tamatitii (12.isl)",
    noPadding: true,
    field: [
      ["wwwwww", ["l", "pa"], ["l", "ho"], ["l", "pa"], "lwwwwllllww"],
      ["wwwww", ["l", "rc"], "llllwllll", ["g", "pa"], "gllw"],
      ["wwwwwl", ["l", "rc"], "lllwllg", ["g", "bx"], "gg", ["l", "sh"], "lw"],
      ["wwwwwwwwwww", ["l", "pa"], "lggllllw"],
      "wllllwwwwwwwllllllww",
      ["lll", ["l", "bx"], "ll", ["l", "pa"], ["l", "rc"], ["l", "pa"], "wwwwwwwwwww"],
      [["l", "pa"], "lll", ["l", "bx"], "lllll", ["l", "pa"], "wwwlll", ["l", "pa"], "ww"],
      [["l", "rc"], "l", ["l", "pl"], "lllllllllwwl", ["l", "bx"], "llww"],
      [["l", "pa"], "lllg", ["g", "pa"], ["g", "rc"], ["g", "pa"], "glllwwll", ["l", "wb"], "lww"],
      ["ll", ["l", "wh"], "lgggggllwwwlllwww"],
      ["wllllllll", ["l", "se"], "wwwwwwwwww"],
      "wwwwwwwwwwwwwwwwwwww"
    ],
    dim: {
      x: 20,
      y: 12
    }
  },
  {
    name: "Azartiki (13.isl)",
    noPadding: true,
    field: [
      "wwwwwwwwwwwwwwwwwwww",
      "wwwwwwwwwwwwwwwwwwww",
      "wwwwwwwwwwwwwwwwwwww",
      ["www", ["l", "rc"], ["l", "ho"], ["l", "pa"], "wwwwwwwwwwwwww"],
      ["wwwlll", ["l", "pa"], "ll", ["l", "pa"], "lwwwwwwwww"],
      ["wwwl", ["l", "pl"], "llllll", ["l", "rc"], "llwwwwww"],
      ["wwwllllllllll", ["l", "pa"], "lwwwww"],
      ["wwwl", ["l", "pa"], "ll", ["l", "fgr"], "llll", ["l", "crr"], "llwwwww"],
      ["wwwwl", ["l", "pa"], "lllllllllwwwww"],
      ["wwwwwll", ["l", "pa"], "ll", ["l", "rc"], ["l", "pa"], ["l", "rc"], "lwwwwww"],
      "wwwwwwwwwwwwwwwwwwww",
      "wwwwwwwwwwwwwwwwwwww"
    ],
    dim: {
      x: 20,
      y: 12
    }
  },
  {
    name: "Haleiwa (14.isl)",
    noPadding: true,
    field: [
      "wwwwwwwwwwwwwwwwwwww",
      "wwwwwwwwwwwwwwwwwwww",
      "wwwwwwwwwwwwwwwwwwww",
      ["wwwwl", ["l", "rc"], "lllwwl", ["l", "rc"], ["l", "pa"], ["l", "ho"], ["l", "rc"], "wwww"],
      ["wwwwll", ["l", "crg"], "lllllllllwwww"],
      ["wwwwwlll", ["l", "pa"], "llllllllwww"],
      ["wwwww", ["l", "rc"], "llll", ["l", "pa"], "lll", ["l", "pl"], "l", ["l", "pa"], "www"],
      ["wwwwwlllllllllll", ["l", "rc"], "www"],
      ["wwwwwwwll", ["l", "pa"], ["l", "fgg"], ["l", "pa"], "l", ["l", "pa"], ["l", "rc"], ["l", "pa"], "lwww"],
      "wwwwwwwwllllwwwwwwww",
      "wwwwwwwwwwwwwwwwwwww",
      "wwwwwwwwwwwwwwwwwwww"
    ],
    dim: {
      x: 20,
      y: 12
    }
  },
  {
    name: "Mowikonga (15.isl)",
    noPadding: true,
    field: [
      "wwwwwwwwwwwwwwwwwwww",
      "wwwwwwwwwwwwwwwwwwww",
      ["wwwwwwwwwwwwwwww", ["l", "pa"], ["l", "ho"], ["l", "pa"], "w"],
      ["wwwwwwwww", ["l", "pa"], "llllww", ["l", "pa"], "l", ["l", "pa"], "w"],
      ["wwwwwl", ["l", "pa"], "lllll", ["l", "bx"], "lwwll", ["l", "pa"], "w"],
      ["wwww", ["l", "pa"], "ggl", ["l", "crr"], "ll", ["l", "bx"], "llww", ["l", "pa"], ["l", "pa"], "ww"],
      ["wlllg", ["g", "pl"], "gl", ["l", "crg"], ["l", "crb"], "lllwwwwwww"],
      ["wl", ["l", "fgg"], "lggglllllwwwwwwww"],
      ["wll", ["l", "fgb"], "lll", ["l", "rc"], "lll", ["l", "pa"], "wwwwwwww"],
      ["wlll", ["l", "fgr"], "llll", ["l", "rc"], "wwwwwwwwww"],
      ["wwllll", ["l", "pa"], "llwwwwwwwwwww"],
      "wwwwwwwwwwwwwwwwwwww"
    ],
    dim: {
      x: 20,
      y: 12
    }
  },
  {
    name: "Duplimiki (16.isl)",
    noPadding: true,
    field: [
      "wwwwwwwwwwwwwwwwwwww",
      "wwwwwwwwwwwwwwwwwwww",
      "wwwwwwwwwwwwwwwwwwww",
      "wwwwwwwwwwwwwwwwwwww",
      ["wwww", ["l", "rc"], ["l", "ho"], ["l", "rc"], "wwwwwwwwwwwww"],
      ["wwww", ["l", "rc"], "llll", ["l", "pa"], "wwwwwwwwww"],
      ["wwwwwll", ["l", "crr"], ["l", "crr"], "ll", ["l", "rc"], ["l", "pa"], "wwwwwww"],
      ["wwwww", ["l", "pa"], "ll", ["l", "pl"], "llllwwwwwww"],
      ["wwwwwl", ["l", "pa"], "ll", ["l", "fgr"], "l", ["l", "fgr"], "lwwwwwww"],
      ["wwwwwwllllll", ["l", "rc"], "wwwwwww"],
      "wwwwwwwwwwwwwwwwwwww",
      "wwwwwwwwwwwwwwwwwwww"
    ],
    dim: {
      x: 20,
      y: 12
    }
  },
  {
    name: "Kawaikiki (17.isl)",
    noPadding: true,
    field: [
      "wwwwwwwwwwwwwwwwwwww",
      ["wwwwwwwwwwwwwww", ["l", "pa"], ["l", "ho"], ["l", "pa"], "ww"],
      "wwwwllwwwwwwwwllllww",
      ["wwwwlllwwwl", ["l", "rc"], "wwll", ["l", "pl"], "lww"],
      ["wwwwl", ["l", "pa"], "ll", ["l", "pa"], "llll", ["l", "pa"], "llllww"],
      ["wwwwlll", ["l", "rc"], "llll", ["l", "crb"], "lllllww"],
      ["wwwwlllll", ["l", "rc"], "lll", ["l", "crb"], "ll", ["l", "rc"], "lww"],
      ["wwwwlllllllllll", ["l", "pa"], "lwww"],
      ["wwwwwl", ["l", "pa"], "l", ["l", "fgb"], "l", ["l", "fgb"], "llllwwwww"],
      "wwwwwwwlllllwwwwwwww",
      ["wwwwwwww", ["l", "pa"], ["l", "rc"], "lwwwwwwwww"],
      "wwwwwwwwwwwwwwwwwwww"
    ],
    dim: {
      x: 20,
      y: 12
    }
  },
  {
    name: "Exploronga (18.isl)",
    noPadding: true,
    field: [
      "wwwwwwwwwwwwwwwwwwww",
      "wwwwwwwwwwwwwwwwwwww",
      "wwwwwwllllllwwwwwwww",
      ["wwwwwll", ["l", "rc"], "ll", ["l", "rc"], ["l", "rc"], "wwwwwwww"],
      ["wwwwwl", ["l", "rc"], "llll", ["l", "rc"], "lwwwwwww"],
      ["wwwwlll", ["l", "bm"], "ll", ["l", "rc"], "ll", ["l", "rc"], ["l", "ho"], ["l", "pa"], "wwww"],
      ["wwwwll", ["l", "rc"], "ll", ["l", "rc"], ["l", "rc"], ["l", "rc"], "lll", ["l", "rc"], "wwww"],
      ["wwwwll", ["l", "rc"], ["l", "rc"], ["l", "pl"], "l", ["l", "rc"], ["l", "rc"], "lllwwwww"],
      ["wwwwlllll", ["l", "bt"], "l", ["l", "rc"], ["l", "rc"], "lwwwwww"],
      ["wwwwwwlllll", ["l", "rc"], "l", ["l", "rc"], "wwwwww"],
      "wwwwwwwwwwwwwwwwwwww",
      "wwwwwwwwwwwwwwwwwwww"
    ],
    dim: {
      x: 20,
      y: 12
    }
  },
  {
    name: "Waikiki (19.isl)",
    noPadding: true,
    field: [
      "wwwwwwwwwwwwwwwwwwww",
      "wwwwwwwwwwlllwwwwwww",
      ["wwwl", ["l", "fgb"], "ll", ["l", "rc"], "llll", ["l", "rc"], "lwwwwww"],
      ["wwllll", ["l", "pa"], "l", ["l", "rc"], ["l", "rc"], "lllllwwwww"],
      ["ww", ["l", "rc"], ["l", "rc"], ["l", "rc"], "llwwlllll", ["l", "pa"], ["l", "rc"], "lwww"],
      ["ww", ["l", "pa"], ["l", "ho"], ["l", "rc"], "lwwww", ["l", "rc"], "ll", ["l", "crb"], "lllwww"],
      ["ww", ["l", "pa"], "l", ["l", "pa"], "llwwwwl", ["l", "bm"], "ll", ["l", "pl"], "lwww"],
      ["wwllll", ["l", "pa"], "lwwlllllllwww"],
      ["wwwlll", ["l", "pa"], ["l", "rc"], ["l", "rc"], "lll", ["l", "bt"], "l", ["l", "rc"], ["l", "pa"], "lwww"],
      ["wwwwl", ["l", "pa"], "l", ["l", "rc"], "lllll", ["l", "pa"], "lwwwww"],
      ["wwwwwwwwwwl", ["l", "rc"], "lwwwwwww"],
      "wwwwwwwwwwwwwwwwwwww"
    ],
    dim: {
      x: 20,
      y: 12
    }
  },
  {
    name: "Tuamoti Tiki (20.isl)",
    noPadding: true,
    field: [
      "wwwwwwwwwwwwwwwwwwww",
      ["wwwwl", ["l", "rc"], ["l", "ho"], ["l", "pa"], "l", ["l", "rc"], ["l", "pa"], "lllllwwww"],
      ["www", ["l", "rc"], "lll", ["l", "pa"], "llll", ["l", "wh"], "ll", ["l", "rc"], ["l", "bx"], "lww"],
      ["wwl", ["l", "pa"], "llllllllll", ["l", "rc"], ["l", "pa"], "l", ["l", "bt"], "lw"],
      ["ww", ["l", "rc"], "ll", ["l", "bx"], "ll", ["l", "crg"], "lllll", ["l", "rc"], "ll", ["l", "pa"], "lw"],
      ["wwlllllllll", ["l", "sh"], "l", ["l", "rc"], "ll", ["l", "pa"], "l", ["l", "rc"], "w"],
      ["wwllll", ["l", "wb"], "lllggggl", ["l", "rc"], ["l", "rc"], ["l", "rc"], "lw"],
      ["www", ["l", "bm"], "ll", ["l", "pa"], ["l", "rc"], "l", ["l", "rc"], "g", ["g", "pl"], "g", ["g", "se"], "g", ["l", "rc"], "lllw"],
      ["wwwwll", ["l", "rc"], "l", ["l", "rc"], "l", ["l", "pa"], "lgggllwww"],
      ["wwwwl", ["l", "pa"], "lllllll", ["l", "fgg"], "llwwww"],
      "wwwwwwlllllllllwwwww",
      "wwwwwwwwwwwwwwwwwwww"
    ],
    dim: {
      x: 20,
      y: 12
    }
  },
  {
    name: "Babiskiki (21.isl)",
    noPadding: true,
    field: [
      "wwwwwwwwwwwwwwwwwwww",
      "wwwwwwwllwwwwwwwllww",
      "wwwwwwwlllwwwwlllllw",
      ["wwww", ["l", "pa"], ["l", "ho"], ["l", "pa"], ["l", "bt"], ["l", "bm"], "ll", ["l", "pl"], "lllggglw"],
      ["wwwwl", ["l", "rc"], "llllwwwl", ["l", "pa"], "g", ["g", "bm"], "glw"],
      ["wwwwll", ["l", "rc"], "lwwwwwll", ["l", "sp"], "gglw"],
      ["wwwwwlwwwwwwwwwl", ["l", "rc"], "l", ["l", "rc"], "w"],
      ["wwwwwlwwwwwwwww", ["l", "rc"], "l", ["l", "rc"], "lw"],
      ["wwwww", ["l", "st"], "l", ["l", "rc"], "lll", ["l", "rc"], "lwwwlllw"],
      ["wwwwwwwl", ["l", "st"], "l", ["l", "st"], "llwwww", ["w", "bw"], "ww"],
      ["wwwwwwwll", ["l", "st"], "lll", ["w", "bw"], ["w", "bw"], "w", ["w", "bw", "bx"], ["w", "bw", "st"], "ww"],
      ["wwwwwwwwll", ["l", "rc"], "lwwwwwwww"]
    ],
    dim: {
      x: 20,
      y: 12
    }
  },
  {
    name: "Kamaronski (22.isl)",
    noPadding: true,
    field: [
      "wwwwwwwwwwwwwwwwwwww",
      ["wwwwwllwwwwwww", ["l", "rc"], ["l", "ho"], ["l", "pa"], "llw"],
      ["wwwlllllwwwwwwlll", ["l", "mc"], "lw"],
      ["wwll", ["l", "bc"], ["l", "bc"], ["l", "bc"], "llllwwwwllllw"],
      ["wwll", ["l", "rc"], ["l", "rc"], ["l", "bc"], ["l", "rc"], ["l", "bc"], ["l", "bc"], ["l", "bc"], "wwwwwwwww"],
      ["wwlll", ["l", "rc"], ["l", "bc"], ["l", "rc"], ["l", "bc"], ["l", "rc"], ["l", "bc"], "lwwwww", ["w", "bw", "bx"], "ww"],
      ["wwl", ["l", "pa"], ["l", "bc"], ["l", "bc"], ["l", "bc"], ["l", "rc"], ["l", "bc"], ["l", "bc"], ["l", "bc"], "llww", ["w", "bw"], ["w", "bw", "bc"], ["w", "bw"], "ww"],
      ["wwl", ["l", "rc"], "lllllllllw", ["w", "bw", "bc"], ["w", "bw"], "wwww"],
      ["ww", ["l", "pa"], "l", ["l", "pl"], "lllllll", ["w", "bw"], ["w", "bw", "bc"], ["w", "bw"], "wwwww"],
      ["wwllll", ["l", "pa"], "ll", ["l", "pa"], "lwwwwwwwww"],
      ["wwwwwll", ["l", "rc"], "lwwwwwwwwwww"],
      "wwwwwwwwwwwwwwwwwwww"
    ],
    dim: {
      x: 20,
      y: 12
    }
  },
  {
    name: "Suwadiwa (23.isl)",
    noPadding: true,
    field: [
      "wwwwwwwwwwwwwwwwwwww",
      "wwwwwwwwwwwwwwwwwwww",
      ["wwwwl", ["l", "st"], ["l", "st"], "llwwwwwww", ["l", "pa"], "lww"],
      ["wwwl", ["l", "st"], ["l", "bc"], ["l", "bc"], ["l", "st"], ["l", "st"], "lwwwwwwl", ["l", "pl"], ["l", "st"], "w"],
      ["wwwl", ["l", "st"], ["l", "bc"], ["l", "st"], "ll", ["l", "rc"], "lllwwww", ["l", "st"], ["l", "bc"], "l"],
      ["wwwl", ["l", "bc"], ["l", "st"], "l", ["l", "pa"], "ll", ["l", "rc"], ["l", "mc"], "lwl", ["l", "st"], "lwll"],
      ["wwwlll", ["l", "pa"], ["l", "ho"], ["l", "pa"], "llllllwl", ["l", "bc"], "ll"],
      ["wwwll", ["l", "rc"], "ll", ["l", "bc"], ["l", "bc"], ["l", "st"], "llwwwwll", ["l", "rc"]],
      ["wwwlllll", ["l", "st"], ["l", "st"], ["l", "bc"], ["l", "st"], "lwwwwl", ["l", "pa"], "l"],
      ["wwwwllll", ["l", "st"], ["l", "bc"], ["l", "st"], ["l", "st"], "wwwwl", ["l", "pa"], "l", ["l", "pa"]],
      ["wwwwwwwllllwwwwwl", ["l", "rc"], "lw"],
      "wwwwwwwwwwwwwwwwwwww"
    ],
    dim: {
      x: 20,
      y: 12
    }
  },
  {
    name: "Isla Pedra (24.isl)",
    noPadding: true,
    field: [
      "wwwwwwwwwwwwwwwwwwww",
      ["w", ["l", "ho"], ["l", "rc"], "wwwwwwwwwww", ["l", "bc"], ["l", "bc"], ["l", "bc"], ["l", "bc"], ["l", "mc"], "w"],
      ["wl", ["l", "rc"], "wwwwwwwwww", ["l", "bc"], ["l", "bc"], "gg", ["l", "bc"], ["l", "bc"], "w"],
      ["wwwwwwwwwwwww", ["l", "bc"], "l", ["g", "bx"], "gg", ["l", "bc"], "w"],
      ["wwwwwwwwwwwww", ["l", "bc"], "lgg", ["g", "rc"], ["l", "bc"], "w"],
      ["w", ["l", "bc"], ["l", "rc"], "wwwwwwwwwwll", ["g", "bx"], "g", ["g", "rc"], ["l", "bc"], "w"],
      ["w", ["l", "bc"], ["l", "bc"], "ll", ["l", "rc"], ["l", "rc"], "lwwwwwllggg", ["l", "bc"], ["l", "bc"]],
      ["w", ["l", "bc"], ["l", "bc"], "ll", ["l", "bx"], "lllllww", ["l", "bx"], "llg", ["g", "pl"], "g", ["l", "bc"]],
      ["ww", ["l", "rc"], "ll", ["l", "rc"], ["l", "rc"], "llllwwwllggg", ["l", "bc"]],
      ["wwwwwwwlllwwwwwlll", ["l", "bc"], ["l", "bc"]],
      ["wwwwwwwwwwwwwwwwl", ["l", "rc"], ["l", "bc"], ["l", "rc"]],
      "wwwwwwwwwwwwwwwwwwww"
    ],
    dim: {
      x: 20,
      y: 12
    }
  },
  {
    name: "Kaunakakai (25.isl)",
    noPadding: true,
    field: [
      "wwwwwwwwwwwwwwwwwwww",
      ["wwl", ["l", "rc"], "lwwwwwwwwwwwwwww"],
      ["ww", ["l", "rc"], "l", ["l", "bc"], "lwww", ["l", "pa"], ["l", "ho"], ["l", "pa"], "wwwwwwww"],
      ["wwl", ["l", "bc"], ["l", "pa"], ["l", "bc"], "wwwl", ["l", "pl"], ["l", "bc"], "wwwwwwww"],
      ["wwwl", ["l", "bc"], "lwww", ["l", "bc"], ["l", "bx"], "lwwwwwwww"],
      ["wwwwwwwwwl", ["l", "bx"], "wwwwwwwww"],
      ["www", ["w", "bw"], "wwwwwllwwwwwwwww"],
      ["wl", ["l", "pa"], ["l", "bc"], ["l", "bx"], "lwwwwwwwwl", ["l", "pa"], "llww"],
      ["w", ["l", "bc"], ["l", "bc"], ["l", "bc"], "l", ["l", "bc"], "lwwwwwwl", ["l", "pa"], ["l", "mc"], ["l", "rc"], "lww"],
      ["w", ["l", "bc"], ["l", "bx"], ["l", "bc"], "l", ["l", "bc"], ["l", "bc"], "lw", ["w", "bw"], ["w", "bw", "bx"], "wwl", ["l", "bc"], "l", ["l", "bc"], ["l", "rc"], "ww"],
      ["wl", ["l", "rc"], "l", ["l", "bc"], ["l", "bx"], "llw", ["w", "bw", "bx"], ["w", "bw"], "wwll", ["l", "bc"], "llww"],
      ["wwl", ["l", "bc"], ["l", "bc"], "wwwwwwwwwwwwwww"]
    ],
    dim: {
      x: 20,
      y: 12
    }
  },
  {
    name: "Omemika (26.isl)",
    noPadding: true,
    field: [
      "wwwwwwwwwwwwwwwwwwww",
      "wwwwwwwwwwwwwwwwwwww",
      "wwwllllwwwwwwllllwww",
      "wwllllllwwwwllllllww",
      ["wll", ["l", "crb"], "l", ["l", "rc"], "llwwwwll", ["l", "crr"], ["l", "crb"], "lllw"],
      ["wlllllllwwwwl", ["l", "fgr"], "lllllw"],
      ["wlll", ["l", "fgb"], "l", ["l", "crr"], "lwwwwll", ["l", "fgb"], "llllw"],
      ["wllll", ["l", "fgr"], "llwwwwlllllllw"],
      "wwllllllwwwwllllllww",
      ["wwwwwwww", ["l", "pa"], ["l", "ho"], ["l", "rc"], "lwww", ["w", "bw"], "wwww"],
      ["wwwwwwwwll", ["l", "pl"], "l", ["w", "bw"], ["w", "bw", "bx"], "w", ["w", "bw"], "wwww"],
      "wwwwwwwwwwwwwwwwwwww"
    ],
    dim: {
      x: 20,
      y: 12
    }
  },
  {
    name: "Kocupalm (27.isl)",
    noPadding: true,
    field: [
      "wwwwwwwwwwwwwwwwwwww",
      "wwwwwwwwwwwwwwwwwwww",
      "wwwwwwwwwwwwwwwwwwww",
      "wwwwwwllllllllwwllww",
      ["wwwwwllllllll", ["l", "rc"], "l", ["l", "pa"], "l", ["l", "pa"], "lw"],
      ["wwwwl", ["l", "pb"], "l", ["l", "pa"], "llllll", ["l", "co"], "l", ["l", "rc"], "l", ["l", "ho"], "w"],
      ["wwwwllllllll", ["l", "pa"], "l", ["l", "rc"], "llllw"],
      ["wwww", ["l", "rc"], "llll", ["l", "pl"], "llwwwww", ["l", "pa"], "lw"],
      ["wwwwl", ["l", "rc"], "lllllwwwwwwwww"],
      ["wwwwwll", ["l", "sl"], "lwwwwwwwwwww"],
      "wwwwwwllwwwwwwwwwwww",
      "wwwwwwwwwwwwwwwwwwww"
    ],
    dim: {
      x: 20,
      y: 12
    }
  },
  {
    name: "Madratutu (28.isl)",
    noPadding: true,
    field: [
      "wwwwwwwwwwwwwwwwwwww",
      ["wwwwwwwl", ["l", "mc"], "llwwwwwwwww"],
      ["wwwwwwwlll", ["l", "rc"], ["l", "rc"], "llwwwwww"],
      ["wwl", ["l", "rc"], "lwwl", ["l", "wh"], ["l", "co"], "ll", ["l", "pb"], "lwwwwww"],
      ["ww", ["l", "se"], ["l", "bc"], ["l", "bc"], "lww", ["l", "pa"], ["l", "rc"], "l", ["l", "bc"], "l", ["l", "bc"], "lwwwww"],
      ["wl", ["l", "bc"], ["l", "bc"], ["l", "bx"], "ll", ["w", "bw"], "wl", ["l", "pa"], "l", ["l", "bc"], "lllwwww"],
      ["wl", ["l", "bc"], ["l", "wb"], ["l", "bc"], ["l", "bc"], "ll", ["w", "bw"], "wlll", ["l", "bc"], ["l", "pa"], "l", ["l", "bc"], "www"],
      ["wl", ["l", "bc"], ["l", "bc"], ["g", "bc"], "g", ["l", "sh"], ["l", "rc"], "lwwlllll", ["l", "bc"], "www"],
      ["ww", ["l", "pa"], ["l", "bc"], "g", ["g", "bc"], "g", ["l", "pl"], "llww", ["l", "pa"], ["l", "bc"], ["l", "sl"], ["l", "rc"], ["l", "ho"], ["l", "pa"], "ww"],
      ["wwwllg", ["g", "bc"], "lllwww", ["l", "bc"], ["l", "bc"], ["l", "bc"], ["l", "bc"], "lww"],
      "wwwwllllwwwwwwwwwwww",
      "wwwwwwwwwwwwwwwwwwww"
    ],
    dim: {
      x: 20,
      y: 12
    }
  },
  {
    name: "Taku Iti (29.isl)",
    noPadding: true,
    field: [
      "wwwwwwwwwwwwwwwwwwww",
      "wwwwwwwwwwwwwwwwwwww",
      "wwwwwwwwwwwwwwwwwwww",
      ["wwwwwwl", ["l", "rc"], ["l", "pa"], "lwwwl", ["l", "pa"], ["l", "pa"], ["l", "ho"], ["l", "pa"], "ww"],
      ["wwll", ["l", "rc"], "l", ["l", "rc"], "ll", ["l", "bt"], "lll", ["l", "pa"], "lll", ["l", "pa"], "ww"],
      ["w", ["l", "pa"], "lllllwllllll", ["l", "pa"], ["l", "co"], ["l", "pa"], "lww"],
      ["w", ["l", "rc"], "lgglwwwllll", ["l", "bx"], "llllww"],
      ["w", ["l", "pa"], "lg", ["g", "bm"], "lwwwll", ["l", "pa"], "ll", ["l", "bx"], "llwww"],
      ["wllgglwwwll", ["l", "rc"], "lll", ["l", "pl"], "lwww"],
      ["wlll", ["l", "sp"], "lwwwllllllllwww"],
      ["wwllllwwwll", ["l", "sl"], "llllwwww"],
      ["wwwwwwwwwwll", ["l", "pb"], "lllwwww"]
    ],
    dim: {
      x: 20,
      y: 12
    }
  },
  {
    name: "Holekagi (30.isl)",
    noPadding: true,
    field: [
      ["wwwwwwwwwwww", ["w", "bw"], ["w", "bw"], ["w", "bw"], ["w", "bw"], ["w", "bw"], "www"],
      ["wwwwwwwwwwww", ["w", "bw"], "www", ["w", "bw"], ["w", "bw"], "ww"],
      ["wwwwwwwwwwwwwwwww", ["w", "bw"], "ww"],
      ["wwwllll", ["l", "pa"], "lllll", ["l", "bx"], "l", ["l", "pa"], "w", ["w", "bw"], "ww"],
      ["wwwl", ["l", "pa"], "ll", ["l", "pb"], ["l", "co"], ["l", "pb"], ["l", "co"], ["l", "pb"], ["l", "co"], "ll", ["l", "rc"], "lllw"],
      ["wwwlll", ["l", "pa"], "ll", ["l", "rc"], ["l", "pa"], ["l", "rc"], ["l", "pa"], ["l", "rc"], ["l", "pa"], ["l", "rc"], "l", ["l", "wb"], "lw"],
      ["wwwllllll", ["l", "se"], "g", ["g", "ho"], "gl", ["l", "wh"], "llllw"],
      ["wwwl", ["l", "pl"], "llll", ["g", "pa"], "ggg", ["l", "sh"], "llll", ["l", "rc"], "w"],
      ["wwwlll", ["l", "sl"], "llg", ["g", "rc"], "gglll", ["l", "rc"], "www"],
      "wwwwwllllllllwwwwwww",
      "wwwwwwwwwwwwwwwwwwww",
      "wwwwwwwwwwwwwwwwwwww"
    ],
    dim: {
      x: 20,
      y: 12
    }
  },
  {
    name: "Wakamai (31.isl)",
    noPadding: true,
    field: [
      "wwwwwwwwwwwwwwwwwwww",
      "wwwwwwwwwwwwwwwwwwww",
      "wwwwwwwwwwwwwwwwwwww",
      ["wwwwwl", ["l", "rc"], ["l", "pa"], ["l", "rc"], "lwwwwwwwwww"],
      ["wwwwwllllllllwww", ["l", "ho"], ["l", "pa"], "ww"],
      ["wwwwwllllll", ["l", "bx"], ["l", "pb"], ["l", "bx"], "wl", ["l", "co"], "llw"],
      ["wwwwwlll", ["l", "pl"], "l", ["l", "pa"], "llwwwl", ["l", "pa"], "lw"],
      ["wwwww", ["l", "rc"], ["l", "co"], ["l", "pb"], "lllllwwwwwww"],
      ["wwwww", ["l", "st"], "l", ["l", "rc"], "ll", ["l", "sl"], "llwwwwwww"],
      ["wwwwww", ["l", "st"], "l", ["l", "rc"], ["l", "pa"], "lllwwwwwww"],
      "wwwwwwwwwwwwwwwwwwww",
      "wwwwwwwwwwwwwwwwwwww"
    ],
    dim: {
      x: 20,
      y: 12
    }
  },
  {
    name: "Skubi Dubi (32.isl)",
    noPadding: true,
    field: [
      "wwwwwwwwwwwwwwwwwwww",
      "wwwwwwwwwwwwwwwwwwww",
      "wwwwwwwwwwwwwwwwwwww",
      "wwwwwwwwlllwwwwwwwww",
      ["wwwwwww", ["l", "pa"], "l", ["l", "lf1"], "ll", ["l", "rc"], ["l", "pa"], ["l", "rc"], "llwww"],
      "wwwwlllllllllllllwww",
      ["wwwwlll", ["l", "pb"], "lllll", ["l", "pa"], "lllwww"],
      ["wwwwl", ["l", "sl"], "lll", ["l", "pl"], "lllllllwww"],
      ["wwwwlllllll", ["l", "pa"], "lll", ["l", "pa"], "lwww"],
      ["wwwwwwwwllllll", ["l", "co"], ["l", "ho"], ["l", "pa"], "www"],
      ["wwwwwwwwwllll", ["l", "rc"], "lllwww"],
      "wwwwwwwwwwwwwwwwwwww"
    ],
    dim: {
      x: 20,
      y: 12
    }
  },
  {
    name: "Sektarinka (33.isl)",
    noPadding: true,
    field: [
      "wwwwwwwwwwwwwwwwwwww",
      "wwwwwwwwwwwwwwwwwwww",
      ["wwwwwll", ["l", "pa"], ["l", "pa"], "wwwwwwwwwww"],
      "wwwwwllllwwwwwwwwwww",
      ["wwww", ["l", "pa"], "llllll", ["l", "rc"], "llwwwwww"],
      ["wwwwllll", ["l", "pa"], "llllllwwwww"],
      "wwwwlllllllllllwwwww",
      ["wwwwwwwl", ["l", "pl"], "llllllwwwww"],
      ["wwwwwwwlll", ["l", "lf3"], ["l", "pb"], ["l", "sl"], "llwwwww"],
      ["wwwwwwwl", ["l", "rc"], "lllll", ["l", "co"], "l", ["l", "ho"], "lww"],
      "wwwwwwwwwwwwwwllllww",
      "wwwwwwwwwwwwwwwwwwww"
    ],
    dim: {
      x: 20,
      y: 12
    }
  },
  {
    name: "Pukalamika (34.isl)",
    noPadding: true,
    field: [
      "wwwwwwwwwwwwwwwwwwww",
      "wwwwwwwwwwwwwwwwwwww",
      "wwwwwwwwwwwwwwwwwwww",
      "wwwwwwwllllllllwwwww",
      ["wwwwwwwllllll", ["l", "lf1"], "lwwwww"],
      ["ww", ["l", "rc"], "ll", ["l", "lf2"], "llll", ["l", "lf3"], "ggl", ["l", "lf2"], "lwwww"],
      ["ww", ["l", "rc"], "ll", ["l", "rc"], "lll", ["l", "rc"], "g", ["g", "pl"], "glllwwww"],
      ["wwl", ["l", "pa"], "llll", ["l", "sl"], "lg", ["g", "pb"], "g", ["l", "rc"], "llwl", ["l", "ho"], "w"],
      ["wwlllllllllllllll", ["l", "co"], "lw"],
      ["wwllllllllllllll", ["l", "pa"], "lww"],
      "wwwwwwwwwwwwwwwwwwww",
      "wwwwwwwwwwwwwwwwwwww"
    ],
    dim: {
      x: 20,
      y: 12
    }
  },
  {
    name: "Difinika (35.isl)",
    noPadding: true,
    field: [
      ["wwl", ["l", "pb"], "wwwwwwwwwwwwl", ["l", "pa"], "lw"],
      ["w", ["l", "pa"], "l", ["l", "rc"], "llwwwwllllll", ["l", "co"], "llw"],
      ["wlll", ["l", "rc"], "lllllll", ["l", "pa"], "wwwlllw"],
      ["wlll", ["l", "rc"], "llwwwll", ["l", "lf0"], "wwwwl", ["l", "ho"], "w"],
      ["wll", ["l", "rc"], "l", ["l", "pl"], "lwwww", ["l", "lf1"], "lwwwwllw"],
      ["wll", ["l", "pa"], "lllwwwwlwwwwwwww"],
      "wlllllwwwwwllwwwwwww",
      ["wll", ["l", "lf1"], "llwwwwl", ["l", "sl"], "lwwwwwww"],
      ["wllll", ["l", "co"], "lllll", ["l", "pb"], "lwwwwwww"],
      ["wl", ["l", "sl"], "lllwwwwwwwwwwwwww"],
      "wllllwwwwwwwwwwwwwww",
      "wwwwwwwwwwwwwwwwwwww"
    ],
    dim: {
      x: 20,
      y: 12
    }
  },
  {
    name: "Pikenina (36.isl)",
    noPadding: true,
    field: [
      "wwwwwwwwwwwwwwwwwwww",
      "wwwwwwwwwwwwwwwwwwww",
      "wwwwwwwwwwwwwwwwwwww",
      ["wwwwwwww", ["l", "ho"], ["l", "pa"], "wwwwwwwwww"],
      ["wwwwwwwll", ["l", "sk"], "lwwwwwwwww"],
      ["wwwwwwlg", ["g", "pa"], ["g", "pa"], "llwwwwwwww"],
      ["wwwww", ["l", "rc"], ["l", "rc"], "g", ["g", "pa"], "g", ["l", "bx"], "llwwwwwww"],
      ["wwwwwl", ["l", "rc"], "llllllwwwwwww"],
      ["wwwwwwll", ["l", "rc"], ["l", "pl"], "llwwwwwwww"],
      ["wwwwwwwl", ["l", "sb"], "llwwwwwwwww"],
      "wwwwwwwwllwwwwwwwwww",
      "wwwwwwwwwwwwwwwwwwww"
    ],
    dim: {
      x: 20,
      y: 12
    }
  },
  {
    name: "Buletinkii (37.isl)",
    noPadding: true,
    field: [
      "wwwwwwwwwwwwwwwwwwww",
      "wwwwwwwwwwwwwwwwwwww",
      ["wwwwwwwwwww", ["l", "pa"], ["l", "ho"], ["l", "pa"], ["l", "rc"], "lwwww"],
      ["wwwwwwwwwww", ["l", "pa"], "lll", ["l", "rc"], "lwww"],
      ["wwl", ["l", "pa"], "llllwwwl", ["l", "pa"], "lllllww"],
      ["ww", ["l", "pa"], ["l", "crg"], ["l", "crg"], ["l", "fgg"], ["l", "sb"], "lwwwllllllllw"],
      "wwwlllllwwwllllllllw",
      ["wwwwwwwwww", ["l", "rc"], ["l", "rc"], "ll", ["l", "bx"], ["l", "fgg"], "lllw"],
      ["wwwwwwwwwll", ["l", "rc"], "lll", ["l", "bx"], "l", ["l", "pl"], "lw"],
      ["wwwwwwwwll", ["l", "bx"], "l", ["l", "sk"], "llllllw"],
      ["wwwwwwwwllll", ["l", "rc"], ["l", "rc"], "lllllw"],
      "wwwwwwwwwwwwwwwwwwww"
    ],
    dim: {
      x: 20,
      y: 12
    }
  },
  {
    name: "Valentine (38.isl)",
    noPadding: true,
    field: [
      "wwwwwwwwwwwwwwwwwwww",
      "wwwwwwwlllllwwwwwwww",
      ["wwwwwwll", ["l", "sb"], "lllwwwwwwww"],
      ["wwwwwll", ["l", "bx"], "l", ["l", "rc"], "l", ["l", "lf3"], "wwwwwwww"],
      ["wwlll", ["l", "rc"], ["l", "rc"], "l", ["l", "bx"], "ll", ["l", "pa"], "l", ["l", "pa"], "l", ["l", "ho"], "lwww"],
      ["wwll", ["l", "pa"], "l", ["l", "sk"], "llllllllllwww"],
      ["wwllllll", ["l", "pl"], "llll", ["l", "rc"], ["l", "rc"], ["l", "rc"], ["l", "rc"], "www"],
      ["wwwwllllllll", ["l", "pb"], ["l", "rc"], "l", ["l", "st"], "lwww"],
      ["wwwwwwwll", ["l", "sl"], "l", ["l", "rc"], ["l", "co"], "l", ["l", "st"], "lwwww"],
      ["wwwwwwwlll", ["l", "rc"], ["l", "rc"], ["l", "st"], ["l", "st"], "lwwwww"],
      ["wwwwwwwll", ["l", "rc"], ["l", "rc"], "lllwwwwww"],
      "wwwwwwwwwwwwwwwwwwww"
    ],
    dim: {
      x: 20,
      y: 12
    }
  },
  {
    name: "Kastelli (39.isl)",
    noPadding: true,
    field: [
      "wwwwwwwwwwwwwwwwwwww",
      ["wwll", ["l", "rc"], "l", ["l", "rc"], "l", ["l", "bc"], "lllwwwwwwww"],
      ["wwl", ["l", "mc"], "l", ["l", "rc"], "l", ["l", "bc"], "ll", ["l", "bt"], "llwwwwwww"],
      ["wwlll", ["l", "rc"], "l", ["l", "rc"], ["l", "bc"], "lllllwwwwww"],
      ["wwwll", ["l", "rc"], "l", ["l", "rc"], ["l", "sk"], "gg", ["g", "bc"], "ggllwwww"],
      ["wwwwwwwllg", ["g", "bc"], ["g", "pl"], ["g", "bc"], "gllwwww"],
      ["wwww", ["l", "ho"], ["l", "pa"], "wllgg", ["g", "bc"], "glllwwww"],
      ["wwwwllwllll", ["l", "bm"], "llllwwww"],
      ["wwwwwwwlll", ["l", "bm"], ["l", "sb"], ["l", "bm"], "lllwwww"],
      ["wwwll", ["l", "rc"], ["l", "rc"], "llll", ["l", "bm"], "llllwwww"],
      ["wwwl", ["l", "bx"], "l", ["l", "rc"], "lllwwllllwwww"],
      ["wwwlll", ["l", "rc"], ["l", "rc"], "lwwwwwwwwwww"]
    ],
    dim: {
      x: 20,
      y: 12
    }
  },
  {
    name: "Mikruliki (40.isl)",
    noPadding: true,
    field: [
      "wwwwwwwwwwwwwwwwwwww",
      "wwwwwwwwwwwwwwwwwwww",
      "wwwwwwwwwwwwwwwwwwww",
      "wwwwwwwwwwwwwwwwwwww",
      "wwwwwlllllwwwwwwwwww",
      ["wwwwwl", ["l", "pa"], ["l", "ho"], ["l", "pa"], "llwlll", ["l", "st"], "lwww"],
      ["wwwwwl", ["l", "st"], ["l", "pl"], "l", ["l", "tp"], "lwl", ["l", "tp"], "ll", ["l", "st"], "www"],
      ["wwwwwl", ["l", "st"], ["l", "st"], ["l", "st"], "llwwll", ["l", "st"], "lwww"],
      "wwwwwlllwwwwwwwwwwww",
      "wwwwwwwwwwwwwwwwwwww",
      "wwwwwwwwwwwwwwwwwwww",
      "wwwwwwwwwwwwwwwwwwww"
    ],
    dim: {
      x: 20,
      y: 12
    }
  },
  {
    name: "Taku Whanau (41.isl)",
    noPadding: true,
    field: [
      "wwwwwwwwwwwwwwwwwwww",
      ["wwl", ["l", "rc"], ["l", "ho"], ["l", "pa"], "llllwwwwwwwwww"],
      ["ww", ["l", "pa"], "ll", ["l", "rc"], "ll", ["l", "tp"], "lwwwwwwwwww"],
      "wwwwllllllwwwwwwwwww",
      "wwwwwwwlllwwllllllww",
      ["wwwwwwwl", ["l", "crb"], "lwwlll", ["l", "crb"], "llww"],
      ["wwwwwwwlllwwl", ["l", "fgb"], "llllww"],
      ["wwwwwwwlllwwll", ["l", "tp"], "lllww"],
      ["wwwll", ["l", "pa"], "ll", ["l", "fgb"], "lwwllllwwww"],
      ["wwwl", ["l", "pa"], "l", ["l", "pl"], "lllwwwwwwwwww"],
      ["wwwwl", ["l", "rc"], "llllwwwwwwwwww"],
      "wwwwwwwwwwwwwwwwwwww"
    ],
    dim: {
      x: 20,
      y: 12
    }
  },
  {
    name: "Tamera Nali (42.isl)",
    noPadding: true,
    field: [
      ["wwwwwwwwwwwwwwll", ["l", "pa"], "llw"],
      ["w", ["l", "rc"], "ll", ["l", "lf1"], "lllllll", ["l", "pb"], "ll", ["l", "pa"], ["l", "ho"], ["l", "pa"], "lw"],
      ["w", ["l", "rc"], "l", ["l", "rc"], "llgg", ["g", "pa"], "glll", ["l", "pl"], "l", ["l", "lf2"], "l", ["l", "pa"], "ww"],
      ["wl", ["l", "sl"], "lllg", ["g", "pa"], "gg", ["l", "bx"], "lllllllww"],
      ["wwllllll", ["l", "bx"], "llllwwwwwww"],
      "wwwwwwwlllllwwwwwwww",
      "wwwwwwwwwwwwwwwwwwww",
      "wwwllllwwwwwwwlllwww",
      ["wwwl", ["l", "bx"], ["l", "rc"], "lwwwwwl", ["l", "rc"], ["l", "pa"], "ll", ["l", "rc"], "ww"],
      ["wwwll", ["l", "bx"], "llwwww", ["l", "rc"], "lll", ["l", "co"], ["l", "st"], "ww"],
      ["wwwwll", ["l", "bx"], "lwwwwllll", ["l", "rc"], ["l", "st"], "ww"],
      ["wwwwwll", ["l", "rc"], "wwwwwwwwwwww"]
    ],
    dim: {
      x: 20,
      y: 12
    }
  },
  {
    name: "Kalapana (43.isl)",
    noPadding: true,
    field: [
      "wwwwwwwwwwwwwwwwwwww",
      ["wwwwwwwwwwwwwl", ["l", "pa"], "llwww"],
      ["wwwwlllllllll", ["l", "pa"], "l", ["l", "pa"], "lwww"],
      ["wwwwll", ["l", "fgr"], "ll", ["l", "fgr"], "lllllllwww"],
      ["wwwwlllllllll", ["l", "pl"], "lllwww"],
      ["wwwwlll", ["l", "fgr"], "lllllllllwww"],
      ["wwwwlllll", ["l", "fgr"], "llll", ["l", "crr"], ["l", "crr"], ["l", "rc"], "www"],
      ["wwwwllllllll", ["l", "rc"], ["l", "crr"], ["l", "crr"], ["l", "rc"], ["l", "rc"], "www"],
      ["www", ["l", "pa"], ["l", "ho"], "llwwwww", ["l", "rc"], ["l", "rc"], ["l", "rc"], ["l", "rc"], "wwww"],
      "wwwlllwwwwwwwwwwwwww",
      "wwwwwwwwwwwwwwwwwwww",
      "wwwwwwwwwwwwwwwwwwww"
    ],
    dim: {
      x: 20,
      y: 12
    }
  },
  {
    name: "Hokioi Ahoi (44.isl)",
    noPadding: true,
    field: [
      ["wwww", ["w", "by"], "wwwwwwwwwwwwwww"],
      ["wwwwwwwwwwwwwwww", ["l", "pa"], "lww"],
      ["w", ["w", "by"], "wwwwwwwwwll", ["w", "ra", "pi"], "wll", ["l", "ci"], "lw"],
      ["wwwwwwwwwww", ["l", "pa"], "l", ["l", "ph"], "l", ["l", "pa"], "gglw"],
      ["wwwwwwwww", ["w", "by"], "wll", ["l", "ci"], "l", ["g", "ci"], ["g", "pl"], ["g", "ci"], ["l", "ci"], "w"],
      ["wwwww", ["w", "by"], "wwwwwwlllggglw"],
      ["wwwwwwwwwwwwwwll", ["l", "ci"], "llw"],
      ["wwwl", ["l", "rc"], "lwwwwwwwwwwwwww"],
      ["wwl", ["l", "pa"], ["l", "ho"], ["l", "pa"], "wwwwwwwwwwwwww"],
      ["ww", ["l", "rc"], "lllwwwwww", ["w", "by"], "wwwwww", ["w", "by"]],
      ["wwllllwwwwwwwwww", ["w", "by"], "www"],
      ["wwwwwwww", ["w", "by"], "wwwwwwwwwww"]
    ],
    dim: {
      x: 20,
      y: 12
    }
  },
  {
    name: "Kolombo (45.isl)",
    noPadding: true,
    field: [
      ["wwwwwwwwwwwwwwww", ["w", "by"], "www"],
      ["wwwwwwww", ["w", "by"], "wwwwlll", ["l", "pa"], "llw"],
      ["w", ["w", "by"], "wwwwwwwwwww", ["l", "pa"], "l", ["l", "bx"], "l", ["l", "sb"], ["l", "pa"], "w"],
      "wwwwwwwwwwwwwwwwwllw",
      ["wwwlllw", ["w", "by"], "wwwwwwwwwwww"],
      ["wwwl", ["l", "pa"], "lwwwwwwwwwwwwww"],
      ["wwwl", ["l", "ci"], "lll", ["w", "ra", "pi"], "wwwwllll", ["l", "rc"], "lw"],
      ["wwwl", ["l", "pa"], "l", ["l", "ci"], "l", ["l", "ph"], "lwwlll", ["l", "pa"], ["l", "rc"], ["l", "ho"], "lw"],
      ["www", ["l", "ci"], "l", ["l", "pa"], ["l", "pl"], ["l", "rc"], ["l", "ci"], "lwwllll", ["l", "sk"], "llw"],
      ["wwwl", ["l", "pa"], ["l", "ci"], ["l", "rc"], ["l", "ci"], ["l", "rc"], "l", ["w", "by"], "wwwwl", ["l", "pa"], ["l", "pa"], "lw"],
      ["wwwl", ["l", "ci"], "lll", ["l", "ci"], "lwwwwwwwwww"],
      ["wwwwwwwwwwwww", ["w", "by"], "wwwwww"]
    ],
    dim: {
      x: 20,
      y: 12
    }
  },
  {
    name: "Bikiniki (46.isl)",
    noPadding: true,
    field: [
      ["wwwwwwwwwwwwwwwww", ["l", "pa"], ["l", "ho"], "w"],
      ["wwwwwwwwwwwwwwwwwl", ["l", "ci"], "w"],
      ["wwwwwwwwwww", ["w", "by"], "wwwwwl", ["l", "pa"], "w"],
      ["wwll", ["l", "ci"], "wwwwwwwwwwwl", ["l", "se"], "lw"],
      ["wll", ["l", "wh"], "lwwwwwwwwwwwl", ["l", "tp"], ["l", "ci"], "w"],
      ["wl", ["l", "ci"], "llwwwllwwwwwwl", ["l", "rc"], ["l", "rc"], "w"],
      ["wll", ["w", "ra", "pi"], "wwwl", ["l", "pa"], "lwwwwww", ["l", "rc"], ["l", "rc"], "lw"],
      ["w", ["l", "ci"], "l", ["l", "ph"], "ll", ["l", "ci"], "l", ["l", "ci"], "lwww", ["w", "by"], "wwl", ["l", "rc"], "lw"],
      ["wl", ["l", "wb"], "l", ["l", "sh"], "g", ["g", "bc"], ["g", "pa"], "glwwwwwwwl", ["l", "mc"], "w"],
      ["wl", ["l", "tp"], ["l", "pl"], "g", ["g", "bc"], ["g", "pa"], ["g", "bc"], "glwwwwwwwl", ["l", "bc"], "w"],
      ["wll", ["l", "ci"], "gggg", ["l", "ci"], "lwwwwwwl", ["l", "bc"], "lw"],
      ["wwlll", ["l", "pa"], "llllwwww", ["w", "by"], "wl", ["l", "bc"], "lw"]
    ],
    dim: {
      x: 20,
      y: 12
    }
  },
  {
    name: "Karangia (47.isl)",
    noPadding: true,
    field: [
      ["wwwwwwwwww", ["w", "by"], "wwwwwwwww"],
      ["wwwww", ["w", "by"], "wwwwwwwwwwwwww"],
      [["w", "by"], "wwwwwwwwwwwwwwwwwww"],
      ["wwwwww", ["w", "by"], "wwwwwwwwwwwww"],
      ["wlllwwwwwwwwwwwwwwl", ["l", "ci"]],
      ["w", ["l", "pa"], ["l", "bt"], "lwwwwwwwwwwww", ["l", "rc"], ["l", "pa"], "ll"],
      ["w", ["l", "pa"], "l", ["l", "rc"], ["l", "ci"], "wwwwwwwwww", ["l", "rc"], "l", ["l", "ho"], ["l", "ci"], "l"],
      ["wl", ["l", "pa"], "ll", ["w", "ra", "pi"], ["w", "bw"], ["w", "bw"], "w", ["w", "by"], "wwlll", ["l", "rc"], "ll", ["l", "rc"], ["l", "bx"]],
      ["wl", ["l", "rc"], "ll", ["l", "ph"], ["l", "rc"], ["l", "pa"], "l", ["l", "bm"], "lll", ["l", "rc"], "lg", ["g", "pa"], "g", ["l", "pl"], "l"],
      ["wwwl", ["l", "bx"], ["l", "ci"], "l", ["l", "rc"], "l", ["l", "rc"], "llll", ["l", "pa"], "gg", ["g", "rc"], "ll"],
      ["www", ["l", "ci"], "lll", ["l", "pa"], ["l", "pa"], ["l", "pa"], ["l", "pa"], ["l", "pa"], ["l", "pa"], ["l", "pa"], ["l", "ci"], "l", ["l", "bx"], "l", ["l", "bx"], "w"],
      ["wwwwww", ["l", "ci"], "ll", ["l", "ci"], "ll", ["w", "bw"], ["w", "bw"], "wll", ["l", "ci"], "lw"]
    ],
    dim: {
      x: 20,
      y: 12
    }
  },
  {
    name: "Piripiri Verdi (48.isl)",
    noPadding: true,
    field: [
      ["wwwwwwww", ["w", "rc"], "wwwwwwwwwww"],
      "wwwwwwwlllwwwwwwwwww",
      ["wllwwwwl", ["l", "ci"], ["l", "pa"], "lwwwwwwwww"],
      ["w", ["l", "pa"], ["l", "ci"], "wwwwwl", ["l", "ci"], "lwwwwwwwww"],
      ["w", ["l", "ci"], "lwwll", ["w", "ra", "pi"], "ll", ["l", "ci"], ["l", "rc"], "lwwwwwww"],
      ["wl", ["l", "pl"], "wwll", ["l", "ph"], "l", ["g", "pa"], "gglww", ["l", "pa"], ["l", "ho"], ["l", "rc"], "lw"],
      ["w", ["l", "ci"], ["l", "bm"], "lwwlllg", ["g", "rc"], ["g", "pa"], "lww", ["l", "fgg"], "l", ["l", "crg"], "lw"],
      ["wl", ["l", "bx"], "lw", ["w", "bw"], "lllggglwwllllw"],
      ["wll", ["l", "ci"], "ww", ["l", "pa"], "lllllwwwwwllw"],
      ["ww", ["l", "ci"], ["l", "pa"], "wwl", ["l", "pa"], "ll", ["l", "bt"], "lwwwwwwww"],
      ["wwllwww", ["l", "fgg"], "l", ["l", "crg"], "llwwwwwwww"],
      "wwwwwwwlllllwwwwwwww"
    ],
    dim: {
      x: 20,
      y: 12
    }
  },
  {
    name: "Waialua (49.isl)",
    noPadding: true,
    field: [
      ["wwwwwwwwwl", ["l", "pa"], "llllwwwww"],
      ["wl", ["l", "pa"], "l", ["w", "ra", "pi"], "www", ["l", "pa"], "g", ["g", "mc"], "g", ["l", "wh"], "llwwwww"],
      ["w", ["l", "pa"], ["l", "ci"], "l", ["l", "ph"], "wwl", ["l", "ci"], "g", ["g", "pl"], "gl", ["l", "wb"], "lwwwww"],
      ["wl", ["l", "bc"], ["l", "ci"], "lww", ["l", "se"], ["l", "tp"], "gg", ["l", "sh"], "lllwwwww"],
      ["wwl", ["l", "bc"], "lwwl", ["l", "ci"], ["l", "rc"], ["l", "pa"], "lwwwwwwww"],
      ["wwl", ["l", "tp"], ["l", "ci"], "wwwwwwwwwwwwwww"],
      ["wwl", ["l", "bc"], "lwwwwwwwwwwl", ["l", "pa"], "lww"],
      ["www", ["l", "ci"], "lwwwwwwwwwl", ["l", "rc"], ["l", "ho"], ["l", "pa"], "ww"],
      ["wwwl", ["l", "ci"], "lwwwwwwwl", ["l", "bc"], "l", ["l", "bc"], "lww"],
      ["wwwwl", ["l", "pa"], "wwwwwwwll", ["l", "bc"], "llww"],
      "wwwwwwwwwwwwwwwwwwww",
      "wwwwwwwwwwwwwwwwwwww"
    ],
    dim: {
      x: 20,
      y: 12
    }
  },
  {
    name: "Thalia Dalia (50.isl)",
    noPadding: true,
    field: [
      ["www", ["w", "rc"], ["w", "rc"], ["w", "rc"], "wwwwwwwww", ["l", "ho"], "lwww"],
      ["ww", ["w", "rc"], "lllwwwwwwww", ["l", "rc"], "ll", ["l", "rc"], "ww"],
      ["ww", ["w", "rc"], ["l", "ci"], ["l", "pa"], ["l", "ci"], "l", ["w", "ra", "pi"], "wwwwww", ["l", "rc"], "l", ["l", "rc"], "lww"],
      ["wwl", ["l", "pa"], "l", ["l", "pa"], "l", ["l", "ph"], "wwwwwwlllwww"],
      ["ww", ["l", "ci"], "l", ["l", "ci"], "lllwwwwwwwwwwww"],
      ["wwl", ["l", "pa"], "l", ["l", "bx"], ["l", "pa"], "wwwwwwwwwwwww"],
      ["wwl", ["l", "ci"], ["l", "pa"], "llwwwwwwwwwwwww"],
      ["wwl", ["l", "pa"], "l", ["l", "pl"], ["l", "ci"], ["w", "rc"], "wwwlllwwwwww"],
      ["wwll", ["l", "ci"], "llllwll", ["l", "pa"], ["l", "ky"], "lwwwww"],
      ["wwwll", ["l", "pa"], ["l", "ch"], ["l", "pa"], "wwwl", ["l", "ci"], ["l", "pa"], "lwwwww"],
      ["wwwwllllwww", ["l", "pa"], "l", ["l", "ci"], "lwwwww"],
      "wwwwwwwwwwwwwwwwwwww"
    ],
    dim: {
      x: 20,
      y: 12
    }
  },
  {
    name: "Polynesia (51.isl)",
    noPadding: true,
    field: [
      ["wwwwwwwwwwwww", ["w", "bw"], "w", ["w", "rc"], ["w", "rc"], ["w", "rc"], "ww"],
      ["ww", ["l", "pa"], ["l", "ho"], "wwwwwwwwwwll", ["l", "pa"], "lww"],
      ["wwll", ["l", "ch"], "lwwwwwwwwl", ["l", "mc"], "l", ["l", "pa"], "ww"],
      ["wwllll", ["w", "ra", "pi"], "wwwww", ["w", "bw"], "wl", ["l", "bc"], ["l", "tp"], "lww"],
      ["ww", ["l", "pa"], "l", ["l", "tp"], "l", ["l", "ph"], "wwwwwwwll", ["l", "bc"], "www"],
      ["wwll", ["l", "pa"], "llwwwwwwwwllw", ["w", "bw", "st"], "w"],
      ["wlllww", ["l", "rc"], ["l", "bc"], "llwwwwwl", ["l", "bc"], "lww"],
      ["w", ["l", "ky"], "lwwww", ["l", "rc"], "llwww", ["w", "bw", "st"], "wl", ["l", "pa"], ["l", "bc"], "lw"],
      ["w", ["l", "pa"], ["l", "bc"], "ww", ["w", "bw", "bc"], "wl", ["l", "bx"], "lwwwwwllllw"],
      ["ww", ["l", "rc"], "lw", ["w", "bw", "bc"], ["w", "bw", "bm"], "wllwwwwwwwwww"],
      ["wwl", ["l", "bc"], "l", ["l", "bt"], ["l", "bc"], ["l", "pl"], "l", ["l", "bc"], "w", ["w", "bw", "st"], "wwwwwwww"],
      ["w", ["w", "bw", "st"], "wwllll", ["l", "bc"], "lwwwwwwwwww"]
    ],
    dim: {
      x: 20,
      y: 12
    }
  },
  {
    name: "Kailua Konami (52.isl)",
    noPadding: true,
    field: [
      "wwwllwwwwwwwwwwwwwww",
      ["wwwl", ["l", "rc"], ["l", "fgg"], "wwwwwwwwwwwwww"],
      ["www", ["l", "rc"], ["l", "ky"], "lll", ["w", "ra", "pi"], "wwwwwwwwwww"],
      ["wwll", ["l", "rc"], "lll", ["l", "ph"], "wwwllwwwwww"],
      ["ww", ["l", "pa"], "lll", ["l", "crg"], "ll", ["l", "rc"], ["l", "rc"], ["l", "rc"], "l", ["l", "ch"], "llwwww"],
      [["l", "pa"], ["l", "ho"], ["l", "pa"], ["l", "pa"], "llllll", ["l", "rc"], "ll", ["l", "tp"], "l", ["l", "pl"], "llww"],
      ["ll", ["l", "pa"], "ll", ["l", "ch"], "l", ["l", "tp"], "lll", ["l", "rc"], ["l", "rc"], "lll", ["l", "ch"], "lww"],
      ["l", ["l", "pa"], "l", ["l", "pa"], "llllllllwl", ["l", "bx"], "lllww"],
      ["ww", ["l", "pa"], "lllll", ["l", "ch"], "lw", ["w", "bw"], "wl", ["l", "bx"], "l", ["l", "ky"], "lww"],
      ["ww", ["l", "ky"], "lllllllwww", ["l", "pa"], "lllwww"],
      ["wwwwwwll", ["l", "rc"], ["l", "rc"], "w", ["w", "bw", "ky"], "wl", ["l", "pa"], "lwwww"],
      "wwwwwwwwwwwwwwwwwwww"
    ],
    dim: {
      x: 20,
      y: 12
    }
  },
  {
    name: "Tomtom Island (53.isl)",
    noPadding: true,
    field: [
      ["wwwwwwww", ["w", "ra"], "w", ["w", "by"], "wwwwwwwww"],
      ["wwww", ["l", "pa"], ["l", "ho"], ["l", "rc"], "llllll", ["l", "rc"], "lwwwww"],
      ["wwwwll", ["l", "crr"], ["l", "rc"], "ll", ["l", "rc"], ["l", "rc"], ["l", "rc"], ["l", "rc"], "lwwwww"],
      ["wwwwlll", ["l", "ky"], ["l", "rc"], ["l", "rc"], ["l", "rc"], "l", ["l", "pa"], "llwwwww"],
      ["wwwl", ["l", "pa"], "lllll", ["l", "crb"], ["l", "sb"], "l", ["l", "fgb"], "lwwwww"],
      ["wwwlll", ["l", "fgr"], ["l", "rc"], "llllllwwwwww"],
      ["wwwwwww", ["l", "rc"], "lll", ["l", "rc"], "wwwwwwww"],
      ["wwwwwwww", ["l", "rc"], ["l", "sk"], ["l", "rc"], "wwww", ["l", "pa"], "l", ["w", "ra", "pi"], "ww"],
      ["wwwwwwww", ["l", "rc"], "lllwwlll", ["l", "ph"], "ww"],
      ["wwwwwl", ["l", "pa"], "l", ["l", "crb"], ["l", "ci"], ["l", "ci"], ["l", "fgb"], ["l", "ci"], ["l", "ci"], "l", ["l", "pl"], "llww"],
      ["wwwwl", ["l", "pa"], ["l", "ch"], "lllllllllllww"],
      "wwwwlllllwwwwwwwwwww"
    ],
    dim: {
      x: 20,
      y: 12
    }
  },
  {
    name: "Kukiperla (54.isl)",
    noPadding: true,
    field: [
      "wwwwwwwwwwwwwwwwwwww",
      "wwwwwwwwwwwwwwwwwwww",
      "wwwwwwwwwwwwwwwwwwww",
      "wwwwwwwwwwwwwwwwwwww",
      ["wwwwwwllwwwwwwll", ["l", "pa"], "lww"],
      ["wwwwwwlllll", ["l", "pa"], "l", ["l", "pa"], "l", ["l", "rc"], ["l", "ho"], ["l", "pa"], "ww"],
      ["wwwwwwl", ["l", "pl"], "llgg", ["g", "rc"], "gllllww"],
      ["wwwwwwll", ["l", "pr"], "lg", ["g", "pa"], "gg", ["l", "pp"], "lllww"],
      ["wwwwwwlllllllll", ["l", "rc"], "wwww"],
      ["wwwwwwwwwwwl", ["l", "rc"], "llwwwww"],
      "wwwwwwwwwwwwwwwwwwww",
      "wwwwwwwwwwwwwwwwwwww"
    ],
    dim: {
      x: 20,
      y: 12
    }
  },
  {
    name: "Tamatiti (55.isl)",
    noPadding: true,
    field: [
      "wwwwwwwwwwwwwwwwwwww",
      ["ww", ["l", "pa"], ["l", "ho"], ["l", "rc"], "llwwwwwwllwwwww"],
      ["wwlll", ["l", "rc"], "lllwwww", ["l", "pa"], "lwwwww"],
      ["ww", ["l", "pa"], ["l", "pl"], "l", ["l", "pp"], "ll", ["l", "rc"], "wwlll", ["l", "rc"], "wwwww"],
      ["ww", ["l", "pa"], "ll", ["l", "rc"], "ll", ["l", "pp"], "llllll", ["l", "rc"], "wwww"],
      ["www", ["l", "pa"], "llll", ["l", "rc"], ["l", "rc"], ["l", "rc"], ["l", "rc"], ["l", "rc"], ["l", "pp"], ["l", "rc"], "llwww"],
      ["www", ["l", "pa"], ["l", "fgg"], "l", ["l", "rc"], ["l", "rc"], "l", ["l", "pr"], ["l", "pr"], ["l", "pr"], ["l", "pr"], "l", ["l", "pp"], "llllw"],
      ["www", ["l", "pa"], "lllll", ["l", "rc"], "llll", ["l", "rc"], "l", ["l", "crg"], "llw"],
      ["wwwlllllwwwwwwl", ["l", "rc"], "l", ["l", "pa"], "lw"],
      "wwwwwwwwwwwwwwwwwwww",
      "wwwwwwwwwwwwwwwwwwww",
      "wwwwwwwwwwwwwwwwwwww"
    ],
    dim: {
      x: 20,
      y: 12
    }
  },
  {
    name: "Sumatrista (56.isl)",
    noPadding: true,
    field: [
      "wwwwwwwwwwwwwwwwwwww",
      ["wwwwwwwwl", ["l", "pa"], "llll", ["l", "rc"], "ll", ["l", "rc"], "lw"],
      ["wwwwwwww", ["l", "pa"], "l", ["l", "bm"], ["l", "bc"], "ll", ["l", "pp"], "ll", ["l", "pr"], ["l", "rc"], "w"],
      ["wwwl", ["l", "rc"], "lll", ["l", "rc"], "l", ["l", "bc"], "l", ["l", "bc"], "l", ["l", "rc"], "l", ["l", "pl"], ["l", "pr"], ["l", "rc"], "w"],
      ["wwwl", ["l", "ho"], ["l", "rc"], "lg", ["g", "pa"], "gl", ["l", "crb", "fgb"], ["l", "sb"], "l", ["l", "rc"], "llllw"],
      ["wwwlll", ["l", "pa"], "g", ["g", "rc"], ["g", "pa"], ["l", "rc"], ["l", "pa"], ["l", "rc"], ["l", "pa"], ["l", "rc"], ["l", "pp"], ["l", "rc"], ["l", "rc"], ["l", "rc"], "w"],
      ["wwwllll", ["l", "mc"], ["l", "rc"], "llll", ["l", "rc"], "lllllw"],
      ["wwwwwwll", ["l", "pa"], "llll", ["l", "sk"], "llllww"],
      ["wwwwwwlll", ["l", "rc"], ["l", "crb", "fgb"], "l", ["l", "rc"], ["l", "rc"], "ll", ["l", "st"], "lww"],
      ["wwwwwwwwll", ["l", "rc"], ["l", "rc"], ["l", "pa"], ["l", "rc"], "l", ["l", "bt"], "llww"],
      ["wwwwwwwwlll", ["l", "pa"], ["l", "rc"], "l", ["l", "pa"], "l", ["l", "st"], "lww"],
      "wwwwwwwwwwwwwwwwwwww"
    ],
    dim: {
      x: 20,
      y: 12
    }
  },
  {
    name: "Molokai (57.isl)",
    noPadding: true,
    field: [
      "wwwwwwwwwwwwwwwwwwww",
      "wwwwwwlllwwwwwwwwwww",
      ["wwwwwwl", ["l", "rc"], ["l", "pa"], "lwwwwwwwwww"],
      ["wwwwww", ["l", "pa"], "lllwwwwwwwwww"],
      ["wwwwwwlllll", ["l", "rc"], ["l", "rc"], "lwwwwww"],
      ["wwwwww", ["l", "rc"], "ll", ["l", "cl"], "lll", ["l", "rc"], "lwwwww"],
      ["wwwwwwllllll", ["l", "pl"], "llwwwww"],
      ["wwwwwwl", ["l", "sl"], "lllllllwwwww"],
      ["wwwwwwllll", ["l", "pb"], "lll", ["l", "pa"], ["l", "pa"], ["l", "ho"], ["l", "rc"], "ww"],
      ["wwwwwwwwwl", ["l", "pa"], "ll", ["l", "pp"], "lll", ["l", "rc"], "ww"],
      ["wwwwwwwwwll", ["l", "pa"], ["l", "rc"], ["l", "pa"], "llllww"],
      "wwwwwwwwwwwwwwwwwwww"
    ],
    dim: {
      x: 20,
      y: 12
    }
  },
  {
    name: "Brasi Lui (58.isl)",
    noPadding: true,
    field: [
      "wwwwwwwwwwwwwwwwwwww",
      "wwwwwwwwwwwwwwwwwwww",
      ["wwwwwwwwl", ["l", "rc"], "lwwwwwwwww"],
      ["wwwwwwwwl", ["l", "pb"], "l", ["l", "cl"], "lwwwlllw"],
      ["w", ["l", "pa"], "lwwwwl", ["l", "rc"], "llllwwwl", ["l", "pa"], "ll"],
      ["wllllll", ["l", "pp"], "lllllwwl", ["l", "crb"], ["l", "rc"], ["l", "ho"], "l"],
      ["wl", ["l", "fgb"], ["l", "pa"], "wwwlll", ["l", "pl"], "l", ["l", "pp"], "llll", ["l", "pa"], "ll"],
      ["wlllwwwl", ["l", "cl"], "llllww", ["l", "pa"], "lllw"],
      ["wwwwwwwllll", ["l", "pa"], "wwwwwwww"],
      ["wwwwwwwll", ["l", "sl"], ["l", "pa"], "lwwwwwwww"],
      "wwwwwwwllllwwwwwwwww",
      "wwwwwwwwwwwwwwwwwwww"
    ],
    dim: {
      x: 20,
      y: 12
    }
  },
  {
    name: "Takiti Pinu (59.isl)",
    noPadding: true,
    field: [
      ["wwwww", ["l", "pa"], "llllwwwwwwwwww"],
      ["www", ["l", "rc"], "llll", ["l", "crb"], "lwwww", ["l", "pa"], "lwwww"],
      ["ww", ["l", "pa"], "l", ["l", "pb"], "l", ["l", "tp"], "l", ["l", "bx"], "lwwwll", ["l", "pl"], "lwww"],
      ["wwllll", ["l", "sl"], "ll", ["l", "rc"], "wwwlllllll"],
      ["wwllllll", ["l", "rc"], ["l", "rc"], "wwwwwll", ["l", "bx"], ["l", "bx"], "l"],
      ["wwl", ["l", "pp"], ["l", "pp"], ["l", "rc"], ["l", "pa"], ["l", "rc"], ["l", "pa"], "lwwwwwwllll"],
      ["wwwllll", ["l", "fgb"], "ll", ["l", "rc"], ["l", "ho"], ["l", "pa"], "wlll", ["l", "cl"], ["l", "tp"], "l"],
      ["wwwl", ["l", "bt"], "llll", ["l", "rc"], "ll", ["l", "pa"], "wll", ["l", "cl"], "lll"],
      ["wwwllll", ["l", "pa"], ["l", "rc"], ["l", "rc"], "lll", ["l", "pa"], "l", ["l", "bm"], "ll", ["l", "rc"], "w"],
      ["wwwwwwwwwlllll", ["l", "pa"], "ll", ["l", "pa"], "lw"],
      "wwwwwwwwwwwwwwwwwwww",
      "wwwwwwwwwwwwwwwwwwww"
    ],
    dim: {
      x: 20,
      y: 12
    }
  },
  {
    name: "Mauna Loa (60.isl)",
    noPadding: true,
    field: [
      "wwwwwwwwwwwwwwwwwwww",
      "wwwllllwwwwwwwwwwwww",
      ["wwl", ["l", "rc"], "l", ["l", "rc"], "llwwwwwwwwl", ["l", "st"], "lw"],
      ["wwllll", ["l", "cl"], "lllllwwww", ["l", "st"], ["l", "pp"], ["l", "pa"], "l"],
      ["ww", ["l", "rc"], "lll", ["l", "rc"], "ll", ["l", "rc"], "llwwww", ["l", "pp"], "lll"],
      ["wwl", ["l", "cl"], ["l", "rc"], "ll", ["l", "rc"], "llllllllllww"],
      ["wwlllll", ["l", "cl"], "ll", ["l", "rc"], "llwwwwwww"],
      ["wwl", ["l", "rc"], "ll", ["l", "rc"], ["l", "rc"], "l", ["l", "pb"], "l", ["l", "cl"], "lwwwwwww"],
      ["wwll", ["l", "rc"], "lllll", ["l", "rc"], "lllllll", ["l", "pp"], "w"],
      ["wwwl", ["l", "cl"], "ll", ["l", "pl"], "llllwwww", ["l", "pp"], ["l", "pp"], "l", ["l", "pa"]],
      ["wwwll", ["l", "sl"], "llllllwwww", ["l", "pa"], ["l", "ho"], "ll"],
      "wwwwlllllwwwwwwwlllw"
    ],
    dim: {
      x: 20,
      y: 12
    }
  },
  {
    name: "Tricky Island (61.isl)",
    noPadding: true,
    field: [
      "wwwwwwwwwwwwwwwwwwww",
      "wwwwwwwwwwwwwwwwwwww",
      ["wwwwwwwwwllll", ["l", "pa"], "lwwwww"],
      ["wwwwlllllllll", ["l", "ho"], ["l", "pa"], "wwwww"],
      ["wwwlllggggglll", ["l", "pa"], "wwwww"],
      ["www", ["l", "pa"], "l", ["l", "bm"], "g", ["g", "rc"], ["g", "pa"], "ggl", ["l", "fgb"], "llwwwww"],
      ["wwwwllgggg", ["l", "rc"], "lllwwwwww"],
      ["wwwwl", ["l", "bt"], "g", ["g", "pa"], "g", ["l", "rc"], "lllwwwwwww"],
      ["wwwwwll", ["l", "rc"], ["l", "crb", "rc"], "llllwwwwwww"],
      ["wwwwwl", ["l", "rc"], "lll", ["l", "pl"], "l", ["l", "pa"], "wwwwwww"],
      ["wwwwwl", ["l", "rc"], "lllllwwwwwwww"],
      "wwwwwwwwwwwwwwwwwwww"
    ],
    dim: {
      x: 20,
      y: 12
    }
  },
  {
    name: "Ko Samui (62.isl)",
    noPadding: true,
    field: [
      ["wwwwwwwwwwwwwwwwwww", ["w", "by"]],
      "wwllllllllwwwwwwwwww",
      ["wwll", ["l", "cl"], "ll", ["l", "rc"], "ll", ["w", "ra", "pi"], "wllllwwww"],
      ["wwl", ["l", "pa"], "llllll", ["l", "ph"], "llll", ["l", "co"], ["l", "cl"], "www"],
      ["wwwwllllllllllll", ["l", "rc"], "lww"],
      ["wwwwwlllllll", ["l", "pl"], "l", ["l", "pa"], "lllww"],
      "wwwwwllllllllllllllw",
      ["wwwwwl", ["l", "sl"], "l", ["l", "ky"], ["l", "lf1"], ["l", "pb"], "ll", ["l", "rc"], ["l", "pp"], ["l", "pa"], "ll", ["l", "pb"], "w"],
      ["wll", ["l", "cl"], "lllllll", ["l", "bx"], "l", ["l", "pp"], "l", ["l", "rc"], ["l", "ho"], ["l", "pa"], "lw"],
      ["wlll", ["l", "pa"], "llllllll", ["l", "pp"], "lll", ["l", "ch"], ["l", "rc"], ["w", "bw", "st"]],
      ["wwwwwwwwwwwww", ["l", "pa"], "lllllw"],
      ["wwwww", ["w", "bw", "st"], "wwwwwwwwwwwwww"]
    ],
    dim: {
      x: 20,
      y: 12
    }
  },
  {
    name: "Ekwariki (63.isl)",
    noPadding: true,
    field: [
      "wwwwwwwwwwwwwwwwwwww",
      ["wl", ["l", "pa"], "lwwwwwwwwwwl", ["l", "bc"], ["l", "pa"], ["l", "bc"], ["l", "bc"], "w"],
      ["w", ["l", "pa"], ["l", "ho"], ["l", "rc"], "lwwwwwwwll", ["l", "bc"], ["l", "bc"], "gg", ["l", "bc"], "w"],
      ["wlll", ["l", "rc"], "lwwwwwwll", ["l", "bc"], "g", ["g", "pa"], "g", ["l", "bc"], "w"],
      ["wwllllwwwwwwllg", ["g", "rc"], "g", ["l", "bc"], ["l", "bc"], ["w", "bw"]],
      ["wwwlllllwwwwllgglww", ["w", "bw"]],
      ["wwwll", ["l", "cl"], "llll", ["l", "pa"], "ll", ["l", "pl"], "l", ["l", "pp"], "www", ["w", "bw"]],
      ["wwwl", ["l", "cl"], ["l", "mc"], "lllllllll", ["l", "pp"], ["w", "bw"], ["w", "bw"], "w", ["w", "bw"]],
      ["wwwll", ["l", "cl"], "l", ["l", "pa"], "lwwl", ["l", "sl"], "ll", ["l", "pp"], "w", ["w", "bw"], "w", ["w", "bw"]],
      ["wwwlllllwwwll", ["l", "pb"], "llw", ["w", "bw"], ["w", "bw"], ["w", "bw"]],
      "wwwwwwwwwwwwlllwwwww",
      "wwwwwwwwwwwwwwwwwwww"
    ],
    dim: {
      x: 20,
      y: 12
    }
  },
  {
    name: "Horhor Ring (64.isl)",
    noPadding: true,
    field: [
      ["wl", ["l", "pa"], ["l", "mc"], "lw", ["w", "bw", "st"], "www", ["w", "by"], "wwwwwwwww"],
      ["w", ["l", "pa"], "lllwwwwwwww", ["w", "bw", "bc"], "wwwwww"],
      ["w", ["l", "pa"], ["l", "ho"], ["l", "bx"], "lwwwwwwwwwwww", ["w", "bw", "st"], "ww"],
      ["ww", ["w", "bw", "bc"], "wwwwww", ["w", "bw", "st"], "wwwwwwwwww"],
      "wwwwwwwwwwwwwwwwwwww",
      [["w", "bw", "bc"], "wwwwwwwwwwwwww", ["w", "bw", "bc"], "wwww"],
      "wwwwwwwwwwwwwwwwwwww",
      ["wwwww", ["w", "by"], "wwwwwwwwwwwwww"],
      ["wwwwwwwwwww", ["w", "bw", "bc"], "wwwwwwww"],
      ["wwwwwwwwwwwwwwwww", ["w", "ra", "pi"], "ww"],
      ["wwwwwwwwwwwwwwww", ["l", "bx"], ["l", "ph"], ["l", "ch"], "w"],
      ["ww", ["w", "bw", "st"], "wwwww", ["w", "by"], "wwwwwww", ["l", "ky"], ["l", "pl"], ["l", "ci"], "w"]
    ],
    dim: {
      x: 20,
      y: 12
    }
  },
  {
    name: "Lullabai (65.isl)",
    noPadding: true,
    field: [
      ["wwwwwwwwwwwwwwll", ["l", "rc"], "lww"],
      ["wwwwwwwww", ["w", "rc"], "wwll", ["l", "rc"], ["l", "rc"], ["l", "tp"], "l", ["w", "ra"], "w"],
      ["wwwwwwwwwwww", ["l", "rc"], "lll", ["l", "bx"], "lww"],
      ["wwl", ["l", "ho"], "lww", ["w", "rc"], "wwwwllll", ["l", "rc"], ["l", "rc"], "ww"],
      ["wl", ["l", "rc"], "llw", ["w", "rc"], "wwwwll", ["l", "pl"], ["l", "rc"], "ll", ["l", "rc"], "ww"],
      ["wll", ["l", "rc"], "w", ["w", "bw"], ["w", "bw"], ["w", "bw"], ["w", "bw"], "w", ["w", "bw"], "llllll", ["l", "rc"], ["w", "rc"], "w"],
      ["wwwwwwwwww", ["w", "rc"], "wwlll", ["l", "rc"], "lll"],
      ["wwwwwwwwwwwwww", ["l", "rc"], "ll", ["l", "rc"], ["l", "rc"], "l"],
      ["wwwwwwwwww", ["w", "ra"], "llwlll", ["l", "bx"], "ll"],
      ["wwwwwwwwwwl", ["l", "rc"], ["l", "tp"], ["l", "rc"], ["l", "bx"], "ll", ["l", "rc"], ["l", "rc"], "l"],
      ["wwwwwwwwwwll", ["l", "rc"], "llll", ["l", "rc"], "lw"],
      ["wwww", ["w", "rc"], "wwwwwwwwwll", ["l", "rc"], "www"]
    ],
    dim: {
      x: 20,
      y: 12
    }
  },
  {
    name: "Philikiki (66.isl)",
    noPadding: true,
    field: [
      "wwwwwwwwwwwwwwwwwwww",
      ["wwwwwwww", ["l", "pa"], ["l", "ho"], ["l", "pa"], "wwwwwwwww"],
      "wwwwwwwwlllwwwwwwwww",
      "wwwwwwwwllwwwwwwwwww",
      ["wwwwwwwwll", ["w", "bw"], ["w", "bw"], ["w", "bw"], ["w", "bw"], ["w", "bw"], ["w", "bw"], ["w", "bw"], "www"],
      ["wlllll", ["l", "rc"], "lwwwwwwwwwwww"],
      ["wl", ["l", "pl"], "l", ["l", "bx"], "lllwwwwwww", ["l", "pa"], "llww"],
      ["wlll", ["l", "pa"], "lwwwwwwwwl", ["l", "tr"], "llww"],
      ["wll", ["l", "pa"], ["l", "rc"], "l", ["w", "bw"], ["w", "bw"], ["w", "bw"], ["w", "bw"], ["w", "bw"], ["w", "bw"], ["w", "bw"], ["w", "bw"], "lll", ["l", "rc"], "ww"],
      ["wll", ["l", "tr"], "l", ["l", "pa"], "wwwwwwwwwl", ["l", "pa"], "lww"],
      ["w", ["l", "pa"], ["l", "rc"], ["l", "rc"], ["l", "pa"], ["l", "rc"], "llwwwwwwwwwwww"],
      "wlllllllwwwwwwwwwwww"
    ],
    dim: {
      x: 20,
      y: 12
    }
  },
  {
    name: "Mauriorina (67.isl)",
    noPadding: true,
    field: [
      "wwwwwwwwwwwwwwwwwwww",
      ["wwwwwwwwwwwl", ["l", "pa"], "lllwwww"],
      ["ww", ["l", "pa"], "llwwwwwwll", ["l", "bx"], "llllww"],
      ["wwlll", ["l", "bm"], "www", ["w", "by"], "wwl", ["l", "bx"], ["l", "bx"], "l", ["l", "tr"], "lww"],
      ["wwlllll", ["w", "ra"], "wwwwlll", ["l", "pa"], "llww"],
      ["wwwl", ["l", "pl"], "lllwwwwwwwwwwww"],
      ["www", ["l", "pa"], ["l", "bt"], "l", ["l", "tr"], "lwwwwwwwwwwww"],
      ["wwwwl", ["l", "pa"], "llwwwww", ["l", "rc"], "lllwww"],
      ["wwwwwwwwwwwwl", ["l", "rc"], "l", ["l", "ho"], ["l", "pa"], "www"],
      ["wwwwwwwwwwwwll", ["l", "rc"], "llwww"],
      "wwwwwwwwwwwwwwwllwww",
      "wwwwwwwwwwwwwwwwwwww"
    ],
    dim: {
      x: 20,
      y: 12
    }
  },
  {
    name: "Maluka Tomil (68.isl)",
    noPadding: true,
    field: [
      ["wwww", ["w", "by"], "wwwwwwwwwwwwwww"],
      ["w", ["l", "rc"], "lllwwwwww", ["l", "rc"], ["l", "pa"], ["l", "rc"], "lllwww"],
      ["wl", ["l", "ci"], ["l", "tr"], "l", ["l", "ci"], ["l", "rc"], "www", ["l", "pa"], "llllllwww"],
      ["wllllllwww", ["l", "rc"], "l", ["l", "pl"], "llllwww"],
      ["wwwwwwwwwl", ["l", "pa"], "ll", ["l", "bx"], "l", ["l", "rc"], "l", ["w", "ra", "pi"], "ww"],
      ["wwwwwwwww", ["l", "rc"], "ll", ["l", "ci"], ["l", "rc"], ["l", "rc"], "ll", ["l", "ph"], "lw"],
      ["wwwwwwwwwll", ["l", "bx"], ["l", "rc"], ["l", "rc"], ["l", "ci"], ["l", "ci"], "llll"],
      ["wwwwwwwwwlll", ["l", "ci"], ["l", "tr"], ["l", "rc"], ["l", "bx"], "lll", ["l", "rc"]],
      ["wwwwwwwww", ["l", "pa"], "ll", ["l", "rc"], ["l", "bx"], ["l", "ci"], "ll", ["l", "rc"], "l", ["l", "pa"]],
      ["ww", ["l", "ho"], ["l", "pa"], "llwww", ["l", "pa"], "lll", ["l", "ci"], ["l", "rc"], "ll", ["l", "bx"], "l", ["l", "rc"]],
      ["wwlll", ["l", "pa"], "wwwl", ["l", "pa"], ["l", "pa"], "l", ["l", "rc"], "llllll"],
      ["ww", ["l", "rc"], "l", ["l", "pa"], "lwwwwwwwwwwwwww"]
    ],
    dim: {
      x: 20,
      y: 12
    }
  },
  {
    name: "Jakaruli Pipi (69.isl)",
    noPadding: true,
    field: [
      ["wwwwwwwwl", ["l", "ho"], ["l", "pa"], "wwwwwwwww"],
      ["wwwlll", ["l", "se"], "l", ["l", "pp"], "llwwwwwwwww"],
      ["wwwl", ["l", "tr"], "l", ["l", "pl"], "l", ["l", "pp"], "lwwwlll", ["l", "rc"], ["l", "pa"], ["l", "rc"], "w"],
      ["wwwwlllllwwwwl", ["l", "wh"], "lllll"],
      ["wwwwlwwwwwwwwlg", ["g", "pa"], ["g", "rc"], "gll"],
      ["wwwwlwwwwwwwwlgg", ["g", "pa"], "gll"],
      ["wlllllllwwwlll", ["l", "mc"], ["g", "rc"], "gll", ["w", "ra"]],
      ["wlllll", ["l", "sl"], "l", ["w", "by"], "wwl", ["l", "tr"], "llllllw"],
      ["wlll", ["g", "bc"], "gllww", ["w", "by"], "lll", ["l", "wb"], "l", ["l", "pb"], "llw"],
      ["lll", ["l", "sh"], "g", ["g", "bc"], "glwww", ["l", "rc"], "l", ["l", "cl"], "l", ["l", "cl"], "llww"],
      ["lll", ["l", "pa"], ["g", "bc"], "g", ["g", "bc"], "lllwl", ["l", "pa"], "llllwww"],
      ["l", ["l", "pa"], ["l", "rc"], "lllllllwwwwwwwwww"]
    ],
    dim: {
      x: 20,
      y: 12
    }
  },
  {
    name: "Bairiki (70.isl)",
    noPadding: true,
    field: [
      "wwwwwwwwwwwwwwwwwwww",
      "wwwwwwwwwwwwwwwwwwww",
      "wwwlllllllllllllllww",
      ["wwwlllllll", ["l", "rc"], "lll", ["l", "pa"], "ll", ["l", "rc"], "ww"],
      ["w", ["l", "pa"], ["l", "lf2"], ["l", "rc"], "lg", ["g", "pa"], "gll", ["l", "rc"], ["l", "rc"], "llll", ["l", "rc"], "lww"],
      ["wll", ["l", "rc"], "lg", ["g", "bx"], "ggll", ["l", "pb"], "lll", ["l", "rc"], ["l", "rc"], "www"],
      ["wll", ["l", "lf1"], "lgg", ["g", "pl"], ["g", "bx"], "gll", ["l", "rc"], ["l", "rc"], ["l", "co"], ["l", "rc"], "lwl", ["l", "mc"]],
      ["wwllllg", ["g", "pa"], "ggl", ["l", "rc"], ["l", "rc"], "lllllll"],
      ["wwwl", ["l", "sl"], "llllll", ["l", "rc"], "lllllw", ["l", "pa"], ["l", "ho"]],
      ["wwwlllllllwww", ["w", "bw", "bc"], "wwww", ["l", "bc"], ["l", "bc"]],
      ["wwwwwwwwwwwwwwwwww", ["w", "bw"], "w"],
      ["wwwwwwwwwwwww", ["w", "bw"], ["w", "bw"], ["w", "bw"], ["w", "bw"], ["w", "bw"], ["w", "bw"], "w"]
    ],
    dim: {
      x: 20,
      y: 12
    }
  },
  {
    name: "Gimmie Five (71.isl)",
    noPadding: true,
    field: [
      "wwwwwwwwwwwwwwwwwwww",
      "wwwwwwwwwwwwwwwwwwww",
      "wwwwwwwwwwwwwwwwwwww",
      ["wwwwwwl", ["l", "rc"], ["l", "pa"], ["l", "rc"], ["l", "pa"], "lwwwwwwww"],
      "wwwwwwlllllllwwwwwww",
      ["wwwwwll", ["l", "tb1"], "l", ["l", "tb2"], "llllwwwwww"],
      "wwwwwllllllllllwwwww",
      ["wwwwwll", ["l", "tb3"], "l", ["l", "tb4"], "l", ["l", "tb5"], "lllwwwww"],
      ["www", ["l", "pa"], ["l", "ho"], ["l", "pa"], "lllllllllwwwww"],
      ["wwwl", ["l", "pl"], "l", ["l", "pa"], "lll", ["l", "rc"], ["l", "pa"], "lllwwwww"],
      ["wwwlllll", ["l", "pa"], ["l", "rc"], "llllwwwwww"],
      "wwwwwwwwwwwwwwwwwwww"
    ],
    dim: {
      x: 20,
      y: 12
    }
  },
  {
    name: "Hanapepis (72.isl)",
    noPadding: true,
    field: [
      "wwwwwwwwwwwwwwwwwwww",
      "wwwwwwwwwwwwwwwwwwww",
      "wwlllllllwwwwwwwwwww",
      ["wwl", ["l", "tb3"], ["l", "tb2"], ["l", "tb1"], ["l", "tb4"], ["l", "tb5"], "lwwwwwwwwwww"],
      ["ww", ["l", "rc"], "lllll", ["l", "pa"], "wwwwwwwwwww"],
      ["wwl", ["l", "pa"], "llll", ["l", "rc"], "wwwww", ["l", "pa"], ["l", "ho"], ["l", "pa"], "www"],
      ["wwwl", ["l", "pa"], "ll", ["l", "pa"], "l", ["l", "pa"], "l", ["l", "rc"], ["l", "pa"], "l", ["l", "pa"], ["l", "pl"], ["l", "pa"], "www"],
      ["www", ["l", "rc"], ["l", "pa"], "ll", ["l", "pa"], ["l", "pa"], ["l", "pa"], ["l", "pa"], ["l", "pa"], ["l", "pa"], ["l", "pa"], ["l", "pa"], "l", ["l", "pa"], "lww"],
      ["wwwl", ["l", "pa"], "lllllllllll", ["l", "pa"], ["l", "pa"], "ww"],
      ["www", ["l", "pa"], ["l", "pa"], ["l", "pa"], ["l", "pa"], ["l", "pa"], ["l", "pa"], ["l", "pa"], ["l", "pa"], ["l", "pa"], ["l", "pa"], ["l", "pa"], ["l", "pa"], ["l", "pa"], ["l", "rc"], "lww"],
      "wwwwwwwwwwwwwwwwwwww",
      "wwwwwwwwwwwwwwwwwwww"
    ],
    dim: {
      x: 20,
      y: 12
    }
  },
  {
    name: "Otchikakaoo (73.isl)",
    noPadding: true,
    field: [
      ["wwwwwwwwwwwwwl", ["l", "ho"], ["l", "pa"], "wwww"],
      ["wwwwwwwwwwwww", ["l", "rc"], "ll", ["l", "pa"], ["l", "pa"], "ww"],
      ["wwwwwwwwwwwww", ["l", "rc"], "lll", ["l", "pa"], "lw"],
      ["wwlllwwwwwwww", ["l", "pa"], ["l", "pa"], ["l", "sk"], ["l", "pa"], ["l", "pa"], "l", ["w", "by"]],
      ["ww", ["l", "rc"], "lllwwwwwwwllllllw"],
      ["ww", ["l", "pa"], "l", ["l", "sb"], "lwwwwwwwll", ["l", "tb3"], "lllw"],
      ["wwllll", ["l", "rc"], "lwwwwll", ["l", "tb1"], "l", ["l", "tb5"], "lww"],
      ["ww", ["w", "ra"], "ll", ["l", "tr"], "llwwwwl", ["l", "tb4"], "lll", ["l", "tb2"], "ww"],
      ["wwwlll", ["l", "pl"], "lwwwwllllllww"],
      ["wwwwl", ["l", "rc"], ["l", "pa"], "lwwwwwll", ["l", "tr"], "llww"],
      "wwwwwwwwwwwwwwlllwww",
      "wwwwwwwwwwwwwwwwwwww"
    ],
    dim: {
      x: 20,
      y: 12
    }
  },
  {
    name: "Pounamo Kili (74.isl)",
    noPadding: true,
    field: [
      "wwwwwwwwwwwwwwwwwwww",
      ["wwwll", ["l", "pa"], "wwwwwwwwwwwwww"],
      "wwwlllwwwwwwwwwwwwww",
      ["www", ["l", "tb4"], "l", ["l", "sp"], "llwwwwwwwwwwww"],
      "wwwlgggllwwwwwwwwwww",
      ["wwwlg", ["g", "ho"], ["g", "pa"], "glwwwwwww", ["l", "pa"], "llw"],
      ["wwllg", ["g", "bc"], ["g", "pl"], ["g", "rc"], "ll", ["l", "wb"], "llll", ["l", "pa"], "l", ["l", "sb"], "lw"],
      ["ww", ["l", "pa"], "lgg", ["g", "bc"], "gllg", ["g", "bc"], ["g", "mc"], "glllllw"],
      ["wwllllgg", ["l", "sk"], ["l", "rc"], "gg", ["g", "bc"], "g", ["l", "sh"], ["l", "tb5"], "l", ["l", "tb3"], "ww"],
      ["wwlll", ["l", "tb1"], "llll", ["l", "rc"], "gggllllww"],
      ["wwwwwwwl", ["l", "wh"], "llll", ["l", "tb2"], "ll", ["l", "se"], "lww"],
      ["wwwwwwwwlll", ["l", "pa"], ["l", "rc"], ["l", "pa"], "lllwww"]
    ],
    dim: {
      x: 20,
      y: 12
    }
  },
  {
    name: "Kalapani (75.isl)",
    noPadding: true,
    field: [
      "wwwwwwwwwwwwwwwwwwww",
      "wwwwwwwwwwwwwwwwwwww",
      ["wwlll", ["l", "ci"], "wwwwwwwwlllwww"],
      ["ww", ["l", "pa"], ["l", "bt"], "l", ["l", "ch"], "lwwwwwwwl", ["l", "tb3"], "lwww"],
      ["w", ["l", "rc"], ["l", "ci"], "llllwwwwwwwl", ["l", "ky"], "llww"],
      ["w", ["l", "ho"], ["l", "pa"], "l", ["l", "tb1"], "llwwwwwwwl", ["l", "tb4"], "lllw"],
      ["wl", ["l", "rc"], "l", ["l", "rc"], ["l", "ci"], "lwwwwwwwl", ["l", "ky"], ["l", "bm"], ["l", "bx"], "lw"],
      ["wlll", ["l", "tb5"], ["l", "rc"], "lwwwwwww", ["l", "pa"], "ll", ["l", "tr"], "lw"],
      ["wl", ["l", "pl"], "l", ["l", "rc"], "ll", ["w", "ra", "pi"], "wwwwwwl", ["l", "pa"], "lllw"],
      ["wlll", ["l", "tb2"], "ll", ["l", "ph"], "wwwwwwwwwwww"],
      ["wwl", ["l", "ch"], "ll", ["l", "tr"], "lwwwwwwwwwwww"],
      ["wwlllll", ["l", "ci"], "wwwwwwwwwwww"]
    ],
    dim: {
      x: 20,
      y: 12
    }
  },
  {
    name: "Koldkikim (76.isl)",
    noPadding: true,
    field: [
      "wwwwwwwwwwwwwwwwwwww",
      "wwwwwwwwwwwwwwwwwwww",
      "wwwwwwwwwwwwwwwwwwww",
      "wwwwwwwwwwwwwwwwwwww",
      ["wwwwl", ["l", "rc"], "llwwwwwwwwwwww"],
      ["wwwl", ["l", "rc"], ["l", "ho"], ["l", "rc"], "lwwwwwwwwwwww"],
      ["wwwlllll", ["w", "ic"], ["w", "ic"], ["w", "ic"], "wll", ["l", "rc"], "lwwww"],
      ["wwwlllllww", ["w", "ic"], ["w", "ic"], "l", ["l", "pl"], "llwwww"],
      ["wwwwwl", ["l", "rc"], "lwwwwlllwwwww"],
      "wwwwwwwwwwwwwwwwwwww",
      "wwwwwwwwwwwwwwwwwwww",
      "wwwwwwwwwwwwwwwwwwww"
    ],
    dim: {
      x: 20,
      y: 12
    }
  },
  {
    name: "Tritri Kaminski (77.isl)",
    noPadding: true,
    field: [
      "wwwwwwwwwwwwwwwwwwww",
      "wwwwllllwwwwwlllllww",
      ["wwww", ["l", "rc"], ["l", "ho"], ["l", "rc"], "lwwwwl", ["l", "sp"], ["g", "rc"], ["g", "bc"], "gl", ["w", "ic"], "w"],
      ["wwwl", ["l", "rc"], "lll", ["w", "ic"], ["w", "ic"], "wwlg", ["g", "bc"], ["g", "rc"], "gw", ["w", "ic"], "w"],
      ["wwwlllllw", ["w", "ic"], ["w", "ic"], ["w", "ic"], "lg", ["g", "rc"], "ggllw"],
      ["wwwww", ["w", "ic"], ["w", "ic"], "wwwwwlgg", ["g", "st"], "gllw"],
      ["wwwww", ["w", "ic"], ["w", "ic"], ["w", "ic"], "ww", ["w", "ic"], ["w", "ic"], "lg", ["g", "rc"], ["g", "bc"], ["g", "rc"], "llw"],
      ["wwwww", ["w", "ic"], ["w", "ic"], ["w", "ic"], "w", ["w", "ic"], ["w", "ic"], "wlg", ["g", "bc"], ["g", "rc"], "gllw"],
      ["wwwww", ["l", "mc"], "ll", ["w", "ic"], ["w", "ic"], "wwllgggllw"],
      ["wwwwwl", ["l", "pl"], ["l", "rc"], "wwwwllllllww"],
      ["wwwww", ["l", "rc"], "llwwwwwwllllww"],
      "wwwwwwwwwwwwwwwwwwww"
    ],
    dim: {
      x: 20,
      y: 12
    }
  },
  {
    name: "Ektokilli (78.isl)",
    noPadding: true,
    field: [
      ["wwwwwwl", ["l", "st"], "wwwwwwwwwl", ["l", "rc"], "l"],
      ["wwwwwwllwwwww", ["w", "ic"], ["w", "ic"], ["w", "ic"], ["w", "ic"], "ll", ["l", "rc"]],
      ["www", ["l", "st"], ["l", "rc"], "l", ["w", "ic"], ["w", "ic"], ["w", "ic"], ["w", "ic"], ["w", "ic"], ["w", "ic"], "w", ["w", "ic"], ["w", "ic"], ["w", "ic"], ["w", "ic"], "l", ["l", "st"], "l"],
      ["wwwl", ["l", "st"], "l", ["w", "ic"], ["w", "ic"], ["w", "ic"], ["w", "ic"], ["w", "ic"], ["w", "ic"], ["w", "ic"], ["w", "ic"], ["w", "ic"], "wwwll"],
      ["www", ["l", "st"], "lw", ["w", "ic"], ["w", "ic"], "ww", ["w", "ic"], ["w", "ic"], ["w", "ic"], ["w", "ic"], ["w", "ic"], "wwwww"],
      ["wwwwww", ["w", "ic"], ["w", "ic"], "wwwwwwwlllww"],
      ["wwwwwllllwwwwww", ["l", "rc"], ["l", "ho"], ["l", "rc"], "lw"],
      ["wwwww", ["l", "st"], "gg", ["l", "st"], ["w", "ic"], ["w", "ic"], ["w", "ic"], ["w", "ic"], "wlll", ["l", "rc"], ["l", "st"], "w"],
      ["wwwwwl", ["g", "rc"], "gl", ["w", "ic"], ["w", "ic"], ["w", "ic"], ["w", "ic"], ["w", "ic"], "l", ["l", "pl"], ["l", "rc"], "llw"],
      ["wwwwwlgglww", ["w", "ic"], ["w", "ic"], ["w", "ic"], ["l", "st"], "ll", ["l", "st"], "lw"],
      ["wwwwwwll", ["l", "st"], "wwwwwwwwwww"],
      "wwwwwwwwwwwwwwwwwwww"
    ],
    dim: {
      x: 20,
      y: 12
    }
  },
  {
    name: "Semfirluku (79.isl)",
    noPadding: true,
    field: [
      ["wwwwwww", ["w", "ic"], "www", ["w", "ic"], ["w", "ic"], ["w", "ic"], ["w", "ic"], ["w", "ic"], "w", ["w", "ic"], ["w", "ic"], "w"],
      ["wwwwww", ["w", "ic"], ["w", "ic"], ["w", "ic"], ["w", "ic"], ["w", "ic"], "w", ["w", "ic"], ["w", "ic"], ["w", "bw"], "w", ["w", "ic"], ["w", "ic"], "ww"],
      ["wwwww", ["w", "ic"], "w", ["w", "ic"], ["w", "ic"], "w", ["w", "ic"], ["w", "ic"], "w", ["w", "ic"], ["w", "ic"], "w", ["w", "ic"], ["w", "bw"], ["w", "ic"], "w"],
      ["wwwww", ["w", "ic"], "w", ["w", "ic"], ["w", "bw"], ["w", "ic"], "wwwwwww", ["w", "ic"], ["w", "ic"], "w"],
      ["wwww", ["w", "ic"], ["w", "ic"], ["w", "ic"], "w", ["w", "ic"], ["w", "ic"], "wl", ["l", "ho"], "lww", ["w", "bw"], ["w", "ic"], ["w", "ic"], "w"],
      ["wwww", ["w", "ic"], ["w", "ic"], ["w", "ic"], ["w", "ic"], "www", ["l", "rc"], "llww", ["w", "ic"], ["w", "ic"], ["w", "ic"], "w"],
      ["wwwwww", ["w", "bw"], ["w", "ic"], "wwwwwww", ["w", "ic"], ["w", "ic"], ["w", "bw"], ["w", "ic"], "w"],
      ["www", ["w", "ic"], ["w", "ic"], ["w", "ra"], ["w", "ic"], ["w", "ic"], ["w", "ic"], ["w", "ic"], ["w", "ic"], "wwww", ["w", "ic"], ["w", "ic"], ["w", "ic"], "ww"],
      ["wlll", ["w", "ic"], "w", ["w", "ic"], ["w", "bw"], "w", ["w", "ic"], ["w", "ic"], "w", ["w", "ic"], ["w", "ic"], ["w", "ic"], ["w", "ic"], "ww", ["w", "ic"], "w"],
      ["wl", ["l", "pl"], ["l", "rc"], "lww", ["w", "ic"], ["w", "ic"], "w", ["w", "ic"], "w", ["w", "ic"], "ww", ["w", "ic"], ["w", "ic"], "w", ["w", "ic"], "w"],
      ["wl", ["l", "rc"], "llwwww", ["w", "ic"], ["w", "bw"], ["w", "ic"], ["w", "ic"], "ww", ["w", "bw"], ["w", "ic"], "w", ["w", "ic"], "w"],
      "wwwwwwwwwwwwwwwwwwww"
    ],
    dim: {
      x: 20,
      y: 12
    }
  },
  {
    name: "Maimai Awoha (80.isl)",
    noPadding: true,
    field: [
      ["wwwwwwww", ["w", "ic"], ["w", "ic", "bc"], ["w", "ic"], "wwwwwwwww"],
      ["wwwwwwww", ["w", "ic"], "w", ["w", "ic", "bc"], "w", ["w", "ic", "bc"], ["w", "ic", "bc"], "wwwwww"],
      ["www", ["w", "ic"], ["w", "ic", "bc"], ["w", "ic"], ["w", "ic", "bc"], ["w", "ic"], ["w", "ic", "bc"], "w", ["w", "ic", "bc"], ["w", "ic"], ["w", "ic"], ["w", "ic"], "wwwwww"],
      ["www", ["w", "ic", "bc"], ["w", "ic", "bc"], ["w", "ic", "bc"], ["w", "ic"], ["w", "ic", "bc"], ["w", "ic"], "ww", ["w", "ic", "bc"], ["w", "ic", "bc"], ["w", "ic", "bc"], "wwwwww"],
      ["www", ["w", "ic"], ["w", "ic"], ["w", "ic", "bc"], "wwllwww", ["w", "ic"], ["w", "ic", "bc"], "wwwww"],
      ["wwww", ["w", "ic", "bc"], ["w", "ic"], "wl", ["l", "rc"], ["l", "ho"], "lwww", ["w", "ic"], ["w", "ic", "bc"], "wwww"],
      ["w", ["w", "ic"], ["w", "ic"], ["w", "ic"], ["w", "ic"], ["w", "ic", "bc"], "wl", ["l", "mc"], "l", ["l", "rc"], "ww", ["w", "ic"], ["w", "ic", "bc"], ["w", "ic", "bc"], "wwww"],
      ["w", ["w", "ic"], "w", ["w", "ic", "bc"], ["w", "ic"], ["w", "ic"], "wll", ["l", "pl"], "ll", ["w", "ic"], ["w", "ic", "bc"], ["w", "ic"], ["w", "ic"], "wwww"],
      ["w", ["w", "ic"], "ww", ["w", "ic", "bc"], ["w", "ic"], "wlllllwwwwwwww"],
      ["w", ["w", "ic"], ["w", "ic", "bc"], ["w", "ic"], ["w", "ic", "bc"], ["w", "ic", "bc"], ["w", "ic"], "ww", ["w", "ic"], "wwwwwwwwww"],
      ["wwwww", ["w", "ic"], ["w", "ic", "bc"], ["w", "ic"], ["w", "ic", "bc"], ["w", "ic", "bc"], "wwwwwwwwww"],
      ["wwwwww", ["w", "ic"], ["w", "ic", "bc"], ["w", "ic", "bc"], ["w", "ic"], "wwwwwwwwww"]
    ],
    dim: {
      x: 20,
      y: 12
    }
  },
  {
    name: "Papaikuka (81.isl)",
    noPadding: true,
    field: [
      ["wwwwwwwwl", ["l", "rc"], ["l", "rc"], "l", ["l", "rc"], "llllwww"],
      ["wwwwwwww", ["l", "rc"], ["l", "ho"], "l", ["l", "pp"], ["l", "rc"], "l", ["l", "pp"], "llwww"],
      ["w", ["w", "ic"], ["w", "ic", "pr"], ["w", "ic"], ["w", "ic"], ["w", "ic", "pr"], ["w", "ic"], "wlll", ["l", "rc"], ["l", "rc"], "ll", ["l", "pl"], "lwww"],
      ["w", ["w", "ic"], ["w", "ic"], ["w", "ic"], "w", ["w", "ic"], ["w", "ic"], "wwwwwwwlllwww"],
      ["ww", ["w", "ic"], ["w", "ic"], ["w", "ic"], ["w", "ic"], ["w", "ic"], ["w", "ic"], ["w", "ic"], "w", ["w", "ic"], ["w", "ic"], ["w", "ic"], "wl", ["l", "pp"], "lwww"],
      ["ww", ["w", "ic"], "w", ["w", "ic"], "w", ["w", "ic"], ["w", "ic"], ["w", "ic"], ["w", "ic"], ["w", "ic"], "w", ["w", "ic"], ["w", "ic"], "l", ["l", "bt"], "lwww"],
      ["w", ["w", "ic"], ["w", "ic"], ["w", "ic"], ["w", "ic", "pr"], ["w", "ic"], "w", ["w", "ic"], ["w", "ic"], "w", ["w", "ic"], ["w", "ic", "bm"], ["w", "ic"], ["w", "ic"], "lllwww"],
      ["w", ["w", "ic", "pr"], "w", ["w", "ic"], ["w", "ic"], ["w", "ic"], ["w", "ic"], ["w", "ic", "pr"], ["w", "ic"], ["w", "ic"], ["w", "ic"], ["w", "ic"], ["w", "ic"], ["w", "ic"], "l", ["l", "pp"], "lwww"],
      ["w", ["w", "ic"], ["w", "ic"], ["w", "ic"], ["w", "ic"], ["w", "ic"], ["w", "ic"], "w", ["w", "ic"], "wwwwwlllwww"],
      ["w", ["w", "ic"], ["w", "ic"], ["w", "ic", "pr"], ["w", "ic"], ["w", "ic"], ["w", "ic"], ["w", "ic"], ["w", "ic"], "wlllllllwww"],
      ["wwwww", ["w", "ic"], ["w", "ic"], ["w", "ic"], ["w", "ic"], ["w", "ic"], "l", ["l", "pp"], "ll", ["l", "pp"], ["l", "rc"], "lwww"],
      ["wwwwwwwwwwllll", ["l", "rc"], "llwww"]
    ],
    dim: {
      x: 20,
      y: 12
    }
  },
  {
    name: "Jonski Noni (82.isl)",
    noPadding: true,
    field: [
      "wwwwwwwwwwwwwwwwwwww",
      ["wwlll", ["w", "ic"], ["w", "ic"], ["w", "ic"], ["w", "ic"], ["w", "ic"], ["w", "ic"], ["w", "ic"], "w", ["w", "ic"], ["w", "ic"], ["w", "ic"], ["w", "ic"], ["w", "ic"], ["w", "ic"], "w"],
      ["ww", ["l", "rc"], ["l", "ho"], ["w", "ic"], ["w", "ic"], "w", ["w", "ic"], ["w", "ic"], ["w", "ic"], ["w", "ic"], ["w", "ic"], ["w", "ic"], ["w", "ic"], ["w", "ic"], ["w", "ic"], ["w", "ic"], ["w", "ic"], ["w", "ic"], "w"],
      ["wwll", ["w", "ic"], "ww", ["l", "wb"], ["l", "pa"], "l", ["w", "ic"], ["w", "ic"], ["w", "ic"], ["w", "ic"], ["w", "ic"], ["l", "pa"], "l", ["w", "ic"], ["w", "ic"], "w"],
      ["wwl", ["l", "rc"], ["w", "ic"], "wl", ["l", "wh"], "l", ["l", "pa"], ["w", "ic"], ["w", "ic"], ["w", "ic"], ["w", "ic"], ["l", "pa"], ["l", "ho"], ["l", "pa"], ["w", "ic"], ["w", "ic"], "w"],
      ["wwww", ["w", "ic"], "wllll", ["l", "pa"], ["l", "pa"], ["l", "pa"], ["l", "pa"], "l", ["l", "sk"], ["l", "pa"], ["w", "ic"], ["w", "ic"], "w"],
      ["wwww", ["w", "ic"], ["w", "ic"], ["l", "bx"], "llll", ["l", "sh"], "g", ["g", "se"], "gl", ["l", "pa"], ["w", "ic"], ["w", "ic"], "w"],
      ["wwwwwwllllllg", ["g", "pl"], "g", ["l", "pa"], "l", ["w", "ic"], ["w", "ic"], "w"],
      ["wwwwww", ["w", "ic"], "l", ["l", "pa"], "l", ["l", "sb"], "l", ["l", "pa"], ["l", "pa"], ["l", "pa"], ["w", "ic"], ["w", "ic"], ["w", "ic"], ["w", "ic"], "w"],
      ["wwwwww", ["w", "ic"], ["w", "ic"], "l", ["l", "pa"], ["l", "pa"], ["l", "pa"], ["w", "ic"], ["w", "ic"], ["w", "ic"], ["w", "ic"], ["w", "ic"], ["w", "ic"], ["w", "ic"], "w"],
      ["wwwwww", ["w", "ic"], ["w", "ic"], ["w", "ic"], ["w", "ic"], ["w", "ic"], ["w", "ic"], ["w", "ic"], ["w", "ic"], ["w", "ic"], ["w", "ic"], ["w", "ic"], "www"],
      ["wwwwww", ["w", "ic"], ["w", "ic"], ["w", "ic"], ["w", "ic"], ["w", "ic"], ["w", "ic"], ["w", "ic"], ["w", "ic"], "wwwwww"]
    ],
    dim: {
      x: 20,
      y: 12
    }
  },
  {
    name: "Honoluli (83.isl)",
    noPadding: true,
    field: [
      "wwwwwwwwwwwwwwwwwwww",
      "wwwwlllllwwwwwwwwwww",
      ["wwww", ["l", "pa"], ["l", "pa"], ["l", "pa"], ["l", "fgr"], ["l", "bt"], "lwwwwwwwwww"],
      ["wwll", ["l", "pa"], ["l", "mc"], ["l", "pa"], "lllwwwwwwwwww"],
      ["wwl", ["l", "wh"], ["l", "pa"], ["l", "se"], ["l", "pa"], "l", ["l", "bx"], "lwwwwwwwwww"],
      ["wwll", ["l", "pa"], ["l", "rc"], ["l", "pa"], "ll", ["l", "pa"], "wwwllllllw"],
      ["wwl", ["l", "pl"], ["l", "pa"], ["l", "crr"], ["l", "pa"], "ll", ["l", "rc"], "wwwl", ["g", "pa"], ["g", "ho"], ["g", "pa"], "glw"],
      ["wwlll", ["l", "bx"], "ll", ["l", "bx"], ["l", "pa"], "wwwlg", ["g", "bc"], ["g", "bc"], "glw"],
      ["wwwwl", ["l", "wb"], "llwwll", ["l", "bx"], ["l", "rc"], ["l", "sh"], "ggllw"],
      ["wwwwlllww", ["l", "pa"], "l", ["l", "bm"], "llllllww"],
      "wwwwwwwwwllllllwwwww",
      "wwwwwwwwwwwwwwwwwwww"
    ],
    dim: {
      x: 20,
      y: 12
    }
  },
  {
    name: "Nabouwalu Buali (84.isl)",
    noPadding: true,
    field: [
      "wwwwwwwwwwwwwwwwwwww",
      ["ww", ["l", "pa"], ["l", "ho"], ["l", "pa"], "lwwwwwwwwwwwwww"],
      ["ww", ["l", "pa"], "llllwwwwwwwwwwwww"],
      ["wwll", ["l", "pl"], ["l", "tp"], "ll", ["l", "pa"], ["l", "pa"], "llwwwwwwww"],
      ["wwwwll", ["l", "bt"], ["g", "bc"], "g", ["g", "bc"], ["l", "se"], ["l", "bc"], "lwwwwwww"],
      ["wwwwlg", ["g", "bc"], "g", ["g", "rc"], ["g", "pa"], ["g", "bc"], ["l", "rc"], ["l", "rc"], ["l", "rc"], "lwwwww"],
      ["wwwwlg", ["g", "rc"], "ggggl", ["l", "tp"], ["l", "pa"], ["l", "mc"], "wwwww"],
      ["wwwl", ["l", "bc"], ["l", "sh"], "gg", ["l", "bc"], ["l", "wb"], ["l", "bc"], "llllwwwww"],
      ["wwwl", ["l", "wh"], ["l", "bc"], "l", ["l", "sk"], "lllllllwwwww"],
      ["wwwllll", ["l", "rc"], "wwwll", ["l", "bm"], "llllww"],
      ["wwwwwwwwwwwlllll", ["l", "sb"], "llw"],
      "wwwwwwwwwwwwwwwllllw"
    ],
    dim: {
      x: 20,
      y: 12
    }
  },
  {
    name: "Kahului (85.isl)",
    noPadding: true,
    field: [
      "wwwwwwwwwwwwwwwwwwww",
      "wwwwwwwwwwwwwwwwwwww",
      "wwwwlllllllllllwwwww",
      ["www", ["l", "rc"], "llllll", ["w", "ic"], ["w", "ic"], ["w", "ic"], ["w", "ic"], "lwwwww"],
      ["www", ["l", "ho"], ["l", "rc"], ["w", "ic"], ["w", "ic"], ["w", "ic"], ["w", "ic"], ["w", "ic"], ["w", "ic"], ["w", "ic", "st"], ["w", "ic", "st"], ["w", "ic"], "lwwwww"],
      ["wwwll", ["w", "ic"], ["w", "ic"], ["w", "ic", "st"], ["w", "ic"], ["w", "ic"], ["w", "ic"], ["w", "ic"], ["w", "ic"], ["w", "ic"], "lwwwww"],
      ["wwwl", ["l", "pl"], ["w", "ic"], ["w", "ic"], ["w", "ic"], ["w", "ic"], ["w", "ic", "st"], ["w", "ic"], ["w", "ic"], "lllwwwww"],
      ["wwwll", ["w", "ic"], ["w", "ic", "st"], ["w", "ic"], ["w", "ic"], ["w", "ic", "st"], ["w", "ic"], ["w", "ic"], "llwwwwww"],
      ["wwwlll", ["w", "ic"], ["w", "ic"], ["w", "ic"], ["w", "ic"], ["w", "ic"], "llwwwwwww"],
      ["wwwwwllll", ["w", "ic"], ["w", "ic"], "lwwwwwwww"],
      "wwwwwwwlllllwwwwwwww",
      "wwwwwwwwwwwwwwwwwwww"
    ],
    dim: {
      x: 20,
      y: 12
    }
  },
  {
    name: "Altawistiki (86.isl)",
    noPadding: true,
    field: [
      "wwwwwwwwwwwwwwwwwwww",
      ["wwwwwwwwwwwwwww", ["l", "pa"], ["l", "ho"], ["l", "pa"], "ww"],
      "wwwwwwwwwwwwwwwlllww",
      ["wwwwwwwwwwwwww", ["w", "hp"], "llwww"],
      ["wwwwwwwwwwwwww", ["w", "hp"], "wwwww"],
      ["wwwwwwwwwwwwww", ["w", "hp"], "wwwww"],
      ["wwwlllllwwwwww", ["w", "hp"], ["w", "hp"], ["w", "hp"], "www"],
      ["wwlg", ["g", "pa"], "gll", ["w", "hp"], ["w", "hp"], ["w", "hp"], ["w", "hp"], "wwww", ["w", "hp"], "www"],
      ["wlg", ["g", "rc"], ["g", "pl"], "gllwww", ["w", "hp"], ["w", "hp"], ["w", "hp"], ["w", "hp"], ["w", "hp"], ["w", "hp"], "www"],
      ["wlg", ["g", "pa"], "gl", ["l", "re"], "lwwwwwwwwwwww"],
      "wllllllwwwwwwwwwwwww",
      "wwwwwwwwwwwwwwwwwwww"
    ],
    dim: {
      x: 20,
      y: 12
    }
  },
  {
    name: "Odissuku (87.isl)",
    noPadding: true,
    field: [
      "wwwwwwwwwwwwwwwwwwww",
      ["wwwwwwwwwwwww", ["l", "pa"], ["l", "ho"], ["l", "pa"], "lllw"],
      ["wwwwwwwwwwwwwll", ["l", "sk"], ["l", "re"], ["l", "bx"], "lw"],
      ["wwwwwwwwwwwwwwl", ["l", "pa"], ["l", "pl"], "l", ["w", "hp"], "w"],
      ["wwwww", ["w", "hp"], ["w", "hp"], ["w", "hp"], "wwwwwwwwww", ["w", "hp"], ["w", "hp"]],
      ["wwwww", ["w", "hp"], ["w", "hp"], ["w", "hp"], ["w", "hp"], ["w", "hp"], ["w", "hp"], ["w", "hp"], ["w", "hp"], ["w", "hp"], ["w", "hp"], ["w", "hp"], ["w", "hp"], ["w", "hp"], ["w", "hp"], ["w", "hp"]],
      ["wlllwww", ["w", "hp"], "wwwwwwwwwwww"],
      ["wl", ["l", "pa"], ["l", "pa"], "llw", ["w", "hp"], "wwwwwwwwwwww"],
      ["w", ["l", "pa"], "l", ["l", "sb"], "llw", ["w", "hp"], "wwwwwwwwwwww"],
      ["wl", ["l", "pa"], "llllllwwwwwwwwwww"],
      ["wll", ["l", "pa"], "lllllwwwwwwwwwww"],
      ["wlll", ["l", "pa"], ["l", "pa"], "lllwwwwwwwwwww"]
    ],
    dim: {
      x: 20,
      y: 12
    }
  },
  {
    name: "Orkualia (88.isl)",
    noPadding: true,
    field: [
      ["wwwwwwwwwwwwwwwwwwl", ["l", "ho"]],
      ["w", ["w", "hp", "ci"], "w", ["w", "hp"], ["w", "hp"], ["w", "hp", "ci"], "www", ["w", "hp"], ["w", "hp"], ["w", "hp", "ci"], "ww", ["w", "hp", "ci"], "wwwll"],
      ["w", ["w", "hp"], ["w", "hp"], ["w", "hp"], "w", ["w", "hp"], ["w", "hp"], ["w", "hp", "ci"], "w", ["w", "hp"], "w", ["w", "hp"], "w", ["w", "hp"], ["w", "hp"], ["w", "hp"], ["w", "hp", "ci"], "www"],
      ["wwwww", ["w", "by"], ["w", "hp", "ci"], "ww", ["w", "hp"], "w", ["w", "hp"], "w", ["w", "hp"], "ww", ["w", "hp"], ["w", "hp"], ["w", "hp"], ["w", "hp", "ci"]],
      ["wwwwww", ["w", "hp"], ["w", "hp"], "w", ["w", "hp"], "w", ["w", "hp"], ["w", "hp"], ["w", "hp"], ["w", "hp", "ci"], "www", ["w", "hp"], "w"],
      ["wwwllww", ["w", "hp", "ci"], ["w", "hp"], ["w", "hp"], ["w", "hp", "ci"], "w", ["w", "hp", "ci"], "ww", ["w", "hp", "ci"], ["w", "hp"], ["w", "hp"], ["w", "hp"], "w"],
      ["wwlll", ["w", "ra", "pi"], "wwwwwww", ["w", "hp", "ci"], ["w", "hp"], ["w", "hp"], "www", ["w", "hp", "ci"]],
      ["ww", ["l", "pa"], "l", ["l", "bx"], ["l", "ph"], "ll", ["w", "hp"], ["w", "hp"], ["w", "hp"], "wwww", ["w", "hp"], ["w", "hp"], ["w", "hp", "ci"], "w", ["w", "hp"]],
      ["ww", ["l", "pa"], "llllllw", ["w", "hp", "ci"], ["w", "hp"], ["w", "hp"], "wwww", ["w", "hp"], "w", ["w", "hp"]],
      ["wwl", ["l", "pa"], "l", ["l", "pl"], "l", ["l", "re"], "lwww", ["w", "hp"], "ww", ["w", "hp", "ci"], ["w", "hp"], ["w", "hp"], ["w", "hp"], ["w", "hp"]],
      ["wwwl", ["l", "rc"], "lll", ["l", "pa"], ["w", "hp", "ci"], "w", ["w", "hp", "ci"], ["w", "hp"], ["w", "hp", "ci"], "w", ["w", "hp"], "ww", ["w", "hp"], "w"],
      ["wwwwwwwww", ["w", "hp"], ["w", "hp"], ["w", "hp"], "w", ["w", "hp"], ["w", "hp"], ["w", "hp"], "ww", ["w", "hp"], ["w", "hp", "ci"]]
    ],
    dim: {
      x: 20,
      y: 12
    }
  },
  {
    name: "Lostia Lua (89.isl)",
    noPadding: true,
    field: [
      ["wwwwwwwwwwwwwwwwwwl", ["l", "ho"]],
      ["w", ["w", "hp", "ci"], "w", ["w", "hp"], ["w", "hp"], ["w", "hp", "ci"], "www", ["w", "hp"], ["w", "hp"], ["w", "hp", "ci"], "ww", ["w", "hp", "ci"], "wwwll"],
      ["w", ["w", "hp"], ["w", "hp"], ["w", "hp"], "w", ["w", "hp"], ["w", "hp"], ["w", "hp", "ci"], "w", ["w", "hp"], "w", ["w", "hp"], "w", ["w", "hp"], ["w", "hp"], ["w", "hp"], ["w", "hp", "ci"], "www"],
      ["wwwww", ["w", "by"], ["w", "hp", "ci"], "ww", ["w", "hp"], "w", ["w", "hp"], "w", ["w", "hp"], "ww", ["w", "hp"], ["w", "hp"], ["w", "hp"], ["w", "hp", "ci"]],
      ["wwwwww", ["w", "hp"], ["w", "hp"], "w", ["w", "hp"], "w", ["w", "hp"], ["w", "hp"], ["w", "hp"], ["w", "hp", "ci"], "www", ["w", "hp"], "w"],
      ["wwwllww", ["w", "hp", "ci"], ["w", "hp"], ["w", "hp"], ["w", "hp", "ci"], "w", ["w", "hp", "ci"], "ww", ["w", "hp", "ci"], ["w", "hp"], ["w", "hp"], ["w", "hp"], "w"],
      ["wwlll", ["w", "ra", "pi"], "wwwwwww", ["w", "hp", "ci"], ["w", "hp"], ["w", "hp"], "www", ["w", "hp", "ci"]],
      ["ww", ["l", "pa"], "ll", ["l", "ph"], "ll", ["w", "hp"], ["w", "hp"], ["w", "hp"], "wwww", ["w", "hp"], ["w", "hp"], ["w", "hp", "ci"], "w", ["w", "hp"]],
      ["ww", ["l", "pa"], "llllllw", ["w", "hp", "ci"], ["w", "hp"], ["w", "hp"], "wwww", ["w", "hp"], "w", ["w", "hp"]],
      ["wwl", ["l", "pa"], "l", ["l", "pl"], "l", ["l", "re"], "lwww", ["w", "hp"], "ww", ["w", "hp", "ci"], ["w", "hp"], ["w", "hp"], ["w", "hp"], ["w", "hp"]],
      ["wwwl", ["l", "rc"], "lll", ["l", "pa"], ["w", "hp", "ci"], "w", ["w", "hp", "ci"], ["w", "hp"], ["w", "hp", "ci"], "w", ["w", "hp"], "ww", ["w", "hp"], "w"],
      ["wwwwwwwww", ["w", "hp"], ["w", "hp"], ["w", "hp"], "w", ["w", "hp"], ["w", "hp"], ["w", "hp"], "ww", ["w", "hp"], ["w", "hp", "ci"]]
    ],
    dim: {
      x: 20,
      y: 12
    }
  },
  {
    name: "Sudonki (90.isl)",
    noPadding: true,
    field: [
      ["wwwwwwwwwwwwwwwwww", ["w", "hp"], "w"],
      [["w", "hp"], "wwwwwwwwwwwwwwwwwww"],
      ["wwwwwwwwwwwwww", ["w", "hp"], "wwwww"],
      ["wl", ["l", "ci"], "ww", ["w", "hp"], "wwwwwwwwwww", ["w", "hp"], "ww"],
      ["l", ["l", "re"], "l", ["w", "ra", "pi"], "wwwww", ["w", "hp"], "wwwwwwwwww"],
      [["l", "pa"], ["l", "bx"], "l", ["l", "ph"], "wwwwwwwwwwwwwwll"],
      [["l", "rc"], ["l", "ci"], ["l", "pl"], "lwwwwwww", ["w", "hp"], "wwwwww", ["l", "pa"], ["l", "ho"]],
      ["l", ["l", "pa"], "l", ["l", "ci"], "wwwwwwwwwww", ["w", "hp"], "wwll"],
      ["wwwwwwww", ["w", "hp"], "wwwwwwwwwww"],
      ["www", ["w", "hp"], "wwwwwwwwwwwwwwww"],
      ["wwwwww", ["w", "hp"], "wwwwwwwwwwwww"],
      ["wwwwwwwwwwww", ["w", "hp"], "wwwww", ["w", "hp"], "w"]
    ],
    dim: {
      x: 20,
      y: 12
    }
  },
  {
    name: "Sand Rii Niha (91.isl)",
    noPadding: true,
    field: [
      "wwwwwwwwwwwwwwwwwwww",
      "wwwwwllllllllllwwwww",
      ["ww", ["l", "pa"], ["l", "ho"], "lll", ["l", "bc"], ["l", "st"], ["l", "st"], ["l", "st"], ["l", "bc"], ["l", "st"], "lllwwww"],
      ["ww", ["l", "pa"], "llll", ["l", "st"], ["l", "st"], ["l", "bc"], ["l", "st"], ["l", "st"], ["l", "st"], "ll", ["l", "pa"], "lwww"],
      ["wwll", ["l", "pl"], "ll", ["l", "bc"], ["l", "st"], "lllll", ["l", "pa"], ["l", "mc"], ["l", "pa"], "www"],
      ["wwwllll", ["l", "st"], ["l", "st"], ["l", "bc"], ["l", "st"], ["l", "bc"], ["l", "st"], "llllwww"],
      ["wwwllll", ["l", "bc"], ["l", "st"], ["l", "st"], ["l", "st"], ["l", "st"], ["l", "st"], "llllwww"],
      ["wwwwlllllll", ["l", "bc"], ["l", "st"], "llllwww"],
      ["wwwwlll", ["l", "bc"], ["l", "st"], ["l", "st"], ["l", "st"], ["l", "bc"], ["l", "st"], "llllwww"],
      ["wwwwlll", ["l", "st"], ["l", "st"], ["l", "bc"], ["l", "st"], ["l", "st"], ["l", "st"], "llllwww"],
      "wwwwllllllllllllwwww",
      "wwwwwwwwwwwwwwwwwwww"
    ],
    dim: {
      x: 20,
      y: 12
    }
  },
  {
    name: "Minowa Bowa (92.isl)",
    noPadding: true,
    field: [
      [["w", "ic"], ["w", "ic"], ["w", "ic"], ["w", "ic"], ["w", "ic"], "wwwwwwwwwwwwwww"],
      [["w", "hp"], "www", ["w", "ic"], "wwwwwwwwwwwwwww"],
      [["w", "hp"], ["w", "hp"], ["w", "hp"], "w", ["w", "ic"], "llllllllllllwww"],
      [["w", "hp"], "w", ["w", "hp", "pb"], "wlllllll", ["l", "pl"], "llllllww"],
      [["w", "hp"], "wwwlll", ["l", "pa"], "llllllllllww"],
      [["w", "hp"], "wlllllllg", ["g", "rc"], "g", ["g", "rc"], "g", ["l", "pa"], "lllww"],
      [["w", "hp"], "wll", ["l", "re"], "llllgg", ["g", "rc"], ["g", "pa"], "gl", ["l", "pa"], ["l", "co"], ["l", "pa"], "ww"],
      [["w", "hp"], "wlllll", ["l", "sl"], "lg", ["g", "pa"], ["g", "rc"], "g", ["l", "pa"], ["l", "ho"], "lllww"],
      [["w", "hp"], "wwl", ["l", "rc"], "ll", ["l", "bm"], "llggglllllww"],
      [["w", "hp"], "wwwww", ["w", "ic"], "w", ["l", "rc"], ["l", "rc"], ["l", "rc"], ["l", "rc"], ["l", "rc"], ["l", "rc"], ["l", "rc"], "llwww"],
      [["w", "hp"], ["w", "hp"], ["w", "hp", "bx"], ["w", "hp"], "ww", ["w", "ic"], "wlll", ["l", "rc"], "l", ["l", "bt"], ["l", "pb"], "wwwww"],
      ["w", ["w", "hp"], ["w", "hp"], ["w", "hp"], "ww", ["w", "ic"], ["w", "ic"], "l", ["l", "rc"], "lll", ["l", "rc"], "lwwwww"]
    ],
    dim: {
      x: 20,
      y: 12
    }
  },
  {
    name: "Zamandi Salmanki (93.isl)",
    noPadding: true,
    field: [
      ["wwwwwwwwwwwwwww", ["l", "pa"], ["l", "ho"], "lww"],
      ["wwl", ["l", "pa"], ["l", "rc"], "lwwwwwwwwwll", ["l", "co"], ["l", "pb"], "w"],
      ["wl", ["l", "rc"], "lllww", ["w", "hp"], ["w", "hp"], "wwwwwl", ["l", "pa"], "llw"],
      ["wl", ["l", "pb"], "lll", ["w", "hp"], ["w", "hp"], ["w", "hp"], ["w", "hp"], "wwwwwww", ["w", "hp"], "ww"],
      ["wlllllwww", ["w", "hp"], "wwwwwww", ["w", "hp"], "ww"],
      ["wll", ["l", "pa"], "llwww", ["w", "hp"], "wwwwwww", ["w", "hp"], "ww"],
      ["wlllllwww", ["w", "hp"], "wwwwwww", ["w", "hp"], "ww"],
      ["wll", ["l", "bx"], "l", ["l", "rc"], "www", ["w", "hp"], "wwwwwwwlll"],
      ["w", ["l", "rc"], "lll", ["l", "pa"], "ww", ["w", "hp"], ["w", "hp"], "wwwwwwll", ["l", "re"], ["l", "pa"]],
      ["w", ["l", "rc"], "lllwww", ["w", "hp"], ["w", "hp"], ["w", "hp"], ["w", "hp"], ["w", "hp"], ["w", "hp"], ["w", "hp"], ["w", "hp"], "l", ["l", "pl"], "l", ["l", "rc"]],
      ["wwl", ["l", "sl"], "lwwwwwwwwwwwll", ["l", "pa"], "l"],
      "wwlllwwwwwwwwwwwwwww"
    ],
    dim: {
      x: 20,
      y: 12
    }
  },
  {
    name: "Odimirki (94.isl)",
    noPadding: true,
    field: [
      "wwwwwwwwwwwwwwwwwwww",
      ["wwwwwwwwl", ["l", "rc"], ["l", "ho"], ["l", "pa"], "wwwwwwww"],
      ["wwwwwwwwlll", ["l", "rc"], "wwwwwwww"],
      "wwwwwwwwwlllwwwwwwww",
      ["wwwwwwwwww", ["w", "hp"], "wwwwllllw"],
      ["wwlllwwwww", ["w", "hp"], "wwwlll", ["l", "rc"], "lw"],
      ["wwllllwwww", ["w", "hp"], "wwwll", ["l", "crg"], ["l", "crg"], "lw"],
      ["wwl", ["l", "fgg"], ["l", "fgg"], "ll", ["w", "hp"], ["w", "hp"], ["w", "hp"], ["w", "hp"], ["w", "hp"], ["w", "hp"], ["w", "hp"], "lllllw"],
      ["wwll", ["l", "rc"], "llwwwwwwwl", ["l", "pl"], "ll", ["l", "rc"], "w"],
      ["wwlllll", ["w", "hp"], ["w", "hp"], ["w", "hp"], ["w", "hp"], ["w", "hp"], ["w", "hp"], ["w", "hp"], "l", ["l", "rc"], "l", ["l", "re"], "lw"],
      "wwlllllwwwwwwwwllllw",
      "wwwwwwwwwwwwwwwwwwww"
    ],
    dim: {
      x: 20,
      y: 12
    }
  },
  {
    name: "Akua Asuliki (95.isl)",
    noPadding: true,
    field: [
      [["w", "ic"], ["w", "ic"], ["w", "ic"], ["w", "ic"], ["w", "ic"], ["w", "ic"], ["w", "ic"], ["w", "ic"], ["w", "ic"], ["w", "ic"], ["w", "ic"], ["w", "ic"], ["w", "ic"], ["w", "ic"], ["w", "ic"], ["w", "ic"], ["w", "ic"], ["w", "ic"], ["w", "ic"], ["w", "ic"]],
      [["w", "ic"], ["w", "ic"], ["w", "ic"], ["w", "ic"], "ll", ["w", "ic"], ["w", "ic"], ["w", "ic"], ["w", "ic"], ["w", "ic"], ["w", "ic"], ["w", "ic"], ["w", "ic"], ["w", "ic"], ["w", "ic"], ["w", "ic"], ["w", "ic"], ["w", "ic"], ["w", "ic"]],
      [["w", "ic"], ["w", "ic"], ["w", "ic"], "ll", ["l", "crr"], "l", ["w", "ic"], ["w", "ic"], ["w", "ic"], ["w", "ic"], ["w", "ic"], ["w", "ic"], ["w", "ic"], ["w", "ic"], "lll", ["w", "ic"], ["w", "ic"]],
      [["w", "ic"], ["w", "ic"], ["w", "ic"], "llll", ["w", "ic"], ["w", "ic"], ["w", "ic"], ["w", "ic"], ["w", "ic"], ["w", "ic"], ["w", "ic"], ["w", "ic"], ["l", "fgr"], ["l", "fgg"], ["l", "fgb"], ["w", "ic"], ["w", "ic"]],
      [["w", "ic"], ["w", "ic"], ["w", "ic"], ["w", "ic"], ["w", "ic"], ["w", "ic"], ["w", "ic"], ["w", "ic"], ["w", "ic"], ["w", "ic"], ["w", "ic"], ["w", "ic"], ["w", "ic"], ["w", "ic"], ["w", "ic"], "lll", ["w", "ic"], ["w", "ic"]],
      [["w", "ic"], ["w", "ic"], ["w", "ic"], ["w", "ic"], ["w", "ic"], ["w", "ic"], ["w", "ic"], ["w", "ic"], ["w", "ic"], ["w", "ic"], ["w", "ic"], ["w", "ic"], ["w", "ic"], ["w", "ic"], ["w", "ic"], ["w", "ic"], ["w", "ic"], ["w", "ic"], ["w", "ic"], ["w", "ic"]],
      [["w", "ic"], ["w", "ic"], ["w", "ic"], ["w", "ic"], ["w", "ic"], ["w", "ic"], ["w", "ic"], ["w", "ic"], ["w", "ic"], ["w", "ic"], ["w", "ic"], ["w", "ic"], ["w", "ic"], ["w", "ic"], ["w", "ic"], ["w", "ic"], ["w", "ic"], ["w", "ic"], ["w", "ic"], ["w", "ic"]],
      [["w", "ic"], ["w", "ic"], ["w", "ic"], ["w", "ic"], ["w", "ic"], ["w", "ic"], ["w", "ic"], ["w", "ic"], ["w", "ic"], ["w", "ic"], ["w", "ic"], ["w", "ic"], ["w", "ic"], ["w", "ic"], ["w", "ic"], ["w", "ic"], ["w", "ic"], ["w", "ic"], ["w", "ic"], ["w", "ic"]],
      [["w", "ic"], ["w", "ic"], ["w", "ic"], "l", ["l", "ho"], "lll", ["w", "ic"], ["w", "ic"], ["w", "ic"], ["w", "ic"], ["w", "ic"], ["w", "ic"], ["w", "ic"], ["w", "ic"], ["w", "ic"], ["w", "ic"], ["w", "ic"], ["w", "ic"]],
      [["w", "ic"], ["w", "ic"], ["w", "ic"], ["l", "rc"], "l", ["l", "crb"], "l", ["l", "pl"], "l", ["w", "ic"], ["w", "ic"], ["w", "ic"], ["w", "ic"], ["w", "ic"], ["w", "ic"], ["w", "ic"], "lll", ["w", "ic"]],
      [["w", "ic"], ["w", "ic"], ["w", "ic"], "llllll", ["w", "ic"], ["w", "ic"], ["w", "ic"], ["w", "ic"], ["w", "ic"], ["w", "ic"], "ll", ["l", "crg"], "l", ["w", "ic"]],
      [["w", "ic"], ["w", "ic"], ["w", "ic"], ["w", "ic"], ["w", "ic"], ["w", "ic"], ["w", "ic"], ["w", "ic"], ["w", "ic"], ["w", "ic"], ["w", "ic"], ["w", "ic"], ["w", "ic"], ["w", "ic"], ["w", "ic"], "llll", ["w", "ic"]]
    ],
    dim: {
      x: 20,
      y: 12
    }
  },
  {
    name: "Kukinut (96.isl)",
    noPadding: true,
    field: [
      "wwwwwwwwwwwwwwwwwwww",
      ["wwwwwl", ["l", "pa"], ["l", "pa"], ["l", "pa"], "lwwwwwwwwww"],
      ["wwwwl", ["l", "pa"], "llllwwwwwwwwww"],
      ["wwww", ["l", "pa"], "lll", ["l", "ct"], "llwwwwwwwww"],
      ["wwwwll", ["l", "pl"], "l", ["l", "cp"], "llwwwwwwwww"],
      ["wwwl", ["l", "pa"], "lll", ["l", "cp"], "llwwwwwwwww"],
      ["www", ["l", "pa"], "ll", ["l", "cp"], ["l", "cp"], ["l", "cp"], "llwww", ["l", "pa"], ["l", "ho"], "wwww"],
      ["www", ["l", "pa"], "ll", ["l", "cp"], "llllwwlllwwww"],
      ["wwwlll", ["l", "cp", "cc"], ["l", "cp"], "l", ["l", "pa"], "wwwll", ["l", "pa"], "wwww"],
      ["wwwwwllll", ["l", "co"], "llllwwwwww"],
      ["wwwwwlll", ["l", "pa"], ["l", "pa"], "wwwwwwwwww"],
      "wwwwwwwwwwwwwwwwwwww"
    ],
    dim: {
      x: 20,
      y: 12
    }
  },
  {
    name: "Dunas Koko (97.isl)",
    noPadding: true,
    field: [
      "wwwwwwwwwwwwwwwwwwww",
      ["wwwwwwwwl", ["l", "pa"], ["l", "pa"], ["l", "pa"], "l", ["l", "pa"], ["l", "pa"], "llwww"],
      ["wwwwwww", ["l", "pa"], "lllllll", ["l", "pa"], ["l", "pa"], "www"],
      ["wwwwwwwl", ["l", "pa"], "l", ["l", "cp"], ["l", "cp", "cc"], ["l", "cp"], ["l", "ct"], ["l", "cp"], "llwww"],
      ["wwwwwwww", ["l", "pa"], "lll", ["l", "cp"], "l", ["l", "cp"], "lllww"],
      ["wwwwwwwwlll", ["l", "ct"], ["l", "cp"], ["l", "cp"], ["l", "cp"], "l", ["l", "pa"], "lww"],
      ["wwwwwwwww", ["l", "pa"], "ll", ["l", "cp"], "llllllw"],
      ["wl", ["l", "pa"], ["l", "ho"], ["l", "pa"], "wwwwl", ["l", "pa"], "l", ["l", "cp"], ["l", "cp"], ["l", "cp", "cc"], ["l", "cp"], "l", ["l", "pa"], "lw"],
      ["wllllwwwwwl", ["l", "pl"], "llll", ["l", "pa"], "llw"],
      ["wlll", ["l", "pa"], "lwwwwlll", ["l", "pa"], ["l", "pa"], "llllw"],
      ["ww", ["l", "rc"], "l", ["l", "co"], ["l", "co"], "lllll", ["l", "pa"], "wwwwwwww"],
      ["www", ["l", "pa"], ["l", "rc"], "lwwwwwwwwwwwwww"]
    ],
    dim: {
      x: 20,
      y: 12
    }
  },
  {
    name: "Koko Jumbo (98.isl)",
    noPadding: true,
    field: [
      ["wwwwl", ["l", "pa"], ["l", "pa"], "lwwwwwwwwwwww"],
      ["wl", ["l", "pa"], ["l", "pa"], ["l", "pa"], "ll", ["l", "pa"], "wwwwwwwwwwww"],
      ["wllllll", ["l", "pa"], "wwwwwwl", ["l", "ho"], ["l", "pa"], "www"],
      [["l", "pa"], "l", ["l", "cp"], ["l", "cp"], ["l", "cp", "cc"], ["l", "cp"], ["l", "cp"], "l", ["l", "pa"], "wwwww", ["l", "rc"], "llwww"],
      [["l", "pa"], "l", ["l", "ct"], "lll", ["l", "cp"], "l", ["l", "pa"], "wwwwwllwwww"],
      [["l", "pa"], "l", ["l", "cp"], "lll", ["l", "ct"], "l", ["l", "pa"], "lwwwwwlwwww"],
      [["l", "pa"], "l", ["l", "cp"], ["l", "cp"], ["l", "cp", "cc"], ["l", "cp"], ["l", "cp"], "ll", ["l", "pa"], "wwwwwlwwww"],
      [["l", "pa"], "l", ["l", "cp"], "l", ["l", "cp"], "llll", ["l", "pa"], ["l", "pa"], "lwwwlwwww"],
      [["l", "pa"], "l", ["l", "cp"], ["l", "cp"], ["l", "cp"], "ll", ["l", "pl"], "l", ["l", "co"], ["l", "co"], ["l", "co"], "llllwwww"],
      [["l", "pa"], "lll", ["l", "cp", "cc"], ["l", "cp"], ["l", "ct"], "l", ["l", "pa"], ["l", "pa"], "llwwwwwwww"],
      ["w", ["l", "pa"], "llllll", ["l", "pa"], "llwwwwwwwww"],
      ["wl", ["l", "pa"], ["l", "pa"], ["l", "pa"], ["l", "pa"], ["l", "pa"], ["l", "pa"], "lwwwwwwwwwww"]
    ],
    dim: {
      x: 20,
      y: 12
    }
  },
  {
    name: "Dilipa Dali (99.isl)",
    noPadding: true,
    field: [
      ["wwwwwwwwwwwll", ["l", "pb"], ["l", "rc"], ["l", "pa"], ["l", "rc"], ["l", "pa"], ["l", "rc"], "l"],
      ["www", ["l", "pa"], ["l", "ho"], ["l", "rc"], "lwwwwl", ["l", "crb"], "l", ["l", "sk"], "ll", ["l", "fgb"], "ll"],
      ["ww", ["l", "rc"], "lll", ["l", "pa"], "wwwwwl", ["l", "rc"], ["l", "pa"], ["l", "sb"], "llll"],
      ["l", ["l", "pa"], ["l", "rc"], ["l", "pa"], ["l", "co"], ["l", "rc"], ["l", "pa"], ["l", "pa"], "l", ["l", "pa"], "wwwwwlll", ["l", "pa"], "l"],
      [["l", "pa"], "llllllll", ["l", "rc"], "wwwwwlllll"],
      [["l", "pa"], "l", ["l", "cp"], ["l", "cp"], ["l", "ct"], ["l", "cp"], ["l", "cp"], ["l", "cp"], ["l", "cp"], ["l", "cp"], ["w", "hp"], ["w", "hp"], ["w", "hp"], ["w", "hp"], ["w", "hp"], ["w", "hp"], "lll", ["l", "rc"]],
      [["l", "rc"], "l", ["l", "cp"], "l", ["l", "cp"], "llllll", ["l", "pa"], "wwwwwll", ["l", "pa"]],
      [["l", "pa"], "l", ["l", "cp"], ["l", "cp"], ["l", "cp", "cc"], ["l", "cp"], ["l", "cp"], "l", ["l", "pl"], "ll", ["l", "rc"], "wwwwwlll"],
      [["l", "rc"], "lll", ["l", "cp"], "l", ["l", "cp"], "ll", ["l", "rc"], ["l", "pa"], "lwwwwwl", ["l", "sl"], "l"],
      [["l", "pa"], "l", ["l", "re"], "l", ["l", "ct"], ["l", "cp"], ["l", "cp"], "ll", ["l", "co"], "l", ["l", "st"], "wwwwwllw"],
      ["l", ["l", "rc"], "llllll", ["l", "pa"], "l", ["l", "st"], "lwwwwwllw"],
      ["ll", ["l", "pa"], "llll", ["l", "pa"], ["l", "rc"], "llwwwwwwwww"]
    ],
    dim: {
      x: 20,
      y: 12
    }
  },
  {
    name: "Alsolonka (100.isl)",
    noPadding: true,
    field: [
      "wwwwwwwwwwwwwwwwwwww",
      ["wwwllw", ["w", "hp"], ["w", "ra", "pi"], "ww", ["l", "pa"], ["l", "rc"], "ll", ["l", "ch"], "lwwww"],
      ["wwl", ["l", "re"], ["l", "pp"], "l", ["l", "pp"], ["l", "ph"], "llll", ["l", "co"], "ll", ["l", "ky"], "wwww"],
      ["w", ["l", "pa"], ["l", "rc"], ["l", "pa"], ["l", "rc"], ["l", "co"], ["l", "pa"], "lllll", ["l", "pa"], "lwwwwww"],
      ["w", ["l", "rc"], "lllll", ["l", "cp"], ["l", "cp"], ["l", "cp", "cc"], "lllwwwwww", ["w", "hp"]],
      [["w", "hp"], "lll", ["l", "ct"], ["l", "cp"], ["l", "cp"], ["l", "cp"], "l", ["l", "cp"], "lllwwwwwww"],
      ["wll", ["l", "cp"], ["l", "cp"], "l", ["l", "cp"], "ll", ["l", "ct"], "lllwwwwwww"],
      ["wll", ["l", "cp", "cc"], "ll", ["l", "cp"], ["l", "cp"], ["l", "cp"], ["l", "cp"], ["l", "cp", "cc"], "llwwwwwww"],
      ["wll", ["l", "cp"], ["l", "cp"], "l", ["l", "cp"], ["l", "cp"], ["l", "cp"], ["l", "cp"], "lllww", ["w", "hp"], "www", ["w", "hp"]],
      ["wlll", ["l", "cp"], ["l", "ct"], ["l", "cp"], "llllllw", ["w", "hp"], "ww", ["l", "pa"], ["l", "ho"], "w"],
      ["wwlllll", ["l", "pl"], ["l", "co"], ["l", "rc"], ["l", "rc"], ["l", "rc"], "w", ["w", "hp"], "www", ["l", "rc"], "ll"],
      ["wwwwlll", ["l", "rc"], "l", ["l", "pr"], "l", ["l", "pr"], "wwwwwlll"]
    ],
    dim: {
      x: 20,
      y: 12
    }
  },
  {
    name: "Porto Sobrukiki (101.isl)",
    noPadding: true,
    field: [
      "wllwwwwwwwwwwwwwwwww",
      ["w", ["l", "pa"], ["l", "ho"], "llwwwwwwwwwwwwwww"],
      ["wllllwwww", ["w", "ic", "st"], "wwwwwwwwww"],
      ["wl", ["l", "rc"], "llw", ["w", "ic", "st"], "wwwwwwwwwwww", ["w", "ic", "st"]],
      ["wwlllwwwwww", ["w", "ic", "st"], "wwwwwwww"],
      [["w", "ic", "st"], "wwwwwwwwwwwwwwwwwww"],
      ["wwwww", ["w", "ic", "st"], "wwwwwwwwwwww", ["w", "ic", "st"], "w"],
      ["wwwwwwww", ["w", "ic", "st"], "wwwwwwwwwww"],
      "wwwwwwwwwwwwwwwwwwww",
      ["wwwwwwwwwwww", ["w", "ic", "st"], "wwwww", ["w", "ic"], ["w", "ra", "pi"]],
      ["wwwwwwwwwwwwwww", ["l", "ci"], ["l", "bx"], ["l", "ci"], ["l", "pa"], ["l", "ph"]],
      ["wwwww", ["w", "ic", "st"], "wwwwwww", ["w", "ic", "st"], "wll", ["l", "pl"], "l", ["l", "ci"]]
    ],
    dim: {
      x: 20,
      y: 12
    }
  },
  {
    name: "Laguna Isala (102.isl)",
    noPadding: true,
    field: [
      "wwwwwwwwwwwwwwwwwwww",
      ["wwwwwwwwwwwwwllllll", ["w", "ra", "pi"]],
      ["wwllllw", ["w", "hp"], ["w", "hp"], "wwwwl", ["l", "tr"], "l", ["g", "pa"], "gl", ["l", "ph"]],
      ["wwl", ["l", "tr"], "l", ["l", "re"], "l", ["w", "hp"], ["w", "hp"], ["w", "ic"], ["w", "ic"], "wwll", ["l", "pl"], "g", ["g", "rc"], ["g", "pa"], "l"],
      ["wwlllllw", ["w", "hp"], "w", ["w", "ic"], ["w", "ic", "ci"], ["w", "ic"], "l", ["l", "bx"], "lg", ["g", "pa"], "gl"],
      ["wwwwwwww", ["w", "hp"], "w", ["w", "ic", "ci"], ["w", "ic"], ["w", "ic", "ci"], ["w", "ic"], "lll", ["l", "pa"], "ll"],
      ["ww", ["w", "by"], "wwwww", ["w", "hp"], "wwwww", ["l", "pa"], ["l", "sk"], ["l", "pa"], "l", ["l", "pa"], "l"],
      ["wwwwwwww", ["w", "hp"], "wwwww", ["l", "pa"], "l", ["l", "pa"], ["l", "pa"], "lw"],
      ["www", ["w", "ic"], ["w", "ic"], "www", ["w", "hp"], "wwwwwlll", ["l", "ho"], ["l", "pa"], "w"],
      ["wwwll", ["w", "hp"], ["w", "hp"], "w", ["w", "hp"], ["w", "hp"], "wwww", ["l", "pa"], ["l", "pa"], "lllw"],
      ["w", ["w", "ic"], "wl", ["l", "sb"], "lw", ["w", "ic"], ["w", "hp"], ["w", "hp"], "ww", ["w", "ic"], "w", ["w", "ic"], "w", ["w", "ic"], "w", ["w", "ic"], "w"],
      [["w", "ic"], "w", ["w", "ic"], "lll", ["w", "ic"], ["w", "ic"], ["w", "hp"], ["w", "hp"], "w", ["w", "ic"], "w", ["w", "ic"], "w", ["w", "ic"], "w", ["w", "ic"], "w", ["w", "ic"]]
    ],
    dim: {
      x: 20,
      y: 12
    }
  },
  {
    name: "Papaika (103.isl)",
    noPadding: true,
    field: [
      ["wwww", ["w", "rc"], "w", ["w", "rc"], "w", ["w", "rc"], "w", ["w", "rc"], ["w", "rc"], "w", ["w", "rc"], "wwwwww"],
      ["wwww", ["w", "rc"], ["w", "rc"], "w", ["w", "rc"], "l", ["l", "rc"], ["l", "ho"], "l", ["w", "rc"], "w", ["w", "rc"], "wwwww"],
      ["wwwww", ["w", "rc"], ["w", "rc"], "l", ["l", "rc"], "l", ["l", "sk"], ["l", "rc"], "w", ["w", "rc"], ["w", "rc"], ["w", "rc"], "wwww"],
      ["wwww", ["w", "rc"], ["w", "rc"], "wll", ["l", "tb1"], "ll", ["w", "rc"], "w", ["w", "rc"], ["w", "rc"], "wwww"],
      ["wwwww", ["w", "rc"], "wll", ["l", "tb3"], "ll", ["w", "rc"], "w", ["w", "rc"], "wwwww"],
      ["wwww", ["w", "rc"], "w", ["w", "rc"], "l", ["l", "pl"], ["l", "tb4"], "ll", ["w", "rc"], ["w", "rc"], "wwwwww"],
      ["www", ["w", "rc"], ["w", "rc"], ["w", "rc"], ["w", "rc"], "ll", ["l", "tb2"], "llw", ["w", "rc"], "wwwwww"],
      ["wwwww", ["w", "rc"], "w", ["w", "rc"], "l", ["l", "tb5"], "ll", ["w", "rc"], ["w", "rc"], ["w", "rc"], "wwwww"],
      ["wwwwww", ["w", "rc"], ["w", "rc"], ["w", "rc"], "l", ["w", "rc"], ["w", "rc"], "w", ["w", "rc"], "w", ["w", "rc"], "wwww"],
      ["wwww", ["w", "rc"], ["w", "rc"], "w", ["w", "rc"], "wllw", ["w", "rc"], "w", ["w", "rc"], "wwwww"],
      ["wwwww", ["w", "rc"], ["w", "rc"], ["w", "rc"], "l", ["l", "sb"], "ll", ["w", "rc"], ["w", "rc"], ["w", "rc"], "wwwww"],
      ["wwwwww", ["w", "rc"], "wll", ["l", "rc"], "l", ["w", "rc"], "wwwwwww"]
    ],
    dim: {
      x: 20,
      y: 12
    }
  },
  {
    name: "Krisanani (104.isl)",
    noPadding: true,
    field: [
      "wwwwwwwwwwwwwwwwwwww",
      ["wwwwwwwwww", ["w", "hp"], ["w", "hp"], ["w", "hp"], ["w", "hp"], "wwwwww"],
      ["wwwwwww", ["w", "hp"], ["w", "hp"], ["w", "hp"], ["w", "hp"], ["w", "hp"], "w", ["w", "hp"], "wwwwww"],
      ["w", ["w", "bw"], ["w", "bw"], "www", ["w", "hp"], ["w", "hp"], ["w", "hp"], "w", ["w", "hp"], ["w", "hp", "cc"], ["w", "hp"], ["w", "hp"], "wwwwww"],
      ["w", ["w", "bw"], ["w", "bw"], ["w", "bw"], ["w", "bw"], ["w", "bw"], ["w", "hp"], ["w", "hp"], ["w", "hp"], ["w", "hp"], ["w", "hp"], ["w", "hp"], "w", ["w", "hp"], "wwwwww"],
      ["w", ["w", "bw"], "wwww", ["w", "hp"], ["w", "hp"], "ww", ["w", "hp"], ["w", "hp"], ["w", "hp"], ["w", "hp"], ["w", "hp"], "wwwww"],
      ["w", ["w", "bw"], "wwwww", ["w", "hp"], ["w", "hp"], ["w", "hp"], ["w", "hp"], ["w", "hp"], "ww", ["w", "hp"], "wwwww"],
      ["wllwwwwww", ["w", "hp", "cc"], ["w", "hp"], ["w", "hp"], ["w", "hp"], ["w", "hp"], ["w", "hp"], "wwwww"],
      [["l", "pa"], "ll", ["l", "rc"], "wwwww", ["w", "hp"], ["w", "hp"], ["w", "hp"], ["w", "hp"], ["w", "hp"], ["w", "hp"], "wwwll"],
      [["l", "pa"], ["l", "co"], ["l", "rc"], "lwwwww", ["w", "hp"], ["w", "hp"], ["w", "hp", "cc"], ["w", "hp"], "w", ["w", "hp"], ["w", "hp"], "wl", ["l", "re"], ["l", "pl"]],
      ["ll", ["l", "ho"], "lwwwwww", ["w", "hp"], ["w", "hp"], ["w", "hp"], "ww", ["w", "hp"], ["w", "hp"], "l", ["l", "st"], "l"],
      "llllwwwwwwwwwwwwwllw"
    ],
    dim: {
      x: 20,
      y: 12
    }
  },
  {
    name: "Korazonii (105.isl)",
    noPadding: true,
    field: [
      ["wwwwwwlllww", ["l", "pa"], ["l", "ho"], ["l", "rc"], "wwwwww"],
      ["wwwwwlllll", ["l", "rc"], "llllwwwww"],
      "wwwwllggglllllllwwww",
      "wwwllggggggggggllwww",
      ["wwwllggggg", ["g", "pl"], "ggggllwww"],
      ["wwwllg", ["g", "fsy"], "ggggg", ["g", "fly"], "ggllwww"],
      "wwwwlgggggggggglwwww",
      ["wwwwwlgggg", ["g", "fsy"], "ggglwwwww"],
      "wwwwwwlgggggglwwwwww",
      "wwwwwwwlgggglwwwwwww",
      "wwwwwwwwllllwwwwwwww",
      "wwwwwwwwwllwwwwwwwww"
    ],
    dim: {
      x: 20,
      y: 12
    }
  },
  {
    name: "Florida Amki (106.isl)",
    noPadding: true,
    field: [
      ["wwwwwwwwww", ["l", "pa"], ["l", "pa"], ["l", "ho"], ["l", "pa"], "wwwwww"],
      "wwwlllllllllllllwwww",
      "wwlggggggggggglllwww",
      ["wwlggggg", ["g", "pl"], "ggggggllwww"],
      ["wwlggg", ["g", "fsy"], "ggg", ["g", "fly"], "ggggglwww"],
      "wwlggggggggggggglwww",
      "wwlgggggggggggggllww",
      ["wwlggggg", ["g", "fsy"], "gg", ["g", "fsy"], "ggggllww"],
      "wwllggggggggggggllww",
      ["wwwl", ["l", "sp"], "ggggggglllll", ["l", "pa"], "ww"],
      ["www", ["l", "pa"], "lllllllllwwwwwww"],
      "wwwwwwwwwwwwwwwwwwww"
    ],
    dim: {
      x: 20,
      y: 12
    }
  },
  {
    name: "Flordonga (107.isl)",
    noPadding: true,
    field: [
      "wwwwwwwwwwwwwwwwwwww",
      "wwwwwwwwwllllllllwww",
      ["wwwwww", ["l", "pa"], ["l", "ho"], ["l", "pa"], "llgggggllww"],
      "wwwwwlllllggggggglww",
      ["wwwwllggggg", ["g", "fsy"], "ggggglww"],
      ["wwwwlgggg", ["g", "fly"], "gggg", ["g", "pl"], "gglww"],
      ["wwwwlggggggg", ["g", "fsy"], "gggglww"],
      ["wwwwlgg", ["g", "fsy"], "g", ["g", "bx"], "ggggggglww"],
      ["wwwwlggggggggg", ["g", "fsy"], "gglww"],
      "wwwwwlggggggggglllww",
      "wwwwwwllllllllllllww",
      "wwwwwwwwwwwwwwwwwwww"
    ],
    dim: {
      x: 20,
      y: 12
    }
  },
  {
    name: "Wiweka Kogo (108.isl)",
    noPadding: true,
    field: [
      "wwwwwwwwwwwwwwwwwwww",
      "wwwwwwwwwwwwwwwwwwww",
      ["www", ["l", "pa"], ["l", "ho"], ["l", "pa"], ["l", "rc"], "llwwww", ["l", "pa"], "ll", ["l", "pa"], ["l", "pa"], "ww"],
      ["wwwlllllllwwwl", ["l", "wh"], "l", ["l", "se"], "llw"],
      ["wwl", ["l", "sb"], "lgggg", ["l", "sh"], "l", ["l", "wb"], "lllllllw"],
      ["wwllggg", ["g", "fsy"], ["g", "rc"], "gggggggglww"],
      ["wwll", ["g", "bx"], "ggg", ["g", "fsy"], ["g", "rc"], "ggggggglww"],
      ["wwl", ["l", "sk"], "gggg", ["g", "fly"], "gg", ["g", "fsy"], ["g", "rc"], "gggglww"],
      ["wwwllgggg", ["g", "pl"], "ggggglllww"],
      ["wwwllg", ["g", "rc"], "gg", ["g", "fsy"], "g", ["g", "fsy"], "ggllwwww"],
      "wwwllggggggggglwwwww",
      "wwwwlllllllllllwwwww"
    ],
    dim: {
      x: 20,
      y: 12
    }
  },
  {
    name: "Shariraika (109.isl)",
    noPadding: true,
    field: [
      "wwwwwwwwwwwwwwwwwwww",
      "wwwwwwwwwwwwwwwwwwww",
      ["wwwwwwwwwwww", ["l", "pa"], ["l", "pa"], ["l", "pa"], "lwwww"],
      ["wwwwwwwwwwl", ["l", "pa"], "ggg", ["l", "pa"], ["l", "pa"], "www"],
      ["wwwwwwwww", ["l", "pa"], "ggg", ["g", "fsy"], "ggg", ["l", "pa"], "lw"],
      ["wwwwwwwww", ["l", "pa"], "gggg", ["g", "pl"], "ggg", ["l", "pa"], "w"],
      ["wwww", ["l", "ho"], ["l", "rc"], "lllgg", ["g", "tb4"], "g", ["g", "fly"], "g", ["g", "fsy", "tb3"], "gg", ["l", "pa"], "w"],
      ["wwwwlll", ["l", "tb5"], "lgg", ["g", "tb2"], "gggggglw"],
      ["wwwwwllllgggg", ["g", "fsy", "tb1"], "gg", ["l", "pa"], ["l", "pa"], "ww"],
      ["wwwwwwwww", ["l", "pa"], "ggggg", ["l", "pa"], "wwww"],
      ["wwwwwwwwwl", ["l", "pa"], ["l", "pa"], ["l", "pa"], "l", ["l", "pa"], "lwwww"],
      "wwwwwwwwwwwwwwwwwwww"
    ],
    dim: {
      x: 20,
      y: 12
    }
  },
  {
    name: "Amarelki Finka (110.isl)",
    noPadding: true,
    field: [
      "wwwwwwwwwwwwwwwwwwww",
      "wwwwwwwwwwwwwwwwwwww",
      ["wwwwwlllllllll", ["l", "pa"], ["l", "ho"], ["l", "pa"], "www"],
      ["wwwwlll", ["l", "sp"], "gggggglllwww"],
      "wwwwllgggggggggglwww",
      ["wwwwlgg", ["g", "fly"], "ggggg", ["g", "fsy"], "gglwww"],
      "wwwwlggggggggggglwww",
      ["wwwwlgg", ["g", "fsr"], "ggggg", ["g", "flr"], "ggllww"],
      ["wwwwlggggggggggl", ["l", "pl"], "lww"],
      "wwwwllllllllllllllww",
      "wwwwwwwwwwwwwwwwwwww",
      "wwwwwwwwwwwwwwwwwwww"
    ],
    dim: {
      x: 20,
      y: 12
    }
  },
  {
    name: "Redwa Flori (111.isl)",
    noPadding: true,
    field: [
      "wwwwwwwwwwwwwwwwwwww",
      "wwwwwwwwwwwwwwwwwwww",
      "wwwlllllllllllllwwww",
      "wwwllggggggggglllwww",
      ["wwwlgg", ["g", "flr"], "gggggg", ["g", "fsr"], "gglwww"],
      "wwwlgggggggggggglwww",
      ["wwllgg", ["g", "pl"], "g", ["g", "fsy"], "gggggggllww"],
      ["wwllggggg", ["g", "fsr"], "ggggggl", ["l", "ho"], ["l", "pa"], "w"],
      ["wwllgg", ["g", "fsy"], "gggggg", ["g", "fly"], "ggll", ["l", "rc"], "w"],
      "wwllgggggggggggglllw",
      "wwwlllllllllllllllww",
      "wwwwwwwwwwwwwwwwwwww"
    ],
    dim: {
      x: 20,
      y: 12
    }
  },
  {
    name: "Dumka Tonga (112.isl)",
    noPadding: true,
    field: [
      "wwwwwwwwwwwwwwwwwwww",
      ["wwwlll", ["l", "rc"], "wwwwwwl", ["l", "rc"], "wwwww"],
      ["wwwl", ["l", "rc"], ["l", "rc"], "lll", ["l", "rc"], "lllllllwww"],
      ["wwlggggggg", ["l", "rc"], "gggggl", ["l", "rc"], ["l", "ho"], "w"],
      ["wwlggggggg", ["l", "rc"], "g", ["g", "fsr"], "ggggllw"],
      ["ww", ["l", "rc"], "ggg", ["g", "fsr"], "ggggggggggllw"],
      ["wwl", ["l", "rc"], "ggggggg", ["g", "pl"], "gggggllw"],
      ["wwwlggggggggg", ["g", "fsy"], "g", ["g", "fsr"], "gllw"],
      ["www", ["l", "rc"], "gg", ["g", "fly"], "ggg", ["l", "rc"], "gggg", ["g", "flr"], "gllw"],
      "wwwwlggggglggggggllw",
      ["wwwwwlllllll", ["l", "rc"], "lllll", ["l", "rc"], "w"],
      ["wwwwwwwwwwlll", ["l", "rc"], "llwwww"]
    ],
    dim: {
      x: 20,
      y: 12
    }
  },
  {
    name: "Samisaraico (113.isl)",
    noPadding: true,
    field: [
      "wwwwlllllllllllllwww",
      ["ww", ["l", "pa"], "llgggggglggggllww"],
      ["ww", ["l", "ho"], ["l", "pa"], "ggg", ["g", "fsr"], "ggg", ["l", "pa"], "g", ["g", "fsy"], "g", ["g", "fsy"], "glll"],
      ["wwllggggggg", ["l", "rc"], "gg", ["g", "rc"], "g", ["g", "fly"], "ggl"],
      ["wwllgg", ["g", "fsr"], "g", ["g", "flr"], "gggggg", ["g", "rc"], "gggl"],
      ["wwllg", ["g", "fsy"], "g", ["g", "wb"], "g", ["g", "fsy"], "gg", ["g", "rc"], "ggggggl"],
      ["wwllggggggg", ["l", "sh"], "gggg", ["g", "fsr"], "ggl"],
      ["wwwlg", ["g", "se"], "ggggglgggggggl"],
      ["wwwlgg", ["g", "fly"], "g", ["g", "pl"], "gllgg", ["g", "flr"], "g", ["g", "fsr"], "ggl"],
      "wwwlggggggllgggggggl",
      ["wwwlgggggll", ["l", "wh"], "lggggggl"],
      "wwwllllllllllllllllw"
    ],
    dim: {
      x: 20,
      y: 12
    }
  },
  {
    name: "Babiskiki II (114.isl)",
    noPadding: true,
    field: [
      "wwwwwwwwwwwwwwwwwwww",
      "wwwwwwwllwwwwwwwllww",
      ["wwwwwwwl", ["l", "bx"], "wwwwwlll", ["l", "sp"], "lw"],
      ["wwww", ["l", "pa"], ["l", "ho"], ["l", "pa"], "l", ["l", "bt"], "l", ["l", "bx"], "w", ["w", "bw"], "llg", ["g", "bm"], "glw"],
      ["wwwwl", ["l", "bm"], "lllllww", ["l", "bx"], ["l", "pa"], "g", ["g", "pl"], "glw"],
      ["wwwwllllllwwwll", ["l", "sp"], "gglw"],
      ["wwwwwwwwwwwwwwwl", ["l", "rc"], ["l", "rc"], ["l", "rc"], "w"],
      ["wwwww", ["l", "rc"], ["l", "pa"], "wwwwwwww", ["l", "rc"], "lllw"],
      ["wwwww", ["l", "st"], "l", ["l", "rc"], "lll", ["l", "rc"], "lwwwlllw"],
      ["wwwwwwwl", ["l", "st"], "l", ["l", "st"], "llwwww", ["w", "bw"], "ww"],
      ["wwwwwwwll", ["l", "st"], "lll", ["w", "bw"], ["w", "bw"], "w", ["w", "bw", "bx"], ["w", "bw", "st"], "ww"],
      ["wwwwwwwwll", ["l", "rc"], "lwwwwwwww"]
    ],
    dim: {
      x: 20,
      y: 12
    }
  },
  {
    name: "El Doradui (115.isl)",
    noPadding: true,
    field: [
      "wwwwwwwwwwwwwwwwwwww",
      [
        "w",
        ["w", "ic", "ci"],
        ["w", "ic", "ci"],
        ["w", "ic", "ci"],
        ["w", "ic", "ci"],
        "w",
        ["w", "ic", "ci"],
        ["w", "hp"],
        "w",
        ["w", "ic", "ci"],
        ["w", "hp"],
        ["w", "ic", "ci"],
        ["w", "ic", "ci"],
        ["w", "ic", "ci"],
        "ww",
        ["w", "ic", "ci"],
        ["w", "ic", "ci"],
        ["w", "ic", "ci"],
        ["w", "ic", "ci"]
      ],
      ["w", ["w", "ic", "ci"], "ww", ["w", "ic", "ci"], "w", ["w", "ic", "ci"], ["w", "hp"], "w", ["w", "ic", "ci"], "w", ["w", "ic", "ci"], ["w", "hp"], ["w", "hp"], ["w", "ic", "ci"], ["w", "hp"], ["w", "ic", "ci"], "ww", ["w", "ic", "ci"]],
      ["w", ["w", "ic", "ci"], "ww", ["w", "ic", "ci"], "w", ["w", "ic", "ci"], ["w", "hp"], "w", ["w", "ic", "ci"], "w", ["w", "ic", "ci"], ["w", "ic", "ci"], ["w", "ic", "ci"], ["w", "hp"], "w", ["w", "ic", "ci"], ["w", "hp"], "w", ["w", "ic", "ci"]],
      ["w", ["w", "ic", "ci"], "ww", ["w", "ic", "ci"], "w", ["w", "ic", "ci"], ["w", "hp"], "w", ["w", "ic", "ci"], "w", ["w", "ic", "ci"], "ww", ["w", "ic", "ci"], "w", ["w", "ic", "ci"], ["w", "hp"], "w", ["w", "ic", "ci"]],
      [
        "w",
        ["w", "ic", "ci"],
        ["w", "ic", "ci"],
        ["w", "ic", "ci"],
        ["w", "ic", "ci"],
        ["w", "hp"],
        ["w", "ic", "ci"],
        ["w", "ic", "ci"],
        ["w", "ic", "ci"],
        ["w", "ic", "ci"],
        "w",
        ["w", "ic", "ci"],
        ["w", "hp"],
        ["w", "hp"],
        ["w", "ic", "ci"],
        "w",
        ["w", "ic", "ci"],
        ["w", "ic", "ci"],
        ["w", "ic", "ci"],
        ["w", "ic", "ci"]
      ],
      ["www", ["w", "hp"], "wwwwwwwwwwww", ["w", "hp"], "www"],
      ["www", ["w", "hp"], ["w", "hp"], "wwwwwwwww", ["w", "hp"], ["w", "hp"], ["w", "hp"], "www"],
      ["wwww", ["w", "hp"], "wwwww", ["w", "hp"], ["w", "hp"], ["w", "hp"], ["w", "hp"], ["w", "hp"], "wwwww"],
      ["ll", ["w", "ra", "pi"], "wllwww", ["w", "hp"], ["w", "hp"], "wwwwwwwww"],
      ["l", ["l", "pl"], ["l", "ph"], "l", ["l", "re"], "lw", ["w", "hp", "bx"], ["w", "hp"], ["w", "hp"], "wwwwwwl", ["l", "ho"], ["l", "rc"], "w"],
      "llllllwwwwwwwwwwlllw"
    ],
    dim: {
      x: 20,
      y: 12
    }
  },
  {
    name: "Kokutiki (116.isl)",
    noPadding: true,
    field: [
      ["wwwwl", ["l", "pa"], "wwwwwwwwwwwwww"],
      ["wwww", ["l", "pa"], "llwww", ["l", "pa"], ["l", "pa"], "lwwwwwww"],
      ["wl", ["l", "pa"], ["l", "pa"], "lll", ["l", "pa"], ["l", "pa"], ["l", "pa"], "lll", ["w", "bw"], ["w", "bw"], ["w", "bw"], "wwww"],
      ["w", ["l", "pa"], "lllllllllllww", ["w", "bw"], "wwww"],
      [["l", "pa"], "ll", ["l", "fgr"], "l", ["l", "fgr"], "l", ["l", "pl"], "llll", ["l", "pa"], "lw", ["w", "bw"], "wwww"],
      [["l", "pa"], "l", ["l", "cp"], ["l", "cp"], ["l", "ct"], ["l", "cp"], "l", ["l", "crr"], "llllllw", ["w", "bw"], ["w", "bw"], ["w", "bw"], ["w", "bw"], "w"],
      ["ll", ["l", "cp"], "llll", ["l", "crr"], "l", ["l", "cp"], "lll", ["l", "pa"], "wwww", ["w", "bw"], "w"],
      [["l", "pa"], "l", ["l", "cp"], ["l", "cp"], ["l", "cp"], "lll", ["l", "cp"], ["l", "cp"], ["l", "ct"], ["l", "cp"], "l", ["l", "pa"], "wwww", ["w", "bw"], "w"],
      ["ll", ["l", "cp"], "l", ["l", "cp"], ["l", "cp"], ["l", "cp", "cc"], ["l", "cp"], ["l", "cp", "cc"], ["l", "cp"], "ll", ["l", "pa"], "lwlll", ["w", "bw"], "w"],
      [["l", "pa"], "lllllllll", ["l", "pa"], ["l", "pa"], "wwllllww"],
      ["w", ["l", "pa"], "lll", ["l", "pa"], ["l", "pa"], ["l", "pa"], ["l", "pa"], "lwwww", ["l", "pa"], ["l", "ho"], ["l", "co"], ["l", "co"], "lw"],
      ["wwl", ["l", "pa"], ["l", "pa"], "wwwwwwwwwlllllw"]
    ],
    dim: {
      x: 20,
      y: 12
    }
  },
  {
    name: "Bravkika (117.isl)",
    noPadding: true,
    field: [
      ["wwwwwwwwwwwwwl", ["l", "pa"], "lwwww"],
      ["wwwwwl", ["l", "pa"], "lwwww", ["l", "pa"], "ll", ["l", "pa"], "wwww"],
      ["wwwww", ["l", "pa"], "lll", ["l", "pa"], ["l", "pa"], "lllll", ["l", "pa"], "lww"],
      ["wwll", ["l", "pa"], "l", ["l", "cp", "bc"], "lllll", ["l", "cp"], ["l", "cp"], ["l", "ct"], ["l", "cp", "bc"], "ll", ["l", "pa"], "l"],
      ["ll", ["l", "pa"], "lll", ["l", "cp", "bc"], ["l", "cp"], ["l", "ct"], ["l", "cp", "bc"], ["l", "cp"], ["l", "cp"], ["l", "cp", "bc"], "ll", ["l", "cp"], "llll"],
      ["l", ["l", "pa"], ["l", "pa"], "lll", ["l", "cp"], "lll", ["l", "cp"], "l", ["l", "cp"], ["l", "cp", "bc"], ["l", "cp", "cc"], ["l", "cp", "bc"], "lll", ["l", "pa"]],
      ["l", ["l", "pa"], "llll", ["l", "cp", "bc"], ["l", "cp"], ["l", "cp", "bc"], ["l", "cp"], ["l", "cp", "cc"], "lllllll", ["l", "pl"], "l"],
      [["l", "pa"], "ll", ["l", "cp", "bc"], ["l", "cp"], ["l", "cp"], ["l", "cp", "cc"], ["l", "cp", "bc"], "lll", ["l", "pa"], ["l", "pa"], "lllllll"],
      [["l", "pa"], "ll", ["l", "cp"], "lll", ["l", "cp"], "ll", ["l", "pa"], "wwwlwwl", ["l", "pa"], ["l", "ho"]],
      [["l", "pa"], "l", ["l", "cp", "bc"], ["l", "cp"], ["l", "cp", "bc"], ["l", "ct"], ["l", "cp"], ["l", "cp", "bc"], ["l", "cp", "bc"], "llw", ["l", "mc"], ["l", "pa"], ["l", "co"], ["l", "pa"], "wlll"],
      ["llllllllll", ["l", "pa"], "wl", ["l", "co"], ["l", "co"], ["l", "rc"], "wl", ["l", "pa"], "l"],
      ["wwl", ["l", "pa"], ["l", "pa"], "lll", ["l", "pa"], ["l", "pa"], "lww", ["l", "rc"], ["l", "pa"], "lwwl", ["l", "pa"]]
    ],
    dim: {
      x: 20,
      y: 12
    }
  },
  {
    name: "Kunami Punami (118.isl)",
    noPadding: true,
    field: [
      "wwwwwwwwwwwwwwwwwwww",
      "wwwwwwwwwwwwwwwwwwww",
      ["w", ["l", "pa"], ["l", "ho"], ["l", "pa"], "lll", ["l", "rc"], "wwwwwwwwwwww"],
      ["llllllllll", ["l", "pa"], ["l", "rc"], ["l", "pa"], "lllllww"],
      ["lllg", ["g", "rc"], "gglll", ["l", "wh"], "lllllllww"],
      [["l", "pa"], ["l", "sk"], ["l", "pa"], ["g", "rc"], "gggggllg", ["g", "pa"], ["g", "rc"], ["g", "rc"], ["g", "pa"], "lllw"],
      [["l", "pa"], "l", ["l", "pa"], "gg", ["g", "pl"], "ggg", ["g", "bm"], "ggggg", ["g", "pa"], ["l", "rc"], "l", ["l", "rc"], "w"],
      [["l", "pa"], ["l", "bt"], ["l", "pa"], "ggg", ["g", "fgb"], "llllgg", ["g", "bx"], "ggll", ["l", "rc"], "w"],
      [["l", "pa"], ["l", "pa"], ["l", "pa"], "g", ["g", "pa"], ["g", "se"], ["g", "rc"], "l", ["l", "crb"], "ll", ["l", "sh"], "gggllllw"],
      ["wlllllllll", ["l", "rc"], ["l", "sb"], ["l", "wb"], "llllllw"],
      "wwwllllllllllllllllw",
      "wwwwwwwwwwwwwwwwwwww"
    ],
    dim: {
      x: 20,
      y: 12
    }
  },
  {
    name: "Filizia Forever (119.isl)",
    noPadding: true,
    field: [
      "wwwwwwwwwwwwwwwwwwww",
      ["w", ["w", "sn0"], ["w", "sn1"], ["w", "sn2"], "wwwwwwwwwwwwwwww"],
      "wwwwwwwwwwwwwwwwwwww",
      "wwwwwwwwwwwwwwwwwwww",
      ["wwwwwwww", ["l", "pa"], ["l", "ho"], ["l", "pa"], "wwwwwwwww"],
      "wwwwwwwllllwwwwwwwww",
      ["wwwwwwllllll", ["l", "pa"], "lwwwwww"],
      ["wwwwwwl", ["l", "sg0"], "lllll", ["l", "rc"], "wwwwww"],
      ["wwwwwwllll", ["l", "pl"], "l", ["l", "pa"], "lwwwwww"],
      ["wwwwwwlllll", ["l", "rc"], "wwwwwwww"],
      "wwwwwwwwwwwwwwwwwwww",
      "wwwwwwwwwwwwwwwwwwww"
    ],
    dim: {
      x: 20,
      y: 12
    }
  },
  {
    name: "Koloraduka (120.isl)",
    noPadding: true,
    field: [
      "wwwwwwwwwwwwwwwwwwww",
      ["w", ["w", "sn0"], ["w", "sn1"], ["w", "sn2"], "wwwwwwwwwwwwwwww"],
      "wwwwwwwwwwwwwwwwwwww",
      "wwwwllwwwwwwwlllwwww",
      ["wwww", ["l", "pa"], ["l", "ho"], ["l", "pa"], "lwwwwwl", ["l", "re"], "lllww"],
      ["wwwwllll", ["w", "hp"], ["w", "hp"], "wwll", ["l", "sg0"], ["l", "sg1"], ["l", "sg0"], "lww"],
      ["wwwwwlllw", ["w", "hp"], "wwll", ["l", "sg0"], "lllww"],
      ["wwwwwwwww", ["w", "hp"], "wwll", ["l", "sg1"], "l", ["l", "pl"], "lww"],
      ["wwwwwwwww", ["w", "hp"], "wwllllllww"],
      ["wwwwwwwww", ["w", "hp"], ["w", "hp"], "wwwww", ["w", "hp"], "www"],
      ["wwwwwwwwww", ["w", "hp"], ["w", "hp"], ["w", "hp"], "w", ["w", "hp"], ["w", "hp"], ["w", "hp"], "www"],
      ["wwwwwwwwwwww", ["w", "hp"], ["w", "hp"], ["w", "hp"], "wwwww"]
    ],
    dim: {
      x: 20,
      y: 12
    }
  },
  {
    name: "Lalala Hui (121.isl)",
    noPadding: true,
    field: [
      "wwwwwwwwwwwwwwwwwwww",
      ["w", ["w", "sn0"], ["w", "sn1"], ["w", "sn2"], "wwwwwwwwllwwllww"],
      ["wwwwwwwwwwwlllll", ["l", "rc"], "lww"],
      ["wwwwllwwwll", ["l", "rc"], "ll", ["l", "sg0"], ["l", "rc"], "llww"],
      ["wwwl", ["l", "pa"], ["l", "ho"], "wwl", ["l", "rc"], ["l", "rc"], "g", ["g", "pa"], "gllllww"],
      ["www", ["l", "pa"], "ll", ["l", "pa"], ["l", "rc"], "llg", ["g", "pa"], ["g", "rc"], "gl", ["l", "sg1"], "llww"],
      ["wwwl", ["l", "rc"], "l", ["l", "pl"], "ll", ["l", "sg0"], ["g", "rc"], ["g", "rc"], ["g", "pa"], "g", ["l", "sg1"], "g", ["g", "pa"], "lww"],
      ["wwwwllllllg", ["g", "pa"], "gll", ["g", "rc"], "glww"],
      ["wwwwlllllllllll", ["g", "pa"], "glww"],
      ["wwwwwwll", ["l", "rc"], ["l", "pa"], "l", ["l", "sg0"], "l", ["l", "sg0"], "llllww"],
      "wwwwwwwwwwllllwwwwww",
      "wwwwwwwwwwwwwwwwwwww"
    ],
    dim: {
      x: 20,
      y: 12
    }
  },
  {
    name: "Maratonkia (122.isl)",
    noPadding: true,
    field: [
      "wwwwwwwwwwwwwwwwwwww",
      ["w", ["w", "sn0"], ["w", "sn1"], ["w", "sn2"], "wwwwwwwwwwwllwww"],
      ["wwwwlll", ["w", "ic"], ["w", "ic"], ["w", "ic"], "wwwll", ["l", "cl"], "llww"],
      ["wl", ["l", "pp"], ["l", "sg0"], "lllww", ["w", "ic"], ["w", "ic"], ["w", "ic"], ["w", "ic"], ["l", "cl"], "l", ["l", "rc"], "lllw"],
      ["llgg", ["g", "pa"], "llwwwwwl", ["l", "rc"], "ll", ["l", "sg0"], "l", ["l", "rc"], "w"],
      ["l", ["g", "ho"], ["g", "pa"], "gg", ["l", "sg1"], "lwwwwlllll", ["l", "sg1"], "llw"],
      [["l", "pa"], "g", ["g", "pl"], "gl", ["l", "pp"], "l", ["l", "pp"], "l", ["l", "cl"], "ll", ["l", "rc"], "lll", ["l", "sg0"], "llw"],
      ["lgggl", ["l", "sg0"], ["l", "sg1"], "ll", ["l", "rc"], "lll", ["l", "rc"], "lll", ["l", "rc"], "lw"],
      ["lg", ["g", "bx"], "gl", ["l", "pp"], "wwwwll", ["l", "cl"], "lll", ["l", "sl"], "llw"],
      ["ll", ["l", "sp"], "llllwwwl", ["l", "rc"], "ll", ["l", "pb"], "llllw"],
      ["wllllllwwwwll", ["l", "rc"], "lllwww"],
      ["www", ["w", "ic"], ["w", "ic"], "wwwwwwwwwwwwwww"]
    ],
    dim: {
      x: 20,
      y: 12
    }
  },
  {
    name: "Shellamagika (123.isl)",
    noPadding: true,
    field: [
      "wwwwwwwwwwwwwwwwwwww",
      ["w", ["w", "sn0"], ["w", "sn1"], ["w", "sn2"], "ww", ["l", "pa"], ["l", "rc"], ["l", "pa"], ["l", "rc"], ["l", "pa"], ["l", "rc"], ["l", "pa"], ["l", "rc"], ["l", "pa"], ["l", "rc"], ["l", "pa"], "www"],
      ["wwwwww", ["l", "pa"], "llllllllll", ["l", "pa"], "ww"],
      ["wwww", ["l", "pa"], "ll", ["l", "sg0"], "l", ["l", "sg0"], "ll", ["l", "sg0"], "ll", ["l", "sg0"], "l", ["l", "pa"], "ww"],
      ["www", ["l", "pa"], "ll", ["l", "sg0"], "lll", ["l", "sg0"], "ll", ["l", "sg0"], "lll", ["l", "pa"], "ww"],
      ["wl", ["l", "pa"], "llll", ["l", "sg0"], "l", ["l", "sg0"], "llll", ["l", "sg0"], "ll", ["l", "pa"], "ww"],
      ["w", ["l", "rc"], ["l", "ho"], "ll", ["l", "sg0"], ["l", "sg0"], "llll", ["l", "sg0"], "l", ["l", "sg0"], "lll", ["l", "pa"], "ww"],
      ["wll", ["l", "pl"], "l", ["l", "sg0"], "l", ["l", "sg0"], "llll", ["l", "sg0"], "l", ["l", "sg0"], ["l", "sg0"], "l", ["l", "pa"], "ww"],
      ["wlllll", ["l", "sg0"], "l", ["l", "sg0"], "l", ["l", "sg0"], ["l", "sg0"], "l", ["l", "sg0"], "ll", ["l", "pa"], "lww"],
      ["ww", ["l", "pa"], ["l", "rc"], ["l", "pa"], "lllllll", ["l", "sg0"], "lll", ["l", "pa"], "www"],
      ["wwwwl", ["l", "pa"], ["l", "pa"], "ll", ["l", "pa"], "l", ["l", "rc"], "lll", ["l", "pa"], "lwww"],
      ["wwwwwww", ["l", "pa"], ["l", "rc"], ["l", "rc"], ["l", "rc"], "l", ["l", "rc"], "lwwwwww"]
    ],
    dim: {
      x: 20,
      y: 12
    }
  },
  {
    name: "Grihini Wika (124.isl)",
    noPadding: true,
    field: [
      [["w", "sn0"], ["w", "sn1"], ["w", "sn2"], "wwwwwwwwwwwwwwwww"],
      "wwwlllllllwwwwwwwwww",
      ["wlllll", ["l", "pb"], "l", ["l", "rc"], "llwwwwl", ["l", "rc"], ["l", "ho"], ["l", "pa"], "w"],
      ["wl", ["l", "pa"], ["l", "rc"], "lllllllllww", ["l", "pa"], "ll", ["l", "pa"], "w"],
      ["wllllll", ["l", "pa"], "l", ["l", "bx"], "l", ["l", "bx"], "lww", ["l", "rc"], "ll", ["l", "rc"], "w"],
      ["wlllwwwwwwwwwww", ["l", "pa"], ["l", "sg0"], "l", ["l", "pa"], "w"],
      ["llllwwww", ["w", "bw"], "w", ["l", "pa"], ["l", "rc"], ["l", "pa"], ["l", "rc"], ["l", "rc"], ["l", "rc"], "l", ["l", "sg0"], ["l", "rc"], "w"],
      ["ll", ["l", "pl"], "ll", ["l", "bm"], "llllll", ["l", "pa"], "lllll", ["l", "pa"], "w"],
      ["lllllllllllll", ["l", "rc"], ["l", "sg0"], ["l", "co"], "l", ["l", "rc"], "ww"],
      ["wl", ["l", "sl"], "lg", ["g", "rc"], "g", ["g", "rc"], ["g", "pa"], "glllll", ["l", "rc"], ["l", "rc"], "lww"],
      ["wwllgg", ["g", "pa"], "gggl", ["l", "bt"], "lwwwwwww"],
      "wwlllllllllllwwwwwww"
    ],
    dim: {
      x: 20,
      y: 12
    }
  },
  {
    name: "Tiu Joakimki (125.isl)",
    noPadding: true,
    field: [
      [["w", "sn0"], ["w", "sn1"], ["w", "sn2"], "wwwwwlllwww", ["l", "mc"], "lwwww"],
      ["wwwwwwwwl", ["l", "bx"], ["l", "bc"], ["l", "bx"], "lwll", ["w", "bw"], "www"],
      [["l", "pa"], ["l", "ho"], ["l", "rc"], ["l", "bc"], "ww", ["w", "bw"], ["w", "bw", "bx"], "wll", ["l", "bc"], "lwwwll", ["l", "bc"], "w"],
      ["lll", ["l", "pl"], "ww", ["w", "bw", "bx"], ["w", "bw"], "wwwwwwwwl", ["l", "sg0"], "lw"],
      ["wl", ["l", "bx"], "lwww", ["w", "bw"], "wwwwwwwww", ["w", "bw"], "ww"],
      ["w", ["l", "pa"], ["l", "bx"], ["l", "bc"], "wwwwwwwwwwwwwwww"],
      ["wwllwwll", ["l", "bc"], "lwwwwwww", ["w", "bw"], "ww"],
      "wwllwwllllwwwwwwllww",
      ["wwwww", ["l", "bc"], "g", ["g", "bc"], "l", ["l", "bx"], ["w", "bw"], "ww", ["w", "bw"], "l", ["l", "bx"], "l", ["l", "bc"], "ww"],
      ["wwwwwl", ["g", "bx"], "g", ["l", "sp"], "llwww", ["l", "pa"], ["l", "rc"], ["l", "pa"], "l", ["l", "bc"], "w"],
      ["wwwwwllllll", ["w", "bw"], ["w", "bw"], "wll", ["l", "sg0"], "llw"],
      "wwwwwwwwwwwwwwwwwwww"
    ],
    dim: {
      x: 20,
      y: 12
    }
  },
  {
    name: "Monstarus (126.isl)",
    noPadding: true,
    field: [
      "wwwwwwwwwwwwwwwwwwww",
      "wwwwlllllllllwwwwwww",
      ["wwwlllllll", ["l", "pb"], "llllllllw"],
      ["wwwlllllllllllll", ["l", "pa"], "ll", ["l", "rc"]],
      ["wwwllllllllllllllll", ["l", "pa"]],
      ["wwww", ["l", "rc"], ["l", "rc"], ["l", "rc"], ["l", "rc"], ["l", "rc"], "lllllll", ["l", "pb"], "ll", ["l", "rc"]],
      ["wwwwwllll", ["l", "rc"], "llll", ["l", "pl"], "l", ["l", "pb"], "ll", ["l", "pa"]],
      ["wwwwwl", ["l", "bx"], "l", ["l", "bx"], ["l", "rc"], ["l", "rc"], "llllllll", ["l", "rc"]],
      ["w", ["l", "ho"], ["l", "rc"], "lwww", ["w", "bw"], "ww", ["l", "rc"], "lllll", ["l", "sl"], "lll"],
      ["wl", ["l", "co"], "l", ["w", "bw"], ["w", "bw"], ["w", "bw"], ["w", "bw"], ["w", "bw"], "wl", ["l", "co"], "llllllll"],
      ["wl", ["l", "rc"], "lwwwwwwwl", ["l", "bx"], "l", ["l", "bx"], "l", ["l", "bx"], "l", ["l", "rc"], "w"],
      "wwwwwwwwwwwwwwwwwwww"
    ],
    dim: {
      x: 20,
      y: 12
    }
  },
  {
    name: "Kukuruta Bruta (127.isl)",
    noPadding: true,
    field: [
      ["wlllwwwwwww", ["w", "ic"], ["w", "ic"], "wwwll", ["l", "ho"], "l"],
      ["wl", ["l", "wh"], ["l", "co"], "l", ["w", "bw"], ["w", "bw"], ["w", "bw"], ["w", "bw"], "ww", ["w", "bw"], ["w", "bw"], ["w", "bw"], ["w", "bw"], ["w", "bw"], "l", ["l", "co"], "l", ["l", "rc"]],
      ["wl", ["l", "se"], "l", ["l", "pa"], "wwwwwww", ["w", "bw"], "wwwwl", ["l", "pa"], "l"],
      ["wll", ["l", "wb"], "lwwww", ["l", "pa"], "l", ["l", "bx"], "lwwwwwww"],
      ["wwlllwwww", ["l", "pa"], "l", ["l", "pa"], "lwwwwwww"],
      ["ww", ["l", "rc"], ["l", "pa"], "ww", ["l", "pa"], "llllllllllllw"],
      ["wwwwwwlg", ["g", "rc"], ["g", "pa"], "llllgg", ["l", "bx"], "llw"],
      ["wl", ["l", "pa"], ["l", "rc"], ["l", "pa"], "lg", ["g", "pb"], ["g", "st"], "gl", ["l", "pl"], "lg", ["g", "pa"], "gllww"],
      ["wlll", ["l", "pb"], "l", ["g", "rc"], "gg", ["l", "sh"], "lll", ["g", "pa"], "glwwww"],
      ["wwl", ["l", "bx"], "lllllll", ["l", "sl"], "llllwwww"],
      "wwllllllllllwwwwwwww",
      "wwlllwwwwwwwwwwwwwww"
    ],
    dim: {
      x: 20,
      y: 12
    }
  },
  {
    name: "Korallahoa (128.isl)",
    noPadding: true,
    field: [
      ["wwwwwwwwll", ["l", "sg0"], "l", ["l", "sg0"], "llwwwww"],
      ["w", ["w", "sn0"], ["w", "sn1"], ["w", "sn2"], "wl", ["l", "sg0"], "ll", ["w", "ic"], ["w", "ic"], ["w", "ic"], ["w", "ic"], ["w", "ic"], "llwwww"],
      ["wwwwwl", ["w", "ic"], ["w", "ic"], ["w", "ic"], ["w", "ic"], ["w", "ic"], ["w", "ic"], ["w", "ic"], ["w", "ic"], ["w", "ic"], ["l", "sg0"], "wwww"],
      ["wwwwll", ["w", "ic"], ["w", "ic"], ["w", "ic"], ["w", "ic"], ["w", "ic"], ["w", "ic"], ["w", "ic"], ["w", "ic"], ["w", "ic"], "lwwww"],
      ["wwwwl", ["w", "ic"], ["w", "ic"], ["w", "ic"], ["w", "ic"], ["w", "ic"], ["w", "ic"], ["w", "ic"], ["w", "ic"], ["w", "ic"], ["w", "ic"], "llwww"],
      ["wwww", ["l", "sg0"], ["w", "ic"], ["w", "ic"], ["w", "ic"], ["w", "ic"], ["w", "ic"], ["l", "ho"], ["l", "rc"], ["w", "ic"], ["w", "ic"], ["w", "ic"], ["w", "ic"], "llww"],
      ["wwwwl", ["w", "ic"], ["w", "ic"], ["w", "ic"], ["w", "ic"], ["w", "ic"], "ll", ["w", "ic"], ["w", "ic"], ["w", "ic"], ["w", "ic"], ["w", "ic"], ["l", "sg0"], "ww"],
      ["wwww", ["l", "sg0"], ["w", "ic"], ["w", "ic"], ["w", "ic"], ["w", "ic"], ["w", "ic"], ["w", "ic"], ["w", "ic"], ["w", "ic"], ["w", "ic"], ["w", "ic"], ["w", "ic"], ["w", "ic"], "lww"],
      ["wwwwl", ["w", "ic"], ["w", "ic"], ["w", "ic"], ["w", "ic"], ["w", "ic"], ["w", "ic"], ["w", "ic"], ["w", "ic"], ["w", "ic"], ["w", "ic"], ["w", "ic"], ["w", "ic"], "lww"],
      ["wwwwll", ["w", "ic"], ["w", "ic"], ["w", "ic"], ["w", "ic"], ["w", "ic"], ["w", "ic"], ["w", "ic"], ["w", "ic"], ["w", "ic"], "l", ["l", "pl"], "lww"],
      ["wwwwwll", ["w", "ic"], ["w", "ic"], ["w", "ic"], ["w", "ic"], ["w", "ic"], ["w", "ic"], ["w", "ic"], "llwwww"],
      ["wwwwwwll", ["l", "sg0"], "l", ["l", "sg0"], "llllwwwww"]
    ],
    dim: {
      x: 20,
      y: 12
    }
  },
  {
    name: "Iwanaka (129.isl)",
    noPadding: true,
    field: [
      "wwwwwwwwlllllllwwwww",
      ["wwwwwllll", ["w", "ic"], ["w", "ic"], ["w", "ic"], ["w", "ic"], ["w", "ic"], "llwwww"],
      ["wwwwwl", ["w", "ic"], ["w", "ic"], ["w", "ic"], ["w", "ic"], ["w", "ic"], ["w", "ic"], ["w", "ic"], ["w", "ic"], ["w", "ic"], "lwwww"],
      ["wwwwll", ["w", "ic"], ["w", "ic"], ["w", "ic"], ["w", "ic"], ["w", "ic"], ["w", "ic"], ["w", "ic"], ["w", "ic"], ["w", "ic"], "lwwww"],
      ["wwwwl", ["w", "ic"], ["w", "ic"], ["w", "ic"], "ll", ["w", "ic"], ["w", "ic"], ["w", "ic"], ["w", "ic"], ["w", "ic"], "lwwww"],
      ["wwwwl", ["w", "ic"], ["w", "ic"], ["w", "ic"], ["l", "pa"], "l", ["w", "ic"], ["w", "ic"], ["w", "ic"], ["w", "ic"], ["w", "ic"], "lllww"],
      ["wwwwl", ["w", "ic"], ["w", "ic"], ["w", "ic"], ["w", "ic"], ["w", "ic"], ["w", "ic"], ["w", "ic"], ["w", "ic"], ["w", "ic"], ["w", "ic"], ["w", "ic"], ["w", "ic"], "lww"],
      ["wwwwl", ["w", "ic"], ["w", "ic"], ["w", "ic"], ["w", "ic"], ["w", "ic", "lf3"], ["w", "ic"], ["w", "ic"], ["w", "ic"], ["w", "ic"], ["w", "ic"], ["w", "ic"], ["w", "ic"], "lww"],
      ["wwwwl", ["w", "ic"], ["w", "ic"], ["w", "ic"], ["w", "ic"], ["w", "ic"], ["w", "ic"], ["w", "ic"], ["w", "ic"], ["w", "ic"], ["w", "ic"], ["w", "ic"], ["w", "ic"], "lww"],
      ["wwwwll", ["w", "ic"], ["w", "ic"], ["w", "ic"], ["w", "ic"], ["w", "ic"], ["w", "ic"], ["w", "ic"], ["w", "ic"], ["w", "ic"], "l", ["l", "pl"], "lww"],
      ["wwwwwll", ["w", "ic"], ["w", "ic"], ["l", "rc"], ["l", "ho"], ["l", "rc"], ["w", "ic"], ["w", "ic"], "l", ["l", "sl"], "lwww"],
      ["wwwwwwllll", ["l", "co"], "lll", ["l", "pb"], "llwww"]
    ],
    dim: {
      x: 20,
      y: 12
    }
  },
  {
    name: "Ying Yang (130.isl)",
    noPadding: true,
    field: [
      "wwwwwwwwwwwwwwwwwwww",
      "wwwwwwwwwwwwwwwwwwww",
      ["wwwwwww", ["l", "pa"], ["l", "ho"], ["l", "pa"], "lwwwwwwwww"],
      "wwwwwwllllllwwwwwwww",
      "wwwwwllllllllllwwwww",
      ["wwwwwl", ["l", "fa"], "l", ["l", "sfg"], ["l", "sfg"], ["l", "sfg"], ["l", "sfg"], ["l", "sfg"], "llwwwww"],
      ["wwwwwlll", ["l", "sfr"], ["l", "sfr"], ["l", "sfr"], ["l", "sfg"], ["l", "sfg"], "lllwwww"],
      ["wwwwwl", ["l", "pl"], "l", ["l", "sfg"], ["l", "sfg"], ["l", "sfr"], ["l", "sfr"], ["l", "sfr"], "l", ["l", "fa"], "lwwww"],
      ["wwwwwlll", ["l", "sfg"], ["l", "sfg"], ["l", "sfg"], ["l", "sfg"], ["l", "sfg"], "lllwwww"],
      "wwwwwwllllllllwwwwww",
      "wwwwwwwwwllllwwwwwww",
      "wwwwwwwwwwwwwwwwwwww"
    ],
    dim: {
      x: 20,
      y: 12
    }
  },
  {
    name: "Lyang Hang (131.isl)",
    noPadding: true,
    field: [
      "wwwwwwwwwwwwwwwwwwww",
      ["wwwww", ["l", "pa"], ["l", "ho"], ["l", "rc"], "lwwwwwlllwww"],
      ["wwww", ["l", "rc"], "lllllwwwll", ["l", "pl"], "lwww"],
      "wwwwlllllllllllllwww",
      ["wwwwll", ["l", "fa"], "l", ["l", "sfr"], ["l", "sfr"], ["l", "sfg"], ["l", "sfg"], ["l", "sfg"], ["l", "sfr"], "l", ["l", "fa"], "lwww"],
      ["wwwwwlll", ["l", "sfr"], ["l", "sfr"], ["l", "sfg"], ["l", "sfr"], ["l", "sfg"], ["l", "sfg"], "lllwww"],
      ["wwwwwwll", ["l", "sfr"], ["l", "sfr"], ["l", "sfg"], ["l", "sfg"], ["l", "sfg"], ["l", "sfr"], "llwwww"],
      ["wwwwwwll", ["l", "sfr"], ["l", "sfr"], ["l", "sfr"], ["l", "sfr"], ["l", "sfr"], ["l", "sfr"], "llwwww"],
      ["wwwwwwwl", ["l", "sfr"], ["l", "sfr"], ["l", "sfr"], ["l", "sfr"], ["l", "sfr"], ["l", "sfr"], "llwwww"],
      "wwwwwwwlllllllllwwww",
      "wwwwwwwllllllwwwwwww",
      "wwwwwwwwwwwwwwwwwwww"
    ],
    dim: {
      x: 20,
      y: 12
    }
  },
  {
    name: "La Invisible (132.isl)",
    noPadding: true,
    field: [
      ["w", ["w", "hp", "rc"], ["w", "hp", "ho"], ["w", "hp", "rc"], "wwwwwwwwwwwwwwww"],
      ["w", ["w", "hp"], ["w", "hp"], ["w", "hp"], ["w", "hp"], ["w", "hp", "pp"], ["w", "hp"], "wwwwwwwwwwwww"],
      ["w", ["w", "hp"], ["w", "hp"], ["w", "hp"], ["w", "hp", "pp"], ["w", "hp"], "llww", ["w", "hp"], ["w", "hp"], "wwwwwwww"],
      ["w", ["w", "hp"], ["w", "hp"], "www", ["l", "pa"], ["l", "co"], "l", ["w", "hp"], ["w", "hp"], ["w", "hp"], "w", ["w", "hp"], ["w", "hp"], "wwwww"],
      ["wwwwwwwll", ["w", "hp"], ["w", "hp"], ["w", "hp", "rc"], ["w", "hp"], ["w", "hp"], ["w", "hp"], ["w", "hp"], ["w", "hp"], "www"],
      ["wwwwwww", ["w", "hp"], ["w", "hp"], ["w", "hp", "rc"], ["w", "hp"], ["w", "hp"], ["w", "hp"], ["w", "hp"], ["w", "hp"], ["w", "hp", "pa"], ["w", "hp"], "www"],
      ["wwwww", ["w", "hp"], ["w", "hp"], ["w", "hp"], ["w", "hp"], ["w", "hp", "pb"], ["w", "hp", "rc"], ["w", "hp", "pb"], ["w", "hp"], ["w", "hp", "bx"], ["w", "hp"], ["w", "hp"], ["w", "hp"], "www"],
      ["wwwww", ["w", "hp"], ["w", "hp", "cl"], ["w", "hp"], ["w", "hp"], ["w", "hp"], ["w", "hp"], ["w", "hp"], ["w", "hp"], ["w", "hp"], ["w", "hp"], ["w", "hp"], "wwww"],
      ["wwwwww", ["w", "hp"], ["w", "hp"], ["w", "hp", "cl"], ["w", "hp"], ["w", "hp"], ["w", "hp"], "ww", ["w", "hp"], "wwwww"],
      ["wwwwww", ["w", "hp"], ["w", "hp"], ["w", "hp"], "wwwwllllllw"],
      ["wwwwwwwwwwwwwl", ["l", "lf3"], ["l", "sl"], ["l", "pl"], ["l", "re"], "lw"],
      "wwwwwwwwwwwwwlllllww"
    ],
    dim: {
      x: 20,
      y: 12
    }
  },
  {
    name: "Sangri Laka (133.isl)",
    noPadding: true,
    field: [
      ["wwllwwwwwwwwwwl", ["l", "pa"], ["l", "pa"], "www"],
      ["w", ["l", "pa"], ["l", "ho"], ["l", "pa"], "lwwwwwwl", ["l", "pa"], ["l", "rc"], ["l", "pa"], "l", ["l", "rc"], ["l", "pa"], "ww"],
      ["wll", ["l", "fa"], ["l", "fa"], "l", ["w", "bw"], ["w", "bw"], ["w", "bw"], ["w", "bw"], ["w", "bw"], "lllllll", ["l", "rc"], "w"],
      ["wlllllwwwll", ["l", "sfr"], ["l", "sfr"], ["l", "sfg"], ["l", "sfg"], ["l", "sfg"], ["l", "sfr"], ["l", "sfr"], "lw"],
      ["ww", ["w", "bw"], "lllwww", ["l", "pa"], "l", ["l", "sfr"], "lllll", ["l", "sfr"], "lw"],
      ["ww", ["w", "bw"], "wwwwww", ["l", "rc"], "l", ["l", "sfg"], "lllll", ["l", "sfg"], "lw"],
      ["ww", ["w", "bw"], "wwwww", ["l", "pa"], "ll", ["l", "sfg"], "ll", ["l", "pl"], "ll", ["l", "sfg"], "lw"],
      ["ww", ["w", "bw"], "wwwww", ["l", "rc"], "ll", ["l", "sfg"], "lllll", ["l", "sfg"], "lw"],
      ["ww", ["w", "bw"], "wwwwwlll", ["l", "sfr"], "lllll", ["l", "sfr"], "lw"],
      ["ww", ["w", "bw"], "wwwwwlll", ["l", "sfr"], ["l", "sfr"], ["l", "sfg"], ["l", "sfg"], ["l", "sfg"], ["l", "sfr"], ["l", "sfr"], "lw"],
      ["ww", ["w", "bw"], ["w", "bw"], ["w", "bw"], ["w", "bw"], ["w", "bw"], ["w", "bw"], "llllllllllww"],
      "wwwwwwwwwwwwwwwwwwww"
    ],
    dim: {
      x: 20,
      y: 12
    }
  },
  {
    name: "Wermiona (134.isl)",
    noPadding: true,
    field: [
      "wwwwwwwwwwwwwwwwwwww",
      ["wwww", ["l", "pa"], ["l", "ho"], ["l", "pa"], "wwwl", ["l", "pa"], ["l", "pa"], "lwwwwww"],
      ["wwwlllllwwlll", ["l", "pa"], "l", ["l", "pa"], ["l", "pa"], "lww"],
      ["www", ["l", "pa"], "lllllllllllll", ["l", "pa"], "ww"],
      ["wwwl", ["l", "pl"], "l", ["l", "sfg"], ["l", "sfg"], ["l", "sfr"], ["l", "sfr"], ["l", "sfg"], ["l", "sfg"], ["l", "sfg"], ["l", "sfr"], ["l", "sfg"], "lllww"],
      ["www", ["l", "pa"], "ll", ["l", "sfr"], ["l", "sfr"], ["l", "sfr"], ["l", "sfr"], ["l", "sfg"], ["l", "sfg"], ["l", "sfr"], ["l", "sfr"], ["l", "sfg"], "ll", ["l", "pa"], "ww"],
      ["www", ["l", "pa"], "ll", ["l", "sfg"], ["l", "sfg"], ["l", "sfg"], ["l", "sfr"], ["l", "sfr"], ["l", "sfg"], ["l", "sfr"], ["l", "sfr"], ["l", "sfg"], "ll", ["l", "pa"], "ww"],
      ["wwwlll", ["l", "sfg"], ["l", "sfg"], ["l", "sfg"], ["l", "sfg"], ["l", "sfr"], ["l", "sfg"], ["l", "sfg"], ["l", "sfr"], ["l", "sfg"], "lllww"],
      ["wwww", ["l", "pa"], "llllllllllll", ["l", "pa"], "ww"],
      ["wwwwllll", ["l", "fa"], ["l", "fa"], "llllll", ["l", "pa"], "lww"],
      ["wwww", ["l", "pa"], "l", ["l", "pa"], "ll", ["l", "pa"], "l", ["l", "pa"], "l", ["l", "pa"], "lwwwww"],
      "wwwwwwwwwwwwwwwwwwww"
    ],
    dim: {
      x: 20,
      y: 12
    }
  },
  {
    name: "Gulkperiwa (135.isl)",
    noPadding: true,
    field: [
      "wwwwwwwwwwwwwwwwwwww",
      "wwwlllllwwwwlllllwww",
      ["wwwl", ["l", "sfg"], ["l", "sfr"], ["l", "sfr"], "llwwl", ["l", "sfr"], ["l", "sfr"], ["l", "sfr"], ["l", "sfg"], ["l", "sfg"], "lww"],
      ["wwwl", ["l", "sfg"], ["l", "sfg"], ["l", "sfg"], "lllwl", ["l", "sfg"], ["l", "bx"], "ll", ["l", "sfr"], "llw"],
      ["wwll", ["l", "sfg"], ["l", "sfg"], ["l", "sfg"], "lllwl", ["l", "sfr"], "lll", ["l", "sfg"], "llw"],
      ["wwll", ["l", "sfr"], ["l", "sfr"], ["l", "sfg"], "lllwl", ["l", "sfr"], ["l", "sfr"], ["l", "sfr"], ["l", "sfg"], ["l", "sfr"], "llw"],
      "wwlllllllwwllllllllw",
      ["wwllll", ["l", "pa"], ["l", "rc"], ["l", "pa"], "ll", ["l", "pa"], ["l", "rc"], ["l", "fa"], ["l", "rc"], ["l", "pa"], ["l", "pa"], ["l", "rc"], ["l", "pa"], "w"],
      ["wwllll", ["l", "fa"], "lll", ["l", "rc"], "llllllllw"],
      ["www", ["l", "pa"], ["l", "rc"], ["l", "pa"], "lll", ["l", "pa"], ["l", "ho"], ["l", "rc"], "l", ["l", "pl"], "llllww"],
      "wwwllllllllllllwwwww",
      "wwwwwwwwwwwwwwwwwwww"
    ],
    dim: {
      x: 20,
      y: 12
    }
  },
  {
    name: "Bairiki II (136.isl)",
    noPadding: true,
    field: [
      "wwwwwwwwwwwwwwwwwwww",
      "wwwllllwwwwlllllwwww",
      ["wwwllllll", ["l", "se"], "llllllllww"],
      ["wwwlll", ["l", "wb"], "lll", ["l", "rc"], "lll", ["l", "pa"], "ll", ["l", "rc"], "ww"],
      ["w", ["l", "pa"], ["l", "lf2"], ["l", "rc"], "lg", ["g", "pa"], "glll", ["l", "rc"], "l", ["l", "pl"], "ll", ["l", "rc"], "lww"],
      ["wll", ["l", "rc"], "lg", ["g", "bx"], "ggll", ["l", "pb"], "lll", ["l", "rc"], ["l", "rc"], "www"],
      ["wll", ["l", "lf1"], "lggg", ["g", "bx"], "glll", ["l", "co"], ["l", "rc"], ["l", "rc"], "lwl", ["l", "mc"]],
      ["wwlll", ["l", "sh"], "g", ["g", "pa"], "gg", ["l", "wh"], ["l", "rc"], ["l", "rc"], "lllllll"],
      ["wwwl", ["l", "sl"], "llllll", ["l", "rc"], "lllllw", ["l", "pa"], ["l", "ho"]],
      ["wwwlllllllwww", ["w", "bw", "bc"], "wwww", ["l", "bc"], ["l", "bc"]],
      ["wwwwwwwwwwwwwwwwww", ["w", "bw"], "w"],
      ["wwwwwwwwwwwww", ["w", "bw"], ["w", "bw"], ["w", "bw"], ["w", "bw"], ["w", "bw"], ["w", "bw"], "w"]
    ],
    dim: {
      x: 20,
      y: 12
    }
  },
  {
    name: "Hawana Kana (137.isl)",
    noPadding: true,
    field: [
      "wwwwwwwwwwwwwwwwwwww",
      ["ww", ["l", "pa"], "llllwwwwwwwllwwww"],
      ["w", ["l", "pa"], "lllllllwwwllllllww"],
      ["wll", ["l", "rc"], ["l", "pb"], ["l", "lf0"], ["l", "rc"], "llwwwll", ["l", "bx"], ["l", "bx"], ["l", "bx"], "lww"],
      ["llll", ["l", "rc"], ["l", "co"], "llllwwwll", ["l", "pa"], "lllw"],
      [["l", "pa"], "llll", ["l", "pb"], ["l", "rc"], "llllwwwlllllw"],
      ["lllllllll", ["l", "pa"], ["l", "sk"], "lllllll", ["l", "rc"], "w"],
      [["l", "pa"], "llllllllllwwlll", ["l", "pa"], ["l", "co"], ["l", "pa"], "w"],
      ["ll", ["l", "bx"], "l", ["l", "sb"], "ll", ["l", "pl"], "llwww", ["l", "pa"], ["l", "ho"], ["l", "pa"], ["l", "rc"], "llw"],
      "wlllllllllwwwlllllww",
      ["wl", ["l", "sl"], "ll", ["l", "lf1"], "wwwwwwwwllwwww"],
      "wlllwwwwwwwwwwwwwwww"
    ],
    dim: {
      x: 20,
      y: 12
    }
  },
  {
    name: "Samba Kompikika (138.isl)",
    noPadding: true,
    field: [
      ["wwwwwww", ["w", "ic"], ["w", "ic"], ["w", "ic"], ["l", "rc"], "l", ["l", "mc"], "lww", ["w", "ra"], "www"],
      ["ww", ["l", "rc"], ["l", "ho"], ["l", "pa"], "w", ["w", "ic"], ["w", "ic"], "lll", ["l", "rc"], "l", ["l", "sk"], "l", ["l", "pa"], "lwww"],
      ["wll", ["l", "co"], ["l", "rc"], ["l", "rc"], "l", ["l", "rc"], ["l", "co"], ["l", "crb"], ["g", "pa"], ["g", "pa"], ["g", "rc"], "g", ["l", "rc"], "ll", ["l", "bx"], "ww"],
      ["wl", ["l", "pl"], ["l", "pa"], "lllll", ["g", "pa"], "g", ["g", "fsy"], "g", ["g", "bc"], "l", ["l", "sb"], "lllw"],
      ["ll", ["l", "rc"], "l", ["l", "cp", "cc"], ["l", "ct"], ["l", "cp"], ["l", "cp"], "lgg", ["g", "pb"], ["g", "fsy"], "g", ["l", "sp"], "l", ["l", "bc"], "llw"],
      [["l", "bc"], ["l", "tp"], ["l", "pa"], "l", ["l", "cp"], ["l", "cp"], ["l", "ct"], "l", ["l", "bc"], ["g", "fgb"], "g", ["g", "fly"], "g", ["l", "crg"], "g", ["g", "bc"], ["g", "rc"], "l", ["l", "pa"], "w"],
      ["ll", ["l", "rc"], "l", ["l", "cp"], ["l", "cp"], "l", ["l", "tp"], "lg", ["g", "bc"], "gg", ["g", "bc"], ["g", "fgg"], "g", ["g", "bc"], ["l", "rc"], "ww"],
      ["l", ["l", "bc"], "l", ["l", "pa"], "l", ["l", "cp"], ["l", "cp"], "l", ["l", "bc"], "ggg", ["l", "bc"], "l", ["g", "bc"], "gglww"],
      ["wll", ["l", "rc"], "lll", ["l", "pa"], "l", ["l", "rc"], "lllllll", ["w", "ra"], "ww"],
      ["wwl", ["l", "pa"], ["l", "rc"], ["l", "pa"], ["l", "rc"], "l", ["l", "pa"], "llwwwwwwww", ["w", "by"]],
      ["wwlll", ["l", "bc"], "l", ["l", "sl"], ["l", "rc"], "lwwwwwwwwww"],
      "wwwwwwllllwwwwwwwwww"
    ],
    dim: {
      x: 20,
      y: 12
    }
  },
  {
    name: "Kadadifa (139.isl)",
    noPadding: true,
    field: [
      ["wwwwwwwwwww", ["w", "rc"], ["w", "rc"], "wwwwwww"],
      ["wlllwwww", ["l", "rc"], ["l", "pa"], ["w", "rc"], "ll", ["w", "rc"], "wwwwww"],
      ["ll", ["l", "pa"], "lwwwll", ["l", "rc"], "l", ["l", "bx"], "lllwwwww"],
      ["l", ["l", "bx"], "llwwwll", ["l", "pa"], "lllllwwwww"],
      [["l", "rc"], ["l", "rc"], "lwww", ["l", "rc"], "llggll", ["l", "bx"], "llwwww"],
      ["lll", ["w", "ra", "pi"], "ww", ["l", "pa"], "l", ["g", "rc"], ["g", "pa"], "gg", ["l", "rc"], ["l", "ci"], ["l", "pa"], ["l", "rc"], "wwww"],
      ["l", ["l", "bm"], "l", ["l", "ph"], "ww", ["l", "rc"], "lgg", ["g", "rc"], ["g", "pa"], ["l", "tp"], ["l", "ci"], "llwwww"],
      ["l", ["l", "pl"], "l", ["l", "rc"], "wwlll", ["l", "ci"], "ggl", ["l", "ci"], "lwwwww"],
      ["l", ["l", "tp"], "l", ["l", "pa"], "wwllll", ["l", "ci"], "l", ["l", "ci"], "llww", ["l", "pa"], ["l", "ho"], ["l", "pa"]],
      ["lllwwww", ["l", "fgr"], "l", ["l", "crr"], "l", ["l", "ci"], "l", ["l", "pa"], "wwwll", ["l", "rc"]],
      ["l", ["l", "bt"], "lwwwwwwll", ["l", "rc"], "lww", ["w", "by"], ["l", "fgr"], "l", ["l", "crr"], "l"],
      ["wllwwwwwww", ["w", "rc"], "www", ["w", "by"], "wllll"]
    ],
    dim: {
      x: 20,
      y: 12
    }
  },
  {
    name: "Khawals (140.isl)",
    noPadding: true,
    field: [
      "wwwwwwwwwwwwwwwwwwww",
      ["wl", ["l", "rc"], "lwwwww", ["l", "pa"], ["l", "ho"], ["l", "rc"], "wwwwwwww"],
      ["w", ["l", "pa"], ["l", "sb"], "lwllllllllwwwwwww"],
      ["wllwwlllllllllll", ["l", "bx"], "lww"],
      ["wwwllll", ["l", "sfg"], ["l", "sfg"], ["l", "sfr"], ["l", "sfr"], ["l", "sfr"], ["l", "sfg"], "ll", ["l", "bx"], "llww"],
      ["wwwl", ["l", "bt"], ["l", "bm"], "l", ["l", "sfr"], ["l", "sfr"], ["l", "sfr"], ["l", "sfg"], ["l", "sfr"], ["l", "sfr"], "llllwww"],
      ["wwwllll", ["l", "sfg"], ["l", "sfg"], ["l", "sfr"], ["l", "sfg"], ["l", "sfr"], ["l", "sfr"], "l", ["l", "pl"], "lwwww"],
      ["wwwwlll", ["l", "sfg"], ["l", "sfg"], ["l", "sfr"], ["l", "sfr"], ["l", "sfg"], ["l", "sfr"], "lllwwww"],
      ["wwww", ["l", "pa"], ["l", "rc"], "l", ["l", "sfg"], ["l", "sfg"], ["l", "sfg"], ["l", "sfr"], ["l", "sfg"], ["l", "sfg"], "ll", ["l", "rc"], "lwww"],
      ["wwwll", ["l", "fa"], ["l", "sk"], "lllllll", ["l", "rc"], ["l", "fa"], "lwww"],
      ["wwwlll", ["l", "pa"], ["l", "rc"], ["l", "pa"], ["l", "rc"], "llllwwwwww"],
      "wwwwwwwwwwwwwwwwwwww"
    ],
    dim: {
      x: 20,
      y: 12
    }
  },
  {
    name: "Pokti Okti (141.isl)",
    noPadding: true,
    field: [
      "wwwwwwwwwwwwwwwwwwww",
      "wwwwwwwwwwwwwwwwwwww",
      "wwwwwwlllllllwwwwwww",
      ["wwwww", ["l", "pa"], "llllllllwwwwww"],
      ["wwwllllllll", ["l", "pa"], "ll", ["l", "pa"], "wwwww"],
      ["wwwll", ["l", "sq"], "ll", ["l", "pa"], "llllllwwwww"],
      ["ww", ["l", "pa"], "lllllllllllllwwww"],
      ["w", ["l", "ho"], ["l", "rc"], "lllllll", ["l", "pa"], "llllllwww"],
      ["wlll", ["l", "pl"], "ll", ["l", "pa"], "llll", ["l", "wh"], "llllwww"],
      ["wl", ["l", "pa"], "llllllllllll", ["l", "pa"], "lwww"],
      "wwwllllllllwwwwwwwww",
      "wwwwwwwwwwwwwwwwwwww"
    ],
    dim: {
      x: 20,
      y: 12
    }
  },
  {
    name: "Oktapka (142.isl)",
    noPadding: true,
    field: [
      ["wwwwwl", ["l", "pa"], ["l", "rc"], "llwwwwwwwwww"],
      ["wwwww", ["l", "pa"], "llllllwwwwllww"],
      ["www", ["l", "ho"], ["l", "pa"], "ll", ["l", "sq"], "ll", ["l", "rc"], "lllllllww"],
      ["www", ["l", "sq"], "l", ["l", "pl"], "l", ["l", "rc"], "lllllwwlllww"],
      ["wwwllllll", ["l", "rc"], "llllwwlwww"],
      ["wwll", ["l", "pl"], "l", ["l", "rc"], "llll", ["l", "rc"], "lllllwww"],
      ["ww", ["l", "rc"], "llll", ["l", "wh"], ["l", "rc"], "llll", ["l", "sq"], "lllwww"],
      ["wwl", ["l", "pa"], "lllllllll", ["l", "rc"], "lllwww"],
      ["wwwll", ["l", "rc"], ["l", "sq"], "ll", ["l", "bx"], "lllllwlwww"],
      ["wwwlllllll", ["l", "bx"], "lllllllww"],
      ["wwww", ["l", "sq"], "lllllllwwwlllww"],
      "wwwwwwwwwwwwwwwwwwww"
    ],
    dim: {
      x: 20,
      y: 12
    }
  },
  {
    name: "Wampirki Korona (143.isl)",
    noPadding: true,
    field: [
      ["wwwwwl", ["l", "pa"], ["l", "rc"], "llwwwwwwwwww"],
      ["wwww", ["l", "ho"], ["l", "pa"], "ll", ["l", "rc"], ["l", "pa"], "wwwwwwllww"],
      "wwwwllllllllllllllww",
      ["wwwlll", ["l", "pa"], "ll", ["l", "rc"], "llwwwlllww"],
      ["wwwllllllll", ["l", "rc"], "wwwwlwww"],
      ["wwll", ["l", "pl"], "l", ["l", "wh"], "ll", ["l", "rc"], ["l", "pa"], ["l", "pa"], ["l", "rc"], ["l", "pa"], "wwlwww"],
      ["ww", ["l", "rc"], "llll", ["l", "pa"], ["l", "rc"], ["l", "pa"], "l", ["l", "sq"], "llwwlwww"],
      ["wwl", ["l", "pa"], "l", ["l", "rc"], ["l", "pa"], ["l", "sq"], "llllllwwlwww"],
      ["wwwl", ["l", "pa"], ["l", "pa"], "lll", ["l", "bx"], "llwwwwlwww"],
      ["wwwl", ["l", "rc"], ["l", "sq"], "llllllllllllww"],
      "wwwwllllllllwwwlllww",
      "wwwwwwwwwwwwwwwwwwww"
    ],
    dim: {
      x: 20,
      y: 12
    }
  },
  {
    name: "Wyona Lekoa (144.isl)",
    noPadding: true,
    field: [
      "wwwwwwwwwwwwwwwwwwww",
      "wwwwwwwwwwwwwwwwwwww",
      "wwwwwwwwwwwwwwwwwwww",
      ["wwwwwww", ["l", "ho"], ["l", "rc"], "llwwwwwwwww"],
      "wwwwwwwlllllwwllwwww",
      ["wwwwwlll", ["l", "pl"], "ll", ["l", "rc"], "wl", ["l", "rc"], ["l", "sq"], "lwww"],
      ["wwwwll", ["l", "sq"], "ll", ["l", "sb"], "ll", ["l", "rc"], "ll", ["l", "rc"], "llww"],
      ["wwwwl", ["l", "sq"], ["l", "bx"], ["l", "sq"], "llll", ["l", "sk"], "lllllww"],
      ["wwwwll", ["l", "sq"], "ll", ["l", "wh"], "ll", ["l", "rc"], "l", ["l", "rc"], ["l", "sq"], "llww"],
      "wwwwwwlllllwwwwwwwww",
      "wwwwwwwwwwwwwwwwwwww",
      "wwwwwwwwwwwwwwwwwwww"
    ],
    dim: {
      x: 20,
      y: 12
    }
  },
  {
    name: "Ikliaskahana (145.isl)",
    noPadding: true,
    field: [
      "wwwwwwwwwwwwwwwwwwww",
      ["wwwwwwwwwwwww", ["l", "pa"], ["l", "ho"], ["l", "pa"], "wwww"],
      "wwwwwwwwwwllllllllww",
      ["wwwwwwwwwwll", ["l", "sq"], ["l", "tp"], "l", ["l", "wh"], "llww"],
      ["wwwwwwwwwww", ["l", "sq"], "lllllwww"],
      ["wwwllllwwwwll", ["l", "bx"], "l", ["l", "bx"], "lwww"],
      ["wwwlll", ["l", "pl"], "lwwwwll", ["l", "bx"], "lwwww"],
      ["wwll", ["l", "sq"], "lllwwwwwwwwwwww"],
      ["wwl", ["l", "sq"], ["l", "bx"], ["l", "sq"], "llwwwwwwwwwwww"],
      ["wwll", ["l", "sq"], ["l", "tp"], "llwwwwwwwwwwww"],
      "wwwwlllwwwwwwwwwwwww",
      "wwwwwwwwwwwwwwwwwwww"
    ],
    dim: {
      x: 20,
      y: 12
    }
  },
  {
    name: "Anamiliski (146.isl)",
    noPadding: true,
    field: [
      "wwwwwwwwwwwwwwwwwwww",
      ["wwwwwwwww", ["l", "ho"], ["l", "pa"], "wwwwwwwww"],
      "wwwwwwwwlllwwwwwwwww",
      ["wwwwwwwwl", ["l", "pl"], "llwwwwwwww"],
      ["wwwwwwwl", ["l", "bc"], ["l", "sq"], ["l", "bc"], ["l", "sq"], "lwwwwwww"],
      ["wwwwwwwl", ["l", "bc"], ["l", "st"], ["l", "bc"], ["l", "st"], ["l", "sq"], "wwwwwww"],
      ["wwwwwww", ["l", "sq"], ["l", "bc"], ["l", "bc"], ["l", "mc"], ["l", "bc"], ["l", "sq"], "wwwwwww"],
      ["wwwwwwwl", ["l", "sq"], ["l", "st"], ["l", "bc"], ["l", "st"], "lwwwwwww"],
      ["wwwwwwwll", ["l", "sq"], ["l", "bc"], ["l", "sq"], "lwwwwwww"],
      "wwwwwwwllllllwwwwwww",
      ["wwwwwwwwwl", ["l", "wh"], "lwwwwwwww"],
      "wwwwwwwwwllwwwwwwwww"
    ],
    dim: {
      x: 20,
      y: 12
    }
  },
  {
    name: "Kings Kross (147.isl)",
    noPadding: true,
    field: [
      ["wwww", ["l", "pa"], ["l", "rc"], ["l", "ho"], ["l", "pa"], "llwwwwwwwwww"],
      "wwwwllllllwwwwwwwwww",
      "wwwwwwwwwwwwwwwwwwww",
      "wwwwwwwwwwwwwwwwwwww",
      ["w", ["l", "sq"], "lllllllllllllll", ["l", "sq"], "ww"],
      "wlwwwllwwlwwllwwwlww",
      ["wlwww", ["l", "bx"], "www", ["l", "bx"], "wwwlwwwlww"],
      ["wllllllll", ["l", "wh"], "llllllllww"],
      "wlwwllwwwlwwwllwwlww",
      "wlwwwlwwwlwwwlwwwlww",
      ["wllll", ["l", "sq"], "lllllll", ["l", "sq"], "lll", ["l", "pl"], "ww"],
      "wwwwwwwwwwwwwwwwwwww"
    ],
    dim: {
      x: 20,
      y: 12
    }
  },
  {
    name: "Impuralani (148.isl)",
    noPadding: true,
    field: [
      "wwwwwwwwwwwwwwwwwwww",
      "wwwwwwwwwwwwwwwwwwww",
      "wwwwwwwwwwwwwwwwwwww",
      "wwwwwwwllllllllwwwww",
      "wwwwwwwllllllllllwww",
      ["wwww", ["l", "pa"], ["l", "ho"], ["l", "pa"], "l", ["l", "pl"], "lg", ["g", "pa"], "gllllwww"],
      ["wwwwlllllg", ["g", "rc"], "g", ["g", "pa"], "gglllww"],
      ["wwwwll", ["l", "br"], "llg", ["g", "pa"], ["g", "rc"], "g", ["g", "rc"], "glllww"],
      ["wwwwwllllggggg", ["l", "bb"], "lllww"],
      "wwwwwwwlllllllllwwww",
      "wwwwwwwwwwwwwwwwwwww",
      "wwwwwwwwwwwwwwwwwwww"
    ],
    dim: {
      x: 20,
      y: 12
    }
  },
  {
    name: "Barrilhonga (149.isl)",
    noPadding: true,
    field: [
      "wwwwwwwwwwwwwwwwwwww",
      "wwwwwwwwwwwwwwwwwwww",
      "wwwwwwwwwwwwwwwwwwww",
      "wwwwwwwwwwwwwwwwwwww",
      ["wwwwwwwwwll", ["l", "rc"], "llwwwwww"],
      ["wwwwwwwwl", ["l", "br"], "llllwwwwww"],
      ["wwwwwwwwlll", ["l", "rc"], ["l", "bb"], "lwwwwww"],
      ["wwwwwww", ["l", "ho"], "l", ["l", "br"], "l", ["l", "rc"], ["l", "bb"], "lwwwwww"],
      ["wwwwwwwl", ["l", "pl"], "ll", ["l", "rc"], ["l", "bb"], "lwwwwww"],
      ["wwwwwwwll", ["l", "br"], "llllwwwwww"],
      ["wwwwwwwwlll", ["l", "rc"], "lwwwwwww"],
      "wwwwwwwwwwwwwwwwwwww"
    ],
    dim: {
      x: 20,
      y: 12
    }
  },
  {
    name: "Toskalia (150.isl)",
    noPadding: true,
    field: [
      "wwwwwwwllllllwwwwwww",
      ["wwwww", ["l", "ho"], ["l", "pa"], "llgg", ["g", "pa"], "gllwwwww"],
      ["wwwwlll", ["l", "rc"], ["l", "pa"], "g", ["g", "pa"], "gg", ["l", "pa"], ["l", "rc"], "llwww"],
      ["wwwllggg", ["l", "rc"], "llllll", ["l", "rc"], ["l", "pa"], "www"],
      ["wwwlg", ["g", "pa"], ["g", "rc"], "gl", ["l", "br"], "lll", ["l", "pl"], "l", ["l", "pa"], "lwww"],
      ["wwwlgggll", ["l", "br"], "l", ["g", "pa"], "g", ["l", "bb"], ["l", "bb"], ["l", "rc"], ["l", "rc"], "www"],
      ["wwwlll", ["l", "rc"], "ll", ["l", "br"], "lgg", ["l", "bb"], ["l", "bb"], ["l", "pa"], "lwww"],
      ["wwwllllll", ["l", "br"], "lllll", ["l", "rc"], "wwww"],
      ["wwwwllg", ["g", "pa"], "ll", ["g", "pa"], "gglllwwww"],
      ["wwwwllgg", ["l", "rc"], ["l", "rc"], "g", ["g", "rc"], "g", ["l", "pa"], ["l", "rc"], "wwwww"],
      "wwwwwwllllllllwwwwww",
      "wwwwwwwwwwwwwwwwwwww"
    ],
    dim: {
      x: 20,
      y: 12
    }
  },
  {
    name: "Palipa Pipa (151.isl)",
    noPadding: true,
    field: [
      "wwwwwwwwwwwwwwwwwwww",
      "wwwwwwwwwwwwwwwwwwww",
      ["wwwwwl", ["l", "rc"], ["l", "ho"], ["l", "rc"], "lllwwl", ["l", "pa"], ["l", "ho"], "lw", ["w", "by"]],
      ["wwwwll", ["l", "rc"], "ll", ["l", "sb"], "lllwl", ["l", "rc"], "lllw"],
      ["wwwwl", ["l", "ci"], "ll", ["l", "pl"], "l", ["l", "rc"], ["l", "rc"], "l", ["l", "rc"], "l", ["l", "rc"], "lwlw"],
      ["wwww", ["l", "ci"], ["l", "pa"], ["l", "rc"], "lllllll", ["l", "sk"], ["l", "br"], "llww"],
      ["wwwwlll", ["l", "rc"], ["l", "bb", "br"], ["l", "bb"], ["l", "rc"], "lll", ["l", "rc"], "lllww"],
      ["wwwwl", ["l", "ci"], "lll", ["l", "bb", "br"], ["l", "bb"], ["l", "bb", "br"], ["l", "rc"], ["l", "rc"], "llwwww"],
      ["wwww", ["l", "pa"], ["l", "bb"], "ll", ["l", "rc"], ["l", "rc"], "ll", ["l", "rc"], "llwwwww"],
      ["wwwwl", ["l", "pa"], ["l", "pa"], "lll", ["l", "br"], "llllwwwww"],
      "wwwwwlllllllwwwwwwww",
      ["wwwwww", ["w", "by"], "wwwwwwwwwwwww"]
    ],
    dim: {
      x: 20,
      y: 12
    }
  },
  {
    name: "Zarasonga (152.isl)",
    noPadding: true,
    field: [
      ["wwwwwwwwwwwwww", ["w", "by"], "wwwww"],
      "wwwwwwllwwwwwwwwwwww",
      ["wwwwwl", ["l", "ci"], "ll", ["w", "ra", "pi"], "wwwwl", ["l", "pa"], ["l", "ho"], "lw", ["w", "by"]],
      ["wwwwlll", ["l", "br"], ["l", "pa"], ["l", "ph"], "wwwwl", ["l", "rc"], "lllw"],
      ["wwwwl", ["l", "ci"], ["l", "br"], "l", ["l", "ci"], "lwwwwwl", ["l", "pa"], "llw"],
      ["wwww", ["l", "ci"], ["l", "pa"], "ll", ["l", "br"], "lwwwwwwllww"],
      ["wwwwll", ["l", "br"], "l", ["l", "pa"], "l", ["l", "ci"], "ww", ["w", "by"], "wwwwww"],
      ["wwww", ["l", "br"], ["l", "ci"], ["l", "pa"], "l", ["l", "ci"], ["l", "pl"], "lwwwwwwwww"],
      [["w", "by"], "www", ["l", "pa"], ["l", "bb"], ["l", "bb"], ["l", "bb"], ["l", "bb"], ["l", "bb"], "lwwwwwwwww"],
      ["wwwwl", ["l", "pa"], ["l", "pa"], ["l", "pa"], ["l", "pa"], ["l", "pa"], "lwwwwwwwww"],
      "wwwwwlllwwwwwwwwwwww",
      ["wwwwww", ["w", "by"], "wwwwwwwwwwwww"]
    ],
    dim: {
      x: 20,
      y: 12
    }
  },
  {
    name: "Tarukioha (153.isl)",
    noPadding: true,
    field: [
      "wwwwwwwwwwwwwwwwwwww",
      "wwwwwwwwwwwwwwwwwwww",
      "wwwwwwwwwwwwwwwwwwww",
      ["w", ["l", "rc"], ["l", "ho"], ["l", "pa"], "lwwwwwwwwwl", ["l", "pa"], "lwww"],
      ["wlllllll", ["w", "ic"], ["w", "ic"], ["w", "ic"], ["w", "ic"], ["w", "ic"], ["w", "ic"], "lllllw"],
      ["wll", ["l", "br"], ["l", "sq"], "lll", ["w", "ic"], ["w", "ic"], ["w", "ic"], ["w", "ic"], "lllllllw"],
      ["wll", ["l", "sq"], ["l", "br"], "l", ["l", "pl"], "l", ["w", "ic"], ["w", "ic"], ["w", "ic"], ["w", "ic"], "llll", ["l", "bb"], "llw"],
      ["wll", ["l", "br"], ["l", "sq"], "lll", ["w", "ic"], ["w", "ic"], ["w", "ic"], ["w", "ic"], "ll", ["l", "bb"], ["l", "wh"], "lllw"],
      ["wlllllll", ["w", "ic"], ["w", "ic"], ["w", "ic"], ["w", "ic"], "llll", ["l", "bb"], "llw"],
      ["wllllll", ["w", "ic"], ["w", "ic"], ["w", "ic"], ["w", "ic"], ["w", "ic"], "lllll", ["l", "rc"], "lw"],
      ["wwwwwwwwwwwwwwl", ["l", "rc"], ["l", "pa"], "llw"],
      "wwwwwwwwwwwwwwwwwwww"
    ],
    dim: {
      x: 20,
      y: 12
    }
  },
  {
    name: "Kohoro Kibahoro (154.isl)",
    noPadding: true,
    field: [
      [["l", "rc"], ["l", "rc"], ["l", "rc"], ["l", "rc"], ["l", "rc"], "wwwwww", ["l", "pa"], ["l", "ho"], ["l", "pa"], "wwwwww"],
      [["l", "rc"], ["l", "bb"], ["l", "bb"], ["l", "bb"], ["l", "rc"], ["w", "bw"], ["w", "bw"], ["w", "bw", "bm"], ["w", "bw"], ["w", "bw"], "llllllllww"],
      [["l", "rc"], ["l", "rc"], ["l", "rc"], ["l", "rc"], "wwwwwwlllllll", ["l", "bt"], "lw"],
      ["wwwwwlllwwwwwlllg", ["g", "rc"], "lw"],
      ["wwwl", ["l", "ky"], ["g", "rc"], ["g", "ci"], "g", ["l", "pa"], "wwwwwwl", ["g", "pa"], "glw"],
      ["www", ["l", "pa"], "g", ["g", "ci"], ["g", "pl"], ["g", "br"], "lllwwwwlgglw"],
      ["www", ["l", "ch"], "g", ["g", "br"], "gglllwwwwll", ["l", "tr"], "lw"],
      ["wl", ["w", "ra", "pi"], "lllllllwwwwwllllw"],
      ["wl", ["l", "ph"], "llllllwwwww", ["l", "pa"], "g", ["g", "pa"], "g", ["l", "rc"], "w"],
      ["wlllllllwwwllll", ["g", "rc"], "gglw"],
      ["wwwww", ["w", "ra"], "l", ["l", "pa"], "wwll", ["l", "br"], ["l", "tr"], ["l", "bx"], "ll", ["l", "pa"], "lw"],
      "wwwwwwwwwwllllllwwww"
    ],
    dim: {
      x: 20,
      y: 12
    }
  },
  {
    name: "Flyfly Leaf (155.isl)",
    noPadding: true,
    field: [
      "wwwwwwwwwwwwwwwwwwww",
      "wwwwwwwlllwwwwwwwwww",
      ["wwwwwwl", ["l", "lf2"], "llwwwwwwwwww"],
      "wwwwwllllllllwwwwwww",
      ["wwwwwlll", ["l", "pa"], "llllwwll", ["l", "pa"], "lw"],
      ["wwwwwl", ["l", "ls"], "llll", ["l", "pl"], "lwwl", ["l", "rc"], ["l", "ho"], ["l", "pa"], "w"],
      ["wwwwwlll", ["l", "pb"], "llllwwllllw"],
      ["wwwww", ["l", "rc"], "llll", ["l", "sl"], "lwwww", ["l", "pa"], "llw"],
      ["wwwwwl", ["l", "rc"], ["l", "co"], ["l", "rc"], "lllwwwwwlww"],
      ["wwwwwwll", ["l", "rc"], ["l", "rc"], "wwwwwwwlww"],
      "wwwwwwwlwwwwwwwwwlww",
      "wwwwwwwlllllllllllww"
    ],
    dim: {
      x: 20,
      y: 12
    }
  },
  {
    name: "Muhodara (156.isl)",
    noPadding: true,
    field: [
      "wwwwwwwwwwwwwwwwwwww",
      ["wwwwwwwwllllll", ["l", "cl"], "wwwww"],
      ["wwww", ["l", "cl"], "lllll", ["l", "pl"], "llll", ["l", "rc"], "wwww"],
      ["wwww", ["l", "rc"], "lllllll", ["l", "lf0"], "ll", ["l", "rc"], "lwww"],
      ["wwwwl", ["l", "rc"], "llg", ["g", "pa"], "glllll", ["l", "rc"], "www"],
      ["wwwwll", ["l", "pa"], "gg", ["g", "rc"], ["g", "pa"], "lll", ["l", "ls"], "llwww"],
      ["wwwwwwlg", ["g", "pa"], "ggllll", ["l", "rc"], ["l", "pp"], "www"],
      ["wwwwwwlggg", ["l", "pb"], "l", ["l", "sl"], "l", ["l", "rc"], "ll", ["l", "ho"], ["l", "pa"], "w"],
      ["wwwwwwwlll", ["l", "pb"], "lll", ["l", "pp"], "llllw"],
      ["wwwwwwwllllll", ["l", "rc"], "lwwwww"],
      "wwwwwwwwwwwwwwwwwwww",
      "wwwwwwwwwwwwwwwwwwww"
    ],
    dim: {
      x: 20,
      y: 12
    }
  },
  {
    name: "Patura Tuka Tu (157.isl)",
    noPadding: true,
    field: [
      "wwwwwwwwwwwwwwwwwwww",
      ["www", ["w", "bw", "sq"], "llwwwwwwlllwwwww"],
      ["wwwlllwwwww", ["l", "pb"], "l", ["l", "lf0"], "lllwww"],
      ["w", ["w", "bw", "sq"], "ll", ["l", "pa"], "lwwwwwl", ["l", "tr"], "ll", ["l", "bx"], "llww"],
      ["ww", ["l", "bx"], "lll", ["w", "ra"], "wwwwwllllllww"],
      ["w", ["w", "bw", "sq"], "lllllwwwwwwwwwwwww"],
      ["wwll", ["l", "pl"], ["l", "co"], ["l", "pa"], "wwwwwwwwwwwww"],
      ["wwl", ["l", "pa"], ["l", "rc"], "lwwwwwwwwwwwwww"],
      ["ww", ["l", "rc"], "l", ["l", "wh"], "lwwwwl", ["l", "pa"], "llwwwlll"],
      ["ww", ["l", "ho"], "lllwwwl", ["l", "rc"], ["l", "ls"], "llww", ["l", "bx"], "l", ["l", "tr"], "l"],
      ["wwlllwwwwllllwwwl", ["l", "sl"], "ll"],
      "wwwwwwwwwwwwwwwwlllw"
    ],
    dim: {
      x: 20,
      y: 12
    }
  },
  {
    name: "Kasi Naiduhu (158.isl)",
    noPadding: true,
    field: [
      "wwwwwwwwwwwwwwwwwwww",
      ["w", ["w", "hp"], ["w", "hp"], ["w", "hp", "pb"], "wwwwwww", ["l", "pa"], ["l", "ho"], ["l", "pa"], "l", ["l", "cl"], "wwww"],
      ["w", ["w", "hp"], ["w", "hp", "fgg"], ["w", "hp"], ["w", "hp"], ["w", "hp"], "wwwwwlll", ["l", "rc"], "ll", ["l", "rc"], "ww"],
      ["ww", ["w", "hp"], ["w", "hp"], ["w", "hp", "bx"], ["w", "hp", "pb"], "www", ["l", "cl"], "l", ["l", "cl"], "llll", ["l", "rc"], "lww"],
      ["www", ["w", "hp", "pb"], ["w", "hp"], ["w", "hp"], "wwwl", ["g", "rc"], "gg", ["g", "pa"], "llll", ["l", "cl"], "w"],
      ["wwww", ["w", "hp"], "wwwwlgg", ["g", "lf0"], ["g", "rc"], "gllllw"],
      ["wwww", ["w", "hp"], "wwwll", ["l", "re"], "ggggllllw"],
      ["wwww", ["w", "hp"], "wwll", ["l", "ls"], "l", ["l", "sp"], "g", ["g", "pa"], "gl", ["l", "pl"], "lww"],
      ["wwww", ["w", "hp"], "l", ["l", "pp"], "lll", ["l", "pa"], "lllllllww"],
      ["wwwl", ["l", "pp"], "llll", ["l", "pa"], ["l", "crg"], "lllllllww"],
      ["wwwll", ["l", "pp"], ["l", "pp"], "llllll", ["l", "pa"], "l", ["l", "sl"], "lwww"],
      ["wwwwwwlllwww", ["w", "ra"], "llllwww"]
    ],
    dim: {
      x: 20,
      y: 12
    }
  },
  {
    name: "Misterkiosa (159.isl)",
    noPadding: true,
    field: [
      ["wwwwwwww", ["w", "bw"], ["w", "bw"], "wwwwwwwwl", ["l", "ho"]],
      ["wwww", ["l", "pa"], ["l", "pa"], "w", ["w", "bw"], ["w", "bw"], ["w", "bw"], ["w", "ic"], ["w", "bw"], ["w", "bw"], ["w", "bw"], ["w", "bw"], ["w", "bw"], ["w", "bw"], ["w", "bw"], "ll"],
      ["www", ["l", "pa"], "gg", ["l", "pa"], ["w", "bw"], ["w", "bw"], "wwww", ["w", "ic"], "wwwww", ["w", "bw"]],
      ["ww", ["w", "ra"], "lgggll", ["l", "pa"], "llllll", ["w", "ic"], ["w", "bw"], ["w", "bw"], ["w", "bw"]],
      ["www", ["l", "pa"], ["g", "fsy"], ["g", "fly"], "gg", ["l", "sh"], ["l", "rc"], "lllllllwww"],
      ["ww", ["l", "pa"], ["g", "pb"], ["g", "fly"], ["g", "fly"], ["g", "fly"], "gg", ["l", "sh", "pa"], "ll", ["l", "bb", "sq"], ["l", "br"], ["l", "bb", "sq"], "lllww"],
      ["ww", ["l", "rc"], "g", ["g", "ls"], ["g", "fsy"], "ggg", ["l", "pa"], "ll", ["l", "br"], ["l", "wh"], ["l", "br"], "lllww"],
      ["ww", ["l", "rc"], "g", ["g", "fly"], ["g", "fly"], ["g", "fsy"], "g", ["l", "rc"], "lll", ["l", "bb", "sq"], ["l", "br"], ["l", "bb", "sq"], ["l", "wb"], "llww"],
      ["wl", ["l", "pa"], "gggg", ["l", "pa"], "llwwllllllww"],
      ["wl", ["l", "pa"], ["l", "pa"], ["l", "lf0"], ["l", "cl"], ["l", "rc"], ["l", "se"], ["w", "ic"], "wwwwllll", ["l", "rc"], "lw"],
      ["w", ["l", "pl"], "l", ["l", "ci"], ["l", "sl"], ["l", "re"], ["l", "ci"], ["l", "ci"], ["l", "pp"], ["l", "ci"], "wwwwww", ["l", "rc"], "l", ["w", "ra", "pi"], "w"],
      ["www", ["l", "ci"], ["l", "ci"], ["l", "ci"], "ww", ["l", "ci"], ["l", "ci"], ["w", "hp"], ["w", "hp"], ["w", "hp"], ["w", "hp"], ["w", "hp"], ["w", "hp"], "ll", ["w", "ph"], "w"]
    ],
    dim: {
      x: 20,
      y: 12
    }
  },
  {
    name: "Robinsons Island (160.isl)",
    noPadding: true,
    field: [
      [["l", "pa"], ["l", "ho"], ["l", "pa"], ["l", "pa"], "l", ["l", "ch"], "llll", ["l", "ci"], "l", ["l", "ci"], "lllllll"],
      [["l", "pa"], ["l", "pp"], "llllll", ["l", "se"], ["l", "ci"], "l", ["l", "ci"], "l", ["l", "ci"], "l", ["l", "sh"], ["g", "pa"], ["g", "pb"], "gl"],
      [["l", "pa"], ["l", "pp"], "l", ["l", "sb"], ["l", "wb"], "l", ["l", "wh"], "lllwwwwl", ["l", "sh"], "g", ["g", "ky"], ["g", "rc"], "l"],
      [["l", "pa"], "ll", ["l", "rc"], ["l", "bx"], "ll", ["l", "rc"], ["l", "rc"], ["l", "rc"], ["l", "bc"], "wwwlllg", ["g", "pa"], "l"],
      ["llllww", ["l", "rc"], ["l", "bc"], ["w", "ra"], "l", ["l", "rc"], "wwwwwwlll"],
      ["w", ["w", "by"], "wwwwwwwwwwwwwww", ["l", "bx"], "ll"],
      ["ww", ["w", "ra"], "wwwwwwwwwwwww", ["w", "ra", "pi"], "lll"],
      [["l", "pa"], ["l", "pa"], ["l", "pa"], ["l", "pa"], ["l", "pa"], ["l", "pa"], "w", ["w", "by"], "wwwwwwwl", ["l", "ph"], ["l", "lf3"], "ll"],
      [["l", "rc"], ["l", "cl"], "lll", ["l", "sk"], "l", ["l", "bm"], "llllll", ["l", "rc"], "lll", ["l", "pl"], "l"],
      [["l", "pa"], ["l", "mc"], "lll", ["l", "pa"], ["l", "pp"], ["l", "rc"], ["l", "pa"], ["l", "pa"], "llll", ["l", "pa"], "lllll"],
      [["l", "pa"], "lll", ["l", "clo"], ["l", "pa"], "l", ["l", "bc"], "l", ["l", "bc"], ["l", "pa"], "l", ["l", "cl"], ["l", "bt"], "l", ["l", "rc"], "l", ["l", "sl"], "ll"],
      [["l", "pa"], ["l", "pa"], ["l", "pa"], ["l", "pa"], ["l", "pa"], ["l", "pa"], ["l", "bc"], "l", ["l", "bc"], "ll", ["l", "pa"], "lll", ["l", "pa"], "llll"]
    ],
    dim: {
      x: 20,
      y: 12
    }
  },
  {
    name: "Lalaldini (161.isl)",
    noPadding: true,
    field: [
      [["w", "sn0"], ["w", "sn1"], ["w", "sn2"], "wwwwwwwwwwwwwwwww"],
      ["wwww", ["l", "rc"], "lllwwwwwwwwwwww"],
      ["www", ["l", "pa"], "ll", ["l", "pl"], "lwwwwww", ["l", "sg0"], "lwwww"],
      ["wwwllll", ["l", "sg0"], ["w", "ra", "pi"], "www", ["l", "rc"], "l", ["l", "tp"], "lwwww"],
      ["wwwll", ["l", "bx"], "ll", ["l", "ph"], "lwwl", ["l", "rc"], ["l", "pa"], "lllww"],
      ["www", ["l", "pa"], "lllllll", ["l", "ch"], "lll", ["l", "rc"], ["l", "bt"], "llw"],
      ["ww", ["l", "pa"], ["l", "ho"], ["l", "rc"], "l", ["l", "ci"], ["l", "ci"], ["l", "ci"], "lll", ["l", "bm"], ["l", "bm"], "l", ["l", "pa"], "lllw"],
      ["wwllll", ["l", "ci"], ["l", "ky"], ["l", "ci"], "l", ["l", "rc"], ["l", "pa"], "ll", ["l", "bx"], "lwwww"],
      ["wwll", ["l", "pa"], "l", ["l", "ci"], ["l", "ci"], ["l", "ci"], ["l", "pa"], "lwllllwwww"],
      ["wwl", ["l", "rc"], "ll", ["l", "rc"], "lllwwll", ["l", "tp"], "lwwww"],
      ["wwwwll", ["l", "sg0"], ["l", "rc"], "lwwwwlllwwww"],
      "wwwwwwwwwwwwwwwwwwww"
    ],
    dim: {
      x: 20,
      y: 12
    }
  },
  {
    name: "Gandia Belika (162.isl)",
    noPadding: true,
    field: [
      ["wllllllll", ["l", "pa"], "lllllllwww"],
      ["wll", ["l", "pa"], "llllggg", ["l", "pa"], ["l", "fa"], ["l", "sfg"], ["l", "sfr"], ["l", "sfg"], "lwww"],
      ["ll", ["l", "sfg"], ["l", "sfr"], ["l", "sfg"], ["l", "sfg"], ["l", "sfg"], "lg", ["g", "pa"], ["g", "pa"], "gl", ["l", "sfg"], ["l", "sfg"], ["l", "sfg"], "llww"],
      ["ll", ["l", "sfr"], ["l", "sfr"], "l", ["l", "sfg"], ["l", "sfr"], "lgg", ["g", "pa"], "glll", ["l", "sfr"], ["l", "pa"], ["l", "pa"], ["l", "ho"], ["l", "pa"]],
      ["l", ["l", "fa"], "l", ["l", "sfg"], ["l", "sfg"], "l", ["l", "sfg"], "ll", ["g", "pa"], "ggl", ["l", "pa"], ["l", "sfr"], ["l", "sfg"], "llll"],
      ["lll", ["l", "sfr"], ["l", "sfr"], ["l", "pa"], "lllg", ["g", "pa"], "gl", ["l", "sfg"], ["l", "sfg"], "l", ["l", "pa"], "l", ["l", "pl"], "l"],
      ["wwll", ["l", "sfg"], ["l", "sfg"], "lllggll", ["l", "sfg"], ["l", "sfg"], ["l", "sfg"], ["l", "sfg"], "llw"],
      ["wwwll", ["l", "sfg"], ["l", "sfg"], ["l", "sfg"], "l", ["g", "pa"], ["g", "pa"], "ll", ["l", "pa"], ["l", "sfr"], ["l", "sfr"], "llww"],
      ["wwwll", ["l", "pa"], ["l", "sfr"], ["l", "sfr"], "gggl", ["l", "sfr"], ["l", "sfg"], ["l", "sfg"], ["l", "sfr"], "lwww"],
      ["wwwwl", ["l", "sfg"], ["l", "sfg"], ["l", "sfr"], "g", ["g", "pa"], "g", ["l", "sfg"], ["l", "sfg"], "llllwww"],
      ["wwwwwll", ["l", "sfg"], ["l", "sfg"], ["l", "sfg"], ["l", "sfg"], ["l", "sfg"], "lllwwwww"],
      ["wwwwwwwll", ["l", "pa"], "llwwwwwwww"]
    ],
    dim: {
      x: 20,
      y: 12
    }
  },
  {
    name: "Tuu Senkiki (163.isl)",
    noPadding: true,
    field: [
      "wwwwwwwwwwwwwwwwwwww",
      "wwwwwwwwwwwwwwwwwwww",
      "wwwwwwwwwwwwwwwwwwww",
      ["wwwwwww", ["l", "pa"], ["l", "ho"], ["l", "rc"], "wwwwwwwwww"],
      "wwwwwwlllllllwwwwwww",
      "wwwwwllllllllllwwwww",
      ["wwwwwl", ["l", "sfr"], ["l", "sfg"], ["l", "sfg"], ["l", "sfr"], "l", ["l", "fa"], "l", ["l", "fa"], "lwwwww"],
      ["wwwwl", ["l", "rc"], ["l", "sfr"], ["l", "sfr"], ["l", "sfr"], ["l", "sfr"], "ll", ["l", "pl"], "llwwwww"],
      ["wwww", ["l", "pa"], "l", ["l", "sfr"], ["l", "sfg"], ["l", "sfg"], ["l", "sfr"], "l", ["l", "fa"], "l", ["l", "fa"], "lwwwww"],
      "wwwwwllllllllllwwwww",
      "wwwwwwwwllwwwwwwwwww",
      "wwwwwwwwwwwwwwwwwwww"
    ],
    dim: {
      x: 20,
      y: 12
    }
  },
  {
    name: "Transoaka (164.isl)",
    noPadding: true,
    field: [
      "wwwwwwwwwwwwwwwwwwww",
      "wwwwllwwwwwwwllwwwww",
      "wwllllwwwllwllllwwww",
      ["wwl", ["l", "fa"], "l", ["l", "fa"], "lwwl", ["l", "pl"], "l", ["l", "fa"], "l", ["l", "fa"], "lwwww"],
      "wwllllllllllllllwwww",
      ["wwwll", ["l", "sfg"], ["l", "sfg"], ["l", "sfr"], ["l", "sfr"], ["l", "sfg"], ["l", "sfg"], ["l", "sfg"], ["l", "sfg"], "lwwwwww"],
      ["wwwll", ["l", "sfr"], ["l", "sfr"], ["l", "sfr"], ["l", "sfg"], ["l", "sfg"], ["l", "sfr"], ["l", "sfr"], ["l", "sfr"], "llwwwww"],
      ["wwwll", ["l", "sfg"], ["l", "sfg"], ["l", "sfr"], ["l", "sfr"], ["l", "sfg"], ["l", "sfr"], ["l", "sfg"], ["l", "sfg"], "ll", ["l", "pa"], ["l", "ho"], "www"],
      ["wwwlllll", ["l", "sfg"], ["l", "sfr"], "lllllll", ["l", "rc"], "ww"],
      ["wwwwwwwllllwwwwl", ["l", "pa"], "lww"],
      "wwwwwwwwwwwwwwwwwwww",
      "wwwwwwwwwwwwwwwwwwww"
    ],
    dim: {
      x: 20,
      y: 12
    }
  },
  {
    name: "Finkanlinda (165.isl)",
    noPadding: true,
    field: [
      "wwwwwwwwwwwwwwwwwwww",
      ["w", ["w", "sn0"], ["w", "sn1"], ["w", "sn2"], "wwwlllllwwww", ["l", "ho"], ["l", "pa"], "ww"],
      "wwwwwwwlggglwwwllllw",
      ["wwlllllgglgglll", ["l", "fa"], "l", ["l", "fa"], "lw"],
      ["wwlggggglllgglll", ["l", "pl"], "llw"],
      ["wwlg", ["g", "sg0"], "gll", ["l", "sfr"], ["l", "sfg"], ["l", "sfg"], "lg", ["l", "sp"], "l", ["l", "fa"], "l", ["l", "fa"], "lw"],
      ["wwlg", ["g", "sg0"], "ll", ["l", "sfg"], ["l", "sfr"], ["l", "sfr"], ["l", "sfg"], "lgggllllw"],
      ["wwlggll", ["l", "sfg"], ["l", "sfg"], ["l", "sfr"], ["l", "sfg"], ["l", "sfr"], "lgg", ["g", "sg0"], "gglw"],
      ["wwlggggll", ["l", "sfg"], ["l", "sfg"], ["l", "sfr"], "lll", ["l", "sp"], "gglw"],
      ["wwlllg", ["g", "sg0"], "glllllllggllw"],
      "wwwwlggggggggggglwww",
      "wwwwwlllllllllllwwww"
    ],
    dim: {
      x: 20,
      y: 12
    }
  },
  {
    name: "Sergioniona (166.isl)",
    noPadding: true,
    field: [
      ["wwwwwwww", ["l", "pa"], ["l", "ho"], ["l", "rc"], "lwwwwwwww"],
      "wwwlllwwllllwwwwwwww",
      ["wwwl", ["l", "fa"], "lllwwwwwlllwwww"],
      ["wwwllll", ["l", "pa"], "wwwwll", ["l", "fa"], "lwwww"],
      ["wwwl", ["l", "sb"], "ll", ["l", "rc"], "lllllllllwww"],
      ["wwlllll", ["l", "sk"], "l", ["l", "sfr"], ["l", "sfr"], ["l", "sfr"], ["l", "sfr"], ["l", "sfr"], ["l", "sfg"], "llwww"],
      ["wwll", ["l", "pl"], "l", ["l", "rc"], ["l", "pa"], "l", ["l", "sfr"], ["l", "sfr"], ["l", "bx"], ["l", "sfr"], ["l", "sfr"], ["l", "sfg"], "llwww"],
      ["wwllll", ["l", "pa"], "ll", ["l", "sfg"], ["l", "sfg"], ["l", "sfr"], ["l", "sfr"], ["l", "sfr"], ["l", "sfr"], "llwww"],
      ["wwl", ["l", "fa"], "ll", ["l", "rc"], "ll", ["l", "sfr"], ["l", "sfr"], ["l", "bx"], ["l", "sfr"], ["l", "sfg"], ["l", "sfg"], "lllww"],
      ["wwllll", ["l", "pa"], "ll", ["l", "sfr"], ["l", "sfr"], ["l", "sfg"], ["l", "sfr"], ["l", "sfg"], ["l", "sfr"], "l", ["l", "fa"], "lww"],
      ["wwwww", ["w", "ic"], ["w", "ic"], "lllllllllllww"],
      "wwwwwwwlllwwwwwwwwww"
    ],
    dim: {
      x: 20,
      y: 12
    }
  },
  {
    name: "Aroha Ozeanskia (167.isl)",
    noPadding: true,
    field: [
      ["wwllwwwwwwwwww", ["l", "rc"], "ll", ["w", "rc"], "ww"],
      ["w", ["l", "pa"], ["l", "ho"], "lwwwwwwwww", ["w", "rc"], ["l", "se"], ["l", "tp"], "ll", ["l", "rc"], "w"],
      ["wlllwwwwwwwww", ["w", "rc"], "l", ["l", "wb"], "l", ["l", "ci"], "lw"],
      ["wwllwwwwwwww", ["w", "rc"], "ll", ["l", "wh"], ["g", "pa"], ["g", "mc"], ["g", "pa"], "l"],
      ["wwwwwwwwwwwwwll", ["l", "sh"], "ggg", ["l", "ci"]],
      ["wwwwwwwwwwww", ["w", "rc"], ["l", "ci"], ["l", "bx"], "g", ["g", "pl"], "ggl"],
      ["wwwwwwwwwww", ["l", "rc"], "lllgg", ["l", "ci"], "ll"],
      ["wwwlll", ["w", "bw"], "wl", ["l", "bx"], "l", ["l", "sh"], "g", ["g", "bc"], "l", ["l", "rc"], "ll", ["l", "pa"], "w"],
      ["wl", ["l", "rc"], ["l", "ci"], "ll", ["w", "ra", "pi"], "w", ["l", "wb"], "lg", ["g", "bc"], "gg", ["l", "rc"], "wwwww"],
      ["wl", ["l", "se"], ["l", "tp"], ["l", "wh"], "l", ["l", "ph"], "wll", ["g", "bc"], "g", ["g", "bc"], "llwwwww"],
      ["www", ["l", "ci"], "lllwwlllllwwwwww"],
      "wwwwwwwwwwwwwwwwwwww"
    ],
    dim: {
      x: 20,
      y: 12
    }
  },
  {
    name: "Korrihaka (168.isl)",
    noPadding: true,
    field: [
      "wwwwwwwwwwwwwwwwwwww",
      ["wwl", ["l", "pa"], "wwwwwwwwwlllllww"],
      ["ww", ["l", "pa"], ["l", "ho"], ["l", "pa"], "llwwwwwlgggglww"],
      ["wwl", ["l", "pl"], "llllllllgg", ["g", "flr"], "gglww"],
      ["wwll", ["l", "fa"], ["l", "sfg"], ["l", "sfg"], ["l", "sfg"], ["l", "sfr"], ["l", "fa"], "llg", ["g", "rc"], ["g", "fsy"], "gglww"],
      ["wwwl", ["l", "sfg"], ["l", "sfg"], ["l", "sfg"], ["l", "sfr"], ["l", "sfr"], ["l", "sfr"], "lgg", ["g", "fsy"], "gggllw"],
      ["wwwl", ["l", "sfg"], ["l", "sfg"], ["l", "sfr"], ["l", "sfr"], ["l", "rc"], ["l", "sfg"], "lg", ["g", "fly"], "gg", ["g", "fsr"], "gllw"],
      ["wwwl", ["l", "sfr"], ["l", "sfr"], ["l", "sfr"], ["l", "rc"], ["l", "sfr"], ["l", "sfr"], "lgggggg", ["l", "sp"], "lw"],
      ["wwwl", ["l", "fa"], ["l", "sfg"], ["l", "sfr"], ["l", "sfr"], ["l", "sfr"], ["l", "fa"], "llllllllww"],
      "wwwwllllllllwwwwwwww",
      "wwwwwwwwwwwwwwwwwwww",
      "wwwwwwwwwwwwwwwwwwww"
    ],
    dim: {
      x: 20,
      y: 12
    }
  },
  {
    name: "Koba Boka (169.isl)",
    noPadding: true,
    field: [
      "wwwwwwwwwwwwwwwwwwww",
      ["wwwww", ["l", "rc"], ["l", "ho"], ["l", "pa"], "lwwwwwwwwwww"],
      ["wwwww", ["l", "pa"], ["l", "co"], ["l", "co"], "lwwwwwwwwwww"],
      ["wwwwll", ["l", "pl"], "llllwwwwwwwww"],
      ["wwwwl", ["l", "bb"], ["l", "br"], ["l", "cp", "cc"], "ll", ["l", "pa"], "wwwwwwwww"],
      ["wwwwl", ["l", "bb"], ["l", "br"], ["l", "cp"], ["l", "cp"], "l", ["l", "pa"], "wwwwwwwww"],
      ["wwwwl", ["l", "bb"], ["l", "br"], "l", ["l", "ct"], "llwwwwwwwww"],
      ["wwwwlll", ["l", "cp"], ["l", "cp"], ["l", "cp", "cc"], "l", ["l", "pa"], "wwwwwwww"],
      ["www", ["l", "pa"], "l", ["l", "cp"], ["l", "ct"], ["l", "cp"], "llllwwwwwwww"],
      ["www", ["l", "pa"], "lll", ["l", "cp"], "lll", ["l", "pa"], "wwwwwwww"],
      ["wwwl", ["l", "pa"], "llll", ["l", "pa"], ["l", "pa"], "lwwwwwwww"],
      ["wwwww", ["l", "pa"], ["l", "pa"], "lwwwwwwwwwwww"]
    ],
    dim: {
      x: 20,
      y: 12
    }
  },
  {
    name: "Sirina Hinaa (170.isl)",
    noPadding: true,
    field: [
      "wwwwwwwwwwwwwwwwwwww",
      ["wwllllwwwwwwwwl", ["l", "pa"], "l", ["l", "rc"], "lw"],
      ["wwl", ["l", "lf1"], "l", ["l", "pb"], "lwwwwwwwlll", ["l", "lf2"], ["l", "pa"], "w"],
      ["wwll", ["l", "fa"], "llwwwwwwwwllllw"],
      ["www", ["w", "ic"], "lll", ["w", "ic"], ["w", "ic"], ["w", "ic"], ["w", "ic"], ["w", "ic"], "wwwwwwww"],
      ["www", ["w", "ic"], "wwwwwww", ["w", "ic"], "wllllwww"],
      ["www", ["w", "ic"], "wwwwwwwllllll", ["l", "pa"], "ll"],
      ["www", ["w", "ic"], "wwwwwww", ["l", "pa"], "ll", ["l", "cp"], ["l", "cp"], ["l", "cp"], ["l", "cp"], "ll"],
      ["wwlllll", ["l", "pa"], ["l", "ho"], ["l", "pa"], "llll", ["l", "ct"], "lllll"],
      ["wwlll", ["l", "sl"], "ll", ["l", "co"], "lllll", ["l", "cp"], "lllll"],
      ["wwwllll", ["l", "pl"], "llll", ["l", "rc"], "llllllw"],
      ["wwwwwlllllwwl", ["l", "pa"], "lllllw"]
    ],
    dim: {
      x: 20,
      y: 12
    }
  },
  {
    name: "Tiklinti Linti (171.isl)",
    noPadding: true,
    field: [
      "wwwwwwwwwwwwwwwwwwww",
      "wwllllwwwwwwwwllllww",
      "lllllllwwwwwwlllllll",
      "lllllllwwwwwwlllllll",
      ["ll", ["l", "crb"], ["l", "crr"], ["l", "crb"], "llwwwwwwlll", ["l", "crb"], ["l", "crr"], "ll"],
      "lllllllwwwwwwlllllll",
      ["ll", ["l", "fgb"], "l", ["l", "fgr"], ["l", "fgb"], "lwwwwwwll", ["l", "fgb"], "l", ["l", "fgr"], "ll"],
      "wllllllwwwwwwllllllw",
      ["wllllllww", ["l", "ho"], ["l", "pa"], "wwllllllw"],
      ["wllllllwwl", ["l", "pl"], "wwllllllw"],
      ["wwwwlllwww", ["w", "bw"], ["w", "bw"], ["w", "bw"], "lllwwww"],
      "wwwwwwwwwwwwwwwwwwww"
    ],
    dim: {
      x: 20,
      y: 12
    }
  },
  {
    name: "Ramaswamiki (172.isl)",
    noPadding: true,
    field: [
      ["wwwwwwwwwwwwwwwww", ["l", "pa"], ["l", "ho"], ["l", "pa"]],
      [["w", "hp", "bc"], ["w", "hp"], ["w", "hp"], ["w", "hp"], ["w", "hp"], "w", ["w", "hp", "bc"], ["w", "hp"], ["w", "hp"], ["w", "hp"], ["w", "hp"], ["w", "hp"], "www", ["w", "hp"], "wlll"],
      ["wwwwww", ["w", "hp"], "wwww", ["w", "hp"], "www", ["w", "hp"], "wlll"],
      ["www", ["w", "ra"], ["w", "hp"], "w", ["w", "hp"], "wwwwwww", ["w", "hp", "bc"], "www", ["w", "bw"], "w"],
      ["wwww", ["w", "hp"], "w", ["w", "hp"], ["w", "hp"], ["w", "hp", "bc"], ["w", "hp"], "www", ["w", "hp"], "wwww", ["w", "bw"], "w"],
      ["wwww", ["w", "hp"], "wwwwwww", ["w", "hp"], "w", ["w", "hp"], "www", ["w", "bw"], "w"],
      ["wwww", ["w", "hp"], "wwww", ["w", "hp"], "w", ["w", "hp"], "www", ["w", "hp"], "ww", ["w", "bw"], "w"],
      ["w", ["w", "hp"], ["w", "hp", "bc"], ["w", "hp"], ["w", "hp"], ["w", "hp"], ["w", "hp"], ["w", "hp"], ["w", "hp"], ["w", "hp"], "w", ["w", "hp"], "www", ["w", "hp"], "ww", ["w", "bw"], "w"],
      ["wwwwww", ["w", "hp"], "wwwwwwwwwww", ["w", "bw"], "w"],
      [["l", "pa"], ["l", "mc"], ["l", "pa"], "www", ["w", "hp"], "wwwwwwwwwwlll"],
      ["lll", ["w", "bw"], ["w", "bw"], ["w", "bw"], ["w", "bw"], ["w", "bw"], ["w", "bw"], ["w", "bw"], ["w", "bw"], ["w", "bw"], ["w", "bw"], ["w", "bw"], ["w", "bw"], ["w", "bw"], ["w", "bw"], "l", ["l", "re"], "l"],
      ["lllwwwwwwwwwwwwwwl", ["l", "pl"], "l"]
    ],
    dim: {
      x: 20,
      y: 12
    }
  },
  {
    name: "Beijinkikia (173.isl)",
    noPadding: true,
    field: [
      [["w", "by"], "wwwwwwwww", ["w", "by"], "wwwwwwwww"],
      ["wllll", ["w", "bw"], "w", ["w", "bw"], "l", ["l", "ky"], "lwwwwwwwww"],
      ["wl", ["l", "ci"], "ll", ["w", "bw"], "ww", ["l", "ci"], ["l", "crg"], ["l", "ci"], "wwwwwwwww"],
      ["w", ["l", "ci"], ["l", "fgg"], ["l", "ci"], "w", ["w", "bw"], "wll", ["l", "ci"], "lwwwwwl", ["l", "ch"], ["l", "pa"], "w"],
      ["wl", ["l", "ky"], "lw", ["w", "bw"], "wll", ["l", "pa"], "wwwwww", ["l", "pa"], "ll", ["w", "ra", "pi"]],
      ["wwllw", ["w", "bw"], "w", ["l", "pa"], ["l", "rc"], "lwwwwww", ["l", "ch"], "ll", ["l", "ph"]],
      ["wwwww", ["w", "bw"], "wwwwwwwwwlll", ["l", "pl"], "l"],
      ["wwwwlllllwwww", ["l", "ho"], "ll", ["g", "pa"], "glw"],
      ["wwwl", ["l", "rc"], ["l", "tp"], ["l", "pa"], "llwwwwl", ["l", "tp"], "g", ["g", "pa"], "g", ["l", "rc"], "w"],
      ["wwwl", ["l", "pa"], "l", ["l", "bx"], "l", ["l", "rc"], "wwww", ["l", "pa"], "l", ["g", "pa"], "gllw"],
      ["wwwwlllllwwwwwwll", ["w", "ra"], "ww"],
      ["wwwwwwwwwww", ["w", "by"], "wwwwwwww"]
    ],
    dim: {
      x: 20,
      y: 12
    }
  },
  {
    name: "Fini Nikal Fini (174.isl)",
    noPadding: true,
    field: [
      "wwwwwwwwwwwwwwwwwwww",
      "wwwwwwwwwwwwwwwwwwww",
      ["wwwwwwwwwwww", ["l", "pa"], ["l", "ho"], ["l", "pa"], "lwwww"],
      "wwwwwwwwwwwwlllllllw",
      ["wwwllllllwwwl", ["l", "fgr"], "l", ["l", "fgb"], "l", ["l", "fgg"], "lw"],
      ["wwwll", ["l", "fgb"], "lllwwwlllllllw"],
      ["wwwl", ["l", "fgr"], ["l", "fgg"], "lllwwwwl", ["l", "crr"], ["l", "crb"], ["l", "crg"], "lww"],
      ["wwlllllllwwwwll", ["l", "pl"], "llww"],
      ["wwl", ["l", "crr"], ["l", "crg"], ["l", "crb"], "lllwwwwlllllww"],
      "wwlllllwwwwwwwwwwwww",
      "wwlllllwwwwwwwwwwwww",
      "wwwwwwwwwwwwwwwwwwww"
    ],
    dim: {
      x: 20,
      y: 12
    }
  },
  {
    name: "Very Last Island (175.isl)",
    noPadding: true,
    field: [
      "llllllllllllllllllll",
      "llllllllllllllllllll",
      ["ll", ["l", "cp"], ["l", "cp"], ["l", "ct"], "l", ["l", "cp"], "ll", ["l", "cp"], "l", ["l", "cp"], ["l", "cp"], ["l", "ct"], "ll", ["l", "cp"], ["l", "cp"], ["l", "cp"], "l"],
      ["ll", ["l", "cp", "cc"], "lll", ["l", "cp", "cc"], ["l", "cp"], "l", ["l", "cp"], "l", ["l", "cp", "cc"], "ll", ["l", "cp"], "l", ["l", "cp", "cc"], "lll"],
      ["ll", ["l", "cp"], ["l", "cp"], ["l", "ct"], "l", ["l", "cp"], ["l", "cp"], ["l", "ct"], ["l", "cp"], "l", ["l", "cp"], "ll", ["l", "cp"], "l", ["l", "ct"], ["l", "cp"], ["l", "cp"], "l"],
      ["ll", ["l", "cp", "cc"], "lll", ["l", "cp", "cc"], "l", ["l", "cp"], ["l", "cp"], "l", ["l", "cp", "cc"], "ll", ["l", "cp"], "l", ["l", "cp", "cc"], "lll"],
      ["ll", ["l", "cp"], ["l", "cp"], ["l", "cp"], "l", ["l", "cp"], "ll", ["l", "ct"], "l", ["l", "cp"], ["l", "cp"], ["l", "ct"], "ll", ["l", "cp"], ["l", "cp"], ["l", "ct"], "l"],
      "llllllllllllllllllll",
      "llllllllllllllllllll",
      ["l", ["l", "pl"], "l", ["l", "rc"], ["l", "pa"], ["l", "rc"], ["l", "rc"], ["l", "pa"], ["l", "rc"], ["l", "rc"], ["l", "pa"], ["l", "rc"], ["l", "rc"], ["l", "pa"], ["l", "rc"], ["l", "rc"], ["l", "pa"], ["l", "rc"], ["l", "ho"], ["l", "pa"]],
      ["llll", ["l", "co"], "l", ["l", "co"], "l", ["l", "co"], "l", ["l", "co"], "l", ["l", "co"], "l", ["l", "co"], "l", ["l", "co"], "l", ["l", "co"], ["l", "rc"]],
      ["l", ["l", "rc"], ["l", "pa"], ["l", "rc"], ["l", "rc"], ["l", "pa"], ["l", "rc"], ["l", "rc"], ["l", "pa"], ["l", "rc"], ["l", "rc"], ["l", "pa"], ["l", "rc"], ["l", "rc"], ["l", "pa"], ["l", "rc"], ["l", "rc"], ["l", "pa"], ["l", "rc"], "l"]
    ],
    dim: {
      x: 20,
      y: 12
    }
  }
]
