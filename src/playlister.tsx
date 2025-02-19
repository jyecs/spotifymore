import React, { useEffect, useState } from "react";
import TrackItem from "./trackItem";
import TracksModal from "./tracksModal";
interface Props {
    playlists: [string,Set<Track>][] | null,
    isChanged: boolean,
    tracks: Array<Track> | null,
    callback: (genre: string, tracks: Set<Track>) => void
}
const Playlister: React.FC<Props> = ( {playlists, isChanged, tracks, callback} ) => {
    const [playlistNum, setPlaylistNum] = useState(0);
    const [listItems, setListItems] = useState<any>(null);
    const [modalIsOpen, setModalIsOpen] = useState<boolean>(false);

    function callbackTrack(track: Track, type: string) {
        console.log(track);
        console.log(type);
        if (type === "Delete") {
            playlists![playlistNum][1].delete(track);
            setListItems(playlists ? Array.from(playlists![0][1]).map((track, index) => {
                return <TrackItem key={index} track={track} callbackTrack={callbackTrack} type="Delete"></TrackItem>
            }) : null);
        }
        if (type === "Add") {
            playlists![playlistNum][1].add(track);
            setListItems(playlists ? Array.from(playlists![0][1]).map((track, index) => {
                return <TrackItem key={index} track={track} callbackTrack={callbackTrack} type="Delete"></TrackItem>
            }) : null);
        }
    }
    
    useEffect(()=> {
        setListItems(playlists ? Array.from(playlists![0][1]).map((track, index) => {
            return <TrackItem key={index} track={track} callbackTrack={callbackTrack} type="Delete"></TrackItem>
        }) : null)
        console.log("First Effect Called")
    },[playlists])

    useEffect(()=> {
        setListItems(playlists? Array.from(playlists![playlistNum][1]).map((track, index) => {
            return <TrackItem key={index} track={track} callbackTrack={callbackTrack} type="Delete"></TrackItem>
        }) : null)
    },[playlistNum])

    if(!isChanged) { return null; }

    function handleClick(e: React.MouseEvent<HTMLButtonElement>) {
        const button = e.target as HTMLButtonElement;
        if (button.innerHTML === "Prev" && playlistNum > 0) { setPlaylistNum((prev) => prev - 1); }
        if (button.innerHTML === "Next" && playlistNum < playlists!.length) { setPlaylistNum((prev) => prev + 1); }
    }

    function handleCallback() {
        const tracks = playlists![playlistNum][1];
        const genre = playlists![playlistNum][0];

        callback(genre, tracks);
    }

    function toggleModal() {
        setModalIsOpen((prev) => !prev);
    }


    return (
        <>
        <TracksModal isOpen={modalIsOpen} closeModal={toggleModal} tracks={tracks!} callbackTrack={callbackTrack}></TracksModal>
        <ul className="text-white bg-gray-700 ml-80 mr-80 pt-5 pb-5 mt-10 mb-10">
            <div className="flex flex-row space-evenly items-center justify-center gap-10">
                <button className = "border border-solid border-white hover:bg-gray-600 mb-3 pl-3 pr-3" onClick={handleClick}>Prev</button>
                <div className="text-center text-xl mb-3 min-w-30 max-w-30">{playlists ? playlists[playlistNum][0] : null}</div>
                <button className = "border border-solid border-white hover:bg-gray-600 mb-3 pl-3 pr-3" onClick={handleClick}>Next</button>
            </div>
            {listItems}
        </ul>
        </>
    )
}

export default Playlister;