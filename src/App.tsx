import { useRef, useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import spotify from './spotify'

function App() {
  const [count, setCount] = useState(0)
  const spotifyRef = useRef(spotify())

  useEffect(() => {
    console.log("Called");
    const params = new URLSearchParams(window.location.search);
    const code = params.get("code");
    async function callSpotify() {
      const songs = await spotifyRef.current.getSongs(code!)
      console.log(songs);
    }
    if (!code) {
      console.log("There is nothing")
    } else {
      callSpotify()
    }
  },[])

  return (
    <>
      <button onClick={spotifyRef.current.getAuthorization}>Test</button>
    </>
  )
}

export default App
