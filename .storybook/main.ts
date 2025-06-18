import type { StorybookConfig } from '@storybook/react-vite';
import { mergeConfig } from 'vite';

const config: StorybookConfig = {
  "stories": [
    "../src/**/*.mdx",
    "../src/**/*.stories.@(js|jsx|mjs|ts|tsx)"
  ],
  "addons": [
    "@storybook/addon-essentials",
    "@chromatic-com/storybook",
    "@storybook/addon-a11y"
  ],
  "framework": {
    "name": "@storybook/react-vite",
    "options": {}
  },
  "typescript": {
    "reactDocgen": "react-docgen-typescript"
  },
  async viteFinal(config) {
    const { default: tailwindcss } = await import('@tailwindcss/vite');
    return mergeConfig(config, {
      plugins: [tailwindcss()],
    });
  },
};
export default config;