'use babel'
import { Parser } from "../lib/parser"
import { loadFixture } from "./helpers"

const adderGenerics = [{name: "WIDTH", type: "integer", default: "3"},
                       {name: "HEIGHT", type: "integer", default: "2"}]
const adderWithCaseGenerics = [{name: 'wiDTH', type: 'Integer', default: '3'},
                               {name: 'HEight', type: 'inTeger', default: '2'}]
const adderNoDefaultGenerics = [{name: "WIDTH", type: "integer", default: undefined},
                                {name: "HEIGHT", type: "integer", default: undefined}]


const adderPorts = [{name: 'clk', dir: 'in', type: 'std_logic'},
                    {name: 'in', dir: 'in', type: 'std_logic_vector(WIDTH-1 downto 0)'},
                    {name: 'output', dir: 'out', type: 'std_logic_vector(WIDTH-1 downto 0)'}]
const adderWithCasePorts = [{name: 'Clk', dir: 'In', type: 'STD_LOGIC'},
                            {name: 'IN', dir: 'in', type: 'Std_Logic_Vector(width-1 DownTo 0)'},
                            {name: 'OutPut', dir: 'oUt', type: 'Std_Logic_Vector(width-1 DownTo 0)'}]

describe("parser", function() {
  it("can parse an entity", function() {
    entity = new Parser(loadFixture("entity/adder.vhd"))
    expect(entity.name).toEqual("add")
    expect(entity.generics).toEqual(adderGenerics)
    expect(entity.ports).toEqual(adderPorts)
  })

  it("can parse an entity with CR+LF line endings", function() {
    entity = new Parser(loadFixture("entity/adder_with_cr_lf.vhd"))
    expect(entity.name).toEqual("add")
    expect(entity.generics).toEqual(adderGenerics)
    expect(entity.ports).toEqual(adderPorts)
  })
})
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

  it("can parse generics without defaults from an entity", function() {
    entity = new Parser(loadFixture("entity/adder_no_defaults.vhd"))
    expect(entity.generics).toEqual(adderNoDefaultGenerics)
  })
})


describe("parser.parsePorts", function() {
  it("can parse ports from an entity", function() {
    entity = new Parser(loadFixture("entity/adder.vhd"))
    expect(entity.ports).toEqual(adderPorts)
  })

  it("can parse ports from an entity with mixed case", function() {
    entity = new Parser(loadFixture("entity/adder_with_case.vhd"))
    expect(entity.ports).toEqual(adderWithCasePorts)
  })
})
