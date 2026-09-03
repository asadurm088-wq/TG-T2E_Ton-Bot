import React, { useState, useEffect } from 'react';

export function AirDrop() {
  const [balance, setBalance] = useState<number>(124.76);
  const [withdrawAmount, setWithdrawAmount] = useState<string>('');
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<string>('USDT');
  const [accountDetails, setAccountDetails] = useState<string>('');

  const handleWithdraw = (e: React.FormEvent) => {
    e.preventDefault();
    const amountNum = parseFloat(withdrawAmount);

    if (isNaN(amountNum) || amountNum < 10) {
      alert('ন্যূনতম উইথড্র পরিমাণ ১০ USDT বা তার বেশি হতে হবে!');
      return;
    }

    if (amountNum > balance) {
      alert('আপনার পর্যাপ্ত ব্যালেন্স নেই!');
      return;
    }

    if (!accountDetails) {
      alert('দয়া করে আপনার ওয়ালেট বা অ্যাকাউন্ট নম্বর দিন!');
      return;
    }

    // উইথড্র রিকোয়েস্ট লোকাল স্টোরেজে সেভ করার লজিক
    const existingRequests = JSON.parse(localStorage.getItem('withdraw_requests') || '[]');
    const newRequest = {
      user: accountDetails,
      amount: `${amountNum} USDT (${selectedPaymentMethod})`,
      status: 'Pending'
    };
    existingRequests.push(newRequest);
    localStorage.setItem('withdraw_requests', JSON.stringify(existingRequests));

    // ব্যালেন্স আপডেট করা
    setBalance(balance - amountNum);
    setWithdrawAmount('');
    setAccountDetails('');
    alert('উইথড্র রিকোয়েস্ট সফলভাবে জমা হয়েছে!');
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'sans-serif', maxWidth: '500px', margin: '0 auto', backgroundColor: '#0f172a', minHeight: '100vh', color: '#ffffff', boxSizing: 'border-box' }}>
      
      {/* ১. হেডার */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <h2 style={{ fontSize: '20px', margin: 0 }}>Airdrop Wallet</h2>
        <button style={{ backgroundColor: '#0284c7', color: 'white', border: 'none', padding: '8px 14px', borderRadius: '8px', cursor: 'pointer', fontSize: '12px', fontWeight: 'bold' }}>
          Connect Wallet
        </button>
      </div>

      {/* ২. ব্যালেন্স কার্ড */}
      <div style={{ backgroundColor: '#1e293b', padding: '20px', borderRadius: '12px', border: '1px solid #334155', marginBottom: '20px', textAlign: 'center' }}>
        <p style={{ color: '#94a3b8', fontSize: '12px', margin: '0 0 5px 0' }}>USDT BALANCE</p>
        <h1 style={{ fontSize: '32px', color: '#34d399', margin: '0 0 5px 0' }}>{balance.toFixed(2)} USDT</h1>
        <p style={{ color: '#64748b', fontSize: '11px', margin: 0 }}>≈ ${balance.toFixed(2)} USD</p>
      </div>

      {/* ৩. উইথড্র ফর্ম */}
      <form onSubmit={handleWithdraw} style={{ backgroundColor: '#1e293b', padding: '20px', borderRadius: '12px', border: '1px solid #334155', marginBottom: '20px' }}>
        <h3 style={{ fontSize: '16px', marginBottom: '15px', marginTop: 0 }}>উইথড্র রিকোয়েস্ট পাঠান</h3>
        
        <div style={{ marginBottom: '12px' }}>
          <label style={{ display: 'block', fontSize: '12px', color: '#94a3b8', marginBottom: '5px' }}>পেমেন্ট মেথড</label>
          <select 
            value={selectedPaymentMethod} 
            onChange={(e) => setSelectedPaymentMethod(e.target.value)}
            style={{ width: '100%', padding: '10px', backgroundColor: '#0f172a', border: '1px solid #475569', borderRadius: '8px', color: '#fff', boxSizing: 'border-box' }}
          >
            <option value="USDT">USDT (TRC20 / TON)</option>
            <option value="Bkash">বিকাশ (Bkash)</option>
            <option value="Nagad">নগদ (Nagad)</option>
          </select>
        </div>

        <div style={{ marginBottom: '12px' }}>
          <label style={{ display: 'block', fontSize: '12px', color: '#94a3b8', marginBottom: '5px' }}>পরিমাণ (USDT/টাকা)</label>
          <input 
            type="number" 
            placeholder="ন্যূনতম ১০" 
            value={withdrawAmount} 
            onChange={(e) => setWithdrawAmount(e.target.value)}
            style={{ width: '100%', padding: '10px', backgroundColor: '#0f172a', border: '1px solid #475569', borderRadius: '8px', color: '#fff', boxSizing: 'border-box' }}
          />
        </div>

        <div style={{ marginBottom: '15px' }}>
          <label style={{ display: 'block', fontSize: '12px', color: '#94a3b8', marginBottom: '5px' }}>ওয়ালেট অ্যাড্রেস বা নম্বর</label>
          <input 
            type="text" 
            placeholder="আপনার অ্যাকাউন্ট নম্বর দিন" 
            value={accountDetails} 
            onChange={(e) => setAccountDetails(e.target.value)}
            style={{ width: '100%', padding: '10px', backgroundColor: '#0f172a', border: '1px solid #475569', borderRadius: '8px', color: '#fff', boxSizing: 'border-box' }}
          />
        </div>

        <button type="submit" style={{ width: '100%', padding: '12px', backgroundColor: '#10b981', color: 'white', border: 'none', borderRadius: '8px', fontWeight: 'bold', cursor: 'pointer' }}>
          Withdraw Confirm
        </button>
      </form>

      {/* ৪. ঘোষণা */}
      <div style={{ backgroundColor: '#1e293b', padding: '15px', borderRadius: '12px', border: '1px solid #334155', textAlign: 'center', marginBottom: '20px' }}>
        <p style={{ fontSize: '12px', color: '#94a3b8', margin: 0, lineHeight: '1.5' }}>
          📢 Complete tasks from the Earn tab to get rewards. Minimum demo withdraw limit is <strong style={{ color: '#34d399' }}>10 USDT</strong>.
        </p>
      </div>

      {/* ৫. সিক্রেট অ্যাডমিন প্যানেল ট্রিগার বাটন (সরাসরি /admin এ নিয়ে যাবে) */}
      <div style={{ textAlign: 'center', paddingBottom: '10px', marginTop: '10px' }}>
        <div style={{ fontSize: '10px', color: '#6b7280', marginBottom: '4px' }}>Airdrop v2.4.1 Secure Protocol</div>
        <div 
          onClick={() => window.location.href = '/admin'}
          style={{ display: 'inline-block', padding: '8px 16px', backgroundColor: '#0a0d14', border: '1px solid #334155', borderRadius: '8px', cursor: 'pointer', fontSize: '11px', color: '#34d399', fontWeight: 'bold' }}
        >
          🔒 Open Admin Panel
        </div>
      </div>

    </div>
  );
}
