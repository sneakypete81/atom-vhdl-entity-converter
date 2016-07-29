'use babel'
import { Parser } from "../lib/parser"
import { loadFixture } from "./helpers"

describe("parser.parseEntityName", function() {
  it("can parse an entity name", function() {
    entity = new Parser(`entity entity_name is
                         end entity_name;
                         `)
    expect(entity.name).toEqual("entity_name")
  })

  it("can parse an entity name with mixed case", function() {
    entity = new Parser(`EntiTy entityNameWithCase Is
                         eND entityNameWithCase;
                         `)
    expect(entity.name).toEqual("entityNameWithCase")
  })

  it("can parse an entity name from a full entity", function() {
    entity = new Parser(loadFixture("entity/adder.vhd"))
    expect(entity.name).toEqual("add")
  })
})
