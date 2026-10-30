// ═══════════════════════════════════════════════════════
// KIMSWAP — State TV Broadcast Feed
// The Democratic People's Television Network
// ═══════════════════════════════════════════════════════

const BROADCASTS = [
  { time: "14:22 UTC", text: "The Supreme Leader observes that 47.2 ETH has been liberated from capitalist exchange institutions. The People's Portfolio thanks you for your service." },
  { time: "14:14 UTC", text: "BREAKING: Victim claim #0042 has received 6 community boosts. The Ministry notes this with great satisfaction." },
  { time: "14:07 UTC", text: "The Bybit February 2025 exploit has generated 3 new petitions. The Democratic Exchange acknowledges these claims with appropriate gravity." },
  { time: "13:55 UTC", text: "Total claimed losses now exceed $2.4 million. The People's Republic is processing your grievances with great efficiency." },
  { time: "13:48 UTC", text: "COMRADES: The price of freedom is eternal vigilance. And also 0.1 ETH per petition boost." },
  { time: "13:41 UTC", text: "The Ministry of Repatriation reports that Case #0039 has been resolved. The victim's assets have returned home. Glory to the Republic." },
  { time: "13:30 UTC", text: "Lazarus Group activity detected on the blockchain. The Ministry is monitoring all liberated assets with great interest." },
  { time: "13:22 UTC", text: "Citizen report: 'I submitted my petition yesterday and already have 3 boosts. The Republic moves fast.' — Filed under: Citizens Express Gratitude." },
  { time: "13:15 UTC", text: "The People's Exchange notes that 12 petitions are now active. Each one represents a family affected by capitalist financial failures." },
  { time: "13:08 UTC", text: "SPECIAL BULLETIN: The Cetus Protocol has proposed a settlement. The Ministry is reviewing the terms with appropriate skepticism." },
  { time: "12:55 UTC", text: "Reminder: All citizens may submit petitions free of charge. The Republic does not require payment for justice." },
  { time: "12:44 UTC", text: "The Supreme Leader has approved the construction of additional Ministry facilities to handle the volume of incoming claims." },
  { time: "12:33 UTC", text: "BREAKING: Bitcoin holdings of 3,083 BTC from the DMM Bitcoin exploit have been petitioned. The Ministry acknowledges this claim." },
  { time: "12:20 UTC", text: "The People's Analytics Division reports suspicious wallet activity consistent with Lazarus Group operational patterns. Investigation ongoing." },
  { time: "12:07 UTC", text: "Citizen inquiry: 'Can I boost my own petition?' The Ministry responds: You may. But the Republic will know." },
  { time: "11:55 UTC", text: "The Euler Finance exploit of March 2023 has generated renewed petition activity. The Ministry notes the passage of time with solemnity." },
  { time: "11:44 UTC", text: "COMRADES: The State Television broadcast network has expanded to include this ticker. Stay informed. Stay loyal." },
  { time: "11:30 UTC", text: "The Poly Network incident of August 2021 remains the largest single claim in Ministry history at $611 million. Records are meant to be broken." },
  { time: "11:18 UTC", text: "New petition submitted: 15,000 ETH allegedly liberated during the October 2026 Lazarus Group operations. The Ministry is reviewing." },
  { time: "11:05 UTC", text: "The People's Republic reminds all citizens: recovery is possible. The Bybit precedent demonstrates that justice, with effort, can prevail." },
  { time: "10:55 UTC", text: "Case #0041 has received a 10-boost designation. This petition is now FEATURED and will receive priority Ministry attention." },
  { time: "10:40 UTC", text: "The WazirX July 2024 exploit has generated $234 million in claimed losses. The Ministry extends its formal acknowledgment." },
  { time: "10:28 UTC", text: "A citizen asks: 'What happens if my petition is not resolved?' The Ministry responds: Persistence is the foundation of all recovery." },
  { time: "10:15 UTC", text: "Total $KIM spent on boosts today: 8,400. These tokens have been contributed to the People's cause of asset repatriation." },
  { time: "10:02 UTC", text: "The Coincheck NEM incident of January 2018 remains a landmark case. $534 million in assets were affected. The Ministry has not forgotten." },
  { time: "09:50 UTC", text: "The Ministry notes with approval that 7 of 12 active petitions have received community boosts. The People's Exchange is functioning as intended." },
  { time: "09:38 UTC", text: "SPECIAL REPORT: The UPbit November 2019 incident involved 342,000 ETH. This claim is currently under preliminary review." },
  { time: "09:25 UTC", text: "Citizen bulletin: Petition boost costs are denominated in $KIM. A small contribution raises the profile of your preferred claims." },
  { time: "09:10 UTC", text: "The Democratic People's Decentralized Exchange is pleased to announce that all systems are operational. Long live the Republic." },
  { time: "08:58 UTC", text: "The Ministry reminds all citizens: evidence strengthens petitions. Etherscan links, transaction hashes, and official reports are encouraged." },
  { time: "08:45 UTC", text: "The People's Voice: 'Finally, a platform that takes our claims seriously.' Filed under: Citizen Feedback, category: Relief." },
  { time: "08:30 UTC", text: "BREAKING: A new petition from the BingX April 2024 incident has been filed. The Ministry extends its formal recognition." },
  { time: "08:15 UTC", text: "The Ministry of Repatriation is now in its 24th hour of continuous operation. The Republic does not rest. Neither should justice." },
  { time: "08:02 UTC", text: "Citizen advisory: Petitions with 10 or more boosts receive featured status. Rally community support for the claims you find most worthy." },
];

let broadcastIndex = 0;
let broadcastPaused = false;
let broadcastTimer = null;

function getNextBroadcast() {
  const item = BROADCASTS[broadcastIndex % BROADCASTS.length];
  broadcastIndex++;
  return item;
}

function buildTickerHTML() {
  // Build enough items to fill the screen (double for seamless loop)
  let html = '';
  const count = Math.max(8, Math.ceil(window.innerWidth / 400) + 2);
  for (let i = 0; i < count; i++) {
    const b = BROADCASTS[(broadcastIndex + i) % BROADCASTS.length];
    html += `<div class="ticker-item"><span class="ticker-time">${b.time}</span> ${b.text}</div>`;
  }
  return html;
}

function initBroadcast() {
  const track = document.getElementById('ticker-track');
  const pauseBtn = document.getElementById('broadcast-pause');
  if (!track) return;

  track.innerHTML = buildTickerHTML();

  pauseBtn.addEventListener('click', () => {
    broadcastPaused = !broadcastPaused;
    track.classList.toggle('paused', broadcastPaused);
    pauseBtn.textContent = broadcastPaused ? '▶' : '❚❚';
  });

  // Refresh ticker content periodically
  setInterval(() => {
    if (!broadcastPaused) {
      broadcastIndex++;
      track.innerHTML = buildTickerHTML();
    }
  }, 12000);
}
