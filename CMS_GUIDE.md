# Tripoint content management

Tripoint uses Pages CMS, a free GitHub-based content editor.

## First-time setup

1. Open https://app.pagescms.org.
2. Choose **Sign in with GitHub**.
3. Install the Pages CMS GitHub App.
4. Give it access only to the `tripointmcl256/tripoint` repository.
5. Open the repository and select the `main` branch.

Make sure the repository name shown at the top of Pages CMS is
`tripointmcl256/tripoint`. The editor will automatically show:

- **Page images** — replace the named images used on the homepage, About, Expertise, Approach, Sectors and Gallery pages.
- **Gallery images** — upload an image, write its caption and description, choose a card size, and decide whether it is visible.
- **Blog posts** — add the title, category, cover image, short introduction and full formatted article.

## Publishing

Saving in Pages CMS commits the content to GitHub. In Vercel, confirm that the live Tripoint project is connected to `tripointmcl256/tripoint` on the `main` branch. Vercel should then redeploy automatically whenever CMS content is saved. Allow a short time for the new version to become live.

All uploaded website images are stored in `assets/uploads` inside the new Tripoint repository. The old `opaki25/tripoint` repository is not used by this CMS setup.

## Useful controls

- Turn off **Show on website** to keep an item as a draft.
- Turn on **Feature at the top** for the main blog article.
- Keep image descriptions short and specific so the website remains accessible.
- Use lowercase words separated by hyphens for a blog URL name.
- Use landscape images for wide or main image positions. Portrait images work best in tall positions.
