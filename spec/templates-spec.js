"use babel"
import { componentTemplate, instanceTemplate, signalsTemplate, DEFAULT_OPTIONS } from "../lib/templates"
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
    const param = Object.assign({}, DEFAULT_OPTIONS, {signalPrefix: "s_"});
    const text = componentTemplate(entities.adder, param)
    expect(text).toEqual(loadFixture("component/adder.vhd"))
  })

  it("can create a component with tabbed indent", function () {
    const param = Object.assign({}, DEFAULT_OPTIONS, {indentType: "Tabs"});
    const text = componentTemplate(entities.adder, param)
    expect(text).toEqual(loadFixture("component/adder_indent_tab.vhd"))
  })

  it("can create a component with indent of three spaces", function () {
    const param = Object.assign({}, DEFAULT_OPTIONS, {indentType: "Spaces", indentSpaceCount: 3});
    const text = componentTemplate(entities.adder, param)
    expect(text).toEqual(loadFixture("component/adder_indent_3spaces.vhd"))
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
    const param = Object.assign({}, DEFAULT_OPTIONS, {signalPrefix: "s_"});
    const text = instanceTemplate(entities.adder, param)
    expect(text).toEqual(loadFixture("instance/adder_signal_prefix.vhd"))
  })

  it("can create an instance with tabbed indent", function () {
    const param = Object.assign({}, DEFAULT_OPTIONS, {indentType: "Tabs"});
    const text = instanceTemplate(entities.adder, param)
    expect(text).toEqual(loadFixture("instance/adder_indent_tab.vhd"))
  })

  it("can create a instance with indent of three spaces", function () {
    const param = Object.assign({}, DEFAULT_OPTIONS, {indentType: "Spaces", indentSpaceCount: 3});
    const text = instanceTemplate(entities.adder, param)
    expect(text).toEqual(loadFixture("instance/adder_indent_3spaces.vhd"))
  })
})

describe("templates.signalsTemplate", function () {
  it("can create signals", function () {
    const text = signalsTemplate(entities.adder)
    expect(text).toEqual(loadFixture("signals/adder.vhd"))
  })

  it("can create signals with a signal prefix", function () {
    const param = Object.assign({}, DEFAULT_OPTIONS, {signalPrefix: "s_"});
    const text = signalsTemplate(entities.adder, param)
    expect(text).toEqual(loadFixture("signals/adder_signal_prefix.vhd"))
  })
})
