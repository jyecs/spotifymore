import { list } from "postcss";
import React, { useEffect } from "react";
interface Props {
    playlists: [string,Track[]][] | null,
    isChanged: boolean
}
const Playlister: React.FC<Props> = ( {playlists, isChanged} ) => {
    if(!isChanged) { return null; }
    console.log(playlists);
    const listItems = playlists ? playlists![2][1].map((track, index) => {
        return <li key={index} >{track.name}</li>
    }) : null


    return (
        <>
        <div className="text-white">Loaded In</div>
        <ul className="text-white">{listItems}</ul>
        </>
    )
}

export default Playlister;