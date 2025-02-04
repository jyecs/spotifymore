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
    <div className=''>
      <header className='grid grid-cols-10 grid-rows-none bg-black text-white gap-2 text-xl m-5 pr-40 pl-40'>
        <p className='justify-self-center'>Listify</p>
        <p className='justify-self-end col-start-8 row-start-1'>About</p>
        <p className='justify-self-center col-start-9 row-start-1'>FAQ</p>
        <p className='justify-self-start col-start-10 row-start-1'>GitHub</p>
      </header>
      <hr className='p-[1px 0px 0px 10px] w-full bg-gray-700 h-[2px]'></hr>
      <div className='flex flex-col bg-black text-white h-screen gap-2 items-center content-center'>
        <h1 className='font-bold text-[60px]'>Load. Tailor. Listen.</h1>
        <p className='text-4x1'>Quickly create playlists from your favorite songs on Spotify.</p>
        <button className='bg-green-600 h-12 w-30 rounded-3xl hover:bg-green-700'>Get Started</button>
      </div>
    </div>
  )
}

export default App;