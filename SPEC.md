# $KIM — Feature Specification
**Last updated:** 2026-10-30
**Version:** 0.1

---

## Design Language

### Color Palette
```
--red:        #c41e3a    (propaganda red, primary accent)
--red-dark:   #8b1528    (darker red for hover/active)
--cream:      #f5f0e1    (old paper, light surfaces)
--cream-dark: #e8e0c8    (darker cream)
--dark:       #111111    (night broadcast background)
--gold:       #d4a017    (medals, official stamps)
--muted:      #888888    (secondary text)
--border:     #333333    (dark mode borders)
--paper-line: #d4c9a8    (lined paper lines)
```

### Typography
- **Headlines:** Bebas Neue (Google Fonts) — bold, condensed, propaganda
- **Body/UI:** DM Sans — clean, readable
- **Official docs:** DM Serif Display — decrees and formal docs

### Visual Motifs
- Official stamp borders (CSS clip-path or border-image)
- "CLASSIFIED" / "TOP SECRET" red tape labels
- Propaganda poster framing (bold rules, centered text, bold colors)
- State TV "LIVE" / "BREAKING NEWS" banners
- Red star iconography
- Lined paper texture for petition cards

### Animations
- Typewriter effect on broadcast text (character by character)
- Stamp "thunk" effect on boost confirmation (scale + rotate)
- Fade-in on petition cards
- Subtle scanline overlay on hero (CRT feel)

---

## Feature 1: Ministry of Repatriation (Homepage)

### Layout
```
┌─────────────────────────────────────────────────────────┐
│ [HEADER] KimSwap • The Democratic People's DEX          │
├─────────────────────────────────────────────────────────┤
│ [HERO]                                                  │
│  "THE MINISTRY OF REPATRIATION"                         │
│  "The People's Republic generously permits your         │
│   assets to return home."                               │
│  [SUBMIT PETITION]  [VIEW ALL PETITIONS]                │
│  [LIVE PETITIONS: 12]  [TOTAL CLAIMS: $2.4M]            │
├─────────────────────────────────────────────────────────┤
│ [STATE TV BROADCAST FEED] ← auto-scrolling ticker      │
├─────────────────────────────────────────────────────────┤
│ [FEATURED PETITION] ← highest boost                     │
│ [PETITION GRID] ← rest, sorted by boost count           │
├─────────────────────────────────────────────────────────┤
│ [SUBMIT YOUR PETITION] ← accordion/form                 │
├─────────────────────────────────────────────────────────┤
│ [FOOTER] $KIM • Democratic People's DEX • Not financial │
│          advice. Memecoin. Satire.                      │
└─────────────────────────────────────────────────────────┘
```

### Petition Card
```
╔═══════════════════════════════════════╗
║ 🏴 VICTIM CLAIM #0042                 ║
║ ══════════════════════════════════════║
║                                       ║
║  "The Lazarus Group has my life       ║
║   savings from the Bybit exploit.     ║
║   47.2 ETH. I am a single father      ║
║   of three. I appeal to the           ║
║   Supreme Leader for intervention."   ║
║                                       ║
║  ─────────────────────────────────    ║
║  Event: Bybit February 2025           ║
║  Amount: ~$124,000 (47.2 ETH)         ║
║  Chain: Ethereum                      ║
║  Status: ██████░░░░ 6 boosts          ║
║                                       ║
║  [BOOST WITH $KIM]                    ║
╚═══════════════════════════════════════╝
```

### Petition Statuses
- `pending` — submitted, awaiting review
- `boosted` — has 3+ boosts
- `featured` — has 10+ boosts, shown at top
- `resolved` — marked resolved (admin only)

---

## Feature 2: Petition Submission Form

### Fields
| Field | Type | Required | Validation |
|---|---|---|---|
| Display name | text | yes | 2-50 chars |
| Event name | text | yes | e.g. "Bybit Feb 2025", "Lazarus Oct 2026" |
| Amount stolen | text | yes | e.g. "47.2 ETH" or "$124,000" |
| Chain | select | yes | ETH, BTC, SOL, BSC, Base, Other |
| Victim wallet | text | no | basic address format check |
| Your story | textarea | yes | 20-2000 chars |
| Evidence link | url | no | valid URL format |
| $KIM address | text | no | for reward delivery if resolved |

### Behavior
1. User fills form
2. Client-side validation
3. Submit → saved to localStorage (v1) or serverless API
4. Show "Petition submitted — under review" confirmation
5. Petition enters queue (status: `pending`)
6. Admin reviews and publishes (in v1: auto-publish with demo delay)

### Submission Confirmation
```
╔═══════════════════════════════════════════════════╗
║  ✓ PETITION SUBMITTED TO THE MINISTRY             ║
║  ═══════════════════════════════════════════════  ║
║  Your claim has been received and filed           ║
║  under Case #0043. The People's Republic           ║
║  will review your submission.                     ║
║                                                    ║
║  You may receive correspondence regarding          ║
║  verification of ownership. Please remain          ║
║  at your terminal.                                 ║
╚═══════════════════════════════════════════════════╝
```

