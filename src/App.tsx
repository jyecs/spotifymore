import { useRef, useState, useEffect } from 'react'
import './App.css'
import spotify from './spotify'

function App() {
  const spotifyRef = useRef(spotify())
  const [trackList, setTrackList] = useState<Array<Track> | null>(null);
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const accessRef = useRef<string | null>(null);
  const buttonRef = useRef<HTMLButtonElement | null>(null); // Remove later

  // On first load get access token if there is a code
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const code = params.get("code");
    if (code) {
      async function getAccess() {
        const token = await spotifyRef.current.getAccessToken(code!)
        if (token) {
          accessRef.current = token;
          setAccessToken(token);
        }
      }
      getAccess();
    }
  }, [])

  // Instead of doing this make it so that when the access token is granted it lets everyone else know to do their thing using
  // the ref instead of the state one.
  useEffect(() => {
    if (accessToken) {
      async function getSongsFromSpotify(token: string) {
        const songs = await spotifyRef.current.getSongs(token);
        setTrackList(songs);
      }
      getSongsFromSpotify(accessToken);
    }
  }, [accessToken])

  // Change to a regular button afterwards.
  useEffect(() => {
    if (trackList) {
      console.log(trackList);
      buttonRef.current?.addEventListener("click", (e) => {
        handleClickTest(e);
      })
    }
  }, [trackList])

  async function handleClickTest(e: MouseEvent) {
    const artistIterator = spotifyRef.current.getAllTracklistArtists(trackList!).values();
    const artistList = spotifyRef.current.convertArtistsToCallableArray(artistIterator);
    const artists = await spotifyRef.current.fetchArtists(artistList, accessRef.current!);
    console.log(artists);

  }

  return (
    <>
      <button onClick={spotifyRef.current.getAuthorization}>Test</button>
      <button ref={buttonRef}>Test 2</button>
    </>
  )
}

export default App
  ;