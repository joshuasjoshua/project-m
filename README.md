# Project M: Align Technology website

Placeholder build of the website for **Align Technology**, a product engineering & AI studio in Jamaica. Structure is modelled on techsolutely.co.zw. All names, numbers, projects, people and copy are placeholders (lorem ipsum) to be replaced.

**Live preview:** https://joshuasjoshua.github.io/project-m/ (GitHub Pages, served from the `main` branch root)

## Pages

| Section | Pages |
| --- | --- |
| Home | Hero, stats, client logos, services, process, products, selected work, insights, Align Academy, CTA |
| Solutions | Overview + 11 service pages |
| Industries | Overview + 7 industry pages |
| Products | Overview + 8 fictional in-house products |
| Work | Filterable portfolio + 6 fictional case studies |
| Company | About, Process, Insights (+3 articles), Careers, Contact |
| Legal | Privacy, Terms, Cookies, 404 |

## Editing

The HTML is generated. Don't edit the `index.html` files by hand.

- **Text and lists** (services, industries, products, projects, articles, jobs, contact details): `src/data.mjs`
- **Page layouts**: `src/build.mjs`
- **Colours, fonts, spacing**: the variables at the top of `assets/css/style.css`
- **Logo**: `assets/img/logo.svg`

To remove a page (e.g. an industry), delete its entry in `src/data.mjs` and rebuild. Menus, footer and links update automatically.

```bash
npm run build      # regenerate the HTML
npm run preview    # build and serve at http://localhost:8080
```

Requires Node 18+ (and Python 3 for `preview`). No other dependencies.

## Feedback

The yellow bar at the top of every page has a **Suggest a change** link that opens a GitHub issue on this repo. Reviewers need a free GitHub account.

## Before launch

- Replace placeholder copy, images, logo and colours
- Connect the contact form (e.g. Formspree, Web3Forms or Netlify Forms)
- Remove the preview bar and the `noindex` meta tag in `src/build.mjs`
- Add real legal text, analytics and a custom domain (`CNAME`)
