import { PayloadAction, ThunkDispatch } from "@reduxjs/toolkit";
import { FC, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { StoreState } from "src/store";
import { fetchDataPaintings } from "src/store/paintings/slice";
import { IPaintings, PaintingsState } from "src/store/paintings/types";
import { selectActionAuthor, selectActionDateFrom, selectActionDateTo, selectActionLimit, selectActionLocation, selectActionName, selectActionPage } from "src/store/select/selectors";
import style from './Paintings.module.scss';


export const Paintings: FC = () => {
    let count = 0;
    const loading = useSelector((state: StoreState) => state.paintings.loading);
    const error = useSelector((state: StoreState) => state.paintings.error);
    const paintings = useSelector((state: StoreState) => state.paintings.paintings);
    
    const authors = useSelector((state: StoreState) => state.authors.authors);
    const locations = useSelector((state: StoreState) => state.locations.locations);
    const authorsLoading = useSelector((state: StoreState) => state.authors.loading);
    const locationsLoading = useSelector((state: StoreState) => state.locations.loading);
    

    const dispatch = useDispatch<
        ThunkDispatch<PaintingsState, void, PayloadAction<IPaintings[]>>
        >();

    const selectedName = useSelector(selectActionName) || false;
    const selectedAuthor = useSelector(selectActionAuthor) || false;
    const selectedLocation = useSelector(selectActionLocation) || false;
    const selectedDateFrom = useSelector(selectActionDateFrom) || false;
    const selectedDateTo = useSelector(selectActionDateTo) || false;
    const currentPage = useSelector(selectActionPage);
    const currentLimit = useSelector(selectActionLimit);

    let ApiWithFilter: string = `_page=${currentPage}&_limit=${currentLimit}`;

    if (selectedName || selectedAuthor || selectedLocation || selectedDateFrom || selectedDateTo) {
        ApiWithFilter += 'q=';
        ApiWithFilter += selectedName !== false ? `&name=${selectedName}` : ``;
        ApiWithFilter += selectedAuthor !== false ? `&authorId=${selectedAuthor}` : ``;
        ApiWithFilter += selectedLocation !== false ? `&locationId=${selectedLocation}` : ``;
        ApiWithFilter += selectedLocation !== false ? `&locationId=${selectedLocation}` : ``;
        ApiWithFilter += selectedDateFrom !== false ? `&created_gte=${selectedDateFrom}` : ``;
        ApiWithFilter += selectedDateTo !== false ? `&created_lte=${selectedDateTo}` : ``;
    }

      
    useEffect(() => {
        dispatch(fetchDataPaintings(ApiWithFilter));
    }, [dispatch,
        selectedName,
        selectedAuthor,
        selectedLocation,
        selectedDateFrom,
        selectedDateTo,
        currentPage,
        ApiWithFilter,
    ]);


    return (
        <>
            <ul className={style.paintingsList}>
                {(!loading && paintings.map((painting) => {
                    count++;
                    return (<li key={painting.id} className={style.paintingsListes}>
                        <img src={`./images/pic${count}.jpg`} alt={painting.name} className={style.paintingsImg} />
                        <div className={style.additionalInfo}>
                            <h3 className={style.additionalInfoHeading}>{painting.name}</h3>
                            <div className={style.additionalFullInfo}>
                                {(!authorsLoading && !locationsLoading) &&
                                    <>
                                        <p className={style.additionalInfoText}><span className={style.additionalInfoTextСaption}>Author: </span>{authors.filter((author) => author.id === painting.authorId)[0].name}</p>
                                        <p className={style.additionalInfoText}><span className={style.additionalInfoTextСaption}>Created: </span>{painting.created}</p>
                                        <p className={style.additionalInfoText}><span className={style.additionalInfoTextСaption}>Location: </span>{locations.filter((location) => location.id === painting.locationId)[0].location}</p>
                                    </>}
                            </div>
                        </div>
                    </li>)
                }))}
                {error && <p>{error}</p>}
            </ul>
        </>
    );
};