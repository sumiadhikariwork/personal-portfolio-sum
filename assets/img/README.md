# Photos

Both photos are in place. To swap either one, keep **exactly these filenames**:

| Filename            | Where it appears            | Best crop                                  |
|---------------------|-----------------------------|--------------------------------------------|
| `headshot.jpg`      | Hero, top right (arch frame)| Square-ish, face centred near the top third |
| `sumedha-city.jpg`  | Experience sidebar card     | Portrait / vertical, 3:4                    |

That's it — no code changes needed. Refresh the page and they appear.

**If a photo is missing**, its slot shows a designed orange-and-yellow monogram
placeholder with a small "add filename" hint, so the site still looks finished.
The hint text only shows on the placeholder — it disappears the moment a real
photo is in place.

### Tips
- Export at roughly **1000–1400 px** on the long edge and keep each file under
  ~400 KB so the page stays fast. `sumedha-city.jpg` was originally a 3840 px,
  1.7 MB export and has been resized to 675×1200 (158 KB) — visually identical
  in a ~350 px slot, but roughly ten times faster to load on mobile. The
  untouched original is still in git history if you ever want it back.
- `.jpg` is expected. If you'd rather use `.png` or `.webp`, update the two
  `src="..."` values in `index.html` to match.
- To nudge how a photo sits inside its frame, change `object-position` in
  `assets/css/style.css`: `.portrait__img` for the headshot (currently
  `center 18%`) and `.sidecard__photo img` for the city shot (currently
  `center 78%`, which keeps you large in frame rather than centring on the
  skyline). A **lower** percentage moves the visible crop **up**.
