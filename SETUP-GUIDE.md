# SulongDunong — Host Dashboard Setup Guide

This turns SulongDunong into a live site where your two hosts can log in to
`admin.html`, upload a photo and description, and have it appear on the
public site automatically — all for free, using Firebase (Google) + GitHub
Pages.

You only need to do this setup **once**. After that, your hosts just log in
and post.

---

## 1. Create a free Firebase project

1. Go to **console.firebase.google.com** and sign in with any Google account.
2. Click **Add project**, name it (e.g. `sulongdunong`), and finish the
   wizard (you can skip Google Analytics).
3. This uses Firebase's free **Spark plan** — no credit card, no cost, for
   this scale of use.

## 2. Register a web app and get your config

1. In your new project, click the **`</>`** (web) icon on the project
   overview page.
2. Give it a nickname (e.g. `sulongdunong-web`) and click **Register app**.
3. Firebase shows a `firebaseConfig` object with your keys. Copy the whole
   block.
4. Open **`firebase-config.js`** (included in this download) and paste your
   values in, replacing the `PASTE_...` placeholders. Save the file.

## 3. Turn on Email/Password login for your two hosts

1. In the left sidebar: **Build → Authentication → Get started**.
2. Under **Sign-in method**, enable **Email/Password**.
3. Go to the **Users** tab → **Add user**. Add an email + password for
   **each of your two hosts**. These are the credentials they'll use to log
   into `admin.html`.

## 4. Turn on Firestore Database (where post text is stored)

1. **Build → Firestore Database → Create database**.
2. Choose **Start in production mode**, pick a location close to you, click
   **Enable**.
3. Go to the **Rules** tab and replace the contents with:

   ```
   rules_version = '2';
   service cloud.firestore {
     match /databases/{database}/documents {
       match /posts/{postId} {
         allow read: if true;
         allow write: if request.auth != null;
       }
     }
   }
   ```

   This means: **anyone can read** posts (so your public site can show
   them), but **only signed-in hosts can add or delete** posts. Click
   **Publish**.

## 5. Turn on Storage (where photos are stored)

1. **Build → Storage → Get started**, keep the default settings, click
   **Done**.
2. Go to the **Rules** tab and replace the contents with:

   ```
   rules_version = '2';
   service firebase.storage {
     match /b/{bucket}/o {
       match /posts/{allPaths=**} {
         allow read: if true;
         allow write: if request.auth != null;
       }
     }
   }
   ```

3. Click **Publish**.

## 6. Deploy to GitHub Pages

1. Create a GitHub repository (e.g. `sulongdunong`) if you don't have one
   yet.
2. Upload these files to the **root** of the repo:
   - `sulongdunong.html`
   - `admin.html`
   - `firebase-config.js`
3. Go to your repo's **Settings → Pages**, set the source to your main
   branch (root folder), and save. GitHub will give you a link like
   `https://yourusername.github.io/sulongdunong/`.
4. Rename `sulongdunong.html` to `index.html` in the repo (or in your local
   copy before uploading) so your homepage loads at the root URL instead of
   needing `/sulongdunong.html` at the end.

## 7. Whitelist your GitHub Pages domain in Firebase

1. Back in Firebase: **Authentication → Settings → Authorized domains**.
2. Click **Add domain** and add your GitHub Pages domain, e.g.
   `yourusername.github.io`.
3. Without this step, login on the live site will be blocked.

## 8. You're live

- Public site: `https://yourusername.github.io/sulongdunong/`
- Host dashboard: `https://yourusername.github.io/sulongdunong/admin.html`

Your two hosts open the dashboard link, log in with the email/password you
set up in step 3, and can add a title, category, description, and photos.
New posts appear on the Blog page and in the Blog dropdown within seconds —
no need to touch any code again.

### Notes

- `admin.html` isn't linked anywhere on the public site (no nav link points
  to it) — hosts just need to bookmark the direct URL. It's not indexed by
  search engines either.
- Only **one photo per post** is shown on the public blog card (the first
  one uploaded), even if a host uploads several — this keeps the card
  layout clean. All uploaded photos are still stored and reachable via
  Firestore if you want to show a gallery later.
- To edit a post, delete it and re-add it with the fix. Full in-place
  editing can be added later if you outgrow this.
- Everything here runs entirely in the browser (no server to maintain) —
  GitHub Pages just needs to serve static files, which is exactly what it
  does.
