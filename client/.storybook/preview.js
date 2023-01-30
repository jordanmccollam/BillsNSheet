import "../src/App.scss";

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
  backgrounds: {
    default: 'billsNSheet',
    values: [
      {
        name: 'billsNSheet',
        value: '#202331',
      },
      {
        name: 'alt',
        value: '#efefef',
      },
    ],
  },
}