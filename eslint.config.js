import antfu from '@antfu/eslint-config'
import { eslintIgnoreDefaults, eslintRulesDefaults } from 'zeed/eslint'

export default antfu(
  {
    typescript: true,
    vue: true,

    // typescript: {
    //   tsconfigPath: './tsconfig.json',
    //   filesTypeAware: ['**\/*.{ts,tsx,vue}'],
    // },

    ignores: [
      ...eslintIgnoreDefaults(),
      '**/_*/*',
      '**/.*/*',
      '**/.DS_* ',
      '**/.env.*',
      '**/.htaccess',
      '**/.htaccess*',
      '**/.idea',
      '**/.out.*',
      '**/.rsync-ignore',
      '**/*.local',
      '**/*.log',
      '**/*.md',
      '**/*.spec.*',
      '**/*/tflite/*',
      '**/bg.jpg',
      '**/build/*',
      '**/coverage/*',
      '**/data/*',
      '**/dist/*',
      '**/dist_*/*',
      '**/docker/*',
      '**/internal/*',
      '**/legacy/*',
      '**/logs/*',
      '**/node_modules/*',
      '**/npm-debug.log',
      '**/package-lock.json',
      '**/pnpm-lock.yaml',
      '**/tmp/*',
      '**/www/*',
    ],
  },
  {},
  {
    rules: {
      ...eslintRulesDefaults(),

      // for some old third party code a `eslint-disable` does wonders :)
      'eslint-comments/no-unlimited-disable': 'off',
    },
  },
)
