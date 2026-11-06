import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Keep tracing inside this app folder (parent monorepo also has a lockfile).
  outputFileTracingRoot: __dirname,
  serverExternalPackages: ['@electric-sql/pglite', 'pg'],
}

export default nextConfig
