import React, { useMemo, useState } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';

type Tab = 'home' | 'history' | 'explore' | 'profile';
type Message = { role: 'user' | 'assistant'; content: string };

const prompts = ['Explain a complex idea simply', 'Review my code', 'Create a focused study plan', 'Help me brainstorm'];

async function askAbbas(messages: Message[]) {
  const response = await fetch('/api/trpc/ai.chat?batch=1', {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify({ 0: { json: { messages } } }),
  });
  if (!response.ok) throw new Error('The AI service is temporarily unavailable.');
  const payload = await response.json();
  const data = payload?.[0]?.result?.data;
  const result = data?.json ?? data;
  if (!result?.text) throw new Error('The AI returned an empty response.');
  return result.text as string;
}

function App() {
  const [tab, setTab] = useState<Tab>('home');
  const [messages, setMessages] = useState<Message[]>([]);
  const [draft, setDraft] = useState('');
  const [pending, setPending] = useState(false);
  const [error, setError] = useState('');

  const greeting = useMemo(() => {
    const hour = new Date().getHours();
    return hour < 12 ? 'Good morning, Abbas.' : hour < 18 ? 'Good afternoon, Abbas.' : 'Good evening, Abbas.';
  }, []);

  const send = async (value = draft) => {
    const content = value.trim();
    if (!content || pending) return;
    const next = [...messages, { role: 'user' as const, content }];
    setMessages(next);
    setDraft('');
    setError('');
    setPending(true);
    setTab('history');
    try {
      const text = await askAbbas(next);
      setMessages([...next, { role: 'assistant', content: text }]);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong.');
    } finally {
      setPending(false);
    }
  };

  const startChat = (prompt?: string) => {
    setTab('history');
    if (prompt) setDraft(prompt);
  };

  return (
    <div className="app-shell">
      <div className="ambient ambient-one" />
      <div className="ambient ambient-two" />
      <main className="app-main">
        {tab === 'home' && <Home greeting={greeting} onStart={startChat} />}
        {tab === 'history' && <Chat messages={messages} draft={draft} setDraft={setDraft} pending={pending} error={error} onSend={send} />}
        {tab === 'explore' && <Explore onStart={startChat} />}
        {tab === 'profile' && <Profile />}
      </main>
      <nav className="bottom-nav" aria-label="Main navigation">
        {([['home', '⌂', 'Home'], ['history', '◌', 'Chat'], ['explore', '✦', 'Explore'], ['profile', '◉', 'Profile']] as const).map(([key, icon, label]) => (
          <button className={tab === key ? 'nav-item active' : 'nav-item'} key={key} onClick={() => setTab(key)}>
            <span className="nav-icon">{icon}</span><span>{label}</span>
          </button>
        ))}
      </nav>
    </div>
  );
}

function Home({ greeting, onStart }: { greeting: string; onStart: (prompt?: string) => void }) {
  return <section className="page home-page">
    <div className="topline"><div className="brand-mark">✦</div><span className="brand-name">ABBAS AI</span><button className="ghost-icon" onClick={() => onStart()}>＋</button></div>
    <div className="hero-copy"><span className="eyebrow">YOUR FOCUSED AI WORKSPACE</span><h1>{greeting}</h1><p>Think clearly. Build boldly.<br />Make your next idea real.</p></div>
    <button className="primary-cta" onClick={() => onStart()}><span>Start a new conversation</span><b>↗</b></button>
    <div className="section-heading"><span>Quick prompts</span><small>Pick a direction</small></div>
    <div className="prompt-grid">{prompts.map((prompt, index) => <button className="prompt-card" key={prompt} onClick={() => onStart(prompt)}><span className={`prompt-orb orb-${index}`}>{['✦', '⌘', '◈', '✧'][index]}</span><strong>{prompt}</strong><span className="arrow">↗</span></button>)}</div>
    <div className="insight-card"><div><span className="eyebrow">ABBTAS AI / NOTE</span><h3>A calm interface for serious thinking.</h3><p>Your conversations stay focused, simple, and ready when you are.</p></div><span className="insight-mark">◒</span></div>
  </section>;
}

function Chat({ messages, draft, setDraft, pending, error, onSend }: { messages: Message[]; draft: string; setDraft: (v: string) => void; pending: boolean; error: string; onSend: () => void }) {
  return <section className="page chat-page"><div className="page-header"><div><span className="eyebrow">PRIVATE WORKSPACE</span><h2>Conversation</h2></div><span className="status-dot">● Online</span></div><div className="chat-scroll">{messages.length === 0 ? <div className="empty-chat"><div className="large-mark">✦</div><h3>What are you working on?</h3><p>Ask Abbas AI anything. Your first message starts the conversation.</p></div> : messages.map((message, index) => <div className={`bubble-row ${message.role}`} key={`${message.role}-${index}`}><div className="bubble"><span className="bubble-label">{message.role === 'user' ? 'YOU' : 'ABBAS AI'}</span><p>{message.content}</p></div></div>)}{pending && <div className="bubble-row assistant"><div className="bubble"><span className="bubble-label">ABBAS AI</span><p className="typing">Thinking<span>.</span><span>.</span><span>.</span></p></div></div>}</div>{error && <div className="error-banner">{error} <button onClick={onSend}>Retry</button></div>}<div className="composer"><textarea value={draft} onChange={event => setDraft(event.target.value)} onKeyDown={event => { if (event.key === 'Enter' && !event.shiftKey) { event.preventDefault(); onSend(); } }} placeholder="Message Abbas AI..." rows={1} /><button className="send-button" onClick={onSend} disabled={pending || !draft.trim()}>↗</button></div></section>;
}

function Explore({ onStart }: { onStart: (prompt?: string) => void }) { return <section className="page"><div className="page-header"><div><span className="eyebrow">PROMPT LIBRARY</span><h2>Explore</h2></div><span className="page-count">04</span></div><p className="lead">Useful starting points for your next focused session.</p><div className="explore-list">{prompts.concat(['Turn notes into a clear plan']).map((prompt, index) => <button className="explore-row" key={prompt} onClick={() => onStart(prompt)}><span className="row-number">0{index + 1}</span><span>{prompt}</span><b>↗</b></button>)}</div></section>; }
function Profile() { return <section className="page"><div className="page-header"><div><span className="eyebrow">YOUR SPACE</span><h2>Profile</h2></div><div className="avatar">A</div></div><div className="profile-card"><div className="profile-avatar">A</div><div><h3>Abbas Hussain</h3><p>Full Stack Web Developer</p></div><span className="verified">✓</span></div><div className="settings-list"><div><span>◌</span><b>Private by design</b><small>Server-side AI boundary enabled</small></div><div><span>⌁</span><b>Carbon glass theme</b><small>Deep focus, low distraction</small></div><div><span>↗</span><b>About Abbas AI</b><small>Version 1.0 · Built for ideas</small></div></div></section>; }

createRoot(document.getElementById('root')!).render(<App />);
