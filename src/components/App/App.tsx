import { FC, useState } from "react";
import { Provider } from 'react-redux';
import { store } from 'src/store';
import { Header } from '../Header';
import { Main } from "../Main";
import { defaultContext, ThemeContext } from "../../utils/ThemeContext";
import style from './App.module.scss';

export const App: FC = () => {
  
  const [theme, setTheme] = useState(defaultContext.theme);

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  return (
    <Provider store={store}>
      <ThemeContext.Provider
        value={{
          theme,
          toggleTheme,
        }}
      >
        <div className={style.App}>
          <Header />
          <Main />
        </div>
      </ThemeContext.Provider>
    </Provider>
  )
}