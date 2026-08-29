import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const [secretCount, setSecretCount] = useState(0);
  const navigate = useNavigate();

  // লোগো বা নির্দিষ্ট কোনো জায়গায় ৫ বার ক্লিক করলে সিক্রেট অ্যাডমিন পেজ ওপেন হবে
  const handleSecretAdminAccess = () => {
    setSecretCount((prev) => {
      const newCount = prev + 1;
      if (newCount >= 5) {
        navigate("/admin");
      }
      return newCount;
    });
  };

  return (
    <div className="flex flex-col min-h-screen bg-[#12161c] text-white justify-between">
      {/* মূল গেমের হেডার অংশ */}
      <div className="flex justify-between items-center p-4 border-b border-gray-800">
        <div className="flex items-center space-x-2">
          {/* এই লোগোতে ৫ বার দ্রুত ক্লিক করলে অ্যাডমিন প্যানেলে চলে যাবে */}
          <div 
            onClick={handleSecretAdminAccess} 
            className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center cursor-pointer select-none"
            title="Secret Access"
          >
            💰
          </div>
          <span className="font-bold text-lg">Incoming cash</span>
        </div>
        <button className="bg-[#0098ea] px-4 py-2 rounded-xl font-medium text-sm">
          Connect Wallet
        </button>
      </div>

      {/* গেমের মূল বডি বা হোম পেজের কনটেন্ট */}
      <div className="flex flex-col items-center justify-center flex-1 p-4 text-center">
        <h1 className="text-2xl font-bold mb-2">Welcome to T2E Ton Bot</h1>
        <p className="text-gray-400 text-sm">
          আপনার গেমের মূল ইন্টারফেস এখানে রান করছে।
        </p>
      </div>

      {/* আপনার চাওয়া নিচের নেভিগেশন বার (Exchange, Mine, Friends, Earn, Airdrop) */}
      <div className="flex justify-around items-center bg-[#181d24] py-3 border-t border-gray-800">
        <div className="flex flex-col items-center text-yellow-500 cursor-pointer">
          <span className="text-xl">💱</span>
          <span className="text-xs mt-1">Exchange</span>
        </div>
        <div className="flex flex-col items-center text-gray-400 cursor-pointer">
          <span className="text-xl">⛏️</span>
          <span className="text-xs mt-1">Mine</span>
        </div>
        <div className="flex flex-col items-center text-gray-400 cursor-pointer">
          <span className="text-xl">👥</span>
          <span className="text-xs mt-1">Friends</span>
        </div>
        <div className="flex flex-col items-center text-gray-400 cursor-pointer">
          <span className="text-xl">💰</span>
          <span className="text-xs mt-1">Earn</span>
        </div>
        <div className="flex flex-col items-center text-gray-400 cursor-pointer">
          <span className="text-xl">🪂</span>
          <span className="text-xs mt-1">Airdrop</span>
        </div>
      </div>
    </div>
  );
}
