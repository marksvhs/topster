// 1. Initialize Supabase
const SUPABASE_URL = 'https://mrercokomclncocmzcmk.supabase.co';
const SUPABASE_ANON_KEY = 'sb_publishable_gY11Cfs4wePOIZLfwgQXRQ_BrESZlqN';

const supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// 2. Grab your HTML elements
const loginBtn = document.getElementById('login-btn');
const logoutBtn = document.getElementById('logout-btn');
const userInfo = document.getElementById('user-info');

// 3. Login Function
loginBtn.addEventListener('click', async () => {
    const { data, error } = await supabase.auth.signInWithOAuth({
        provider: 'spotify',
        options: {
            // This requests permission to read their top artists/tracks
            scopes: 'user-top-read user-read-email' 
        }
    });
    
    if (error) {
        console.error("Login Error:", error.message);
    }
});

// 4. Logout Function
logoutBtn.addEventListener('click', async () => {
    await supabase.auth.signOut();
    window.location.reload(); // Refresh the page after logging out
});

// 5. Check if User is Logged In
async function checkUser() {
    const { data: { session } } = await supabase.auth.getSession();
    
    if (session) {
        // Hide login, show logout
        loginBtn.style.display = 'none';
        logoutBtn.style.display = 'inline-block';
        userInfo.innerHTML = `<p>Logged in successfully! Ready to fetch data.</p>`;
        
        // This token is what you will use later to ask Spotify for the music data
        const providerToken = session.provider_token; 
        console.log("Spotify Access Token:", providerToken);
    }
}

// Run the check when the page loads
checkUser();
