const { GitEmoji } = require('commit-it');
module.exports = {
  plugins: [
    new GitEmoji({
      askForShortDescription: false,
      commitBodyRequired: false,
    }),
  ],
};
