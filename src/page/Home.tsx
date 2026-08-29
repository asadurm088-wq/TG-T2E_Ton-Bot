import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const [activeTab, setActiveTab] = useState("Airdrop");
  const navigate = useNavigate();

  // সিক্রেট অ্যাডমিন ট্রিগার (উইথড্র সিস্টেমের নিচে ডাবল ক্লিক করলে কাজ করবে)
  const handleSecretAdminOpen = (e: React.MouseEvent) => {
    if (e.detail === 2) {
      navigate("/admin");
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-[#1c2128] text-white justify-between select-none font-sans">
      {/* মেইন কনটেন্ট এরিয়া */}
      <div className="flex flex-col items-center justify-center flex-1 p-4 text-center">
        {activeTab === "Airdrop" ? (
          <div className="flex flex-col items-center w-full max-w-md relative">
            {/* আপনার আসল এয়ারড্রপ ও উইথড্র সিস্টেম */}
            <div className="w-full mt-6">
              <h1 className="text-2xl font-bold text-yellow-400 mb-2">Airdrop & Withdraw</h1>
              <p className="text-gray-400 text-xs mb-8">
                সম্পূর্ণ কাজ শেষ করে আপনার পেমেন্ট তুলুন।
              </p>
              
              <button className="w-full bg-[#f3ba2f] hover:bg-[#e2aa1e] text-black font-bold py-3.5 rounded-xl shadow-lg transition">
                Withdraw Cash
              </button>
            </div>

            {/* উইথড্র সিস্টেমের নিচের দিকে সিক্রেট হিডেন এরিয়া */}
            <div 
              onClick={handleSecretAdminOpen}
              className="w-full h-20 mt-10 cursor-default flex items-center justify-center text-transparent text-[1px]"
            >
              Secret Area
            </div>
          </div>
        ) : activeTab === "Exchange" ? (
          <div className="flex flex-col items-center">
            <h2 className="text-xl font-bold mb-2">Exchange</h2>
            <p className="text-gray-400 text-xs">এক্সচেঞ্জ পেজ</p>
          </div>
        ) : activeTab === "Mine" ? (
          <div className="flex flex-col items-center">
            <h2 className="text-xl font-bold mb-2">Mine</h2>
            <p className="text-gray-400 text-xs">মাইন পেজ</p>
          </div>
        ) : activeTab === "Friends" ? (
          <div className="flex flex-col items-center">
            <h2 className="text-xl font-bold mb-2">Friends</h2>
            <p className="text-gray-400 text-xs">ফ্রেন্ডস পেজ</p>
          </div>
        ) : activeTab === "Earn" ? (
          <div className="flex flex-col items-center">
            <h2 className="text-xl font-bold mb-2">Earn</h2>
            <p className="text-gray-400 text-xs">আর্ন পেজ</p>
          </div>
        ) : null}
      </div>

      {/* নিচের নেভিগেশন বার (আপনার স্ক্রিনশটের হুবহু লেআউট অনুযায়ী) */}
      <div className="grid grid-cols-5 items-center bg-[#161a22] py-3 border-t border-gray-800 w-full">
        <div 
          onClick={() => setActiveTab("Exchange")}
          className={`flex flex-col items-center cursor-pointer ${activeTab === "Exchange" ? "text-yellow-400" : "text-gray-400"}`}
        >
          <span className="text-xl mb-0.5">💱</span>
          <span className="text-[10px] font-medium">Exchange</span>
        </div>
        <div 
          onClick={() => setActiveTab("Mine")}
          className={`flex flex-col items-center cursor-pointer ${activeTab === "Mine" ? "text-yellow-400" : "text-gray-400"}`}
        >
          <span className="text-xl mb-0.5">⛏️</span>
          <span className="text-[10px] font-medium">Mine</span>
        </div>
        <div 
          onClick={() => setActiveTab("Friends")}
          className={`flex flex-col items-center cursor-pointer ${activeTab === "Friends" ? "text-yellow-400" : "text-gray-400"}`}
        >
          <span className="text-xl mb-0.5">👥</span>
          <span className="text-[10px] font-medium">Friends</span>
        </div>
        <div 
          onClick={() => setActiveTab("Earn")}
          className={`flex flex-col items-center cursor-pointer ${activeTab === "Earn" ? "text-yellow-400" : "text-gray-400"}`}
        >
          <span className="text-xl mb-0.5">💰</span>
          <span className="text-[10px] font-medium">Earn</span>
        </div>
        <div 
          onClick={() => setActiveTab("Airdrop")}
          className={`flex flex-col items-center cursor-pointer ${activeTab === "Airdrop" ? "text-yellow-400" : "text-gray-400"}`}
        >
          <span className="text-xl mb-0.5">🪂</span>
          <span className="text-[10px] font-medium">Airdrop</span>
        </div>
      </div>
    </div>
  );
}
