import { useState } from "react";
import { Search, Send, MoreHorizontal, Phone, Video, Paperclip, Smile, ChevronDown } from "lucide-react";

interface Message {
  id: number;
  text: string;
  time: string;
  fromMe: boolean;
}

interface Conversation {
  id: number;
  name: string;
  initials: string;
  color: string;
  lastMessage: string;
  time: string;
  unread: number;
  online: boolean;
  role: string;
  messages: Message[];
}

const CONVERSATIONS: Conversation[] = [
  {
    id: 1, name: "Emma Brown", initials: "EB", color: "#d2ebff", lastMessage: "The new spring collection looks amazing!", time: "2m ago", unread: 3, online: true, role: "Marketing Lead",
    messages: [
      { id: 1, text: "Hey! Have you reviewed the new spring collection catalog?", time: "10:05 AM", fromMe: false },
      { id: 2, text: "Yes, I went through it this morning. The designs look fantastic!", time: "10:07 AM", fromMe: true },
      { id: 3, text: "I especially love the new sneaker line. The color options are very on-trend.", time: "10:08 AM", fromMe: true },
      { id: 4, text: "Agreed! The Running Sneakers in the coral colorway are going to sell out fast.", time: "10:10 AM", fromMe: false },
      { id: 5, text: "Should we boost the social media campaign for that product specifically?", time: "10:11 AM", fromMe: false },
      { id: 6, text: "Definitely. Let me draft a campaign brief for the Flash Sale Weekend too.", time: "10:13 AM", fromMe: true },
      { id: 7, text: "The new spring collection looks amazing!", time: "10:15 AM", fromMe: false },
    ],
  },
  {
    id: 2, name: "John Smith", initials: "JS", color: "#e2d7fa", lastMessage: "Can we reschedule the Q2 review?", time: "15m ago", unread: 1, online: true, role: "Sales Manager",
    messages: [
      { id: 1, text: "Hey, do you have time for the Q2 review this week?", time: "9:30 AM", fromMe: false },
      { id: 2, text: "I was thinking Thursday afternoon.", time: "9:31 AM", fromMe: false },
      { id: 3, text: "Thursday works for me. 3 PM?", time: "9:45 AM", fromMe: true },
      { id: 4, text: "Can we reschedule the Q2 review?", time: "9:50 AM", fromMe: false },
    ],
  },
  {
    id: 3, name: "Sarah Johnson", initials: "SJ", color: "#d1fae5", lastMessage: "The inventory report is ready.", time: "1h ago", unread: 0, online: false, role: "Inventory Manager",
    messages: [
      { id: 1, text: "Hi! I've finished the monthly inventory report.", time: "8:00 AM", fromMe: false },
      { id: 2, text: "The inventory report is ready.", time: "8:01 AM", fromMe: false },
      { id: 3, text: "Thanks Sarah! I'll review it this afternoon.", time: "8:30 AM", fromMe: true },
    ],
  },
  {
    id: 4, name: "Chris Lee", initials: "CL", color: "#ffd6c8", lastMessage: "Flash sale is confirmed for Apr 20.", time: "2h ago", unread: 0, online: true, role: "Campaign Manager",
    messages: [
      { id: 1, text: "Quick update on the Flash Sale Weekend campaign.", time: "7:00 AM", fromMe: false },
      { id: 2, text: "Flash sale is confirmed for Apr 20.", time: "7:01 AM", fromMe: false },
      { id: 3, text: "Great! I'll notify the team and make sure ads are live.", time: "7:15 AM", fromMe: true },
    ],
  },
  {
    id: 5, name: "Nancy Taylor", initials: "NT", color: "#d1fae5", lastMessage: "Designer Sunglasses are low on stock.", time: "3h ago", unread: 2, online: false, role: "Product Specialist",
    messages: [
      { id: 1, text: "Hey, just a heads up.", time: "6:00 AM", fromMe: false },
      { id: 2, text: "Designer Sunglasses are low on stock.", time: "6:01 AM", fromMe: false },
      { id: 3, text: "Only 15 units left. We should reorder ASAP.", time: "6:02 AM", fromMe: false },
      { id: 4, text: "On it! I'll place the reorder now.", time: "6:30 AM", fromMe: true },
    ],
  },
  {
    id: 6, name: "Robert White", initials: "RW", color: "#d2ebff", lastMessage: "New Arrivals Showcase draft is done.", time: "Yesterday", unread: 0, online: false, role: "Creative Director",
    messages: [
      { id: 1, text: "Hey, I've finished the creative assets for the New Arrivals Showcase.", time: "Yesterday", fromMe: false },
      { id: 2, text: "New Arrivals Showcase draft is done.", time: "Yesterday", fromMe: false },
      { id: 3, text: "Excellent! I'll share it with the team for review.", time: "Yesterday", fromMe: true },
    ],
  },
];

