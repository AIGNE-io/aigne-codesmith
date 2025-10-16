# 基本配置

安装 AIGNE CodeSmith 操作后，您可以通过调整工作流文件中的输入参数来自定义其行为。本节详细介绍了初始设置所需的最基本配置选项。通过这些设置，您可以控制核心功能，如模型选择、文件处理限制和审查行为。

如需所有可用参数的完整列表，请参阅[配置选项](./reference-configuration-options.md)参考指南。

## 模型选择

您可以为不同任务指定不同的 Anthropic 模型，以平衡性能和成本。较轻量的模型在处理简单任务时速度更快、更经济，而功能更强大的模型则更适合进行深度分析。

<x-field-group>
  <x-field data-name="anthropic_light_model" data-type="string" data-default="claude-3-5-sonnet-latest">
    <x-field-desc markdown>指定用于较简单任务的模型，例如生成拉取请求摘要和文件差异摘要。默认模型针对速度和效率进行了优化。</x-field-desc>
  </x-field>
  <x-field data-name="anthropic_heavy_model" data-type="string" data-default="claude-3-5-sonnet-latest">
    <x-field-desc markdown>定义用于更复杂任务的模型，主要用于深度代码审查分析。这通常是一个功能更强大、更全面的模型。</x-field-desc>
  </x-field>
</x-field-group>

### 示例

以下 YAML 代码片段演示了如何在您的工作流文件中配置轻量和重量级模型。

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

## 文件和审查控制

这些选项允许您管理审查过程的范围，有助于控制成本，并将 AI 的注意力集中在最重要的事情上。

<x-field-group>
  <x-field data-name="max_files" data-type="integer" data-default="150">
    <x-field-desc markdown>设置单个拉取请求中要审查的最大文件数。值为 `0` 或更小时将取消此限制。这对于管理非常大的拉取请求的成本非常有用。</x-field-desc>
  </x-field>
  <x-field data-name="review_simple_changes" data-type="boolean" data-default="false">
    <x-field-desc markdown>如果设置为 `true`，即使更改被认为是次要或简单的，该操作也会审查拉取请求。默认值为 `false`，以避免不必要的审查。</x-field-desc>
  </x-field>
  <x-field data-name="review_comment_lgtm" data-type="boolean" data-default="false">
    <x-field-desc markdown>当设置为 `true` 时，机器人将在没有问题的代码块上发布“LGTM”（Looks Good To Me）评论。默认情况下（`false`），它仅在发现改进建议时才会发表评论。</x-field-desc>
  </x-field>
</x-field-group>

### 示例

此示例设置了 50 个文件的限制，并启用了对简单更改的审查。

```yaml .github/workflows/codesmith.yml icon=mdi:github
# ... (先前的配置)
        with:
          anthropic_api_key: ${{ secrets.ANTHROPIC_API_KEY }}
          max_files: '50'
          review_simple_changes: true
# ... (其余配置)
```

## 功能开关

您可以启用或禁用操作的主要功能，以根据您的特定工作流需求定制其功能。

<x-field-group>
  <x-field data-name="disable_review" data-type="boolean" data-default="false">
    <x-field-desc markdown>设置为 `true` 可禁用逐行代码审查功能。禁用后，该操作将仅提供拉取请求摘要。</x-field-desc>
  </x-field>
  <x-field data-name="disable_release_notes" data-type="boolean" data-default="false">
    <x-field-desc markdown>设置为 `true` 可防止在 PR 摘要评论中生成发布说明。</x-field-desc>
  </x-field>
  <x-field data-name="suggest_pr_title" data-type="boolean" data-default="false">
    <x-field-desc markdown>设置为 `true` 可启用基于差异生成三个常规提交风格的拉取请求标题。此功能默认禁用。</x-field-desc>
  </x-field>
</x-field-group>

### 示例

此配置禁用了发布说明，但启用了拉取请求标题建议功能。

```yaml .github/workflows/codesmith.yml icon=mdi:github
# ... (先前的配置)
        with:
          anthropic_api_key: ${{ secrets.ANTHROPIC_API_KEY }}
          disable_release_notes: true
          suggest_pr_title: true
# ... (其余配置)
```

## 总结

通过使用这些基本配置选项，您可以快速有效地定制 AIGNE CodeSmith 操作，以适应您团队的开发流程。这些设置为在您的工作流中利用 AI 驱动的审查提供了坚实的基础。

如需更高级的定制，例如筛选路径和修改系统提示，请前往[指南](./guides.md)部分。建议的下一步是学习如何[配置文件范围](./guides-configuring-file-scope.md)。