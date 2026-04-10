"use client"
import { SignIn } from '@clerk/nextjs';
import { dark } from '@clerk/ui/themes';
import { useTheme } from 'next-themes';

export default function SignInPage() {
  const { theme } = useTheme();
  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-4rem)]">
      <SignIn appearance={{
    theme: theme === "light" ? undefined : dark,
  }}/>
    </div>
  )
}
