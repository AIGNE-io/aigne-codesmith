# Installation

This document provides a systematic guide to installing the AIGNE CodeSmith GitHub Action. The process involves adding a workflow file to your repository and configuring the necessary API key to enable the service.

## Prerequisites

Before proceeding with the installation, ensure the following conditions are met:

1.  **Repository Access**: You must have administrative privileges for the GitHub repository where the action will be installed.
2.  **Anthropic API Key**: A valid API key from Anthropic is required. This can be obtained from the [Anthropic Console](https://console.anthropic.com/).

## Installation Process

The installation is a two-step process: creating a workflow file and configuring a repository secret.

### Step 1: Create the Workflow File

The AIGNE CodeSmith action is triggered by a GitHub Actions workflow. A workflow file is required to define the events that trigger the action.

1.  Navigate to the root directory of your GitHub repository.
2.  Create a directory named `.github/workflows`. If this directory already exists, you may proceed to the next step.
3.  Within the `.github/workflows` directory, create a new file named `aigne-codesmith.yml`.
4.  Insert the following YAML configuration into the `aigne-codesmith.yml` file. This configuration sets the action to run on pull requests and pull request comments.

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

### Step 2: Configure Repository Secrets

Your Anthropic API key must be stored securely as a secret in your GitHub repository. The workflow will use this secret to authenticate with the Anthropic API.

1.  In your GitHub repository, navigate to the **Settings** tab.
2.  In the left sidebar, select **Secrets and variables**, then click on **Actions**.
3.  Click the **New repository secret** button.
4.  In the **Name** field, enter `ANTHROPIC_API_KEY`. This name must match exactly what is specified in the workflow file.
5.  In the **Value** field, paste the API key you obtained from the Anthropic Console.
6.  Click **Add secret** to save.

The diagram below illustrates the setup and execution flow.

```d2
direction: down

User: {
  shape: c4-person
}

Setup: {
  label: "One-Time Setup"
  style.stroke-dash: 4

  Anthropic-Console: {
    label: "Anthropic Console"
  }

  GitHub-Repo-Setup: {
    label: "GitHub Repository"
    
    Settings: {
      label: "Settings\nSecrets & variables"
    }

    Workflow-File: {
      label: ".github/workflows/\naigne-codesmith.yml"
    }
  }
}


Execution: {
  label: "On Every Pull Request"
  style.stroke-dash: 4

  GitHub-Repo-Execution: {
    label: "GitHub Repository"

    Pull-Request: {
      label: "Pull Request"
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

# Connections
User -> Setup.Anthropic-Console: "1. Obtain API Key"
User -> Setup.GitHub-Repo-Setup.Settings: "2. Add secret"
User -> Setup.GitHub-Repo-Setup.Workflow-File: "3. Create workflow"

User -> Execution.GitHub-Repo-Execution.Pull-Request: "4. Create PR"
Execution.GitHub-Repo-Execution.Pull-Request -> Execution.GitHub-Actions: "5. Trigger workflow"
Execution.GitHub-Actions -> Execution.AIGNE-CodeSmith: "6. Execute action"
Execution.AIGNE-CodeSmith -> Execution.Anthropic-API: "7. Analyze changes"
Execution.Anthropic-API -> Execution.AIGNE-CodeSmith: "8. Provide feedback"
Execution.AIGNE-CodeSmith -> Execution.GitHub-Repo-Execution.Pull-Request: "9. Post review"
```

## Verification

The installation is now complete. AIGNE CodeSmith will be activated automatically on the next pull request created in the repository. The action will post a summary of the changes and provide code review comments directly in the pull request thread.

## Summary

You have successfully installed the AIGNE CodeSmith action by creating the necessary workflow file and configuring the API key secret. The action is now ready to assist with code reviews.

To customize the behavior of the action, such as changing the AI model or adjusting review parameters, please proceed to the [Basic Configuration](./getting-started-basic-configuration.md) guide.