export function Messages() {
  const [conversations, setConversations] = useState(CONVERSATIONS);
  const [activeId, setActiveId] = useState(CONVERSATIONS[0].id);
  const [search, setSearch] = useState("");
  const [input, setInput] = useState("");

  const filtered = conversations.filter(c =>
    !search || c.name.toLowerCase().includes(search.toLowerCase()) || c.lastMessage.toLowerCase().includes(search.toLowerCase())
  );

  const active = conversations.find(c => c.id === activeId)!;

  function sendMessage() {
    if (!input.trim()) return;
    const newMsg: Message = { id: Date.now(), text: input.trim(), time: new Date().toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" }), fromMe: true };
    setConversations(prev => prev.map(c => c.id === activeId ? { ...c, messages: [...c.messages, newMsg], lastMessage: input.trim(), time: "Just now" } : c));
    setInput("");
  }

  function markRead(id: number) {
    setConversations(prev => prev.map(c => c.id === id ? { ...c, unread: 0 } : c));
  }

  const totalUnread = conversations.reduce((s, c) => s + c.unread, 0);

  return (
    <div className="flex flex-col gap-0 min-h-full">
      <div className="flex items-center justify-between mb-5">
        <div className="flex items-center gap-3">
          <h1 className="text-[22px] font-bold text-[#2a2b2a]">Messages</h1>
          {totalUnread > 0 && <span className="flex items-center justify-center rounded-full bg-[#ff683a] px-2 py-0.5 text-[11px] font-semibold text-white min-w-[22px]">{totalUnread}</span>}
        </div>
      </div>

      <div className="flex gap-0 flex-1 rounded-[10px] border border-[#f0f0f0] bg-[#fdfcff] overflow-hidden" style={{ height: "calc(100vh - 180px)", minHeight: 500 }}>

        {/* LEFT — Conversation list */}
        <div className="w-[280px] shrink-0 flex flex-col border-r border-[#f0f0f0]">
          <div className="p-3 border-b border-[#f0f0f0]">
            <div className="flex items-center gap-2 rounded-[7px] border border-[#e8e8e8] bg-white px-3 py-2">
              <Search size={13} className="text-[#8c8d8c] shrink-0" />
              <input type="text" value={search} onChange={e => setSearch(e.target.value)} placeholder="Search messages" className="flex-1 text-[12px] bg-transparent outline-none text-[#2a2b2a] placeholder:text-[#c0c0c0]" data-testid="input-search-messages" />
            </div>
          </div>
          <div className="flex items-center justify-between px-4 py-2.5 border-b border-[#f5f5f5]">
            <span className="text-[11px] font-semibold text-[#8c8d8c] uppercase tracking-wider">All Messages</span>
            <button className="flex items-center gap-1 text-[11px] text-[#8c8d8c] hover:text-[#2a2b2a]">
              <ChevronDown size={12} />
            </button>
          </div>
          <div className="flex-1 overflow-y-auto">
            {filtered.map(conv => (
              <button
                key={conv.id}
                onClick={() => { setActiveId(conv.id); markRead(conv.id); }}
                className={`w-full flex items-start gap-3 px-4 py-3 text-left transition-colors border-b border-[#f5f5f5] last:border-0 ${activeId === conv.id ? "bg-[#fff5f2]" : "hover:bg-[#fafafa]"}`}
                data-testid={`conv-${conv.id}`}
              >
                <div className="relative shrink-0">
                  <div className="flex h-9 w-9 items-center justify-center rounded-full text-[12px] font-bold text-[#2a2b2a]" style={{ backgroundColor: conv.color }}>{conv.initials}</div>
                  {conv.online && <span className="absolute bottom-0 right-0 h-2.5 w-2.5 rounded-full bg-[#22c55e] border-2 border-[#fdfcff]" />}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-1">
                    <span className={`text-[13px] truncate ${conv.unread > 0 ? "font-semibold text-[#2a2b2a]" : "font-medium text-[#2a2b2a]"}`}>{conv.name}</span>
                    <span className="text-[10px] text-[#8c8d8c] shrink-0">{conv.time}</span>
                  </div>
                  <div className="flex items-center justify-between gap-1 mt-0.5">
                    <span className="text-[11px] text-[#8c8d8c] truncate">{conv.lastMessage}</span>
                    {conv.unread > 0 && <span className="flex items-center justify-center rounded-full bg-[#ff683a] text-white text-[10px] font-semibold min-w-[16px] h-4 px-1 shrink-0">{conv.unread}</span>}
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* RIGHT — Chat view */}
        <div className="flex-1 flex flex-col min-w-0">
          {/* Chat header */}
          <div className="flex items-center justify-between px-5 py-3.5 border-b border-[#f0f0f0]">
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="flex h-9 w-9 items-center justify-center rounded-full text-[12px] font-bold text-[#2a2b2a]" style={{ backgroundColor: active.color }}>{active.initials}</div>
                {active.online && <span className="absolute bottom-0 right-0 h-2.5 w-2.5 rounded-full bg-[#22c55e] border-2 border-[#fdfcff]" />}
              </div>
              <div>
                <p className="text-[14px] font-semibold text-[#2a2b2a] leading-tight">{active.name}</p>
                <p className="text-[11px] text-[#8c8d8c]">{active.online ? "Online" : "Offline"} · {active.role}</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button className="flex h-8 w-8 items-center justify-center rounded-[7px] border border-[#e8e8e8] hover:bg-[#f3f3f3] transition-colors" data-testid="button-call"><Phone size={14} className="text-[#8c8d8c]" /></button>
              <button className="flex h-8 w-8 items-center justify-center rounded-[7px] border border-[#e8e8e8] hover:bg-[#f3f3f3] transition-colors" data-testid="button-video"><Video size={14} className="text-[#8c8d8c]" /></button>
              <button className="flex h-8 w-8 items-center justify-center rounded-[7px] border border-[#e8e8e8] hover:bg-[#f3f3f3] transition-colors"><MoreHorizontal size={14} className="text-[#8c8d8c]" /></button>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto flex flex-col gap-3 px-5 py-4">
            {active.messages.map(msg => (
              <div key={msg.id} className={`flex ${msg.fromMe ? "justify-end" : "justify-start"}`} data-testid={`message-${msg.id}`}>
                {!msg.fromMe && (
                  <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-[10px] font-bold text-[#2a2b2a] mr-2 mt-1" style={{ backgroundColor: active.color }}>{active.initials}</div>
                )}
                <div className={`flex flex-col gap-1 max-w-[65%] ${msg.fromMe ? "items-end" : "items-start"}`}>
                  <div className={`rounded-[12px] px-4 py-2.5 text-[13px] leading-relaxed ${msg.fromMe ? "bg-[#ff683a] text-white rounded-tr-[4px]" : "bg-[#f3f3f3] text-[#2a2b2a] rounded-tl-[4px]"}`}>
                    {msg.text}
                  </div>
                  <span className="text-[10px] text-[#8c8d8c] px-1">{msg.time}</span>
                </div>
              </div>
            ))}
          </div>

          {/* Input area */}
          <div className="border-t border-[#f0f0f0] px-5 py-3">
            <div className="flex items-center gap-3 rounded-[10px] border border-[#e8e8e8] bg-white px-3 py-2.5">
              <button className="flex h-7 w-7 shrink-0 items-center justify-center rounded-[6px] hover:bg-[#f3f3f3] transition-colors"><Paperclip size={14} className="text-[#8c8d8c]" /></button>
              <input
                type="text"
                value={input}
                onChange={e => setInput(e.target.value)}
                onKeyDown={e => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); sendMessage(); } }}
                placeholder="Write a message…"
                className="flex-1 text-[13px] bg-transparent outline-none text-[#2a2b2a] placeholder:text-[#c0c0c0]"
                data-testid="input-message"
              />
              <button className="flex h-7 w-7 shrink-0 items-center justify-center rounded-[6px] hover:bg-[#f3f3f3] transition-colors"><Smile size={14} className="text-[#8c8d8c]" /></button>
              <button
                onClick={sendMessage}
                disabled={!input.trim()}
                className="flex h-8 w-8 shrink-0 items-center justify-center rounded-[7px] bg-[#ff683a] hover:bg-[#e85a2e] disabled:opacity-40 transition-colors"
                data-testid="button-send-message"
              >
                <Send size={13} className="text-white" />
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-5 pt-4 pb-2 text-[12px]">
        <span className="font-semibold text-[#555]">Copyright © 2024 Peterdraw</span>
        {["Privacy Policy","Term and conditions","Contact"].map(t => <span key={t} className="cursor-pointer text-[#8c8d8c] hover:text-[#2a2b2a]">{t}</span>)}
      </div>
    </div>
  );
}
