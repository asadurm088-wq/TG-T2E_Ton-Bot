import React from "react";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col min-h-screen bg-black text-white justify-between select-none">
      {/* হেডার অংশ যেখানে লোগোতে ক্লিক করলে সিক্রেটলি অ্যাডমিন পেজে যাবে */}
      <div className="flex justify-between items-center p-4 border-b border-gray-800">
        <div className="flex items-center space-x-2">
          <div 
            onClick={() => navigate("/admin")}
            className="w-8 h-8 bg-yellow-500 rounded-full flex items-center justify-center cursor-pointer font-bold text-black text-sm shadow-md active:scale-95 transition-transform"
            title="Admin Access"
          >
            💰
          </div>
          <span className="font-bold text-lg tracking-wide">Incoming cash</span>
        </div>
        <button className="bg-cyan-500 hover:bg-cyan-600 text-black px-4 py-1.5 rounded-xl font-bold text-xs shadow">
          Connect Wallet
        </button>
      </div>

      {/* মূল হোম পেজের বডি */}
      <div className="flex flex-col items-center justify-center flex-1 p-6 text-center">
        <div className="w-24 h-24 bg-gradient-to-tr from-yellow-500 to-amber-300 rounded-full flex items-center justify-center text-4xl mb-4 shadow-lg animate-pulse">
          🪙
        </div>
        <h1 className="text-xl font-extrabold mb-1">Welcome to T2E Ton Bot</h1>
        <p className="text-gray-400 text-xs">
          ট্যাপ করে কয়েন আর্ন করুন এবং উইথড্র করুন।
        </p>
      </div>

      {/* নিচের নেভিগেশন বার (Exchange, Mine, Friends, Earn, Airdrop) */}
      <div className="flex justify-around items-center bg-[#1c2229] py-3 border-t border-gray-800">
        <div className="flex flex-col items-center text-yellow-400 cursor-pointer">
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
