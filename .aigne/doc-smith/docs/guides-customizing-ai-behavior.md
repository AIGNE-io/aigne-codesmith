# Customizing AI Behavior

The AIGNE CodeSmith action offers several configuration inputs to tailor the AI's behavior, allowing you to align its review style, focus, and tone with your team's specific standards and goals. By modifying the default prompts, you can guide the AI to perform more targeted reviews, generate summaries in a preferred format, and adopt a persona that fits your workflow.

This guide details the key parameters you can adjust in your workflow file to customize the AI's interactions.

## System Message

The `system_message` input is the most impactful setting for defining the AI's core persona, review focus, and overall instructions. It acts as a high-level directive that governs all of the AI's responses.

By default, the AI is instructed to act as a highly experienced software engineer with a focus on critical issues like logic, security, and performance. It also considers all language quality issues (spelling, grammar) as critical.

You can override this default message to redefine the AI's role. For example, you could instruct it to act as a security auditor, a junior developer asking clarifying questions, or an expert in a specific framework.

<x-field-group>
  <x-field data-name="system_message" data-type="string" data-required="false">
    <x-field-desc markdown>The system message that defines the AI's persona and high-level instructions. This is sent with every API request.</x-field-desc>
  </x-field>
</x-field-group>

### Default System Message

Here is the default `system_message` used by the action:

```yaml title="Default system_message"
You are `@codesmith` (aka `github-actions[bot]`), a language model
trained by Anthropic. Your purpose is to act as a highly experienced
software engineer and provide a thorough review of the code hunks
and suggest code snippets to improve key areas such as:
  - Logic
  - Security
  - Performance
  - Data races
  - Consistency
  - Error handling
  - Maintainability
  - Modularity
  - Complexity
  - Optimization
  - Best practices: DRY, SOLID, KISS

**CRITICAL REVIEW FOCUS**: Only post comments for CRITICAL issues that significantly impact code quality:
  - Security vulnerabilities or potential exploits
  - Logic errors that could cause bugs or incorrect behavior
  - Performance issues that could impact system efficiency
  - Error handling problems that could cause crashes or data loss
  - **ALL language quality issues are considered CRITICAL**:
    * Spelling errors in comments, strings, and documentation
    * Grammar mistakes and awkward phrasing
    * Unclear or confusing wording that may hinder understanding
    * Variable/function names that could be more descriptive or follow better naming conventions
    * Comment clarity and proper English usage

**STRICT FILTERING**: Do NOT comment on minor style preferences, formatting choices,
or subjective improvements unless they fall into the CRITICAL categories above.
Help improve code readability for international teams by treating all language
improvements as critical for professional code quality.
```

### Example: Customizing the System Message

To change the AI's focus to primarily security and performance, you could provide a custom `system_message` in your workflow file:

```yaml .github/workflows/codesmith.yml icon=mdi:github
name: 'AIGNE CodeSmith'
on:
  pull_request:

jobs:
  review:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - name: AIGNE CodeSmith
        uses: aigne-labs/codesmith-action@v1
        with:
          anthropic_api_key: ${{ secrets.ANTHROPIC_API_KEY }}
          system_message: |
            You are a security and performance auditor. Your sole purpose is to
            review code for potential security vulnerabilities and performance
            bottlenecks.
            - Focus exclusively on issues related to security (e.g., injection, XSS)
              and performance (e.g., inefficient loops, memory leaks).
            - Ignore all stylistic, logical, or other issues unless they
              directly impact security or performance.
            - Provide code examples for remediation where possible.
```

## Custom Prompts for Specific Tasks

Beyond the main system message, you can also customize the prompts used for specific tasks like generating PR summaries, release notes, and title suggestions.

### PR Summary Prompt

The `summarize` input controls how the final PR summary comment is structured. You can modify this to change the headings, add new sections, or alter the instructions for the AI.

<x-field-group>
  <x-field data-name="summarize" data-type="string" data-required="false">
    <x-field-desc markdown>The prompt used to generate the final pull request summary.</x-field-desc>
  </x-field>
</x-field-group>

**Default `summarize` prompt:**
```
Provide your final response in markdown with the following content:

- **Walkthrough**: A high-level summary of the overall change instead of
  specific files within 80 words.
- **Changes**: A markdown table of files and their summaries. Group files
  with similar changes together into a single row to save space.

Avoid additional commentary as this summary will be added as a comment on the
GitHub pull request. Use the titles "Walkthrough" and "Changes" and they must be H2.
```

### Release Notes Prompt

The `summarize_release_notes` input guides the AI in creating release notes for the pull request. You can customize it to match your project's release note format, change the categories, or adjust the word count.

<x-field-group>
  <x-field data-name="summarize_release_notes" data-type="string" data-required="false">
    <x-field-desc markdown>The prompt for generating release notes from the PR's changes.</x-field-desc>
  </x-field>
</x-field-group>

**Default `summarize_release_notes` prompt:**
```
Craft concise release notes for the pull request.
Focus on the purpose and user impact, categorizing changes as "New Feature", "Bug Fix",
"Documentation", "Refactor", "Style", "Test", "Chore", or "Revert". Provide a bullet-point list,
e.g., "- New Feature: Added search functionality to the UI". Limit your response to 50-100 words
and emphasize features visible to the end-user while omitting code-level details.
```

### PR Title Suggestion Prompt

If you have `suggest_pr_title` enabled, the `suggest_pr_title_prompt` input is used to generate conventional commit-style titles. You can modify this prompt to ask for a different format or a different number of suggestions.

<x-field-group>
  <x-field data-name="suggest_pr_title_prompt" data-type="string" data-required="false">
    <x-field-desc markdown>The prompt for generating pull request title suggestions.</x-field-desc>
  </x-field>
</x-field-group>

**Default `suggest_pr_title_prompt` prompt:**
```
Based on the following git diff, generate 3 conventional commit style pull request titles:

$diff

Requirements:
- Follow conventional commit format
- Be concise and descriptive
- MUST use English language only for pull request titles
- Use proper English grammar and spelling
- Return only a numbered list of titles, nothing else
```

## Adjusting AI Tone and Language

You can further refine the AI's output by adjusting its creativity and language.

<x-field-group>
  <x-field data-name="anthropic_model_temperature" data-type="number" data-default="0.05" data-required="false">
    <x-field-desc markdown>Controls the randomness of the AI's output. Higher values (e.g., 0.8) make the output more creative and random, while lower values (e.g., 0.1) make it more deterministic and focused. The default is `0.05`, which is highly deterministic. It is recommended to adjust this value with caution.</x-field-desc>
  </x-field>
  <x-field data-name="language" data-type="string" data-default="en-US" data-required="false">
    <x-field-desc markdown>The ISO code for the desired output language for all AI responses (e.g., `en-US`, `zh-CN`, `es-ES`).</x-field-desc>
  </x-field>
</x-field-group>

## Summary

By thoughtfully combining these options, you can shape the AIGNE CodeSmith bot into an assistant that perfectly matches your team's culture and technical requirements. For a complete list of all available options, see the [Configuration Options](./reference-configuration-options.md) reference.