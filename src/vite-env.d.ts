/// <reference types="vite/client" />
import { ScriptHTMLAttributes } from "react";

interface FetchedSongs {
    href: string;
    limit: number;
    next: string | null;
    offset: number;
    previous: string | null;
    total: number;
    items: Array<SavedTrackObject>;
}

interface SavedTrackObject {
    added_at: string;
    track: Track;
}

interface Track {
    album: Album;
    artists: Array<SimplifiedArtistObject>;
    available_markets: Array<string>;
    disc_number: number;
    duration_ms: number;
    explicit: boolean;
    external_ids: object;
    external_urls: object;
    href: string;
    id: string;
    is_playable: boolean;
    linked_from: object;
    restrictions: object;
    name: string;
    popularity: number;
    preview_url: string;
    track_number: number;
    type: string;
    uri: string;
    is_local: boolean;
}

interface SimplifiedArtistObject {
    external_urls: object;
    href: string;
    id: string;
    name: string;
    type: string;
    uri: string;
}

interface ArtistObject {
    external_urls: object;
    followers: object;
    genres: string[];
    href: string;
    id: string;
    images: object[];
    name: string;
    popularity: number;
    type: string;
    uri: string;
}

interface FetchedArtists {
    artists: ArtistObject[];
}

interface SpotifyPlaylist {
    collaborative: boolean;
    description: string | null;
    external_urls: object;
    followers: object;
    href: string;
    id: string;
    images: object; // change this
    name: string;
    owner: object; // change this
    public: boolean;
    snapshot_id: string;
    tracks: object; // hopefully don't need to change this
    type: string;
    uri: string
}