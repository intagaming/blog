module.exports = {
  extends: ["airbnb-typescript", "next", "prettier"],
  rules: {
    "no-param-reassign": ["error", { props: false }],
    "import/no-extraneous-dependencies": ["error", { "devDependencies": true }],
    "@next/next/no-document-import-in-page": "off"
  },
  parserOptions: {
    project: ["./tsconfig.json"]
  }
};
