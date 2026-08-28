import CheckCom from "../component/ch";

const Airdrop = () => {
  return (
    <div className="py-10 bg-black p-4 flex flex-col items-center min-h-screen text-center">
      <div className="ml-2">
        <div className="flex justify-center mb-4">
          <img src="image/hamstercoin.png" alt="coin" className="w-20 h-20" />
        </div>
        <p className="text-white text-2xl font-bold mb-6">
          Get ready, Airdrop is
          <br /> coming soon!
        </p>

        {/* উইথড্র ক্যাশ বাটন */}
        <a 
          href="/withdraw"
          style={{
            display: 'inline-block',
            marginTop: '20px',
            marginBottom: '30px',
            padding: '14px 28px',
            backgroundColor: '#3b82f6',
            color: '#fff',
            textDecoration: 'none',
            borderRadius: '12px',
            fontSize: '18px',
            fontWeight: 'bold',
            cursor: 'pointer',
            boxShadow: '0 4px 12px rgba(59, 130, 246, 0.4)'
          }}
        >
          Withdraw Cash
        </a>
      </div>

      <div className="mt-6 w-full max-w-md">
        <div className="flex items-center my-3 bg-zinc-900 p-3 rounded-lg">
          <CheckCom flag={true} />
          <p className="text-white ml-3 text-left">Exchange negotiations</p>
        </div>
        
        <div className="flex items-center my-3 bg-zinc-900 p-3 rounded-lg">
          <CheckCom flag={true} />
          <p className="text-white ml-3 text-left">Market Maker negotiations</p>
        </div>

        <div className="flex items-center my-3 bg-zinc-900 p-3 rounded-lg">
          <CheckCom flag={true} />
          <p className="text-white ml-3 text-left">Key partnerships are coming</p>
        </div>

        <div className="flex items-center my-3 bg-zinc-900 p-3 rounded-lg">
          <CheckCom flag={false} />
          <p className="text-white ml-3 text-left">Airdrop task list</p>
        </div>
      </div>
    </div>
  );
};

export default Airdrop;


