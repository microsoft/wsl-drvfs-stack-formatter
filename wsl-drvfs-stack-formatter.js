const fs = require('fs');
const wsl = require('is-wsl');

if (!wsl || !fs.statSync('/proc/mounts')) {
  return module.export = Error.prepareStackTrace;
}

const prepare = Error.prepareStackTrace
  || ((err, stack) => [err, ...stack].join('\n    at '));

const replacements = [
  ...fs.
    readFileSync('/proc/mounts').
    toString().
    split('\n').
    map(line => line.split(' ')).
    filter(([, , type,]) => type === 'drvfs').
    reduce((map, [letter, path,]) => map.set(path, letter), new Map()).
    entries()
];

module.export = replacements.length === 0
  ? prepare
  : (err, stack) => replacements.reduce(
    (trace, [to, fro]) => trace.replace(to, fro), prepare(err, stack));