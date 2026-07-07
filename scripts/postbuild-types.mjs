import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';
/**此脚本作用在于将src中的types文件夹中的类型文件抛出给外部使用 */
const files = [
  // {
  //   path: resolve('types/index.d.ts'),
  //   content: "export * from './generated/src/index';\n",
  // },
  /**将src中的types文件夹的类型文件抛出给外部使用 */
  {
    path: resolve('types/types/index.d.ts'),
    content: "export type * from '../../src/types/index';\n",
  },
];
/**获取types/index.d.ts文件内容 */
const entryPath = resolve('types/index.d.ts');
const entryContent = await readFile(entryPath, 'utf8');
/**将types/types/index.d.ts文件内容添加到types/index.d.ts文件中,方便外部使用 */
const entryImport = "export type * from './types/index';\n";
if (!entryContent.startsWith(entryImport)) {
  await writeFile(entryPath, `${entryImport}${entryContent}`, 'utf8');
}
for (const file of files) {
  await mkdir(dirname(file.path), { recursive: true });
  await writeFile(file.path, file.content, 'utf8');
}
