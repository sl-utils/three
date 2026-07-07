/**
 *
 * @param maze 管线路径
 * @param entrances 入口
 * @param exits 出口
 * @returns 能通过的线路
 */
export declare function findAllPaths(maze: number[][], entrances: [number, number][], exits: [number, number][]): [number, number][][];
/**用于合并分支线
 * @param lines 整体总线
 * @param line 当前线
 * @param parts 分支线路
 */
export declare function mergePartLines(lines: string[][], line: string[], parts: string[][]): void;
