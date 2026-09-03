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
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', backgroundColor: '#0f172a', fontFamily: 'sans-serif' }}>
        <form onSubmit={handleLogin} style={{ padding: '30px', background: '#1e293b', borderRadius: '16px', boxShadow: '0 10px 25px rgba(0,0,0,0.5)', textAlign: 'center', color: '#ffffff', width: '100%', maxWidth: '320px', border: '1px solid #334155' }}>
          <h2 style={{ fontSize: '18px', marginBottom: '16px' }}>অ্যাডমিন প্যানেল লগইন</h2>
          <input
            type="password"
            placeholder="পাসওয়ার্ড দিন (12345)"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={{ padding: '12px', margin: '0 0 15px 0', width: '100%', display: 'block', backgroundColor: '#0f172a', border: '1px solid #475569', borderRadius: '8px', color: '#ffffff', boxSizing: 'border-box' }}
          />
          <button type="submit" style={{ padding: '12px', width: '100%', background: 'linear-gradient(to right, #0284c7, #2563eb)', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold' }}>
            লগইন করুন
          </button>
        </form>
      </div>
    );
  }

  return (
    <div style={{ padding: '20px', fontFamily: 'sans-serif', maxWidth: '800px', margin: '0 auto', color: '#ffffff', backgroundColor: '#0f172a', minHeight: '100vh' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <h2 style={{ fontSize: '18px', margin: 0 }}>অ্যাডমিন ড্যাশবোর্ড - উইথড্র রিকোয়েস্ট</h2>
        <button onClick={() => setIsAuthenticated(false)} style={{ background: '#ef4444', color: '#fff', border: 'none', padding: '6px 12px', borderRadius: '6px', cursor: 'pointer', fontSize: '12px' }}>লগআউট</button>
      </div>

      {withdrawals.length === 0 ? (
        <p style={{ color: '#94a3b8', textAlign: 'center', marginTop: '40px' }}>কোনো উইথড্র রিকোয়েস্ট পাওয়া যায়নি।</p>
      ) : (
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '10px', backgroundColor: '#1e293b', borderRadius: '8px', overflow: 'hidden' }}>
            <thead>
              <tr style={{ background: '#334155', borderBottom: '2px solid #475569', fontSize: '12px' }}>
                <th style={{ padding: '10px', border: '1px solid #475569' }}>ইউজার/ওয়ালেট</th>
                <th style={{ padding: '10px', border: '1px solid #475569' }}>অ্যামাউন্ট</th>
                <th style={{ padding: '10px', border: '1px solid #475569' }}>স্ট্যাটাস</th>
                <th style={{ padding: '10px', border: '1px solid #475569' }}>অ্যাকশন</th>
              </tr>
            </thead>
            <tbody style={{ fontSize: '12px' }}>
              {withdrawals.map((req, index) => (
                <tr key={index} style={{ textAlign: 'center', borderBottom: '1px solid #334155' }}>
                  <td style={{ padding: '10px', border: '1px solid #475569' }}>{req.user || 'Unknown'}</td>
                  <td style={{ padding: '10px', border: '1px solid #475569', color: '#34d399', fontWeight: 'bold' }}>{req.amount}</td>
                  <td style={{ padding: '10px', border: '1px solid #475569', color: req.status === 'Approved' ? '#34d399' : req.status === 'Rejected' ? '#f87171' : '#fbbf24' }}>{req.status || 'Pending'}</td>
                  <td style={{ padding: '10px', border: '1px solid #475569' }}>
                    <button onClick={() => handleStatusChange(index, 'Approved')} style={{ marginRight: '5px', background: '#10b981', color: 'white', border: 'none', padding: '5px 10px', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' }}>এপ্রুভ</button>
                    <button onClick={() => handleStatusChange(index, 'Rejected')} style={{ background: '#ef4444', color: 'white', border: 'none', padding: '5px 10px', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' }}>বাতিল</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
