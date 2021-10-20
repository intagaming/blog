module.exports = {
  extends: ["airbnb-typescript", "next", "prettier"],
  rules: {
    "no-param-reassign": ["error", { props: false }],
    "import/no-extraneous-dependencies": ["error", { "devDependencies": true }]
  },
  parserOptions: {
    project: ["./tsconfig.json"]
  }
};
