import { useState, useEffect } from "react";

export default function Earn() {
  const [tasks, setTasks] = useState([
    { 
      id: 1, 
      title: "Join Telegram Channel", 
      reward: 0.50, // USDT
      link: "https://t.me/RakibEarningZoneBD", 
      status: "Go" 
    },
    { 
      id: 2, 
      title: "YouTube Subscribe & Watch", 
      reward: 0.30, // USDT
      link: "https://www.youtube.com/@RakibSkyhear", 
      status: "Go" 
    },
    { 
      id: 3, 
      title: "Facebook Page Follow", 
      reward: 0.30, // USDT
      link: "https://www.facebook.com/share/1AXpD1SECZ/", 
      status: "Go" 
    },
    { 
      id: 4, 
      title: "TikTok Follow", 
      reward: 0.30, // USDT
      link: "https://tiktok.com/@rakib_vai...007", 
      status: "Go" 
    },
  ]);

  const [balance, setBalance] = useState(() => {
    const saved = localStorage.getItem("balance") || localStorage.getItem("user_balance");
    return saved ? parseInt(saved, 10) : 1519594;
  });

  useEffect(() => {
    localStorage.setItem("balance", balance.toString());
    localStorage.setItem("user_balance", balance.toString());
  }, [balance]);

  const handleTaskClick = (id: number, link: string) => {
    window.open(link, "_blank");
    
    setTasks(tasks.map(task => {
      if (task.id === id && task.status === "Go") {
        return { ...task, status: "Claim" };
      }
      return task;
    }));
  };

  const handleClaim = (id: number, rewardUsdt: number) => {
    // USDT রিওয়ার্ডকে আগের পয়েন্ট সিস্টেমে কনভার্ট করে যোগ করা (যেমন: 0.50 USDT = 5000 points)
    const rewardPoints = Math.round(rewardUsdt * 10000);
    const newBalance = balance + rewardPoints;
    
    setBalance(newBalance);
    localStorage.setItem("balance", newBalance.toString());
    localStorage.setItem("user_balance", newBalance.toString());
    
    setTasks(tasks.map(task => {
      if (task.id === id) {
        return { ...task, status: "Done" };
      }
      return task;
    }));
  };

  return (
    <div className="py-6 bg-black p-4 flex flex-col items-center min-h-screen text-white pb-20">
      <div className="w-full max-w-md text-center mb-6">
        <h1 className="text-3xl font-bold tracking-wide text-emerald-400">Earn USDT</h1>
        <p className="text-gray-400 text-sm mt-1">Complete tasks & get USDT directly!</p>
        
        <div className="mt-4 bg-zinc-900 border border-zinc-800 p-3 rounded-xl flex justify-between items-center px-6">
          <span className="text-gray-400 font-semibold">Total Balance:</span>
          <span className="text-emerald-400 font-bold text-lg">
            {(balance * 0.0001).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} USDT
          </span>
        </div>
      </div>

      <div className="w-full max-w-md flex flex-col gap-3">
        {tasks.map((task) => (
          <div key={task.id} className="bg-zinc-900 border border-zinc-800 p-4 rounded-2xl flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="bg-zinc-800 p-3 rounded-xl text-emerald-400 text-xl font-bold">
                ₮
              </div>
              <div className="text-left">
                <h3 className="font-bold text-white text-sm">{task.title}</h3>
                <p className="text-emerald-400 text-xs mt-1 font-semibold">+{task.reward.toFixed(2)} USDT</p>
              </div>
            </div>

            <div>
              {task.status === "Go" && (
                <button 
                  onClick={() => handleTaskClick(task.id, task.link)}
                  className="bg-emerald-500 hover:bg-emerald-600 text-black font-bold px-5 py-2 rounded-xl text-sm transition cursor-pointer"
                >
                  Go
                </button>
              )}
              {task.status === "Claim" && (
                <button 
                  onClick={() => handleClaim(task.id, task.reward)}
                  className="bg-teal-500 hover:bg-teal-600 text-black font-bold px-4 py-2 rounded-xl text-sm transition animate-pulse cursor-pointer"
                >
                  Claim
                </button>
              )}
              {task.status === "Done" && (
                <span className="text-emerald-500 font-bold text-lg px-3 py-1 bg-emerald-950/40 rounded-xl border border-emerald-800">
                  ✔
                </span>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
