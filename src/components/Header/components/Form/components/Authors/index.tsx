import { FC, useEffect, useState } from "react";
import style from "../../Form.module.scss";
import { AuthorsState, IAuthors } from "src/store/authors/types";
import { useDispatch, useSelector } from "react-redux";
import { StoreState } from "src/store";
import { PayloadAction, ThunkDispatch } from "@reduxjs/toolkit";
import { fetchDataAuthors } from "src/store/authors/slice";
import { selectAuthor, selectPage } from "src/store/select/slice";


export const Authors: FC = () => {
    const [show, setShow] = useState(false);
    const [selectedAuthor, setSelectedAuthor] = useState('Author');

    const loading = useSelector((state: StoreState) => state.authors.loading);
    const error = useSelector((state: StoreState) => state.authors.error);
    const authors = useSelector((state: StoreState) => state.authors.authors);
    const selectedAuthorAction = useSelector((state: StoreState) => state.select.author);


    const dispatch = useDispatch<
        ThunkDispatch<AuthorsState, void, PayloadAction<IAuthors[]>>
        >();
    const dispatchSelect = useDispatch();

    useEffect(() => {
        dispatch(fetchDataAuthors());
    }, [dispatch]);
    
    const handeClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault();
        setShow(!show);
    }

    const handeChangeAuthor = (authorName: string, authorId: number) => {
        setSelectedAuthor(authorName);
        dispatchSelect(selectAuthor(authorId));
        dispatchSelect(selectPage(1));
        setShow(false);
    }

    const handleDeleteAuthor = () => {
        dispatchSelect(selectAuthor(0));
        setSelectedAuthor('Authors');
    }

    return (
        <div className={style.select}>
            {!show && 
            <div className={style.title}>
                <span>{selectedAuthor}</span>
                    {error && <p>{error}</p>}
                    <div className={style.btnsWrapp}>
                            {selectedAuthorAction !== 0 && 
                                <div className={style.deleteSelected} onClick={handleDeleteAuthor}>+</div>
                            }
                        <button className={style.btn} onClick={handeClick}>
                            <svg width="10" height="6" viewBox="0 0 10 6" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M9.67861 1.8337L5.77064 5.68539C5.34503 6.10487 4.65497 6.10487 4.22936 5.68539L0.321394 1.8337C-0.365172 1.15702 0.121082 -8.3659e-08 1.09203 0L8.90797 6.73452e-07C9.87892 7.57113e-07 10.3652 1.15702 9.67861 1.8337Z" fill="black"/>
                            </svg>
                        </button>
                    </div>
            </div>
            }
            {show && <>
            <div className={style.selectedTitle}>
                <span>{selectedAuthor}</span>
                {error && <p>{error}</p>}
                    <div className={style.btnsWrapp}>
                        <button className={style.btn} onClick={handeClick}>
                            <svg width="10" height="6" viewBox="0 0 10 6" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M9.67861 1.8337L5.77064 5.68539C5.34503 6.10487 4.65497 6.10487 4.22936 5.68539L0.321394 1.8337C-0.365172 1.15702 0.121082 -8.3659e-08 1.09203 0L8.90797 6.73452e-07C9.87892 7.57113e-07 10.3652 1.15702 9.67861 1.8337Z" fill="black"/>
                            </svg>
                        </button>
                    </div>
            </div>
            <div className={style.list}>
                {!loading && (authors.map((author) =>
                    <div className={style.listes} key={author.id} onClick={() => handeChangeAuthor( author.name, author.id )}> {author.name} </div>
                ))}
            </div>
            </>}
        </div>
    );
        
};