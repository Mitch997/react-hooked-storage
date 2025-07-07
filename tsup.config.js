/** @type {import('tsup').Options} */
module.exports = {
  entry: ['src/index.js'],
  format: ['cjs', 'esm'],
  dts: false,
  clean: true,
  outDir: 'dist'
};
