'use babel'

export function loadFixture(filename) {
  return require("fs").readFileSync(fixturePath(filename), "utf-8")
}

export function fixturePath(filename) {
  return __dirname + "/fixture/" + filename
}
