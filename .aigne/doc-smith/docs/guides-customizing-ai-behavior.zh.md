# 自定义 AI 行为

AIGNE CodeSmith 操作提供了多种配置输入来定制 AI 的行为，让您能够使其审查风格、重点和语气与团队的特定标准和目标保持一致。通过修改默认提示，您可以引导 AI 执行更有针对性的审查，以偏好的格式生成摘要，并采用适合您工作流程的人设。

本指南详细介绍了您可以在工作流程文件中调整的关键参数，以自定义 AI 的交互。

## 系统消息

`system_message` 输入是定义 AI 核心人设、审查重点和总体指令的最具影响力的设置。它作为高级别指令，支配 AI 的所有响应。

默认情况下，AI 被指示扮演一位经验极其丰富的软件工程师，专注于逻辑、安全和性能等关键问题。它还将所有语言质量问题（拼写、语法）视为关键问题。

您可以覆盖此默认消息以重新定义 AI 的角色。例如，您可以指示它扮演安全审计员、提出澄清问题的初级开发人员，或是某个特定框架的专家。

<x-field-group>
  <x-field data-name="system_message" data-type="string" data-required="false">
    <x-field-desc markdown>定义 AI 人设和高级别指令的系统消息。此消息会随每次 API 请求一同发送。</x-field-desc>
  </x-field>
</x-field-group>

### 默认系统消息

以下是该操作使用的默认 `system_message`：

```yaml title="默认 system_message"
You are @codesmith (aka `github-actions[bot]`), a language model
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

### 示例：自定义系统消息

要将 AI 的重点主要更改为安全性和性能，您可以在工作流程文件中提供一个自定义的 `system_message`：

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

## 针对特定任务的自定义提示

除了主系统消息之外，您还可以为特定任务（如生成 PR 摘要、发布说明和标题建议）自定义所用的提示。

### PR 摘要提示

`summarize` 输入控制最终 PR 摘要评论的结构。您可以修改此项来更改标题、添加新部分或调整对 AI 的指令。

<x-field-group>
  <x-field data-name="summarize" data-type="string" data-required="false">
    <x-field-desc markdown>用于生成最终拉取请求摘要的提示。</x-field-desc>
  </x-field>
</x-field-group>

**默认 `summarize` 提示：**
```
Provide your final response in markdown with the following content:

- **Walkthrough**: A high-level summary of the overall change instead of
  specific files within 80 words.
- **Changes**: A markdown table of files and their summaries. Group files
  with similar changes together into a single row to save space.

Avoid additional commentary as this summary will be added as a comment on the
GitHub pull request. Use the titles "Walkthrough" and "Changes" and they must be H2.
```

### 发布说明提示

`summarize_release_notes` 输入指导 AI 为拉取请求创建发布说明。您可以对其进行自定义以匹配项目的发布说明格式、更改类别或调整字数。

<x-field-group>
  <x-field data-name="summarize_release_notes" data-type="string" data-required="false">
    <x-field-desc markdown>根据 PR 的变更生成发布说明的提示。</x-field-desc>
  </x-field>
</x-field-group>

**默认 `summarize_release_notes` 提示：**
```
Craft concise release notes for the pull request.
Focus on the purpose and user impact, categorizing changes as "New Feature", "Bug Fix",
"Documentation", "Refactor", "Style", "Test", "Chore", or "Revert". Provide a bullet-point list,
e.g., "- New Feature: Added search functionality to the UI". Limit your response to 50-100 words
and emphasize features visible to the end-user while omitting code-level details.
```

### PR 标题建议提示

如果您启用了 `suggest_pr_title`，则 `suggest_pr_title_prompt` 输入将用于生成 conventional commit 风格的标题。您可以修改此提示以要求不同的格式或不同数量的建议。

<x-field-group>
  <x-field data-name="suggest_pr_title_prompt" data-type="string" data-required="false">
    <x-field-desc markdown>用于生成拉取请求标题建议的提示。</x-field-desc>
  </x-field>
</x-field-group>

**默认 `suggest_pr_title_prompt` 提示：**
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

## 调整 AI 语气和语言

您可以通过调整其创造性和语言来进一步优化 AI 的输出。

<x-field-group>
  <x-field data-name="anthropic_model_temperature" data-type="number" data-default="0.05" data-required="false">
    <x-field-desc markdown>控制 AI 输出的随机性。较高的值（例如 0.8）会使输出更具创造性和随机性，而较低的值（例如 0.1）则会使其更具确定性和专注性。默认值为 `0.05`，这是高度确定性的。建议谨慎调整此值。</x-field-desc>
  </x-field>
  <x-field data-name="language" data-type="string" data-default="en-US" data-required="false">
    <x-field-desc markdown>所有 AI 响应所需输出语言的 ISO 代码（例如 `en-US`、`zh-CN`、`es-ES`）。</x-field-desc>
  </x-field>
</x-field-group>

## 总结

通过深思熟虑地组合这些选项，您可以将 AIGNE CodeSmith 机器人塑造成一个完美匹配您团队文化和技术要求的助手。有关所有可用选项的完整列表，请参阅[配置选项](./reference-configuration-options.md)参考。