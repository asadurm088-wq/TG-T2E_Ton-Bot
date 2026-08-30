import React, { useEffect, useState } from "react";

type Tab = "Exchange" | "Mine" | "Friends" | "Earn" | "Airdrop";

const PAYMENT_METHODS = [
  "বিকাশ (bKash)",
  "নগদ (Nagad)",
  "রকেট (Rocket)",
  "উপায় (Upay)",
  "USDT (TRC20 / TON)",
  "Binance Pay",
  "Payeer",
  "Perfect Money",
  "Bitcoin (BTC)",
  "Bank Transfer",
];

export default function AirDrop() {
  const [activeTab, setActiveTab] = useState<Tab>("Airdrop");

  const [balance, setBalance] = useState<number>(() => {
    if (typeof window === "undefined") return 124.76;

    const saved = localStorage.getItem("demo_airdrop_balance");

    if (saved === null) return 124.76;

    const parsed = Number(saved);

    return Number.isFinite(parsed) ? parsed : 124.76;
  });

  const [showWithdraw, setShowWithdraw] = useState(false);
  const [showWallet, setShowWallet] = useState(false);

  const [amount, setAmount] = useState("");
  const [accountDetails, setAccountDetails] = useState("");
  const [paymentMethod, setPaymentMethod] = useState(
    PAYMENT_METHODS[0]
  );

  useEffect(() => {
    localStorage.setItem(
      "demo_airdrop_balance",
      balance.toFixed(2)
    );
  }, [balance]);

  const changeTab = (tab: Tab) => {
    setActiveTab(tab);
  };

  const handleWithdraw = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const withdrawAmount = Number(amount);

    if (!Number.isFinite(withdrawAmount) || withdrawAmount <= 0) {
      alert("⚠️ দয়া করে সঠিক অ্যামাউন্ট লিখুন।");
      return;
    }

    if (withdrawAmount < 10) {
      alert("❌ মিনিমাম উইথড্র লিমিট 10 USDT।");
      return;
    }

    if (withdrawAmount > balance) {
      alert("❌ পর্যাপ্ত ডেমো ব্যালেন্স নেই।");
      return;
    }

    if (!accountDetails.trim()) {
      alert("⚠️ UID / ওয়ালেট / অ্যাকাউন্ট তথ্য দিন।");
      return;
    }

    const newBalance = Number(
      (balance - withdrawAmount).toFixed(2)
    );

    setBalance(newBalance);

    alert(
      `✅ Demo withdrawal request তৈরি হয়েছে!\n\n` +
        `💳 Method: ${paymentMethod}\n` +
        `📌 Account: ${accountDetails}\n` +
        `💸 Amount: ${withdrawAmount.toFixed(2)} USDT\n` +
        `💰 Remaining: ${newBalance.toFixed(2)} USDT`
    );

    setShowWithdraw(false);
    setAmount("");
    setAccountDetails("");
  };

  const resetDemoBalance = () => {
    const confirmed = window.confirm(
      "Demo balance কি আবার 124.76 USDT করতে চান?"
    );

    if (!confirmed) return;

    setBalance(124.76);
  };

  return (
    <div className="wallet-app">

      {/* ================= HEADER CONTENT ================= */}

      <main className="main-content">

        {/* Incoming Cash */}

        <section className="incoming-card">
          <div className="incoming-inner">
            <h1>Incoming Cash</h1>
          </div>
        </section>

        {/* Glowing Divider */}

        <div className="glow-divider" />

        {/* Wallet Header */}

        <section className="wallet-header">

          <div>
            <h2>Airdrop Wallet</h2>

            <p>
              TON &amp; USDT Secure Network
            </p>
          </div>

          <button
            className="connect-button"
            onClick={() => setShowWallet(true)}
          >
            <span className="ton-icon">◇</span>
            Connect Wallet
          </button>

        </section>

        {/* ================= TAB CONTENT ================= */}

        {activeTab === "Airdrop" && (
          <AirdropContent
            balance={balance}
            onEarn={() => changeTab("Earn")}
            onWithdraw={() => setShowWithdraw(true)}
          />
        )}

        {activeTab === "Earn" && (
          <EarnContent
            onBack={() => changeTab("Airdrop")}
          />
        )}

        {activeTab === "Mine" && (
          <MineContent
            onBack={() => changeTab("Airdrop")}
          />
        )}

        {activeTab === "Friends" && (
          <FriendsContent
            onBack={() => changeTab("Airdrop")}
          />
        )}

        {activeTab === "Exchange" && (
          <ExchangeContent
            onBack={() => changeTab("Airdrop")}
          />
        )}

        {/* Demo protocol */}

        <section className="protocol">

          <div>
            Airdrop v2.4.1 Demo Protocol
          </div>

          <button
            onClick={resetDemoBalance}
            className="system-node"
          >
            🔒 System Node: Active
          </button>

        </section>

      </main>

      {/* ================= BOTTOM NAV ================= */}

      <nav className="bottom-nav">

        <NavItem
          icon="◈"
          label="Exchange"
          active={activeTab === "Exchange"}
          onClick={() => changeTab("Exchange")}
        />

        <NavItem
          icon="⛏"
          label="Mine"
          active={activeTab === "Mine"}
          onClick={() => changeTab("Mine")}
        />

        <NavItem
          icon="♟"
          label="Friends"
          active={activeTab === "Friends"}
          onClick={() => changeTab("Friends")}
        />

        <NavItem
          icon="☷"
          label="Earn"
          active={activeTab === "Earn"}
          onClick={() => changeTab("Earn")}
        />

        <NavItem
          icon="◎"
          label="Airdrop"
          active={activeTab === "Airdrop"}
          onClick={() => changeTab("Airdrop")}
        />

      </nav>

      {/* ================= WALLET MODAL ================= */}

      {showWallet && (
        <div
          className="modal-overlay"
          onClick={() => setShowWallet(false)}
        >

          <div
            className="wallet-modal"
            onClick={(e) => e.stopPropagation()}
          >

            <div className="modal-top">

              <div className="modal-logo">
                ◇
              </div>

              <button
                className="close-button"
                onClick={() => setShowWallet(false)}
              >
                ×
              </button>

            </div>

            <div className="modal-title">

              <h3>
                Connect your wallet
              </h3>

              <p>
                Demo wallet connection interface
              </p>

            </div>

            <button
              className="telegram-wallet"
              onClick={() =>
                alert(
                  "Demo mode: Telegram Wallet connection is not enabled."
                )
              }
            >
              <span>
                💳 Open Wallet in Telegram
              </span>

              <span>
                ✈
              </span>
            </button>

            <div className="wallet-grid">

              <WalletOption
                icon="💎"
                name="Tonkeeper"
              />

              <WalletOption
                icon="🔷"
                name="MyTonWallet"
              />

              <WalletOption
                icon="📈"
                name="Wallet"
              />

              <WalletOption
                icon="🟣"
                name="Tonhub"
              />

            </div>

            <div className="demo-note">
              Demo interface — no seed phrase or private key is
              requested.
            </div>

          </div>

        </div>
      )}

      {/* ================= WITHDRAW MODAL ================= */}

      {showWithdraw && (
        <div
          className="modal-overlay center"
          onClick={() => setShowWithdraw(false)}
        >

          <div
            className="withdraw-modal"
            onClick={(e) => e.stopPropagation()}
          >

            <div className="withdraw-header">

              <div>
                <h3>
                  Withdraw Cash
                </h3>

                <p>
                  Demo withdrawal form
                </p>
              </div>

              <button
                className="close-button"
                onClick={() => setShowWithdraw(false)}
              >
                ×
              </button>

            </div>

            <div className="available-balance">

              Available Balance

              <strong>
                {balance.toFixed(2)} USDT
              </strong>

            </div>

            <form
              onSubmit={handleWithdraw}
              className="withdraw-form"
            >

              <label>
                Payment Method

                <select
                  value={paymentMethod}
                  onChange={(e) =>
                    setPaymentMethod(e.target.value)
                  }
                >
                  {PAYMENT_METHODS.map((method) => (
                    <option
                      key={method}
                      value={method}
                    >
                      {method}
                    </option>
                  ))}
                </select>

              </label>

              <label>
                UID / Wallet / Number

                <input
                  type="text"
                  value={accountDetails}
                  onChange={(e) =>
                    setAccountDetails(e.target.value)
                  }
                  placeholder="আপনার তথ্য দিন..."
                />

              </label>

              <label>
                Amount (USDT)

                <input
                  type="number"
                  min="10"
                  step="0.01"
                  value={amount}
                  onChange={(e) =>
                    setAmount(e.target.value)
                  }
                  placeholder="কমপক্ষে 10"
                />

              </label>

              <button
                type="submit"
                className="confirm-button"
              >
                Confirm Demo Withdraw
              </button>

            </form>

          </div>

        </div>
      )}

      {/* ================= CSS ================= */}

      <style>{`

        * {
          box-sizing: border-box;
        }

        body {
          margin: 0;
          background: #020407;
          font-family:
            Arial,
            Helvetica,
            sans-serif;
        }

        button,
        input,
        select {
          font-family: inherit;
        }

        .wallet-app {
          width: 100%;
          max-width: 420px;
          min-height: 100vh;
          margin: 0 auto;
          color: #fff;
          background:
            radial-gradient(
              circle at top,
              #101827 0%,
              #07090e 35%,
              #04060a 100%
            );

          position: relative;

          display: flex;
          flex-direction: column;
        }

        .main-content {
          flex: 1;
          padding: 16px 16px 115px;
          overflow-x: hidden;
        }

        /* Incoming */

        .incoming-card {
          width: 100%;
          padding: 4px;
          border-radius: 19px;

          background:
            linear-gradient(
              90deg,
              #11c7b7,
              #386ce8,
              #9b4fe7,
              #f59e0b
            );

          box-shadow:
            0 8px 30px rgba(0,0,0,.45);
        }

        .incoming-inner {
          height: 110px;

          display: flex;
          align-items: center;
          justify-content: center;

          border-radius: 15px;

          background:
            linear-gradient(
              110deg,
              #071c27,
              #171729,
              #30251e
            );
        }

        .incoming-inner h1 {
          margin: 0;

          font-family: Georgia, serif;
          font-style: italic;

          font-size: 29px;
          font-weight: 700;

          background:
            linear-gradient(
              90deg,
              #73e6d8,
              #e6c8ff,
              #ffe6a1
            );

          -webkit-background-clip: text;
          background-clip: text;

          color: transparent;
        }

        /* Divider */

        .glow-divider {
          height: 7px;
          margin: 20px -12px 17px;

          background:
            linear-gradient(
              90deg,
              transparent,
              #22d3ee,
              #9eeaff,
              #22d3ee,
              transparent
            );

          box-shadow:
            0 0 14px rgba(34,211,238,.7);

          border-radius: 100px;
        }

        /* Header */

        .wallet-header {
          display: flex;
          align-items: center;
          justify-content: space-between;

          gap: 10px;

          margin-bottom: 17px;
        }

        .wallet-header h2 {
          margin: 0;

          font-size: 27px;
          font-weight: 900;
          letter-spacing: -.5px;
        }

        .wallet-header p {
          margin: 4px 0 0;

          color: #858cff;
          font-size: 13px;
          font-weight: 600;
        }

        .connect-button {
          flex-shrink: 0;

          border: 0;
          border-radius: 25px;

          padding: 12px 14px;

          color: #fff;
          font-size: 12px;
          font-weight: 800;

          cursor: pointer;

          background:
            linear-gradient(
              90deg,
              #0ea5e9,
              #2563eb
            );

          box-shadow:
            0 5px 18px rgba(14,165,233,.35);
        }

        .ton-icon {
          margin-right: 5px;
          font-size: 15px;
        }

        /* Balance */

        .balance-card {
          padding: 19px;

          border: 1px solid #202c3d;
          border-radius: 23px;

          background:
            linear-gradient(
              145deg,
              #111a2b,
              #0d1422,
              #080d17
            );

          box-shadow:
            0 14px 30px rgba(0,0,0,.42);

          margin-bottom: 17px;
        }

        .balance-label {
          display: flex;
          align-items: center;
          gap: 9px;

          color: #a7afbd;
          font-size: 14px;
          font-weight: 800;

          margin-bottom: 13px;
        }

        .usdt-symbol {
          width: 30px;
          height: 30px;

          display: flex;
          align-items: center;
          justify-content: center;

          border-radius: 9px;

          background: #10b981;
          color: #00150e;

          font-weight: 900;
        }

        .balance-number {
          color: #38e0a5;

          font-size: 47px;
          line-height: 1;

          font-weight: 900;

          letter-spacing: -1.5px;
        }

        .balance-number span {
          color: #f0f2f5;
          font-size: 22px;
          letter-spacing: 0;
        }

        .usd-value {
          margin-top: 9px;
          margin-bottom: 21px;

          color: #9aa3b1;
          font-size: 15px;
        }

        .balance-actions {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 12px;
        }

        .earn-button,
        .withdraw-button {
          min-height: 50px;

          border-radius: 15px;
          border: 0;

          font-size: 15px;
          font-weight: 900;

          cursor: pointer;
        }

        .earn-button {
          color: #00150e;

          background:
            linear-gradient(
              90deg,
              #10c58c,
              #19c8a4
            );
        }

        .withdraw-button {
          color: #fff;

          background: #202b3e;
          border: 1px solid #39465b;
        }

        /* Announcement */

        .announcement {
          padding: 20px 18px;

          text-align: center;

          border-radius: 21px;
          border: 1px solid #202b3c;

          background: #0d131e;

          margin-bottom: 22px;
        }

        .announcement-title {
          margin-bottom: 10px;

          color: #fbbf24;
          font-size: 16px;
          font-weight: 900;
        }

        .announcement p {
          margin: 0;

          color: #a0a8b7;

          font-size: 13px;
          line-height: 1.7;
        }

        .announcement strong {
          color: #35dca3;
        }

        /* Protocol */

        .protocol {
          text-align: center;
          color: #5d687a;
          font-size: 12px;

          padding-top: 3px;
        }

        .system-node {
          margin-top: 12px;

          padding: 9px 17px;

          border-radius: 12px;

          border: 1px solid #172132;

          background: #070b12;

          color: #657084;

          font-size: 11px;

          cursor: pointer;
        }

        /* Bottom nav */

        .bottom-nav {
          position: fixed;

          left: 50%;
          bottom: 10px;

          transform: translateX(-50%);

          width: calc(100% - 24px);
          max-width: 396px;

          padding: 11px 7px;

          display: grid;
          grid-template-columns:
            repeat(5, 1fr);

          gap: 3px;

          border: 1px solid #354254;
          border-radius: 31px;

          background:
            linear-gradient(
              180deg,
              #252d39,
              #1b222d
            );

          box-shadow:
            0 8px 30px rgba(0,0,0,.55);

          z-index: 40;
        }

        .nav-item {
          min-height: 64px;

          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;

          border-radius: 20px;

          color: #737d8c;

          cursor: pointer;

          transition: .2s ease;
        }

        .nav-item.active {
          color: #fff;
          background: rgba(255,255,255,.045);
        }

        .nav-icon {
          height: 29px;

          display: flex;
          align-items: center;

          font-size: 24px;
        }

        .nav-label {
          margin-top: 4px;

          font-size: 11px;
          font-weight: 800;
        }

        /* Other pages */

        .page-card {
          padding: 28px 20px;

          text-align: center;

          border-radius: 23px;

          border: 1px solid #202b3b;

          background:
            linear-gradient(
              145deg,
              #111827,
              #0a101b
            );
        }

        .page-card .page-icon {
          font-size: 45px;
          margin-bottom: 12px;
        }

        .page-card h3 {
          margin: 0 0 8px;

          font-size: 23px;
        }

        .page-card p {
          margin: 0 0 20px;

          color: #9ca3af;

          line-height: 1.6;
          font-size: 13px;
        }

        .back-button {
          border: 0;
          border-radius: 12px;

          padding: 11px 22px;

          color: #fff;

          background:
            linear-gradient(
              90deg,
              #2563eb,
              #4f46e5
            );

          font-weight: 800;

          cursor: pointer;
        }

        /* Modals */

        .modal-overlay {
          position: fixed;
          inset: 0;

          z-index: 100;

          display: flex;
          align-items: flex-end;
          justify-content: center;

          padding: 0;

          background:
            rgba(0,0,0,.82);

          backdrop-filter: blur(5px);
        }

        .modal-overlay.center {
          align-items: center;
          padding: 16px;
        }

        .wallet-modal {
          width: 100%;
          max-width: 420px;

          padding: 22px;

          border-radius: 27px 27px 0 0;

          background:
            linear-gradient(
              180deg,
              #131b29,
              #0c121d
            );

          border-top: 1px solid #263246;
        }

        .withdraw-modal {
          width: 100%;
          max-width: 360px;

          padding: 21px;

          border: 1px solid #263246;
          border-radius: 24px;

          background: #0d1522;

          box-shadow:
            0 20px 60px rgba(0,0,0,.6);
        }

        .modal-top,
        .withdraw-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
        }

        .modal-logo {
          width: 35px;
          height: 35px;

          display: flex;
          align-items: center;
          justify-content: center;

          border-radius: 50%;

          background: #202b3b;

          color: #5eead4;

          font-size: 20px;
        }

        .close-button {
          width: 34px;
          height: 34px;

          border: 0;
          border-radius: 50%;

          background: #202a39;

          color: #fff;

          font-size: 19px;

          cursor: pointer;
        }

        .modal-title {
          text-align: center;

          margin: 22px 0;
        }

        .modal-title h3 {
          margin: 0 0 7px;

          font-size: 21px;
        }

        .modal-title p {
          margin: 0;

          color: #929cac;

          font-size: 12px;
        }

        .telegram-wallet {
          width: 100%;

          display: flex;
          align-items: center;
          justify-content: space-between;

          padding: 15px 17px;

          border: 0;
          border-radius: 16px;

          color: #fff;

          background: #0798e6;

          font-weight: 800;

          cursor: pointer;

          margin-bottom: 20px;
        }

        .wallet-grid {
          display: grid;

          grid-template-columns:
            repeat(4, 1fr);

          gap: 10px;
        }

        .wallet-option {
          text-align: center;
          cursor: pointer;
        }

        .wallet-option-icon {
          height: 61px;

          display: flex;
          align-items: center;
          justify-content: center;

          border-radius: 16px;
          border: 1px solid #344156;

          background: #182232;

          font-size: 25px;
        }

        .wallet-option-name {
          display: block;

          margin-top: 7px;

          color: #c9d0db;

          font-size: 10px;
          font-weight: 700;
        }

        .demo-note {
          margin-top: 20px;

          padding: 10px;

          border-radius: 10px;

          background: #101927;

          color: #707c8f;

          text-align: center;

          font-size: 10px;
          line-height: 1.5;
        }

        /* Withdraw */

        .withdraw-header {
          padding-bottom: 13px;

          margin-bottom: 15px;

          border-bottom: 1px solid #202b3a;
        }

        .withdraw-header h3 {
          margin: 0;

          font-size: 17px;
        }

        .withdraw-header p {
          margin: 4px 0 0;

          color: #7e899b;

          font-size: 10px;
        }

        .available-balance {
          display: flex;
          justify-content: space-between;
          align-items: center;

          padding: 12px;

          border-radius: 12px;

          background: #111b2a;

          color: #8d98a9;

          font-size: 11px;

          margin-bottom: 15px;
        }

        .available-balance strong {
          color: #36dda5;
        }

        .withdraw-form {
          display: flex;
          flex-direction: column;

          gap: 13px;
        }

        .withdraw-form label {
          display: block;

          color: #a4adbb;

          font-size: 11px;
          font-weight: 800;
        }

        .withdraw-form input,
        .withdraw-form select {
          width: 100%;

          margin-top: 6px;

          padding: 12px;

          border: 1px solid #344054;
          border-radius: 11px;

          outline: none;

          background: #111927;

          color: #fff;

          font-size: 12px;
        }

        .withdraw-form input:focus,
        .withdraw-form select:focus {
          border-color: #4f46e5;
        }

        .confirm-button {
          margin-top: 4px;

          width: 100%;

          padding: 13px;

          border: 0;
          border-radius: 12px;

          color: #fff;

          background:
            linear-gradient(
              90deg,
              #2563eb,
              #4f46e5
            );

          font-size: 13px;
          font-weight: 900;

          cursor: pointer;
        }

        /* Mobile */

        @media (max-width: 380px) {

          .main-content {
            padding-left: 12px;
            padding-right: 12px;
          }

          .wallet-header h2 {
            font-size: 22px;
          }

          .connect-button {
            padding: 10px 11px;
            font-size: 10px;
          }

          .incoming-inner {
            height: 92px;
          }

          .incoming-inner h1 {
            font-size: 25px;
          }

          .balance-number {
            font-size: 40px;
          }

          .bottom-nav {
            width: calc(100% - 16px);
          }

        }

      `}</style>
    </div>
  );
}


