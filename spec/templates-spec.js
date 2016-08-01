"use babel"
import { componentTemplate, instanceTemplate, signalsTemplate } from "../lib/templates"
import { loadFixture } from "./helpers"
import entities from "./entities"

describe("templates.componentTemplate", function () {
  it("can create a component", function () {
    const text = componentTemplate(entities.adder)
    expect(text).toEqual(loadFixture("component/adder.vhd"))
  })

  it("can create a component without generic defaults", function () {
    const text = componentTemplate(entities.adderNoDefault)
    expect(text).toEqual(loadFixture("component/adder_no_defaults.vhd"))
  })

  it("can create a component without generics", function () {
    const text = componentTemplate(entities.adderNoGenerics)
    expect(text).toEqual(loadFixture("component/adder_no_generics.vhd"))
  })

  it("can create a component with a signal prefix and nothing changes", function () {
    const text = componentTemplate(entities.adder, {signalPrefix: "s_"})
    expect(text).toEqual(loadFixture("component/adder.vhd"))
  })
})

describe("templates.instanceTemplate", function () {
  it("can create an instance", function () {
    const text = instanceTemplate(entities.adder)
    expect(text).toEqual(loadFixture("instance/adder.vhd"))
  })

  it("can create an instance without generics", function () {
    const text = instanceTemplate(entities.adderNoGenerics)
    expect(text).toEqual(loadFixture("instance/adder_no_generics.vhd"))
  })

  it("can create an instance with a signal prefix", function () {
    const text = instanceTemplate(entities.adder, {signalPrefix: "s_"})
    expect(text).toEqual(loadFixture("instance/adder_signal_prefix.vhd"))
  })
})

describe("templates.signalsTemplate", function () {
  it("can create signals", function () {
    const text = signalsTemplate(entities.adder)
    expect(text).toEqual(loadFixture("signals/adder.vhd"))
  })

  it("can create signals with a signal prefix", function () {
    const text = signalsTemplate(entities.adder, {signalPrefix: "s_"})
    expect(text).toEqual(loadFixture("signals/adder_signal_prefix.vhd"))
  })
})
