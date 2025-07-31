"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { ArrowLeft, Youtube, ExternalLink, X } from "lucide-react";
import Image from "next/image";
import { toast } from "sonner";
import {
  useCreateItemMutation,
  useUpdateItemMutation,
  useViewSingleItemQuery,
} from "@/redux/feature/itemAPI";

export default function CreateService() {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [shortTitle, setShortTitle] = useState("");
  const [description, setDescription] = useState("");
  const [externalSourceURL, setExternalSourceURL] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [getServerImage, setGetServerImage] = useState<string | null>(null);

  const params = useParams();
  const slug = params?.slug as string;

  const [updateItemMutation] = useUpdateItemMutation();
  const { data: serviceData } = useViewSingleItemQuery(params?.slug as string);

  console.log(".slug", slug);

  useEffect(() => {
    setTitle(serviceData?.data?.title);
    setShortTitle(serviceData?.data?.shortTitle);
    setDescription(serviceData?.data?.description);
    setExternalSourceURL(serviceData?.data?.external_source_url);
    setGetServerImage(serviceData?.data?.image);
  }, [serviceData]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImage(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async () => {
    const formData = new FormData();
    formData.append("item_id", slug);
    formData.append("title", title);
    if (shortTitle) formData.append("short_title", shortTitle);
    formData.append("description", description);
    formData.append("external_source_url", externalSourceURL);
    if (image) formData.append("image", image);

    try {
      const response = await updateItemMutation(formData).unwrap();

      if (response?.status === "success") {
        toast.success("Item updated successfully!");
        router.push("/services/items/" + slug);
      } else {
        console.error("Failed to update item:", response);
        toast.error("Update failed.");
      }
    } catch (error) {
      console.error("Error creating service:", error);
      toast.error("Something went wrong while updating.");
    }
  };

  // const handleSubmit = async () => {
  //   const formData = new FormData();

  //   formData.append("item_id", slug);
  //   formData.append("title", title);
  //   if (shortTitle) {
  //     formData.append("short_title", shortTitle);
  //   }
  //   formData.append("description", description);
  //   formData.append("external_source_url", externalSourceURL);

  //   if (image) {
  //     formData.append("image", image);
  //   }

  //   try {
  //     const response = await updateItemMutation(formData).unwrap();

  //     if (response?.status === "success") {
  //       toast.success("Item updated successfully!");
  //       router.push("/services");
  //     } else {
  //       console.error("Failed to update item:", response);
  //     }
  //   } catch (error) {
  //     console.error("Error creating service:", error);
  //   }
  // };

  return (
    <div className='bg-black flex items-center justify-center p-4'>
      <div className='w-full max-w-2xl bg-zinc-800 rounded-lg overflow-hidden'>
        <div className='p-4 flex items-center justify-between'>
          <button
            onClick={() => router.back()}
            className='text-white flex items-center hover:text-gray-300 transition-colors'
          >
            <ArrowLeft size={20} className='mr-2' />
            <span>Edit Frequment</span>
          </button>

          <button
            type='submit'
            onClick={handleSubmit}
            className='bg-cyan-400 hover:bg-cyan-500 text-black font-medium px-6 py-2 rounded-full transition-colors'
          >
            Update Item
          </button>
        </div>

        <div className='px-4 pb-6 space-y-4'>
          <input
            type='text'
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className='w-full p-3 bg-zinc-700 border border-zinc-600 rounded text-white'
            required
            placeholder='Enter Item Title'
          />
          {serviceData?.data?.shortTitle && (
            <input
              type='text'
              value={shortTitle}
              onChange={(e) => setShortTitle(e.target.value)}
              className='w-full p-2 bg-zinc-700 border border-zinc-600 rounded text-white'
              required
              placeholder='Enter Item Short Title'
            />
          )}

          {imagePreview ? (
            <div className='relative flex justify-center py-4'>
              <Image
                src={imagePreview}
                alt={title}
                width={190}
                height={190}
                className='object-contain'
              />

              <div>
                <X
                  onClick={() => setImagePreview(null)}
                  className='absolute top-0 right-0 text-white hover:text-gray-300 transition-colors'
                />
              </div>
            </div>
          ) : (
            <div className='flex justify-center py-4'>
              {getServerImage && (
                <Image
                  src={`${process.env.NEXT_PUBLIC_API_URL}${getServerImage}`}
                  alt={title}
                  width={190}
                  height={190}
                  className='object-contain'
                />
              )}
            </div>
          )}
          <input
            type='file'
            accept='image/*'
            onChange={handleImageChange}
            className='w-full p-2 text-white bg-zinc-700 rounded border border-zinc-600 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-cyan-400 file:text-black hover:file:bg-cyan-500'
          />

          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={4}
            className='w-full p-3 bg-zinc-700 border border-zinc-600 rounded text-white resize-none'
            placeholder='Enter Service Description'
          />

          <div className='flex flex-wrap gap-2'>
            <div className='flex items-center bg-zinc-700 rounded overflow-hidden flex-1'>
              <input
                type='url'
                value={externalSourceURL}
                onChange={(e) => setExternalSourceURL(e.target.value)}
                className='p-2 bg-zinc-700 border-none text-white text-sm flex-1 min-w-0 outline-none'
                placeholder='https://example.com/action'
                required
              />
              <button className='p-2 bg-zinc-700 text-white'>
                <ExternalLink size={16} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
