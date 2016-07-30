'use babel'

export function loadFixture(filename) {
  return require("fs").readFileSync(__dirname + "/fixture/" + filename, "utf-8")
}
