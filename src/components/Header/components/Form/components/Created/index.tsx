import React, {  FC, useEffect, useState } from "react";
import style from '../../Form.module.scss';
import styleCreated from './Created.module.scss';
import { useDispatch } from "react-redux";
import { selectDateFrom, selectDateTo, selectPage } from "src/store/select/slice";


export const Created: FC = () => {
    const [show, setShow] = useState(false);
    const [to, setTo] = useState('');
    const [from, setFrom] = useState('');
    const dispachSelect = useDispatch();

    const handeClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault();
        setShow(!show);
    }
    
    const handleSelectClickFrom = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFrom(e.target.value);
        dispachSelect(selectDateFrom(e.target.value));
    }
    const handleSelectClickTo = (e: React.ChangeEvent<HTMLInputElement>) => {
        setTo(e.target.value);
        dispachSelect(selectDateTo(e.target.value));
    }
    useEffect(() => {
        dispachSelect(selectPage(1));
    }, [dispachSelect]);

    return (
        <>
            <div className={style.select}>
                {!show && <div className={style.title}>
                    Created
                    
                    <div className={style.btnsWrapp}>
                        <button className={style.btn} onClick={handeClick}>
                            <svg width="10" height="6" viewBox="0 0 10 6" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M9.67861 1.8337L5.77064 5.68539C5.34503 6.10487 4.65497 6.10487 4.22936 5.68539L0.321394 1.8337C-0.365172 1.15702 0.121082 -8.3659e-08 1.09203 0L8.90797 6.73452e-07C9.87892 7.57113e-07 10.3652 1.15702 9.67861 1.8337Z" fill="black"/>
                            </svg>
                            </button>
                    </div>
                </div>
                }    
                {show &&
                    <>
                    <div className={style.selectedTitle}>
                        Created
                        <div className={style.btnsWrapp}>
                        <button className={style.btn} onClick={handeClick}>
                            <svg width="10" height="6" viewBox="0 0 10 6" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M9.67861 1.8337L5.77064 5.68539C5.34503 6.10487 4.65497 6.10487 4.22936 5.68539L0.321394 1.8337C-0.365172 1.15702 0.121082 -8.3659e-08 1.09203 0L8.90797 6.73452e-07C9.87892 7.57113e-07 10.3652 1.15702 9.67861 1.8337Z" fill="black"/>
                            </svg>
                            </button>
                        </div>
                    </div>
                    <div className={styleCreated.listCreated}>
                        <input type="text" className={styleCreated.input} value={from} placeholder='from' onChange={handleSelectClickFrom} />
                        <div className={styleCreated.hyphen}></div>
                        <input type="text" className={styleCreated.input} value={to} placeholder='to' onChange={handleSelectClickTo} />
                    </div>
                </>}
            </div>
        </>
    );
}