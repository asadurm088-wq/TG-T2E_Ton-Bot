import { useState, useEffect } from "react";

export default function Earn() {
  const [tasks, setTasks] = useState([
    { 
      id: 1, 
      title: "Join Telegram Channel", 
      reward: 5000, 
      link: "https://t.me/RakibEarningZoneBD", 
      status: "Go" 
    },
    { 
      id: 2, 
      title: "YouTube Subscribe & Watch", 
      reward: 3000, 
      link: "https://www.youtube.com/@RakibSkyhear", 
      status: "Go" 
    },
    { 
      id: 3, 
      title: "Facebook Page Follow", 
      reward: 3000, 
      link: "https://www.facebook.com/share/1AXpD1SECZ/", 
      status: "Go" 
    },
    { 
      id: 4, 
      title: "TikTok Follow", 
      reward: 3000, 
      link: "https://tiktok.com/@rakib_vai...007", 
      status: "Go" 
    },
  ]);

  // ব্রাউজারের লকাল স্টোরেজ থেকে মেইন ব্যালেন্স লোড করা
  const [balance, setBalance] = useState(() => {
    const savedBalance = localStorage.getItem("user_balance");
    return savedBalance ? parseInt(savedBalance, 10) : 1519594;
  });

  // ব্যালেন্স পরিবর্তন হলে সেটি লকাল স্টোরেজে সেভ করে রাখা যাতে অন্য পেজেও পাওয়া যায়
  useEffect(() => {
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

  const handleClaim = (id: number, reward: number) => {
    const newBalance = balance + reward;
    setBalance(newBalance);
    
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
        <h1 className="text-3xl font-bold tracking-wide text-yellow-500">Earn Rewards</h1>
        <p className="text-gray-400 text-sm mt-1">Complete tasks & get coins directly!</p>
        
        <div className="mt-4 bg-zinc-900 border border-zinc-800 p-3 rounded-xl flex justify-between items-center px-6">
          <span className="text-gray-400 font-semibold">Total Balance:</span>
          <span className="text-yellow-400 font-bold text-lg">🪙 {balance.toLocaleString()}</span>
        </div>
      </div>

      <div className="w-full max-w-md flex flex-col gap-3">
        {tasks.map((task) => (
          <div key={task.id} className="bg-zinc-900 border border-zinc-800 p-4 rounded-2xl flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="bg-zinc-800 p-3 rounded-xl text-yellow-400 text-xl">
                📢
              </div>
              <div className="text-left">
                <h3 className="font-bold text-white text-sm">{task.title}</h3>
                <p className="text-yellow-500 text-xs mt-1 font-semibold">+{task.reward.toLocaleString()} Coins</p>
              </div>
            </div>

            <div>
              {task.status === "Go" && (
                <button 
                  onClick={() => handleTaskClick(task.id, task.link)}
                  className="bg-yellow-500 hover:bg-yellow-600 text-black font-bold px-5 py-2 rounded-xl text-sm transition cursor-pointer"
                >
                  Go
                </button>
              )}
              {task.status === "Claim" && (
                <button 
                  onClick={() => handleClaim(task.id, task.reward)}
                  className="bg-green-600 hover:bg-green-700 text-white font-bold px-4 py-2 rounded-xl text-sm transition animate-pulse cursor-pointer"
                >
                  Claim
                </button>
              )}
              {task.status === "Done" && (
                <span className="text-green-500 font-bold text-lg px-3 py-1 bg-green-950/40 rounded-xl border border-green-800">
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
