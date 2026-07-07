import { cp, mkdir, readdir } from 'node:fs/promises';
import { dirname, extname, join, relative } from 'node:path';

const srcRoot = 'src';
const outRoot = 'build';
/**此脚本作用在于将src中的Assets文件夹中的文件复制到build中的Assets文件夹中 */
const copyExtensions = new Set([
  '.geojson',
  '.gif',
  '.glb',
  '.gltf',
  '.glsl',
  '.ico',
  '.jpg',
  '.jpeg',
  '.png',
  '.svg',
  '.hdr',
  '.js',
]);
const excludedDirs = new Set([
  join('src', 'Assets', 'Cesium'),
]);

async function walk(dir) {
  for (const excludedDir of excludedDirs) {
    if (dir === excludedDir || dir.startsWith(`${excludedDir}\\`) || dir.startsWith(`${excludedDir}/`)) {
      return;
    }
  }

  const entries = await readdir(dir, { withFileTypes: true });

  for (const entry of entries) {
    const source = join(dir, entry.name);

    if (entry.isDirectory()) {
      await walk(source);
      continue;
    }

    if (!copyExtensions.has(extname(entry.name).toLowerCase())) {
      continue;
    }

    const target = join(outRoot, relative(srcRoot, source));
    await mkdir(dirname(target), { recursive: true });
    await cp(source, target);
  }
}

await walk(srcRoot);
