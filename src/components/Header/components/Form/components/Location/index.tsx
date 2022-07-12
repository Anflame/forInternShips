import { PayloadAction, ThunkDispatch } from "@reduxjs/toolkit";
import React, { FC, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { StoreState } from "src/store";
import { fetchDataLocations } from "src/store/locations/slice";
import { ILocations, LocationsState } from "src/store/locations/types";
import style from '../../Form.module.scss';
import { selectLocation } from "src/store/select/slice";


export const Locations: FC = () => {
    const [show, setShow] = useState(false);
    const [locationName, setLocationName] = useState('Location');

    const locations = useSelector((state: StoreState) => state.locations.locations);
    const loading = useSelector((state: StoreState) => state.locations.loading);
    const error = useSelector((state: StoreState) => state.locations.error);
    const dispatch = useDispatch<
          ThunkDispatch<LocationsState, void, PayloadAction<ILocations[]>>
        >();
    const dispatchSelect = useDispatch();
    
    const selectedLocation = useSelector((state: StoreState) => state.select.location);
    
    useEffect(() => {
        dispatch(fetchDataLocations());
    }, [dispatch]);

    const handeShowClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault();
        setShow(!show);
    }

    const handleSelectClick = (locationName: string, locationId: number) => {
        dispatchSelect(selectLocation(locationId));
        setLocationName(locationName);
        setShow(false);
    }

    const handleDeleteLocation = () => {
        dispatchSelect(selectLocation(0));
        setLocationName('Locations');
    }

    return (
        <div className={style.select}>
            {!show &&
                <div className={style.title}>
                <span className={style.selectedSelect}>{locationName}</span>
                {error && <p>{error}</p>}
                    <div className={style.btnsWrapp}>
                        {selectedLocation !== 0 && 
                            <div className={style.deleteSelected} onClick={handleDeleteLocation}>+</div>
                        }
                        <button className={style.btn} onClick={handeShowClick}>
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
                    <span className={style.selectedSelect}>{locationName}</span>
                    {error && <p>{error}</p>}
                    <div className={style.btnsWrapp}>
                        {selectedLocation !== 0 && 
                            <div className={style.deleteSelected} onClick={handleDeleteLocation}>+</div>
                        }
                        <button className={style.btn} onClick={handeShowClick}>
                            <svg width="10" height="6" viewBox="0 0 10 6" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M9.67861 1.8337L5.77064 5.68539C5.34503 6.10487 4.65497 6.10487 4.22936 5.68539L0.321394 1.8337C-0.365172 1.15702 0.121082 -8.3659e-08 1.09203 0L8.90797 6.73452e-07C9.87892 7.57113e-07 10.3652 1.15702 9.67861 1.8337Z" fill="black"/>
                            </svg>
                        </button>
                    </div>
                </div>
                <div className={style.list}>
                    {!loading && (locations.map((location) => <div className={style.listes} key={location.id} onClick={() => handleSelectClick(location.location, Number(location.id))}>{location.location}</div>  ))}
                </div>
                </>
            }
        </div>
    );
}