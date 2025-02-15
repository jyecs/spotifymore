import React from "react";
import TrackItem from "./trackItem";
interface Props {
    isOpen: boolean;
    closeModal: () => void;
    tracks: Array<Track>
}

const TracksModal:React.FC<Props> = ( {isOpen, closeModal, tracks }) => {

    function callbackTrack(track: Track, type: string) {
        console.log(track);
        console.log(type);
    }

    if (!isOpen) { return null }

    return (
    <div className="flex flex-col z-10 inset-0 absolute text-black text-lg bg-gray-500 m-10 pb-3">
        <div className="h-10 w-full">
            <div className="text-white bg-gray-500 place-center text-center">All Songs</div>
            <button onClick={closeModal} className="text-red-700 hover:text-gray-600 mr-2 absolute top-0 right-0">X</button>
        </div>
        <div className="overflow-auto bg-gray-500">
            <ul>
                {tracks.map((track, index) => {
                    return <TrackItem track={track} key={index} callbackTrack={callbackTrack} type="Add"></TrackItem>
                })}
            </ul>
        </div>
    </div>)
}

export default TracksModal