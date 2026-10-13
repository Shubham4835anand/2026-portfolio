# 3D Portfolio: Shubham Anand

Next.js 14 + TypeScript + React Three Fiber.

## Run
    npm install
    npm run dev      # http://localhost:3000
    npm run build && npm start

## Customise
Edit `lib/data.ts` (name, email, GitHub, skill groups, projects). The sample projects are placeholders.
The 3D scene is `components/Scene.tsx`: a cloud of points (embeddings) with a query that retrieves its 7 nearest neighbours.
Change `K` / `N` there. Deploy for free on Vercel.
