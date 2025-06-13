const yaml = require('js-yaml');

module.exports = {
  process(src) {
    const doc = yaml.load(src);
    return `module.exports = ${JSON.stringify(doc)};`;
  },
};
