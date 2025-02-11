import React from "react"
interface Props {
    track: Track
}
const TrackItem:React.FC<Props> = ( {track} ) => {

    const name = track.name;
    const artist = track.artists[0].name;
    const imgSrc = track.album.images[0].url;


    return (<li className="text-center flex flex-row items-center justify-between mb-3 ml-5 mr-5 border border-solid border-white p-3">
        <img className="max-w-20 max-h-20" src={imgSrc}></img>
        <span>{name}</span>
        <span>{artist}</span>
    </li>)
}

export default TrackItem