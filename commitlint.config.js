// commitlint.config.js
module.exports = {
    extends: ["@commitlint/cli", "@commitlint/config-conventional"],
    rules: {
        "type-enum": [
            2,
            "always",
            [
                "feat", // New feature
                "fix", // Bug fix
                "docs", // Documentation update
                "style", // Code style change (formatting, missing semicolons, etc.)
                "refactor", // Code refactoring (no functional changes)
                "perf", // Performance improvements
                "test", // Adding or updating tests,
                "build",//Makinfg build,
                "ci",//for ci cd
                "chore", // Maintenance tasks (build, CI, etc.)
                "revert", // Reverting a commit
            ],
        ],
        "subject-case": [2, "always", "sentence-case"], // Enforce sentence-case for commit messages
    },
};
