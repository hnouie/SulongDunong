// ============================================================
// SulongDunong — Firebase Configuration
// ------------------------------------------------------------
// This file is shared by both sulongdunong.html (the public
// site) and admin.html (the host dashboard).
//
// 1. Create a free Firebase project — see SETUP-GUIDE.md.
// 2. In Firebase console: Project settings (⚙) → General →
//    "Your apps" → Web app → copy the firebaseConfig object.
// 3. Replace the placeholder values below with your real ones.
// 4. Save this file and upload it to your GitHub repo in the
//    SAME folder as sulongdunong.html and admin.html.
//
// Do not share your Firebase config publicly beyond your repo —
// it's not a secret password, but keep Firestore/Storage rules
// locked down as shown in SETUP-GUIDE.md so only your two hosts
// can write data.
// ============================================================

var firebaseConfig = {
  apiKey: "PASTE_YOUR_API_KEY_HERE",
  authDomain: "PASTE_YOUR_PROJECT_ID.firebaseapp.com",
  projectId: "PASTE_YOUR_PROJECT_ID",
  storageBucket: "PASTE_YOUR_PROJECT_ID.appspot.com",
  messagingSenderId: "PASTE_YOUR_SENDER_ID",
  appId: "PASTE_YOUR_APP_ID"
};
