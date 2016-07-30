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

export default class {
  constructor(text) {
    this.text = text.replace(/[\r\n]/g, " ")
  }

  get name() {
    return this.text.match(/entity\s+(\w+)\s/i)[1]
  }

  get generics() {
    const generics = []
    const genericMatch = this.text.match(/generic\s*\((.*?)\)\s*;\s*port\s*\(/i)
    if (genericMatch) {
      const genericText = genericMatch[1] + ";" // Append a semicolon, to help match the last item
      const genericRegExp = /(\w+)\s*:\s*(\w+)\s*(:=\s*(\w+))?\s*;?/g
      while (match = genericRegExp.exec(genericText)) {
        generics.push({name: match[1],
                       type: match[2],
                       default: match[4]
                     })
      }
    }
    return generics
  }

  get ports() {
    ports = []
    portMatch = this.text.match(/port\s*\((.*?)\)\s*;\s*end\s/i)
    if (portMatch) {
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
}
