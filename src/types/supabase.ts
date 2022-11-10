export interface User {
    app_metadata: any;
    aud: string;
    confirmation_sent_at: string;
    confirmed_at?: string,
	created_at: string;
	email: string;
    email_confirmed_at?: string,
	id: string;
    identities: any;
    phone: string;
	role: string;
	updated_at: string;
    user_metadata: any;
}

export interface Session {
	access_token: string,
	expires_at: number,
	expires_in: number,
	refresh_token: string,
	token_type: string,
	user: User;
}