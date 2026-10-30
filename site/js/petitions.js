// ═══════════════════════════════════════════════════════
// KIMSWAP — Petition Data Store
// ═══════════════════════════════════════════════════════

// Seed petitions — 12 real-world crypto exploit events
const PETITIONS = [
  {
    id: "0041",
    name: "Marcus R.",
    event: "Bybit February 2025",
    amount: "47.2 ETH",
    amountUsd: "$124,000",
    chain: "Ethereum",
    wallet: "0x742d35Cc6634C0532...",
    story: "The Lazarus Group has my life savings from the Bybit exploit. I am a single father of three and I worked for three years to accumulate those funds. I appeal to the Supreme Leader for intervention. The Republic is my last hope.",
    evidence: "https://etherscan.io/tx/0x...",
    status: "featured",
    boosts: 14,
    submittedAt: "2026-10-25T09:14:00Z"
  },
  {
    id: "0040",
    name: "CryptoAnon_47",
    event: "Lazarus Group Oct 2026",
    amount: "200,000 SOL",
    amountUsd: "$48,000,000",
    chain: "Solana",
    wallet: "7nX2...",
    story: "The October 2026 Lazarus Group operations took everything. I was a liquidity provider on three protocols. I watched my entire position vanish in a single transaction. I am not a whale — I was just trying to earn yield. The Republic understands the common citizen.",
    evidence: "",
    status: "boosted",
    boosts: 11,
    submittedAt: "2026-10-26T14:22:00Z"
  },
  {
    id: "0039",
    name: "Sarah Chen",
    event: "Cetus May 2025",
    amount: "$219M (CVX, SOL)",
    amountUsd: "$219,000,000",
    chain: "Solana",
    wallet: "AbCd...",
    story: "I was a core contributor to a DeFi protocol that held Cetus LP positions. When the exploit happened, our entire treasury was drained. 40 employees lost their jobs overnight. We are not asking for charity — we are asking for the return of what was stolen from hundreds of small investors.",
    evidence: "https://solscan.io/tx/...",
    status: "featured",
    boosts: 17,
    submittedAt: "2026-10-24T11:00:00Z"
  },
  {
    id: "0038",
    name: "DMM-Victim-Group",
    event: "DMM Bitcoin 2024",
    amount: "3,083 BTC",
    amountUsd: "$308,300,000",
    chain: "Bitcoin",
    wallet: "1A2B...",
    story: "We are a collective of 847 retail investors affected by the DMM Bitcoin hack. Our combined holdings were converted to BTC at great cost and then vanished. We request the Ministry's intervention in coordinating our collective recovery effort.",
    evidence: "",
    status: "boosted",
    boosts: 9,
    submittedAt: "2026-10-23T16:30:00Z"
  },
  {
    id: "0037",
    name: "James K.",
    event: "Bybit February 2025",
    amount: "15.1 ETH",
    amountUsd: "$39,900",
    chain: "Ethereum",
    wallet: "0x8f3D...",
    story: "I lost 15.1 ETH — my entire crypto portfolio — in the Bybit February 2025 incident. I am a graphic designer, not a crypto degent. I was simply trying to diversify my retirement savings. Please help.",
    evidence: "",
    status: "boosted",
    boosts: 6,
    submittedAt: "2026-10-22T08:15:00Z"
  },
  {
    id: "0036",
    name: "VentureDAO",
    event: "Lazarus Group Oct 2026",
    amount: "15,000 ETH",
    amountUsd: "$39,600,000",
    chain: "Ethereum",
    wallet: "0xdEad...",
    story: "Our DAO held a multi-sig treasury. A social engineering attack linked to Lazarus Group drained our reserves in 47 transactions. We had funded three public goods projects. Those projects are now unfunded. Help us help the ecosystem.",
    evidence: "https://etherscan.io/...",
    status: "boosted",
    boosts: 8,
    submittedAt: "2026-10-21T19:45:00Z"
  },
  {
    id: "0035",
    name: "Lydia O.",
    event: "Poly Network 2021",
    amount: "$611M (multi-chain)",
    amountUsd: "$611,000,000",
    chain: "Multi-chain",
    wallet: "0xFAcE...",
    story: "The Poly Network exploit was the largest in history at the time. While the white hat returned most funds, approximately $33M was never recovered. I held positions across Ethereum, BSC, and Polygon. That $33M still has not returned home.",
    evidence: "",
    status: "pending",
    boosts: 4,
    submittedAt: "2026-10-20T12:00:00Z"
  },
  {
    id: "0034",
    name: "DefiStanley",
    event: "Euler Finance 2023",
    amount: "$197M (multi-token)",
    amountUsd: "$197,000,000",
    chain: "Ethereum",
    wallet: "0xB0b...",
    story: "I ran a medium-sized DeFi operation with Euler Finance positions across 6 tokens. The flash loan exploit took everything. I had 12 employees. We had to shut down operations and lay everyone off. Euler never compensated LPs.",
    evidence: "https://etherscan.io/...",
    status: "pending",
    boosts: 5,
    submittedAt: "2026-10-19T15:30:00Z"
  },
  {
    id: "0033",
    name: "WazirX-Victims-Coalition",
    event: "WazirX July 2024",
    amount: "$234M (mixed)",
    amountUsd: "$234,000,000",
    chain: "Multi-chain",
    wallet: "0xC0FFEE...",
    story: "We represent 43,000 retail investors in India who lost life savings on WazirX. The exchange froze withdrawals after the July 2024 hack. We have been waiting over a year for any resolution. The Indian authorities have been unhelpful. We turn to the international community.",
    evidence: "https://...",
    status: "pending",
    boosts: 7,
    submittedAt: "2026-10-18T10:00:00Z"
  },
  {
    id: "0032",
    name: "Anonymous_99",
    event: "Coincheck 2018",
    amount: "523M NEM",
    amountUsd: "$534,000,000",
    chain: "NEM / Ethereum",
    wallet: "NC4T...",
    story: "I held NEM tokens on Coincheck when it was hacked in January 2018. Coincheck compensated some users in JPY but the NEM tokens themselves were never returned. The NEM Foundation did not compensate holders. Some of us never recovered our original position.",
    evidence: "",
    status: "pending",
    boosts: 3,
    submittedAt: "2026-10-17T14:00:00Z"
  },
  {
    id: "0031",
    name: "Tomas V.",
    event: "UPbit November 2019",
    amount: "342,000 ETH",
    amountUsd: "$50,000,000",
    chain: "Ethereum",
    wallet: "0xDead...",
    story: "UPbit was hacked in November 2019. While they claimed to have sufficient reserves to cover customer losses, the actual compensation process was opaque and many users received far less than their actual holdings were worth at the time of the hack. I am seeking transparency and fair compensation.",
    evidence: "",
    status: "pending",
    boosts: 4,
    submittedAt: "2026-10-16T09:30:00Z"
  },
  {
    id: "0030",
    name: "NightOwl_Crypto",
    event: "BingX April 2024",
    amount: "$52.5M (multi-token)",
    amountUsd: "$52,500,000",
    chain: "Multi-chain",
    wallet: "0xF00D...",
    story: "I operated a trading bot on BingX. The April 2024 security incident drained all my bot funds and my personal trading account simultaneously. The exchange's compensation plan covered only a fraction of actual losses. I have screenshots, transaction logs, and full correspondence with their support team.",
    evidence: "https://...",
    status: "pending",
    boosts: 3,
    submittedAt: "2026-10-15T17:00:00Z"
  }
];