/* =========================================================
   COMPONENTS
========================================================= */

function AirdropContent({
  balance,
  onEarn,
  onWithdraw,
}: {
  balance: number;
  onEarn: () => void;
  onWithdraw: () => void;
}) {
  return (
    <>
      {/* Balance Card */}

      <section className="balance-card">

        <div className="balance-label">
          <span className="usdt-symbol">
            ₮
          </span>

          <span>
            USDT BALANCE
          </span>
        </div>

        <div className="balance-number">
          {balance.toFixed(2)}
          <span> USDT</span>
        </div>

        <div className="usd-value">
          ≈ ${balance.toFixed(2)} USD
        </div>

        <div className="balance-actions">

          <button
            className="earn-button"
            onClick={onEarn}
          >
            Earn More
          </button>

          <button
            className="withdraw-button"
            onClick={onWithdraw}
          >
            Withdraw
          </button>

        </div>

      </section>

      {/* Announcement */}

      <section className="announcement">

        <div className="announcement-title">
          📢 ANNOUNCEMENT
        </div>

        <p>
          Complete tasks from the Earn tab to get
          demo rewards. Minimum demo withdraw limit
          is <strong>10 USDT</strong>.
        </p>

      </section>
    </>
  );
}


function NavItem({
  icon,
  label,
  active,
  onClick,
}: {
  icon: string;
  label: string;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <div
      className={`nav-item ${active ? "active" : ""}`}
      onClick={onClick}
    >
      <div className="nav-icon">
        {icon}
      </div>

      <div className="nav-label">
        {label}
      </div>
    </div>
  );
}


