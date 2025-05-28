import React, { createContext, useContext, useState, useEffect } from 'react';

type ThemeContextType = {
  isDarkMode: boolean;
  toggleTheme: () => void;
  isThemeLoaded: boolean; 
};

const ThemeContext = createContext<ThemeContextType>({
  isDarkMode: true, 
  toggleTheme: () => {},
  isThemeLoaded: false, 
});

export const useTheme = () => useContext(ThemeContext);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [isThemeLoaded, setIsThemeLoaded] = useState(false); 

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      setIsDarkMode(savedTheme === 'dark');
    } else {
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      setIsDarkMode(prefersDark);
    }
    setIsThemeLoaded(true); 
  }, []); 

  useEffect(() => {
    if (isThemeLoaded) { 
      if (isDarkMode) {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
      localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');
    }
  }, [isDarkMode, isThemeLoaded]); 

  const toggleTheme = () => {
    setIsDarkMode(prevMode => !prevMode);
  };

  return (
    <ThemeContext.Provider value={{ isDarkMode, toggleTheme, isThemeLoaded }}> {/* <--- Pass isThemeLoaded */}
      {children}
    </ThemeContext.Provider>
  );
};