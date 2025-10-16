# 管理功能

AIGNE CodeSmith 提供了一套旨在增强您开发工作流程的功能，包括 AI 驱动的代码审查、自动发布说明生成和拉取请求标题建议。您可以精细地控制启用或禁用这些功能，从而根据项目的具体需求定制该 action 的行为。

本指南将说明如何在您的 GitHub Actions 工作流文件中配置这些功能。

## 功能配置

主要功能可以通过工作流步骤中 `with` 部分的布尔标志进行管理。将标志设置为 `true` 可启用功能，设置为 `false` 则禁用。

### 代码审查

AIGNE CodeSmith 的核心功能是为拉取请求提供深入的代码审查。然而，您可能希望仅将其用于摘要功能。

要禁用代码审查功能，请将 `disable_review` 输入设置为 `true`。禁用后，该 action 仍会提供变更摘要，但不会在差异对比中逐行发布评论或建议。

**用例：** 适用于主要目标是快速获取拉取请求摘要，而无需强制执行自动代码审查评论的项目。

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
          disable_review: true # 禁用代码审查功能
```

### 发布说明

该 action 可以自动生成发布说明并将其添加到拉取请求的正文中。此功能有助于维护变更日志并有效传达变更。

如果您的工作流不需要此功能，可以通过将 `disable_release_notes` 设置为 `true` 来禁用它。

**用例：** 适用于那些有不同发布说明管理流程或并非每个拉取请求都需要发布说明的代码仓库。

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
          disable_release_notes: true # 禁用发布说明生成功能
```

### 拉取请求标题建议

为了帮助维护一致且符合规范的提交历史，AIGNE CodeSmith 可以为您的拉取请求建议标题。此功能默认禁用。

要启用此功能，请将 `suggest_pr_title` 输入设置为 `true`。机器人随后会根据拉取请求中的变更发布一条包含若干建议 PR 标题的评论。

**用例：** 对于遵循“约定式提交”规范并希望确保 PR 标题具有描述性且标准化的团队非常有用。

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
          suggest_pr_title: true # 启用 PR 标题建议功能
```

## 选项摘要

以下是功能管理参数的快速参考。

| 输入参数 | 描述 | 默认值 |
| ------------------------- | ------------------------------------------------------------------ | ------------- |
| `disable_review` | 设置为 `true` 可禁用代码审查评论。 | `false` |
| `disable_release_notes` | 设置为 `true` 可禁用自动发布说明生成功能。 | `false` |
| `suggest_pr_title` | 设置为 `true` 可启用 PR 标题建议功能。 | `false` |

通过配置这些选项，您可以精确控制 AIGNE CodeSmith action 的行为，使其与您团队的开发实践保持一致。有关所有可用参数的完整列表，请参阅[配置选项](./reference-configuration-options.md)参考文档。