function WalletOption({
  icon,
  name,
}: {
  icon: string;
  name: string;
}) {
  const handleClick = () => {
    alert(
      `Demo mode: ${name} connection is not enabled.`
    );
  };

  return (
    <div
      className="wallet-option"
      onClick={handleClick}
    >
      <div className="wallet-option-icon">
        {icon}
      </div>

      <span className="wallet-option-name">
        {name}
      </span>
    </div>
  );
}


/* =========================================================
   OTHER TABS
========================================================= */

function EarnContent({
  onBack,
}: {
  onBack: () => void;
}) {
  return (
    <section className="page-card">

      <div className="page-icon">
        💰
      </div>

      <h3>
        Earn
      </h3>

      <p>
        এখানে Demo earning tasks দেখানো যাবে।
        Task complete করলে test balance বাড়ানোর
        ব্যবস্থা পরে যোগ করা যাবে।
      </p>

      <button
        className="back-button"
        onClick={onBack}
      >
        ← Back to Airdrop
      </button>

    </section>
  );
}


function MineContent({
  onBack,
}: {
  onBack: () => void;
}) {
  return (
    <section className="page-card">

      <div className="page-icon">
        ⛏️
      </div>

      <h3>
        Mine
      </h3>

      <p>
        Mining dashboard-এর Demo interface
        এখানে রাখা হয়েছে।
      </p>

      <button
        className="back-button"
        onClick={onBack}
      >
        ← Back to Airdrop
      </button>

    </section>
  );
}


function FriendsContent({
  onBack,
}: {
  onBack: () => void;
}) {
  return (
    <section className="page-card">

      <div className="page-icon">
        👥
      </div>

      <h3>
        Friends
      </h3>

      <p>
        Referral এবং Friends section-এর জন্য
        এই Demo screen ব্যবহার করতে পারো।
      </p>

      <button
        className="back-button"
        onClick={onBack}
      >
        ← Back to Airdrop
      </button>

    </section>
  );
}


function ExchangeContent({
  onBack,
}: {
  onBack: () => void;
}) {
  return (
    <section className="page-card">

      <div className="page-icon">
        🔄
      </div>

      <h3>
        Exchange
      </h3>

      <p>
        Exchange section-এর Demo interface।
        এখানে পরে তোমার প্রয়োজনীয় features যোগ
        করা যাবে।
      </p>

      <button
        className="back-button"
        onClick={onBack}
      >
        ← Back to Airdrop
      </button>

    </section>
  );
  }
