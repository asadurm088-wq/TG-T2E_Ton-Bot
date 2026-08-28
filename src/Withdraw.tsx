import React, { useState } from "react";

const Withdraw = () => {
  const [selectedMethod, setSelectedMethod] = useState("bkash");
  const [accountNumber, setAccountNumber] = useState("");
  const [amount, setAmount] = useState("");
  const [message, setMessage] = useState("");

  const handleWithdraw = (e: React.FormEvent) => {
    e.preventDefault();
    if (!accountNumber || !amount) {
      setMessage("দয়া করে সকল ঘর পূরণ করুন!");
      return;
    }
    setMessage("আপনার উইথড্র রিকোয়েস্ট সফলভাবে জমা হয়েছে!");
  };

  return (
    <div className="min-h-screen bg-black text-white p-4 flex flex-col items-center">
      <h1 className="text-2xl font-bold mb-6 mt-4">উইথড্র / পেমেন্ট সিস্টেম</h1>

      <form onSubmit={handleWithdraw} className="w-full max-w-md bg-zinc-900 p-6 rounded-xl shadow-lg">
        {/* পেমেন্ট মেথড সিলেকশন */}
        <label className="block mb-2 text-sm font-semibold">পেমেন্ট মাধ্যম নির্বাচন করুন:</label>
        <select 
          value={selectedMethod} 
          onChange={(e) => setSelectedMethod(e.target.value)}
          className="w-full p-3 mb-4 bg-zinc-800 rounded-lg text-white border border-zinc-700 focus:outline-none"
        >
          <option value="bkash">বিকাশ (Bkash)</option>
          <option value="nagad">নগদ (Nagad)</option>
          <option value="bybit">বাইবিট / ইউএসডিটি (Bybit / USDT)</option>
          <option value="ton">টোন ওয়ালেট (Toncoin - TON)</option>
          <option value="binance">বাইন্যান্স পে (Binance Pay ID)</option>
        </select>

        {/* অ্যাকাউন্ট নম্বর বা ওয়ালেট অ্যাড্রেস */}
        <label className="block mb-2 text-sm font-semibold">
          {selectedMethod === "bkash" || selectedMethod === "nagad" ? "বিকাশ/নগদ নম্বর:" : "ওয়ালেট অ্যাড্রেস / আইডি:"}
        </label>
        <input 
          type="text" 
          placeholder={selectedMethod === "bkash" ? "যেমন: 017xxxxxxxx" : "আপনার অ্যাড্রেস বা আইডি দিন"} 
          value={accountNumber}
          onChange={(e) => setAccountNumber(e.target.value)}
          className="w-full p-3 mb-4 bg-zinc-800 rounded-lg text-white border border-zinc-700 focus:outline-none"
        />

        {/* টাকার পরিমাণ */}
        <label className="block mb-2 text-sm font-semibold">পরিমাণ (Amount):</label>
        <input 
          type="number" 
          placeholder="কত পয়েন্ট/টাকা তুলতে চান" 
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className="w-full p-3 mb-6 bg-zinc-800 rounded-lg text-white border border-zinc-700 focus:outline-none"
        />

        {/* সাবমিট বাটন */}
        <button 
          type="submit" 
          className="w-full bg-yellow-500 hover:bg-yellow-600 text-black font-bold p-3 rounded-lg transition"
        >
          উইথড্র করুন
        </button>

        {message && <p className="mt-4 text-center text-green-400 text-sm">{message}</p>}
      </form>
    </div>
  );
};

export default Withdraw;
