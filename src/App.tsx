import React, { useEffect, useState } from "react";

type Tab = "Exchange" | "Mine" | "Friends" | "Earn" | "Airdrop";

interface WithdrawRequest {
  id: string;
  method: string;
  account: string;
  amount: number;
  time: string;
  status: "Pending" | "Approved" | "Rejected";
}

interface UserActivity {
  id: string;
  action: string;
  time: string;
}

const PAYMENT_METHODS = [
  "বিকাশ (bKash)",
  "নগদ (Nagad)",
  "রকেট (Rocket)",
  "উপায় (Upay)",
  "USDT (TRC20 / TON)",
  "Binance Pay",
];

const ADMIN_PASSCODE = "1234"; // আপনার গোপন এডমিন পাসওয়ার্ড

export default function App() {
  const [activeTab, setActiveTab] = useState<Tab>("Airdrop");

  // ব্যালেন্স স্টেট
  const [balance, setBalance] = useState<number>(() => {
    if (typeof window === "undefined") return 124.76;
    const saved = localStorage.getItem("demo_airdrop_balance");
    return saved !== null ? Number(saved) : 124.76;
  });

  // মডাল ও প্যানেল স্টেট
  const [showWithdraw, setShowWithdraw] = useState(false);
  const [showWallet, setShowWallet] = useState(false);
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [inputPassword, setInputPassword] = useState("");
  const [showAdminPanel, setShowAdminPanel] = useState(false);

  // উইথড্র ফর্ম স্টেট
  const [amount, setAmount] = useState("");
  const [accountDetails, setAccountDetails] = useState("");
  const [paymentMethod, setPaymentMethod] = useState(PAYMENT_METHODS[0]);

  // গ্লোবাল অ্যানাউন্সমেন্ট স্টেট
  const [announcementText, setAnnouncementText] = useState(
    "Complete tasks from the Earn tab to get instant USDT rewards. Minimum withdraw limit is 10 USDT."
  );
  const [tempAnnouncement, setTempAnnouncement] = useState(announcementText);

  // উইথড্র রিকোয়েস্ট লিস্ট
  const [withdrawRequests, setWithdrawRequests] = useState<WithdrawRequest[]>(() => {
    if (typeof window === "undefined") return [];
    const saved = localStorage.getItem("admin_withdraw_requests");
    if (saved) {
      try { return JSON.parse(saved); } catch { return []; }
    }
    return [
      { id: "REQ-1001", method: "বিকাশ (bKash)", account: "01712345678", amount: 15.0, time: "10 mins ago", status: "Pending" },
    ];
  });

  // লাইভ ইউজার অ্যাক্টিভিটি ও পেজ ট্রাফিক লগ
  const [activities, setActivities] = useState<UserActivity[]>([
    { id: "1", action: "User opened Airdrop Tab", time: "Just now" },
    { id: "2", action: "System started successfully", time: "1m ago" },
  ]);

  const [pageViews, setPageViews] = useState({
    Airdrop: 45,
    Earn: 12,
    Mine: 8,
    Friends: 5,
    Exchange: 10,
  });

  useEffect(() => {
    localStorage.setItem("demo_airdrop_balance", balance.toFixed(2));
  }, [balance]);

  useEffect(() => {
    localStorage.setItem("admin_withdraw_requests", JSON.stringify(withdrawRequests));
  }, [withdrawRequests]);

  // ট্যাব পরিবর্তনের সময় ট্রাফিক কাউন্ট ও লগ আপডেট
  const handleTabChange = (tab: Tab) => {
    setActiveTab(tab);
    setPageViews((prev) => ({ ...prev, [tab]: prev[tab] + 1 }));
    setActivities((prev) => [
      { id: Date.now().toString(), action: `Mapsd to ${tab} Section`, time: "Just now" },
      ...prev.slice(0, 9),
    ]);
  };

  const handleIncomingCashClick = () => {
    setShowPasswordModal(true);
    setInputPassword("");
  };

  const handlePasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputPassword === ADMIN_PASSCODE) {
      setShowPasswordModal(false);
      setShowAdminPanel(true);
      setActivities((prev) => [
        { id: Date.now().toString(), action: "Admin logged into Control Panel", time: "Just now" },
        ...prev,
      ]);
    } else {
      alert("❌ ভুল পাসওয়ার্ড!");
      setInputPassword("");
    }
  };

  const handleWithdraw = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const withdrawAmount = Number(amount);

    if (!Number.isFinite(withdrawAmount) || withdrawAmount <= 0) {
      alert("⚠️ সঠিক অ্যামাউন্ট লিখুন।");
      return;
    }
    if (withdrawAmount < 10) {
      alert("❌ মিনিমাম উইথড্র ১০ USDT।");
      return;
    }
    if (withdrawAmount > balance) {
      alert("❌ পর্যাপ্ত ব্যালেন্স নেই।");
      return;
    }
    if (!accountDetails.trim()) {
      alert("⚠️ অ্যাকাউন্ট নম্বর দিন।");
      return;
    }

    setBalance((prev) => Number((prev - withdrawAmount).toFixed(2)));

    const newReq: WithdrawRequest = {
      id: "REQ-" + Math.floor(1000 + Math.random() * 9000),
      method: paymentMethod,
      account: accountDetails,
      amount: withdrawAmount,
      time: "Just now",
      status: "Pending",
    };

    setWithdrawRequests([newReq, ...withdrawRequests]);
    setActivities((prev) => [
      { id: Date.now().toString(), action: `New Withdraw Request of ${withdrawAmount} USDT`, time: "Just now" },
      ...prev,
    ]);

    alert("✅ উইথড্র রিকোয়েস্ট সফল হয়েছে!");
    setShowWithdraw(false);
    setAmount("");
    setAccountDetails("");
  };

  const handleApprove = (id: string) => {
    setWithdrawRequests(
      withdrawRequests.map((req) => (req.id === id ? { ...req, status: "Approved" } : req))
    );
  };

  const handleReject = (id: string, reqAmount: number) => {
    setWithdrawRequests(
      withdrawRequests.map((req) => (req.id === id ? { ...req, status: "Rejected" } : req))
    );
    setBalance((prev) => Number((prev + reqAmount).toFixed(2)));
    alert(`❌ রিকোয়েস্ট রিজেক্ট করা হয়েছে এবং ${reqAmount} USDT রিফান্ড করা হয়েছে।`);
  };

  const handleUpdateAnnouncement = (e: React.FormEvent) => {
    e.preventDefault();
    setAnnouncementText(tempAnnouncement);
    alert("✅ গ্লোবাল অ্যানাউন্সমেন্ট সফলভাবে আপডেট করা হয়েছে!");
  };

  const pendingCount = withdrawRequests.filter((r) => r.status === "Pending").length;
  const totalPageVisits = Object.values(pageViews).reduce((a, b) => a + b, 0);

  return (
    <div className="wallet-app">
      <main className="main-content">
        {/* টপ উইথড্রয়াল ও এডমিন ট্রিগার */}
        <div className="top-banner-row">
          <div className="withdrawals-badge" onClick={handleIncomingCashClick}>
            📌 Withdrawals: {pendingCount} | 🛡️ Admin Control
          </div>
        </div>

        <section className="incoming-card" onClick={handleIncomingCashClick}>
          <div className="incoming-inner">
            <h1>Incoming Cash</h1>
            <div className="connected-indicator">
              <span className="dot"></span> Connected
            </div>
          </div>
        </section>

        <section className="wallet-header">
          <div>
            <h2>My Wallet</h2>
            <p>TON &amp; USDT Secure Network</p>
          </div>
          <button className="connect-button" onClick={() => setShowWallet(true)}>
            <span className="ton-icon">◇</span>
            Connect Wallet
          </button>
        </section>

        {/* সিঙ্গেল পেজ ট্যাব কনটেন্ট (কোনো ব্যাক পেজ রিলোড ছাড়াই কাজ করবে) */}
        {activeTab === "Airdrop" && (
          <>
            <section className="balance-card">
              <div className="balance-label">
                <span className="usdt-symbol">₮</span>
                <span>USDT BALANCE</span>
              </div>
              <div className="balance-number">{balance.toFixed(2)}<span> USDT</span></div>
              <div className="usd-value">≈ ${balance.toFixed(2)} USD</div>
              <div className="balance-actions">
                <button className="earn-button" onClick={() => handleTabChange("Earn")}>Earn More</button>
                <button className="withdraw-button" onClick={() => setShowWithdraw(true)}>Withdraw</button>
              </div>
            </section>

            <section className="announcement">
              <div className="announcement-title">📢 ANNOUNCEMENT</div>
              <p>{announcementText}</p>
            </section>
          </>
        )}

        {activeTab === "Earn" && (
          <section className="page-card">
            <div className="page-icon">🪙</div>
            <h3>Earn Section</h3>
            <p>টাস্ক এবং রিওয়ার্ড সেকশন। এখানে টাস্ক কমপ্লিট করে ইনস্ট্যান্ট কয়েন আর্ন করুন।</p>
          </section>
        )}

        {activeTab === "Mine" && (
          <section className="page-card">
            <div className="page-icon">⛏️</div>
            <h3>Mine Section</h3>
            <p>মাইনিং ড্যাশবোর্ড ইন্টারফেস। এখান থেকে আপনার মাইনিং স্পিড মনিটর করুন।</p>
          </section>
        )}

        {activeTab === "Friends" && (
          <section className="page-card">
            <div className="page-icon">👥</div>
            <h3>Friends Section</h3>
            <p>রেফারেল সিস্টেম সেকশন। বন্ধুদের ইনভাইট করে স্পেশাল বোনাস নিন।</p>
          </section>
        )}

        {activeTab === "Exchange" && (
          <section className="page-card">
            <div className="page-icon">🔄</div>
            <h3>Exchange Section</h3>
            <p>এক্সচেঞ্জ সেকশন ইন্টারফেস। টোকেন এক্সচেঞ্জ করুন নিরাপদ নেটওয়ার্কে।</p>
          </section>
        )}

        <section className="protocol">
          <div>Airdrop v2.5.0 Secure Protocol</div>
        </section>
      </main>

      {/* নিচের ফিক্সড স্মুথ নেভবার */}
      <nav className="bottom-nav">
        <div className={`nav-item ${activeTab === "Exchange" ? "active" : ""}`} onClick={() => handleTabChange("Exchange")}>
          <div className="nav-icon">🔶</div>
          <div className="nav-label">Exchange</div>
        </div>
        <div className={`nav-item ${activeTab === "Mine" ? "active" : ""}`} onClick={() => handleTabChange("Mine")}>
          <div className="nav-icon">⛏</div>
          <div className="nav-label">Mine</div>
        </div>
        <div className={`nav-item ${activeTab === "Friends" ? "active" : ""}`} onClick={() => handleTabChange("Friends")}>
          <div className="nav-icon">👥</div>
          <div className="nav-label">Friends</div>
        </div>
        <div className={`nav-item ${activeTab === "Earn" ? "active" : ""}`} onClick={() => handleTabChange("Earn")}>
          <div className="nav-icon">🪙</div>
          <div className="nav-label">Earn</div>
        </div>
        <div className={`nav-item ${activeTab === "Airdrop" ? "active" : ""}`} onClick={() => handleTabChange("Airdrop")}>
          <div className="nav-icon">🟡</div>
          <div className="nav-label">Airdrop</div>
        </div>
      </nav>

      {/* পাসওয়ার্ড মোডাল */}
      {showPasswordModal && (
        <div className="modal-overlay center" onClick={() => setShowPasswordModal(false)}>
          <div className="withdraw-modal" onClick={(e) => e.stopPropagation()}>
            <div className="withdraw-header">
              <div>
                <h3>🔒 Admin Passcode</h3>
                <p>Enter security code to access panel</p>
              </div>
              <button className="close-button" onClick={() => setShowPasswordModal(false)}>×</button>
            </div>
            <form onSubmit={handlePasswordSubmit} className="withdraw-form" style={{ marginTop: "15px" }}>
              <label>
                Passcode (Default: 1234)
                <input
                  type="password"
                  value={inputPassword}
                  onChange={(e) => setInputPassword(e.target.value)}
                  placeholder="পাসওয়ার্ড লিখুন..."
                  autoFocus
                />
              </label>
              <button type="submit" className="confirm-button">Verify &amp; Open</button>
            </form>
          </div>
        </div>
      )}

      {/* প্রিমিয়াম ফুল-ফিচারড এডমিন কন্ট্রোল ড্যাশবোর্ড প্যানেল */}
      {showAdminPanel && (
        <div className="modal-overlay center" onClick={() => setShowAdminPanel(false)}>
          <div className="admin-modal" onClick={(e) => e.stopPropagation()}>
            <div className="admin-header">
              <div>
                <h3>🛡️ Master Admin Dashboard</h3>
                <p>Live analytics, requests &amp; global controls</p>
              </div>
              <button className="close-button" onClick={() => setShowAdminPanel(false)}>×</button>
            </div>

            {/* স্ট্যাটিস্টিক্স গ্রিড */}
            <div className="admin-stats-grid">
              <div className="stat-box">
                <span>Total Page Visits</span>
                <strong>{totalPageVisits}</strong>
              </div>
              <div className="stat-box">
                <span>Pending Withdraws</span>
                <strong>{pendingCount}</strong>
              </div>
            </div>

            {/* পেজ ট্রাফিক অ্যানালিটিক্স বার */}
            <h4 className="section-title">📊 Page Traffic Analytics</h4>
            <div className="traffic-stats">
              {Object.entries(pageViews).map(([pageName, count]) => (
                <div key={pageName} className="traffic-row">
                  <span>{pageName}</span>
                  <strong>{count} hits</strong>
                </div>
              ))}
            </div>

            {/* গ্লোবাল অ্যানাউন্সমেন্ট কন্ট্রোল */}
            <h4 className="section-title">📢 Update Global Announcement</h4>
            <form onSubmit={handleUpdateAnnouncement} style={{ marginBottom: "15px" }}>
              <textarea
                value={tempAnnouncement}
                onChange={(e) => setTempAnnouncement(e.target.value)}
                style={{ width: "100%", padding: "10px", borderRadius: "10px", background: "#111827", color: "#fff", border: "1px solid #374151", fontSize: "12px", minHeight: "60px" }}
              />
              <button type="submit" className="confirm-button" style={{ marginTop: "8px", padding: "10px" }}>
                Update Announcement
              </button>
            </form>

            {/* উইথড্র রিকোয়েস্ট লিস্ট */}
            <h4 className="section-title">💸 Withdrawal Requests & Auto-Refund</h4>
            <div className="requests-list">
              {withdrawRequests.length === 0 ? (
                <p className="no-req">কোনো রিকোয়েস্ট নেই।</p>
              ) : (
                withdrawRequests.map((req) => (
                  <div key={req.id} className={`req-card ${req.status.toLowerCase()}`}>
                    <div className="req-info">
                      <strong>{req.id}</strong> — {req.amount} USDT
                      <br />
                      <small>{req.method} | <code>{req.account}</code></small>
                      <br />
                      <span className={`status-badge ${req.status.toLowerCase()}`}>{req.status}</span>
                    </div>

                    {req.status === "Pending" && (
                      <div className="req-actions">
                        <button className="approve-btn" onClick={() => handleApprove(req.id)}>Approve</button>
                        <button className="reject-btn" onClick={() => handleReject(req.id, req.amount)}>Reject</button>
                      </div>
                    )}
                  </div>
                ))
              )}
            </div>

            {/* লাইভ ইউজার অ্যাক্টিভিটি লগ */}
            <h4 className="section-title">⚡ Live User Activity Logs</h4>
            <div className="activity-list">
              {activities.map((act) => (
                <div key={act.id} className="activity-item">
                  <span>{act.action}</span>
                  <small>{act.time}</small>
                </div>
              ))}
            </div>

            <button className="confirm-button" style={{ marginTop: "15px" }} onClick={() => setShowAdminPanel(false)}>
              Close Panel
            </button>
          </div>
        </div>
      )}

      {/* ওয়ালেট মোডাল */}
      {showWallet && (
        <div className="modal-overlay" onClick={() => setShowWallet(false)}>
          <div className="wallet-modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-top">
              <div className="modal-logo">◇</div>
              <button className="close-button" onClick={() => setShowWallet(false)}>×</button>
            </div>
            <div className="modal-title">
              <h3>Connect your wallet</h3>
              <p>Demo wallet connection interface</p>
            </div>
            <div className="wallet-grid">
              <div className="wallet-option" onClick={() => alert("Tonkeeper connected.")}>
                <div className="wallet-option-icon">💎</div>
                <span className="wallet-option-name">Tonkeeper</span>
              </div>
              <div className="wallet-option" onClick={() => alert("MyTonWallet connected.")}>
                <div className="wallet-option-icon">🔷</div>
                <span className="wallet-option-name">MyTonWallet</span>
              </div>
              <div className="wallet-option" onClick={() => alert("Wallet connected.")}>
                <div className="wallet-option-icon">📈</div>
                <span className="wallet-option-name">Wallet</span>
              </div>
              <div className="wallet-option" onClick={() => alert("Tonhub connected.")}>
                <div className="wallet-option-icon">🟣</div>
                <span className="wallet-option-name">Tonhub</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* উইথড্র মোডাল */}
      {showWithdraw && (
        <div className="modal-overlay center" onClick={() => setShowWithdraw(false)}>
          <div className="withdraw-modal" onClick={(e) => e.stopPropagation()}>
            <div className="withdraw-header">
              <div>
                <h3>Withdraw Cash</h3>
                <p>Request payout</p>
              </div>
              <button className="close-button" onClick={() => setShowWithdraw(false)}>×</button>
            </div>
            <div className="available-balance">
              Available Balance
              <strong>{balance.toFixed(2)} USDT</strong>
            </div>
            <form onSubmit={handleWithdraw} className="withdraw-form">
              <label>
                Payment Method
                <select value={paymentMethod} onChange={(e) => setPaymentMethod(e.target.value)}>
                  {PAYMENT_METHODS.map((method) => (
                    <option key={method} value={method}>{method}</option>
                  ))}
                </select>
              </label>
              <label>
                UID / Wallet / Number
                <input
                  type="text"
                  value={accountDetails}
                  onChange={(e) => setAccountDetails(e.target.value)}
                  placeholder="নম্বর বা ওয়ালেট দিন..."
                />
              </label>
              <label>
                Amount (USDT)
                <input
                  type="number"
                  min="10"
                  step="0.01"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  placeholder="কমপক্ষে ১০"
                />
              </label>
              <button type="submit" className="confirm-button">Confirm Withdraw</button>
            </form>
          </div>
        </div>
      )}

      <style>{`
        * { box-sizing: border-box; }
        body { margin: 0; background: #020407; font-family: Arial, Helvetica, sans-serif; }
        .wallet-app { width: 100%; max-width: 420px; min-height: 100vh; margin: 0 auto; color: #fff; background: radial-gradient(circle at top, #101827 0%, #07090e 35%, #04060a 100%); position: relative; display: flex; flex-direction: column; }
        .main-content { flex: 1; padding: 16px 16px 115px; overflow-x: hidden; }
        
        .top-banner-row { display: flex; justify-content: flex-start; margin-bottom: 8px; }
        .withdrawals-badge { background: #131d2e; border: 1px solid #253650; padding: 5px 12px; border-radius: 20px; font-size: 11px; color: #38bdf8; font-weight: 800; cursor: pointer; display: inline-flex; align-items: center; gap: 5px; }

        .incoming-card { width: 100%; padding: 3px; border-radius: 19px; background: linear-gradient(90deg, #f59e0b, #9b4fe7, #386ce8, #11c7b7); box-shadow: 0 8px 25px rgba(0,0,0,.4); cursor: pointer; margin-bottom: 17px; }
        .incoming-inner { height: 75px; display: flex; align-items: center; justify-content: space-between; padding: 0 20px; border-radius: 16px; background: linear-gradient(110deg, #071c27, #171729, #30251e); }
        .incoming-inner h1 { margin: 0; font-family: Georgia, serif; font-style: italic; font-size: 21px; font-weight: 700; background: linear-gradient(90deg, #ffe6a1, #e6c8ff, #73e6d8); -webkit-background-clip: text; background-clip: text; color: transparent; }
        
        .connected-indicator { display: flex; align-items: center; gap: 6px; font-size: 12px; color: #34d399; font-weight: bold; background: rgba(16, 185, 129, 0.1); padding: 5px 10px; border-radius: 20px; border: 1px solid rgba(16, 185, 129, 0.2); }
        .dot { width: 7px; height: 7px; background: #34d399; border-radius: 50%; box-shadow: 0 0 8px #34d399; }

        .wallet-header { display: flex; align-items: center; justify-content: space-between; gap: 10px; margin-bottom: 17px; }
        .wallet-header h2 { margin: 0; font-size: 27px; font-weight: 900; }
        .wallet-header p { margin: 4px 0 0; color: #858cff; font-size: 13px; font-weight: 600; }
        .connect-button { border: 0; border-radius: 25px; padding: 12px 14px; color: #fff; font-size: 12px; font-weight: 800; cursor: pointer; background: linear-gradient(90deg, #0ea5e9, #2563eb); }
        .ton-icon { margin-right: 5px; font-size: 15px; }
        
        .balance-card { padding: 19px; border: 1px solid #202c3d; border-radius: 23px; background: linear-gradient(145deg, #111a2b, #0d1422, #080d17); margin-bottom: 17px; }
        .balance-label { display: flex; align-items: center; gap: 9px; color: #a7afbd; font-size: 14px; font-weight: 800; margin-bottom: 13px; }
        .usdt-symbol { width: 30px; height: 30px; display: flex; align-items: center; justify-content: center; border-radius: 9px; background: #10b981; color: #00150e; font-weight: 900; }
        .balance-number { color: #38e0a5; font-size: 47px; line-height: 1; font-weight: 900; }
        .balance-number span { color: #f0f2f5; font-size: 22px; }
        .usd-value { margin-top: 9px; margin-bottom: 21px; color: #9aa3b1; font-size: 15px; }
        .balance-actions { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; }
        .earn-button, .withdraw-button { min-height: 50px; border-radius: 15px; border: 0; font-size: 15px; font-weight: 900; cursor: pointer; }
        .earn-button { color: #00150e; background: linear-gradient(90deg, #10c58c, #19c8a4); }
        .withdraw-button { color: #fff; background: #202b3e; border: 1px solid #39465b; }
        
        .announcement { padding: 20px 18px; text-align: center; border-radius: 21px; border: 1px solid #202b3c; background: #0d131e; margin-bottom: 22px; }
        .announcement-title { margin-bottom: 10px; color: #fbbf24; font-size: 16px; font-weight: 900; }
        .announcement p { margin: 0; color: #a0a8b7; font-size: 13px; line-height: 1.7; }
        .protocol { text-align: center; color: #5d687a; font-size: 12px; padding-top: 3px; }
        
        .bottom-nav { position: fixed; left: 50%; bottom: 10px; transform: translateX(-50%); width: calc(100% - 24px); max-width: 396px; padding: 11px 7px; display: grid; grid-template-columns: repeat(5, 1fr); gap: 3px; border: 1px solid #354254; border-radius: 31px; background: linear-gradient(180deg, #252d39, #1b222d); z-index: 40; }
        .nav-item { min-height: 64px; display: flex; flex-direction: column; align-items: center; justify-content: center; border-radius: 20px; color: #737d8c; cursor: pointer; }
        .nav-item.active { color: #fff; background: rgba(255,255,255,.045); }
        .nav-icon { height: 29px; display: flex; align-items: center; font-size: 22px; }
        .nav-label { margin-top: 4px; font-size: 11px; font-weight: 800; }
        
        .page-card { padding: 35px 20px; text-align: center; border-radius: 23px; border: 1px solid #202b3b; background: linear-gradient(145deg, #111827, #0a101b); margin-bottom: 22px; }
        .page-card .page-icon { font-size: 45px; margin-bottom: 12px; }
        .page-card h3 { margin: 0 0 8px; font-size: 23px; }
        .page-card p { margin: 0; color: #9ca3af; font-size: 13px; line-height: 1.6; }
        
        .admin-modal { width: 100%; max-width: 400px; max-height: 88vh; overflow-y: auto; padding: 20px; border: 1px solid #3b82f6; border-radius: 24px; background: #090d16; color: #fff; }
        .admin-header { display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid #1e293b; padding-bottom: 10px; margin-bottom: 15px; }
        .admin-header h3 { margin: 0; font-size: 17px; color: #60a5fa; }
        .admin-header p { margin: 3px 0 0; font-size: 11px; color: #94a3b8; }
        .admin-stats-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 10px; margin-bottom: 15px; }
        .stat-box { background: #111c2e; border: 1px solid #1e293b; padding: 12px; border-radius: 12px; text-align: center; }
        .stat-box span { display: block; font-size: 11px; color: #94a3b8; margin-bottom: 5px; }
        .stat-box strong { font-size: 20px; color: #34d399; }
        .section-title { font-size: 13px; color: #cbd5e1; margin: 15px 0 10px; border-left: 3px solid #3b82f6; padding-left: 6px; }
        
        .traffic-stats { display: grid; grid-template-columns: 1fr 1fr; gap: 8px; margin-bottom: 15px; }
        .traffic-row { background: #111827; border: 1px solid #1f2937; padding: 8px 12px; border-radius: 8px; display: flex; justify-content: space-between; font-size: 11px; color: #94a3b8; }
        .traffic-row strong { color: #38bdf8; }

        .requests-list { display: flex; flex-direction: column; gap: 10px; max-height: 200px; overflow-y: auto; margin-bottom: 15px; }
        .no-req { text-align: center; color: #64748b; font-size: 12px; padding: 15px; }
        .req-card { background: #111827; border: 1px solid #1f2937; padding: 10px; border-radius: 10px; display: flex; justify-content: space-between; align-items: center; gap: 8px; }
        .req-info { font-size: 11px; color: #e2e8f0; word-break: break-all; }
        .req-info small { color: #94a3b8; }
        .status-badge { display: inline-block; padding: 2px 6px; border-radius: 6px; font-size: 9px; font-weight: bold; margin-top: 4px; }
        .status-badge.pending { background: #fef08a; color: #854d0e; }
        .status-badge.approved { background: #bbf7d0; color: #166534; }
        .status-badge.rejected { background: #fecaca; color: #991b1b; }
        .req-actions { display: flex; flex-direction: column; gap: 4px; flex-shrink: 0; }
        .approve-btn { background: #10b981; color: #fff; border: 0; padding: 5px 8px; border-radius: 6px; font-size: 10px; font-weight: bold; cursor: pointer; }
        .reject-btn { background: #ef4444; color: #fff; border: 0; padding: 5px 8px; border-radius: 6px; font-size: 10px; font-weight: bold; cursor: pointer; }
        
        .activity-list { display: flex; flex-direction: column; gap: 6px; max-height: 130px; overflow-y: auto; background: #111827; padding: 10px; border-radius: 10px; border: 1px solid #1f2937; }
        .activity-item { display: flex; justify-content: space-between; font-size: 11px; color: #cbd5e1; border-bottom: 1px solid #1f2937; padding-bottom: 4px; }
        .activity-item small { color: #64748b; }

        .modal-overlay { position: fixed; inset: 0; z-index: 100; display: flex; align-items: flex-end; justify-content: center; background: rgba(0,0,0,.82); backdrop-filter: blur(5px); }
        .modal-overlay.center { align-items: center; padding: 16px; }
        .wallet-modal { width: 100%; max-width: 420px; padding: 22px; border-radius: 27px 27px 0 0; background: #131b29; border-top: 1px solid #263246; }
        .withdraw-modal { width: 100%; max-width: 360px; padding: 21px; border: 1px solid #263246; border-radius: 24px; background: #0d1522; }
        .modal-top, .withdraw-header { display: flex; align-items: center; justify-content: space-between; }
        .modal-logo { width: 35px; height: 35px; display: flex; align-items: center; justify-content: center; border-radius: 50%; background: #202b3b; color: #5eead4; font-size: 20px; }
        .close-button {-webkit-appearance: none; width: 34px; height: 34px; border: 0; border-radius: 50%; background: #202a39; color: #fff; font-size: 19px; cursor: pointer; display: flex; align-items: center; justify-content: center; }
        .modal-title { text-align: center; margin: 22px 0; }
        .modal-title h3 { margin: 0 0 7px; font-size: 21px; }
        .modal-title p { margin: 0; color: #929cac; font-size: 12px; }
        .wallet-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 10px; }
        .wallet-option { text-align: center; cursor: pointer; }
        .wallet-option-icon { height: 61px; display: flex; align-items: center; justify-content: center; border-radius: 16px; border: 1px solid #344156; background: #182232; font-size: 25px; }
        .wallet-option-name { display: block; margin-top: 7px; color: #c9d0db; font-size: 10px; font-weight: 700; }
        
        .withdraw-header { padding-bottom: 13px; margin-bottom: 15px; border-bottom: 1px solid #202b3a; }
        .withdraw-header h3 { margin: 0; font-size: 17px; }
        .withdraw-header p { margin: 4px 0 0; color: #7e899b; font-size: 10px; }
        .available-balance { display: flex; justify-content: space-between; align-items: center; padding: 12px; border-radius: 12px; background: #111b2a; color: #8d98a9; font-size: 11px; margin-bottom: 15px; }
        .available-balance strong { color: #36dda5; }
        .withdraw-form { display: flex; flex-direction: column; gap: 13px; }
        .withdraw-form label { display: block; color: #a4adbb; font-size: 11px; font-weight: 800; }
        .withdraw-form input, .withdraw-form select { width: 100%; margin-top: 6px; padding: 12px; border: 1px solid #344054; border-radius: 11px; background: #111927; color: #fff; font-size: 12px; }
        .confirm-button { margin-top: 4px; width: 100%; padding: 13px; border: 0; border-radius: 12px; color: #fff; background: linear-gradient(90deg, #2563eb, #4f46e5); font-size: 13px; font-weight: 900; cursor: pointer; }
      `}</style>
    </div>
  );
}
