'use babel'

export function loadFixture(filename) {
  return require("fs").readFileSync("spec/fixture/" + filename, "utf-8")
}
