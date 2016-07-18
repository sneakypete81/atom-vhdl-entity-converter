'use babel'
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

function selectAndParseEntity() {
  editor = atom.workspace.getActivePaneItem()
  entityRange = getScopeRange(editor, "meta.block.entity.vhdl")
  if (!entityRange) {
    return null;
  }

  entityText = editor.getTextInBufferRange(entityRange)
  entityText = entityText.replace(/\n/g, " ")
  entityName = entityText.match(/entity\s+(\w+)\s/)[1]

  generics = parseGenerics(entityText)
  ports = parsePorts(entityText)

  editor.setSelectedBufferRange(entityRange)
  return {name: entityName,
          generics: generics,
          ports:ports}
}

function parseGenerics(entityText) {
  generics = []
  genericMatch = entityText.match(/generic\s*\((.*?)\)\s*;\s*port\s*\(/)
  if (genericMatch[0]) {
    genericText = genericMatch[1] + ";" // Append a semicolon, to help match the last item
    genericRegExp = /(\w+)\s*:\s*(\w+)\s*(:=\s*(\w+))\s*;?/g
    while (match = genericRegExp.exec(genericText)) {
      generics.push({name: match[1],
                     type: match[2],
                     default: match[4]
                   })
    }
  }
  return generics
}

function parsePorts(entityText) {
  ports = []
  portMatch = entityText.match(/\)\s*;\s*port\s*\((.*?)\)\s*;\s*end\s/)
  if (portMatch[0]) {
    portText = portMatch[1] + ";" // Append a semicolon, to help match the last item
    portRegExp = /(\w+)\s*:\s*(\w+)\s+(.*?)\s*;/g
    while (match = portRegExp.exec(portText)) {
      pName = match[1]
      pDir = match[2]
      pType = match[3]
      ports.push({name: match[1],
                  dir: match[2],
                  type: match[3]
                })
    }
  }
  return ports
}

function getScopeRange(editor, scopeName) {
  fullRange = editor.bufferRangeForScopeAtCursor(scopeName)
  if (!fullRange) {
    return null;
  }

  // Search backwards line by line until we're outside the scope
  while ((range = editor.bufferRangeForScopeAtCursor(scopeName)) !== undefined) {
    fullRange = fullRange.union(range)
    if (fullRange.start.row == 0) {
      break;
    }
    editor.setCursorBufferPosition(range.start)
    editor.moveLeft()
  }

  // Search forwards line by line until we're outside the scope
  editor.setCursorBufferPosition(fullRange.end)
  editor.moveRight()
  while ((range = editor.bufferRangeForScopeAtCursor(scopeName)) !== undefined) {
    fullRange = fullRange.union(range)
    if (fullRange.end.row == editor.getLastBufferRow()) {
      break;
    }
    editor.setCursorBufferPosition(range.end)
    editor.moveRight()
  }
  return fullRange
}

export { selectAndParseEntity };
