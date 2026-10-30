# $KIM — Launch Runbook
**Last updated:** 2026-10-30
**Version:** 0.1

---

## Trigger Phrase

Any message containing **"$Kim"** or **"KimSwap"** or **"Ministry of Repatriation"** (any casing) triggers this runbook. Read `KIM.MD` fully first, then follow phases in order.

---

## Phase 0 — Pre-Flight

### 0a. Verify Vault Access
- [ ] Vercel Full Access token: retrievable from Vault
- [ ] GitHub PAT (MJ1804): retrievable from Vault

### 0b. Design Assets
- [ ] Hero image / mascot (propaganda poster style — could be AI-generated)
- [ ] Red star / official seal SVG
- [ ] Stamp/badge assets
- [ ] Favicon (red star on dark)

### 0c. Content Ready
- [ ] 12 seed petitions written (see SPEC.md)
- [ ] 30+ State TV broadcast entries written
- [ ] Character voice guide: North Korean state TV presenter (deadpan, bureaucratic, absurdly serious)

### 0d. Domain Decision
- [ ] Domain: `kim.cash`? `kimswap.io`? `peoplesdex.com`? — pending Martin confirmation
- [ ] Subdomain of existing domain?

---

## Phase 1 — Build

### 1a. Create GitHub Repo
```bash
# Get token from Vault
<GITHUB_PAT>

# Create repo under MJ1804
gh repo create kim-coin --public --description "$KIM — The Democratic People's Decentralized Exchange"

# Or via API:
curl -X POST https://api.github.com/user/repos \
  -H "Authorization: Bearer <TOKEN>" \
  -d '{"name":"kim-coin","description":"$KIM — The Democratic People'\''s Decentralized Exchange","public":true}'
```

### 1b. Core Site Files
Build the following (see SPEC.md for details):
- [ ] `site/index.html` — main page with hero, broadcast ticker, petition grid, submission form
- [ ] `site/css/styles.css` — full design system (red/cream/dark palette, propaganda typography)
- [ ] `site/js/app.js` — main app: wallet init, tab handling, petition rendering
- [ ] `site/js/petitions.js` — petition data (seed data + submission logic)
- [ ] `site/js/broadcast.js` — propaganda broadcast pool + ticker logic
- [ ] `site/api/petition.js` — serverless petition CRUD
- [ ] `site/api/boost.js` — serverless boost handler
- [ ] `site/deploy.sh` — deploy script (guard against wrong project)
- [ ] `site/vercel.json` — framework config

### 1c. Design System
Implement in CSS:
- [ ] Propaganda red (`#c41e3a`) as primary accent
- [ ] Old paper cream (`#f5f0e1`) for petition cards
- [ ] Dark broadcast background (`#111111`) for hero
- [ ] Official stamp border motif on petition cards
- [ ] Bebas Neue headlines
- [ ] Lined paper texture on petition text areas
- [ ] Typewriter effect on broadcasts
- [ ] Stamp "thunk" animation on boost

### 1d. Petition Features
- [ ] Petition grid (sorted by boost count)
- [ ] Featured petition (top, highest boosts)
- [ ] Petition detail modal
- [ ] Boost modal with wallet deduction
- [ ] Submission form with validation
- [ ] Submission confirmation screen

### 1e. Broadcast Feed
- [ ] Ticker bar below header
- [ ] 30+ broadcast entries
- [ ] Auto-rotation (8 sec intervals)
- [ ] Pause on hover

### 1f. Demo Wallet
- [ ] Generate address on first visit (localStorage)
- [ ] 5,000 $KIM starting balance
- [ ] Header wallet badge
- [ ] Boost deduction
- [ ] "Refill" button for demo

---

## Phase 2 — GitHub Push

### 2a. Initialize Repo
```bash
cd projects/kim
git init
git config user.name "MJ1804"
git config user.email "mj1804@users.noreply.github.com"
git remote add origin https://github.com/MJ1804/kim-coin.git
```

### 2b. .gitignore
```
node_modules/
.env
.env.local
.vercel/
```

### 2c. Commit & Push
```bash
git add .
git commit -m "feat: initial $KIM — The Democratic People's DEX"
git branch -M main
git push -u origin main
```

---

## Phase 3 — Vercel Deploy

