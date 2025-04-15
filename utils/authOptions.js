import GoogleProvider from 'next-auth/providers/google'
import connectDB from '@/config/database'
import User from '@/models/User'

export const authOptions = {
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
            authorization: {
                params: {
                    prompt: 'consent',
                    access_type: 'offline',
                    response_type: 'code'
                }
            }

        })
    ],
    session: {
        // Set the session to last for 30 days (in seconds)
        maxAge: 30 * 24 * 60 * 60,  // 30 days in seconds

        // Set the session to refresh every 24 hours
        updateAge: 24 * 60 * 60,  // 24 hours in seconds
    },
    callbacks: {
        // Invoked on successful signin
        async signIn({ profile }) {
            // 1. Connect to database
            await connectDB()
            // 2. Check if user exists
            const userExits = await User.findOne({ email: profile.email })
            // 3. If not, then add user to database
            if (!userExits) {
                //trucate the username 
                const username = profile.name.slice(0, 20)
                await User.create({
                    email: profile.email,
                    username,
                    image: profile.picture
                })
            }
            // 4. Return true to allow sign in
            return true;
        },
        // Modifies the session object
        async session({ session }) {
            // 1. Get user from database
            const user = await User.findOne({ email: session.user.email })
            // 2. Assign the user id to the session
            session.user.id = user._id.toString()
            // 3. return session
            return session;
        },
    },
}