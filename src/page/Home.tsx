import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function HomePage() {
  const [activeTab, setActiveTab] = useState("Exchange");
  const [showWithdrawModal, setShowWithdrawModal] = useState(false);
  
  // গ্লোবাল বা কমন கீ (shared_app_balance) ব্যবহার করা হয়েছে যাতে সব পেজে ব্যালেন্স এক থাকে
  const [balance, setBalance] = useState<number>(() => {
    const savedBalance = localStorage.getItem("shared_app_balance");
    return savedBalance !== null ? parseFloat(savedBalance) : 154.76;
  });
  
  // গ্লোবাল উইথড্র কাউন্ট (shared_withdraw_count)
  const [withdrawCount, setWithdrawCount] = useState<number>(() => {
    const savedCount = localStorage.getItem("shared_withdraw_count");
    return savedCount !== null ? parseInt(savedCount, 10) : 0;
  });
  
  const [amount, setAmount] = useState("");
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState("বিকাশ (bKash)");
  const [accountDetails, setAccountDetails] = useState("");
  const navigate = useNavigate();

  // অন্য কোনো পেজ থেকে ব্যালেন্স পরিবর্তন হলে তা সাথে সাথে সিঙ্ক করার জন্য
  useEffect(() => {
    const handleStorageChange = () => {
      const updatedBalance = localStorage.getItem("shared_app_balance");
      if (updatedBalance !== null) setBalance(parseFloat(updatedBalance));

      const updatedCount = localStorage.getItem("shared_withdraw_count");
      if (updatedCount !== null) setWithdrawCount(parseInt(updatedCount, 10));
    };

    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  // ব্যালেন্স ও কাউন্টার পরিবর্তন হলে তা localStorage-এ গ্লোবালি সেভ করে রাখা
  useEffect(() => {
    localStorage.setItem("shared_app_balance", balance.toString());
  }, [balance]);

  useEffect(() => {
    localStorage.setItem("shared_withdraw_count", withdrawCount.toString());
  }, [withdrawCount]);

  // উইথড্র করার লজিক এবং কাউন্টার বাড়ানো
  const handleWithdraw = (e: React.FormEvent) => {
    e.preventDefault();
    const withdrawAmount = parseFloat(amount);

    if (!withdrawAmount || isNaN(withdrawAmount)) {
      alert("⚠️ দয়া করে সঠিক অ্যামাউন্ট লিখুন।");
      return;
    }

    if (withdrawAmount < 10) {
      alert("❌ মিনিমাম উইথড্র অ্যামাউন্ট ১০ ইউএসডি (10 USDT) হতে হবে।");
      return;
    }

    if (withdrawAmount > balance) {
      alert("❌ আপনার ওয়ালেটে পর্যাপ্ত ব্যালেন্স নেই।");
      return;
    }

    if (!accountDetails.trim()) {
      alert("⚠️ দয়া করে আপনার নম্বর বা ওয়ালেট এড্রেস দিন।");
      return;
    }

    // মূল ব্যালেন্স থেকে উইথড্র করা অ্যামাউন্ট তাৎক্ষণিকভাবে মাইনাস করা
    const updatedBalance = balance - withdrawAmount;
    const finalBalance = Number(updatedBalance.toFixed(2));
    
    setBalance(finalBalance);
    
    // উইথড্র কাউন্ট ১ বাড়িয়ে দেওয়া
    const newCount = withdrawCount + 1;
    setWithdrawCount(newCount);

    // লোকালস্টোরেজে তাৎক্ষণিকভাবে আপডেট পুশ করা
    localStorage.setItem("shared_app_balance", finalBalance.toString());
    localStorage.setItem("shared_withdraw_count", newCount.toString());

    alert(`✅ সফলভাবে উইথড্র রিকোয়েস্ট #${newCount} গ্রহণ করা হয়েছে!\n\n💳 মেথড: ${selectedPaymentMethod}\n📌 অ্যাকাউন্ট: ${accountDetails}\n💸 উইথড্র: ${withdrawAmount} USDT\n💰 অবশিষ্ট ব্যালেন্স: ${finalBalance} USDT`);
    
    setShowWithdrawModal(false);
    setAmount("");
    setAccountDetails("");
  };

  const paymentMethods = [
    "বিকাশ (bKash)",
    "নগদ (Nagad)",
    "রকেট (Rocket)",
    "উপায় (Upay)",
    "USDT (TRC20 / TON)",
    "Binance Pay",
    "পেয়ার (Payeer)",
    "পারফেক্ট মানি (Perfect Money)",
    "বটকয়েন (Bitcoin / BTC)",
    "ব্যাংক ট্রান্সফার (Bank Transfer)",
  ];

  const getAccountPlaceholder = () => {
    if (selectedPaymentMethod.includes("বিকাশ") || selectedPaymentMethod.includes("নগদ")) {
      return "যেমন: 017XXXXXXXX";
    } else if (selectedPaymentMethod.includes("USDT") || selectedPaymentMethod.includes("TON") || selectedPaymentMethod.includes("Binance")) {
      return "যেমন: UQD... বা UID দিন";
    } else {
      return "আপনার সঠিক অ্যাকাউন্ট তথ্য দিন...";
    }
  };

  return (
    <div className="flex flex-col h-screen w-full max-w-[420px] mx-auto bg-[#05070c] text-white justify-between select-none font-sans antialiased shadow-2xl border-x border-gray-900 overflow-hidden">
      
      {/* হোমপেজ মেইন কনটেন্ট */}
      <div className="w-full p-4 flex-1 overflow-y-auto space-y-4">
        
        {/* টপ কানেক্ট ওয়ালেট বাটন ও ওপরে ছোট করে উইথড্র কাউন্টার */}
        <div className="flex justify-between items-center mb-1">
          <div className="bg-indigo-950/60 border border-indigo-500/40 text-pink-300 text-[10px] font-bold px-2.5 py-1 rounded-full shadow-inner flex items-center gap-1.5">
            <span>📌 Withdrawals:</span>
            <span className="text-emerald-400 font-black">{withdrawCount}</span>
          </div>
          <button className="bg-gradient-to-r from-sky-400 to-blue-600 hover:from-sky-300 hover:to-blue-500 text-white font-black px-4 py-2 rounded-full text-xs shadow-lg shadow-blue-950/50 flex items-center gap-1.5 cursor-pointer active:scale-95 transition">
            <span className="text-sm">💎</span> Connect Wallet
          </button>
        </div>

        {/* ইনকামিং ক্যাশ এবং কানেক্টেড স্ট্যাটাস */}
        <div className="flex items-center justify-between bg-[#0b101c] border border-gray-800 rounded-2xl px-4 py-3 shadow-md">
          <div className="flex items-center gap-2">
            <span className="text-xs font-black tracking-widest text-transparent bg-clip-text bg-gradient-to-r from-indigo-300 via-pink-300 to-amber-200 uppercase font-serif">
              INCOMING CASH
            </span>
          </div>
          <div className="flex items-center gap-1.5 bg-[#121926] border border-emerald-500/30 px-3 py-1 rounded-full">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            <span className="text-[11px] font-bold text-emerald-400">Connected</span>
          </div>
        </div>

        {/* ওয়ালেট টাইটেল */}
        <div className="pt-1 px-1">
          <h2 className="text-xl font-black tracking-tight text-white">My Wallet</h2>
          <p className="text-[11px] text-indigo-300 font-medium mt-0.5">TON & USDT Secure Network</p>
        </div>

        {/* ব্যালেন্স কার্ড */}
        <div className="bg-[#0b101c] border border-gray-800 rounded-3xl p-5 shadow-xl relative overflow-hidden">
          <div className="flex items-center gap-2 mb-2">
            <span className="bg-emerald-500/20 text-emerald-400 p-1 rounded-lg text-xs font-black flex items-center justify-center border border-emerald-500/30">₮</span>
            <span className="text-xs text-gray-300 font-bold tracking-wide">USDT BALANCE</span>
          </div>
          
          <div className="text-4xl font-black text-emerald-400 mb-1 tracking-tight">
            {balance.toFixed(2)} <span className="text-lg text-white font-bold">USDT</span>
          </div>
          <div className="text-xs text-gray-400 mb-5 font-medium">≈ ${balance.toFixed(2)} USD</div>

          <div className="grid grid-cols-2 gap-3">
            <button 
              onClick={() => setActiveTab("Earn")}
              className="bg-[#10b981] hover:bg-[#059669] text-gray-950 font-black py-3 rounded-2xl text-xs transition-all shadow-lg cursor-pointer active:scale-95"
            >
              Earn More
            </button>
            <button 
              onClick={() => setShowWithdrawModal(true)}
              className="bg-[#1f2937] hover:bg-[#374151] text-white font-black py-3 rounded-2xl text-xs border border-gray-700 transition-all shadow-lg cursor-pointer active:scale-95"
            >
              Withdraw
            </button>
          </div>
        </div>

        {/* অ্যানাউন্সমেন্ট */}
        <div className="bg-[#0b101c] border border-gray-800 rounded-2xl p-4 text-center shadow-md">
          <div className="text-amber-400 font-bold text-xs mb-1.5 flex items-center justify-center gap-1.5">
            <span>📢</span> ANNOUNCEMENT
          </div>
          <p className="text-xs text-gray-300 leading-relaxed font-normal">
            Complete tasks from the Earn tab to get instant USDT rewards. Minimum withdraw limit is <span className="text-emerald-400 font-bold">10 USDT</span>.
          </p>
        </div>

      </div>

      {/* উইথড্র পপআপ মডাল */}
      {showWithdrawModal && (
        <div className="fixed inset-0 bg-black/85 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-[#0b101c] border border-indigo-500/30 rounded-3xl p-4 w-full max-w-xs text-white shadow-2xl relative max-h-[90vh] overflow-y-auto">
            
            <div className="flex justify-between items-center mb-3 pb-2 border-b border-gray-800">
              <div>
                <h3 className="text-sm font-extrabold text-white">Withdraw Funds</h3>
                <p className="text-[10px] text-indigo-400">Select payment method & account</p>
              </div>
              <button 
                onClick={() => setShowWithdrawModal(false)}
                className="w-7 h-7 bg-gray-800 hover:bg-gray-700 rounded-full flex items-center justify-center text-gray-400 hover:text-white font-bold transition cursor-pointer text-xs"
              >
                ✕
              </button>
            </div>

            <div className="bg-[#121926] border border-pink-500/30 rounded-xl p-2.5 mb-3 text-center">
              <div className="text-pink-400 font-bold text-[11px] mb-0.5 flex items-center justify-center gap-1">
                <span>⚠️</span> সর্বনিম্ন উত্তোলন: ১০ ইউএসডি (USD)
              </div>
              <p className="text-[10px] text-gray-300">
                উত্তোলনের আবেদন করার সাথে সাথে আপনার মূল ব্যালেন্স থেকে সমপরিমাণ টাকা কেটে নেওয়া হবে এবং ট্যাক্স কমপ্লিট না হওয়া পর্যন্ত তা এই অবস্থায় থাকবে।
              </p>
            </div>
            
            <form onSubmit={handleWithdraw} className="space-y-2.5">
              <div>
                <label className="block text-[10px] font-bold text-indigo-300 uppercase tracking-wider mb-1">পেমেন্ট মেথড</label>
                <select 
                  value={selectedPaymentMethod}
                  onChange={(e) => setSelectedPaymentMethod(e.target.value)}
                  className="w-full bg-[#0d1322] border border-gray-700 rounded-xl px-3 py-2 text-xs text-pink-400 font-semibold focus:outline-none focus:border-indigo-500 cursor-pointer"
                >
                  {paymentMethods.map((method) => (
                    <option key={method} value={method} className="bg-[#0d1322] text-white py-1">
                      {method}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-[10px] font-bold text-indigo-300 uppercase tracking-wider mb-1">পেমেন্ট অ্যাকাউন্ট নম্বর (PERSONAL/AGENT)</label>
                <input 
                  type="text"
                  placeholder={getAccountPlaceholder()}
                  value={accountDetails}
                  onChange={(e) => setAccountDetails(e.target.value)}
                  className="w-full bg-[#0d1322] border border-gray-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-indigo-500 placeholder-gray-500"
                />
              </div>

              <div>
                <div className="flex justify-between items-center mb-1">
                  <label className="text-[10px] font-bold text-indigo-300 uppercase tracking-wider">পরিমাণ (USDT)</label>
                  <span className="text-[9px] text-pink-400 font-semibold">মিনিমাম: ১০ USDT</span>
                </div>
                <input 
                  type="number"
                  step="any"
                  placeholder="কত উইথড্র করবেন?"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  className="w-full bg-[#0d1322] border border-gray-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-indigo-500 placeholder-gray-500"
                />
              </div>

              <button 
                type="submit"
                className="w-full bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-gray-950 font-black py-2.5 rounded-xl text-xs transition-all shadow-xl cursor-pointer active:scale-95 mt-1"
              >
                Confirm Withdraw
              </button>
            </form>

          </div>
        </div>
      )}

      {/* হোমপেজের বটম নেভিগেশন বার (Exchange, Mine, Friends, Earn, Airdrop) */}
      <div className="grid grid-cols-5 items-center bg-[#070a12] py-2 px-2 border-t border-gray-800 w-full shrink-0 shadow-2xl">
        <div 
          onClick={() => setActiveTab("Exchange")}
          className={`flex flex-col items-center cursor-pointer transition ${activeTab === "Exchange" ? "text-amber-400 scale-105" : "text-gray-400 hover:text-gray-200"}`}
        >
          <span className="text-base mb-0.5">🪙</span>
          <span className="text-[10px] font-bold tracking-tight">Exchange</span>
        </div>
        <div 
          onClick={() => setActiveTab("Mine")}
          className={`flex flex-col items-center cursor-pointer transition ${activeTab === "Mine" ? "text-amber-400 scale-105" : "text-gray-400 hover:text-gray-200"}`}
        >
          <span className="text-base mb-0.5">⛏️</span>
          <span className="text-[10px] font-bold tracking-tight">Mine</span>
        </div>
        <div 
          onClick={() => setActiveTab("Friends")}
          className={`flex flex-col items-center cursor-pointer transition ${activeTab === "Friends" ? "text-amber-400 scale-105" : "text-gray-400 hover:text-gray-200"}`}
        >
          <span className="text-base mb-0.5">👥</span>
          <span className="text-[10px] font-bold tracking-tight">Friends</span>
        </div>
        <div 
          onClick={() => setActiveTab("Earn")}
          className={`flex flex-col items-center cursor-pointer transition ${activeTab === "Earn" ? "text-amber-400 scale-105" : "text-gray-400 hover:text-gray-200"}`}
        >
          <span className="text-base mb-0.5">💰</span>
          <span className="text-[10px] font-bold tracking-tight">Earn</span>
        </div>
        <div 
          onClick={() => {
            setActiveTab("Airdrop");
            navigate("/airdrop"); // যদি আপনার রাউটার সেটআপ থাকে তবে সরাসরি Airdrop পেজে চলে যাবে
          }}
          className={`flex flex-col items-center cursor-pointer transition ${activeTab === "Airdrop" ? "text-amber-400 scale-105" : "text-gray-400 hover:text-gray-200"}`}
        >
          <span className="text-base mb-0.5">🪂</span>
          <span className="text-[10px] font-bold tracking-tight">Airdrop</span>
        </div>
      </div>

    </div>
  );
}
