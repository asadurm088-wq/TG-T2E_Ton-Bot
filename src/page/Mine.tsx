import React, { useState } from 'react';

export default function Mine() {
  const [tab, setTab] = useState<number>(1);

  return (
    <div className="px-4 pb-24 text-white">
      <div className="flex flex-col gap-4 py-4">
        <h1 className="text-2xl font-bold">Mine Dashboard</h1>
        <p className="text-gray-400">Welcome to your mining section!</p>
      </div>
    </div>
  );
}

