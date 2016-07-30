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

function componentTemplate(entity) {
  text = `component ${entity.name}\n`
  if (entity.generics.length > 0) {
    text += `generic (\n`
    longest = longestinArray(entity.generics, "name")
    for (generic of entity.generics) {
      name = generic.name.rpad(" ", longest)
      text += `  ${name} : ${generic.type}`
      if (generic.default) {
        text += ` := ${generic.default}`
      }
      text += `;\n`
    }
    // Strip the final semicolon
    text = text.slice(0, -2)
    text += `\n);\n`
  }

  if (entity.ports.length > 0) {
    text += `port (\n`
    longest = longestinArray(entity.ports, "name")
    for (port of entity.ports) {
      name = port.name.rpad(" ", longest)
      dir = port.dir.rpad(" ", 3)
      text += `  ${name} : ${dir} ${port.type};\n`
    }
    // Strip the final semicolon
    text = text.slice(0, -2)
    text += `\n);\n`
  }

  text += `end component ${entity.name};\n`
  return text
}

function instanceTemplate(entity) {
  text = `${entity.name}_i : ${entity.name}\n`
  if (entity.generics.length > 0) {
    text += `generic map (\n`
    longest = longestinArray(entity.generics, "name")
    for (generic of entity.generics) {
      name = generic.name.rpad(" ", longest)
      text += `  ${name} => ${generic.name},\n`
    }
    // Strip the final comma
    text = text.slice(0, -2)
    text += `\n)`
  }

  if (entity.ports.length > 0) {
    text += `\nport map (\n`
    longest = longestinArray(entity.ports, "name")
    for (port of entity.ports) {
      name = port.name.rpad(" ", longest)
      text += `  ${name} => ${port.name},\n`
    }
    // Strip the final comma
    text = text.slice(0, -2)
    text += `\n)`
  }

  text += `;\n`
  return text
}

function signalsTemplate(entity) {
  text = ""
  if (entity.ports.length > 0) {
    longest = longestinArray(entity.ports, "name")
    for (port of entity.ports) {
      name = port.name.rpad(" ", longest)
      text += `signal ${name} : ${port.type};\n`
    }
  }
  return text
}

function longestinArray(array, attr) {
  longest = 0
  for (object of array) {
    if (object[attr].length > longest) {
      longest = object.name.length
    }
  }
  return longest
}

String.prototype.rpad = function(padString, length) {
	var str = this;
    while (str.length < length)
        str = str + padString;
    return str;
}

export {
  componentTemplate,
  instanceTemplate,
  signalsTemplate
}
