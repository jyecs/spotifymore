import React from "react";
import TrackItem from "./trackItem";
interface Props {
    isOpen: boolean;
    closeModal: () => void;
    tracks: Array<Track>
}

const TracksModal:React.FC<Props> = ( {isOpen, closeModal, tracks }) => {
    if (!isOpen) { return null }

    return (
    <div className="z-10 inset-0 absolute text-black text-lg bg-white m-10 flex flex-col h-100% w-100%">
        <div className="flex flex-row h-10 self-center w-100">
            <div className="text-white bg-gray-700">All Songs</div>
            <button onClick={closeModal} className="text-red-700 hover:text-gray-700 mr-2 self-end justify-self-end">X</button>
        </div>
        <div className="overflow-auto">
            <ul>
                {tracks.map((track, index) => {
                    return <TrackItem track={track} key={index}></TrackItem>
                })}
            </ul>
        </div>
    </div>)
}

export default TracksModal