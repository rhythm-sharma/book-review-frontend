"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useAppDispatch, useAppSelector } from "@/hooks/store";
import { getReviewsByBookId, submitBookReview } from "@/lib/slices/bookSlice";
import { useToast } from "@/components/ui/use-toast";
import { Icons } from "./icons";

const profileFormSchema = z.object({
  review: z.string().max(300).min(10),
  rating: z.string({
    required_error: "Please select rating.",
  }),
});

type ProfileFormValues = z.infer<typeof profileFormSchema>;

const defaultValues: Partial<ProfileFormValues> = {
  review: "",
};

export default function SubmitReview({ bookId }: any) {
  const { toast } = useToast();
  const dispatch = useAppDispatch();
  const token = useAppSelector((state) => state.auth.token);
  const { isReviewSubmitLoading } = useAppSelector((state) => state.book);

  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileFormSchema),
    defaultValues,
    mode: "onChange",
  });

  async function onSubmit(data: ProfileFormValues) {
    const user = JSON.parse(localStorage.getItem("user"));

    await dispatch(
      submitBookReview({
        token,
        bookId,
        email: user?.email,
        review: data.review,
        rating: data.rating,
      })
    );

    await dispatch(
      getReviewsByBookId({
        token,
        bookId,
      })
    );

    toast({
      description: "Review added successfully",
    });
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="review"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Review</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Type your review here."
                  className="resize-none"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="rating"
          render={({ field }) => (
            <FormItem className="w-[200px]">
              <FormLabel>Rating</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select rating" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="1">1</SelectItem>
                  <SelectItem value="2">2</SelectItem>
                  <SelectItem value="3">3</SelectItem>
                  <SelectItem value="4">4</SelectItem>
                  <SelectItem value="5">5</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button disabled={isReviewSubmitLoading} type="submit">
          {isReviewSubmitLoading ? (
            <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
          ) : null}
          Save
        </Button>
      </form>
    </Form>
  );
}
