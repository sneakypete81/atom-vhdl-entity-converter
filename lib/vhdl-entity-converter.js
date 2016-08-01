"use babel"
// Copyright (C) 2016 Pete Burgers
//
//     This program is free software: you can redistribute it and/or modify
//     it under the terms of the GNU General Public License as published by
//     the Free Software Foundation, either version 3 of the License, or
//     (at your option) any later version.
//
//     This program is distributed in the hope that it will be useful,
//     but WITHOUT ANY WARRANTY; without even the implied warranty of
//     MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
//     GNU General Public License for more details.
//
//     You should have received a copy of the GNU General Public License
//     along with this program.  If not, see <http://www.gnu.org/licenses/>.

import { CompositeDisposable } from "atom"
import Parser from "./parser"

export default {
  config: require("./config"),

  subscriptions: null,

  activate(state) {
    // Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
    this.subscriptions = new CompositeDisposable()

    // Register commands
    this.subscriptions.add(atom.commands.add("atom-workspace", {
      "vhdl-entity-converter:copy-as-component": () => this.copyAsComponent(),
      "vhdl-entity-converter:copy-as-instance": () => this.copyAsInstance(),
      "vhdl-entity-converter:copy-as-signals": () => this.copyAsSignals()
    }))

    // Install package dependencies
    require("atom-package-deps").install("vhdl-entity-converter")
  },

  deactivate() {
    this.subscriptions.dispose()
  },

  getOptions() {
    return {"signalPrefix": atom.config.get("vhdl-entity-converter.signalPrefix")}
  },

  copyAsComponent() {
    this.copyBase("Component", require("./templates").componentTemplate)
  },

  copyAsInstance() {
    this.copyBase("Instance", require("./templates").instanceTemplate)
  },

  copyAsSignals() {
    this.copyBase("Signals", require("./templates").signalsTemplate)
  },

  copyBase(type, template) {
    const entity = this.selectAndParseEntity()
    if (!entity) {
      atom.notifications.addError("Please move the cursor inside a VHDL entity")
      return
    }

    const text = template(entity, this.getOptions())
    atom.clipboard.write(text)
    atom.notifications.addSuccess(`${type} for '${entity.name}' copied to the clipboard`,
                                  {detail: text})
  },

  selectAndParseEntity() {
    const editor = atom.workspace.getActivePaneItem()
    let entityRange = this.getScopeRange(editor, "meta.block.entity.vhdl")
    if (!entityRange) {
      return null
    }
    // Include the trailing semicolon
    entityRange = entityRange.translate(0, [1, 0])

    editor.setSelectedBufferRange(entityRange)
    const entity = new Parser(editor.getTextInBufferRange(entityRange))

    return {name: entity.name,
            generics: entity.generics,
            ports: entity.ports}
  },

  getScopeRange(editor, scopeName) {
    var fullRange = editor.bufferRangeForScopeAtCursor(scopeName)
    if (!fullRange) {
      return null
    }

    // Search backwards line by line until we're outside the scope
    let range
    while ((range = editor.bufferRangeForScopeAtCursor(scopeName)) !== undefined) {
      fullRange = fullRange.union(range)
      if (fullRange.start.row === 0) {
        break
      }
      editor.setCursorBufferPosition(range.start)
      editor.moveLeft()
    }

    // Search forwards line by line until we're outside the scope
    editor.setCursorBufferPosition(fullRange.end)
    editor.moveRight()
    while ((range = editor.bufferRangeForScopeAtCursor(scopeName)) !== undefined) {
      fullRange = fullRange.union(range)
      if (fullRange.end.row === editor.getLastBufferRow()) {
        break
      }
      editor.setCursorBufferPosition(range.end)
      editor.moveRight()
    }
    return fullRange
  }

}
