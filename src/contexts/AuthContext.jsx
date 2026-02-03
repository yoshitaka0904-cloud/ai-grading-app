import { createContext, useContext, useEffect, useState } from 'react'
import { getCurrentUser, onAuthStateChange, getUserProfile } from '../services/authService'

const AuthContext = createContext({})

export const useAuth = () => useContext(AuthContext)

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null)
    const [profile, setProfile] = useState(null)
    const [loading, setLoading] = useState(true)

    const fetchProfile = async (userId) => {
        try {
            const { data } = await getUserProfile(userId)
            if (data) setProfile(data)
        } catch (err) {
            console.error('Error fetching profile:', err)
        }
    }

    useEffect(() => {
        // Initial auth check
        getCurrentUser().then((u) => {
            setUser(u)
            if (u) fetchProfile(u.id)
            setLoading(false)
        }).catch(() => setLoading(false))

        // Auth state listener
        const { data: { subscription } } = onAuthStateChange((event, session) => {
            const u = session?.user ?? null
            setUser(u)
            if (u) {
                fetchProfile(u.id)
            } else {
                setProfile(null)
            }
            setLoading(false)
        })

        // Safety timeout to ensure loading always resolves
        const safetyTimer = setTimeout(() => {
            setLoading(false)
        }, 5000)

        return () => {
            subscription.unsubscribe()
            clearTimeout(safetyTimer)
        }
    }, [])

    return (
        <AuthContext.Provider value={{ user, profile, loading }}>
            {children}
        </AuthContext.Provider>
    )
}
