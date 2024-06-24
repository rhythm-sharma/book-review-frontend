"use client";

import { useAppDispatch } from "@/hooks/store";
import { setToken, setUser } from "@/lib/slices/authSlice";
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
      dispatch(setUser(user));
    } else {
      // @ts-ignore:next-line
      dispatch(setUser(JSON.parse(localStorage.getItem("user"))));
    }
  }, [dispatch, user]);

  return <SessionProvider>{children}</SessionProvider>;
};
