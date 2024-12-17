import { addonBuilder, ContentType, serveHTTP, Subtitle } from 'stremio-addon-sdk';
import axios from 'axios';
import { MovieMeta } from './interfaces';
import manifest from './Manifest';
import config from './config';

const builder = new addonBuilder(manifest);

builder.defineCatalogHandler(async args => {
	try {
		const movies = await fetchMoviesFromServer();
		return {
			metas: movies.map(movie => ({
				id: movie.id,
				type: movie.type as ContentType,
				name: movie.name,
				poster: movie.poster,
				background: movie.background,
				logo: movie.logo,
				description: movie.description,
			})),
		};
	} catch (error) {
		console.error('Catalog Handler Error:', error);
		return { metas: [] };
	}
});

builder.defineMetaHandler(async args => {
	try {
		const movies = await fetchMoviesFromServer();
		const movie = movies.find(movie => movie.id === args.id);
		if (!movie) {
			console.warn(`Meta Handler - No movie found for ID: ${args.id}`);
			return {
				meta: {
					id: args.id,
					type: 'movie',
					name: `Unknown Movie (${args.id})`,
					poster: '',
					description: 'Movie not found in catalog',
				},
			};
		}
		return {
			meta: { ...movie, type: movie.type as ContentType },
		};
	} catch (error) {
		console.error('Meta Handler Error:', error);
		return {
			meta: {
				id: args.id,
				type: 'movie',
				name: `Error Fetching Movie (${args.id})`,
				poster: '',
				description: 'Error retrieving movie information',
			},
		};
	}
});

builder.defineStreamHandler(async args => {
	try {
		const stream = await fetchStreamFromServer(args.id);
		if (!stream) return { streams: [] };
		return {
			streams: [
				{
					url: stream.url,
					behaviorHints: { notWebReady: true },
					name: 'Stream Vault 1080p',
				},
			],
		};
	} catch (error) {
		console.error('Stream Handler Error:', error);
		return { streams: [] };
	}
});

builder.defineSubtitlesHandler(async args => {
	try {
		const subtitles = await fetchSubtitlesFromServer(args.id);
		return { subtitles };
	} catch (error) {
		console.error('Subtitle Handler Error:', error);
		return { subtitles: [] };
	}
});

async function fetchMoviesFromServer() {
	try {
		const { data } = await axios.get<MovieMeta[]>(
			`${config.MOVIE_URL}/api/movies?code=${config.AUTH_CODE}`
		);
		return data;
	} catch (error) {
		console.error('Error fetching movies:', error);
		return [];
	}
}

async function fetchSubtitlesFromServer(movieId: string) {
	try {
		const { data } = await axios.get<Subtitle[]>(
			`${config.MOVIE_URL}/api/subtitles/${movieId}?code=${config.AUTH_CODE}`
		);
		return data;
	} catch (error) {
		console.error('Error fetching subtitles:', error);
		return [];
	}
}

async function fetchStreamFromServer(movieId: string) {
	try {
		return { url: `${config.STREAM_URL}/api/stream/${movieId}?code=${config.AUTH_CODE}` };
	} catch (error) {
		console.error('Error fetching stream:', error);
		return null;
	}
}

serveHTTP(builder.getInterface(), {
	port: config.PORT,
});
