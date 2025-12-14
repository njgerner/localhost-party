// Prisma configuration
// For local dev without database: prisma generate works with dummy URL
// For production: DATABASE_URL must be set
import "dotenv/config";
import { defineConfig } from "prisma/config";

// Use DATABASE_URL if available, otherwise use dummy for prisma generate
const databaseUrl =
  process.env.DATABASE_URL || "postgresql://dummy:dummy@localhost:5432/dummy";

export default defineConfig({
  schema: "prisma/schema.prisma",
  migrations: {
    path: "prisma/migrations",
  },
  datasource: {
    url: databaseUrl,
  },
});
