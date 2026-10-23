# The Open Book — Assignment 3

A full-stack version of **The Open Book**, the independent bookstore project from the previous assignment. This version keeps the existing React UI and adds a PostgreSQL database, a JSON API, signup/login, persistent authentication sessions, and deployment support.

## Stack

- **Next.js 15 App Router** — the React frontend and API routes live in one app, so there is no separate Express server to deploy.
- **JavaScript only** — no TypeScript.
- **Tailwind CSS v4** — styling.
- **Neon PostgreSQL** — hosted database.
- **Prisma** — database schema, queries, and seed script.
- **NextAuth v4 + Credentials provider** — login and session handling.
- **bcryptjs** — password hashing.

## 1. Run the project locally

Requirements: Node.js 22 or newer and an available PostgreSQL database. A free Neon database works well.

1. Install dependencies:

   ```bash
   npm install
   ```

2. Copy `.env.example` to `.env.local` and replace every placeholder with real values. Never commit `.env.local`.

3. Generate Prisma Client and create the database tables:

   ```bash
   npm run db:generate
   npm run db:push
   ```

4. Insert the bookstore's starter data:

   ```bash
   npm run db:seed
   ```

5. Start the app:

   ```bash
   npm run dev
   ```

Open `http://localhost:3000`. Create an account at `/signup`, sign in at `/login`, and check the JSON endpoint at `/api/store`. The `/api/health` endpoint checks that the app can connect to PostgreSQL.

## 2. Environment variables

Create a local `.env.local` from `.env.example`:

- `DATABASE_URL`: Neon pooled connection string used by the running app.
- `DIRECT_URL`: Neon direct/unpooled connection string used for schema operations.
- `NEXTAUTH_SECRET`: a random secret used to sign/encrypt authentication tokens.
- `NEXTAUTH_URL`: `http://localhost:3000` locally; set it to the public site URL in production if your host requires it.

Generate a secret with Node.js:

```bash
node -e "console.log(require('crypto').randomBytes(32).toString('base64'))"
```

The `.gitignore` excludes `.env*` files while allowing `.env.example`. Before pushing, verify with:

```bash
git check-ignore .env.local
```

It should print `.env.local`. Never paste real connection strings or secrets into GitHub, screenshots, or the README.

## 3. Database schema in plain English

`prisma/schema.prisma` describes these tables:

- **User**: a reader's name, unique email, password hash, and timestamps. The raw password is never stored.
- **Account**, **Session**, and **VerificationToken**: tables expected by the NextAuth Prisma adapter. This app uses JWT sessions, but keeping the adapter's standard schema makes the auth setup compatible with the adapter.
- **Book**: each catalogue item, including title, author, price, category, cover path, alt text, and whether it is the featured book.
- **StaffPick**: the books recommended by the bookstore team and their descriptions.
- **StoreEvent**: events displayed on the page, including date, type, title, and time.

`prisma/seed.js` uses `upsert`, so running it again updates the starter records instead of duplicating them.

## 4. How the API and database connect

- `lib/prisma.js` creates one reusable Prisma Client instance.
- `app/api/store/route.js` handles `GET /api/store`, reads books, the featured book, staff picks, and events from PostgreSQL, and returns JSON.
- `app/api/health/route.js` handles `GET /api/health` and returns a database connection status.
- `app/api/signup/route.js` validates signup data, hashes the password with bcrypt, and inserts the user in PostgreSQL.
- `app/api/auth/[...nextauth]/route.js` exposes NextAuth's authentication endpoints.
- `lib/auth.js` checks the email/password and configures JWT sessions. NextAuth stores the session token in a cookie, so a page refresh does not sign the user out.
- `components/HomeClient.jsx` fetches `/api/store`; the home page no longer uses a hardcoded JavaScript catalogue.
- `components/Header.jsx` uses `useSession()` to show the signed-in user's name and **Sign out**, or **Sign in / Join us** when signed out.

## 5. Deploy with Neon + Vercel

This is a Next.js app, so the frontend and API deploy together as one Vercel project.

1. Create a free PostgreSQL project at [Neon](https://neon.tech/) and copy both its pooled and direct connection strings.
2. Set the four environment variables from `.env.example` in the Vercel project's **Settings → Environment Variables**. Set `DATABASE_URL` to the pooled URL, `DIRECT_URL` to the direct URL, `NEXTAUTH_SECRET` to a strong random value, and `NEXTAUTH_URL` to the final HTTPS deployment URL if needed by your configuration.
3. Before the first deployment, apply the schema and seed data from your computer using the real database URLs in `.env.local`:

   ```bash
   npm run db:push
   npm run db:seed
   ```

4. Push this project to your existing Git repository. Make sure `.env.local` is not staged or committed.
5. Import that repository into [Vercel](https://vercel.com/). Use the default Next.js build settings and deploy.
6. In Vercel, confirm the environment variables are set for the Production environment, then redeploy if you changed them.
7. Test the deployed URL:
   - `/` — catalogue loads from PostgreSQL.
   - `/api/store` — JSON data from PostgreSQL.
   - `/api/health` — should return `{"status":"ok","database":"connected"}`.
   - `/signup` — create a new user.
   - `/login` — sign in, refresh the page, and confirm the header still shows the signed-in state.
   - Sign out and confirm the header returns to the signed-out state.

If you use a Vercel preview URL first, set `NEXTAUTH_URL` to the URL you are actually testing if NextAuth needs it; update it to the production URL before final assessment.

## Project structure

```text
the-open-book/
├── app/
│   ├── api/
│   │   ├── auth/[...nextauth]/route.js  # NextAuth endpoints
│   │   ├── health/route.js              # database health check
│   │   ├── signup/route.js              # signup endpoint
│   │   └── store/route.js               # bookstore JSON API
│   ├── login/page.jsx
│   ├── signup/page.jsx
│   ├── globals.css
│   ├── layout.jsx
│   ├── page.jsx
│   └── providers.jsx
├── components/                          # existing bookstore UI and auth forms
├── lib/
│   ├── auth.js                           # NextAuth configuration
│   └── prisma.js                         # database client
├── prisma/
│   ├── schema.prisma                     # database schema
│   └── seed.js                           # initial bookstore data
├── public/images/                        # existing book covers
├── .env.example                          # safe template, no real secrets
├── .gitignore
├── package.json
└── README.md
```

## Useful commands

```bash
npm run dev          # local development
npm run build        # production build
npm run start        # run the production build locally
npm run db:generate  # generate Prisma Client
npm run db:push      # sync schema to the database (good for this assignment)
npm run db:seed      # insert/update starter data
npm run db:studio    # inspect tables in Prisma Studio
```

For a larger production project, use versioned Prisma migrations instead of `db push`. For this assignment, `db push` is a simple way to create the schema in your own Neon database and explain each table.

## Suggested commits

Make small commits as you implement and understand the work, for example:

1. `feat: add Prisma schema and Postgres configuration`
2. `feat: seed bookstore data into Postgres`
3. `feat: add store JSON API`
4. `feat: add signup and password hashing`
5. `feat: configure NextAuth login and sessions`
6. `feat: connect bookstore UI to database API`
7. `docs: add deployment and environment setup`

Do not commit real environment files or make commits that pretend to represent work you did not do.
