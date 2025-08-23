'use client';
import { useEffect, useState } from 'react';
import { Moon, Sun } from 'lucide-react';

export default function ThemeToggleClient() {
  const [mounted, setMounted] = useState(false);
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    setMounted(true);
    const saved = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const active = saved ? saved === 'dark' : prefersDark;
    setIsDark(active);
    document.documentElement.classList.toggle('dark', active);
  }, []);

  if (!mounted) return null; // prevents hydration mismatch

  const toggleTheme = () => {
    const next = !isDark;
    setIsDark(next);
    document.documentElement.classList.toggle('dark', next);
    localStorage.setItem('theme', next ? 'dark' : 'light');
  };

  return (
    <button onClick={toggleTheme}>
      {isDark ? <Sun /> : <Moon />}
      {isDark ? 'Light Mode' : 'Dark Mode'}
    </button>
  );
}
