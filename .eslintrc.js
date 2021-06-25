module.exports = {
  extends: ["airbnb-typescript", "next", "prettier"],
  rules: {
    "no-param-reassign": ["error", { props: false }],
  },
  parserOptions: {
    project: "./tsconfig.json",
  },
};