---

## Feature 3: Petition Detail Page

### Route
`/?petition=0042` — modal or expanded view

### Content
- Full story
- All metadata (event, amount, chain, wallet)
- Boost count + progress bar to "featured" status
- Social share buttons (Twitter/X share text)
- Related petitions (same event)

### Boost Modal
```
╔═══════════════════════════════════════════════════╗
║  BOOST THIS PETITION                               ║
║  ═══════════════════════════════════════════════  ║
║  Your $KIM balance: 1,247                          ║
║                                                    ║
║  Amount to spend: [________] $KIM                  ║
║  This will boost: +3 positions                     ║
║                                                    ║
║  [CONFIRM BOOST]                                   ║
╚═══════════════════════════════════════════════════╝
```

---

## Feature 4: State TV Broadcast Feed

### Behavior
- Horizontal ticker at top of page (below header)
- Auto-scrolling propaganda "news" items
- Each item: timestamp + headline in NK state TV voice
- Items drawn from pre-written pool, rotated
- New item every 8 seconds
- Clicking pauses the ticker

### Sample Broadcasts
```
[14:22 UTC] The Supreme Leader observes that 47.2 ETH
  has been liberated from capitalist exchange institutions.
  The People's Portfolio thanks you for your service.

[14:14 UTC] BREAKING: Victim claim #0042 receives 6 boosts.
  The Ministry notes this with great satisfaction.

[14:07 UTC] The Bybit February 2025 exploit has generated
  3 new petitions. The Democratic Exchange acknowledges
  these claims with appropriate gravity.

[13:55 UTC] Total claimed losses: $2,437,000. The People's
  Republic is processing your grievances with great efficiency.

[13:48 UTC] COMRADES: The price of freedom is eternal
  vigilance. And also 0.1 ETH per boost.
```

### Implementation
- Pool of 30+ pre-written broadcasts in `broadcasts.js`
- Random selection, no repeat until pool exhausted
- `setInterval` cycles items in the ticker
- Ticker pauses on hover (accessibility)

---

## Feature 5: Demo Wallet (v1)

### Behavior
- On first visit, generate a random $KIM address and assign balance
- Store in localStorage: `{ address, balance, boostsGiven }`
- Balance: starts at 5,000 $KIM (demo tokens, no real value)
- "Get more $KIM" button for demo refill (no real tx)

### Display
- Small "wallet" badge in header: `▣ 5,247 $KIM`
- Click to see address + "Receive" (copy address)
- Updates live as boosts are spent

---

## API Reference

### GET /api/petitions
Returns all published petitions.
```json
{
  "petitions": [
    {
      "id": "0042",
      "name": "Alex M.",
      "event": "Bybit February 2025",
      "amount": "47.2 ETH",
      "amountUsd": "$124,000",
      "chain": "Ethereum",
      "wallet": "0x742d...d4f2",
      "story": "The Lazarus Group has my life savings...",
      "evidence": "https://...",
      "status": "boosted",
      "boosts": 6,
      "submittedAt": "2026-10-28T14:22:00Z"
    }
  ]
}
```

### POST /api/petitions
Submit a new petition.
```json
// Request
{ "name": "Alex M.", "event": "Bybit February 2025", "amount": "47.2 ETH", "chain": "ETH", "wallet": "0x742d...", "story": "...", "evidence": "..." }

// Response 201
{ "id": "0043", "status": "pending", "message": "Petition received and under review." }
```

### POST /api/boost
Boost a petition.
```json
// Request
{ "petitionId": "0042", "amount": 100 }

// Response 200
{ "success": true, "newBoostCount": 7, "remainingBalance": 5147 }
```

---

## Seed Data (v1 Launch)

12 petitions across different events:
1. Bybit Feb 2025 — 47.2 ETH — $124,000 — 9 boosts
2. Bybit Feb 2025 — 15.1 ETH — $39,900 — 6 boosts
3. DMM Bitcoin 2024 — 3,083 BTC — $308M — 12 boosts
4. UPbit 2019 — 342,000 ETH — $50M — 4 boosts
5. Lazarus Oct 2026 (recent) — 200,000 SOL — $48M — 15 boosts
6. Lazarus Oct 2026 — 15,000 ETH — $39.6M — 8 boosts
7. WazirX July 2024 — $234M (mixed) — 5 boosts
8. Coincheck 2018 — $534M NEM — 3 boosts
9. Poly Network 2021 — $611M — 7 boosts
10. Euler Finance 2023 — $197M — 6 boosts
11. Cetus May 2025 — $219M — 11 boosts
12. BingX April 2024 — $52.5M — 4 boosts

---

## Rate Limits

| Endpoint | Limit |
|---|---|
| GET /api/petitions | 60 req/min |
| POST /api/petitions | 5 req/min/IP |
| POST /api/boost | 10 req/min/IP |

---

## Environment Variables

None required for v1 (all data in localStorage + static JSON).
