import { list } from "postcss";
import React, { useEffect, useState } from "react";
interface Props {
    playlists: [string,Set<Track>][] | null,
    isChanged: boolean
}
const Playlister: React.FC<Props> = ( {playlists, isChanged} ) => {
    const [playlistNum, setPlaylistNum] = useState(0);
    const [listItems, setListItems] = useState<any>(null);

    useEffect(()=> {
        setListItems(playlists ? Array.from(playlists![0][1]).map((track, index) => {
            return <li className="text-center flex flex-row items-center justify-between mb-3 ml-5 mr-5 border border-solid border-white p-3" key={index} ><span>{track.name}</span> <span>{track.artists[0].name}</span></li>
        }) : null)
        console.log("First Effect Called")
    },[playlists])

    useEffect(()=> {
        setListItems(playlists? Array.from(playlists![playlistNum][1]).map((track, index) => {
            return <li className="text-center flex flex-row items-center justify-between mb-3 ml-5 mr-5 border border-solid border-white p-3" key={index} ><span>{track.name}</span> <span>{track.artists[0].name}</span></li>
        }) : null)
    },[playlistNum])

    if(!isChanged) { return null; }

    function handleClick(e: React.MouseEvent<HTMLButtonElement>) {
        const button = e.target as HTMLButtonElement;
        if (button.innerHTML === "Prev" && playlistNum > 0) { setPlaylistNum((prev) => prev - 1); }
        if (button.innerHTML === "Next" && playlistNum < playlists!.length) { setPlaylistNum((prev) => prev + 1); }
    }

    return (
        <>
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