'use babel'
import { componentTemplate, instanceTemplate, signalsTemplate } from "../lib/templates"
import { loadFixture } from "./helpers"
import { entities } from "./entities"

describe("templates.componentTemplate", function() {
  it("can create a component", function() {
    text = componentTemplate(entities.adder)
    expect(text).toEqual(loadFixture("component/adder.vhd"))
  })

  it("can create a component without generic defaults", function() {
    text = componentTemplate(entities.adderNoDefault)
    expect(text).toEqual(loadFixture("component/adder_no_defaults.vhd"))
  })

  it("can create a component without generics", function() {
    text = componentTemplate(entities.adderNoGenerics)
    expect(text).toEqual(loadFixture("component/adder_no_generics.vhd"))
  })
})


describe("templates.instanceTemplate", function() {
  it("can create a instance", function() {
    text = instanceTemplate(entities.adder)
    expect(text).toEqual(loadFixture("instance/adder.vhd"))
  })

  it("can create a instance without generics", function() {
    text = instanceTemplate(entities.adderNoGenerics)
    expect(text).toEqual(loadFixture("instance/adder_no_generics.vhd"))
  })
})


describe("templates.signalsTemplate", function() {
  it("can create signals", function() {
    text = signalsTemplate(entities.adder)
    expect(text).toEqual(loadFixture("signals/adder.vhd"))
  })
})
