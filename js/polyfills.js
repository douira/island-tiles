const reduce = Function.bind.call(Function.call, Array.prototype.reduce)
const isEnumerable = Function.bind.call(
  Function.call,
  Object.prototype.propertyIsEnumerable
)
const concat = Function.bind.call(Function.call, Array.prototype.concat)
const keys = Reflect.ownKeys

if (!Object.values) {
  Object.values = function values(O) {
    return reduce(
      keys(O),
      (v, k) =>
        concat(v, typeof k === "string" && isEnumerable(O, k) ? [O[k]] : []),
      []
    )
  }
}

if (!Object.entries) {
  Object.entries = function entries(O) {
    return reduce(
      keys(O),
      (e, k) =>
        concat(
          e,
          typeof k === "string" && isEnumerable(O, k) ? [[k, O[k]]] : []
        ),
      []
    )
  }
}

if (!Array.prototype.flat) {
  Object.defineProperty(Array.prototype, "flat", {
    configurable: true,
    value: function flat() {
      let depth = isNaN(arguments[0]) ? 1 : Number(arguments[0])

      return depth
        ? Array.prototype.reduce.call(
            this,
            function(acc, cur) {
              if (Array.isArray(cur)) {
                acc.push.apply(acc, flat.call(cur, depth - 1))
              } else {
                acc.push(cur)
              }

              return acc
            },
            []
          )
        : Array.prototype.slice.call(this)
    },
    writable: true
  })
}
