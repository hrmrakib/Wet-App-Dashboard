"use client";

import type React from "react";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, AlertCircle, Eye, EyeOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useUpdatePasswordMutation } from "@/redux/feature/settingAPI";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export default function ChangePasswordPage() {
  const [formData, setFormData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState("");
  const [updatePassword] = useUpdatePasswordMutation();
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setError("");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Basic validation
    if (
      !formData.currentPassword ||
      !formData.newPassword ||
      !formData.confirmPassword
    ) {
      setError("All fields are required");
      return;
    }

    if (formData.newPassword !== formData.confirmPassword) {
      setError("New password and confirm password do not match");
      return;
    }

    const res = await updatePassword({
      old_password: formData.currentPassword,
      new_password: formData.newPassword,
      confirm_password: formData.confirmPassword,
    }).unwrap();

    if (res.status === "success") {
      toast.success("Password updated successfully");
      router.push("/setting");
    } else {
      toast.error(res?.message || "Failed to update password");
    }

    // Reset form after successful submission
    setFormData({
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    });
  };

  return (
    <div className='flex min-h-screen bg-[#000]'>
      <div className='flex-1 w-full'>
        <main className='w-full p-4 md:p-6'>
          <div className='max-w-3xl mx-auto'>
            <div className='mb-6'>
              <Link
                href='/setting'
                className='inline-flex items-center text-[#E6E6E6] hover:text-[#5CE1E6]'
              >
                <ArrowLeft className='mr-2 h-6 w-6' />
                <span className='text-2xl text-[#E6E6E6] hover:text-[#5CE1E6] font-semibold'>
                  Change Password
                </span>
              </Link>
            </div>

            <form onSubmit={handleSubmit} className='space-y-4'>
              {error && (
                <Alert variant='destructive'>
                  <AlertCircle className='h-6 w-6' />
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}

              <div className='space-y-2 bg-[#333333] rounded-xl p-6'>
                <Label
                  htmlFor='currentPassword'
                  className='text-lg font-medium text-[#E6E6E6]'
                >
                  Current Password
                </Label>
                <div className='relative'>
                  <Input
                    id='currentPassword'
                    name='currentPassword'
                    type={showCurrentPassword ? "text" : "password"}
                    value={formData.currentPassword}
                    onChange={handleChange}
                    className='text-lg font-medium text-[#E6E6E6] bg-transparent border'
                  />
                  <button
                    type='button'
                    className='absolute right-3 top-1/2 -translate-y-1/2 text-[#E6E6E6]'
                    onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                  >
                    {showCurrentPassword ? (
                      <EyeOff size={18} />
                    ) : (
                      <Eye size={18} />
                    )}
                  </button>
                </div>
              </div>

              <div className='space-y-2 bg-[#333333] rounded-xl p-6'>
                <Label
                  htmlFor='newPassword'
                  className='text-lg font-medium text-[#E6E6E6]'
                >
                  New Password
                </Label>
                <div className='relative'>
                  <Input
                    id='newPassword'
                    name='newPassword'
                    type={showNewPassword ? "text" : "password"}
                    value={formData.newPassword}
                    onChange={handleChange}
                    className='text-lg font-medium text-[#E6E6E6] bg-transparent border'
                  />
                  <button
                    type='button'
                    className='absolute right-3 top-1/2 -translate-y-1/2 text-[#E6E6E6]'
                    onClick={() => setShowNewPassword(!showNewPassword)}
                  >
                    {showNewPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>

              <div className='space-y-2 bg-[#333333] rounded-xl p-6'>
                <Label
                  htmlFor='confirmPassword'
                  className='text-lg font-medium text-[#E6E6E6]'
                >
                  Confirm New Password
                </Label>
                <div className='relative'>
                  <Input
                    id='confirmPassword'
                    name='confirmPassword'
                    type={showConfirmPassword ? "text" : "password"}
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    className='text-lg font-medium text-[#E6E6E6] bg-transparent border'
                  />
                  <button
                    type='button'
                    className='absolute right-3 top-1/2 -translate-y-1/2 text-lg font-medium text-[#E6E6E6]'
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  >
                    {showConfirmPassword ? (
                      <EyeOff size={18} />
                    ) : (
                      <Eye size={18} />
                    )}
                  </button>
                </div>
              </div>

              <div className='pt-2 flex items-center justify-end'>
                <Button
                  type='submit'
                  className='bg-[#5CE1E6] hover:bg-teal-700 text-lg font-semibold text-[#275F61]'
                >
                  Update Password
                </Button>
              </div>
            </form>
          </div>
        </main>
      </div>
    </div>
  );
}