### 3a. Create Vercel Project
Via dashboard or CLI:
```bash
cd projects/kim/site
npx vercel link --token <VERCEL_TOKEN>
npx vercel project add kim-swap --token <VERCEL_TOKEN>
```

### 3b. Deploy Command
```bash
cd projects/kim/site && ./deploy.sh <VERCEL_TOKEN>
```

Or manual:
```bash
cd projects/kim/site && npx vercel deploy --prod --yes --token <VERCEL_TOKEN>
```

### 3c. Post-Deploy Verification
```bash
curl -sL -o /dev/null -w "%{http_code} %{url_effective}\n" https://<domain>/
curl -sL https://<domain>/js/app.js | head -5
curl -sL https://<domain>/css/styles.css | head -5
```

---

## Phase 4 — Domain & Launch

### 4a. Domain Pointing
- [ ] Point domain at Vercel deployment
- [ ] Verify HTTPS active
- [ ] Check all routes resolve correctly

### 4b. X/Twitter Presence
- [ ] Create `@KimSwapDEX` (or similar)
- [ ] Bio: "The Democratic People's Decentralized Exchange. Ministry of Repatriation. Not financial advice."
- [ ] Profile: propaganda poster style image
- [ ] Banner: red/black state TV aesthetic

### 4c. Launch Posts
First posts should:
- Introduce KimSwap in-character
- Link to the site
- Be short, theatrical, deadpan
- Set expectations (satire, memecoin, not real financial service)

**Example launch post:**
> The Democratic People's Decentralized Exchange is now online.
> The Ministry of Repatriation is accepting petitions.
> Your assets may return home.
> kim.cash

### 4d. Meme Backlog
- 10+ propaganda poster images (consistent style)
- Meme themes: Lazarus Group mythology, crypto victims, state TV absurdity
- Posting cadence: 2-3x daily for first week

---

## Character Voice — State TV Presenter

### The Voice in 5 Rules

1. **Deadpan serious.** Everything is reported with the gravity of a national address. Nothing is ironic in tone — the irony is in the content.

2. **Bureaucratic.** Official phrases, formal language, references to "The Republic," "The Ministry," "The Supreme Leader."

3. **Absurd specificity.** "47.2 ETH has been liberated from capitalist exchange institutions" not "some crypto was stolen."

4. **Short.** Broadcast entries are 1-3 sentences. Headlines are punchy.

5. **No humor about victims.** The humor is at the expense of Lazarus Group mythology and crypto culture — never the people who lost funds.

### Phrases That Fit
- "The Ministry notes this with great satisfaction."
- "The People's Republic is processing your grievances with great efficiency."
- "The Supreme Leader observes that..."
- "Comrades, the time for action has arrived."
- "The Democratic Exchange acknowledges these claims with appropriate gravity."
- "Your assets may return home."

### Phrases That Don't Fit
- ❌ Anything that makes fun of the victims
- ❌ Anything that celebrates actual theft
- ❌ Anything that sounds like it endorses hacking
- ❌ Anything longer than 3 sentences for a broadcast entry

---

## Checklist — Final State (v1 Launch)

- [ ] GitHub repo created under MJ1804
- [ ] All site files built and committed
- [ ] 12 seed petitions written and loaded
- [ ] 30+ broadcast entries written
- [ ] Design system implemented (red/cream/dark, propaganda style)
- [ ] Petition grid, detail modal, boost modal functional
- [ ] Submission form with validation
- [ ] Demo wallet working (localStorage)
- [ ] State TV broadcast ticker functional
- [ ] Vercel deploy verified live
- [ ] Domain pointed correctly
- [ ] X/Twitter account created and configured
- [ ] Launch post written
- [ ] 10+ propaganda meme images in backlog
- [ ] Character voice guide finalized

---

## Key Rules

1. **Victims are not the punchline.** Humor is at the expense of Lazarus mythology and crypto absurdity.
2. **Recovery is a real precedent.** Bybit 2025, Cetus 2025 — KimSwap is a meme-styled bounty board.
3. **Not a stolen coin marketplace.** Petition board + bounty facilitator only.
4. **Separate from LibertyTorch and Veldt.** $Kim has no connection to any other project.
5. **Commit as MJ1804.** Vercel Hobby constraint.
6. **No token promises until mechanism exists.** Boosting is v1. Everything else is roadmap.
