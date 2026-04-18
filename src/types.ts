export type Image = {
    size: "small" | "medium" | "large" | "extralarge";
    "#text": string;
};

export type Track = {
    artist: {
        mbid: string;
        "#text": string;
    };
    streamable: string;
    image: Image[];
    mbid: string;
    album: {
        mbid: string;
        "#text": string;
    };
    name: string;
    "@attr"?: {
        nowplaying: string;
    };
    url: string;
};

export type RecentTracks = {
    recenttracks: {
        track: Track[];
    };
};
