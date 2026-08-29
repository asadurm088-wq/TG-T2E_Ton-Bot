import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const [activeTab, setActiveTab] = useState("Airdrop");
  const navigate = useNavigate();

  // সিক্রেট অ্যাডমিন ট্রিগার (উইথড্র সিস্টেমের নিচে একদম নিচের দিকে ডাবল ক্লিক করলে কাজ করবে)
  const handleSecretAdminOpen = (e: React.MouseEvent) => {
    if (e.detail === 2) {
      navigate("/admin");
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-[#12161c] text-white justify-between select-none">
      {/* হেডার অংশ */}
      <div className="flex justify-between items-center p-4 border-b border-gray-800">
        <div className="flex items-center space-x-2">
          <span className="font-bold text-lg">Incoming cash</span>
        </div>
        <button className="bg-[#0098ea] text-white px-4 py-2 rounded-xl font-medium text-sm">
          Connect Wallet
        </button>
      </div>

      {/* মেইন কনটেন্ট এরিয়া */}
      <div className="flex flex-col items-center justify-center flex-1 p-4 text-center">
        {activeTab === "Airdrop" ? (
          <div className="flex flex-col items-center w-full max-w-md relative min-h-[300px] justify-between">
            {/* আপনার আসল এয়ারড্রপ ও উইথড্র সিস্টেম - কোনো পরিবর্তন করা হয়নি */}
            <div className="w-full">
              <h1 className="text-2xl font-bold text-yellow-400 mb-2">Airdrop & Withdraw</h1>
              <p className="text-gray-400 text-xs mb-6">
                সম্পূর্ণ কাজ শেষ করে আপনার পেমেন্ট তুলুন।
              </p>
              <button className="w-full bg-[#f3ba2f] hover:bg-[#e2aa1e] text-black font-bold py-3.5 rounded-xl shadow-lg transition">
                Withdraw Cash
              </button>
            </div>

            {/* উইথড্র সিস্টেমের একদম নিচের দিকে সিক্রেট হিডেন এরিয়া */}
            <div 
              onClick={handleSecretAdminOpen}
              className="w-full h-16 mt-12 cursor-default flex items-center justify-center text-transparent text-[1px]"
              title=""
            >
              Secret Area
            </div>
          </div>
        ) : activeTab === "Exchange" ? (
          <div>
            <h2 className="text-xl font-bold mb-2">Exchange</h2>
            <p className="text-gray-400 text-xs">এক্সচেঞ্জ পেজ</p>
          </div>
        ) : activeTab === "Mine" ? (
          <div>
            <h2 className="text-xl font-bold mb-2">Mine</h2>
            <p className="text-gray-400 text-xs">মাইন পেজ</p>
          </div>
        ) : activeTab === "Friends" ? (
          <div>
            <h2 className="text-xl font-bold mb-2">Friends</h2>
            <p className="text-gray-400 text-xs">ফ্রেন্ডস পেজ</p>
          </div>
        ) : (
          <div>
            <h2 className="text-xl font-bold mb-2">Earn</h2>
            <p className="text-gray-400 text-xs">আর্ন পেজ</p>
          </div>
        )}
      </div>

      {/* নিচের নেভিগেশন বার (Exchange, Mine, Friends, Earn, Airdrop) */}
      <div className="flex justify-around items-center bg-[#181d24] py-2.5 border-t border-gray-800">
        <div 
          onClick={() => setActiveTab("Exchange")}
          className={`flex flex-col items-center cursor-pointer ${activeTab === "Exchange" ? "text-yellow-500" : "text-gray-400"}`}
        >
          <span className="text-lg">💱</span>
          <span className="text-[10px] mt-0.5 font-medium">Exchange</span>
        </div>
        <div 
          onClick={() => setActiveTab("Mine")}
          className={`flex flex-col items-center cursor-pointer ${activeTab === "Mine" ? "text-yellow-500" : "text-gray-400"}`}
        >
          <span className="text-lg">⛏️</span>
          <span className="text-[10px] mt-0.5 font-medium">Mine</span>
        </div>
        <div 
          onClick={() => setActiveTab("Friends")}
          className={`flex flex-col items-center cursor-pointer ${activeTab === "Friends" ? "text-yellow-500" : "text-gray-400"}`}
        >
          <span className="text-lg">👥</span>
          <span className="text-[10px] mt-0.5 font-medium">Friends</span>
        </div>
        <div 
          onClick={() => setActiveTab("Earn")}
          className={`flex flex-col items-center cursor-pointer ${activeTab === "Earn" ? "text-yellow-500" : "text-gray-400"}`}
        >
          <span className="text-lg">💰</span>
          <span className="text-[10px] mt-0.5 font-medium">Earn</span>
        </div>
        <div 
          onClick={() => setActiveTab("Airdrop")}
          className={`flex flex-col items-center cursor-pointer ${activeTab === "Airdrop" ? "text-yellow-500" : "text-gray-400"}`}
        >
          <span className="text-lg">🪂</span>
          <span className="text-[10px] mt-0.5 font-medium">Airdrop</span>
        </div>
      </div>
    </div>
  );
}
