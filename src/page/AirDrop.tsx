import { useState } from "react";

export default function Airdrop() {
  const [showWithdraw, setShowWithdraw] = useState(false);
  const [method, setMethod] = useState("");
  const [number, setNumber] = useState("");
  const [amount, setAmount] = useState("");
  const [success, setSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!method || !number || !amount) {
      alert("দয়া করে সব তথ্য পূরণ করুন!");
      return;
    }
    setSuccess(true);
    setTimeout(() => {
      setSuccess(false);
      setShowWithdraw(false);
      setNumber("");
      setAmount("");
      setMethod("");
    }, 3000);
  };

  return (
    <div className="py-10 bg-black p-4 flex flex-col items-center min-h-screen text-center relative">
      <div className="ml-2 w-full max-w-md">
        <div className="flex justify-center mb-4">
          <img src="image/hamstercoin.png" alt="coin" className="w-20 h-20" />
        </div>
        <p className="text-white text-2xl font-bold mb-6">
          Get ready, Airdrop is
          <br /> coming soon!
        </p>

        {/* উইথড্র ক্যাশ বাটন */}
        <button 
          onClick={() => setShowWithdraw(true)}
          style={{
            display: "inline-block",
            marginTop: "20px",
            marginBottom: "30px",
            padding: "14px 28px",
            backgroundColor: "#3b82f6",
            color: "#fff",
            textDecoration: "none",
            borderRadius: "12px",
            fontSize: "18px",
            fontWeight: "bold",
            cursor: "pointer",
            boxShadow: "0 4px 12px rgba(59, 130, 246, 0.4)",
            border: "none",
            width: "100%"
          }}
        >
          Withdraw Cash
        </button>
      </div>

      <div className="mt-2 w-full max-w-md">
        <div className="flex items-center my-3 bg-zinc-900 p-3 rounded-lg">
          <span style={{ color: "#22c55e", fontSize: "20px", marginRight: "10px" }}>✔</span>
          <p className="text-white ml-3 text-left">Exchange negotiations</p>
        </div>
        
        <div className="flex items-center my-3 bg-zinc-900 p-3 rounded-lg">
          <span style={{ color: "#22c55e", fontSize: "20px", marginRight: "10px" }}>✔</span>
          <p className="text-white ml-3 text-left">Market Maker negotiations</p>
        </div>

        <div className="flex items-center my-3 bg-zinc-900 p-3 rounded-lg">
          <span style={{ color: "#22c55e", fontSize: "20px", marginRight: "10px" }}>✔</span>
          <p className="text-white ml-3 text-left">Key partnerships are coming</p>
        </div>

        <div className="flex items-center my-3 bg-zinc-900 p-3 rounded-lg">
          <span style={{ color: "#ef4444", fontSize: "20px", marginRight: "10px" }}>✖</span>
          <p className="text-white ml-3 text-left">Airdrop task list</p>
        </div>
      </div>

      {/* উইথড্র পপআপ বক্স */}
      {showWithdraw && (
        <div className="fixed inset-0 bg-black bg-opacity-95 flex flex-col justify-center items-center p-4 z-50">
          <div className="bg-zinc-900 p-6 rounded-2xl w-full max-w-md text-left relative border border-zinc-700 shadow-2xl">
            <button 
              onClick={() => setShowWithdraw(false)}
              className="absolute top-4 right-4 text-white text-xl font-bold bg-zinc-800 px-3 py-1 rounded-full"
            >
              ✕
            </button>
            <h2 className="text-white text-2xl font-bold mb-4 text-center">Withdraw Cash</h2>
            
            {success ? (
              <div className="bg-green-600 text-white p-4 rounded-xl text-center font-bold">
                অভিনন্দন! আপনার উইথড্র রিকোয়েস্ট সফলভাবে জমা হয়েছে।
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <div>
                  <label className="text-gray-300 text-sm mb-1 block">পেমেন্ট মেথড বেছে নিন</label>
                  <select 
                    value={method} 
                    onChange={(e) => setMethod(e.target.value)}
                    className="w-full p-3 bg-black text-white rounded-lg border border-zinc-700"
                  >
                    <option value="">-- এক্সচেঞ্জ / মেথড সিলেক্ট করুন --</option>
                    <option value="Binance">Binance (UID / USDT)</option>
                    <option value="Bitget">Bitget (UID / USDT)</option>
                    <option value="Bybit">Bybit (UID / USDT)</option>
                    <option value="USDT_TRC20">USDT (TRC20 Address)</option>
                    <option value="bKash">বিকাশ (bKash)</option>
                    <option value="Nagad">নগদ (Nagad)</option>
                    <option value="Rocket">রকেট (Rocket)</option>
                  </select>
                </div>

                <div>
                  <label className="text-gray-300 text-sm mb-1 block">UID / ওয়ালেট এড্রেস / নাম্বার</label>
                  <input 
                    type="text" 
                    placeholder="আপনার UID বা ওয়ালেট নাম্বার দিন"
                    value={number}
                    onChange={(e) => setNumber(e.target.value)}
                    className="w-full p-3 bg-black text-white rounded-lg border border-zinc-700"
                  />
                </div>

                <div>
                  <label className="text-gray-300 text-sm mb-1 block">পরিমাণ (Amount)</label>
                  <input 
                    type="number" 
                    placeholder="টোকেন বা অ্যামাউন্ট লিখুন"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    className="w-full p-3 bg-black text-white rounded-lg border border-zinc-700"
                  />
                </div>

                <button 
                  type="submit"
                  className="w-full py-3 bg-blue-600 text-white font-bold rounded-lg mt-2 cursor-pointer shadow-lg"
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
