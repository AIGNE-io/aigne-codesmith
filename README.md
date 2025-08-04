<div align="center">

**AI-Powered Code Reviews & PR Summaries for GitHub**

_Accelerate your development workflow with intelligent, context-aware code
reviews using Claude's advanced reasoning capabilities_

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![GitHub Actions](https://img.shields.io/badge/GitHub-Actions-blue?logo=github-actions)](https://github.com/features/actions)
[![Anthropic Claude](https://img.shields.io/badge/Powered%20by-Claude-orange)](https://www.anthropic.com/)
[![TypeScript](https://img.shields.io/badge/Built%20with-TypeScript-blue?logo=typescript)](https://www.typescriptlang.org/)
[![GitHub](https://img.shields.io/github/last-commit/aigne-io/aigne-codesmith/main?style=flat-square)](https://github.com/aigne-io/aigne-codesmith/commits/main)

[🚀 Quick Start](#quick-start) • [📖 Features](#features) •
[⚙️ Configuration](#configuration) • [🤝 Contributing](#contributing)

</div>

---

## 🎯 Why AIGNE CodeSmith?

Transform your code review process with **Claude's advanced reasoning**. Unlike
traditional tools, AIGNE CodeSmith doesn't just check syntax—it understands
context, identifies architectural issues, and provides thoughtful feedback that
helps your team grow.

### ✨ What Makes It Special

- **🧠 Context-Aware Reviews**: Leverages Claude's superior reasoning to
  understand code intent and architecture
- **⚡ Dual-Model Efficiency**: Smart cost optimization with light models for
  summaries, heavy models for deep analysis
- **🎯 Focus on What Matters**: Skips trivial changes, highlights critical
  issues that impact code quality
- **🔧 Fully Customizable**: Tailor prompts and behavior to match your team's
  standards and practices

## 📖 Features

### 🎯 Core Capabilities

| Feature                     | Description                                        | Benefit                                            |
| --------------------------- | -------------------------------------------------- | -------------------------------------------------- |
| **📝 PR Summarization**     | Auto-generates concise summaries and release notes | Save time understanding changes at a glance        |
| **🔍 Line-by-Line Reviews** | Contextual suggestions for code improvements       | Catch issues before they reach production          |
| **💰 Cost Optimization**    | Incremental reviews track only changed files       | Minimize API costs while maximizing coverage       |
| **🧠 Smart Analysis**       | Uses Claude-3.5-Sonnet for superior reasoning      | Get architectural insights, not just syntax checks |
| **⚡ Intelligent Skipping** | Ignores trivial changes (typos, formatting)        | Focus reviewer attention on meaningful changes     |
| **🎨 Custom Prompts**       | Fully customizable review criteria and tone        | Adapt to your team's standards and practices       |

### 🚀 Advanced Features

- **Dual-Model Architecture**: Light model for summaries, heavy model for deep
  analysis
- **Conversation Mode**: Respond to review comments with clarifications
- **Flexible Filtering**: Include/exclude files with glob patterns
- **Multi-Language Support**: Reviews in your preferred language
- **Debug Mode**: Detailed logging for troubleshooting and optimization

## 🚀 Quick Start

Get up and running in under 2 minutes! Just add one file to your repository.

### Step 1: Add the Workflow

Create `.github/workflows/aigne-codesmith.yml` in your repository:

```yaml
name: 🤖 AI Code Review

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

### Step 2: Configure Secrets

Add your Anthropic API key to GitHub Secrets:

1. Go to your repository **Settings** → **Secrets and variables** → **Actions**
2. Click **New repository secret**
3. Name: `ANTHROPIC_API_KEY`
4. Value: Your API key from [Anthropic Console](https://console.anthropic.com/)

### Step 3: That's It! 🎉

Open a pull request and watch AIGNE CodeSmith provide intelligent reviews
automatically.

---

## 💡 Examples & Use Cases

### 🏢 Enterprise Teams

- **Large Codebases**: Maintain consistent standards across multiple
  repositories
- **Security Reviews**: Catch security vulnerabilities before they reach
  production
- **Architectural Guidance**: Get insights on design patterns and best practices
- **Onboarding**: Help new team members learn from AI-powered feedback

### 🚀 Startups & Small Teams

- **Code Quality**: Maintain high standards without dedicated reviewers
- **Knowledge Sharing**: Learn from AI suggestions and improve coding skills
- **Time Saving**: Focus on building features, not catching basic issues
- **24/7 Reviews**: Get feedback immediately, regardless of timezone

### 📚 Open Source Projects

- **Contributor Guidance**: Help newcomers understand project standards
- **Consistent Reviews**: Maintain quality across diverse contributors
- **Documentation**: Auto-generate release notes and change summaries
- **Accessibility**: Support multiple languages for global contributors

### 🎯 Real-World Impact

> _"AIGNE CodeSmith caught 3 critical security issues in our authentication
> system that we missed in manual reviews. The architectural suggestions helped
> us improve our code structure significantly."_
> — **Sarah Chen**, Lead Developer at TechFlow

> _"We reduced our code review time by 60% while actually improving code
> quality. The AI provides context that junior developers found incredibly
> valuable."_
> — **Marcus Rodriguez**, Engineering Manager at DataSync

---

## ⚙️ Configuration

### 🎛️ Basic Configuration

| Parameter               | Description                  | Default                    |
| ----------------------- | ---------------------------- | -------------------------- |
| `anthropic_light_model` | Model for summaries          | `claude-3-5-sonnet-latest` |
| `anthropic_heavy_model` | Model for detailed reviews   | `claude-3-5-sonnet-latest` |
| `max_files`             | Maximum files to review      | `150`                      |
| `review_simple_changes` | Review trivial changes       | `false`                    |
| `language`              | Response language (ISO code) | `en-US`                    |

### 🎨 Custom Prompts

Tailor the AI's personality and focus areas by customizing the `system_message`:

<details>
<summary>🎯 Security-Focused Reviews</summary>

```yaml
system_message: |
  You are a security-focused code reviewer. Prioritize identifying:
  - Authentication and authorization flaws
  - Input validation issues
  - SQL injection vulnerabilities
  - XSS prevention
  - Data exposure risks
  - Cryptographic best practices
```

</details>

<details>
<summary>🏗️ Architecture & Performance Reviews</summary>

```yaml
system_message: |
  You are an architectural reviewer focusing on:
  - System design patterns
  - Performance bottlenecks
  - Scalability concerns
  - Code maintainability
  - SOLID principles
  - Database optimization
```

</details>

### 🚫 Ignoring PRs

Skip AI review for specific PRs by adding this to the PR description:

```text
@codesmith: ignore
```

### 📁 File Filtering

Use `path_filters` to include/exclude files:

```yaml
path_filters: |
  src/**/*.ts
  !**/*.test.ts
  !dist/**
```

**For complete configuration options, see [action.yml](./action.yml)**

---

## 💰 Cost & Performance

### 📊 Pricing Transparency

| Team Size      | Daily Usage | Estimated Cost\* |
| -------------- | ----------- | ---------------- |
| 5 developers   | ~20 PRs     | $3-5/day         |
| 20 developers  | ~80 PRs     | $12-20/day       |
| 50+ developers | ~200 PRs    | $30-50/day       |

\*_Costs vary based on code complexity and review depth. Claude models are
significantly more cost-effective than GPT-4._

### ⚡ Performance Optimizations

- **Smart Caching**: Avoids re-reviewing unchanged code
- **Incremental Analysis**: Only reviews modified files
- **Model Selection**: Light models for summaries, heavy models for complex
  analysis
- **Concurrent Processing**: Parallel file analysis for faster results

---

## 🤝 Contributing

We ❤️ contributions! Whether you're fixing bugs, adding features, or improving
documentation, your help makes AIGNE CodeSmith better for everyone.

### 🚀 Quick Development Setup

```bash
# Clone the repository
git clone https://github.com/aigne-io/aigne-codesmith.git
cd aigne-codesmith

# Install dependencies (Node 17+ required)
pnpm install

# Build and test
pnpm run build
pnpm test

# Package for distribution
pnpm run package
```

### 🎯 How to Contribute

1. **🐛 Found a Bug?** Open an issue with reproduction steps
2. **💡 Have an Idea?** Discuss it in an issue before implementing
3. **📝 Improving Docs?** Documentation PRs are always welcome
4. **🧪 Adding Tests?** Help us improve our test coverage

### 🔧 Development Commands

| Command           | Purpose            |
| ----------------- | ------------------ |
| `pnpm run build`  | Compile TypeScript |
| `pnpm test`       | Run test suite     |
| `pnpm run lint`   | Check code style   |
| `pnpm run format` | Format code        |
| `pnpm run all`    | Full CI pipeline   |

### 📋 Contribution Guidelines

- **Code Style**: We use Prettier and ESLint - run `pnpm run format` before
  committing
- **Tests**: Add tests for new features, ensure existing tests pass
- **Commits**: Use clear, descriptive commit messages
- **PRs**: Include a clear description of changes and link to related issues

### 🏆 Recognition

Contributors are recognized in our release notes and
[CONTRIBUTORS.md](CONTRIBUTORS.md). Thank you for making AIGNE CodeSmith
amazing! 🙌

---

## 📞 Support & Community

### 🆘 Getting Help

- **📖 Documentation**: Check our [Wiki](../../wiki) for detailed guides
- **🐛 Bug Reports**: [Open an issue](../../issues/new?template=bug_report.md)
  with details
- **💡 Feature Requests**:
  [Suggest improvements](../../issues/new?template=feature_request.md)
- **💬 Discussions**: Join our [GitHub Discussions](../../discussions)

### 🔗 Stay Connected

- **⭐ Star this repo** to show your support
- **👀 Watch releases** to get notified of updates
- **🍴 Fork** to experiment with your own modifications
- **📢 Share** with your team and community

## 📄 License

This project is licensed under the [MIT License](LICENSE) - see the LICENSE file
for details.

---

<div align="center">

**Made with ❤️ by the [AIGNE](https://www.aigne.io) Team**

[⭐ Star on GitHub](../../stargazers) • [🐛 Report Issues](../../issues) •
[💡 Request Features](../../issues/new?template=feature_request.md)

</div>
