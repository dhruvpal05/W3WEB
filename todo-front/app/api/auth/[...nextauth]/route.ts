import NextAuth from 'next-auth/next';
import GoogleProvider from 'next-auth/providers/google';

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || '',
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || '',
    }),
    // Add other providers if needed
  ],
  callbacks: {
    async session({ session }) {
      // Modify session data or perform additional checks
      console.log(session);
      return session;
    },
    async signIn({ profile }) {
      try {
        console.log(profile);
        // Perform additional actions on sign-in
        return true;
      } catch (error) {
        console.error('Error during sign-in:', error);
        return false;
      }
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
});

export default handler;
