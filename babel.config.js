const presets = [
  ["@babel/preset-react"],
  [
    "@babel/env",
    {
      targets: {
        chrome: "45",
      },
    },
  ],
];

module.exports = { 
  presets,
  plugins: ["@babel/plugin-proposal-class-properties"]
};