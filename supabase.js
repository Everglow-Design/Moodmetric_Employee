// Supabase client setup
// Udskift 'YOUR_SUPABASE_URL' og 'YOUR_SUPABASE_ANON_KEY' med dine egne nøgler fra Supabase.io

const SUPABASE_URL = 'https://rwksvrxfsjfdikckwmzq.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJ3a3N2cnhmc2pmZGlrY2t3bXpxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjczOTY5MTksImV4cCI6MjA4Mjk3MjkxOX0.rddfbx0API_R62uLWJdM5QCMmqIwc-9b6XpgfNsbsOk';

const _supabase = supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

async function login(event) {
    event.preventDefault();
    const email = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const { error, user, session } = await _supabase.auth.signInWithPassword({ email, password });
    if (error) {
        alert('Login fejlede: ' + error.message);
        return;
    }
    alert('Login succesfuld!');
    // Hent brugerens data
    fetchUserData(user.id);
}

async function fetchUserData(userId) {
    // Eksempel: Hent data fra "profiles" tabel hvor id = userId
    let { data, error } = await _supabase
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .single();
    if (error) {
        alert('Kunne ikke hente data: ' + error.message);
        return;
    }
    alert('Dine data: ' + JSON.stringify(data));
}

document.addEventListener('DOMContentLoaded', function() {
    document.querySelector('form').addEventListener('submit', login);
});
