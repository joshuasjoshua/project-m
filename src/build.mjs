// Generates the static site into the repo root. Run: npm run build
import { mkdirSync, writeFileSync, rmSync, existsSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { site, solutions, industries, products, projects, insights, process, clients, roles, loremText } from './data.mjs';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const outDirs = ['solutions', 'industries', 'products', 'work', 'insights', 'process', 'careers', 'contact', 'about', 'privacy', 'terms', 'cookies'];
for (const d of outDirs) if (existsSync(join(root, d))) rmSync(join(root, d), { recursive: true });

const [L1, L2] = loremText;
const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

// ---------- layout ----------
function layout({ path, title, description, body }) {
  const depth = path === '' ? 0 : path.split('/').length;
  const r = (p) => '../'.repeat(depth) + p;
  const fullTitle = title ? `${title} · ${site.name}` : `${site.name} · ${site.tagline}`;
  const dd = (label, base, items, all) => `
        <li class="has-menu">
          <button class="nav-link" aria-expanded="false">${label} <span class="caret">▾</span></button>
          <div class="menu">
            <ul>${items.map((i) => `<li><a href="${r(`${base}/${i.slug}/`)}">${esc(i.title)}</a></li>`).join('')}</ul>
            <a class="menu-all" href="${r(`${base}/`)}">${all} →</a>
          </div>
        </li>`;
  const col = (h, base, items) => `
        <div><h4>${h}</h4><ul>${items.map((i) => `<li><a href="${r(`${base}/${i.slug}/`)}">${esc(i.short || i.title)}</a></li>`).join('')}</ul></div>`;

  return `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>${esc(fullTitle)}</title>
  <meta name="description" content="${esc(description || 'Align Technology is a product engineering and AI studio in Jamaica building software for founders, enterprises, NGOs and government.')}">
  <meta name="robots" content="noindex">
  <meta name="theme-color" content="#F7F5F0">
  <link rel="icon" href="${r('assets/img/favicon.svg')}" type="image/svg+xml">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&family=Space+Grotesk:wght@500;600;700&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="${r('assets/css/style.css')}">
</head>
<body>
  <div class="preview-bar">Preview build · placeholder content · <a href="${site.feedbackUrl}" target="_blank" rel="noopener">Suggest a change</a></div>
  <header class="site-header">
    <div class="wrap header-inner">
      <a class="logo" href="${r('')}" aria-label="${site.name} home"><img src="${r('assets/img/logo.svg')}" alt="" width="32" height="32"><span>Align<b>Technology</b></span></a>
      <button class="nav-toggle" aria-label="Open menu" aria-expanded="false"><span></span><span></span><span></span></button>
      <nav class="site-nav" aria-label="Main">
        <ul class="nav-list">${dd('Solutions', 'solutions', solutions, 'All solutions')}${dd('Industries', 'industries', industries, 'All industries')}${dd('Products', 'products', products, 'All products')}
          <li><a class="nav-link" href="${r('work/')}">Work</a></li>
          <li><a class="nav-link" href="${r('process/')}">Process</a></li>
          <li><a class="nav-link" href="${r('insights/')}">Insights</a></li>
          <li><a class="nav-link" href="${r('about/')}">About</a></li>
        </ul>
        <a class="btn btn-primary nav-cta" href="${r('contact/')}">Start a project</a>
      </nav>
    </div>
  </header>
  <main>
${body(r)}
  </main>
  <footer class="site-footer">
    <div class="wrap">
      <div class="footer-top">
        <div class="footer-brand">
          <a class="logo logo-light" href="${r('')}"><img src="${r('assets/img/logo.svg')}" alt="" width="32" height="32"><span>Align<b>Technology</b></span></a>
          <p>${site.tagline} Built in ${site.location}.</p>
          <a class="btn btn-primary" href="${r('contact/')}">Start a project</a>
          <ul class="social">${Object.entries(site.social).map(([k, v]) => `<li><a href="${v}">${k}</a></li>`).join('')}</ul>
        </div>
        <div class="footer-cols">${col('Solutions', 'solutions', solutions)}${col('Industries', 'industries', industries)}${col('Products', 'products', products)}
          <div><h4>Company</h4><ul>
            <li><a href="${r('about/')}">About</a></li>
            <li><a href="${r('process/')}">Process</a></li>
            <li><a href="${r('work/')}">Client Work</a></li>
            <li><a href="${r('insights/')}">Insights</a></li>
            <li><a href="${r('careers/')}">Careers</a></li>
            <li><a href="${r('contact/')}">Contact</a></li>
          </ul></div>
        </div>
      </div>
      <div class="footer-bottom">
        <span>© ${new Date().getFullYear()} ${site.name}. All rights reserved.</span>
        <span><a href="${r('privacy/')}">Privacy</a> · <a href="${r('terms/')}">Terms</a> · <a href="${r('cookies/')}">Cookies</a></span>
      </div>
    </div>
  </footer>
  <script src="${r('assets/js/main.js')}"></script>
</body>
</html>
`;
}

function write(path, opts) {
  const dir = join(root, path);
  mkdirSync(dir, { recursive: true });
  writeFileSync(join(dir, 'index.html'), layout({ path, ...opts }));
}

// ---------- shared pieces ----------
const thumb = (hue, label) =>
  `<div class="thumb" style="--h:${hue}"><span>${esc(label)}</span></div>`;

const pageHero = (eyebrow, title, intro, extra = '') => `
    <section class="page-hero">
      <div class="wrap">
        <p class="eyebrow">${eyebrow}</p>
        <h1>${title}</h1>
        <p class="lead">${intro}</p>${extra}
      </div>
    </section>`;

const cta = (r) => `
    <section class="cta">
      <div class="wrap cta-inner">
        <div>
          <h2>Bring us the problem.<br>We'll bring the product.</h2>
          <p>A short conversation is all it takes to start. No pitch deck required.</p>
        </div>
        <div class="cta-actions">
          <a class="btn btn-accent" href="${r('contact/')}">Start a project</a>
          <a class="btn btn-ghost-light" href="${r('work/')}">See our work</a>
        </div>
      </div>
    </section>`;

const card = (r, href, icon, title, text, linkText = 'Explore') => `
          <a class="card" href="${r(href)}">
            <span class="card-icon">${icon}</span>
            <h3>${esc(title)}</h3>
            <p>${esc(text)}</p>
            <span class="card-link">${linkText} →</span>
          </a>`;

const projectCard = (r, p) => `
          <a class="project" href="${r(`work/${p.slug}/`)}">
            ${thumb(p.hue, p.industry)}
            <div class="project-body">
              <p class="meta">${esc(p.client)} · ${p.year}</p>
              <h3>${esc(p.title)}</h3>
              <p class="result">${esc(p.result)}</p>
              <span class="card-link">Read the case study →</span>
            </div>
          </a>`;

const productCard = (r, p) => `
          <a class="product" href="${r(`products/${p.slug}/`)}">
            ${thumb(p.hue, p.title)}
            <div class="project-body">
              <p class="meta">${esc(p.category)}</p>
              <h3>${esc(p.title)}</h3>
              <p>${esc(p.blurb)}</p>
              <span class="card-link">View product →</span>
            </div>
          </a>`;

const insightCard = (r, i) => `
          <a class="insight" href="${r(`insights/${i.slug}/`)}">
            <p class="meta">${i.tag} · ${i.date} · ${i.mins} min read</p>
            <h3>${esc(i.title)}</h3>
            <span class="card-link">Read →</span>
          </a>`;

const steps = () => `
        <ol class="steps">${process.map((s, i) => `
          <li><span class="step-num">0${i + 1}</span><h3>${s.title}</h3><p>${s.text}</p></li>`).join('')}
        </ol>`;

// ---------- home ----------
write('', {
  title: '',
  body: (r) => `
    <section class="hero">
      <div class="wrap hero-inner">
        <div>
          <p class="eyebrow">Product engineering & AI studio · Jamaica</p>
          <h1>Software that ships.<br><span class="accent">Products that last.</span></h1>
          <p class="lead">Align Technology designs, builds and runs software for founders, enterprises, NGOs and governments across the Caribbean and beyond. ${L1.slice(0, 57)}</p>
          <div class="hero-actions">
            <a class="btn btn-primary" href="${r('contact/')}">Start a project</a>
            <a class="btn btn-ghost" href="${r('work/')}">See our work</a>
          </div>
        </div>
        <div class="hero-art" aria-hidden="true">
          <div class="orb"></div>
          <div class="hero-card c1"><b>99.9%</b><span>Uptime target</span></div>
          <div class="hero-card c2"><b>2-week</b><span>Sprint demos</span></div>
          <div class="hero-card c3"><b>JM 🇯🇲</b><span>Local team</span></div>
        </div>
      </div>
    </section>

    <section class="stats">
      <div class="wrap">
        <h2 class="stats-title">Built for institutions that can't afford to get software wrong.</h2>
        <div class="stat-row">
          <div><b data-count="8">8</b><span>Own products</span></div>
          <div><b data-count="40">40</b>+<span>Clients served</span></div>
          <div><b data-count="7">7</b><span>Industries</span></div>
          <div><b data-count="12">12</b><span>Years combined experience</span></div>
        </div>
      </div>
    </section>

    <section class="logos">
      <div class="wrap">
        <p class="eyebrow center">Trusted by teams across the region</p>
        <div class="logo-strip">${clients.map((c) => `<span>${c}</span>`).join('')}</div>
      </div>
    </section>

    <section class="section">
      <div class="wrap">
        <div class="section-head">
          <p class="eyebrow"><span class="num">01</span> What we build</p>
          <h2>The whole lifecycle, not just the code.</h2>
          <p>${L2}</p>
        </div>
        <div class="grid grid-3">${solutions.slice(0, 6).map((s) => card(r, `solutions/${s.slug}/`, s.icon, s.title, s.blurb)).join('')}
        </div>
        <p class="section-more"><a class="btn btn-ghost" href="${r('solutions/')}">Explore all solutions</a></p>
      </div>
    </section>

    <section class="section alt">
      <div class="wrap">
        <div class="section-head">
          <p class="eyebrow">How we work</p>
          <h2>Five steps from idea to impact.</h2>
        </div>
        ${steps()}
        <p class="section-more"><a class="btn btn-ghost" href="${r('process/')}">See how we'd approach your project</a></p>
      </div>
    </section>

    <section class="section">
      <div class="wrap">
        <div class="section-head">
          <p class="eyebrow"><span class="num">02</span> Products we've built & run</p>
          <h2>We build our own products too.</h2>
          <p>${L1}</p>
        </div>
        <div class="grid grid-4">${products.map((p) => productCard(r, p)).join('')}
        </div>
        <p class="section-more"><a class="btn btn-ghost" href="${r('products/')}">Explore our products</a> <a class="btn btn-primary" href="${r('contact/')}">Your product could be next</a></p>
      </div>
    </section>

    <section class="section alt">
      <div class="wrap">
        <div class="section-head">
          <p class="eyebrow"><span class="num">03</span> Selected work</p>
          <h2>Completed projects for our clients.</h2>
        </div>
        <div class="grid grid-3">${projects.slice(0, 3).map((p) => projectCard(r, p)).join('')}
        </div>
        <blockquote class="testimonial">
          <p>“${L2}”</p>
          <footer><b>Jane Placeholder</b>, Managing Director, Lorem Credit Union</footer>
        </blockquote>
        <p class="section-more"><a class="btn btn-ghost" href="${r('work/')}">View all work</a></p>
      </div>
    </section>

    <section class="section">
      <div class="wrap">
        <div class="section-head">
          <p class="eyebrow"><span class="num">04</span> Insights</p>
          <h2>Notes from the build.</h2>
        </div>
        <div class="grid grid-3">${insights.map((i) => insightCard(r, i)).join('')}
        </div>
        <p class="section-more"><a class="btn btn-ghost" href="${r('insights/')}">Read all insights</a></p>
      </div>
    </section>

    <section class="section initiative">
      <div class="wrap initiative-inner">
        <div>
          <p class="eyebrow">An Align initiative</p>
          <h2>Align Academy</h2>
          <p>Training the next generation of Jamaican product builders, analysts and engineers. ${L1}</p>
          <a class="btn btn-ghost" href="${r('about/')}">Learn about Align Academy</a>
        </div>
        ${thumb(30, 'Video placeholder')}
      </div>
    </section>
${cta(r)}`,
});

// ---------- solutions ----------
write('solutions', {
  title: 'Solutions',
  body: (r) => `${pageHero('Solutions', 'Everything you need to build, launch and run software.', L1)}
    <section class="section">
      <div class="wrap">
        <div class="grid grid-3">${solutions.map((s) => card(r, `solutions/${s.slug}/`, s.icon, s.title, s.blurb)).join('')}
        </div>
      </div>
    </section>
${cta(r)}`,
});

const detailPage = (r, { eyebrow, item, features, relatedTitle, related }) => `${pageHero(eyebrow, esc(item.title), esc(item.blurb), `
        <div class="hero-actions"><a class="btn btn-primary" href="${r('contact/')}">Start a project</a></div>`)}
    <section class="section">
      <div class="wrap two-col">
        <div>
          <h2>Overview</h2>
          <p>${L1}</p>
          <p>${L2}</p>
        </div>
        ${thumb(item.hue ?? 160, item.title)}
      </div>
    </section>
    <section class="section alt">
      <div class="wrap">
        <div class="section-head"><h2>What's included</h2></div>
        <div class="grid grid-4">${features.map((f) => `
          <div class="card static"><h3>${esc(f.title)}</h3><p>${esc(f.text)}</p></div>`).join('')}
        </div>
      </div>
    </section>
    <section class="section">
      <div class="wrap">
        <div class="section-head"><h2>${relatedTitle}</h2></div>
        <div class="grid grid-3">${related.map((p) => projectCard(r, p)).join('')}
        </div>
      </div>
    </section>
${cta(r)}`;

solutions.forEach((s, idx) =>
  write(`solutions/${s.slug}`, {
    title: s.title,
    description: s.blurb,
    body: (r) => detailPage(r, {
      eyebrow: 'Solutions',
      item: { ...s, hue: (idx * 33) % 360 },
      features: s.features,
      relatedTitle: 'Related work',
      related: projects.filter((p) => p.services.includes(s.title)).concat(projects).slice(0, 3),
    }),
  }),
);

// ---------- industries ----------
write('industries', {
  title: 'Industries',
  body: (r) => `${pageHero('Industries', 'Deep experience where the stakes are high.', L1)}
    <section class="section">
      <div class="wrap">
        <div class="grid grid-3">${industries.map((s) => card(r, `industries/${s.slug}/`, s.icon, s.title, s.blurb)).join('')}
        </div>
      </div>
    </section>
${cta(r)}`,
});

industries.forEach((s, idx) =>
  write(`industries/${s.slug}`, {
    title: s.title,
    description: s.blurb,
    body: (r) => detailPage(r, {
      eyebrow: 'Industries',
      item: { ...s, hue: (idx * 47 + 20) % 360 },
      features: [
        { title: 'Challenges we solve', text: L1.slice(0, 90) },
        { title: 'Compliance & security', text: L2.slice(0, 90) },
        { title: 'Integrations', text: L1.slice(40, 130) },
        { title: 'Outcomes', text: L2.slice(30, 120) },
      ],
      relatedTitle: `Work in ${s.title}`,
      related: projects.filter((p) => p.industry === s.title).concat(projects).slice(0, 3),
    }),
  }),
);

// ---------- products ----------
write('products', {
  title: 'Products',
  body: (r) => `${pageHero('Products', "Products we've built and run.", 'Alongside client work, Align builds and operates its own software products. ' + L2)}
    <section class="section">
      <div class="wrap">
        <div class="grid grid-4">${products.map((p) => productCard(r, p)).join('')}
        </div>
      </div>
    </section>
${cta(r)}`,
});

products.forEach((p) =>
  write(`products/${p.slug}`, {
    title: p.title,
    description: p.blurb,
    body: (r) => `${pageHero(`Products · ${p.category}`, esc(p.title), esc(p.blurb), `
        <div class="hero-actions"><a class="btn btn-primary" href="#">Visit ${esc(p.title)}</a><a class="btn btn-ghost" href="${r('contact/')}">Request a demo</a></div>`)}
    <section class="section">
      <div class="wrap">
        ${thumb(p.hue, `${p.title} screenshot`)}
      </div>
    </section>
    <section class="section alt">
      <div class="wrap">
        <div class="section-head"><h2>Key features</h2></div>
        <div class="grid grid-3">${['Lorem feature', 'Ipsum feature', 'Dolor feature', 'Sit amet feature', 'Consectetur feature', 'Adipiscing feature'].map((f) => `
          <div class="card static"><h3>${f}</h3><p>${L1.slice(0, 100)}</p></div>`).join('')}
        </div>
      </div>
    </section>
    <section class="section">
      <div class="wrap two-col">
        <div><h2>Who it's for</h2><p>${L2}</p><p>${L1}</p></div>
        <div class="card static pricing"><p class="meta">Pricing</p><h3>From $XX / month</h3><p>Placeholder pricing. ${L2.slice(0, 80)}</p><a class="btn btn-primary" href="${r('contact/')}">Talk to sales</a></div>
      </div>
    </section>
${cta(r)}`,
  }),
);

// ---------- work ----------
write('work', {
  title: 'Client Work',
  body: (r) => `${pageHero('Client work', 'Projects we have delivered.', 'A selection of completed projects. All names and details below are placeholders. ' + L1)}
    <section class="section">
      <div class="wrap">
        <div class="filter" role="group" aria-label="Filter by industry">
          <button class="chip is-active" data-filter="all">All</button>${[...new Set(projects.map((p) => p.industry))].map((i) => `
          <button class="chip" data-filter="${esc(i)}">${esc(i)}</button>`).join('')}
        </div>
        <div class="grid grid-3 filterable">${projects.map((p) => projectCard(r, p).replace('class="project"', `class="project" data-industry="${esc(p.industry)}"`)).join('')}
        </div>
      </div>
    </section>
${cta(r)}`,
});

projects.forEach((p) =>
  write(`work/${p.slug}`, {
    title: p.title,
    body: (r) => `${pageHero(`Case study · ${esc(p.industry)}`, esc(p.title), L1)}
    <section class="section">
      <div class="wrap">
        <dl class="facts">
          <div><dt>Client</dt><dd>${esc(p.client)}</dd></div>
          <div><dt>Industry</dt><dd>${esc(p.industry)}</dd></div>
          <div><dt>Year</dt><dd>${p.year}</dd></div>
          <div><dt>Services</dt><dd>${p.services.map(esc).join(', ')}</dd></div>
          <div><dt>Result</dt><dd>${esc(p.result)}</dd></div>
        </dl>
        ${thumb(p.hue, `${p.title}`)}
      </div>
    </section>
    <section class="section">
      <div class="wrap prose">
        <h2>The challenge</h2><p>${L1}</p><p>${L2}</p>
        <h2>Our approach</h2><p>${L2}</p>
        <ul><li>Lorem ipsum dolor sit amet</li><li>Consectetur adipiscing elit</li><li>Sed do eiusmod tempor incididunt</li></ul>
        <h2>The outcome</h2><p>${L1}</p>
        <blockquote class="testimonial"><p>“${L1.slice(0, 120)}.”</p><footer><b>John Placeholder</b>, ${esc(p.client)}</footer></blockquote>
      </div>
    </section>
    <section class="section alt">
      <div class="wrap">
        <div class="section-head"><h2>More work</h2></div>
        <div class="grid grid-3">${projects.filter((x) => x !== p).slice(0, 3).map((x) => projectCard(r, x)).join('')}
        </div>
      </div>
    </section>
${cta(r)}`,
  }),
);

// ---------- process ----------
write('process', {
  title: 'Process',
  body: (r) => `${pageHero('Process', 'How we take products from idea to impact.', L2)}
    <section class="section">
      <div class="wrap">${steps()}
      </div>
    </section>
    <section class="section alt">
      <div class="wrap two-col">
        <div><h2>Engagement models</h2><p>${L1}</p></div>
        <div class="grid grid-1">${['Fixed-scope project', 'Dedicated product team', 'Ongoing support & retainer'].map((m) => `
          <div class="card static"><h3>${m}</h3><p>${L2.slice(0, 110)}</p></div>`).join('')}
        </div>
      </div>
    </section>
${cta(r)}`,
});

// ---------- insights ----------
write('insights', {
  title: 'Insights',
  body: (r) => `${pageHero('Insights', 'Notes on building software in the Caribbean.', L1)}
    <section class="section">
      <div class="wrap">
        <div class="grid grid-3">${insights.map((i) => insightCard(r, i)).join('')}
        </div>
      </div>
    </section>
${cta(r)}`,
});

insights.forEach((i) =>
  write(`insights/${i.slug}`, {
    title: i.title,
    body: (r) => `${pageHero(`${i.tag} · ${i.date} · ${i.mins} min read`, esc(i.title), L2)}
    <section class="section">
      <div class="wrap prose">
        <p>${L1} ${L2}</p>
        <h2>Lorem ipsum dolor</h2><p>${L2} ${L1}</p>
        <h2>Sit amet consectetur</h2><p>${L1}</p>
        <ul><li>Aenean lacinia bibendum nulla sed consectetur</li><li>Nullam id dolor id nibh ultricies vehicula</li><li>Cum sociis natoque penatibus et magnis</li></ul>
        <p>${L2}</p>
        <p><a href="${r('insights/')}">← Back to all insights</a></p>
      </div>
    </section>
${cta(r)}`,
  }),
);

// ---------- about ----------
write('about', {
  title: 'About',
  body: (r) => `${pageHero('About Align', 'A Jamaican product engineering studio.', L1)}
    <section class="section">
      <div class="wrap two-col">
        <div><h2>Our story</h2><p>${L1}</p><p>${L2}</p></div>
        ${thumb(160, 'Team photo placeholder')}
      </div>
    </section>
    <section class="section alt">
      <div class="wrap">
        <div class="section-head"><h2>What we value</h2></div>
        <div class="grid grid-4">${['Ship it right', 'Own the outcome', 'Build locally, think globally', 'Keep it simple'].map((v) => `
          <div class="card static"><h3>${v}</h3><p>${L2.slice(0, 100)}</p></div>`).join('')}
        </div>
      </div>
    </section>
    <section class="section">
      <div class="wrap">
        <div class="section-head"><h2>Leadership</h2></div>
        <div class="grid grid-4">${['Founder & CEO', 'CTO', 'Head of Product', 'Head of Delivery'].map((t, i) => `
          <div class="person"><div class="avatar" style="--h:${i * 70 + 140}">${['AB', 'CD', 'EF', 'GH'][i]}</div><h3>Name Placeholder</h3><p class="meta">${t}</p></div>`).join('')}
        </div>
      </div>
    </section>
    <section class="section alt initiative">
      <div class="wrap initiative-inner">
        <div><p class="eyebrow">An Align initiative</p><h2>Align Academy</h2><p>${L2}</p></div>
        ${thumb(30, 'Academy photo placeholder')}
      </div>
    </section>
${cta(r)}`,
});

// ---------- careers ----------
write('careers', {
  title: 'Careers',
  body: (r) => `${pageHero('Careers', 'Build products that matter, from Jamaica.', L2)}
    <section class="section">
      <div class="wrap">
        <div class="section-head"><h2>Open roles</h2></div>
        <ul class="roles">${roles.map((j) => `
          <li><div><h3>${j.title}</h3><p class="meta">${j.type} · ${j.place}</p></div><a class="btn btn-ghost" href="${r('contact/')}">Apply</a></li>`).join('')}
        </ul>
      </div>
    </section>
    <section class="section alt">
      <div class="wrap">
        <div class="section-head"><h2>Why Align</h2></div>
        <div class="grid grid-3">${['Real products, real users', 'Learning budget', 'Flexible hybrid work'].map((b) => `
          <div class="card static"><h3>${b}</h3><p>${L1.slice(0, 100)}</p></div>`).join('')}
        </div>
      </div>
    </section>
${cta(r)}`,
});

// ---------- contact ----------
write('contact', {
  title: 'Contact',
  body: (r) => `${pageHero('Start a project', "Tell us what you're building.", 'Share a few details and we will get back to you within two business days. No pitch deck required.')}
    <section class="section">
      <div class="wrap two-col contact">
        <form class="form" action="#" onsubmit="event.preventDefault(); this.querySelector('.form-note').hidden = false;">
          <div class="field-row">
            <label>Name<input name="name" required></label>
            <label>Email<input type="email" name="email" required></label>
          </div>
          <div class="field-row">
            <label>Company<input name="company"></label>
            <label>Budget
              <select name="budget"><option>Not sure yet</option><option>Under US$10k</option><option>US$10k–50k</option><option>US$50k+</option></select>
            </label>
          </div>
          <label>What do you need help with?
            <select name="service">${solutions.map((s) => `<option>${esc(s.title)}</option>`).join('')}</select>
          </label>
          <label>Project details<textarea name="message" rows="5" required></textarea></label>
          <button class="btn btn-primary" type="submit">Send message</button>
          <p class="form-note" hidden>Thanks! (Preview only: this form is not connected yet.)</p>
        </form>
        <aside class="contact-info">
          <h3>Get in touch</h3>
          <p><b>Email</b><br><a href="mailto:${site.email}">${site.email}</a></p>
          <p><b>Phone</b><br>${site.phone}</p>
          <p><b>Office</b><br>${site.address}</p>
          <div class="map">${thumb(170, 'Map placeholder')}</div>
        </aside>
      </div>
    </section>`,
});

// ---------- legal ----------
for (const [slug, title] of [['privacy', 'Privacy Policy'], ['terms', 'Terms of Service'], ['cookies', 'Cookie Policy']]) {
  write(slug, {
    title,
    body: () => `${pageHero('Legal', title, 'Last updated: placeholder date. This page needs real legal text before launch.')}
    <section class="section">
      <div class="wrap prose">
        ${['Introduction', 'Information we collect', 'How we use information', 'Your rights', 'Contact us'].map((h) => `<h2>${h}</h2><p>${L1} ${L2}</p>`).join('\n        ')}
      </div>
    </section>`,
  });
}

// ---------- 404 ----------
writeFileSync(
  join(root, '404.html'),
  layout({
    path: '',
    title: 'Page not found',
    body: () => `${pageHero('404', 'Page not found.', 'The page you are looking for does not exist. <a href="/project-m/">Go home</a>.')}`,
  }).replace(/href="(?!https?:|#|mailto:|\/)([^"]*)"/g, 'href="/project-m/$1"').replace(/src="(?!https?:|\/)([^"]*)"/g, 'src="/project-m/$1"'),
);

console.log('Site built.');
