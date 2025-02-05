import { useRef, useState, useEffect } from 'react'
import './App.css'
import spotify from './spotify'
import Landing from './landing'
import { ArtistObject } from './vite-env'

function App() {
  const spotifyRef = useRef(spotify())
  const [trackList, setTrackList] = useState<Array<Track> | null>(null);
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const accessRef = useRef<string | null>(null);
  const [changed, setChanged]= useState(false);
  const [artistList, setArtistList] = useState<Set<ArtistObject> | null>(null);

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
      async function getSongsFromSpotify() {
        const songs = await spotifyRef.current.getSongs(accessRef.current!);
        setTrackList(songs);
      }
      getSongsFromSpotify();
    }
  }, [accessToken])

  // Change to a regular button afterwards.
  useEffect(() => {
    if (trackList) {
      console.log(trackList);
      async function getArtistsFromSpotify() {
        const artistIterator = spotifyRef.current.getAllTracklistArtists(trackList!).values();
        const artistList = spotifyRef.current.convertArtistsToCallableArray(artistIterator);
        const artists = await spotifyRef.current.fetchArtists(artistList, accessRef.current!);
        setArtistList(artists);
      }
      getArtistsFromSpotify();
    }
  }, [trackList])

  useEffect(() => {
    if (artistList) {
      console.log(artistList);
    }
  },[artistList])

  function callbackTest() {
    setChanged(true);
    spotifyRef.current.getAuthorization();
  }

  return (
    <Landing isChanged={changed} callback={callbackTest} ></Landing>
  )
}

export default App;