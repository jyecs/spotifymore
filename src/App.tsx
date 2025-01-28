import { useRef, useState, useEffect } from 'react'
import './App.css'
import spotify from './spotify'

function App() {
  const spotifyRef = useRef(spotify())
  const [trackList, setTrackList] = useState<Array<Track> | null>(null);

  useEffect(() => {
    console.log("Called");
    const params = new URLSearchParams(window.location.search);
    const code = params.get("code");
    async function callSpotify() {
      const songs = await spotifyRef.current.getSongs(code!);
      setTrackList(songs);
    }
    if (code) {
      console.log("We have a code");
      callSpotify();
    }
  },[])

  useEffect(() => {
    if (trackList) {
      console.log(trackList);
    }
  },[trackList])

  return (
    <>
      <button onClick={spotifyRef.current.getAuthorization}>Test</button>
    </>
  )
}

export default App
