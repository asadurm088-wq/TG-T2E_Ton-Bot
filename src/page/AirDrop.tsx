import React, { useState, useEffect } from "react";

export default function AirDrop() {
  const [activeTab, setActiveTab] = useState("Airdrop");
  const [showWithdrawModal, setShowWithdrawModal] = useState(false);
  const [showWalletModal, setShowWalletModal] = useState(false);
  
  const [balance, setBalance] = useState<number>(() => {
    const savedBalance = localStorage.getItem("shared_app_balance");
    return savedBalance !== null ? parseFloat(savedBalance) : 124.76;
  });
  
  const [amount, setAmount] = useState("");
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState("বিকাশ (bKash)");
  const [accountDetails, setAccountDetails] = useState("");

  useEffect(() => {
    localStorage.setItem("shared_app_balance", balance.toString());
  }, [balance]);

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
      alert("⚠️ দয়া করে আপনার UID বা ওয়ালেট নম্বর দিন।");
      return;
    }

    const updatedBalance = balance - withdrawAmount;
    const finalBalance = Number(updatedBalance.toFixed(2));
    
    setBalance(finalBalance);
    localStorage.setItem("shared_app_balance", finalBalance.toString());

    alert(`✅ সফলভাবে উইথড্র রিকোয়েস্ট গ্রহণ করা হয়েছে!\n\n💳 মেথড: ${selectedPaymentMethod}\n📌 অ্যাকাউন্ট/অ্যাড্রেস: ${accountDetails}\n💸 উইথড্র: ${withdrawAmount} USDT\n💰 অবশিষ্ট ব্যালেন্স: ${finalBalance} USDT`);
    
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

  return (
    <div style={{ backgroundColor: '#07090e', color: '#ffffff', minHeight: '100vh', width: '100%', maxWidth: '420px', margin: '0 auto', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', position: 'relative', overflowX: 'hidden', fontFamily: 'sans-serif' }}>
      
      {/* মূল স্ক্রিন কনটেন্ট */}
      <div style={{ padding: '16px', flex: 1, overflowY: 'auto' }}>
        
        {/* ১. ইনকামিং ক্যাশ ব্যানার */}
        <div style={{ width: '100%', padding: '3px', borderRadius: '16px', background: 'linear-gradient(to right, #14b8a6, #4f46e5, #f59e0b)', marginBottom: '16px', boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.3)' }}>
          <div style={{ backgroundColor: '#0f141f', borderRadius: '14px', padding: '10px 16px', textAlign: 'center', position: 'relative' }}>
            <h1 style={{ fontSize: '20px', fontWeight: 'bold', fontStyle: 'italic', fontFamily: 'Georgia, serif', background: 'linear-gradient(to right, #99f6e4, #e9d5ff, #fde68a)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', margin: 0 }}>
              Incoming Cash
            </h1>
          </div>
        </div>

        {/* গ্লোয়িং নীল ডিভাইডার লাইন */}
        <div style={{ width: '100%', height: '3px', background: 'linear-gradient(to right, transparent, #22d3ee, transparent)', borderRadius: '9999px', margin: '8px 0', boxShadow: '0 0 10px rgba(34,211,238,0.6)' }}></div>

        {/* ২. ওয়ালেট টাইটেল এবং কানেক্ট ওয়ালেট বাটন */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '12px', marginBottom: '16px' }}>
          <div>
            <h2 style={{ fontSize: '18px', fontWeight: '900', margin: 0, color: '#ffffff' }}>Airdrop Wallet</h2>
            <p style={{ fontSize: '11px', color: '#818cf8', margin: '2px 0 0 0' }}>TON & USDT Secure Network</p>
          </div>
          
          <button 
            onClick={() => setShowWalletModal(true)}
            style={{ background: 'linear-gradient(to right, #0ea5e9, #2563eb)', color: '#ffffff', padding: '6px 14px', borderRadius: '9999px', fontSize: '12px', fontWeight: 'bold', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px', boxShadow: '0 4px 12px rgba(14, 165, 233, 0.4)' }}
          >
            <span>💎</span> Connect Wallet
          </button>
        </div>

        {/* ৩. ব্যালেন্স কার্ড */}
        <div style={{ background: 'linear-gradient(to bottom right, #111827, #0f172a, #0b0f19)', border: '1px solid #1f2937', borderRadius: '16px', padding: '16px', marginBottom: '16px', boxShadow: '0 10px 25px rgba(0,0,0,0.5)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
            <span style={{ backgroundColor: '#10b981', color: '#030712', padding: '1px 6px', borderRadius: '4px', fontSize: '11px', fontWeight: '900' }}>₮</span>
            <span style={{ fontSize: '11px', color: '#9ca3af', fontWeight: '600', textTransform: 'uppercase' }}>USDT BALANCE</span>
          </div>
          
          <div style={{ fontSize: '30px', fontWeight: '900', color: '#34d399', marginBottom: '4px' }}>
            {balance.toFixed(2)} <span style={{ fontSize: '16px', color: '#e5e7eb' }}>USDT</span>
          </div>
          <div style={{ fontSize: '12px', color: '#9ca3af', marginBottom: '16px' }}>≈ ${balance.toFixed(2)} USD</div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
            <button 
              onClick={() => setActiveTab("Earn")}
              style={{ background: 'linear-gradient(to right, #10b981, #14b8a6)', color: '#030712', fontWeight: '800', padding: '10px', borderRadius: '12px', fontSize: '12px', border: 'none', cursor: 'pointer' }}
            >
              Earn More
            </button>
            <button 
              onClick={() => setShowWithdrawModal(true)}
              style={{ backgroundColor: '#1e293b', color: '#ffffff', fontWeight: '800', padding: '10px', borderRadius: '12px', fontSize: '12px', border: '1px solid #334155', cursor: 'pointer' }}
            >
              Withdraw
            </button>
          </div>
        </div>

        {/* ৪. অ্যানাউন্সমেন্ট বক্স */}
        <div style={{ backgroundColor: '#0f141f', border: '1px solid #1f2937', borderRadius: '16px', padding: '14px', textAlign: 'center', marginBottom: '16px' }}>
          <div style={{ color: '#fbbf24', fontWeight: 'bold', fontSize: '12px', marginBottom: '4px', textTransform: 'uppercase' }}>
            📢 ANNOUNCEMENT
          </div>
          <p style={{ fontSize: '11px', color: '#9ca3af', margin: 0, lineHeight: '1.5' }}>
            Complete tasks from the Earn tab to get instant USDT rewards. Minimum withdraw limit is <span style={{ color: '#34d399', fontWeight: 'bold' }}>10 USDT</span>.
          </p>
        </div>

        {/* ৫. সিক্রেট অ্যাডমিন প্যানেল ট্রিগার */}
        <div style={{ textAlign: 'center', paddingBottom: '10px' }}>
          <div style={{ fontSize: '10px', color: '#6b7280', marginBottom: '4px' }}>Airdrop v2.4.1 Secure Protocol</div>
          <div 
            onClick={() => alert("System Node Active")}
            style={{ display: 'inline-block', padding: '6px 12px', backgroundColor: '#0a0d14', border: '1px solid #111827', borderRadius: '8px', cursor: 'pointer', fontSize: '10px', color: '#9ca3af' }}
          >
            🔒 System Node: Active (Protected)
          </div>
        </div>

      </div>

      {/* TON Connect পপআপ মডাল */}
      {showWalletModal && (
        <div style={{ position: 'absolute', inset: 0, backgroundColor: 'rgba(0,0,0,0.85)', display: 'flex', alignItems: 'flex-end', justifyContent: 'center', zIndex: 50 }}>
          <div style={{ backgroundColor: '#121824', borderTop: '1px solid #1f2937', borderTopLeftRadius: '24px', borderTopRightRadius: '24px', padding: '20px', width: '100%', maxWidth: '420px', color: '#ffffff', maxHeight: '85vh', overflowY: 'auto' }}>
            
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
              <div style={{ width: '32px', height: '32px', backgroundColor: '#1f2937', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '12px' }}>❖</div>
              <button onClick={() => setShowWalletModal(false)} style={{ width: '32px', height: '32px', backgroundColor: '#1f2937', border: 'none', borderRadius: '50%', color: '#ffffff', cursor: 'pointer', fontWeight: 'bold' }}>✕</button>
            </div>

            <div style={{ textAlign: 'center', marginBottom: '20px' }}>
              <h3 style={{ fontSize: '18px', fontWeight: '900', margin: '0 0 6px 0' }}>Connect your wallet</h3>
              <p style={{ fontSize: '12px', color: '#9ca3af', margin: 0 }}>Open Wallet in Telegram or select your wallet to connect</p>
            </div>

            <button onClick={() => { alert("🚀 Opening Telegram Wallet..."); setShowWalletModal(false); }} style={{ width: '100%', backgroundColor: '#0098ea', color: '#ffffff', fontWeight: 'bold', padding: '14px', borderRadius: '16px', border: 'none', cursor: 'pointer', display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
              <span>💳 Open Wallet in Telegram</span>
              <span>✈</span>
            </button>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '12px', marginBottom: '20px' }}>
              <div onClick={() => { alert("Connecting Tonkeeper..."); setShowWalletModal(false); }} style={{ textAlign: 'center', cursor: 'pointer' }}>
                <div style={{ height: '56px', backgroundColor: '#1a2333', border: '1px solid #374151', borderRadius: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '24px' }}>💎</div>
                <span style={{ fontSize: '10px', color: '#d1d5db', display: 'block', marginTop: '6px' }}>Tonkeeper</span>
              </div>
              <div onClick={() => { alert("Connecting Gram..."); setShowWalletModal(false); }} style={{ textAlign: 'center', cursor: 'pointer' }}>
                <div style={{ height: '56px', backgroundColor: '#1a2333', border: '1px solid #374151', borderRadius: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '24px' }}>🔷</div>
                <span style={{ fontSize: '10px', color: '#d1d5db', display: 'block', marginTop: '6px' }}>Gram</span>
              </div>
              <div onClick={() => { alert("Connecting My Wallet..."); setShowWalletModal(false); }} style={{ textAlign: 'center', cursor: 'pointer' }}>
                <div style={{ height: '56px', backgroundColor: '#1a2333', border: '1px solid #374151', borderRadius: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '24px' }}>📈</div>
                <span style={{ fontSize: '10px', color: '#d1d5db', display: 'block', marginTop: '6px' }}>My Wallet</span>
              </div>
              <div onClick={() => { alert("Connecting Tonhub..."); setShowWalletModal(false); }} style={{ textAlign: 'center', cursor: 'pointer' }}>
                <div style={{ height: '56px', backgroundColor: '#1a2333', border: '1px solid #374151', borderRadius: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '24px' }}>🟣</div>
                <span style={{ fontSize: '10px', color: '#d1d5db', display: 'block', marginTop: '6px' }}>Tonhub</span>
              </div>
            </div>

          </div>
        </div>
      )}

      {/* উইথড্র পপআপ মডাল */}
      {showWithdrawModal && (
        <div style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.85)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '16px', zIndex: 50 }}>
          <div style={{ backgroundColor: '#0f172a', border: '1px solid #1f2937', borderRadius: '24px', padding: '20px', width: '100%', maxWidth: '320px', color: '#ffffff' }}>
            
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px', borderBottom: '1px solid #1f2937', paddingBottom: '10px' }}>
              <div>
                <h3 style={{ fontSize: '14px', fontWeight: 'bold', margin: 0 }}>Withdraw Cash</h3>
                <p style={{ fontSize: '10px', color: '#9ca3af', margin: 0 }}>মেথড বেছে নিন</p>
              </div>
              <button onClick={() => setShowWithdrawModal(false)} style={{ width: '28px', height: '28px', backgroundColor: '#1f2937', border: 'none', borderRadius: '50%', color: '#ffffff', cursor: 'pointer' }}>✕</button>
            </div>

            <form onSubmit={handleWithdraw} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <div>
                <label style={{ fontSize: '10px', fontWeight: 'bold', color: '#9ca3af', display: 'block', marginBottom: '4px' }}>পেমেন্ট মেথড</label>
                <select value={selectedPaymentMethod} onChange={(e) => setSelectedPaymentMethod(e.target.value)} style={{ width: '100%', backgroundColor: '#111827', border: '1px solid #374151', borderRadius: '10px', padding: '10px', fontSize: '12px', color: '#34d399' }}>
                  {paymentMethods.map(m => <option key={m} value={m}>{m}</option>)}
                </select>
              </div>

              <div>
                <label style={{ fontSize: '10px', fontWeight: 'bold', color: '#9ca3af', display: 'block', marginBottom: '4px' }}>UID / ওয়ালেট এড্রেস / নম্বর</label>
                <input type="text" placeholder="আপনার তথ্য দিন..." value={accountDetails} onChange={(e) => setAccountDetails(e.target.value)} style={{ width: '100%', backgroundColor: '#111827', border: '1px solid #374151', borderRadius: '10px', padding: '10px', fontSize: '12px', color: '#ffffff', boxSizing: 'border-box' }} />
              </div>

              <div>
                <label style={{ fontSize: '10px', fontWeight: 'bold', color: '#9ca3af', display: 'block', marginBottom: '4px' }}>পরিমাণ (USD)</label>
                <input type="number" step="any" placeholder="কমপক্ষে ১০" value={amount} onChange={(e) => setAmount(e.target.value)} style={{ width: '100%', backgroundColor: '#111827', border: '1px solid #374151', borderRadius: '10px', padding: '10px', fontSize: '12px', color: '#ffffff', boxSizing: 'border-box' }} />
              </div>

              <button type="submit" style={{ width: '100%', background: 'linear-gradient(to right, #2563eb, #4f46e5)', color: '#ffffff', fontWeight: 'bold', padding: '12px', borderRadius: '10px', border: 'none', cursor: 'pointer', marginTop: '6px' }}>
                Confirm Withdraw
              </button>
            </form>

          </div>
        </div>
      )}

      {/* বটম নেভিগেশন বার */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', backgroundColor: '#0c1017', padding: '8px 4px', borderTop: '1px solid #1f2937', width: '100%' }}>
        <div onClick={() => setActiveTab("Exchange")} style={{ textAlign: 'center', cursor: 'pointer', color: activeTab === "Exchange" ? '#fbbf24' : '#6b7280' }}>
          <div style={{ fontSize: '16px' }}>🟡</div>
          <div style={{ fontSize: '9px', fontWeight: 'bold' }}>Exchange</div>
        </div>
        <div onClick={() => setActiveTab("Mine")} style={{ textAlign: 'center', cursor: 'pointer', color: activeTab === "Mine" ? '#fbbf24' : '#6b7280' }}>
          <div style={{ fontSize: '16px' }}>⛏️</div>
          <div style={{ fontSize: '9px', fontWeight: 'bold' }}>Mine</div>
        </div>
        <div onClick={() => setActiveTab("Friends")} style={{ textAlign: 'center', cursor: 'pointer', color: activeTab === "Friends" ? '#fbbf24' : '#6b7280' }}>
          <div style={{ fontSize: '16px' }}>👥</div>
          <div style={{ fontSize: '9px', fontWeight: 'bold' }}>Friends</div>
        </div>
        <div onClick={() => setActiveTab("Earn")} style={{ textAlign: 'center', cursor: 'pointer', color: activeTab === "Earn" ? '#fbbf24' : '#6b7280' }}>
          <div style={{ fontSize: '16px' }}>💰</div>
          <div style={{ fontSize: '9px', fontWeight: 'bold' }}>Earn</div>
        </div>
        <div onClick={() => setActiveTab("Airdrop")} style={{ textAlign: 'center', cursor: 'pointer', color: activeTab === "Airdrop" ? '#fbbf24' : '#6b7280' }}>
          <div style={{ fontSize: '16px' }}>🪙</div>
          <div style={{ fontSize: '9px', fontWeight: 'bold' }}>Airdrop</div>
        </div>
      </div>

    </div>
  );
}
