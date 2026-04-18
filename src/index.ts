import { Hono } from "hono";
import { env } from "hono/adapter";
import { RecentTracks } from "./types";

const app = new Hono();
const API_BASE = "https://ws.audioscrobbler.com/2.0/";

app.get("/", (c) => {
    return c.text("Hey <3 (go to '/recent/<LASTFM USERNAME>' for the api)");
});

app.get("/recent/:username", async (c) => {
    const { LASTFM_API_KEY } = env<{ LASTFM_API_KEY: string }>(c);

    const username = c.req.param("username");
    const limit = c.req.query("limit") ?? 5;

    if (!username) {
        return c.json({
            success: false,
            message: "Please provide a valid username",
        });
    }

    const data = await fetch(
        `${API_BASE}?method=user.getrecenttracks&user=${username}&api_key=${LASTFM_API_KEY}&limit=${limit}&format=json`,
    );

    const json = (await data.json()) as RecentTracks;

    const transformed = json.recenttracks.track.map((track) => {
        return {
            artist: track.artist["#text"],
            song: track.name,
            songUrl: track.url,
            album: track.album["#text"],
            albumCover: track.image.find((i) => i.size === "large")?.["#text"],
            nowPlaying: Boolean(track["@attr"]?.nowplaying),
        };
    });

    return c.json(transformed);
});

export default app;
