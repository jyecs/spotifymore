import React, { useEffect } from "react";
interface Props {
    playlists: [string,Track[]][] | null,
    isChanged: boolean
}
const Playlister: React.FC<Props> = ( {playlists, isChanged} ) => {
    if(!isChanged) { return null }

    return(
        <div className="text-white">Loaded In</div>
    )
}

export default Playlister;