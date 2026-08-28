import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

export default function Home() {
  const [balance, setBalance] = useState(() => {
    const saved = localStorage.getItem("balance") || localStorage.getItem("user_balance");
    return saved ? parseInt(saved, 10) : 1519594;
  });

  useEffect(() => {
    const handleStorageChange = () => {
      const updated = localStorage.getItem("balance") || localStorage.getItem("user_balance");
      if (updated) {
        setBalance(parseInt(updated, 10));
      }
    };
    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  return (
    <div className="py-6 bg-black p-4 flex flex-col items-center min-h-screen text-white pb-24">
      
      {/* টপ হেডার / ওয়ালেট স্ট্যাটাস */}
      <div className="w-full max-w-md flex justify-between items-center mb-6 px-2">
        <div>
          <h1 className="text-xl font-bold text-white">My Wallet</h1>
          <p className="text-xs text-gray-400">TON & USDT Network</p>
        </div>
        <div className="bg-zinc-900 border border-zinc-800 px-3 py-1.5 rounded-full text-xs font-semibold text-emerald-400 flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
          Connected
        </div>
      </div>

      {/* বাইনান্স/বাইবিট স্টাইল মেইন USDT ব্যালেন্স কার্ড */}
      <div className="w-full max-w-md bg-gradient-to-br from-zinc-900 via-zinc-900 to-zinc-950 border border-zinc-800 p-6 rounded-3xl shadow-2xl flex flex-col items-center my-2">
        
        <div className="flex items-center gap-2 mb-2 bg-zinc-800/80 border border-zinc-700/60 px-4 py-1.5 rounded-full">
          <div className="w-6 h-6 rounded-full bg-emerald-500 flex items-center justify-center text-black font-bold text-xs shadow">
            ₮
          </div>
          <span className="text-sm font-bold tracking-wider text-white">USDT Balance</span>
        </div>

        {/* প্রিমিয়াম ছোট অ্যামাউন্ট ব্যালেন্স */}
        <div className="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-400 my-2">
          {(balance * 0.0001).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} <span className="text-xl font-bold text-emerald-400">USDT</span>
        </div>

        <div className="text-xs text-gray-400 font-medium bg-black/40 px-3 py-1 rounded-md border border-zinc-800/80 mt-1">
          ≈ ${(balance * 0.0001).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} USD
        </div>

        {/* কুইক অ্যাকশন বাটন (সঠিক পেজ রাউট সহ) */}
        <div className="grid grid-cols-2 gap-3 w-full mt-6">
          <Link to="/earn" className="bg-emerald-500 hover:bg-emerald-600 text-black font-bold py-2.5 rounded-xl text-center text-sm transition">
            Earn More
          </Link>
          <Link to="/airdrop" className="bg-zinc-800 hover:bg-zinc-700 text-white font-bold py-2.5 rounded-xl text-center text-sm transition border border-zinc-700">
            Withdraw
          </Link>
        </div>

      </div>

      {/* কুইক নোটিশ বা ব্যানার সেকশন */}
      <div className="w-full max-w-md bg-zinc-900/60 border border-zinc-800 p-4 rounded-2xl mt-4">
        <h3 className="text-sm font-bold text-yellow-500 mb-1">📢 Announcement</h3>
        <p className="text-xs text-gray-400">Complete tasks from the Earn tab to get instant USDT rewards directly in your balance.</p>
      </div>

    </div>
  );
}
