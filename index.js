const {readFileSync} = require('fs')
const {parse} = require('babylon')
const traverse = require('babel-traverse').default
const {printTypes} = require("./typechecker/printer")
const {typecheck} = require("./typechecker/typecheck")

const code = readFileSync('test.js', 'utf-8')

const ast = parse(code, {
  sourceType: 'script',

  plugins: [
    'flow'
  ]
});

typecheck(ast)
printTypes(ast)

console.log('Program type checks!')
