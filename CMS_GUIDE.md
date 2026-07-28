# Tripoint content management

Tripoint uses Pages CMS, a free GitHub-based content editor.

## First-time setup

1. Open https://app.pagescms.org.
2. Choose **Sign in with GitHub**.
3. Install the Pages CMS GitHub App.
4. Give it access only to the `opaki25/tripoint` repository.
5. Open the repository and select the `main` branch.

The editor will automatically show:

- **Gallery images** — upload an image, write its caption and description, choose a card size, and decide whether it is visible.
- **Blog posts** — add the title, category, cover image, short introduction and full formatted article.

## Publishing

Saving in Pages CMS commits the content to GitHub. The existing Vercel project should then redeploy automatically from the `main` branch. Allow a short time for the new version to become live.

## Useful controls

- Turn off **Show on website** to keep an item as a draft.
- Turn on **Feature at the top** for the main blog article.
- Keep image descriptions short and specific so the website remains accessible.
- Use lowercase words separated by hyphens for a blog URL name.
