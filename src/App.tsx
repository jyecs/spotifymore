import { useRef, useState, useEffect } from 'react'
import './App.css'
import spotify from './spotify'
import Landing from './landing'
import { ArtistObject } from './vite-env'
import PlaylistCreator from './playlistCreator'
import Playlister from './playlister'

function App() {
  const spotifyRef = useRef(spotify())
  const [trackList, setTrackList] = useState<Array<Track> | null>(null);
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const accessRef = useRef<string | null>(null);
  const [changed, setChanged]= useState(false);
  const [artistList, setArtistList] = useState<Map<string, ArtistObject> | null>(null);
  const playlistRef = useRef(PlaylistCreator());
  const [playlists, setPlaylists] = useState<[string,Track[]][] | null>(null);

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
      setChanged(true);
      getAccess();
    }
  }, [])

  useEffect(() => {
    if (accessToken) {
      async function getSongsFromSpotify() {
        const songs = await spotifyRef.current.getSongs(accessRef.current!);
        setTrackList(songs);
      }
      getSongsFromSpotify();
    }
  }, [accessToken])

  useEffect(() => {
    if (trackList) {
      console.log(trackList);
      async function getArtistsFromSpotify() {
        if (artistList) { return } // don't want to call the API more times than needed
        const artistIterator = spotifyRef.current.getAllTracklistArtists(trackList!).values();
        const artistLists = spotifyRef.current.convertArtistsToCallableArray(artistIterator);
        const artists = await spotifyRef.current.fetchArtists(artistLists, accessRef.current!);
        setArtistList(artists);
      }
      getArtistsFromSpotify();
    }
  }, [trackList])

  useEffect(() => {
    if (artistList) {
      console.log(artistList);
      const playlists = playlistRef.current.createPlaylists(trackList! ,artistList);
      const playlistEntries = Array.from(playlists.entries());
      playlistEntries.sort((a,b) => b[1].length - a[1].length);
      setPlaylists(playlistEntries);
    }
  },[artistList])

  function callbackTest() {
    spotifyRef.current.getAuthorization();
  }

  return (
    <>
      <Landing isChanged={changed} callback={callbackTest} ></Landing>
      <Playlister isChanged={changed} playlists={playlists}></Playlister>
    </>
  )
}

export default App;