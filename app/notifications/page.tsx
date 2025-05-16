"use client";

import { ArrowLeft, Bell } from "lucide-react";
import Link from "next/link";
import { useState, useEffect } from "react";

type Notification = {
  id: string;
  type: "payment" | "user_registered";
  message: string;
  timestamp: string;
  read: boolean;
  highlighted?: boolean;
};

export default function NotificationsList() {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate fetching notifications from an API
    const fetchNotifications = async () => {
      // In a real app, this would be an API call
      await new Promise((resolve) => setTimeout(resolve, 500));

      setNotifications([
        {
          id: "1",
          type: "payment",
          message: "You Have Received $500 From John Doe",
          timestamp: "Fri, 12:30pm",
          read: false,
          highlighted: true,
        },
        {
          id: "2",
          type: "user_registered",
          message: "New User Registered.",
          timestamp: "Fri, 12:30pm",
          read: false,
        },
        {
          id: "3",
          type: "user_registered",
          message: "New User Registered.",
          timestamp: "Fri, 12:30pm",
          read: false,
        },
        {
          id: "4",
          type: "user_registered",
          message: "New User Registered.",
          timestamp: "Fri, 12:30pm",
          read: false,
        },
      ]);

      setLoading(false);
    };

    fetchNotifications();
  }, []);

  const markAsRead = (id: string) => {
    setNotifications((prev) =>
      prev.map((notification) =>
        notification.id === id ? { ...notification, read: true } : notification
      )
    );
  };

  if (loading) {
    return (
      <div className='flex justify-center items-center py-20'>
        <div className='animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-gray-200'></div>
      </div>
    );
  }

  return (
    <div className='px-5'>
      <div className='min-h-[800px] bg-[#333333] text-white rounded-2xl'>
        <div className='p-4'>
          <header className='flex items-center mb-6'>
            <Link
              href='/'
              className='text-[#E6E6E6] hover:text-white transition-colors'
            >
              <ArrowLeft className='w-6 h-6' />
            </Link>
            <h1 className='ml-4 text-xl font-medium text-[#E6E6E6]'>
              Notifications
            </h1>
          </header>

          <div className='space-y-4'>
            {notifications.map((notification) => (
              <div
                key={notification.id}
                className={`w-full flex items-start p-4 rounded-lg transition-colors ${
                  notification.highlighted
                    ? "bg-[#5CE1E6]"
                    : "hover:bg-gray-700"
                } ${notification.read ? "opacity-70" : ""}`}
                onClick={() => markAsRead(notification.id)}
              >
                <div
                  className={`p-2 rounded-full border border-[#5CE1E6] ${
                    notification.highlighted
                      ? "bg-cyan-500/30 text-[#275F61]"
                      : "bg-gray-700 text-gray-400"
                  }`}
                >
                  <Bell
                    className={`w-5 h-5 ${
                      notification.highlighted
                        ? "text-[#FFF]"
                        : "text-[#5CE1E6]"
                    }`}
                  />
                </div>
                <div className='ml-4 flex-1'>
                  <p
                    className={`font-semibold ${
                      notification.highlighted ? "text-[#275F61]" : ""
                    }`}
                  >
                    {notification.message}
                  </p>
                  <p
                    className={`text-sm font-semibold text-[#E6E6E6] mt-1 ${
                      notification.highlighted ? "text-[#275F61]" : ""
                    }`}
                  >
                    {notification.timestamp}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
