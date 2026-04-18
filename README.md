# lastfm-api-wrapper

A very simple lastfm api wrapper. Currently only allows you to get
a user's recent tracks.

## Endpoints


### `/recent/<username>`

Get a user's recently played songs.

#### Query Params

`limit` - Default: 5

#### Return
```json
[
  {
    "artist": "",
    "song": "",
    "songUrl": "",
    "album": "",
    "albumCover": "",
    "nowPlaying": false
  }
]
```
