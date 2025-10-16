# Configuration Options

This section provides a complete reference for all input parameters available in the `action.yml` file. These options allow for detailed customization of the AIGNE CodeSmith action to fit your specific workflow and requirements.

Each parameter is defined with its purpose, data type, default value, and whether it is required.

## General Settings

These options control the overall behavior and appearance of the action.

<x-field-group>
  <x-field data-name="debug" data-type="boolean" data-default="false" data-required="false">
    <x-field-desc markdown>Enables debug mode, providing verbose logging for troubleshooting purposes. Set to `true` to activate detailed output in the action's logs.</x-field-desc>
  </x-field>
  <x-field data-name="language" data-type="string" data-default="en-US" data-required="false">
    <x-field-desc markdown>Specifies the ISO code for the language in which the AI should generate responses. For example, use `zh-CN` for Simplified Chinese.</x-field-desc>
  </x-field>
  <x-field data-name="bot_icon" data-type="string" data-default='<img src="https://avatars.githubusercontent.com/u/143965177?s=48&v=4" alt="Image description" width="15" height="15">' data-required="false">
    <x-field-desc markdown>An HTML `<img>` tag used to display an icon for the bot in comments. You can customize the `src`, `alt`, `width`, and `height` attributes.</x-field-desc>
  </x-field>
</x-field-group>

## Feature Flags

Use these boolean flags to enable or disable specific features of the action.

<x-field-group>
  <x-field data-name="disable_review" data-type="boolean" data-default="false" data-required="false">
    <x-field-desc markdown>When set to `true`, the action will only provide a pull request summary and will skip the line-by-line code review.</x-field-desc>
  </x-field>
  <x-field data-name="disable_release_notes" data-type="boolean" data-default="false" data-required="false">
    <x-field-desc markdown>When set to `true`, the action will not generate release notes as part of the summary comment.</x-field-desc>
  </x-field>
  <x-field data-name="review_simple_changes" data-type="boolean" data-default="false" data-required="false">
    <x-field-desc markdown>If set to `true`, the action will perform a code review even if the changes in the pull request are considered minor or simple.</x-field-desc>
  </x-field>
  <x-field data-name="review_comment_lgtm" data-type="boolean" data-default="false" data-required="false">
    <x-field-desc markdown>Set to `true` to force the bot to leave a comment (e.g., "LGTM!") even when no issues are found in the code, confirming that the review was completed.</x-field-desc>
  </x-field>
  <x-field data-name="suggest_pr_title" data-type="boolean" data-default="false" data-required="false">
    <x-field-desc markdown>When enabled (`true`), the action will generate and suggest three conventional commit style titles for the pull request based on the code changes.</x-field-desc>
  </x-field>
</x-field-group>

## File and Scope Control

These parameters define which files are included in the review process and set limits on the volume of changes to analyze.

<x-field-group>
  <x-field data-name="max_files" data-type="number" data-default="150" data-required="false">
    <x-field-desc markdown>The maximum number of files to be summarized and reviewed. If the number of files in a pull request exceeds this limit, the action may skip some files. A value of `0` or less removes the limit.</x-field-desc>
  </x-field>
  <x-field data-name="path_filters" data-type="string" data-required="false">
    <x-field-desc markdown>A multiline string of path patterns to include or exclude files from the review. Each line is a pattern. Patterns starting with `!` are exclusionary. This uses `minimatch` syntax. For more details, see our guide on [Configuring File Scope](./guides-configuring-file-scope.md).</x-field-desc>
  </x-field>
</x-field-group>

The default `path_filters` exclude common binary, build artifact, and configuration files to focus the review on source code.

```yaml action.yml icon=mdi:file-code-outline
# Default path_filters from action.yml
path_filters: |
  !dist/**
  !**/*.lock
  !**/*.min.js
  !**/package.json
  !**/yarn.lock
  !**/*.md
  !**/*.svg
  # (and many other file types)
```

