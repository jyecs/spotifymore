# Spotify Playlist Creator

If you run to any problems with connecting spotify account, it means that this app has not gotten an extension yet, and is required to be whitelisted in order to use

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
- Ability to change the playlist data <- Using the modal created.
- Rework playlister.tsx such that it can handle mutations in state while properly rendering out state
- Menu to see all saved songs
- Fix vercel callback error (configure vercel to handle this) <- verifier does not persist upon loading back from vercel, need to handle this
- Finish the landing page.
- Added some basic comments for future reference

WiP:
- Cap API calls to a max of 20 for getting tracks (1000 songs total).
- Add modals to send msgs on edits so there is feedback.
- Add modal to listfy button so there isn't accidental commits to the spotify app.
- Error handling.
