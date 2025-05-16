import IssueCard from "@/components/issues/IssueCard";
import { Plus } from "lucide-react";

export default function Home() {
  return (
    <div className='min-h-screen bg-black p-4 md:p-6'>
      <div className='w-full mx-auto'>
        <div className='flex justify-end mb-6'>
          <button className='flex items-center gap-2 bg-zinc-800 hover:bg-zinc-700 text-[#E6E6E6] rounded-full px-4 py-2 transition-colors'>
            <Plus size={20} className='text-[#E6E6E6]' />
            <span>Add Frequment</span>
          </button>
        </div>

        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6'>
          <IssueCard title='Start Of The Season' icon='/issue/1.png' />
          <IssueCard title='Calculate Volume' icon='/issue/2.png' />
          <IssueCard title='Flocculant Of Claefier' icon='/issue/3.png' />
          <IssueCard title='Winterize My Pool' icon='/issue/4.png' />
          <IssueCard title='How Much Chlorine' icon='/issue/5.png' />
          <IssueCard title='How Many Filter' icon='/issue/6.png' />
          <IssueCard title='Which Robot' icon='/issue/7.png' />
          <IssueCard title='Summer Blanket' icon='/issue/8.png' />
        </div>
      </div>
    </div>
  );
}
