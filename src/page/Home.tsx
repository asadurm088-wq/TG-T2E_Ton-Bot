import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const [activeTab, setActiveTab] = useState("Exchange");
  const navigate = useNavigate();

  // Announcement বক্সের নিচে ডাবল ক্লিক করলে সিক্রেট অ্যাডমিন পেজে যাবে
  const handleSecretAdminOpen = (e: React.MouseEvent) => {
    if (e.detail === 2) {
      navigate("/admin");
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-black text-white justify-between select-none font-sans">
      {/* মেইন কনটেন্ট এরিয়া */}
      <div className="flex flex-col flex-1 p-4 max-w-md mx-auto w-full justify-between">
        
        {activeTab === "Exchange" || activeTab === "Airdrop" ? (
          <div>
            {/* ওপরের ওয়ালেট হেডার ও কানেক্ট স্ট্যাটাস */}
            <div className="flex justify-between items-start mb-6 pt-2">
              <div>
                <h1 className="text-xl font-bold tracking-tight">My Wallet</h1>
                <p className="text-xs text-gray-400 mt-0.5">TON & USDT Network</p>
              </div>
              <div className="bg-[#161b22] border border-gray-800 px-3 py-1.5 rounded-full flex items-center gap-1.5 shadow-sm">
                <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
                <span className="text-xs text-green-400 font-medium">Connected</span>
              </div>
            </div>

            {/* ইউএসডিটি ব্যালেন্স ও বাটন কার্ড */}
            <div className="bg-[#12161c] border border-gray-800/80 rounded-2xl p-5 mb-4 shadow-xl">
              <div className="flex items-center gap-2 mb-2">
                <span className="bg-green-500 text-black px-1.5 py-0.5 rounded-full text-xs font-bold">₮</span>
                <span className="text-xs text-gray-300 font-medium">USDT Balance</span>
              </div>
              
              <div className="text-3xl font-extrabold text-green-400 mb-1 tracking-wide">
                154.76 <span className="text-lg text-white font-semibold">USDT</span>
              </div>
              <div className="text-xs text-gray-400 mb-5">≈ $154.76 USD</div>

              {/* Earn More এবং Withdraw বাটন */}
              <div className="grid grid-cols-2 gap-3">
                <button className="bg-[#20c997] hover:bg-[#1ba87f] text-black font-bold py-3 rounded-xl text-sm transition shadow-md">
                  Earn More
                </button>
                <button className="bg-[#1c222b] hover:bg-[#252b36] text-white font-bold py-3 rounded-xl text-sm border border-gray-800 transition shadow-md">
                  Withdraw
                </button>
              </div>
            </div>

            {/* অ্যানাউন্সমেন্ট বক্স */}
            <div className="bg-[#12161c] border border-gray-800/80 rounded-2xl p-4 text-center shadow-lg">
              <div className="text-yellow-400 font-bold text-sm mb-1 flex items-center justify-center gap-1.5">
                <span>📢</span> Announcement
              </div>
              <p className="text-xs text-gray-400 leading-relaxed">
                Complete tasks from the Earn tab to get instant USDT rewards directly in your balance.
              </p>
            </div>

            {/* অ্যানাউন্সমেন্ট বক্সের নিচের সেই সিক্রেট হিডেন এরিয়া (এখানে ডাবল ক্লিক করলে অ্যাডমিন প্যানেল খুলবে) */}
            <div 
              onClick={handleSecretAdminOpen}
              className="w-full h-16 mt-4 cursor-default flex items-center justify-center text-transparent text-[1px]"
            >
              Secret Admin Area
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center flex-1 text-center">
            <h2 className="text-xl font-bold mb-2 capitalize">{activeTab}</h2>
            <p className="text-gray-500 text-xs">এই পেজের কাজ চলছে...</p>
          </div>
        )}

      </div>

      {/* একদম নিচের নেভিগেশন বার (স্ক্রিনশটের হুবহু ডিজাইন অনুযায়ী) */}
      <div className="grid grid-cols-5 items-center bg-[#14181f] py-3 px-2 border-t border-gray-800/60 w-full max-w-md mx-auto rounded-t-2xl">
        <div 
          onClick={() => setActiveTab("Exchange")}
          className={`flex flex-col items-center cursor-pointer transition ${activeTab === "Exchange" ? "text-yellow-400" : "text-gray-400 hover:text-gray-200"}`}
        >
          <span className="text-xl mb-0.5">💱</span>
          <span className="text-[10px] font-medium">Exchange</span>
        </div>
        <div 
          onClick={() => setActiveTab("Mine")}
          className={`flex flex-col items-center cursor-pointer transition ${activeTab === "Mine" ? "text-yellow-400" : "text-gray-400 hover:text-gray-200"}`}
        >
          <span className="text-xl mb-0.5">⛏️</span>
          <span className="text-[10px] font-medium">Mine</span>
        </div>
        <div 
          onClick={() => setActiveTab("Friends")}
          className={`flex flex-col items-center cursor-pointer transition ${activeTab === "Friends" ? "text-yellow-400" : "text-gray-400 hover:text-gray-200"}`}
        >
          <span className="text-xl mb-0.5">👥</span>
          <span className="text-[10px] font-medium">Friends</span>
        </div>
        <div 
          onClick={() => setActiveTab("Earn")}
          className={`flex flex-col items-center cursor-pointer transition ${activeTab === "Earn" ? "text-yellow-400" : "text-gray-400 hover:text-gray-200"}`}
        >
          <span className="text-xl mb-0.5">💰</span>
          <span className="text-[10px] font-medium">Earn</span>
        </div>
        <div 
          onClick={() => setActiveTab("Airdrop")}
          className={`flex flex-col items-center cursor-pointer transition ${activeTab === "Airdrop" ? "text-yellow-400" : "text-gray-400 hover:text-gray-200"}`}
        >
          <span className="text-xl mb-0.5">🪂</span>
          <span className="text-[10px] font-medium">Airdrop</span>
        </div>
      </div>
    </div>
  );
}
