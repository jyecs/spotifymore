import React from "react"
interface Props {
    track: Track
}
const TrackItem:React.FC<Props> = ( {track} ) => {

    const name = track.name;
    const artist = track.artists[0].name;
    const imgSrc = track.album.images[0].url;


    return (<li className="text-center flex flex-row items-center mb-3 ml-5 mr-5 border border-solid border-white p-3 hover:bg-gray-600">
        <img className="max-w-20 max-h-20 mr-5" src={imgSrc}></img>
        <div className="flex flex-col text-left">  
            <div>{name}</div>
            <div>{artist}</div>
        </div>
    </li>)
}

export default TrackItem