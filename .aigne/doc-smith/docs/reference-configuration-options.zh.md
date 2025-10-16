# 配置选项

本节提供了 `action.yml` 文件中所有可用输入参数的完整参考。这些选项允许您对 AIGNE CodeSmith 操作进行详细自定义，以适应您特定的工作流程和需求。

每个参数都定义了其用途、数据类型、默认值以及是否为必需项。

## 常规设置

这些选项控制操作的整体行为和外观。

<x-field-group>
  <x-field data-name="debug" data-type="boolean" data-default="false" data-required="false">
    <x-field-desc markdown>启用调试模式，提供详细的日志记录以用于故障排查。设置为 `true` 可在操作日志中激活详细输出。</x-field-desc>
  </x-field>
  <x-field data-name="language" data-type="string" data-default="en-US" data-required="false">
    <x-field-desc markdown>指定 AI 生成响应时应使用的语言的 ISO 代码。例如，使用 `zh-CN` 表示简体中文。</x-field-desc>
  </x-field>
  <x-field data-name="bot_icon" data-type="string" data-default='<img src="https://avatars.githubusercontent.com/u/143965177?s=48&v=4" alt="Image description" width="15" height="15">' data-required="false">
    <x-field-desc markdown>一个 HTML `<img>` 标签，用于在评论中显示机器人的图标。您可以自定义 `src`、`alt`、`width` 和 `height` 属性。</x-field-desc>
  </x-field>
</x-field-group>

## 功能开关

使用这些布尔标志来启用或禁用操作的特定功能。

<x-field-group>
  <x-field data-name="disable_review" data-type="boolean" data-default="false" data-required="false">
    <x-field-desc markdown>当设置为 `true` 时，该操作将只提供拉取请求的摘要，并跳过逐行代码审查。</x-field-desc>
  </x-field>
  <x-field data-name="disable_release_notes" data-type="boolean" data-default="false" data-required="false">
    <x-field-desc markdown>当设置为 `true` 时，该操作将不会在摘要评论中生成发布说明。</x-field-desc>
  </x-field>
  <x-field data-name="review_simple_changes" data-type="boolean" data-default="false" data-required="false">
    <x-field-desc markdown>如果设置为 `true`，即使拉取请求中的更改被认为是微小或简单的，该操作仍会执行代码审查。</x-field-desc>
  </x-field>
  <x-field data-name="review_comment_lgtm" data-type="boolean" data-default="false" data-required="false">
    <x-field-desc markdown>设置为 `true` 可强制机器人在代码中未发现任何问题时也发表评论（例如，“LGTM!”），以确认审查已完成。</x-field-desc>
  </x-field>
  <x-field data-name="suggest_pr_title" data-type="boolean" data-default="false" data-required="false">
    <x-field-desc markdown>启用 (`true`) 后，该操作将根据代码更改为拉取请求生成并建议三个符合常规提交风格的标题。</x-field-desc>
  </x-field>
</x-field-group>

## 文件和范围控制

这些参数定义了审查过程中包含哪些文件，并设置了要分析的更改量的限制。

<x-field-group>
  <x-field data-name="max_files" data-type="number" data-default="150" data-required="false">
    <x-field-desc markdown>要进行摘要和审查的最大文件数。如果拉取请求中的文件数量超过此限制，操作可能会跳过某些文件。值为 `0` 或更小则表示无限制。</x-field-desc>
  </x-field>
  <x-field data-name="path_filters" data-type="string" data-required="false">
    <x-field-desc markdown>一个多行字符串，包含用于在审查中包含或排除文件的路径模式。每行是一个模式。以 `!` 开头的模式为排除模式。这里使用 `minimatch` 语法。更多详情，请参阅我们的[配置文件范围](./guides-configuring-file-scope.md)指南。</x-field-desc>
  </x-field>
</x-field-group>

默认的 `path_filters` 会排除常见的二进制文件、构建产物和配置文件，以便将审查重点放在源代码上。

