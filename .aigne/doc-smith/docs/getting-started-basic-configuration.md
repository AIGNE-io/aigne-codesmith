# Basic Configuration

Once the AIGNE CodeSmith action is installed, you can customize its behavior by adjusting the input parameters in your workflow file. This section details the most essential configuration options required for initial setup. These settings allow you to control core functionalities such as model selection, file processing limits, and review behavior.

For a comprehensive list of all available parameters, please refer to the [Configuration Options](./reference-configuration-options.md) reference guide.

## Model Selection

You can specify different Anthropic models for various tasks to balance performance and cost. Lighter models are faster and more economical for simple tasks, while more powerful models are better suited for in-depth analysis.

<x-field-group>
  <x-field data-name="anthropic_light_model" data-type="string" data-default="claude-3-5-sonnet-latest">
    <x-field-desc markdown>Specifies the model used for simpler tasks, such as generating pull request summaries and file diff summaries. The default model is optimized for speed and efficiency.</x-field-desc>
  </x-field>
  <x-field data-name="anthropic_heavy_model" data-type="string" data-default="claude-3-5-sonnet-latest">
    <x-field-desc markdown>Defines the model used for more complex tasks, primarily the in-depth code review analysis. This is typically a more powerful and thorough model.</x-field-desc>
  </x-field>
</x-field-group>

### Example

Here is a YAML snippet demonstrating how to configure the light and heavy models in your workflow file.

```yaml .github/workflows/codesmith.yml icon=mdi:github
name: 'AIGNE CodeSmith'
on:
  pull_request:
    types: [opened, synchronize]

jobs:
  review:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - name: AIGNE CodeSmith
        uses: aigne-live/codesmith-action@v1
        with:
          anthropic_api_key: ${{ secrets.ANTHROPIC_API_KEY }}
          anthropic_light_model: 'claude-3-haiku-20240307'
          anthropic_heavy_model: 'claude-3-opus-20240229'
```

## File and Review Controls

These options allow you to manage the scope of the review process, helping to control costs and focus the AI's attention on what matters most.

<x-field-group>
  <x-field data-name="max_files" data-type="integer" data-default="150">
    <x-field-desc markdown>Sets the maximum number of files to be reviewed in a single pull request. A value of `0` or less removes the limit. This is useful for managing costs on very large pull requests.</x-field-desc>
  </x-field>
  <x-field data-name="review_simple_changes" data-type="boolean" data-default="false">
    <x-field-desc markdown>If set to `true`, the action will review pull requests even if the changes are considered minor or simple. The default is `false` to avoid unnecessary reviews.</x-field-desc>
  </x-field>
  <x-field data-name="review_comment_lgtm" data-type="boolean" data-default="false">
    <x-field-desc markdown>When set to `true`, the bot will post a "LGTM" (Looks Good To Me) comment on code hunks that have no issues. By default (`false`), it will only comment when suggestions for improvement are found.</x-field-desc>
  </x-field>
</x-field-group>

### Example

This example sets a limit of 50 files and enables reviews for simple changes.

```yaml .github/workflows/codesmith.yml icon=mdi:github
# ... (previous configuration)
        with:
          anthropic_api_key: ${{ secrets.ANTHROPIC_API_KEY }}
          max_files: '50'
          review_simple_changes: true
# ... (rest of the configuration)
```

## Feature Toggles

You can enable or disable major features of the action to tailor its functionality to your specific workflow needs.

<x-field-group>
  <x-field data-name="disable_review" data-type="boolean" data-default="false">
    <x-field-desc markdown>Set to `true` to disable the line-by-line code review feature. When disabled, the action will only provide a pull request summary.</x-field-desc>
  </x-field>
  <x-field data-name="disable_release_notes" data-type="boolean" data-default="false">
    <x-field-desc markdown>Set to `true` to prevent the generation of release notes within the PR summary comment.</x-field-desc>
  </x-field>
  <x-field data-name="suggest_pr_title" data-type="boolean" data-default="false">
    <x-field-desc markdown>Set to `true` to enable the generation of three conventional commit style pull request titles based on the diff. This feature is disabled by default.</x-field-desc>
  </x-field>
</x-field-group>

### Example

This configuration disables release notes but enables the pull request title suggestion feature.

```yaml .github/workflows/codesmith.yml icon=mdi:github
# ... (previous configuration)
        with:
          anthropic_api_key: ${{ secrets.ANTHROPIC_API_KEY }}
          disable_release_notes: true
          suggest_pr_title: true
# ... (rest of the configuration)
```

## Summary

By using these basic configuration options, you can quickly and effectively tailor the AIGNE CodeSmith action to fit your team's development process. These settings provide a solid foundation for leveraging AI-powered reviews in your workflow.

For more advanced customization, such as filtering paths and modifying system prompts, proceed to the [Guides](./guides.md) section. The next recommended step is learning how to [Configure File Scope](./guides-configuring-file-scope.md).