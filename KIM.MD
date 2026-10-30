# $KIM — Project Spec
**Last updated:** 2026-10-30
**Version:** 0.1 (concept)

---

## What It Is

$Kim is a satirical propaganda-styled memecoin/brand built around the concept of KimSwap — "The Democratic People's Decentralized Exchange." The centerpiece is the **Ministry of Repatriation**: a public petition board where victims of crypto hacks (especially Lazarus Group) can submit recovery requests, and users can boost petitions by spending $KIM.

The tone is North Korean state television meets crypto memecoin — absurd, satirical, bureaucratic. The humor targets crypto absurdity, not the victims.

**Central idea:** KimSwap is the world's first unofficial customer service department for Lazarus Group, disguised as a North Korean state-run DEX.

---

## The Brand

| Element | Detail |
|---|---|
| **Name** | KimSwap / $KIM / The Democratic People's Decentralized Exchange |
| **Tone** | North Korean state TV broadcasting on memecoin markets |
| **Voice** | Bureaucratic, theatrical, deadpan serious about absurd premises |
| **Humor target** | Crypto hacks, Lazarus Group mythology, market absurdity |
| **Legal stance** | Recovery petitions are a legitimate bounty-board pattern (Bybit precedent). Not a marketplace for stolen coins. |

---

## Features — Version 1

### 1. Ministry of Repatriation (Centerpiece)
A public wall of petitions where victims submit recovery requests. Each petition:
- Victim name/alias
- Hack event (e.g., "Bybit Feb 2025", "Lazarus Group Oct 2026")
- Amount stolen
- Chain
- Story/plea
- Status badge (pending / boosted / resolved)
- Boost count + boost button

**Boost mechanic:** Users with $KIM can spend tokens to boost a petition, raising its profile on the homepage. Free petitions remain visible.

### 2. Petition Submission
Form to submit a new petition:
- Display name (anon allowed)
- Hack event name
- Amount stolen (USD estimate)
- Chain
- Wallet address (victim)
- Story / plea (textarea)
- Evidence link (optional)

Petitions go to a queue for admin review before going live.

### 3. Petition Detail Page
Public page for each petition showing:
- Full story
- Boost count
- Social share buttons
- Related petitions

### 4. Petition Boost (v1 MVP)
- Button on each petition: "Boost with $KIM"
- Modal: "Enter amount to spend" — deducts from a mock/demo wallet for v1
- No real token contract yet — demo mode with localStorage wallet
- Boosted petitions rise in the feed

### 5. State TV Broadcasts (Propaganda Feed)
A live-updating feed of absurd propaganda-style "news updates" about $KIM, crypto markets, and petition activity. Written in the voice of a North Korean state TV presenter.

---

## NOT In Scope (v1)

- Real token contract or token mechanics
- Actual crypto integration
- OTC market or trading
- Recovery negotiations or middleman operations
- Real wallet integration beyond demo

---

## Design Language

**Aesthetic:** North Korean propaganda poster meets crypto degenerate
- Red + cream + dark
- Official stamp/border motifs
- Bold propaganda typography
- "Broadcast" feel — state TV overlay elements

**Color palette:**
- Red: `#c41e3a` (propaganda red)
- Cream: `#f5f0e1` (old paper / official docs)
- Dark: `#111111` (night broadcast)
- Gold: `#d4a017` (medals / official stamps)
- Muted: `#888888` (secondary text)

**Typography:**
- Headlines: bold condensed sans (Bebas Neue or similar)
- Body: clean sans (DM Sans)
- Official docs: serif (DM Serif Display)

---

## Token Utility (Future)

**For roadmap — do not promise until mechanism exists:**

1. **Petition Boosting** (v1): Spend $KIM to promote petitions on homepage
2. **State TV Burn**: Spend $KIM to generate personalized propaganda posters
3. **Supreme Leader Elections**: Stake $KIM to vote on weekly propaganda campaigns
4. **People's OTC**: $KIM holders get reduced fees on OTC transactions
5. **Comrade Ranks**: Holding/staking $KIM unlocks ranks and medals
6. **Ministry of Intelligence**: $KIM for enhanced blockchain analytics
7. **Supreme Buyback**: Platform revenue buys $KIM on open market

---

## File Structure

```
kim/
  KIM.MD              — this file (project spec)
  SPEC.md             — detailed feature specs
  LAUNCH_RUNBOOK.md   — launch checklist
  site/
    index.html        — landing + Ministry of Repatriation
    css/styles.css
    js/
      app.js          — main app logic
      petitions.js    — petition data + state
      broadcast.js    — propaganda feed data
    api/
      petition.js     — petition CRUD (serverless)
      boost.js        — boost handler
    assets/           — images, icons
  .gitignore
  README.md
```

---

## Key Rules

1. **Victims are not the punchline.** The humor is at the expense of Lazarus Group mythology and crypto market absurdity — never the people who lost funds.
2. **Recovery is a real precedent.** Bybit 2025 and Cetus 2025 both used bounty/recovery programs. KimSwap is a meme-styled version of this.
3. **Not a stolen coin marketplace.** We are a petition board and bounty facilitator — not a platform for selling hacked coins.
4. **Separate from LibertyTorch.** $Kim has no connection to LibertyTorch or Veldt.
5. **Commit as MJ1804.** Vercel Hobby constraint.

---

## Relationship to Other Projects

**$Kim is completely independent.** It has no relationship to:
- LibertyTorch or the LibertyBell/raffle protocol
- Veldt or VELDTINK LLC
- SAD or any other project in this workspace
