# reedturgeon.com

Personal website built with Astro and Tailwind CSS.

## Hosting / DNS

- [GoDaddy](https://dcc.godaddy.com/control/dnsmanagement?domainName=reedturgeon.com)

| Type  | Name  | IP Address                    | TTL       | What is this?                             | 
| ---   | ---   | ---                           | ---       | ---                                       |
| A     | @     | 185.199.108.153	            | 1 Hour    | GitHub Pages CDN IP                       |
| A     | @     | 185.199.109.153               | 1 Hour    | GitHub Pages CDN IP                       |
| A     | @     | 185.199.110.153               | 1 Hour    | GitHub Pages CDN IP                       |
| A     | @     | 185.199.111.153               | 1 Hour    | GitHub Pages CDN IP                       |
| CNAME | www   | reed-turgeon-domain.github.io | 1 Hour    | Points www subdomain to GitHub Pages site |

## ADRs

- [V0.0_astro-hosting.md](./DOCS/ADRs/V0.0_astro-hosting.md)

## Development Setup

### Prerequisites
- Node.js (v18+)
- npm

### Local Development

1. Clone the repository

```bash
git clone https://github.com/Reed-Turgeon-Domain/landingpage.git
cd landingpage
```

2. Install dependencies

```bash
npm install
```

3. Run the development server

```bash
npm run dev
```

4. Open the browser and navigate to `http://localhost:4321`

### Build

```bash
npm run build
```

Preview production build locally:

```bash
npm run preview
```


