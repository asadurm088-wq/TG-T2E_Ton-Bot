import { useState } from "react";

export default function AdminPanel() {
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false);
  const [password, setPassword] = useState("");
  const [requests, setRequests] = useState<any[]>([]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === "12345") { // এখানে আপনার ইচ্ছমতো পাসওয়ার্ড পাল্টে নিতে পারেন
      setIsAdminLoggedIn(true);
      loadRequests();
    } else {
      alert("ভুল পাসওয়ার্ড!");
    }
  };

  const loadRequests = () => {
    const saved = localStorage.getItem("admin_withdraw_requests");
    if (saved) {
      setRequests(JSON.parse(saved));
    }
  };

  const markAsPaid = (id: number) => {
    const updated = requests.map(req => {
      if (req.id === id) {
        return { ...req, status: "Paid" };
      }
      return req;
    });
    setRequests(updated);
    localStorage.setItem("admin_withdraw_requests", JSON.stringify(updated));
  };

  if (!isAdminLoggedIn) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center p-4 text-white">
        <form onSubmit={handleLogin} className="bg-zinc-900 p-6 rounded-2xl border border-zinc-800 w-full max-w-sm">
          <h2 className="text-xl font-bold text-emerald-400 mb-4 text-center">Admin Login</h2>
          <input 
            type="password" 
            placeholder="অ্যাডমিন পাসওয়ার্ড দিন (12345)" 
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full bg-black border border-zinc-700 p-3 rounded-xl mb-4 text-white text-sm"
          />
          <button type="submit" className="w-full bg-emerald-500 hover:bg-emerald-600 text-black font-bold p-3 rounded-xl text-sm transition">
            লগইন করুন
          </button>
        </form>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black p-4 text-white">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-xl font-bold text-emerald-400">অ্যাডমিন ড্যাশবোর্ড (উইথড্র লিস্ট)</h1>
          <button 
            onClick={() => setIsAdminLoggedIn(false)}
            className="bg-red-500/20 text-red-400 border border-red-500/30 px-3 py-1.5 rounded-xl text-xs font-bold"
          >
            লগআউট
          </button>
        </div>

        {requests.length === 0 ? (
          <p className="text-gray-400 text-center mt-10 text-sm">এখনো কোনো উইথড্র রিকোয়েস্ট আসেনি।</p>
        ) : (
          <div className="flex flex-col gap-3">
            {requests.map((req) => (
              <div key={req.id} className="bg-zinc-900 border border-zinc-800 p-4 rounded-2xl flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                  <p className="text-[10px] text-gray-400">সময়: {req.date}</p>
                  <h3 className="font-bold text-white text-xs mt-1">মাধ্যম: {req.method}</h3>
                  <p className="text-yellow-400 text-xs mt-0.5">একাউন্ট/ওয়ালেট: {req.wallet}</p>
                  <p className="text-emerald-400 font-semibold text-xs mt-1">পরিমাণ: {req.amount}</p>
                </div>

                <div className="flex items-center gap-3">
                  <span className={`px-3 py-1 rounded-lg text-xs font-bold ${req.status === 'Paid' ? 'bg-emerald-500/20 text-emerald-400' : 'bg-yellow-500/20 text-yellow-400'}`}>
                    {req.status}
                  </span>
                  {req.status !== 'Paid' && (
                    <button 
                      onClick={() => markAsPaid(req.id)}
                      className="bg-emerald-500 hover:bg-emerald-600 text-black font-bold px-3 py-1.5 rounded-xl text-xs transition"
                    >
                      Paid দিন
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
