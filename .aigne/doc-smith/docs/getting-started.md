# Getting Started

This guide provides a direct, step-by-step path to integrating the AIGNE CodeSmith action into your GitHub repository. The process is designed for efficiency and can be completed in under five minutes. By following these instructions, you will have a functional AI-powered code review system active on your project.

This section offers a high-level overview of the setup process. For detailed instructions, please refer to the specific sub-pages.

<x-cards data-columns="2">
  <x-card data-title="Installation" data-icon="lucide:download" data-href="/getting-started/installation">
    Detailed steps for adding the workflow file and configuring the necessary API key secrets.
  </x-card>
  <x-card data-title="Basic Configuration" data-icon="lucide:settings-2" data-href="/getting-started/basic-configuration">
    Guidance on adjusting the most common and essential configuration options to tailor the action to your needs.
  </x-card>
</x-cards>

## Prerequisites

Before proceeding with the installation, you must have an **Anthropic API key**. This key is required for the action to communicate with the Claude AI models that perform the code analysis.

-   You can obtain an API key by signing up at the [Anthropic Console](https://console.anthropic.com/).

## Setup Workflow

The setup process consists of two main steps: creating a workflow file and adding your API key as a repository secret. The following diagram illustrates the workflow from initial setup to a successful run.

```d2
direction: down

Start: {
  shape: oval
}

Create-Workflow-File: {
  label: "Create .github/workflows/\naigne-codesmith.yml"
  shape: rectangle
}

Add-API-Key: {
  label: "Add ANTHROPIC_API_KEY\nto GitHub Secrets"
  shape: rectangle
}

Open-PR: {
  label: "Open a Pull Request"
  shape: rectangle
}

Action-Runs: {
  label: "AIGNE CodeSmith Runs"
  shape: rectangle
}

Post-Comments: {
  label: "Posts PR Summary &\nReview Comments"
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

### Step 1: Installation

The first step is to create a new GitHub Actions workflow file in your repository. This file defines when and how the AIGNE CodeSmith action will run. You will also need to add your Anthropic API key to your repository's secrets to ensure it is stored securely.

For a complete walkthrough, refer to the [Installation guide](./getting-started-installation.md).

### Step 2: Basic Configuration

After installation, you may want to adjust some of the default settings to better fit your team's workflow. The action includes several input parameters that allow you to control its behavior, such as selecting different AI models or setting limits on the number of files to be reviewed.

For an explanation of the most common settings, see the [Basic Configuration guide](./getting-started-basic-configuration.md).

## Next Steps

Once you have completed the installation and initial configuration, AIGNE CodeSmith is ready to use. It will automatically be triggered on new pull requests.

To explore more advanced features and customization options, please proceed to the [Guides](./guides.md) section, where you can learn how to configure file scopes, customize the AI's behavior, and manage specific features.