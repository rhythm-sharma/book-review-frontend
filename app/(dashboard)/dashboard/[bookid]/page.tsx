"use client";
import React, { useEffect, useMemo } from "react";
import { Icons } from "@/components/icons";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Ratings from "@/components/ratings";
import { useAppDispatch, useAppSelector } from "@/hooks/store";
import { getBookById, getReviewsByBookId } from "@/lib/slices/bookSlice";
import SubmitReview from "@/components/submit-review";
import { Skeleton } from "@/components/ui/skeleton";

interface BookDetailProps {
  params: { bookid: string };
}

export default function BookDetail({ params }: BookDetailProps) {
  const dispatch = useAppDispatch();
  const token = useAppSelector((state) => state.auth.token);
  const { book, isGetBookByIdLoading, reviews } = useAppSelector(
    (state) => state.book
  );

  useEffect(() => {
    dispatch(
      getBookById({
        token,
        bookId: params.bookid,
      })
    );
    dispatch(
      getReviewsByBookId({
        token,
        bookId: params.bookid,
      })
    );
  }, [dispatch, token, params.bookid]);

  const isReviewSubmitted = useMemo(() => {
    // @ts-ignore:next-line
    const user = JSON.parse(localStorage.getItem("user"));
    return reviews.some((item: any) => item?.user?.email === user?.email);
  }, [reviews]);

  const ratingvalue = useMemo(() => {
    if (reviews.length > 0) {
      return (
        reviews
          .map(({ rating }) => rating)
          .reduce((sum, currentValue) => sum + currentValue, 0) /
        reviews?.length
      );
    } else {
      return 0;
    }
  }, [reviews]);

  return (
    <div className="">
      {isGetBookByIdLoading ? (
        <Skeleton className="h-[100px] w-[100%]" />
      ) : (
        <div className="flex flex-col gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
              {book?.title}
            </h1>
            <p className="text-muted-foreground text-lg font-medium">
              by {book?.author}
            </p>
          </div>
          <div className="prose max-w-none">
            <p>{book?.description}</p>
          </div>
        </div>
      )}
      {/* card  */}
      <div className="mt-[100px]">
        <div className="text-center">
          <h1 className="text-lg font-bold tracking-tight sm:text-xl">
            Reviews
          </h1>
          <div className="flex justify-center">
            <Ratings value={ratingvalue} count={reviews?.length || ""} />
          </div>
        </div>
        <div className="flex flex-col gap-4">
          {reviews.length > 0 &&
            reviews.map((review: any) => (
              <div
                key={review.reviewId}
                className="flex items-center gap-4 text-sm"
              >
                <Avatar>
                  <AvatarImage src={review?.user?.profileImage} />
                  <AvatarFallback>
                    {review?.user?.name.charAt(0)}
                  </AvatarFallback>
                </Avatar>
                <div className="flex flex-col gap-2">
                  <span className="font-bold">{review?.user?.name}</span>
                  <div className="flex items-center gap-0.5">
                    {[...Array(review.rating).keys()].map((i) => (
                      <Icons.star key={i} className="w-5 h-5 fill-yellow-500" />
                    ))}
                  </div>
                  <p>{review?.review}</p>
                </div>
              </div>
            ))}
        </div>
      </div>
      {/*  Reviews */}
      {!isReviewSubmitted ? (
        <div className="mt-[100px]">
          <div className="text-center">
            <h1 className="text-lg font-bold tracking-tight sm:text-xl">
              Submit Your Review
            </h1>
            <div className="text-sm text-muted-foreground">
              Your feedback helps us improve our product.
            </div>
          </div>
          <div className="p-5">
            <SubmitReview bookId={params.bookid} />
          </div>
        </div>
      ) : null}
    </div>
  );
}
