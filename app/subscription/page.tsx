"use client";

import { useState } from "react";
import { Check, Fish, Crown, Plus } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import Link from "next/link";

export default function Home() {
  const [showDialog, setShowDialog] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);
  const [currentPlan, setCurrentPlan] = useState<string | null>(null);

  const features = [
    "Issues Frequent",
    "Maintenance Newspaper",
    "Buy Products",
    "Problem In My Pool",
    "Calculator Of Chemicals",
    "Tricks And Secrets",
  ];

  const handleChoosePlan = (plan: string) => {
    setSelectedPlan(plan);
    setShowDialog(true);
  };

  const confirmSubscription = () => {
    setCurrentPlan(selectedPlan);
    setShowDialog(false);
  };

  return (
    <div className='min-h-screen bg-black p-4 md:p-8 flex flex-col'>
      <div className='w-full'>
        <div className='flex justify-end mb-6'>
          <Link
            href='/subscription/add'
            className='flex items-center gap-2 bg-zinc-800 hover:bg-zinc-700 text-white rounded-full px-4 py-2 transition-colors'
          >
            <Plus size={20} />
            <span>Add New Subscription</span>
          </Link>
        </div>

        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6'>
          {/* Basic Plan */}
          <div className='max-w-[330px] bg-zinc-800 rounded-lg overflow-hidden'>
            <div className='px-6 py-8 flex items-start gap-3'>
              <div className=''>
                <svg
                  width='50'
                  height='50'
                  viewBox='0 0 50 50'
                  fill='none'
                  xmlns='http://www.w3.org/2000/svg'
                >
                  <rect width='50' height='50' rx='12' fill='#5CE1E6' />
                  <path
                    d='M31.4704 29.83L31.8604 32.99C31.9604 33.82 31.0704 34.4 30.3604 33.97L26.9004 31.91C26.6604 31.77 26.6004 31.47 26.7304 31.23C27.2304 30.31 27.5004 29.27 27.5004 28.23C27.5004 24.57 24.3604 21.59 20.5004 21.59C19.7104 21.59 18.9404 21.71 18.2204 21.95C17.8504 22.07 17.4904 21.73 17.5804 21.35C18.4904 17.71 21.9904 15 26.1704 15C31.0504 15 35.0004 18.69 35.0004 23.24C35.0004 25.94 33.6104 28.33 31.4704 29.83Z'
                    fill='#275F61'
                  />
                  <path
                    d='M26 28.2298C26 29.4198 25.56 30.5198 24.82 31.3898C23.83 32.5898 22.26 33.3598 20.5 33.3598L17.89 34.9098C17.45 35.1798 16.89 34.8098 16.95 34.2998L17.2 32.3298C15.86 31.3998 15 29.9098 15 28.2298C15 26.4698 15.94 24.9198 17.38 23.9998C18.27 23.4198 19.34 23.0898 20.5 23.0898C23.54 23.0898 26 25.3898 26 28.2298Z'
                    fill='#275F61'
                  />
                </svg>
              </div>
              <div>
                <h3 className='text-white font-medium'>Basic Plan</h3>
                <p className='text-white text-lg font-bold'>Free</p>
              </div>
            </div>

            <div className='border-t border-[#5CE1E6]'>
              <div className='p-4'>
                <h4 className='text-[#E6E6E6] font-medium mb-3'>Features</h4>
                <ul className='space-y-5'>
                  {features.map((feature, index) => (
                    <li
                      key={index}
                      className='flex items-center gap-2 text-gray-300'
                    >
                      <div className='bg-[#5CE1E6] rounded-full p-1'>
                        <Check className='h-4 w-4 text-black' />
                      </div>
                      <span className='text-base text-[#B0B0B0]'>
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className='p-4 w-full'>
              <Link
                href='/subscription/edit'
                className={`w-full block py-3 rounded-md text-center font-medium transition-colors bg-[#5CE1E6] cursor-pointer  text-zinc-800 hover:bg-cyan-500
                }`}
              >
                Edit Plan
              </Link>
            </div>
          </div>

          {/* Premium Plan */}
          {/* <div className='max-w-[330px] bg-zinc-800 rounded-lg overflow-hidden'>
            <div className='px-6 py-8 flex items-start gap-3'>
              <div className='bg-cyan-400 p-2 rounded-md'>
                <Crown className='h-5 w-5 text-zinc-800' />
              </div>
              <div>
                <h3 className='text-white font-medium'>Premium Plan</h3>
                <p className='text-white text-lg font-bold'>
                  4.9{" "}
                  <span className='text-sm font-normal'>/month (39€/year)</span>
                </p>
              </div>
            </div>

            <div className='border-t border-[#5CE1E6]'>
              <div className='p-4'>
                <h4 className='text-white mb-3'>Features</h4>
                <ul className='space-y-6'>
                  {features.map((feature, index) => (
                    <li
                      key={index}
                      className='flex items-center gap-2 text-gray-300'
                    >
                      <div className='bg-[#5CE1E6] rounded-full p-1'>
                        <Check className='h-4 w-4 text-black' />
                      </div>
                      <span className='text-base text-[#B0B0B0]'>
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className='p-4'>
              <Link
                href='/subscription/4778564'
                className={`w-full py-3 rounded-md text-center font-medium transition-colors
                    bg-cyan-700 text-white cursor-default  hover:bg-cyan-500`}
              >
                Edit Plan
              </Link>
            </div>
          </div> */}
        </div>
      </div>

      {/* Subscription Dialog */}
      <Dialog open={showDialog} onOpenChange={setShowDialog}>
        <DialogContent className='bg-zinc-800 text-white border-zinc-700'>
          <DialogHeader>
            <DialogTitle className='text-xl'>
              Choose Subscription Plan
            </DialogTitle>
          </DialogHeader>

          <div className='py-4'>
            <RadioGroup
              defaultValue={selectedPlan || undefined}
              onValueChange={setSelectedPlan}
            >
              <div className='flex items-center space-x-2 mb-4'>
                <RadioGroupItem value='basic' id='basic' />
                <Label htmlFor='basic' className='text-white'>
                  Basic Plan - Free
                </Label>
              </div>
              <div className='flex items-center space-x-2'>
                <RadioGroupItem value='premium' id='premium' />
                <Label htmlFor='premium' className='text-white'>
                  Premium Plan - 4.9 /month (39€/year)
                </Label>
              </div>
            </RadioGroup>
          </div>

          <DialogFooter className='flex gap-2 sm:justify-end'>
            <Button
              variant='outline'
              onClick={() => setShowDialog(false)}
              className='bg-transparent border-zinc-600 text-white hover:bg-zinc-700 hover:text-white'
            >
              Cancel
            </Button>
            <Button
              onClick={confirmSubscription}
              className='bg-cyan-400 hover:bg-cyan-500 text-zinc-800'
              disabled={!selectedPlan}
            >
              Confirm
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
