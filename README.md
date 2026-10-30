# $KIM — The Democratic People's Decentralized Exchange

KimSwap is a satirical propaganda-styled memecoin brand centered on the **Ministry of Repatriation** — a public petition board where victims of crypto exploits can submit recovery requests and receive community boosts.

**The centerpiece:** A wall of formal petitions addressed to Lazarus Group, presented as official pleas to the Supreme Leader. Users spend $KIM to boost petitions, raising their visibility.

**The joke:** KimSwap is the world's first unofficial customer service department for Lazarus Group, disguised as a North Korean state-run DEX.

**The precedent is real:** Bybit (2025) offered up to 10% recovery bounties. Cetus (2025) proposed multimillion-dollar settlements. KimSwap is a meme-styled version of this.

## Features

- **Ministry of Repatriation** — Public petition wall with 12 seed petitions from real-world crypto exploits
- **Petition Boosting** — Spend demo $KIM tokens to raise petition visibility
- **State TV Broadcast Feed** — Auto-scrolling propaganda ticker in NK state TV voice
- **Petition Submission** — Form to file new recovery requests
- **Demo Wallet** — localStorage-based wallet with 5,000 $KIM for testing boosts

## Tech

Plain HTML/CSS/JS + Vercel serverless functions. No framework, no build step.

## Design

- Red (`#c41e3a`) propaganda accents
- Cream (`#f5f0e1`) petition cards on lined paper
- Dark broadcast background (`#111`)
- Bebas Neue headlines + DM Sans body
- State TV typography and visual motifs

## Deploy

```bash
cd site
npx vercel deploy --prod --yes --token <VERCEL_TOKEN>
```

Or use the guarded deploy script:
```bash
cd site && ./deploy.sh <VERCEL_TOKEN>
```

## Character Voice

North Korean state TV presenter — deadpan, bureaucratic, absurdly serious about memecoin markets. The humor targets crypto absurdity and Lazarus Group mythology, never the victims.

## Legal Note

This is a satirical memecoin project. Recovery bounty programs have real-world precedent (Bybit 2025, Cetus 2025). KimSwap is the messenger, not the arbiter. Not financial advice. Not a regulated service.

## Separation from Other Projects

**$KIM is completely independent** and has no relationship to LibertyTorch, Veldt, VELDTINK LLC, SAD, or any other project in this workspace.
