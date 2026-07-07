const directions = [
	[0, 1], // 右
	[1, 0], // 下
	[0, -1], // 左
	[-1, 0], // 上
];
/**该算法会找到出口或者被关闭的阀门  O(4^(m*n))
 * @param maze 二维网格，表示管道通行状态
 * @param allPaths 收集所有找到的路径（输出参数）
 * @param start 当前搜索的起始坐标 [行, 列]
 * @param exits 所有出口坐标数组
 * @param path 当前正在构建的路径
 * @param visited 访问标记矩阵，防止重复访问
 * @returns
 */
function backtrack(
	maze: number[][],
	allPaths: [number, number][][],
	start: [number, number],
	exits: [number, number][],
	path: [number, number][],
	visited: boolean[][]
) {
	const rows = maze.length,
		cols = maze[0].length,
		[x, y] = start;
	// 检查是否越界、是否为墙壁或是否已经访问过
	if (x < 0 || x >= rows || y < 0 || y >= cols || maze[x][y] === 1 || visited[x][y]) {
		return;
	}
	// 标记当前位置为已访问
	visited[x][y] = true;
	path.push([x, y]);
	// 检查是否到达阀门点
	if (maze[x][y] === 9) {
		allPaths.push([...path]);
		return;
	} else {
		// 检查是否到达出口
		for (const exit of exits) {
			if (x === exit[0] && y === exit[1]) {
				allPaths.push([...path]);
			}
		}
	}
	// 尝试四个方向
	for (const [dx, dy] of directions) {
		backtrack(maze, allPaths, [x + dx, y + dy], exits, path, visited);
	}
	// 回溯操作
	path.pop();
	visited[x][y] = false;
}
/**
 *
 * @param maze 管线路径
 * @param entrances 入口
 * @param exits 出口
 * @returns 能通过的线路
 */
export function findAllPaths(maze: number[][], entrances: [number, number][], exits: [number, number][]): [number, number][][] {
	const rows = maze.length,
		cols = maze[0].length,
		allPaths: [number, number][][] = [];
	// 从每个入口开始探索
	for (const entrance of entrances) {
		const path = [];
		const visited: boolean[][] = Array.from({ length: rows }, () => Array(cols).fill(false));
		backtrack(maze, allPaths, entrance, exits, path, visited);
	}
	return allPaths;
}
/**用于合并分支线
 * @param lines 整体总线
 * @param line 当前线
 * @param parts 分支线路
 */
export function mergePartLines(lines: string[][], line: string[], parts: string[][]) {
	for (let i = 0, len = parts.length; i < len; i++) {
		const part = parts[i],
			part_line: string[] = [];
		for (let j = 0, length = line.length; j < length; j++) {
			const name = line[j];
			part_line.push(name);
		}
		for (let j = 0, length = part.length; j < length; j++) {
			const name = part[j];
			part_line.push(name);
		}
		lines.push(part_line);
	}
}
