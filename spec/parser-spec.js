'use babel'
import { Parser } from "../lib/parser"
import { loadFixture } from "./helpers"

const adderGenerics = [{name: "WIDTH", type: "integer", default: "3"},
                       {name: "HEIGHT", type: "integer", default: "2"}]

const adderWithCaseGenerics = [{name: 'wiDTH', type: 'Integer', default: '3'},
                               {name: 'HEight', type: 'inTeger', default: '2' }]

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

describe("parser.parseGenerics", function() {
  it("can parse generics from an entity", function() {
    entity = new Parser(loadFixture("entity/adder.vhd"))
    expect(entity.generics).toEqual(adderGenerics)
  })

  it("can parse generics from an entity with mixed case", function() {
    entity = new Parser(loadFixture("entity/adder_with_case.vhd"))
    expect(entity.generics).toEqual(adderWithCaseGenerics)
  })
})
