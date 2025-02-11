import { Track,FetchedSongs, SavedTrackObject, FetchedArtists, ArtistObject, UserProfile, SpotifyPlaylist} from "./vite-env";
function spotify() {
const clientId = import.meta.env.VITE_SPOTIFY_CLIENT;

async function redirectToAuthCodeFlow(clientId: string) {
    const verifier = generateCodeVerifier(128);
    const challenge = await generateCodeChallenge(verifier);

    localStorage.setItem("verifier", verifier);

    const params = new URLSearchParams();
    params.append("client_id", clientId);
    params.append("response_type", "code");
    params.append("redirect_uri", "http://localhost:5173/callback");
    params.append("scope", "user-read-private user-read-email user-library-read playlist-modify-public playlist-modify-private");
    params.append("code_challenge_method", "S256");
    params.append("code_challenge", challenge);

    document.location = `https://accounts.spotify.com/authorize?${params.toString()}`;
}

function generateCodeVerifier(length: number) {
    let text = '';
    let possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

    for (let i = 0; i < length; i++) {
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
}

async function generateCodeChallenge(codeVerifier: string) {
    const data = new TextEncoder().encode(codeVerifier);
    const digest = await window.crypto.subtle.digest('SHA-256', data);
    return btoa(String.fromCharCode.apply(null, [...new Uint8Array(digest)]))
        .replace(/\+/g, '-')
        .replace(/\//g, '_')
        .replace(/=+$/, '');
}

async function getAccessToken(code: string): Promise<string> {
    const verifier = localStorage.getItem("verifier");

    const params = new URLSearchParams();
    params.append("client_id", clientId);
    params.append("grant_type", "authorization_code");
    params.append("code", code);
    params.append("redirect_uri", "http://localhost:5173/callback");
    params.append("code_verifier", verifier!);

    const result = await fetch("https://accounts.spotify.com/api/token", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: params
    });

    const { access_token } = await result.json();
    return access_token;
}

async function fetchProfile(token: string): Promise<UserProfile> {
    const result = await fetch("https://api.spotify.com/v1/me", {
        method: "GET", headers: { Authorization: `Bearer ${token}` }
    });

    return await result.json();
}

async function putPlaylistToSpotify(token: string, playlistName: string, tracks: Set<Track>) {
    const profile = await fetchProfile(token);
    const id = profile.id;
    console.log(playlistName);
    const playlist = await createPlaylist(token, id, playlistName);
    const playlistID = playlist.id;
    await putTracksToPlaylist(token, playlistID, tracks);

}

async function createPlaylist(token: string, id: string, playlistName: string): Promise<SpotifyPlaylist> {
    const params =  {
        "name": playlistName
    }

    const result = await fetch(`https://api.spotify.com/v1/users/${id}/playlists`, {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}`} ,
        body: JSON.stringify(params)
    });

    return await result.json();
}

async function putTracksToPlaylist(token: string, playlistID: string, tracks: Set<Track>) {
    const trackStrings = new Array<Array<String>>();
    const tracksIterable = tracks.keys()
    let uris = new Array<string>;

    for (const track of tracksIterable) {
        if (uris.length === 100) {
            trackStrings.push(uris);
            uris = [];
        }
        uris.push(track.uri);
    }
    if (uris.length > 0) {
        trackStrings.push(uris);
    }

    trackStrings.forEach(async (uri) => {
        await putTracks(token, playlistID, uri);
    })
}

async function putTracks(token: string, playlistID: string, uris: Array<String>) {
    const params = {
        "uris":  uris
    }
    const result = await fetch(`https://api.spotify.com/v1/playlists/${playlistID}/tracks`, {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}`} ,
        body: JSON.stringify(params)
    });

    return await result.json(); // Don't need this could treat as a void function
}

async function fetchSavedTracks(token: string) {
    const params = new URLSearchParams();
    let items = new Array<FetchedSongs>();
    params.append("limit", "50");
    const result = await fetchTracks(token, `https://api.spotify.com/v1/me/tracks?${params.toString()}`);
    const nextURL = result["next"];
    if (nextURL !== null) {
        await fetchNextSavedTracks(token, nextURL, items);
    }
    items.push(result);
    return items;
}

async function fetchNextSavedTracks(token: string, URL: string, results: Array<FetchedSongs>): Promise<any> {
    const result = await fetchTracks(token, URL);
    const nextURL = result["next"];
    if (nextURL !== null) {
        await fetchNextSavedTracks(token, nextURL, results);
    }

    results.push(result);
}

async function fetchTracks(token: string, URL: string): Promise<FetchedSongs> {
    let result = await fetch(URL, {
        method: "GET", headers: { Authorization: `Bearer ${token}`}
    })

    return await result.json();
}

async function getSongs(accessToken: string): Promise<Track[]> {
    const tracks = await fetchSavedTracks(accessToken);
    const listOfAllTracks = processTracks(tracks);
    return listOfAllTracks;
}

function processTracks(ListOfTracks: Array<FetchedSongs>): Track[] {
    const allSongs = new Array<Track>();
    ListOfTracks.forEach((list: FetchedSongs) => {
        const tracks = list.items;
        tracks.forEach((trackObj: SavedTrackObject) => {
            const track = trackObj.track;
            allSongs.push(track);
        })
    })

    return allSongs;
}

function getAllTracklistArtists(tracks: Track[]): Map<string,string> {
    const artists = new Map<string,string>();
    tracks.forEach((track: Track) => {
        const trackArtists = track.artists;
        trackArtists.forEach((artist: SimplifiedArtistObject) => {
            artists.set(artist.name, artist.id);
        })
    })
    return artists;
}

function convertArtistsToCallableArray(artistIDs: IterableIterator<string>) {
    let arrayOfArtists = new Array<string>();
    let concatedArtists = new Array<string>();
    for (const id of artistIDs) {
        if (arrayOfArtists.length === 50) { 
            concatedArtists.push(arrayOfArtists.toString());
            arrayOfArtists = [];
        }
        arrayOfArtists.push(id);
    }
    if (arrayOfArtists.length > 0) {
        concatedArtists.push(arrayOfArtists.toString());
    }
    return concatedArtists;
}

async function fetchArtists(concatedAritsts: string[], token: string): Promise<Map<string, ArtistObject>> {
    const artists = new Map<string, ArtistObject>();
    for (let i = 0; i < concatedAritsts.length; i++) {
        const URL = `https://api.spotify.com/v1/artists?ids=${concatedAritsts[i]}`;
        let result = await fetchArtistsData(URL, token);
        result.artists.forEach((artistObj: ArtistObject) => {
            artists.set(artistObj.id, artistObj);
        })
    }
    return artists;

}

async function fetchArtistsData(URL: string, token: string): Promise<FetchedArtists> {
    let result = await fetch(URL, {
        method: "GET",
        headers: { authorization: `Bearer ${token}` }
    });

    return await result.json();
}

async function getAuthorization() {
    await redirectToAuthCodeFlow(clientId);
}


return {getSongs, getAuthorization, getAllTracklistArtists, convertArtistsToCallableArray, fetchArtists, getAccessToken, putPlaylistToSpotify}
}
export default spotify
