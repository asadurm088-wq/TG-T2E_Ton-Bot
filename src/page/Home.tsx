import React from "react";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col min-h-screen bg-[#12161c] text-white justify-between select-none">
      {/* একদম হুবহু আগের মতো হেডার */}
      <div className="flex justify-between items-center p-4 border-b border-gray-800">
        <div className="flex items-center space-x-2">
          {/* এই লোগোতে ক্লিক করলে সিক্রেটলি অ্যাডমিন প্যানেলে চলে যাবে */}
          <div 
            onClick={() => navigate("/admin")}
            className="w-8 h-8 bg-yellow-500 rounded-full flex items-center justify-center cursor-pointer font-bold text-black text-sm shadow-md"
            title="Secret Admin Access"
          >
            💰
          </div>
          <span className="font-bold text-lg">Incoming cash</span>
        </div>
        <button className="bg-[#0098ea] hover:bg-[#0082cc] text-white px-4 py-2 rounded-xl font-medium text-sm flex items-center gap-1 shadow">
          <span>💎</span> Connect Wallet
        </button>
      </div>

      {/* মূল ওয়ালেট ও ব্যালেন্স ড্যাশবোর্ড (স্ক্রিনশটের হুবহু ডিজাইন) */}
      <div className="flex flex-col flex-1 p-4 max-w-md mx-auto w-full">
        <div className="flex justify-between items-center mb-4">
          <div>
            <h2 className="text-xl font-bold">My Wallet</h2>
            <p className="text-xs text-gray-400">TON & USDT Network</p>
          </div>
          <div className="bg-[#1b222c] border border-green-900/50 px-3 py-1.5 rounded-full flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
            <span className="text-xs text-green-400 font-medium">Connected</span>
          </div>
        </div>

        {/* কার্ড বক্স */}
        <div className="bg-[#1b222c] border border-gray-800 rounded-2xl p-5 mb-4 shadow-xl">
          <div className="flex items-center gap-2 mb-2">
            <span className="bg-green-500 text-black p-1 rounded-full text-xs font-bold">₮</span>
            <span className="text-xs text-gray-300 font-medium">USDT Balance</span>
          </div>
          
          <div className="text-3xl font-extrabold text-green-400 mb-1">
            154.76 <span className="text-lg text-white">USDT</span>
          </div>
          <div className="text-xs text-gray-400 mb-6">≈ $154.76 USD</div>

          {/* বাটন দুটি (Earn More এবং Withdraw) */}
          <div className="grid grid-cols-2 gap-3">
            <button className="bg-[#20c997] hover:bg-[#1ba87f] text-black font-bold py-3 rounded-xl text-sm transition">
              Earn More
            </button>
            <button className="bg-[#262c36] hover:bg-[#2f3642] text-white font-bold py-3 rounded-xl text-sm border border-gray-700 transition">
              Withdraw
            </button>
          </div>
        </div>

        {/* অ্যানাউন্সমেন্ট বক্স */}
        <div className="bg-[#1b222c] border border-gray-800 rounded-2xl p-4 text-center">
          <div className="text-yellow-400 font-bold text-sm mb-1 flex items-center justify-center gap-1.5">
            <span>📢</span> Announcement
          </div>
          <p className="text-xs text-gray-400 leading-relaxed">
            Complete tasks from the Earn tab to get instant USDT rewards directly in your balance.
          </p>
        </div>
      </div>

      {/* একদম নিচের নেভিগেশন বার (Exchange, Mine, Friends, Earn, Airdrop) */}
      <div className="flex justify-around items-center bg-[#181d24] py-2.5 border-t border-gray-800">
        <div className="flex flex-col items-center text-yellow-500 cursor-pointer">
          <span className="text-lg">💱</span>
          <span className="text-[10px] mt-0.5 font-medium">Exchange</span>
        </div>
        <div className="flex flex-col items-center text-gray-400 cursor-pointer">
          <span className="text-lg">⛏️</span>
          <span className="text-[10px] mt-0.5 font-medium">Mine</span>
        </div>
        <div className="flex flex-col items-center text-gray-400 cursor-pointer">
          <span className="text-lg">👥</span>
          <span className="text-[10px] mt-0.5 font-medium">Friends</span>
        </div>
        <div className="flex flex-col items-center text-gray-400 cursor-pointer">
          <span className="text-lg">💰</span>
          <span className="text-[10px] mt-0.5 font-medium">Earn</span>
        </div>
        <div className="flex flex-col items-center text-gray-400 cursor-pointer">
          <span className="text-lg">🪂</span>
          <span className="text-[10px] mt-0.5 font-medium">Airdrop</span>
        </div>
      </div>
    </div>
  );
}
