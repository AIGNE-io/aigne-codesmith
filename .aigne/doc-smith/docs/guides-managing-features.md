# Managing Features

AIGNE CodeSmith provides a suite of features designed to enhance your development workflow, including AI-powered code reviews, automated release note generation, and pull request title suggestions. You have granular control to enable or disable these features, allowing you to tailor the action's behavior to fit your project's specific requirements.

This guide provides instructions on how to configure these functionalities within your GitHub Actions workflow file.

## Feature Configuration

The primary features can be managed using boolean flags in the `with` section of your workflow step. Setting a flag to `true` enables the feature, while `false` disables it.

### Code Reviews

The core functionality of AIGNE CodeSmith is to provide in-depth code reviews on pull requests. However, you may wish to use the action only for its summarization capabilities.

To disable the code review feature, set the `disable_review` input to `true`. When disabled, the action will still provide a summary of the changes but will not post line-by-line comments or suggestions on the diff.

**Use Case:** Ideal for projects where the primary goal is to obtain quick summaries of pull requests without enforcing automated code review comments.

```yaml .github/workflows/codesmith.yml icon=mdi:github
name: AIGNE CodeSmith
on:
  pull_request:
    types: [opened, synchronize]
jobs:
  review:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
        with:
          fetch-depth: 0
      - name: AIGNE CodeSmith
        uses: aigne-labs/codesmith-action@v1
        with:
          anthropic_api_key: ${{ secrets.ANTHROPIC_API_KEY }}
          disable_review: true # Disables the code review feature
```

### Release Notes

The action can automatically generate and prepend release notes to the body of a pull request. This feature helps in maintaining a changelog and communicating changes effectively.

If this functionality is not required for your workflow, you can disable it by setting `disable_release_notes` to `true`.

**Use Case:** Suitable for repositories that have a different process for managing release notes or do not require them for every pull request.

```yaml .github/workflows/codesmith.yml icon=mdi:github
name: AIGNE CodeSmith
on:
  pull_request:
    types: [opened, synchronize]
jobs:
  review:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
        with:
          fetch-depth: 0
      - name: AIGNE CodeSmith
        uses: aigne-labs/codesmith-action@v1
        with:
          anthropic_api_key: ${{ secrets.ANTHROPIC_API_KEY }}
          disable_release_notes: true # Disables release note generation
```

### Pull Request Title Suggestions

To help maintain a consistent and conventional commit history, AIGNE CodeSmith can suggest titles for your pull requests. This feature is disabled by default.

To enable it, set the `suggest_pr_title` input to `true`. The bot will then post a comment with a few suggested PR titles based on the changes in the pull request.

**Use Case:** Useful for teams that follow the Conventional Commits specification and want to ensure PR titles are descriptive and standardized.

```yaml .github/workflows/codesmith.yml icon=mdi:github
name: AIGNE CodeSmith
on:
  pull_request:
    types: [opened, synchronize]
jobs:
  review:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
        with:
          fetch-depth: 0
      - name: AIGNE CodeSmith
        uses: aigne-labs/codesmith-action@v1
        with:
          anthropic_api_key: ${{ secrets.ANTHROPIC_API_KEY }}
          suggest_pr_title: true # Enables PR title suggestions
```

## Summary of Options

Here is a quick reference for the feature management parameters.

| Input Parameter           | Description                                                        | Default Value |
| ------------------------- | ------------------------------------------------------------------ | ------------- |
| `disable_review`          | Set to `true` to disable code review comments.                     | `false`       |
| `disable_release_notes`   | Set to `true` to disable automatic release note generation.        | `false`       |
| `suggest_pr_title`        | Set to `true` to enable PR title suggestions.                      | `false`       |

By configuring these options, you can precisely control the behavior of the AIGNE CodeSmith action to align with your team's development practices. For a complete list of all available parameters, please refer to the [Configuration Options](./reference-configuration-options.md) reference.