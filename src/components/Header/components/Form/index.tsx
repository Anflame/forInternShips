import { FC, useState} from "react";
import { useDispatch } from "react-redux";
import { selectName, selectPage } from "src/store/select/slice";
import { Authors } from "./components/Authors";
import { Created } from "./components/Created";
import { Locations } from "./components/Location";
import style from './Form.module.scss';

export const Form: FC = () => {
    const [selectedName, setSelectedName] = useState('');
    const dispatch = useDispatch();


    const handeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSelectedName(e.target.value);
        dispatch(selectName(e.target.value));
        dispatch(selectPage(1));
    }

    return (
        <>
            <form className={style.form}>
                <input type="text" value={selectedName} onChange={handeChange} className={style.selectName} placeholder='Name' />
                <Authors />
                <Locations />
                <Created />
            </form>
        </>
    );
}