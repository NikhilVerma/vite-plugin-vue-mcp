import { defineBuildConfig } from 'unbuild'

export default defineBuildConfig({
  entries: [
    'src/index',
    'src/main.ts',
  ],
  declaration: 'node16',
  clean: true,
  rollup: {
    emitCJS: true,
    inlineDependencies: [
      '@antfu/utils',
      'nanoid',
    ],
  },
})
