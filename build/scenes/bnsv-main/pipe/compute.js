const directions = [
    [0, 1],
    [1, 0],
    [0, -1],
    [-1, 0],
];
function backtrack(maze, allPaths, start, exits, path, visited) {
    const rows = maze.length, cols = maze[0].length, [x, y] = start;
    if (x < 0 || x >= rows || y < 0 || y >= cols || maze[x][y] === 1 || visited[x][y]) {
        return;
    }
    visited[x][y] = true;
    path.push([x, y]);
    if (maze[x][y] === 9) {
        allPaths.push([...path]);
        return;
    }
    else {
        for (const exit of exits) {
            if (x === exit[0] && y === exit[1]) {
                allPaths.push([...path]);
            }
        }
    }
    for (const [dx, dy] of directions) {
        backtrack(maze, allPaths, [x + dx, y + dy], exits, path, visited);
    }
    path.pop();
    visited[x][y] = false;
}
export function findAllPaths(maze, entrances, exits) {
    const rows = maze.length, cols = maze[0].length, allPaths = [];
    for (const entrance of entrances) {
        const path = [];
        const visited = Array.from({ length: rows }, () => Array(cols).fill(false));
        backtrack(maze, allPaths, entrance, exits, path, visited);
    }
    return allPaths;
}
export function mergePartLines(lines, line, parts) {
    for (let i = 0, len = parts.length; i < len; i++) {
        const part = parts[i], part_line = [];
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
//# sourceMappingURL=compute.js.map