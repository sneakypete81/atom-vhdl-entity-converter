module.exports = {
  "extends": "standard",
  "plugins": [
    "standard",
    "promise"
  ],
  "env": {
    "jasmine": true,
    "es6": true,
    "node": true
  },
  "globals": {
    "atom": true,
    "waitsForPromise": true,
    "fit": false,
    "fdescribe": false
  },
  "rules": {
    "quotes": ["error", "double"],
    "space-before-function-paren": [
      "error", {"anonymous": "always", "named": "never"}]
  }
}
