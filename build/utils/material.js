const SHADER_FLAG_START = "void main() {";
const SHADER_FLAG_END = "}";
const FLAG_START = "//#SL_START#";
const FLAG_MAIN = "//#SL_MAIN#";
const FLAG_END = "//#SL_END#";
function _ifStartFlag(str) {
    return str.includes(FLAG_START);
}
function _ifMainFlag(str) {
    return str.includes(FLAG_MAIN);
}
function _ifEndFlag(str) {
    return str.includes(FLAG_END);
}
function _addStart(str) {
    str = str.replace(`${SHADER_FLAG_START}`, `${FLAG_START}
${SHADER_FLAG_START}`);
    return str;
}
function _addMain(str) {
    str = str.replace(`${SHADER_FLAG_START}`, `${SHADER_FLAG_START}
${FLAG_MAIN}`);
    return str;
}
function _addEnd(str) {
    str = str.replace(`${SHADER_FLAG_END}`, `${FLAG_END}
${SHADER_FLAG_END}`);
    return str;
}
function glslModify(mater, cb) {
    mater.onBeforeCompile = (shader) => {
        shaderAddFlag(shader);
        cb(shader);
    };
}
function shaderAddFlag(shader) {
    shader.fragmentShader = _addStart(shader.fragmentShader);
    shader.fragmentShader = _addMain(shader.fragmentShader);
    shader.fragmentShader = _addEnd(shader.fragmentShader);
    shader.vertexShader = _addStart(shader.vertexShader);
    shader.vertexShader = _addMain(shader.vertexShader);
    shader.vertexShader = _addEnd(shader.vertexShader);
}
function glslAddStart(shader, param, add) {
    let code = shader[param];
    if (!_ifStartFlag(code))
        code = _addStart(code);
    shader[param] = code.replace(`${FLAG_START}`, `${FLAG_START}
${add}`);
}
function glslAddMain(shader, param, add) {
    let code = shader[param];
    if (!_ifMainFlag(code))
        code = _addMain(code);
    shader[param] = code.replace(`${FLAG_MAIN}`, `${FLAG_MAIN}
${add}`);
}
function glslAddEnd(shader, param, add) {
    let code = shader[param];
    if (!_ifEndFlag(code))
        code = _addEnd(code);
    shader[param] = code.replace(`${FLAG_END}`, `${add}
${FLAG_END}`);
}
function glslAddCode(shader, param, start, add) {
    let code = shader[param];
    shader[param] = code.replace(`${start}`, `${start}
    ${add}`);
}
export { glslModify as u3_glslModify, glslAddStart as u3_glslAddStart, glslAddMain as u3_glslAddMain, glslAddEnd as u3_glslAddEnd, glslAddCode as u3_glslAddCode, };
//# sourceMappingURL=material.js.map