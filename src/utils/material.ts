/**和材质相关的工具类（onBeforeCompile） */

/**着色器编程工具类 */
import { Material, WebGLProgramParametersWithUniforms } from "three";
const SHADER_FLAG_START = "void main() {";
const SHADER_FLAG_END = "}";
const FLAG_START = "//#SL_START#";
const FLAG_MAIN = "//#SL_MAIN#";
const FLAG_END = "//#SL_END#";
/**是否已经添加开始标识 */
function _ifStartFlag(str: string): boolean {
    return str.includes(FLAG_START)
}
/**是否已经添加开始标识 */
function _ifMainFlag(str: string): boolean {
    return str.includes(FLAG_MAIN)
}
/**是否已经添加结束标识 */
function _ifEndFlag(str: string): boolean {
    return str.includes(FLAG_END)
}
/**给glsl语言添加开始标识(定义变量之内的) */
function _addStart(str: string): string {
    str = str.replace(`${SHADER_FLAG_START}`, `${FLAG_START}
${SHADER_FLAG_START}`);
    return str;
}
/**给glsl语言添加开始标识(main之后立即执行) */
function _addMain(str: string): string {
    str = str.replace(`${SHADER_FLAG_START}`, `${SHADER_FLAG_START}
${FLAG_MAIN}`);
    return str;
}
/**给glsl语言添加结束标识 */
function _addEnd(str: string): string {
    str = str.replace(`${SHADER_FLAG_END}`, `${FLAG_END}
${SHADER_FLAG_END}`);
    return str;
}

/**------------------------------------------外部调用------------------------------------------ */
/**修改材质的着色器语言 
 * @param mater 材质
 * @param cb 回调函数 传入已经添加开始和结束的标识的着色器
*/
function glslModify(mater: Material, cb: (shader: WebGLProgramParametersWithUniforms) => void) {
    mater.onBeforeCompile = (shader) => {
        shaderAddFlag(shader);
        cb(shader);
    };
}

/**给glsl语言添加开始和结束的标识 */
function shaderAddFlag(shader: WebGLProgramParametersWithUniforms) {
    shader.fragmentShader = _addStart(shader.fragmentShader);
    shader.fragmentShader = _addMain(shader.fragmentShader)
    shader.fragmentShader = _addEnd(shader.fragmentShader);
    shader.vertexShader = _addStart(shader.vertexShader);
    shader.vertexShader = _addMain(shader.vertexShader)
    shader.vertexShader = _addEnd(shader.vertexShader);
}
/**在glsl语言开始标识后添加编程代码  */
function glslAddStart(shader: WebGLProgramParametersWithUniforms, param: 'fragmentShader' | 'vertexShader', add: string) {
    let code = shader[param];
    if (!_ifStartFlag(code)) code = _addStart(code);
    shader[param] = code.replace(`${FLAG_START}`, `${FLAG_START}
${add}`);
}
/**在glsl语言开始标识后添加编程代码 */
function glslAddMain(shader: WebGLProgramParametersWithUniforms, param: 'fragmentShader' | 'vertexShader', add: string) {
    let code = shader[param];
    if (!_ifMainFlag(code)) code = _addMain(code);
    shader[param] = code.replace(`${FLAG_MAIN}`, `${FLAG_MAIN}
${add}`);
}
/**给glsl语言结束标识前添加编程代码 */
function glslAddEnd(shader: WebGLProgramParametersWithUniforms, param: 'fragmentShader' | 'vertexShader', add: string) {
    let code = shader[param];
    if (!_ifEndFlag(code)) code = _addEnd(code);
    shader[param] = code.replace(`${FLAG_END}`, `${add}
${FLAG_END}`);
}
/**给glsl语言指定代码处添加编程代码 */
function glslAddCode(shader: WebGLProgramParametersWithUniforms, param: 'fragmentShader' | 'vertexShader', start: string, add: string) {
    let code = shader[param];
    shader[param] = code.replace(`${start}`, `${start}
    ${add}`);
}
export {
    glslModify as u3_glslModify,
    glslAddStart as u3_glslAddStart,
    glslAddMain as u3_glslAddMain,
    glslAddEnd as u3_glslAddEnd,
    glslAddCode as u3_glslAddCode,
};

