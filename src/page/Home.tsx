import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const [activeTab, setActiveTab] = useState("Exchange");
  const [showWithdrawModal, setShowWithdrawModal] = useState(false);
  
  // ব্যালেন্স স্টেট (উইথড্র করলে সাথে সাথে মাইনাস হয়ে যাবে)
  const [balance, setBalance] = useState(154.76);
  
  const [amount, setAmount] = useState("");
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState("বিকাশ (bKash)");
  const [accountDetails, setAccountDetails] = useState("");
  const navigate = useNavigate();

  // সিক্রেট অ্যাডমিন প্যানেল (অ্যানাউন্সমেন্ট বক্সের নিচে ডাবল ক্লিক)
  const handleSecretClick = (e: React.MouseEvent) => {
    if (e.detail === 2) {
      navigate("/admin");
    }
  };

  // ইনস্ট্যান্ট উইথড্র ও ব্যালেন্স কাটার লজিক
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
      alert("⚠️ দয়া করে অ্যাকাউন্ট নম্বর বা ওয়ালেট অ্যাড্রেস লিখুন।");
      return;
    }

    // সঙ্গে সঙ্গে ব্যালেন্স থেকে কেটে নেওয়া
    const updatedBalance = balance - withdrawAmount;
    setBalance(Number(updatedBalance.toFixed(2)));

    alert(`✅ সফলভাবে উইথড্র রিকোয়েস্ট গ্রহণ করা হয়েছে!\n\n💳 মেথড: ${selectedPaymentMethod}\n📌 অ্যাকাউন্ট/অ্যাড্রেস: ${accountDetails}\n💸 উইথড্র: ${withdrawAmount} USDT\n💰 অবশিষ্ট ব্যালেন্স: ${updatedBalance.toFixed(2)} USDT`);
    
    setShowWithdrawModal(false);
    setAmount("");
    setAccountDetails("");
  };

  // ১০টি পেমেন্ট মেথড
  const paymentMethods = [
    "বিকাশ (bKash)",
    "নগد (Nagad)",
    "রকেট (Rocket)",
    "উপায় (Upay)",
    "USDT (TRC20 / TON)",
    "Binance Pay",
    "পেয়ার (Payeer)",
    "পারফেক্ট মানি (Perfect Money)",
    "বটকয়েন (Bitcoin / BTC)",
    "ব্যাংক ট্রান্সফার (Bank Transfer)",
  ];

  // মেথড অনুযায়ী লেবেল পরিবর্তন
  const getAccountLabel = () => {
    if (selectedPaymentMethod.includes("বিকাশ") || selectedPaymentMethod.includes("নগদ") || selectedPaymentMethod.includes("রকেট") || selectedPaymentMethod.includes("উপায়")) {
      return `${selectedPaymentMethod} নম্বর (Personal/Agent)`;
    } else if (selectedPaymentMethod.includes("USDT") || selectedPaymentMethod.includes("Bitcoin") || selectedPaymentMethod.includes("Binance")) {
      return `${selectedPaymentMethod} ওয়ালেট অ্যাড্রেস`;
    } else if (selectedPaymentMethod.includes("ব্যাংক")) {
      return "ব্যাংক অ্যাকাউন্ট ও ব্রাঞ্চের নাম";
    } else {
      return "অ্যাকাউন্ট নম্বর / ওয়ালেট অ্যাড্রেস";
    }
  };

  const getAccountPlaceholder = () => {
    if (selectedPaymentMethod.includes("বিকাশ") || selectedPaymentMethod.includes("নগদ")) {
      return "যেমন: 017XXXXXXXX";
    } else if (selectedPaymentMethod.includes("USDT") || selectedPaymentMethod.includes("TON")) {
      return "যেমন: UQD... বা TRC20 অ্যাড্রেস";
    } else {
      return "আপনার সঠিক তথ্যটি এখানে লিখুন...";
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-[#07090e] text-white justify-between select-none font-sans antialiased">
      
      {/* ওপরের হেডার বার */}
      <div className="w-full max-w-md mx-auto px-4 py-3 flex items-center justify-between border-b border-gray-800/80 bg-[#0c1017]">
        <div className="flex items-center gap-2.5">
          <button className="text-gray-400 hover:text-white text-base font-bold cursor-pointer">✕</button>
          <span className="text-xs font-semibold tracking-wide text-gray-300 uppercase">Incoming Cash</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-gray-500 text-xs">⌄</span>
          <button className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white px-3.5 py-1.5 rounded-full text-xs font-bold flex items-center gap-1.5 shadow-md shadow-blue-900/30 transition">
            <span>💎</span> Connect Wallet
          </button>
          <button className="text-gray-400 hover:text-white text-base font-bold ml-1 cursor-pointer">⋮</button>
        </div>
      </div>

      {/* মেইন কনটেন্ট এরিয়া */}
      <div className="w-full max-w-md mx-auto p-4 flex-1">
        
        {/* ওয়ালেট হেডার */}
        <div className="flex justify-between items-center mb-4 pt-1">
          <div>
            <h1 className="text-xl font-black tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-white via-gray-200 to-gray-400">My Wallet</h1>
            <p className="text-[11px] text-indigo-400 font-medium mt-0.5">TON & USDT Secure Network</p>
          </div>
          <div className="bg-[#121926] border border-emerald-500/30 px-3 py-1.5 rounded-full flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
            <span className="text-[11px] text-emerald-400 font-bold tracking-wide">Connected</span>
          </div>
        </div>

        {/* প্রিমিয়াম ব্যালেন্স কার্ড */}
        <div className="bg-gradient-to-br from-[#111827] via-[#0f172a] to-[#0b0f19] border border-gray-800 rounded-2xl p-5 mb-4 shadow-xl relative overflow-hidden">
          <div className="flex items-center gap-2 mb-2">
            <span className="bg-emerald-500 text-gray-950 px-2 py-0.5 rounded-md text-xs font-black">₮</span>
            <span className="text-xs text-gray-300 font-semibold uppercase tracking-wider">USDT Balance</span>
          </div>
          
          <div className="text-3xl font-black text-emerald-400 mb-1 tracking-tight">
            {balance.toFixed(2)} <span className="text-base text-gray-200 font-bold">USDT</span>
          </div>
          <div className="text-xs text-gray-400 mb-5 font-medium">≈ ${balance.toFixed(2)} USD</div>

          {/* Earn More এবং Withdraw বাটন */}
          <div className="grid grid-cols-2 gap-3">
            <button 
              onClick={() => setActiveTab("Earn")}
              className="bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-gray-950 font-extrabold py-3 rounded-xl text-sm transition-all shadow-lg shadow-emerald-900/30 cursor-pointer active:scale-95"
            >
              Earn More
            </button>
            <button 
              onClick={() => setShowWithdrawModal(true)}
              className="bg-[#1e293b] hover:bg-[#334155] text-white font-extrabold py-3 rounded-xl text-sm border border-gray-700 transition-all shadow-lg cursor-pointer active:scale-95"
            >
              Withdraw
            </button>
          </div>
        </div>

        {/* অ্যানাউন্সমেন্ট বক্স */}
        <div className="bg-[#0f141f] border border-gray-800 rounded-2xl p-4 text-center shadow-md">
          <div className="text-amber-400 font-bold text-xs mb-1.5 flex items-center justify-center gap-1.5 uppercase tracking-wider">
            <span>📢</span> Announcement
          </div>
          <p className="text-xs text-gray-400 leading-relaxed font-normal">
            Complete tasks from the Earn tab to get instant USDT rewards. Minimum withdraw limit is <span className="text-emerald-400 font-bold">10 USDT</span>.
          </p>
        </div>

        {/* সিক্রেট অ্যাডমিন এরিয়া */}
        <div 
          onClick={handleSecretClick}
          className="w-full h-10 mt-2 cursor-pointer flex items-center justify-center text-transparent text-[1px]"
        >
          Secret Admin Area
        </div>

      </div>

      {/* ইনস্ট্যান্ট উইথড্র পপআপ মডাল */}
      {showWithdrawModal && (
        <div className="fixed inset-0 bg-black/85 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-[#0f172a] border border-gray-800 rounded-3xl p-6 w-full max-w-sm text-white shadow-2xl relative">
            
            <div className="flex justify-between items-center mb-4 pb-2 border-b border-gray-800">
              <div>
                <h3 className="text-base font-extrabold text-white">Withdraw Funds</h3>
                <p className="text-[11px] text-gray-400">Select payment method & account</p>
              </div>
              <button 
                onClick={() => setShowWithdrawModal(false)}
                className="w-8 h-8 bg-gray-800 hover:bg-gray-700 rounded-full flex items-center justify-center text-gray-400 hover:text-white font-bold transition cursor-pointer"
              >
                ✕
              </button>
            </div>
            
            <form onSubmit={handleWithdraw} className="space-y-3.5">
              {/* পেমেন্ট মেথড সিলেকশন */}
              <div>
                <label className="block text-[11px] font-bold text-gray-300 uppercase tracking-wider mb-1">পেমেন্ট মেথড</label>
                <select 
                  value={selectedPaymentMethod}
                  onChange={(e) => setSelectedPaymentMethod(e.target.value)}
                  className="w-full bg-[#111827] border border-gray-700 rounded-xl px-3 py-2.5 text-xs text-emerald-400 font-semibold focus:outline-none focus:border-emerald-500 cursor-pointer"
                >
                  {paymentMethods.map((method) => (
                    <option key={method} value={method} className="bg-[#111827] text-white py-1">
                      {method}
                    </option>
                  ))}
                </select>
              </div>

              {/* অ্যাকাউন্ট নম্বর বা ওয়ালেট অ্যাড্রেস */}
              <div>
                <label className="block text-[11px] font-bold text-gray-300 uppercase tracking-wider mb-1">{getAccountLabel()}</label>
                <input 
                  type="text"
                  placeholder={getAccountPlaceholder()}
                  value={accountDetails}
                  onChange={(e) => setAccountDetails(e.target.value)}
                  className="w-full bg-[#111827] border border-gray-700 rounded-xl px-3 py-2.5 text-xs text-white focus:outline-none focus:border-emerald-500 placeholder-gray-600"
                />
              </div>

              {/* পরিমাণ ইনপুট */}
              <div>
                <div className="flex justify-between items-center mb-1">
                  <label className="text-[11px] font-bold text-gray-300 uppercase tracking-wider">পরিমাণ (USDT)</label>
                  <span className="text-[10px] text-amber-400 font-semibold">মিনিমাম: ১০ USDT</span>
                </div>
                <input 
                  type="number"
                  step="any"
                  placeholder="কত উইথড্র করবেন?"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  className="w-full bg-[#111827] border border-gray-700 rounded-xl px-3 py-2.5 text-xs text-white focus:outline-none focus:border-emerald-500 placeholder-gray-600"
                />
              </div>

              <button 
                type="submit"
                className="w-full bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-gray-950 font-black py-3 rounded-xl text-sm transition-all shadow-xl shadow-emerald-900/40 cursor-pointer active:scale-95 mt-1"
              >
                Confirm Withdraw
              </button>
            </form>

          </div>
        </div>
      )}

      {/* নেভিগেশন বার */}
      <div className="grid grid-cols-5 items-center bg-[#0c1017] py-2.5 px-2 border-t border-gray-800 w-full max-w-md mx-auto rounded-t-2xl shadow-xl">
        <div 
          onClick={() => setActiveTab("Exchange")}
          className={`flex flex-col items-center cursor-pointer transition ${activeTab === "Exchange" ? "text-amber-400 scale-105" : "text-gray-500 hover:text-gray-300"}`}
        >
          <span className="text-lg mb-0.5 font-black text-amber-400">🟡</span>
          <span className="text-[10px] font-bold tracking-tight">Exchange</span>
        </div>
        <div 
          onClick={() => setActiveTab("Mine")}
          className={`flex flex-col items-center cursor-pointer transition ${activeTab === "Mine" ? "text-amber-400 scale-105" : "text-gray-500 hover:text-gray-300"}`}
        >
          <span className="text-lg mb-0.5">⛏️</span>
          <span className="text-[10px] font-bold tracking-tight">Mine</span>
        </div>
        <div 
          onClick={() => setActiveTab("Friends")}
          className={`flex flex-col items-center cursor-pointer transition ${activeTab === "Friends" ? "text-amber-400 scale-105" : "text-gray-500 hover:text-gray-300"}`}
        >
          <span className="text-lg mb-0.5">👥</span>
          <span className="text-[10px] font-bold tracking-tight">Friends</span>
        </div>
        <div 
          onClick={() => setActiveTab("Earn")}
          className={`flex flex-col items-center cursor-pointer transition ${activeTab === "Earn" ? "text-amber-400 scale-105" : "text-gray-500 hover:text-gray-300"}`}
        >
          <span className="text-lg mb-0.5">💰</span>
          <span className="text-[10px] font-bold tracking-tight">Earn</span>
        </div>
        <div 
          onClick={() => setActiveTab("Airdrop")}
          className={`flex flex-col items-center cursor-pointer transition ${activeTab === "Airdrop" ? "text-amber-400 scale-105" : "text-gray-500 hover:text-gray-300"}`}
        >
          <span className="text-lg mb-0.5">🪂</span>
          <span className="text-[10px] font-bold tracking-tight">Airdrop</span>
        </div>
      </div>

    </div>
  );
}
