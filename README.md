# Sheikh Mahir Abrar — Portfolio

A personal portfolio website built with pure HTML, CSS, and JavaScript.

---

## 🚀 Step-by-Step: Deploy to GitHub Pages

### Step 1 — Create a GitHub Repository

1. Go to [github.com](https://github.com) and sign in (or create a free account).
2. Click the **+** icon in the top-right → **New repository**.
3. Name it exactly: **`your-username.github.io`**
   - Example: if your username is `mahir-abrar`, name it `mahir-abrar.github.io`
   - This makes your site available at `https://mahir-abrar.github.io`
4. Set it to **Public**.
5. Do **not** check "Add README". Click **Create repository**.

---

### Step 2 — Prepare Your Files

Your portfolio folder should look like this:

```
portfolio/
├── index.html
├── styles.css
├── script.js
└── assets/
    ├── portfolio_image.jpg   ← your photo
    └── Resume__Feb_2026.pdf  ← your resume PDF
```

**Important:** Create the `assets/` folder and place your photo and resume PDF inside it.

---

### Step 3 — Upload Files to GitHub

**Option A — Using the GitHub website (easiest):**

1. Open your new repository on GitHub.
2. Click **Add file** → **Upload files**.
3. Drag and drop ALL files:
   - `index.html`
   - `styles.css`
   - `script.js`
4. Click **Commit changes**.
5. Repeat: click **Add file** → **Upload files** → create a folder by typing `assets/` before the filename in the path field.
6. Upload `portfolio_image.jpg` and `Resume__Feb_2026.pdf` inside `assets/`.

**Option B — Using Git (command line):**

```bash
# Clone your repo
git clone https://github.com/your-username/your-username.github.io
cd your-username.github.io

# Copy your portfolio files here
# Then:
git add .
git commit -m "Initial portfolio deployment"
git push origin main
```

---

### Step 4 — Enable GitHub Pages

1. Go to your repository on GitHub.
2. Click **Settings** (top menu).
3. In the left sidebar, click **Pages**.
4. Under **Source**, select **Deploy from a branch**.
5. Set branch to **main** and folder to **/ (root)**.
6. Click **Save**.

---

### Step 5 — Your Site is Live! 🎉

After 1–2 minutes, your portfolio will be live at:

```
https://your-username.github.io
```

GitHub will also show you the URL in the Pages settings section.

---

## 🛠 Customization Tips

| What to change | Where |
|---|---|
| Name, bio text | `index.html` |
| Colors | `styles.css` → `:root` variables |
| Fonts | `styles.css` → `--font-*` variables |
| Add new sections | `index.html` + `styles.css` |
| Profile photo | Replace `assets/portfolio_image.jpg` |
| Resume PDF | Replace `assets/Resume__Feb_2026.pdf` |

---

## 📁 File Structure

```
index.html    — Main page with all sections
styles.css    — All styling, animations, responsive design
script.js     — Custom cursor, scroll reveal, typing effect
assets/       — Images and PDF files
```

---

## ✨ Features

- Custom animated cursor (orange ring + dot)
- Smooth scroll reveal animations
- Typing effect on hero title
- 3D photo tilt on mouse move
- Floating photo tags
- Active nav highlighting
- Fully responsive (mobile-friendly)
- One-click CV download
- Hamburger menu on mobile

---

*Built for Sheikh Mahir Abrar · 2026*
