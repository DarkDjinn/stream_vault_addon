import { Config } from '../interfaces';

const env = (process.env.NODE_ENV || 'dev') as keyof Config;

const config: Config = {
	dev: {
		PORT: 1337,
		AUTH_CODE: '',
		MOVIE_URL: '',
		STREAM_URL: '',
	},
	prod: {
		PORT: 1337,
		AUTH_CODE: '',
		MOVIE_URL: '',
		STREAM_URL: '',
	},
};

export default config[env];
