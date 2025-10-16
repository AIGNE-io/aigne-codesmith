# 快速入门

本指南为您提供了一个直接、分步的路径，将 AIGNE CodeSmith action 集成到您的 GitHub 仓库中。该过程旨在提高效率，不到五分钟即可完成。按照这些说明，您将在您的项目上激活一个功能齐全、由 AI 驱动的代码审查系统。

本节对设置过程进行了高级概述。有关详细说明，请参阅具体的子页面。

<x-cards data-columns="2">
  <x-card data-title="安装" data-icon="lucide:download" data-href="/getting-started/installation">
    添加工作流文件和配置必要的 API 密钥机密的详细步骤。
  </x-card>
  <x-card data-title="基本配置" data-icon="lucide:settings-2" data-href="/getting-started/basic-configuration">
    关于调整最常见和最基本的配置选项以使 action 满足您需求的指南。
  </x-card>
</x-cards>

## 先决条件

在继续安装之前，您必须拥有一个 **Anthropic API 密钥**。此密钥是 action 与执行代码分析的 Claude AI 模型通信所必需的。

-   您可以通过在 [Anthropic Console](https://console.anthropic.com/) 注册来获取 API 密钥。

## 设置工作流

设置过程包括两个主要步骤：创建工作流文件和将您的 API 密钥添加为仓库机密。下图说明了从初始设置到成功运行的工作流。

```d2
direction: down

Start: {
  shape: oval
}

Create-Workflow-File: {
  label: "创建 .github/workflows/\naigne-codesmith.yml"
  shape: rectangle
}

Add-API-Key: {
  label: "将 ANTHROPIC_API_KEY\n添加到 GitHub Secrets"
  shape: rectangle
}

Open-PR: {
  label: "发起一个 Pull Request"
  shape: rectangle
}

Action-Runs: {
  label: "AIGNE CodeSmith 运行"
  shape: rectangle
}

Post-Comments: {
  label: "发布 PR 摘要和\n审查评论"
  shape: rectangle
}

End: {
  shape: oval
}

Start -> Create-Workflow-File
Create-Workflow-File -> Add-API-Key
Add-API-Key -> Open-PR
Open-PR -> Action-Runs
Action-Runs -> Post-Comments
Post-Comments -> End
```

### 步骤 1：安装

第一步是在您的仓库中创建一个新的 GitHub Actions 工作流文件。此文件定义了 AIGNE CodeSmith action 将在何时以及如何运行。您还需要将您的 Anthropic API 密钥添加到您仓库的机密中，以确保其安全存储。

有关完整的演练，请参阅[安装指南](./getting-started-installation.md)。

### 步骤 2：基本配置

安装后，您可能希望调整一些默认设置以更好地适应您团队的工作流。该 action 包括几个输入参数，让您可以控制其行为，例如选择不同的 AI 模型或设置要审查的文件数量的限制。

有关最常见设置的说明，请参阅[基本配置指南](./getting-started-basic-configuration.md)。

## 后续步骤

完成安装和初始配置后，AIGNE CodeSmith 即可使用。它将在新的 pull request 上自动触发。

要探索更高级的功能和自定义选项，请前往[指南](./guides.md)部分，在那里您可以学习如何配置文件范围、自定义 AI 的行为以及管理特定功能。