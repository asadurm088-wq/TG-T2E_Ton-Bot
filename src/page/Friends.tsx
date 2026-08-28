import { useState } from "react";

export default function Friends() {
  const [friends] = useState([
    { id: 1, name: "Lari0 | FutureValueApp", rank: "Platinum", reward: 49.53 },
    { id: 2, name: "Dan Ber", rank: "Platinum", reward: 44.53 },
  ]);

  const referralLink = "https://t.me/IncomingCashOfficial_b...";

  const handleCopy = () => {
    navigator.clipboard.writeText(referralLink);
    alert("Referral link copied!");
  };

  return (
    <div className="py-6 bg-black p-4 flex flex-col items-center min-h-screen text-white pb-24">
      <div className="w-full max-w-md text-center mb-6">
        <h1 className="text-2xl font-bold text-emerald-400">Invite Friends</h1>
        <p className="text-gray-400 text-xs mt-1">You and your friend will receive USDT bonuses!</p>
      </div>

      {/* ইনভাইট বক্স */}
      <div className="w-full max-w-md flex flex-col gap-4">
        <div className="bg-zinc-900 border border-zinc-800 p-4 rounded-2xl">
          <h3 className="font-bold text-sm text-white">Invite a friend</h3>
          <p className="text-emerald-400 text-xs font-semibold mt-1">+0.50 USDT per friend</p>
          <div className="flex items-center gap-2 mt-3">
            <input 
              type="text" 
              readOnly 
              value={referralLink} 
              className="bg-black border border-zinc-750 text-gray-300 text-xs p-2.5 rounded-xl w-full outline-none"
            />
            <button 
              onClick={handleCopy}
              className="bg-emerald-500 hover:bg-emerald-600 text-black font-bold px-4 py-2.5 rounded-xl text-xs transition cursor-pointer"
            >
              Copy
            </button>
          </div>
        </div>
      </div>

      {/* ফ্রেন্ডস লিস্ট */}
      <div className="w-full max-w-md mt-6">
        <h3 className="text-sm font-bold text-gray-300 mb-3">List of your friends ({friends.length})</h3>
        
        <div className="flex flex-col gap-3">
          {friends.map((friend) => (
            <div key={friend.id} className="bg-zinc-900 border border-zinc-800 p-3.5 rounded-2xl flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 font-bold">
                  🐹
                </div>
                <div className="text-left">
                  <h4 className="font-bold text-white text-xs">{friend.name}</h4>
                  <p className="text-gray-400 text-[10px] mt-0.5">{friend.rank} • <span className="text-emerald-400">+{friend.reward} USDT</span></p>
                </div>
              </div>
              <div className="text-emerald-400 font-bold text-xs bg-emerald-950/40 px-3 py-1.5 rounded-xl border border-emerald-800">
                +{(friend.reward * 0.1).toFixed(2)} USDT
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
