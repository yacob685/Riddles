// Authentication Module
class AuthManager {
    constructor() {
        this.authForm = null;
        this.setupEventListeners();
    }

    setupEventListeners() {
        // Login form
        const loginForm = document.getElementById('loginForm');
        if (loginForm) {
            loginForm.addEventListener('submit', (e) => {
                e.preventDefault();
                this.handleLogin();
            });
        }

        // Signup form
        const signupForm = document.getElementById('signupForm');
        if (signupForm) {
            signupForm.addEventListener('submit', (e) => {
                e.preventDefault();
                this.handleSignup();
            });
        }
    }

    async handleLogin() {
        const email = document.getElementById('loginEmail').value;
        const password = document.getElementById('loginPassword').value;

        try {
            await auth.signInWithEmailAndPassword(email, password);
            showNotification('Successfully signed in!', 'success');
        } catch (error) {
            showNotification(error.message, 'error');
        }
    }

    async handleSignup() {
        const name = document.getElementById('signupName').value;
        const email = document.getElementById('signupEmail').value;
        const password = document.getElementById('signupPassword').value;

        try {
            const userCredential = await auth.createUserWithEmailAndPassword(email, password);
            const user = userCredential.user;

            // Save user data to Firestore
            await saveUserData({
                displayName: name,
                email: email,
                createdAt: firebase.firestore.FieldValue.serverTimestamp(),
                plan: 'Free',
                preferences: {
                    theme: 'light',
                    notifications: true,
                    emailUpdates: true
                }
            });

            // Update display name
            await user.updateProfile({ displayName: name });

            showNotification('Account created successfully!', 'success');
        } catch (error) {
            showNotification(error.message, 'error');
        }
    }

    async socialAuth(provider) {
        let authProvider;
        
        switch(provider) {
            case 'google':
                authProvider = new firebase.auth.GoogleAuthProvider();
                break;
            case 'microsoft':
                authProvider = new firebase.auth.OAuthProvider('microsoft.com');
                break;
            default:
                showNotification('Provider not supported', 'error');
                return;
        }

        try {
            await auth.signInWithPopup(authProvider);
            showNotification(`Signed in with ${provider}!`, 'success');
        } catch (error) {
            showNotification(error.message, 'error');
        }
    }

    async resetPassword(email) {
        try {
            await auth.sendPasswordResetEmail(email);
            showNotification('Password reset email sent!', 'success');
        } catch (error) {
            showNotification(error.message, 'error');
        }
    }

    async signOut() {
        try {
            await auth.signOut();
            showNotification('Signed out successfully', 'info');
        } catch (error) {
            showNotification(error.message, 'error');
        }
    }
}

// Global functions for HTML onclick handlers
function switchTab(tab) {
    const loginForm = document.getElementById('loginForm');
    const signupForm = document.getElementById('signupForm');
    const tabBtns = document.querySelectorAll('.tab-btn');

    tabBtns.forEach(btn => btn.classList.remove('active'));

    if (tab === 'login') {
        loginForm.style.display = 'block';
        signupForm.style.display = 'none';
        tabBtns[0].classList.add('active');
    } else {
        loginForm.style.display = 'none';
        signupForm.style.display = 'block';
        tabBtns[1].classList.add('active');
    }
}

function socialAuth(provider) {
    const authManager = new AuthManager();
    authManager.socialAuth(provider);
}

function signOut() {
    const authManager = new AuthManager();
    authManager.signOut();
}

function showAuthScreen() {
    document.getElementById('authScreen').style.display = 'flex';
    document.getElementById('mainApp').style.display = 'none';
}

function showMainApplication(user) {
    document.getElementById('authScreen').style.display = 'none';
    document.getElementById('mainApp').style.display = 'flex';
    
    // Update user profile in sidebar
    const userName = document.querySelector('.user-name');
    const userPlan = document.querySelector('.user-plan');
    
    if (userName) userName.textContent = user.displayName || user.email;
    if (userPlan) userPlan.textContent = 'Pro Plan'; // This would come from user data
    
    // Load default section
    showSection('work-management');
    
    // Initialize auth manager
    window.authManager = new AuthManager();
}

// Initialize auth manager when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    window.authManager = new AuthManager();
});