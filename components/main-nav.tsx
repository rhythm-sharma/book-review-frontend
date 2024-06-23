"use client";

import * as React from "react";
import Link from "next/link";

export function MainNav() {
  return (
    <div className="flex gap-6 md:gap-10">
      <Link href="/dashboard" className="items-center space-x-2 flex">
        <span className="font-bold text-white	 sm:inline-block">
          {"Book Tracker"}
        </span>
      </Link>
    </div>
  );
}
