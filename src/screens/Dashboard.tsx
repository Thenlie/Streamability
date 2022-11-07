import { useState, useEffect } from 'react'
import { useOutletContext } from 'react-router-dom'
import { supabase } from '../helpers/supabaseClient'
import { useSession } from '../AppWrapper'

const Dashboard = () => {
    const { session } = useSession();
    console.log(session)

    return (
        <div aria-live="polite">
            <form className="form-widget">
                <div>Email: {session?.user.email}</div>
            </form>
            <button type="button" className="button block" onClick={() => supabase.auth.signOut()}>
                Sign Out
            </button>
        </div>
    )
}

export default Dashboard