// App state
let wallet = null;

function generateWallet() {
  // Generate a random demo address
  const chars = '0123456789abcdef';
  let addr = '0x';
  for (let i = 0; i < 40; i++) addr += chars[Math.floor(Math.random() * 16)];
  return {
    address: addr,
    balance: 5000,
    boostsGiven: 0
  };
}

function loadWallet() {
  try {
    const stored = localStorage.getItem('kim_wallet');
    if (stored) {
      wallet = JSON.parse(stored);
    } else {
      wallet = generateWallet();
      saveWallet();
    }
  } catch (e) {
    wallet = generateWallet();
  }
}

function saveWallet() {
  localStorage.setItem('kim_wallet', JSON.stringify(wallet));
}

function updateWalletBalance(delta) {
  if (!wallet) loadWallet();
  wallet.balance = Math.max(0, wallet.balance + delta);
  wallet.boostsGiven += delta < 0 ? 1 : 0;
  saveWallet();
  updateWalletBadge();
}

function updateWalletBadge() {
  const badge = document.getElementById('wallet-balance');
  if (badge && wallet) {
    badge.textContent = wallet.balance.toLocaleString();
  }
}

function getStatusClass(status) {
  return status;
}

function getStatusLabel(status) {
  const labels = { pending: 'PENDING REVIEW', boosted: 'BOOSTED', featured: 'FEATURED', resolved: 'RESOLVED' };
  return labels[status] || status.toUpperCase();
}

function getFeaturedPetition() {
  return PETITIONS.filter(p => p.status === 'featured').sort((a, b) => b.boosts - a.boosts)[0] || PETITIONS[0];
}

function getSortedPetitions() {
  return [...PETITIONS].sort((a, b) => b.boosts - a.boosts);
}

function getTotalClaims() {
  return PETITIONS.reduce((sum, p) => {
    const match = p.amountUsd.replace(/[$,]/g, '');
    const num = parseFloat(match);
    return sum + (isNaN(num) ? 0 : num);
  }, 0);
}

function boostPetition(id, amount) {
  const p = PETITIONS.find(p => p.id === id);
  if (!p) return false;
  if (!wallet || wallet.balance < amount) return false;
  updateWalletBalance(-amount);
  p.boosts += Math.ceil(amount / 10); // 10 $KIM = 1 boost equivalent
  // Update status if needed
  if (p.boosts >= 10) p.status = 'featured';
  else if (p.boosts >= 3) p.status = 'boosted';
  return true;
}

function addPetition(data) {
  const id = String(PETITIONS.length + 42).padStart(4, '0');
  const newPetition = {
    id,
    ...data,
    status: 'pending',
    boosts: 0,
    submittedAt: new Date().toISOString()
  };
  PETITIONS.unshift(newPetition);
  return id;
}

// Format helpers
function formatAmount(usd) {
  if (usd >= 1000000000) return `$${(usd / 1000000000).toFixed(1)}B`;
  if (usd >= 1000000) return `$${(usd / 1000000).toFixed(1)}M`;
  if (usd >= 1000) return `$${(usd / 1000).toFixed(0)}K`;
  return `$${usd}`;
}
