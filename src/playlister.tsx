import { list } from "postcss";
import React, { useEffect } from "react";
interface Props {
    playlists: [string,Set<Track>][] | null,
    isChanged: boolean
}
const Playlister: React.FC<Props> = ( {playlists, isChanged} ) => {
    if(!isChanged) { return null; }
    console.log(playlists);
    const listItems = playlists ? Array.from(playlists![0][1]).map((track, index) => {
        return <li className="text-center flex flex-row items-center justify-between mb-3 ml-5 mr-5 border border-solid border-white p-3" key={index} ><span>{track.name}</span> <span>{track.artists[0].name}</span></li>
    }) : null


    return (
        <>
        <ul className="text-white bg-gray-700 ml-80 mr-80 pt-5 pb-5 mt-10 mb-10"><div className="text-center text-xl mb-3">{playlists![0][0]}</div>{listItems}</ul>
        </>
    )
}

export default Playlister;