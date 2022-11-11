export interface User {
	id: string,
	created_at: string,
	email: string,
	role: string,
	updated_at: string
}

export interface Session {
	access_token: string,
	expires_at: number,
	expires_in: number,
	refresh_token: string,
	token_type: string,
	user: User;
}