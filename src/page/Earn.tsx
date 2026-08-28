import { useState, useEffect } from "react";

export default function Earn() {
  const [tasks, setTasks] = useState([
    {
      id: 1,
      title: "Join Telegram Channel",
      reward: 0.50,
      link: "https://t.me/your_channel",
      status: "Go", 
      availableAt: 0 
    },
    {
      id: 2,
      title: "YouTube Subscribe & Watch",
      reward: 0.30,
      link: "https://youtube.com",
      status: "Go",
      availableAt: 0 
    },
    {
      id: 3,
      title: "Facebook Page Follow",
      reward: 0.30,
      link: "https://facebook.com",
      status: "Go",
      availableAt: 0 
    },
    {
      id: 4,
      title: "TikTok Follow",
      reward: 0.30,
      link: "https://tiktok.com",
      status: "Go",
      availableAt: 0 
    }
  ]);

  const [, setTime] = useState(Date.now());
  useEffect(() => {
    const interval = setInterval(() => setTime(Date.now()), 1000);
    return () => clearInterval(interval);
  }, []);

  const handleTaskAction = (id: number, link: string, currentStatus: string) => {
    if (currentStatus === "Go") {
      window.open(link, "_blank");
      
      setTasks(tasks.map(task => {
        if (task.id === id) {
          return { ...task, status: "Claim" };
        }
        return task;
      }));
    } else if (currentStatus === "Claim") {
      // ১৮ ঘণ্টার কুলডাউন টাইম (১৮ ঘণ্টা = 18 * 3600 * 1000 মিলিসেকেন্ড)
      const cooldownTime = Date.now() + (18 * 60 * 60 * 1000);

      setTasks(tasks.map(task => {
        if (task.id === id) {
          return { ...task, status: "Waiting", availableAt: cooldownTime };
        }
        return task;
      }));
      
      alert("সফলভাবে রিওয়ার্ড ক্লেইম করা হয়েছে! ১৮ ঘণ্টা পর আবার এই টাস্কটি করতে পারবেন।");
    }
  };

  return (
    <div className="py-6 bg-black p-4 flex flex-col items-center min-h-screen text-white pb-24">
      
      <div className="w-full max-w-md text-center mb-6">
        <h1 className="text-2xl font-bold text-emerald-400">Earn USDT</h1>
        <p className="text-gray-400 text-xs mt-1">Complete tasks & get USDT directly!</p>
      </div>

      <div className="w-full max-w-md bg-zinc-900 border border-zinc-800 p-4 rounded-2xl mb-6 text-center shadow-lg">
        <p className="text-gray-400 text-xs">Total Balance:</p>
        <h2 className="text-2xl font-bold text-emerald-400 mt-1">154.76 USDT</h2>
      </div>

      <div className="w-full max-w-md flex flex-col gap-3">
        {tasks.map((task) => {
          const isWaiting = task.status === "Waiting" && Date.now() < task.availableAt;

          if (task.status === "Waiting" && Date.now() >= task.availableAt) {
            task.status = "Go";
          }

          const timeLeft = isWaiting ? Math.ceil((task.availableAt - Date.now()) / 1000) : 0;
          const hours = Math.floor(timeLeft / 3600);
          const minutes = Math.floor((timeLeft % 3600) / 60);

          return (
            <div key={task.id} className="bg-zinc-900 border border-zinc-800 p-4 rounded-2xl flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 font-bold">
                  ₮
                </div>
                <div className="text-left">
                  <h3 className="font-bold text-white text-xs">{task.title}</h3>
                  <p className="text-emerald-400 text-xs mt-0.5 font-semibold">+{task.reward.toFixed(2)} USDT</p>
                </div>
              </div>

              <div>
                {isWaiting ? (
                  <span className="text-yellow-400 font-bold text-[11px] px-3 py-2 bg-yellow-950/40 rounded-xl border border-yellow-800/60 block text-center">
                    ⏳ {hours} ঘণ্টা {minutes}মি পর
                  </span>
                ) : (
                  <button 
                    onClick={() => handleTaskAction(task.id, task.link, task.status)}
                    className="bg-emerald-500 hover:bg-emerald-600 text-black font-bold px-5 py-2 rounded-xl text-xs transition cursor-pointer"
                  >
                    {task.status === "Go" ? "Go" : "Claim"}
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>

    </div>
  );
}
