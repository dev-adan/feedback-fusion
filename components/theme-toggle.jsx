"use client"

import { useTheme } from 'next-themes'
import { useState, useEffect } from 'react'
import { Button } from './ui/button'
import { Sun } from 'lucide-react';
import { Moon } from 'lucide-react';

const ThemeToggle = () => {
    const { theme, setTheme } = useTheme();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) {
        return (
            <Button variant="ghost" size='icon'> 
                <span className="relative inline-flex w-5 h-5 mr-2">
                    <Sun className="absolute inset-0 m-auto h-4 w-4" />
                </span>
                <span className="sr-only">Toggle Theme</span>
            </Button>
        );
    }

    return (
        <Button variant="ghost" size='icon' onClick={() => setTheme(theme === "light" ? "dark" : "light")}> 
            <span className="relative inline-flex w-5 h-5 mr-2">
                <Sun className={`absolute inset-0 m-auto h-4 w-4 transition-all duration-200 ${theme === 'dark' ? 'opacity-0 rotate-90 scale-75' : 'opacity-100 rotate-0 scale-100'}`} />
                <Moon className={`absolute inset-0 m-auto h-4 w-4 transition-all duration-200 ${theme === 'dark' ? 'opacity-100 rotate-0 scale-100' : 'opacity-0 -rotate-90 scale-75'}`} />
            </span>
            <span className="sr-only">Toggle Theme</span>
        </Button>
    )
}

export default ThemeToggle