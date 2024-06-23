"use client";

import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuCheckboxItem,
} from "@/components/ui/dropdown-menu";
import { Card } from "@/components/ui/card";
import { Icons } from "@/components/icons";
import { Button } from "@/components/ui/button";
import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import { useAppDispatch, useAppSelector } from "@/hooks/store";
import { getBooks } from "@/lib/slices/bookSlice";
import { Badge } from "@/components/ui/badge";
import PaginationSection from "@/components/pagination";
import { Skeleton } from "@/components/ui/skeleton";

export default function Home() {
  const dispatch = useAppDispatch();
  const token = useAppSelector((state) => state.auth.token);
  const { books, isGetBooksLoading } = useAppSelector((state) => state.book);
  const [title, setTitle] = useState("");
  const [filter, setFilter] = useState("");
  const [page, setPage] = useState(0);

  useEffect(() => {
    dispatch(
      getBooks({
        token,
        page: 0,
        title: "",
      })
    );
  }, [dispatch, token]);

  useEffect(() => {
    setPage(0);
    setTitle("");
    dispatch(
      getBooks({
        token,
        page: 0,
        genre: filter,
      })
    );
  }, [dispatch, token, filter]);

  const handleOnTitleSearch = useCallback(() => {
    setPage(0);
    setFilter("");
    dispatch(
      getBooks({
        token,
        page: 0,
        title,
      })
    );
  }, [dispatch, title, token]);

  const onPageChange = useCallback(
    (newPage: number) => {
      setPage(newPage);
      dispatch(
        getBooks({
          token,
          page: newPage,
          ...(title && { title }),
          ...(filter && { genre: filter }),
        })
      );
    },
    [dispatch, filter, title, token]
  );

  return (
    <div>
      <div className="flex items-end gap-2">
        <Input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="grow"
          placeholder="Search books"
        />
        <Button className="gap-1" onClick={handleOnTitleSearch}>
          Search
        </Button>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="gap-1">
              <Icons.listFilter className="h-3.5 w-3.5" />
              <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                Filter
              </span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Genre</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuCheckboxItem
              checked={filter === "Fiction"}
              onCheckedChange={() => setFilter("Fiction")}
            >
              Fiction
            </DropdownMenuCheckboxItem>
            <DropdownMenuCheckboxItem
              checked={filter === "Dystopian"}
              onCheckedChange={() => setFilter("Dystopian")}
            >
              Dystopian
            </DropdownMenuCheckboxItem>
            <DropdownMenuCheckboxItem
              checked={filter === "Classic"}
              onCheckedChange={() => setFilter("Classic")}
            >
              Classic
            </DropdownMenuCheckboxItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <>
        {isGetBooksLoading ? (
          <>
            <div className="mt-5">
              <div className="grid gap-8">
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  <Skeleton className="h-[100px] w-[250px]" />
                  <Skeleton className="h-[100px] w-[250px]" />
                  <Skeleton className="h-[100px] w-[250px]" />
                  <Skeleton className="h-[100px] w-[250px]" />
                  <Skeleton className="h-[100px] w-[250px]" />
                  <Skeleton className="h-[100px] w-[250px]" />
                  <Skeleton className="h-[100px] w-[250px]" />
                  <Skeleton className="h-[100px] w-[250px]" />
                  <Skeleton className="h-[100px] w-[250px]" />
                </div>
              </div>
            </div>
          </>
        ) : (
          <>
            <div className="mt-5">
              <div className="grid gap-8">
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {books?.rows?.length > 0 &&
                    books?.rows?.map((book) => {
                      return (
                        <Card key={book.bookId} className="p-4">
                          <div className="flex-1 grid gap-2">
                            <div className="flex items-center justify-between">
                              <h3 className="font-bold text-lg line-clamp-1 hover:underline">
                                <Link href={`/dashboard/${book.bookId}`}>
                                  {book.title}
                                </Link>
                              </h3>
                            </div>
                            <p className="text-muted-foreground line-clamp-2">
                              {book.author}
                            </p>
                            <p className="text-sm line-clamp-3">
                              {book.description}
                            </p>
                          </div>
                          {book?.genre && (
                            <Badge className="mt-4" variant="outline">
                              {book.genre}
                            </Badge>
                          )}
                        </Card>
                      );
                    })}
                </div>
              </div>
            </div>
            <div className="my-10">
              <PaginationSection
                currentPage={page}
                onPageChange={onPageChange}
                totalPages={books?.totalPages}
              />
            </div>
          </>
        )}
      </>
    </div>
  );
}