```yaml action.yml icon=mdi:file-code-outline
# action.yml 中的默认 path_filters
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

## Anthropic API 和模型配置

这些设置允许您配置与 Anthropic API 的连接，并为不同任务选择语言模型。

<x-field-group>
  <x-field data-name="anthropic_base_url" data-type="string" data-default="https://api.anthropic.com/v1" data-required="false">
    <x-field-desc markdown>Anthropic API 的基础 URL。仅当您使用代理或自托管的兼容端点时才更改此项。</x-field-desc>
  </x-field>
  <x-field data-name="anthropic_light_model" data-type="string" data-default="claude-3-5-sonnet-latest" data-required="false">
    <x-field-desc markdown>用于简单任务（如总结文件差异）的模型标识符。它针对速度和成本效益进行了优化。</x-field-desc>
  </x-field>
  <x-field data-name="anthropic_heavy_model" data-type="string" data-default="claude-3-5-sonnet-latest" data-required="false">
    <x-field-desc markdown>用于复杂任务（如执行详细代码审查）的模型标识符。此模型通常功能更强大，上下文感知能力更强。</x-field-desc>
  </x-field>
  <x-field data-name="anthropic_model_temperature" data-type="number" data-default="0.05" data-required="false">
    <x-field-desc markdown>控制 AI 输出的随机性。较低的值（例如 `0.05`）使输出更具确定性和专注性，而较高的值则增加创造力。该值必须介于 0.0 和 1.0 之间。</x-field-desc>
  </x-field>
</x-field-group>

## 性能与可靠性

调整这些参数以管理 API 请求速率、超时和重试次数，确保操作平稳运行。

<x-field-group>
  <x-field data-name="anthropic_retries" data-type="number" data-default="5" data-required="false">
    <x-field-desc markdown>对 Anthropic 服务的 API 调用失败时重试的次数。这有助于缓解暂时的网络问题。</x-field-desc>
  </x-field>
  <x-field data-name="anthropic_timeout_ms" data-type="number" data-default="360000" data-required="false">
    <x-field-desc markdown>单次调用 Anthropic API 的超时时间（毫秒）。默认值为 360,000 毫秒（6 分钟）。</x-field-desc>
  </x-field>
  <x-field data-name="anthropic_concurrency_limit" data-type="number" data-default="6" data-required="false">
    <x-field-desc markdown>对 Anthropic 服务的最大并发 API 调用数。这有助于管理速率限制并防止服务器过载。</x-field-desc>
  </x-field>
  <x-field data-name="github_concurrency_limit" data-type="number" data-default="6" data-required="false">
    <x-field-desc markdown>对 GitHub API 的最大并发 API 调用数。这对于处理包含大量文件的代码仓库很有用。</x-field-desc>
  </x-field>
</x-field-group>

## 自定义提示

这些输入允许您覆盖发送给语言模型的默认系统消息和提示，从而对 AI 的行为、语气和重点进行精细控制。更多信息，请参阅[自定义 AI 行为](./guides-customizing-ai-behavior.md)指南。

<x-field-group>
  <x-field data-name="system_message" data-type="string" data-required="false">
    <x-field-desc markdown>提供给 AI 模型的系统级指令，用于定义其在代码审查中的角色、身份和高级目标。</x-field-desc>
  </x-field>
  <x-field data-name="summarize" data-type="string" data-required="false">
    <x-field-desc markdown>用于指示 AI 如何为拉取请求生成最终摘要评论的提示。默认提示要求提供“演练”和“变更”表格。</x-field-desc>
  </x-field>
  <x-field data-name="summarize_release_notes" data-type="string" data-required="false">
    <x-field-desc markdown>指导 AI 生成发布说明的提示。它指定了期望的格式和重点，例如对变更进行分类并强调对用户的影响。</x-field-desc>
  </x-field>
  <x-field data-name="suggest_pr_title_prompt" data-type="string" data-required="false">
    <x-field-desc markdown>用于生成符合常规提交风格的拉取请求标题的提示。它指示 AI 遵循的格式、语气以及要提供的建议数量。</x-field-desc>
  </x-field>
</x-field-group>