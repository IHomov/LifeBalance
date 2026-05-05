import React, { createContext, useState } from 'react';

// Create a context for the theme
export const ThemeContext = createContext();

//colors for light and dark themes
export const lightTheme = {
  background: '#F7FAFC',
  text: '#2D3748',
  card: '#FFFFFF',
  accent: '#4A90E2',
};

export const darkTheme = {
  background: '#1A202C',
  text: '#F7FAFC',
  card: '#2D3748',
  accent: '#63B3ED',
};

export const ThemeProvider = ({ children }) => {
    const [isDark, setIsDark] = useState(false);

    const toggleTheme = () => {
        setIsDark(!isDark);
    };

    const theme = isDark ? darkTheme : lightTheme;

    return (
    <ThemeContext.Provider value={{ isDark, theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

