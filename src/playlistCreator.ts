import { ArtistObject} from "./vite-env"

function PlaylistCreator() {


    function createPlaylists(tracks: Track[], artists: Map<string, ArtistObject>) {
        const playlists = new Map<string, Set<Track>>;
        tracks.forEach((track) => {
            const genres = getGenres(track, artists);
            processGenreToTrack(track, genres, playlists);
        })
        
        return playlists;
    }

    function getGenres(track: Track, artists: Map<string, ArtistObject>): string[] {
        const genres = new Array<string>();
        track.artists.forEach((artist) => {
            if (artists.has(artist.id)) {
                const genresFromArtist = artists.get(artist.id)!.genres;
                genresFromArtist.forEach((genre) => {
                    genres.push(genre);
                })
            }
        })

        return genres;
    }

    // Pairs tracks to their respective genres
    // Note some tracks do NOT have genres associated with them via artist genres
    function processGenreToTrack(track: Track, genres: string[], playlists: Map<string, Set<Track>>) {
        genres.forEach((genre) => {
            if (!playlists.has(genre)) {
                const playlist = new Set<Track>();
                playlist.add(track);
                playlists.set(genre, playlist);
            } else {
                const playlist = playlists.get(genre);
                playlist!.add(track);
            }
        })
    }


    return { createPlaylists }
}

export default PlaylistCreator