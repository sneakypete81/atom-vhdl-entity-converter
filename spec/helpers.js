"use babel"

export function loadFixture(filename) {
  return require("fs").readFileSync(fixturePath(filename), "utf-8")
}

export function fixturePath(filename) {
  return require("path").join(__dirname, "fixture", filename)
}
