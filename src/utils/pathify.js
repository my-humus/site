const _lodash = require("lodash");

exports.pathify = (...args) => {
  const parsedArgs = (0, _lodash.remove)(args.map(arg => (0, _lodash.trim)(arg, "/")), a => !(0, _lodash.isEmpty)(a));
  return `/${(0, _lodash.join)(parsedArgs, "/")}/`;
};