## Anthropic API and Model Configuration

These settings allow you to configure the connection to the Anthropic API and select the language models for different tasks.

<x-field-group>
  <x-field data-name="anthropic_base_url" data-type="string" data-default="https://api.anthropic.com/v1" data-required="false">
    <x-field-desc markdown>The base URL for the Anthropic API. Change this only if you are using a proxy or a self-hosted compatible endpoint.</x-field-desc>
  </x-field>
  <x-field data-name="anthropic_light_model" data-type="string" data-default="claude-3-5-sonnet-latest" data-required="false">
    <x-field-desc markdown>The model identifier for simple tasks, such as summarizing file diffs. It is optimized for speed and cost-efficiency.</x-field-desc>
  </x-field>
  <x-field data-name="anthropic_heavy_model" data-type="string" data-default="claude-3-5-sonnet-latest" data-required="false">
    <x-field-desc markdown>The model identifier for complex tasks, such as performing detailed code reviews. This model is typically more powerful and context-aware.</x-field-desc>
  </x-field>
  <x-field data-name="anthropic_model_temperature" data-type="number" data-default="0.05" data-required="false">
    <x-field-desc markdown>Controls the randomness of the AI's output. A lower value (e.g., `0.05`) makes the output more deterministic and focused, while a higher value increases creativity. The value must be between 0.0 and 1.0.</x-field-desc>
  </x-field>
</x-field-group>

## Performance and Reliability

Adjust these parameters to manage API request rates, timeouts, and retries, ensuring the action runs smoothly.

<x-field-group>
  <x-field data-name="anthropic_retries" data-type="number" data-default="5" data-required="false">
    <x-field-desc markdown>The number of times to retry a failed API call to the Anthropic service. This helps mitigate transient network issues.</x-field-desc>
  </x-field>
  <x-field data-name="anthropic_timeout_ms" data-type="number" data-default="360000" data-required="false">
    <x-field-desc markdown>The timeout in milliseconds for a single API call to Anthropic. The default is 360,000 ms (6 minutes).</x-field-desc>
  </x-field>
  <x-field data-name="anthropic_concurrency_limit" data-type="number" data-default="6" data-required="false">
    <x-field-desc markdown>The maximum number of concurrent API calls to the Anthropic service. This helps manage rate limits and prevent server overload.</x-field-desc>
  </x-field>
  <x-field data-name="github_concurrency_limit" data-type="number" data-default="6" data-required="false">
    <x-field-desc markdown>The maximum number of concurrent API calls to the GitHub API. This is useful for repositories with a large number of files to process.</x-field-desc>
  </x-field>
</x-field-group>

## Custom Prompts

These inputs allow you to override the default system messages and prompts sent to the language model, giving you fine-grained control over the AI's behavior, tone, and focus. For more information, refer to the [Customizing AI Behavior](./guides-customizing-ai-behavior.md) guide.

<x-field-group>
  <x-field data-name="system_message" data-type="string" data-required="false">
    <x-field-desc markdown>The system-level instructions provided to the AI model to define its persona, role, and high-level objectives for code reviews.</x-field-desc>
  </x-field>
  <x-field data-name="summarize" data-type="string" data-required="false">
    <x-field-desc markdown>The prompt used to instruct the AI on how to generate the final summary comment for the pull request. The default prompt asks for a "Walkthrough" and a "Changes" table.</x-field-desc>
  </x-field>
  <x-field data-name="summarize_release_notes" data-type="string" data-required="false">
    <x-field-desc markdown>The prompt that guides the AI in generating release notes. It specifies the desired format and focus, such as categorizing changes and emphasizing user impact.</x-field-desc>
  </x-field>
  <x-field data-name="suggest_pr_title_prompt" data-type="string" data-required="false">
    <x-field-desc markdown>The prompt used to generate conventional commit style pull request titles. It instructs the AI on the format, tone, and number of suggestions to provide.</x-field-desc>
  </x-field>
</x-field-group>