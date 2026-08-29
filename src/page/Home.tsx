import React from "react";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[400px] text-white p-4">
      <h1 className="text-2xl font-bold mb-4">Welcome to T2E Ton Bot</h1>
      <p className="text-gray-400 text-center">
        আপনার গেমের হোম পেজটি সফলভাবে রিস্টোর করা হয়েছে। অ্যাডমিন প্যানেলে প্রবেশ করতে চাইলে নিচের লিংকে যান:
      </p>
      <a
        href="/admin"
        className="mt-4 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition"
      >
        Go to Admin Panel (/admin)
      </a>
    </div>
  );
}
