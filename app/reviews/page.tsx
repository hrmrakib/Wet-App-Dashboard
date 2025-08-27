"use client";

import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Search,
  Mail,
  Phone,
  Calendar,
  CheckCircle,
  Clock,
  X,
} from "lucide-react";
import { useGetReviewsQuery } from "@/redux/feature/reviewAPI";
import { FadeLoader } from "react-spinners";

interface Query {
  id: number;
  name: string;
  email: string;
  phone: string;
  query: string;
  sent: boolean;
  created_on: string;
  user: number;
}

export default function QueriesTable() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentText, setCurrentText] = useState("");
  const { data: reviews, isLoading } = useGetReviewsQuery({});

  const handleShowMore = (text: string) => {
    setCurrentText(text);
    setIsModalOpen(true);
  };

  if (isLoading) {
    return (
      <div className='flex items-center justify-center py-12'>
        <FadeLoader color='#36d7b7' />
      </div>
    );
  }

  return (
    <div>
      <h2 className='text-2xl text-[#fff] text-center py-6'>Customer Query </h2>
      <Card className='border-border bg-transparent m-6'>
        <CardContent>
          <div className='rounded-md border border-border overflow-hidden'>
            <Table>
              <TableHeader className='!bg-[#000000]'>
                <TableRow className='bg-[#1b1b1b59]'>
                  <TableHead className='text-[#fff] text-lg font-semibold'>
                    ID
                  </TableHead>
                  <TableHead className='text-[#fff] text-lg font-semibold'>
                    Customer
                  </TableHead>
                  <TableHead className='text-[#fff] text-lg font-semibold'>
                    Query
                  </TableHead>
                  <TableHead className='text-[#fff] text-lg font-semibold'>
                    Status
                  </TableHead>
                  <TableHead className='text-[#fff] text-lg font-semibold'>
                    Date
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {reviews?.data?.map((query: Query) => (
                  <TableRow key={query.id} className='hover:bg-muted/30 h-auto'>
                    <TableCell className='text-base text-[#fffc]'>
                      #{query.id}
                    </TableCell>
                    <TableCell>
                      <div className='space-y-1'>
                        <div className='font-medium text-base text-[#fffc]'>
                          {query?.name}
                        </div>
                        <div className='flex items-center gap-1 text-base text-[#fffc]'>
                          <Mail className='h-3 w-3' />
                          {query?.email}
                        </div>
                        {query?.phone && (
                          <div className='flex items-center gap-1 text-base text-[#fffc]'>
                            <Phone className='h-3 w-3 text-[#fffc]' />
                            {query?.phone}
                          </div>
                        )}
                      </div>
                    </TableCell>
                    <TableCell className='max-w-'>
                      <div className='text-base text-[#fffc] line-clamp-2 text-wrap'>
                        {query?.query.length >= 50 ? (
                          <p>
                            {query?.query}{" "}
                            <button
                              className='hover:underline'
                              onClick={() => handleShowMore(query?.query)}
                            >
                              show more
                            </button>
                          </p>
                        ) : (
                          query?.query || "No query provided"
                        )}
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge
                        variant={query.sent ? "default" : "secondary"}
                        className={
                          query.sent
                            ? "bg-accent text-accent-foreground"
                            : "bg-muted text-muted-foreground"
                        }
                      >
                        {query.sent ? "Answered" : "Pending"}
                      </Badge>
                    </TableCell>
                    <TableCell className='font-mono text-base text-[#fffc]'>
                      {query?.created_on.slice(0, 10)}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          {reviews?.data?.length === 0 && (
            <div className='text-center py-8 text-muted-foreground'>
              No queries found matching your criteria.
            </div>
          )}
        </CardContent>
      </Card>

      {isModalOpen && (
        <div className='fixed inset-0 z-50 flex items-center justify-center bg-black/50 overflow-auto'>
          <div className='relative w-full max-w-xl rounded-md bg-[#000000] px-6 py-6 shadow-lg'>
            <button
              onClick={() => setIsModalOpen(false)}
              className='absolute right-3 top-2 text-gray-300 hover:text-gray-100'
            >
              <X className='h-5 w-5' />
              <span className='sr-only'>Close</span>
            </button>

            <div className='p-6'>
              <p className='text-[#fffc] leading-loose whitespace-pre-wrap'>
                {currentText}
              </p>
            </div>

            <Button
              onClick={() => setIsModalOpen(false)}
              className='mt-6 w-full bg-[#45b1b4] hover:bg-[#5ce1e6b7] disabled:cursor-wait'
            >
              Okay
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
