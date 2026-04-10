"use client";

import { Map, MessageSquare, Sparkle } from "lucide-react";
import Link from "next/link";
import ThemeToggle from "./theme-toggle";
import { SignInButton, Show, UserButton } from "@clerk/nextjs";
import { Button } from "./ui/button";


const Navbar = () => {
  return (
    <nav className="border-b bg-background ">
      <div className="container mx-auto flex h-16 items-center justify-between px-6">
        <div className="flex item-center gap-6">
          <Link href="/" className="flex item-center gap-2">
            <div className="flex item-center gap-2">
              <div className="h-8 w-8 roundedlg bg-linear-to-r from-blue-500 to-purple-500 flex items-center justify-center ">
                {" "}
                <Sparkle className="h-4 w-4 text-white" />
              </div>
              <span className="text-xl font-bold">Feedback Fusion</span>
            </div>
          </Link>
          <Link
            href="/roadmap"
            className="text-sm hover:text-primary flex items-center gap-1"
          >
            <Map className="h-4 w-4" /> Roadmap
          </Link>

          <Link
            href="/roadmap"
            className="text-sm hover:text-primary flex items-center gap-1"
          >
            <MessageSquare className="h-4 w-4" /> Feedback
          </Link>
        </div>

        <div className="flex items-center gap-4">
          <ThemeToggle />
          <Show when="signed-out">
            <SignInButton>
              <Button><Link href="/sign-in">Sign in</Link></Button>
            </SignInButton>
          </Show>
          <Show when="signed-in">
            <UserButton />
          </Show>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
