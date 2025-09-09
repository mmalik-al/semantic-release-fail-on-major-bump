<div align="center">

<img alt="Icon" width="128" height="128" align="center" src=".github/icon.png"/>

# Semantic Release Fail on Major Bump

**Semantic release plugin that prevents publishing major version bumps**

[![npm version](https://badgen.net/npm/v/semantic-release-fail-on-major-bump?icon=npm)](https://www.npmjs.com/package/semantic-release-fail-on-major-bump)
[![check status](https://badgen.net/github/checks/evelynhathaway/semantic-release-fail-on-major-bump/main?icon=github)](https://github.com/evelynhathaway/semantic-release-fail-on-major-bump/actions)
[![license: MIT](https://badgen.net/badge/license/MIT/blue)](/LICENSE)

</div>

## Description

If you need your pipelines to fail if a major or breaking change release will be created with semantic-release, drop this plugin into your config.

## Installation

```bash
npm install --save-dev semantic-release-fail-on-major-bump
```

## Usage

In your [**semantic-release** configuration file](https://semantic-release.gitbook.io/semantic-release/usage/configuration#configuration-file), add `semantic-release-fail-on-major-bump`.

**`release.config.mjs`**

```js
export default {
	plugins: [
		// Add this line
		"semantic-release-fail-on-major-bump",
		// Example semantic-release commit-analyzer config below...
		[
			"@semantic-release/commit-analyzer",
			{
				"preset": "angular",
				"releaseRules": [
					{"type": "docs", "scope": "README", "release": "patch"},
					{"type": "refactor", "release": "patch"},
					{"type": "style", "release": "patch"},
				],
				"parserOpts": {
					"noteKeywords": ["BREAKING CHANGE", "BREAKING CHANGES"],
				},
			},
		],
	],
};
```

## Development

### Testing

Make a either a `Breaking:` or non-breaking typed commit and then see if the error was thrown if expected while running
 a dummy dry-run release.

```bash
npm link
npm link semantic-release-fail-on-major-bump
npm run test-release
```

## CI override via environment variable

If you need to temporarily allow a major release (for example from GitHub Actions), set the following environment variable to a truthy value to disable this plugin's check for that run. Per semantic-release’s plugin guide, environment variables are read from the `context.env` object that semantic-release provides to plugins (this is automatically populated from the process environment in CI):

- FAIL_ON_MAJOR_BUMP_DISABLE (default)
  - Accepted truthy values: `1`, `true`, `yes`, `on` (case-insensitive)

You can also customize the env var name via plugin options (see below).

Examples:

- Unix shells:
  ```bash
  export FAIL_ON_MAJOR_BUMP_DISABLE=true
  npx semantic-release
  ```

- GitHub Actions:
  ```yaml
  jobs:
    release:
      runs-on: ubuntu-latest
      steps:
        - uses: actions/checkout@v4
        - uses: actions/setup-node@v4
          with:
            node-version: 20
        - run: npm ci
        - name: Release
          env:
            FAIL_ON_MAJOR_BUMP_DISABLE: true
          run: npx semantic-release
  ```

### Optional plugin configuration

You can override the env var name via plugin options in your semantic-release config:

```js
export default {
  plugins: [
    [
      'semantic-release-fail-on-major-bump',
      {
        // If set, the plugin will read this env var from context.env
        disableEnvVar: 'ALLOW_MAJOR_RELEASE'
      }
    ]
  ]
};
```

## License

Copyright Evelyn Hathaway, [MIT License](/LICENSE)
