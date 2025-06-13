import yaml from 'js-yaml';

export default {
  process(src) {
    const doc = yaml.load(src);
    return `export default ${JSON.stringify(doc)};`;
  },
};
