'use client';
import { useState, useEffect } from 'react';
import { MessageSquare, Bot, Headphones } from 'lucide-react';
import AiBot from './Ai';

export default function ChatSupport() {
  const [showOptions, setShowOptions] = useState(false);
  const [showAi, setShowAi] = useState(false);
  const [tawkLoaded, setTawkLoaded] = useState(false);
  const [tawkVisible, setTawkVisible] = useState(false);
  const TAWK_SRC = 'https://embed.tawk.to/68e33b93385fee1952fe5d70/1j6rq1eao';

  useEffect(() => {
    if (window?.Tawk_API?.hideWidget) window.Tawk_API.hideWidget();
  }, []);

  const injectTawkScript = () => {
    if (document.querySelector(`script[data-tawk="${TAWK_SRC}"]`)) return;
    const s = document.createElement('script');
    s.src = TAWK_SRC;
    s.async = true;
    s.charset = 'UTF-8';
    s.setAttribute('crossorigin', '*');
    s.setAttribute('data-tawk', TAWK_SRC);
    s.onload = () => waitForTawkAPI();
    document.body.appendChild(s);
  };

  const waitForTawkAPI = (timeout = 10000) => {
    const start = Date.now();
    const interval = setInterval(() => {
      if (window.Tawk_API || window.$Tawk) {
        clearInterval(interval);
        setTawkLoaded(true);
        hideTawkFallback(() => showTawkFallback());
        return;
      }
      if (Date.now() - start > timeout) clearInterval(interval);
    }, 300);
  };

  const showTawkFallback = () => {
    try { window.Tawk_API?.maximize?.(); setTawkVisible(true); return; } catch {}
    try { window.Tawk_API?.showWidget?.(); setTawkVisible(true); return; } catch {}
    try { window.Tawk_API?.popup?.(); setTawkVisible(true); return; } catch {}
    const iframe = document.querySelector('iframe[src*="tawk.to"]');
    if (iframe) { let el = iframe; for (let i = 0; i < 6 && el; i++) { try { el.style.display='block'; el.style.visibility='visible'; } catch{} el = el.parentElement; } setTawkVisible(true); }
  };

  const hideTawkFallback = (cb) => {
    try { window.Tawk_API?.hideWidget?.(); setTawkVisible(false); cb?.(); return; } catch{}
    try { window.Tawk_API?.minimize?.(); setTawkVisible(false); cb?.(); return; } catch{}
    const iframe = document.querySelector('iframe[src*="tawk.to"]');
    if (iframe) { let el = iframe; for(let i=0;i<6&&el;i++){ try{el.style.display='none'; el.style.visibility='hidden'; }catch{} el = el.parentElement; } setTawkVisible(false); cb?.(); }
  };

  const toggleTawk = () => {
    if (!tawkLoaded) { injectTawkScript(); return; }
    tawkVisible ? hideTawkFallback() : showTawkFallback();
  };

  useEffect(() => {
    if (showAi && tawkVisible) hideTawkFallback();
  }, [showAi]);

  const miniButtons = [
    { icon: <Bot size={18} />, onClick: () => { setShowAi(true); setShowOptions(false); }, color: '#16a34a' },
    { icon: <Headphones size={18} />, onClick: () => { toggleTawk(); setShowOptions(false); }, color: '#2563eb' },
  ];

  return (
    <>
      {/* Floating Buttons */}
      <div className="fixed bottom-6 right-6 z-[99999]">
        <div className="relative w-16 h-16">
          {/* Main Button */}
          <button
            onClick={() => setShowOptions(!showOptions)}
            className="absolute w-16 h-16 rounded-full bg-gradient-to-br from-green-500 to-blue-500 text-white shadow-2xl flex items-center justify-center hover:scale-110 transition-transform"
          >
            <MessageSquare size={26} />
          </button>

          {/* Mini Buttons - top arc around main button */}
          {miniButtons.map((btn, idx) => {
            const total = miniButtons.length;
            const spacing = Math.PI / 3; // 90° arc
            const startAngle = Math.PI * 1/3; // start from top-left
            const angle = startAngle + (spacing / (total - 1)) * idx;
            const distance = showOptions ? 80 : 0;
            const x = Math.cos(angle) * distance;
            const y = Math.sin(angle) * -distance; // negative y = up

            return (
              <button
                key={idx}
                onClick={btn.onClick}
                className="absolute w-12 h-12 rounded-full text-white shadow-lg flex items-center justify-center transition-transform"
                style={{
                  transform: `translate(${x}px, ${y}px) scale(${showOptions ? 1 : 0})`,
                  transition: 'transform 0.3s ease',
                  backgroundColor: btn.color,
                }}
              >
                {btn.icon}
              </button>
            );
          })}
        </div>
      </div>

      {/* AI Chat Modal */}
      {showAi && (
        <div className="fixed inset-0 z-[1000] bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white w-full max-w-2xl rounded-2xl shadow-2xl overflow-hidden relative">
            <button
              onClick={() => setShowAi(false)}
              className="absolute top-3 right-4 text-gray-500 hover:text-red-500 text-xl"
            >
              ✖
            </button>
            <AiBot />
          </div>
        </div>
      )}
    </>
  );
}
