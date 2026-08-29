import { useState } from "react";

export default function Withdraw() {
  const [method, setMethod] = useState("USDT");
  const [wallet, setWallet] = useState("");
  const [amount, setAmount] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!wallet || !amount) {
      alert("দয়া করে ওয়ালেট নাম্বার এবং অ্যামাউন্ট দিন।");
      return;
    }

    const newRequest = {
      id: Date.now(),
      user: "Telegram User",
      method: method,
      wallet: wallet,
      amount: amount,
      status: "Pending",
      date: new Date().toLocaleString()
    };

    const existingRequests = JSON.parse(localStorage.getItem("admin_withdraw_requests") || "[]");
    const updatedRequests = [newRequest, ...existingRequests];
    localStorage.setItem("admin_withdraw_requests", JSON.stringify(updatedRequests));

    alert("উইথড্র রিকোয়েস্ট সফলভাবে জমা হয়েছে!");
    setWallet("");
    setAmount("");
  };

  return (
    <div className="min-h-screen bg-black p-4 text-white flex flex-col items-center pb-24">
      <div className="w-full max-w-md">
        <h1 className="text-2xl font-bold text-emerald-400 mb-6 text-center">Withdraw Funds</h1>
        
        <form onSubmit={handleSubmit} className="bg-zinc-900 border border-zinc-800 p-5 rounded-2xl flex flex-col gap-4">
          <div>
            <label className="text-xs text-gray-400 mb-1 block">পেমেন্ট মাধ্যম নির্বাচন করুন</label>
            <select 
              value={method} 
              onChange={(e) => setMethod(e.target.value)}
              className="w-full bg-black border border-zinc-700 p-3 rounded-xl text-sm text-white"
            >
              <option value="USDT">USDT (TRC20)</option>
              <option value="Bkash">বিকাশ (Bkash)</option>
              <option value="Nagad">নগদ (Nagad)</option>
            </select>
          </div>

          <div>
            <label className="text-xs text-gray-400 mb-1 block">ওয়ালেট বা একাউন্ট নাম্বার</label>
            <input 
              type="text" 
              placeholder="আপনার নাম্বার বা ওয়ালেট এড্রেস দিন" 
              value={wallet}
              onChange={(e) => setWallet(e.target.value)}
              className="w-full bg-black border border-zinc-700 p-3 rounded-xl text-sm text-white"
            />
          </div>

          <div>
            <label className="text-xs text-gray-400 mb-1 block">টাকার পরিমাণ (USDT/BDT)</label>
            <input 
              type="number" 
              placeholder="পরিমাণ লিখুন" 
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="w-full bg-black border border-zinc-700 p-3 rounded-xl text-sm text-white"
            />
          </div>

          <button 
            type="submit" 
            className="w-full bg-emerald-500 hover:bg-emerald-600 text-black font-bold p-3 rounded-xl text-sm transition mt-2"
          >
            উইথড্র রিকোয়েস্ট পাঠান
          </button>
        </form>
      </div>
    </div>
  );
}
