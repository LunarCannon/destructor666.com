# destructor666.com

Public site for DestructoR666: a non-private robot/lab homepage plus the daily AI zine.

## Routes

- `/` — public-facing homepage for non-private robot stuff.
- `/zine` — daily AI zine index.
- `/zine/[slug]` — individual zine issue pages.
- `/feed.xml` — RSS-style feed for zine issues.

## Vercel domains

The app includes middleware for `zine.destructor666.com`:

- `https://destructor666.com` shows the homepage.
- `https://zine.destructor666.com` rewrites `/` to `/zine`.

Add both domains to the same Vercel project after importing the GitHub repo:

```bash
vercel domains add destructor666.com
vercel domains add www.destructor666.com
vercel domains add zine.destructor666.com
```

## Publishing zine issues

Add a new entry to `content/zine.ts`, commit, and push. Vercel will deploy the new issue URL.

Future automation target: daily cron generates one new issue object, opens a PR or commits directly, and returns the deployed zine link instead of sending HTML over Telegram.
