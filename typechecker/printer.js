// @flow
const traverse = require('babel-traverse').default
const {key} = require("./types")

function printTypes(root: Object) {

  traverse(root, {
    Identifier({node}) {
      if (typeof node[key] !== "undefined") {
        console.log('val', node.name, 'has type', node[key])
      }
    }
  });
}

module.exports = {
  printTypes,
}
