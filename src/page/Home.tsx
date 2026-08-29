import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const [activeTab, setActiveTab] = useState("Exchange");
  const [showWithdrawModal, setShowWithdrawModal] = useState(false);
  
  // ব্যালেন্সকে স্টেটে রাখা হলো যাতে উইথড্র করলে মেইন ব্যালেন্স থেকে কেটে যায়
  const [balance, setBalance] = useState(154.76);
  
  const [amount, setAmount] = useState("");
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState("বিকাশ (bKash)");
  const [accountDetails, setAccountDetails] = useState("");
  const navigate = useNavigate();

  // সিক্রেট অ্যাডমিন প্যানেল খোলার জন্য (অ্যানাউন্সমেন্ট বক্সের নিচে ডাবল ক্লিক)
  const handleSecretClick = (e: React.MouseEvent) => {
    if (e.detail === 2) {
      navigate("/admin");
    }
  };

  // উইথড্র সাবমিট করার ফাংশন (মিনিমাম চেক এবং ব্যালেন্স কাটার লজিকসহ)
  const handleWithdraw = (e: React.FormEvent) => {
    e.preventDefault();
    const withdrawAmount = parseFloat(amount);

    if (!withdrawAmount || isNaN(withdrawAmount)) {
      alert("⚠️ দয়া করে সঠিক পরিমাণ অ্যামাউন্ট লিখুন।");
      return;
    }

    // মিনিমাম উইথড্র ১০ ইউএসডি চেক
    if (withdrawAmount < 10) {
      alert("❌ মিনিমাম উইথড্র অ্যামাউন্ট ১০ ইউএসডি (10 USDT) হতে হবে।");
      return;
    }

    // মেইন ব্যালেন্সের বেশি উইথড্র করতে চাইলে চেক
    if (withdrawAmount > balance) {
      alert("❌ আপনার ওয়ালেটে পর্যাপ্ত পরিমাণ ব্যালেন্স নেই।");
      return;
    }

    if (!accountDetails) {
      alert("⚠️ দয়া করে আপনার অ্যাকাউন্ট নম্বর বা ওয়ালেট অ্যাড্রেস লিখুন।");
      return;
    }

    // মূল ব্যালেন্স থেকে অ্যামাউন্ট বিয়োগ করা
    const newBalance = balance - withdrawAmount;
    setBalance(Number(newBalance.toFixed(2)));

    alert(`✅ সফলভাবে উইথড্র রিকোয়েস্ট সাবমিট হয়েছে!\n\n💳 মেথড: ${selectedPaymentMethod}\n📌 অ্যাকাউন্ট/অ্যাড্রেস: ${accountDetails}\n💸 উইথড্র পরিমাণ: ${withdrawAmount} USDT\n💰 অবশিষ্ট ব্যালেন্স: ${(newBalance).toFixed(2)} USDT`);
    
    setShowWithdrawModal(false);
    setAmount("");
    setAccountDetails("");
  };

  // ১০টি পেমেন্ট মেথড
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

  // মেথড অনুযায়ী ইনপুট ফিল্ডের লেবেল পরিবর্তন
  const getAccountLabel = () => {
    if (selectedPaymentMethod.includes("বিকাশ") || selectedPaymentMethod.includes("নগদ") || selectedPaymentMethod.includes("রকেট") || selectedPaymentMethod.includes("উপায়")) {
      return `${selectedPaymentMethod} নম্বর (Personal / Agent)`;
    } else if (selectedPaymentMethod.includes("USDT") || selectedPaymentMethod.includes("Bitcoin") || selectedPaymentMethod.includes("Binance")) {
      return `${selectedPaymentMethod} ওয়ালেট অ্যাড্রেস`;
    } else if (selectedPaymentMethod.includes("ব্যাংক")) {
      return "ব্যাংক অ্যাকাউন্ট নম্বর ও ব্রাঞ্চের নাম";
    } else {
      return "অ্যাকাউন্ট নম্বর / আইডি / অ্যাড্রেস";
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
    <div className="flex flex-col min-h-screen bg-[#07090e] text-white justify-between select-none font-sans">
      
      {/* একদম ওপরের প্রিমিয়াম হেডার বার */}
      <div className="w-full max-w-md mx-auto px-4 pt-3 pb-2.5 flex items-center justify-between border-b border-gray-800/60 bg-[#0c1017]">
        <div className="flex items-center gap-3">
          <button className="text-gray-400 hover:text-white text-lg font-bold cursor-pointer transition">✕</button>
          <span className="text-xs font-semibold tracking-wide text-gray-300 uppercase">Incoming Cash</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-gray-500 text-xs">⌄</span>
          <button className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white px-3.5 py-1.5 rounded-full text-xs font-bold flex items-center gap-1.5 shadow-lg shadow-blue-900/30 transition">
            <span>💎</span> Connect Wallet
          </button>
          <button className="text-gray-400 hover:text-white text-lg font-bold ml-1 cursor-pointer transition">⋮</button>
        </div>
      </div>

      {/* মেইন কনটেন্ট অংশ (প্রিমিয়াম কার্ড ও কালারিং) */}
      <div className="w-full max-w-md mx-auto p-4 flex-1">
        
        {/* টপ ওয়ালেট হেডার */}
        <div className="flex justify-between items-center mb-5 pt-2">
          <div>
            <h1 className="text-xl font-black tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-white via-gray-200 to-gray-400">My Wallet</h1>
            <p className="text-[11px] text-indigo-400 font-medium mt-0.5">TON & USDT Secure Network</p>
          </div>
          <div className="bg-[#121926] border border-emerald-500/30 px-3 py-1.5 rounded-full flex items-center gap-1.5 shadow-sm">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
            <span className="text-[11px] text-emerald-400 font-bold tracking-wide">Connected</span>
          </div>
        </div>

        {/* প্রিমিয়াম ব্যালেন্স এবং বাটন কার্ড */}
        <div className="bg-gradient-to-br from-[#111827] via-[#0f172a] to-[#0b0f19] border border-gray-800/80 rounded-2xl p-5 mb-4 shadow-2xl relative overflow-hidden">
          {/* ব্যাকগ্রাউন্ড গ্লো ইফেক্ট */}
          <div className="absolute -right-10 -top-10 w-32 h-32 bg-emerald-500/10 rounded-full blur-2xl pointer-events-none"></div>
          
          <div className="flex items-center gap-2 mb-2">
            <span className="bg-emerald-500 text-gray-950 px-2 py-0.5 rounded-md text-xs font-black shadow-sm">₮</span>
            <span className="text-xs text-gray-300 font-semibold uppercase tracking-wider">USDT Balance</span>
          </div>
          
          {/* ডাইনামিক ব্যালেন্স ডিসপ্লে */}
          <div className="text-3xl font-black text-emerald-400 mb-1 tracking-tight drop-shadow-sm">
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
              className="bg-[#1e293b] hover:bg-[#334155] text-white font-extrabold py-3 rounded-xl text-sm border border-gray-700/80 transition-all shadow-lg cursor-pointer active:scale-95"
            >
              Withdraw
            </button>
          </div>
        </div>

        {/* অ্যানাউন্সমেন্ট বক্স */}
        <div className="bg-[#0f141f] border border-gray-800/80 rounded-2xl p-4 text-center shadow-lg relative">
          <div className="text-amber-400 font-bold text-xs mb-1.5 flex items-center justify-center gap-1.5 uppercase tracking-wider">
            <span className="animate-bounce">📢</span> Announcement
          </div>
          <p className="text-xs text-gray-400 leading-relaxed font-normal">
            Complete tasks from the Earn tab to get instant USDT rewards directly in your balance. Minimum withdraw limit is <span className="text-emerald-400 font-bold">10 USDT</span>.
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

      {/* প্রিমিয়াম উইথড্র পপআপ মডাল */}
      {showWithdrawModal && (
        <div className="fixed inset-0 bg-black/85 backdrop-blur-sm flex items-center justify-center p-4 z-50 animate-fadeIn">
          <div className="bg-[#0f172a] border border-gray-800 rounded-3xl p-6 w-full max-w-sm text-white shadow-2xl relative">
            
            <div className="flex justify-between items-center mb-5 pb-2 border-b border-gray-800">
              <div>
                <h3 className="text-base font-extrabold text-white">Withdraw Funds</h3>
                <p className="text-[11px] text-gray-400">Select method & enter payout details</p>
              </div>
              <button 
                onClick={() => setShowWithdrawModal(false)}
                className="w-8 h-8 bg-gray-800/80 hover:bg-gray-700 rounded-full flex items-center justify-center text-gray-400 hover:text-white font-bold transition cursor-pointer"
              >
                ✕
              </button>
            </div>
            
            <form onSubmit={handleWithdraw} className="space-y-4">
              {/* পেমেন্ট মেথড সিলেকশন */}
              <div>
                <label className="block text-[11px] font-bold text-gray-300 uppercase tracking-wider mb-1.5">পেমেন্ট মেথড সিলেক্ট করুন</label>
                <select 
                  value={selectedPaymentMethod}
                  onChange={(e) => setSelectedPaymentMethod(e.target.value)}
                  className="w-full bg-[#111827] border border-gray-700/80 rounded-xl px-3 py-2.5 text-xs text-emerald-400 font-semibold focus:outline-none focus:border-emerald-500 cursor-pointer shadow-inner"
                >
                  {paymentMethods.map((method) => (
                    <option key={method} value={method} className="bg-[#111827] text-white py-1">
                      {method}
                    </option>
                  ))}
                </select>
              </div>

              {/* ডায়নামিক অ্যাকাউন্ট নম্বর বা ওয়ালেট অ্যাড্রেস ফিল্ড */}
              <div>
                <label className="block text-[11px] font-bold text-gray-300 uppercase tracking-wider mb-1.5">{getAccountLabel()}</label>
                <input 
                  type="text"
                  placeholder={getAccountPlaceholder()}
                  value={accountDetails}
                  onChange={(e) => setAccountDetails(e.target.value)}
                  className="w-full bg-[#111827] border border-gray-700/80 rounded-xl px-3 py-2.5 text-xs text-white focus:outline-none focus:border-emerald-500 placeholder-gray-600 shadow-inner"
                />
              </div>

              {/* পরিমাণ ইনপুট ও মিনিমাম নির্দেশিকা */}
              <div>
                <div className="flex justify-between items-center mb-1.5">
                  <label className="text-[11px] font-bold text-gray-300 uppercase tracking-wider">পরিমাণ (USDT)</label>
                  <span className="text-[10px] text-amber-400 font-semibold">মিনিমাম: ১০ USDT</span>
                </div>
                <input 
                  type="number"
                  step="any"
                  placeholder="কত পরিমাণ উইথড্র করবেন?"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  className="w-full bg-[#111827] border border-gray-700/80 rounded-xl px-3 py-2.5 text-xs text-white focus:outline-none focus:border-emerald-500 placeholder-gray-600 shadow-inner"
                />
              </div>

              <button 
                type="submit"
                className="w-full bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-gray-950 font-black py-3 rounded-xl text-sm transition-all shadow-xl shadow-emerald-900/40 cursor-pointer active:scale-95 mt-2"
              >
                Confirm Withdraw
              </button>
            </form>

          </div>
        </div>
      )}

      {/* একদম নিচের প্রিমিয়াম নেভিগেশন বার */}
      <div className="grid grid-cols-5 items-center bg-[#0c1017] py-2.5 px-2 border-t border-gray-800/80 w-full max-w-md mx-auto rounded-t-2xl shadow-2xl">
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
