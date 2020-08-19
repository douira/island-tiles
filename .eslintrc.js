module.exports = {
  root: true,
  env: {
    browser: true,
    es6: true
  },
  parserOptions: {
    parser: "babel-eslint"
  },
  globals: {
    $nuxt: true,
    $: true,
    stampit: true,
    module: true,
    process: true
  },
  ignorePatterns: ["!.prettierrc", "!.eslintrc.js"],
  plugins: ["sonarjs"],
  extends: [
    "plugin:sonarjs/recommended",
    "plugin:promise/recommended",
    "eslint:recommended",
    "plugin:prettier/recommended"
  ],
  rules: {
    "no-console": process.env.NODE_ENV === "production" ? "error" : "off",
    "no-debugger": process.env.NODE_ENV === "production" ? "error" : "off",
    "no-constant-condition": ["error", { checkLoops: false }],
    "import/no-unresolved": "off",
    "promise/catch-or-return": "off",
    "promise/always-return": "off",
    "no-var": "error",
    "sonarjs/cognitive-complexity": "off",
    "sonarjs/no-duplicate-string": "off",
    "vue/no-v-html": "off",
    radix: "error",
    "max-len": [
      "error",
      { code: Infinity, comments: 100, ignorePattern: "TODO|DEBUG|INFO" }
    ]
  }
}
