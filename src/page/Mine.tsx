import React, { useState } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Mine() {
  const [tab, setTab] = useState(1);

  function formatNumberWithCommas(num: number) {
    return num.toLocaleString();
  }

  return (
    <div className="px-4 pb-24">
      <ToastContainer />
      <div className="flex flex-col gap-4 py-4">
        <h1 className="text-2xl font-bold text-white">Mine Dashboard</h1>
        <p className="text-gray-400">Welcome to your mining section!</p>
      </div>
    </div>
  );
}

