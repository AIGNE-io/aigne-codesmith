# Interacting with the Bot

AIGNE CodeSmith is designed to be an interactive assistant within your pull request workflow. You can communicate directly with the bot to ask follow-up questions or instruct it to skip reviews on certain pull requests. This guide outlines the procedures for these interactions.

## Replying to Review Comments

After the bot posts a review, you may have questions or require clarification on its suggestions. You can engage the bot in a conversation by replying directly to its review comments within the pull request.

When you reply to a comment thread initiated by the bot, it will automatically process your message as a follow-up question. The bot will use the context of the original comment, the surrounding code, and your question to provide a relevant response.

If you wish to bring the bot into a comment thread it did not start, you must mention it by its handle, `@codesmith`.

### How it Works

1.  **Bot Posts a Review:** The bot leaves a comment on a specific line or block of code in your pull request.
2.  **User Replies:** You post a reply to the bot's comment.
3.  **Bot Responds:** The bot processes your reply and posts its own response in the same thread, continuing the conversation.

This allows for a focused, contextual dialogue about specific code changes.

```text
User: @codesmith Can you explain why this approach is better?
```

## Skipping Reviews

There may be instances where a pull request does not require an AI review, such as minor documentation updates or trivial fixes. You can instruct the bot to skip a review for a specific pull request by including a keyword in its description.

To skip a review, add the following text on any line in the body of your pull request description:

```text
@codesmith: ignore
```

The bot will check the pull request description for this keyword when it is triggered. If the keyword is present, the action will terminate gracefully without performing a review or posting any comments. This must be done before the action runs.

### Example Usage

Below is an example of a pull request description that includes the ignore keyword.

```markdown
This PR fixes a small typo in the README file. No code changes are involved.

@codesmith: ignore
```

## Summary

Interacting with the CodeSmith bot is straightforward. To ask follow-up questions, reply to the bot's review comments. To exclude a pull request from AI review, add the `@codesmith: ignore` keyword to its description. These features provide you with greater control over the review process.

For more information on configuring what files the bot reviews, see the [Configuring File Scope](./guides-configuring-file-scope.md) guide.