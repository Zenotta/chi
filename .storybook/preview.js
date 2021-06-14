
export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  viewMode: "docs",
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
  options: {
    storySort: {
      order: ['Components', ['Atoms', 'Display', 'Navigation', 'Charts']]
    },
  },
}