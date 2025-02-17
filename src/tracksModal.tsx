import React from "react";
import TrackItem from "./trackItem";
import { useState, useRef, useEffect } from "react";
interface Props {
    isOpen: boolean;
    closeModal: () => void;
    tracks: Array<Track>;
    callbackTrack: (track: Track, type: string) => void;
}

const TracksModal:React.FC<Props> = ( {isOpen, closeModal, tracks, callbackTrack }) => {
    
    const tracksRef = useRef([...tracks]);
    const [listItems, setListItems] = useState<any>(null);

    function modalCallback(track: Track, type: string) {

        const index = tracksRef.current.indexOf(track);
        tracksRef.current.splice(index,1);
        setListItems(tracksRef.current.map((track, index)=> {
            return <TrackItem track={track} key={index} callbackTrack={modalCallback} type="Add"></TrackItem>
        }))
        callbackTrack(track, type);
    }

    useEffect(()=> {
        setListItems(tracksRef.current.map((track, index)=> {
            return <TrackItem track={track} key={index} callbackTrack={modalCallback} type="Add"></TrackItem>
        }))
    },[])

    function handleClose() {
        tracksRef.current = [...tracks];
        setListItems(tracksRef.current.map((track, index)=> {
            return <TrackItem track={track} key={index} callbackTrack={modalCallback} type="Add"></TrackItem>
        }))
        closeModal();
    }

    if (!isOpen) { return null }

    return (
    <div className="flex flex-col z-10 inset-0 absolute text-black text-lg bg-gray-500 m-10 pb-3">
        <div className="h-10 w-full">
            <div className="text-white bg-gray-500 place-center text-center">All Songs</div>
            <button onClick={handleClose} className="text-red-700 hover:text-gray-600 mr-2 absolute top-0 right-0">X</button>
        </div>
        <div className="overflow-auto bg-gray-500">
            <ul>
                {listItems}
            </ul>
        </div>
    </div>)
}

export default TracksModal