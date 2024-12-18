import jwt from 'jsonwebtoken';
import config from './config';

export class TokenManager {
	static currentToken: string | null = null;
	static tokenExpiration: number = 0;

	private static generateToken = () => {
		const expiresIn = 4 * 60 * 60; // 4 hours in seconds
		const expiration = Math.floor(Date.now() / 1000) + expiresIn;

		this.currentToken = jwt.sign(
			{
				type: 'stream_vault_addon',
				exp: expiration,
			},
			config.AUTH_CODE
		);
		this.tokenExpiration = expiration * 1000; // convert to milliseconds

		return this.currentToken;
	};

	private static getToken = () => {
		// If no token or token is about to expire (within 5 minutes), generate a new one
		if (!this.currentToken || Date.now() >= this.tokenExpiration - 5 * 60 * 1000) {
			return this.generateToken();
		}
		return this.currentToken;
	};

	static addTokenToUrl = (url: string) => {
		const token = this.getToken();
		return `${url}?token=${encodeURIComponent(token)}`;
	};
}
