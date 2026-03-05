// ── Modal ──────────────────────────────────────────────
const modal = document.getElementById('addModal');
const openBtns = [document.getElementById('openAddModalNav'), document.getElementById('heroAddBtn')];
const closeBtn = document.getElementById('closeModal');
const saveBtn  = document.getElementById('saveModal');

openBtns.forEach(b => b.addEventListener('click', () => modal.classList.add('open')));
closeBtn.addEventListener('click', () => modal.classList.remove('open'));
modal.addEventListener('click', e => { if (e.target === modal) modal.classList.remove('open'); });
saveBtn.addEventListener('click', () => {
  const name = document.getElementById('subName').value.trim();
  if (!name) { document.getElementById('subName').focus(); return; }
  modal.classList.remove('open');
  // Reset
  ['subName','subAmount','subDate'].forEach(id => document.getElementById(id).value = '');
});

// ── Nav active link on scroll ─────────────────────────
const sections = document.querySelectorAll('section[id]');
const navLinks  = document.querySelectorAll('.nav-link');
const observer  = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      navLinks.forEach(l => l.classList.remove('active'));
      const link = document.querySelector('.nav-link[href="#'+e.target.id+'"]');
      if (link) link.classList.add('active');
    }
  });
}, { threshold: 0.4 });
sections.forEach(s => observer.observe(s));

// ── Chat ──────────────────────────────────────────────
const chatBody  = document.getElementById('chatBody');
const chatInput = document.getElementById('chatInput');
const sendBtn   = document.getElementById('sendChat');

const aiReplies = [
  "Based on your spending, you could save <b>2/month</b> by cutting two underused services.",
  "Your streaming spend has increased by <b>18%</b> over the past 6 months. Consider auditing each service.",
  "I recommend keeping Spotify — it's your most-used service by far.",
  "You have <b>2 renewals</b> in the next 7 days. I'll keep you posted!",
  "Bundling Disney+ with Hulu could save you up to <b>/month</b> on streaming."
];
let replyIdx = 0;

function addMsg(text, isUser = false) {
  const wrap = document.createElement('div');
  wrap.className = 'ai-message';
  if (isUser) wrap.style.flexDirection = 'row-reverse';

  const icon = document.createElement('div');
  icon.className = 'msg-icon ' + (isUser ? 'user' : 'ai');
  icon.textContent = isUser ? '👤' : '⚡';

  const bubble = document.createElement('div');
  bubble.className = 'msg-bubble' + (isUser ? ' user-bubble' : '');
  bubble.innerHTML = text;

  wrap.appendChild(icon);
  wrap.appendChild(bubble);
  chatBody.appendChild(wrap);
  chatBody.scrollTop = chatBody.scrollHeight;
}

function sendMessage() {
  const val = chatInput.value.trim();
  if (!val) return;
  addMsg(val, true);
  chatInput.value = '';
  setTimeout(() => {
    addMsg(aiReplies[replyIdx % aiReplies.length]);
    replyIdx++;
  }, 700);
}

sendBtn.addEventListener('click', sendMessage);
chatInput.addEventListener('keydown', e => { if (e.key === 'Enter') sendMessage(); });

// ── Sticky header shadow ──────────────────────────────
window.addEventListener('scroll', () => {
  const h = document.querySelector('.app-header');
  h.style.boxShadow = window.scrollY > 10 ? '0 4px 30px rgba(0,0,0,0.6)' : 'none';
});
