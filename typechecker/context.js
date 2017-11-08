// @flow

const {empty} = require('./types')

type type = string
type pair = [string, type];
type env = Array<pair>;

function make(): env {
  return [];
}

function find(env: env, name: string): type {
  const pair = env.find(pair => {
    return pair[0] === name
  })

  if (typeof pair !== 'undefined') {
    return pair[1]
  } else {
    return empty
  }
}

function add(env: env, name: string, type: type): env {
  env.push([name, type])

  return env
}

module.exports = {
  make,
  find,
  add,
};
