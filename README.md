# Sumedha Adhikari — Portfolio

A single-page portfolio built around the **work**: the AI applications, the
enterprise programs, and the numbers attached to each — closing on the
Deloitte USI and Infosys experience.

**Live sections:** Hero → Impact metrics → Approach → Projects → Enterprise
builds → Experience → Competencies → Recognition → Contact.

---

## 1. Add your photos (the only step left)

Put two files in `assets/img/`:

- `headshot.jpg` — the professional headshot (hero, top right)
- `sumedha-city.jpg` — the San Francisco photo (experience sidebar)

See `assets/img/README.md` for crops and sizing. Until they're added, both
slots show a designed orange/yellow monogram placeholder, so nothing looks
broken.

## 2. Publish it (free, ~2 minutes)

GitHub Pages serves this as-is — there's no build step.

1. Push this branch and merge it to `main`.
2. Repo → **Settings** → **Pages**.
3. Under *Build and deployment*, set **Source: Deploy from a branch**,
   **Branch: `main`**, folder **`/ (root)`**. Save.
4. In about a minute it's live at
   `https://sumiadhikariwork.github.io/personal-portfolio-sum/`.

To use a custom domain later, add a `CNAME` file containing your domain and
point the DNS at GitHub Pages.

### Preview locally

```bash
python3 -m http.server 8000
# then open http://localhost:8000
```

## 3. Editing the content

Everything lives in three files — no framework, no dependencies, no build.

| File                   | What's in it                                        |
|------------------------|-----------------------------------------------------|
| `index.html`           | All copy and structure                               |
| `assets/css/style.css` | Colours, type, layout, responsive rules              |
| `assets/js/main.js`    | Scroll reveals, counters, tilt, mood switch, easter eggs |

**Colours** are CSS variables at the very top of `style.css` — change
`--accent` (orange), `--accent-2` (yellow) or `--paper` (beige) in one place
and the whole site follows.

**Metrics** are in the `.metrics` section of `index.html`. Each one is
`data-count="65000" data-suffix="+"` — edit those two attributes and the
count-up animation adjusts itself.

**Adding a project:** copy any `<article class="card card--feature reveal tilt">`
block in the `#projects` section, change the text and the link. The grid
reflows on its own.

## 4. Hidden touches

- **Mood button** (top right) cycles four warm accent palettes.
- **The rotating "Open to projects" badge** on the headshot is clickable —
  it sets off confetti, with a different line each time.
- Typing `hire` anywhere on the page does something too.
- The hero verb cycles: *ship it → build it → prototype it → measure it →
  automate it*.
- `Cmd/Ctrl + P` prints cleanly as a one-page-ish PDF — the print stylesheet
  strips the nav, animations and dark backgrounds.

## Notes on the numbers

Every figure in **Impact**, **Enterprise builds**, **Experience** and
**Recognition** comes straight from the resume. The three public apps are
described by what they do and who they're for, with intent framed as
*"Designed to…"* / *"Goal"* rather than measured results — swap in real
adoption or time-saved figures whenever you have them, and they'll land
much harder.

## Accessibility & performance

- Fully responsive, no horizontal scroll at 390 px or 1440 px.
- Honours `prefers-reduced-motion` (all animation is disabled).
- Keyboard-navigable with visible focus rings and a skip link.
- No JS dependencies, no tracking. Only external request is Google Fonts.
