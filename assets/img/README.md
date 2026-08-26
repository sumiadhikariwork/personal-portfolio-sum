# Photos

Drop your two photos into this folder with **exactly these filenames**:

| Filename            | Where it appears            | Best crop                                  |
|---------------------|-----------------------------|--------------------------------------------|
| `headshot.jpg`      | Hero, top right (arch frame)| Square-ish, face centred near the top third |
| `sumedha-city.jpg`  | Experience sidebar card     | Portrait / vertical, 3:4                    |

That's it — no code changes needed. Refresh the page and they appear.

**Until you add them**, each slot shows a designed orange-and-yellow monogram
placeholder with a small "add filename" hint, so the site still looks finished.
The hint text only shows on the placeholder — it disappears the moment a real
photo is in place.

### Tips
- Export at roughly **1000–1400 px** on the long edge and keep each file under
  ~400 KB so the page stays fast.
- `.jpg` is expected. If you'd rather use `.png` or `.webp`, update the two
  `src="..."` values in `index.html` to match.
- To nudge how the headshot is cropped inside the arch, change
  `object-position` on `.portrait__img` in `assets/css/style.css`
  (currently `center 18%` — a lower percentage moves the crop up).
