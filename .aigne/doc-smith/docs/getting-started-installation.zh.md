# 安装

本文档提供了安装 AIGNE CodeSmith GitHub Action 的系统指南。该过程涉及向您的仓库添加一个工作流文件，并配置必要的 API 密钥以启用该服务。

## 先决条件

在继续安装之前，请确保满足以下条件：

1.  **仓库访问权限**：您必须拥有将要安装此 action 的 GitHub 仓库的管理权限。
2.  **Anthropic API 密钥**：需要一个有效的 Anthropic API 密钥。可以从 [Anthropic Console](https://console.anthropic.com/) 获取。

## 安装过程

安装过程分为两步：创建工作流文件和配置仓库机密。

### 步骤 1：创建工作流文件

AIGNE CodeSmith action 由 GitHub Actions 工作流触发。需要一个工作流文件来定义触发该 action 的事件。

1.  导航到您的 GitHub 仓库的根目录。
2.  创建一个名为 `.github/workflows` 的目录。如果此目录已存在，您可以继续下一步。
3.  在 `.github/workflows` 目录中，创建一个名为 `aigne-codesmith.yml` 的新文件。
4.  将以下 YAML 配置插入到 `aigne-codesmith.yml` 文件中。此配置设置该 action 在拉取请求和拉取请求评论时运行。

```yaml name: 🤖 AI Code Review icon=mdi:github

permissions:
  contents: read
  pull-requests: write

on:
  pull_request:
  pull_request_review_comment:
    types: [created]

concurrency:
  group:
    ${{ github.repository }}-${{ github.event.number || github.head_ref ||
    github.sha }}-${{ github.workflow }}-${{ github.event_name ==
    'pull_request_review_comment' && 'pr_comment' || 'pr' }}
  cancel-in-progress: ${{ github.event_name != 'pull_request_review_comment' }}

jobs:
  review:
    runs-on: ubuntu-latest
    steps:
      - uses: aigne-io/aigne-codesmith@latest
        env:
          GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
          ANTHROPIC_API_KEY: ${{ secrets.ANTHROPIC_API_KEY }}
        with:
          debug: false
          review_simple_changes: false
          review_comment_lgtm: false
```

### 步骤 2：配置仓库机密

您的 Anthropic API 密钥必须作为机密安全地存储在您的 GitHub 仓库中。工作流将使用此机密向 Anthropic API 进行身份验证。

1.  在您的 GitHub 仓库中，导航到 **Settings** 选项卡。
2.  在左侧边栏中，选择 **Secrets and variables**，然后点击 **Actions**。
3.  点击 **New repository secret** 按钮。
4.  在 **Name** 字段中，输入 `ANTHROPIC_API_KEY`。此名称必须与工作流文件中指定的名称完全匹配。
5.  在 **Value** 字段中，粘贴您从 Anthropic Console 获取的 API 密钥。
6.  点击 **Add secret** 保存。

下图说明了设置和执行流程。

```d2
direction: down

User: {
  shape: c4-person
}

Setup: {
  label: "一次性设置"
  style.stroke-dash: 4

  Anthropic-Console: {
    label: "Anthropic 控制台"
  }

  GitHub-Repo-Setup: {
    label: "GitHub 仓库"
    
    Settings: {
      label: "设置\n机密与变量"
    }

    Workflow-File: {
      label: ".github/workflows/\naigne-codesmith.yml"
    }
  }
}


Execution: {
  label: "每次拉取请求时"
  style.stroke-dash: 4

  GitHub-Repo-Execution: {
    label: "GitHub 仓库"

    Pull-Request: {
      label: "拉取请求"
    }
  }

  GitHub-Actions: {
    label: "GitHub Actions"
  }

  AIGNE-CodeSmith: {
    label: "AIGNE CodeSmith"
    icon: "https://www.arcblock.io/image-bin/uploads/89a24f04c34eca94f26c9dd30aec44fc.png"
  }
  
  Anthropic-API: {
    label: "Anthropic API"
  }
}

# 连接
User -> Setup.Anthropic-Console: "1. 获取 API 密钥"
User -> Setup.GitHub-Repo-Setup.Settings: "2. 添加机密"
User -> Setup.GitHub-Repo-Setup.Workflow-File: "3. 创建工作流"

User -> Execution.GitHub-Repo-Execution.Pull-Request: "4. 创建 PR"
Execution.GitHub-Repo-Execution.Pull-Request -> Execution.GitHub-Actions: "5. 触发工作流"
Execution.GitHub-Actions -> Execution.AIGNE-CodeSmith: "6. 执行操作"
Execution.AIGNE-CodeSmith -> Execution.Anthropic-API: "7. 分析变更"
Execution.Anthropic-API -> Execution.AIGNE-CodeSmith: "8. 提供反馈"
Execution.AIGNE-CodeSmith -> Execution.GitHub-Repo-Execution.Pull-Request: "9. 发布审查"
```

## 验证

安装现已完成。在仓库中下一次创建拉取请求时，AIGNE CodeSmith 将自动激活。该 action 将发布变更摘要，并直接在拉取请求线程中提供代码审查评论。

## 总结

您已通过创建必要的工作流文件和配置 API 密钥机密，成功安装了 AIGNE CodeSmith action。该 action 现在已准备好协助进行代码审查。

要自定义该 action 的行为，例如更改 AI 模型或调整审查参数，请继续阅读[基本配置](./getting-started-basic-configuration.md)指南。