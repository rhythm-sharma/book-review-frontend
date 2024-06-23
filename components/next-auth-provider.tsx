"use client";

import { useAppDispatch } from "@/hooks/store";
import { setToken } from "@/lib/slices/authSlice";
import { SessionProvider } from "next-auth/react";
import { useEffect } from "react";

type Props = {
  token: any;
  user: any;
  children?: React.ReactNode;
};

export const NextAuthProvider = ({ children, user, token }: Props) => {
  const dispatch = useAppDispatch();
  dispatch(setToken(token));

  useEffect(() => {
    if (user?.email) {
      localStorage.setItem("user", JSON.stringify(user));
    }
  }, [user]);

  return <SessionProvider>{children}</SessionProvider>;
};
