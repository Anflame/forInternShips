import { FC } from "react";
import { Form } from "./components/Form";
import { LogoAndTheme } from "./components/LogoAndTheme";
import style from './Header.module.scss';
import main from '../../index.module.scss';

export const Header: FC = () => {
    return (
        <header className={style.header}>
            <div className={main.container}>
                <LogoAndTheme />
                <Form />
            </div>
        </header>
    );
}