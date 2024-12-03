import { Manifest } from 'stremio-addon-sdk';

const manifest: Manifest = {
	id: 'com.streamvault.addon',
	version: '1.0.0',
	name: 'Stream Vault',
	description: 'Streams content from your server',
	resources: ['catalog', 'meta', 'stream'],
	types: ['movie'],
	catalogs: [
		{
			type: 'movie',
			id: 'my-movies',
			name: 'My Movies',
		},
	],
};

export default manifest;
