import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const [activeTab, setActiveTab] = useState("Exchange");
  const [showWithdrawModal, setShowWithdrawModal] = useState(false);
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

  // উইথড্র সাবমিট করার ফাংশন
  const handleWithdraw = (e: React.FormEvent) => {
    e.preventDefault();
    if (!amount) {
      alert("দয়া করে টাকার পরিমাণ লিখুন");
      return;
    }
    if (!accountDetails) {
      alert("দয়া করে আপনার অ্যাকাউন্ট নম্বর বা ওয়ালেট অ্যাড্রেস লিখুন");
      return;
    }
    alert(`সফলভাবে উইথড্র রিকোয়েস্ট সাবমিট হয়েছে!\nমেথড: ${selectedPaymentMethod}\nঅ্যাকাউন্ট/অ্যাড্রেস: ${accountDetails}\nপরিমাণ: ${amount} USDT`);
    setShowWithdrawModal(false);
    setAmount("");
    setAccountDetails("");
  };

  // আপনার দেওয়া ১০টি পেমেন্ট মেথড
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

  // মেথড অনুযায়ী ইনপুট ফিল্ডের লেবেল পরিবর্তনের ফাংশন
  const getAccountLabel = () => {
    if (selectedPaymentMethod.includes("বিকাশ") || selectedPaymentMethod.includes("নগদ") || selectedPaymentMethod.includes("রকেট") || selectedPaymentMethod.includes("উপায়")) {
      return `${selectedPaymentMethod} নম্বর (Personal/Agent)`;
    } else if (selectedPaymentMethod.includes("USDT") || selectedPaymentMethod.includes("Bitcoin") || selectedPaymentMethod.includes("Binance")) {
      return `${selectedPaymentMethod} ওয়ালেট অ্যাড্রেস (Wallet Address)`;
    } else if (selectedPaymentMethod.includes("ব্যাংক")) {
      return "ব্যাংক অ্যাকাউন্ট নম্বর ও নাম (Bank Details)";
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
    <div className="flex flex-col min-h-screen bg-black text-white justify-between select-none">
      
      {/* একদম ওপরের হেডার (Incoming cash, Close বাটন এবং Connect Wallet) */}
      <div className="w-full max-w-md mx-auto px-4 pt-3 pb-2 flex items-center justify-between border-b border-gray-800/40">
        <div className="flex items-center gap-3">
          <button className="text-white text-lg font-bold cursor-pointer">✕</button>
          <span className="text-sm font-medium text-gray-200">Incoming cash</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-gray-400 text-sm">⌄</span>
          <button className="bg-[#121c2c] hover:bg-[#1a2638] text-blue-400 border border-blue-900/50 px-3 py-1.5 rounded-full text-xs font-semibold flex items-center gap-1.5 shadow-md">
            <span>💎</span> Connect Wallet
          </button>
          <button className="text-white text-lg font-bold ml-1 cursor-pointer">⋮</button>
        </div>
      </div>

      {/* মেইন কনটেন্ট অংশ */}
      <div className="w-full max-w-md mx-auto p-4 flex-1">
        
        {/* টপ ওয়ালেট হেডার */}
        <div className="flex justify-between items-center mb-5 pt-2">
          <div>
            <h1 className="text-xl font-bold tracking-tight text-white">My Wallet</h1>
            <p className="text-xs text-gray-400 mt-0.5">TON & USDT Network</p>
          </div>
          <div className="bg-[#12161c] border border-gray-800 px-3 py-1.5 rounded-full flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-green-500"></span>
            <span className="text-xs text-green-400 font-medium">Connected</span>
          </div>
        </div>

        {/* ব্যালেন্স এবং বাটন কার্ড */}
        <div className="bg-[#12161c] border border-gray-800/80 rounded-2xl p-5 mb-4 shadow-xl">
          <div className="flex items-center gap-2 mb-2">
            <span className="bg-green-500 text-black px-1.5 py-0.5 rounded-full text-xs font-bold">₮</span>
            <span className="text-xs text-gray-300 font-medium">USDT Balance</span>
          </div>
          
          <div className="text-3xl font-extrabold text-green-400 mb-1 tracking-wide">
            154.76 <span className="text-lg text-white font-semibold">USDT</span>
          </div>
          <div className="text-xs text-gray-400 mb-5">≈ $154.76 USD</div>

          {/* Earn More এবং Withdraw বাটন */}
          <div className="grid grid-cols-2 gap-3">
            <button 
              onClick={() => setActiveTab("Earn")}
              className="bg-[#20c997] hover:bg-[#1ba87f] text-black font-bold py-3 rounded-xl text-sm transition cursor-pointer"
            >
              Earn More
            </button>
            <button 
              onClick={() => setShowWithdrawModal(true)}
              className="bg-[#1c222b] hover:bg-[#252b36] text-white font-bold py-3 rounded-xl text-sm border border-gray-800 transition cursor-pointer"
            >
              Withdraw
            </button>
          </div>
        </div>

        {/* অ্যানাউন্সমেন্ট বক্স */}
        <div className="bg-[#12161c] border border-gray-800/80 rounded-2xl p-4 text-center shadow-lg">
          <div className="text-yellow-400 font-bold text-sm mb-1 flex items-center justify-center gap-1.5">
            <span>📢</span> Announcement
          </div>
          <p className="text-xs text-gray-400 leading-relaxed">
            Complete tasks from the Earn tab to get instant USDT rewards directly in your balance.
          </p>
        </div>

        {/* অ্যানাউন্সমেন্ট বক্সের নিচে সিক্রেট হিডেন এরিয়া (ডাবল ক্লিক করলে অ্যাডমিন প্যানেল খুলবে) */}
        <div 
          onClick={handleSecretClick}
          className="w-full h-12 mt-2 cursor-pointer flex items-center justify-center text-transparent text-[1px]"
        >
          Secret Admin Area
        </div>

      </div>

      {/* উইথড্র পপআপ উইন্ডো (মেথড, অ্যাকাউন্ট নম্বর এবং অ্যামাউন্ট ফিল্ড সহ) */}
      {showWithdrawModal && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center p-4 z-50">
          <div className="bg-[#161b22] border border-gray-800 rounded-2xl p-6 w-full max-w-sm text-white shadow-2xl relative">
            
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-bold">Withdraw USDT</h3>
              <button 
                onClick={() => setShowWithdrawModal(false)}
                className="text-gray-400 hover:text-white text-lg font-bold px-2 cursor-pointer"
              >
                ✕
              </button>
            </div>
            
            <form onSubmit={handleWithdraw} className="space-y-3.5">
              {/* পেমেন্ট মেথড সিলেকশন */}
              <div>
                <label className="block text-xs text-gray-400 mb-1">পেমেন্ট মেথড সিলেক্ট করুন</label>
                <select 
                  value={selectedPaymentMethod}
                  onChange={(e) => setSelectedPaymentMethod(e.target.value)}
                  className="w-full bg-[#0d1117] border border-gray-700 rounded-xl px-3 py-2 text-sm text-white focus:outline-none focus:border-green-500 cursor-pointer"
                >
                  {paymentMethods.map((method) => (
                    <option key={method} value={method} className="bg-[#161b22] text-white">
                      {method}
                    </option>
                  ))}
                </select>
              </div>

              {/* ডায়নামিক অ্যাকাউন্ট নম্বর বা ওয়ালেট অ্যাড্রেস ফিল্ড */}
              <div>
                <label className="block text-xs text-gray-400 mb-1">{getAccountLabel()}</label>
                <input 
                  type="text"
                  placeholder={getAccountPlaceholder()}
                  value={accountDetails}
                  onChange={(e) => setAccountDetails(e.target.value)}
                  className="w-full bg-[#0d1117] border border-gray-700 rounded-xl px-3 py-2 text-sm text-white focus:outline-none focus:border-green-500"
                />
              </div>

              {/* পরিমাণ ইনপুট */}
              <div>
                <label className="block text-xs text-gray-400 mb-1">পরিমাণ (Amount in USDT)</label>
                <input 
                  type="number"
                  placeholder="কত পরিমাণ উইথড্র করবেন?"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  className="w-full bg-[#0d1117] border border-gray-700 rounded-xl px-3 py-2 text-sm text-white focus:outline-none focus:border-green-500"
                />
              </div>

              <button 
                type="submit"
                className="w-full bg-[#20c997] hover:bg-[#1ba87f] text-black font-bold py-3 rounded-xl text-sm transition cursor-pointer mt-1"
              >
                Confirm Withdraw
              </button>
            </form>

          </div>
        </div>
      )}

      {/* একদম নিচের নেভিগেশন বার */}
      <div className="grid grid-cols-5 items-center bg-[#14181f] py-3 px-2 border-t border-gray-800/60 w-full max-w-md mx-auto rounded-t-2xl">
        <div 
          onClick={() => setActiveTab("Exchange")}
          className={`flex flex-col items-center cursor-pointer transition ${activeTab === "Exchange" ? "text-yellow-400" : "text-gray-400 hover:text-gray-200"}`}
        >
          <span className="text-xl mb-0.5 font-bold text-yellow-500">🟡</span>
          <span className="text-[10px] font-medium">Exchange</span>
        </div>
        <div 
          onClick={() => setActiveTab("Mine")}
          className={`flex flex-col items-center cursor-pointer transition ${activeTab === "Mine" ? "text-yellow-400" : "text-gray-400 hover:text-gray-200"}`}
        >
          <span className="text-xl mb-0.5">⛏️</span>
          <span className="text-[10px] font-medium">Mine</span>
        </div>
        <div 
          onClick={() => setActiveTab("Friends")}
          className={`flex flex-col items-center cursor-pointer transition ${activeTab === "Friends" ? "text-yellow-400" : "text-gray-400 hover:text-gray-200"}`}
        >
          <span className="text-xl mb-0.5">👥</span>
          <span className="text-[10px] font-medium">Friends</span>
        </div>
        <div 
          onClick={() => setActiveTab("Earn")}
          className={`flex flex-col items-center cursor-pointer transition ${activeTab === "Earn" ? "text-yellow-400" : "text-gray-400 hover:text-gray-200"}`}
        >
          <span className="text-xl mb-0.5">💰</span>
          <span className="text-[10px] font-medium">Earn</span>
        </div>
        <div 
          onClick={() => setActiveTab("Airdrop")}
          className={`flex flex-col items-center cursor-pointer transition ${activeTab === "Airdrop" ? "text-yellow-400" : "text-gray-400 hover:text-gray-200"}`}
        >
          <span className="text-xl mb-0.5">🪂</span>
          <span className="text-[10px] font-medium">Airdrop</span>
        </div>
      </div>

    </div>
  );
}
