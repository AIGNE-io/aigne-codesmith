# 概述

AIGNE CodeSmith 是一款由 AI 驱动的 GitHub Action，可自动化代码审查和拉取请求摘要。它利用 Anthropic Claude 模型先进的推理能力，提供智能的、上下文感知的反馈，帮助开发团队加速工作流程并提高代码质量。

本文档对该 Action 进行了高级介绍。有关如何将其添加到您的仓库的逐步指南，请参阅[入门指南](./getting-started.md)部分。

## 为什么选择 AIGNE CodeSmith？

传统的代码审查流程可能非常耗时且容易出现人为错误。人工审查可能侧重于语法和风格，而忽略了更深层次的架构缺陷或安全漏洞。AIGNE CodeSmith 通过提供一个能够理解代码背后上下文和意图的自动化、智能审查层来应对这些挑战。

主要优势包括：

*   **加速审查**：即时获取对拉取请求的反馈，减少开发人员的等待时间。
*   **提高代码质量**：在代码进入生产环境之前，捕捉从逻辑错误到安全风险等关键问题。
*   **增强一致性**：在所有拉取请求和仓库中应用一致的审查标准。
*   **促进开发者成长**：提供客观、建设性的反馈，帮助团队成员学习和进步。

## 核心功能

AIGNE CodeSmith 提供了一套全面的功能，旨在无缝集成到现代开发生命周期中。

<x-cards data-columns="2">
  <x-card data-title="AI 驱动的代码审查" data-icon="lucide:code-2">
    该 Action 提供逐行代码审查，并针对逻辑、安全性、性能和可维护性方面的改进提出与上下文相关的建议。它利用 Claude 的先进推理能力，提供超越简单语法检查的深刻见解。
  </x-card>
  <x-card data-title="PR 摘要" data-icon="lucide:file-text">
    为每个拉取请求自动生成简洁的摘要，包括高级概述和文件变更表。它还可以根据 PR 对用户的影响起草发布说明。
  </x-card>
  <x-card data-title="双模型架构" data-icon="lucide:cpu">
    为了提高效率和优化成本，该 Action 采用双模型方法：一个轻量级模型用于摘要等快速任务，一个更强大的模型用于深入的代码分析。
  </x-card>
  <x-card data-title="完全可定制" data-icon="lucide:sliders-horizontal">
    定制 AI 的行为以适应您团队的标准。您可以自定义系统提示，以专注于安全性或性能等特定领域，并使用路径过滤器在审查过程中包含或排除某些文件。
  </x-card>
</x-cards>

## 工作原理

该 Action 由您 GitHub 仓库中的事件触发，主要是 `pull_request` 和 `pull_request_review_comment`。整个过程是自动化的，在初始设置后无需人工干预。

下图说明了其高级工作流程：
<figure>
  <img src="https://generated-diagrams.s3.amazonaws.com/B1720562635399.png" alt="该图展示了 AIGNE CodeSmith GitHub Action 的工作流程。开发者向 GitHub 上的拉取请求推送一个提交，这会触发 AIGNE CodeSmith GitHub Action。然后，该 Action 将代码变更发送到 Anthropic Claude API 进行分析。Claude API 返回代码审查和摘要，GitHub Action 将其作为评论发布到拉取请求上。开发者随后可以查看并回应这些反馈。"/>
  <figcaption>AIGNE CodeSmith 工作流程</figcaption>
</figure>

1.  **开启拉取请求**：开发者开启一个新的拉取请求或向现有请求推送变更。
2.  **触发工作流**：推送事件会触发您仓库中的 `aigne-codesmith.yml` 工作流。
3.  **代码分析**：Action 会检出代码，并将差异（变更）发送给配置的 Anthropic Claude 模型进行分析。
4.  **生成反馈**：AI 根据自定义提示生成 PR 摘要、发布说明和逐行审查评论。
5.  **发布评论**：Action 通过 GitHub API 将摘要和审查评论直接发布到拉取请求中。

## 总结

AIGNE CodeSmith 是一个用于自动化和增强代码审查流程的强大工具。通过将先进的 AI 直接集成到您的 GitHub 工作流程中，您可以节省时间、提高代码质量，并营造一个更具协作性的开发环境。

要开始使用该 Action，请继续阅读[安装](./getting-started-installation.md)指南。