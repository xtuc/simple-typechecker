// @flow

const traverse = require('babel-traverse').default
const {key, annotationToType, match} = require('./types')
const context = require('./context')
const {empty} = require('./types')

function typecheck(root: Object) {
  const env = context.make()

  traverse(root, {

    VariableDeclarator({node}) {
      let type = ''

      if (typeof node.id.typeAnnotation.typeAnnotation === 'undefined') {
        throw 'Missing type annotation on identifier'
      }

      const typeAnnotation = node.id.typeAnnotation.typeAnnotation

      // Search in built-in types
      type = annotationToType(typeAnnotation.type)

      if (type === empty) {
        // Search in env
        type = context.find(env, node.id.name)
      }

      if (type === empty && typeAnnotation.type === 'GenericTypeAnnotation') {
        // Search for type aliases (search in env)
        type = context.find(env, typeAnnotation.id.name)
      }

      if (type === empty) {
        throw 'Unknown type for var'
      }

      // For some reasons type is not of type string
      context.add(env, node.id.name, (type: any))
      node.id[key] = type
    },

    TypeAlias({node}) {
      const type = annotationToType(node.right.type)

      if (type === empty) {
        throw 'Unknown type in type alias'
      }

      context.add(env, node.id.name, (type: any))
    },

    AssignmentExpression({node: {left, right}}) {
      const leftType = context.find(env, left.name)
      const rightType = context.find(env, right.name)

      if (leftType === empty) {
        throw 'Left side has an unknown type'
      }

      if (rightType === empty) {
        throw 'Right side has an unknown type'
      }

      if (!match(leftType, rightType)) {
        throw 'Impossible assignment ' + leftType + ' != ' + rightType
      }
    }

  });
}

module.exports = {
  typecheck,
}
