import { createClient } from '@supabase/supabase-js';
import { auth } from '../firebase';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  console.warn("Supabase URL or Anon Key is missing. Ensure they are set in .env");
}

// Create the Supabase client
// We configure it to automatically inject the Firebase ID token into every request!
export const supabase = createClient(supabaseUrl || '', supabaseAnonKey || '', {
  global: {
    headers: {
      // Optional: Add any custom headers if needed
    },
  },
  accessToken: async () => {
    // This tells Supabase to ALWAYS fetch the latest Firebase token 
    // and attach it as a Bearer token in the Authorization header.
    const currentUser = auth.currentUser;
    if (currentUser) {
      return await currentUser.getIdToken();
    }
    return '';
  },
});
