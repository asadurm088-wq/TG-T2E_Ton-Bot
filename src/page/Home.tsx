import React, { useState, useEffect } from 'react';

export function Admin() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [withdrawals, setWithdrawals] = useState<any[]>([]);

  useEffect(() => {
    // লোকাল স্টোরেজ থেকে উইথড্র রিকোয়েস্টগুলো লোড করা
    const savedRequests = localStorage.getItem('withdraw_requests');
    if (savedRequests) {
      setWithdrawals(JSON.parse(savedRequests));
    }
  }, []);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // পাসওয়ার্ড চেক (এখানে পাসওয়ার্ড 12345 সেট করা আছে)
    if (password === '12345') {
      setIsAuthenticated(true);
    } else {
      alert('ভুল পাসওয়ার্ড! আবার চেষ্টা করুন।');
    }
  };

  const handleStatusChange = (index: number, newStatus: string) => {
    const updatedWithdrawals = [...withdrawals];
    updatedWithdrawals[index].status = newStatus;
    setWithdrawals(updatedWithdrawals);
    localStorage.setItem('withdraw_requests', JSON.stringify(updatedWithdrawals));
  };

  if (!isAuthenticated) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', backgroundColor: '#f0f2f5' }}>
        <form onSubmit={handleLogin} style={{ padding: '30px', background: 'white', borderRadius: '10px', boxShadow: '0 4px 10px rgba(0,0,0,0.1)', textAlign: 'center' }}>
          <h2>অ্যাডমিন প্যানেল লগইন</h2>
          <input
            type="password"
            placeholder="পাসওয়ার্ড দিন (12345)"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={{ padding: '10px', margin: '15px 0', width: '200px', display: 'block', border: '1px solid #ccc', borderRadius: '5px' }}
          />
          <button type="submit" style={{ padding: '10px 20px', background: '#0088cc', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>
            লগইন করুন
          </button>
        </form>
      </div>
    );
  }

  return (
    <div style={{ padding: '20px', fontFamily: 'sans-serif', maxWidth: '800px', margin: '0 auto' }}>
      <h2>অ্যাডমিন ড্যাশবোর্ড - উইথড্র রিকোয়েস্ট</h2>
      {withdrawals.length === 0 ? (
        <p>কোনো উইথড্র রিকোয়েস্ট পাওয়া যায়নি।</p>
      ) : (
        <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '20px' }}>
          <thead>
            <tr style={{ background: '#f4f4f4', borderBottom: '2px solid #ddd' }}>
              <th style={{ padding: '10px', border: '1px solid #ddd' }}>ইউজার</th>
              <th style={{ padding: '10px', border: '1px solid #ddd' }}>টাকা/অ্যামাউন্ট</th>
              <th style={{ padding: '10px', border: '1px solid #ddd' }}>স্ট্যাটাস</th>
              <th style={{ padding: '10px', border: '1px solid #ddd' }}>অ্যাকশন</th>
            </tr>
          </thead>
          <tbody>
            {withdrawals.map((req, index) => (
              <tr key={index} style={{ textAlign: 'center' }}>
                <td style={{ padding: '10px', border: '1px solid #ddd' }}>{req.user || 'Unknown'}</td>
                <td style={{ padding: '10px', border: '1px solid #ddd' }}>{req.amount}</td>
                <td style={{ padding: '10px', border: '1px solid #ddd' }}>{req.status || 'Pending'}</td>
                <td style={{ padding: '10px', border: '1px solid #ddd' }}>
                  <button onClick={() => handleStatusChange(index, 'Approved')} style={{ marginRight: '5px', background: 'green', color: 'white', border: 'none', padding: '5px 10px', borderRadius: '3px', cursor: 'pointer' }}>এপ্রুভ</button>
                  <button onClick={() => handleStatusChange(index, 'Rejected')} style={{ background: 'red', color: 'white', border: 'none', padding: '5px 10px', borderRadius: '3px', cursor: 'pointer' }}>বাতিল</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
                    }
