import React, { useState } from 'react';

interface InviteCardProps {
  title: string;
  profit: string;
}

const InviteCard: React.FC<InviteCardProps> = ({ title, profit }) => {
  const [copied, setCopied] = useState(false);

  const tg = (window as any).Telegram?.WebApp;
  const userId = tg?.initDataUnsafe?.user?.id || 'guest';
  const botUsername = "IncomingCashOfficial_bot";
  const botUrl = `https://t.me/${botUsername}?start=${userId}`;

  const handleCopy = (e: React.MouseEvent) => {
    e.stopPropagation(); // কার্ডের মেইন ক্লিক যেন ফায়ার না হয়
    navigator.clipboard.writeText(botUrl).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  const handleInvite = () => {
    const text = encodeURIComponent("Join this awesome app and get bonuses!");
    const shareUrl = `https://t.me/share/url?url=${encodeURIComponent(botUrl)}&text=${text}`;

    if (tg?.openTelegramLink) {
      tg.openTelegramLink(shareUrl);
    } else {
      window.open(shareUrl, '_blank');
    }
  };

  return (
    <div onClick={handleInvite} className="group w-full rounded-lg bg-gradient-to-b from-pink-50 to-indigo-600 pt-[1px] px-[1px] cursor-pointer my-2">
      <div className="group w-full rounded-lg transition relative duration-300 hover:translate-y-[3px] bg-[#272A30] py-3 px-4 flex flex-col gap-2">
        <div className="flex justify-between items-center">
          <div>
            <p className="text-white text-lg font-bold">{title}</p>
            <p className="text-yellow-400 text-sm pt-1">+{profit} Coins</p>
          </div>
        </div>
        
        {/* রেফারেল লিংক দেখানোর বক্স এবং কপি বাটন */}
        <div className="flex items-center bg-[#1a1c23] rounded p-2 mt-1 border border-gray-700" onClick={(e) => e.stopPropagation()}>
          <input 
            type="text" 
            readOnly 
            value={botUrl} 
            className="bg-transparent text-xs text-gray-300 w-full outline-none px-1 truncate"
          />
          <button 
            onClick={handleCopy}
            className="bg-indigo-600 hover:bg-indigo-700 text-white text-xs px-3 py-1 rounded ml-2 transition"
          >
            {copied ? 'Copied!' : 'Copy'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default InviteCard;

