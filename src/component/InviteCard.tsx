
interface InviteCardProps {
  title: string;
  profit: string;
}

const InviteCard: React.FC<InviteCardProps> = ({ title, profit }) => {
  const handleInvite = () => {
    const tg = (window as any).Telegram?.WebApp;
    const userId = tg?.initDataUnsafe?.user?.id || '';
    
    // আপনার টেলিগ্রাম বটের ইউজারনেম এখানে দেওয়া আছে
    const botUrl = `https://t.me/IncomingCashOfficial_bot?start=${userId}`;
    const text = encodeURIComponent("Join this awesome app and get bonuses!");
    const shareUrl = `https://t.me/share/url?url=${encodeURIComponent(botUrl)}&text=${text}`;

    if (tg?.openTelegramLink) {
      tg.openTelegramLink(shareUrl);
    } else {
      window.open(shareUrl, '_blank');
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

