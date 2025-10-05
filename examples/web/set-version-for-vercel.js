import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const packageJsonPath = path.resolve(__dirname, './package.json');
const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf-8'));

// eslint-disable-next-line no-undef
if (process.env.VERCEL) {
  packageJson.dependencies['react-use-hook-modal'] = 'latest';

  fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2));
}
