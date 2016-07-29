'use babel'
import { Parser } from "../lib/parser"
import { loadFixture } from "./helpers"

describe("parser.parseEntityName", function() {
  it("can parse an entity name", function() {
    entity = new Parser(loadFixture("entity/adder.vhd"))
    expect(entity.name).toEqual("add")
  })

  it("can parse an entity name with mixed case", function() {
    entity = new Parser(loadFixture("entity/adder_with_case.vhd"))
    expect(entity.name).toEqual("addWithCase")
  })
})
