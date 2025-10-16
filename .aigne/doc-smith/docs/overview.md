# Overview

AIGNE CodeSmith is an AI-powered GitHub Action that automates code reviews and pull request summaries. It leverages the advanced reasoning capabilities of Anthropic's Claude models to provide intelligent, context-aware feedback, helping development teams accelerate their workflow and improve code quality.

This document provides a high-level introduction to the action. For a step-by-step guide on how to add it to your repository, see the [Getting Started](./getting-started.md) section.

## Why AIGNE CodeSmith?

Traditional code review processes can be time-consuming and prone to human error. Manual reviews may focus on syntax and style while overlooking deeper architectural flaws or security vulnerabilities. AIGNE CodeSmith addresses these challenges by providing an automated, intelligent layer of review that understands the context and intent behind the code.

Key benefits include:

*   **Accelerated Reviews**: Get immediate feedback on pull requests, reducing wait times for developers.
*   **Improved Code Quality**: Catch critical issues, from logic errors to security risks, before they reach production.
*   **Enhanced Consistency**: Apply consistent review standards across all pull requests and repositories.
*   **Developer Growth**: Provide objective, constructive feedback that helps team members learn and improve.

## Core Features

AIGNE CodeSmith offers a comprehensive suite of features designed to integrate seamlessly into the modern development lifecycle.

<x-cards data-columns="2">
  <x-card data-title="AI-Powered Code Reviews" data-icon="lucide:code-2">
    The action provides line-by-line code reviews with contextual suggestions for improvements in logic, security, performance, and maintainability. It uses Claude's advanced reasoning to deliver insights that go beyond simple syntax checking.
  </x-card>
  <x-card data-title="PR Summarization" data-icon="lucide:file-text">
    Automatically generates concise summaries for every pull request, including a high-level walkthrough and a table of file changes. It can also draft release notes based on the PR's user impact.
  </x-card>
  <x-card data-title="Dual-Model Architecture" data-icon="lucide:cpu">
    For efficiency and cost optimization, the action uses a dual-model approach: a lightweight model for quick tasks like summarization and a more powerful model for in-depth code analysis.
  </x-card>
  <x-card data-title="Fully Customizable" data-icon="lucide:sliders-horizontal">
    Tailor the AI's behavior to fit your team's standards. Customize system prompts to focus on specific areas like security or performance, and use path filters to include or exclude certain files from the review process.
  </x-card>
</x-cards>

## How It Works

The action is triggered by events in your GitHub repository, primarily `pull_request` and `pull_request_review_comment`. The entire process is automated and requires no manual intervention after initial setup.

The following diagram illustrates the high-level workflow:
<figure>
  <img src="https://generated-diagrams.s3.amazonaws.com/B1720562635399.png" alt="A diagram that shows the workflow of the AIGNE CodeSmith GitHub Action. A developer pushes a commit to a pull request on GitHub, which triggers the AIGNE CodeSmith GitHub Action. The action then sends the code changes to the Anthropic Claude API for analysis. The Claude API returns a code review and summary, which the GitHub Action posts as a comment on the pull request. The developer can then view and respond to the feedback."/>
  <figcaption>AIGNE CodeSmith Workflow</figcaption>
</figure>

1.  **Pull Request Opened**: A developer opens a new pull request or pushes changes to an existing one.
2.  **Workflow Triggered**: The push event triggers the `aigne-codesmith.yml` workflow in your repository.
3.  **Code Analysis**: The action checks out the code and sends the diffs (changes) to the configured Anthropic Claude models for analysis.
4.  **Feedback Generation**: The AI generates a PR summary, release notes, and line-by-line review comments based on the customized prompts.
5.  **Comment Posting**: The action posts the summary and review comments directly to the pull request via the GitHub API.

## Summary

AIGNE CodeSmith is a powerful tool for automating and enhancing the code review process. By integrating advanced AI directly into your GitHub workflow, you can save time, improve code quality, and foster a more collaborative development environment.

To start using the action, proceed to the [Installation](./getting-started-installation.md) guide.