// @flow

type type = string

const string: type = 'string';
const bool: type = 'bool';

const key = Symbol("type")
const empty = ''

function annotationToType(type: string): type {
  const map = {
    StringTypeAnnotation: string,
    BooleanTypeAnnotation: bool,
  };

  if (typeof map[type] !== 'undefined') {
    return map[type]
  } else {
    return empty
  }
}

// Simplified version for now
// could use sub-typing
function match(l: string, r: string): boolean {
  return l === r
}

module.exports = {
  key,
  empty,

  annotationToType,
  match,
};
