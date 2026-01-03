// Supabase client setup
// Udskift 'YOUR_SUPABASE_URL' og 'YOUR_SUPABASE_ANON_KEY' med dine egne nøgler fra Supabase.io

const SUPABASE_URL = 'https://rwksvrxfsjfdikckwmzq.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJ3a3N2cnhmc2pmZGlrY2t3bXpxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjczOTY5MTksImV4cCI6MjA4Mjk3MjkxOX0.rddfbx0API_R62uLWJdM5QCMmqIwc-9b6XpgfNsbsOk';

const _supabase = supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

async function login(event) {
    event.preventDefault();
    const email = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const { data, error } = await _supabase.auth.signInWithPassword({ email, password });
    console.log('Login respons:', data, error);
    if (error) {
        alert('Login fejlede: ' + error.message);
        return;
    }
    if (!data || typeof data !== 'object' || !('user' in data) || !data.user) {
        alert('Login mislykkedes: Bruger ikke fundet. Respons: ' + JSON.stringify(data));
        return;
    }
    alert('Login succesfuld!');
    // Hent brugerens data
    fetchUserData(data.user.id);
}

async function fetchUserData(userId) {
    // Eksempel: Hent data fra "Profiles_Employee" tabel hvor id = userId
            let { data, error } = await _supabase
                .from('PROFILES_EMPLOYEE')
                .select('*')
                .eq('id', userId);
    console.log('Data fra PROFILES_EMPLOYEE:', data, error);
    if (error) {
        alert('Kunne ikke hente data: ' + error.message);
        return;
    }
    if (!data || data.length === 0) {
        alert('Ingen data fundet for denne bruger.');
        return;
    }
    if (data.length > 1) {
        alert('Advarsel: Flere rækker fundet for denne bruger!');
    }
    alert('Dine data: ' + JSON.stringify(data[0]));
}

document.addEventListener('DOMContentLoaded', function() {
    document.querySelector('form').addEventListener('submit', login);
});
