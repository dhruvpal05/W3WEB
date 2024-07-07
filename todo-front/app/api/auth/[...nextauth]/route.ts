import nextAuth from "next-auth";
import NextAuth from "next-auth/next";
import GoogleProvider from "next-auth/providers/google";

const handler = NextAuth({
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID || "",
            clientSecret: process.env.GOOGLE_CLIENT_SECRET  || "",
        }),
    ],
    callbacks: {
        async session({ session }) {
            // store the user id from MongoDB to session
            console.log(session);
            return session;
        },
        async signIn({ profile }) {
            try {
              console.log(profile);
                // await connectToDatabase();
                // Check if user exists in the database
                // const userExists = await User.findOne({ email: profile.email });
                // // If user does not exist, create a new  user
                // if (!userExists) {
                //     await User.create({
                //         email: profile.email,
                //         username: profile.name.replace(" ", "").toLowerCase(),
                //         image: profile.picture,
                //     });
                // }
                return true;
            } catch (error) {
                console.log(error);
                return false;
            }
        }

    },
});

export { handler as GET, handler as POST };