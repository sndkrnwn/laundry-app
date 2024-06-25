import path from "path";
import { fileURLToPath } from "url";

// Convert the URL to a path
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/** @type {import('next').NextConfig} */
const nextConfig = {
  sassOptions: {
    includePaths: [path.join(__dirname, "styles")],
  },
  compiler: {
    styledComponents: true, // Enable styled-components support
  },
};

export default nextConfig;
