import React from 'react';

interface ThemeContextType {
  theme: string;
  toggleTheme?: () => void;
}

export const defaultContext: ThemeContextType = {
  theme: 'light',
};

export const ThemeContext = React.createContext<ThemeContextType>(defaultContext);