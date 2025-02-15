# Spotify Playlist Creator

Done'd:
- Setting up connection to Spotify API using OAuth 2.0 (Only people whitelisted can use it...)
- Gets all of your saved songs (ones that you explicity liked, not just in a playlist)
- Get Artists from your saved songs to get genres
- Landing page
- Sorting songs into specific categories to make into playlists
- Another page to display the playlists
- Commiting playlist to the spotify account using the API
- Swap displays between playlists
- Added modal to add songs into playlist (visual only)

WiP:
- Ability to change the playlist data <- Using the modal created.
- Rework playlister.tsx such that it can handle mutations in state while properly rendering out state
- Menu to see all saved songs
- Cap API calls to a max of 20 for getting tracks (1000 songs total)
- (Depends on how much/ little data I have) Call another API to supplement the lack of artist genres (Seems to be unneeded)s