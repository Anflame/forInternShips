import { FC } from "react";
import { Paintings } from "./components/Paintings";
import style from './Main.module.scss';
import mainStyle from '../../index.module.scss';
import { Pagination } from "./components/Pagination";

export const Main: FC = () => {

    return (
        <main className={style.Main}>
            <div className={mainStyle.container}>
                <Paintings />
                <Pagination />
            </div>
        </main> 
    )
}