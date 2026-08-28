import React, { useState } from "react";

export default function Airdrop() {
  const [showWithdraw, setShowWithdraw] = useState(false);
  const [method, setMethod] = useState("bKash");
  const [number, setNumber] = useState("");
  const [amount, setAmount] = useState("");
  const [success, setSuccess] = useState(false);

  // সর্বনিম্ন উত্তোলনের শর্ত (১০ ইউএসডি)
  const minWithdrawLimit = 10.00; 

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!method || !number || !amount) {
      alert("দয়া করে সব তথ্য পূরণ করুন!");
      return;
    }

    const withdrawAmount = parseFloat(amount);

    if (isNaN(withdrawAmount) || withdrawAmount <= 0) {
      alert("সঠিক অ্যামাউন্ট লিখুন!");
      return;
    }

    // ১০ ইউএসডি এর কম হলে উইথড্র আটকানোর শর্ত
    if (withdrawAmount < minWithdrawLimit) {
      alert(`সর্বনিম্ন উত্তোলন সীমা হলো ${minWithdrawLimit} ইউএসডি (USD)! অন্তত ২-৩ দিন কাজ করে ব্যালেন্স ১০ ইউএসডি পূরণ করুন।`);
      return;
    }

    setSuccess(true);
    setTimeout(() => {
      setSuccess(false);
      setShowWithdraw(false);
      setNumber("");
      setAmount("");
    }, 3000);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-black text-white p-4 pb-24">
      <div className="text-center mb-8">
        <h1 className="text-2xl font-bold text-yellow-500 mb-2">Airdrop & Withdraw</h1>
        <p className="text-gray-400 text-sm">সম্পূর্ণ কাজ শেষ করে আপনার পেমেন্ট তুলুন।</p>
      </div>

      <button
        onClick={() => setShowWithdraw(true)}
        className="bg-yellow-500 hover:bg-yellow-600 text-black font-bold py-3 px-8 rounded-xl shadow-lg transition duration-200 cursor-pointer"
      >
        Withdraw Cash
      </button>

      {/* উইথড্র পপআপ মডাল */}
      {showWithdraw && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-zinc-900 border border-zinc-800 w-full max-w-md p-6 rounded-3xl relative shadow-2xl">
            <button
              onClick={() => setShowWithdraw(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-white text-xl font-bold"
            >
              ✕
            </button>

            <h2 className="text-xl font-bold text-center text-white mb-4">Withdraw Cash</h2>

            {/* সর্বনিম্ন উত্তোলন ও ২৪ ঘণ্টার পেমেন্ট নোটিশ */}
            <div className="bg-yellow-500/10 border border-yellow-500/30 p-3 rounded-xl mb-4 text-center flex flex-col gap-1">
              <p className="text-xs text-yellow-400 font-semibold">
                ⚠️ সর্বনিম্ন উত্তোলন: {minWithdrawLimit} ইউএসডি (USD)
              </p>
              <p className="text-[11px] text-gray-300">
                ⏱️ উত্তোলনের আবেদন সফল হওয়ার পর <span className="text-yellow-400 font-bold">২৪ ঘণ্টার মধ্যে</span> পেমেন্ট আপনার অ্যাকাউন্টে পৌঁছে যাবে।
              </p>
            </div>

            {success ? (
              <div className="bg-green-500/20 border border-green-500 text-green-400 p-4 rounded-xl text-center font-bold">
                ✅ সফলভাবে উত্তোলনের আবেদন জমা হয়েছে! ২৪ ঘণ্টার মধ্যে পেমেন্ট পেয়ে যাবেন।
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <div>
                  <label className="text-xs text-gray-400 block mb-1">পেমেন্ট মেথড বেছে নিন</label>
                  <select
                    value={method}
                    onChange={(e) => setMethod(e.target.value)}
                    className="w-full bg-black border border-zinc-700 text-white p-3 rounded-xl outline-none text-sm"
                  >
                    <option value="bKash">বিকাশ (bKash)</option>
                    <option value="Nagad">নগদ (Nagad)</option>
                    <option value="USDT">USDT (TRC20 / TON)</option>
                  </select>
                </div>

                <div>
                  <label className="text-xs text-gray-400 block mb-1">UID / ওয়ালেট এড্রেস / নম্বর</label>
                  <input
                    type="text"
                    placeholder="আপনার UID বা ওয়ালেট নম্বর দিন"
                    value={number}
                    onChange={(e) => setNumber(e.target.value)}
                    className="w-full bg-black border border-zinc-700 text-white p-3 rounded-xl outline-none text-sm"
                  />
                </div>

                <div>
                  <label className="text-xs text-gray-400 block mb-1">পরিমাণ (Amount in USD)</label>
                  <input
                    type="number"
                    step="0.01"
                    placeholder="কমপক্ষে ১০ ইউএসডি লিখুন"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    className="w-full bg-black border border-zinc-700 text-white p-3 rounded-xl outline-none text-sm"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-xl transition duration-200 mt-2 cursor-pointer"
                >
                  Confirm Withdraw
                </button>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
