interface InviteCardProps {
  title: string;
  profit: string;
}

const InviteCard: React.FC<InviteCardProps> = ({ title, profit }) => {
  const handleInvite = () => {
    // টেলিগ্রাম থেকে ইউজারের আইডি নেওয়া (যদি থাকে)
    const userId = (window as any).Telegram?.WebApp?.initDataUnsafe?.user?.id || '';
    // টেলিগ্রামের অফিশিয়াল শেয়ার লিংক তৈরি
    const inviteLink = `https://t.me/share/url?url=https://t.me/IncomingCashOfficial_bot?start=${userId}&text=Join%20this%20awesome%20bot%20and%20get%20bonuses!`;
    
    // টেলিগ্রাম অ্যাপের ভেতরে লিংক ওপেন করার ফাংশন
    if ((window as any).Telegram?.WebApp?.openTelegramLink) {
      (window as any).Telegram?.WebApp?.openTelegramLink(inviteLink);
    } else {
      window.open(inviteLink, '_blank');
    }
  };

  return (
    <div onClick={handleInvite} className="group w-full rounded-lg bg-gradient-to-b from-pink-50 to-indigo-600 pt-[1px] px-[1px] cursor-pointer">
      <div className="group w-full rounded-lg transition relative duration-300 hover:translate-y-[3px] hover:shadow-[0 -8px 0px 0px #2196f3] bg-[#272A30] py-3 px-4 flex justify-between items-center">
        <div>
          <p className="text-white text-lg font-bold">{title}</p>
          <p className="text-yellow-400 text-sm pt-1">+{profit} Coins</p>
        </div>
      </div>
    </div>
  );
};

export default InviteCard;
