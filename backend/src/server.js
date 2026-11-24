import app from "./app.js";
import { env } from "./config/env.js";
import { connectDB } from "./config/db.js";
import { seedPostsIfEmpty } from "./services/post.service.js";
async function startServer() {
  await connectDB();
  await seedPostsIfEmpty();
  app.listen(env.PORT, () => {
    console.log(
      `ChandraOCR 2 backend running on http://localhost:${env.PORT}`,
    );
  });
}
startServer();
