import { useState } from 'react'
import { supabase } from '../helpers/supabaseClient'

export default function LoginScreen() {
    const [loading, setLoading] = useState(false)
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    async function signInWithEmail(e: any) {
        e.preventDefault();
        const { data, error } = await supabase.auth.signInWithPassword({
            email: email,
            password: password,
        })
    }

    return (
        <div className="row flex-center flex">
            <div className="col-6 form-widget" aria-live="polite">
                <h1 className="header">Supabase + React</h1>
                <p className="description">Login</p>
                {loading ? (
                    'Sending magic link...'
                ) : (
                    <form onSubmit={signInWithEmail}>
                        <label htmlFor="email">Email</label>
                        <input
                            id="email"
                            className="inputField"
                            type="email"
                            placeholder="Your email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <input
                            id=""
                            className="inputField"
                            type="password"
                            placeholder="Your pasword"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <button className="button block" aria-live="polite">
                            Submit
                        </button>
                    </form>
                )}
            </div>
        </div>
    )
}