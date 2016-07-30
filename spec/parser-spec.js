'use babel'
import Parser from "../lib/parser"
import { loadFixture } from "./helpers"
import entities from "./entities"

describe("parser", function() {
  it("can parse an entity", function() {
    entity = new Parser(loadFixture("entity/adder.vhd"))
    expect(entity.name).toEqual(entities.adder.name)
    expect(entity.generics).toEqual(entities.adder.generics)
    expect(entity.ports).toEqual(entities.adder.ports)
  })

  it("can parse an entity with CR+LF line endings", function() {
    entity = new Parser(loadFixture("entity/adder_with_cr_lf.vhd"))
    expect(entity.name).toEqual(entities.adder.name)
    expect(entity.generics).toEqual(entities.adder.generics)
    expect(entity.ports).toEqual(entities.adder.ports)
  })
})


describe("parser.parseEntityName", function() {
  it("can parse an entity name", function() {
    entity = new Parser(loadFixture("entity/adder.vhd"))
    expect(entity.name).toEqual(entities.adder.name)
  })

  it("can parse an entity name with mixed case", function() {
    entity = new Parser(loadFixture("entity/adder_with_case.vhd"))
    expect(entity.name).toEqual(entities.adderWithCase.name)
  })
})


describe("parser.parseGenerics", function() {
  it("can parse generics from an entity", function() {
    entity = new Parser(loadFixture("entity/adder.vhd"))
    expect(entity.generics).toEqual(entities.adder.generics)
  })

  it("can parse generics from an entity with mixed case", function() {
    entity = new Parser(loadFixture("entity/adder_with_case.vhd"))
    expect(entity.generics).toEqual(entities.adderWithCase.generics)
  })

  it("can parse generics without defaults from an entity", function() {
    entity = new Parser(loadFixture("entity/adder_no_defaults.vhd"))
    expect(entity.generics).toEqual(entities.adderNoDefault.generics)
  })
})


describe("parser.parsePorts", function() {
  it("can parse ports from an entity", function() {
    entity = new Parser(loadFixture("entity/adder.vhd"))
    expect(entity.ports).toEqual(entities.adder.ports)
  })

  it("can parse ports from an entity with mixed case", function() {
    entity = new Parser(loadFixture("entity/adder_with_case.vhd"))
    expect(entity.ports).toEqual(entities.adderWithCase.ports)
  })

  it("can parse ports from an entity with no generics", function() {
    entity = new Parser(loadFixture("entity/adder_no_generics.vhd"))
    expect(entity.ports).toEqual(entities.adder.ports)
  })
})
