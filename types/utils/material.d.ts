/**和材质相关的工具类（onBeforeCompile） */
/**着色器编程工具类 */
import { Material, WebGLProgramParametersWithUniforms } from "three";
/**------------------------------------------外部调用------------------------------------------ */
/**修改材质的着色器语言
 * @param mater 材质
 * @param cb 回调函数 传入已经添加开始和结束的标识的着色器
*/
declare function glslModify(mater: Material, cb: (shader: WebGLProgramParametersWithUniforms) => void): void;
/**在glsl语言开始标识后添加编程代码  */
declare function glslAddStart(shader: WebGLProgramParametersWithUniforms, param: 'fragmentShader' | 'vertexShader', add: string): void;
/**在glsl语言开始标识后添加编程代码 */
declare function glslAddMain(shader: WebGLProgramParametersWithUniforms, param: 'fragmentShader' | 'vertexShader', add: string): void;
/**给glsl语言结束标识前添加编程代码 */
declare function glslAddEnd(shader: WebGLProgramParametersWithUniforms, param: 'fragmentShader' | 'vertexShader', add: string): void;
/**给glsl语言指定代码处添加编程代码 */
declare function glslAddCode(shader: WebGLProgramParametersWithUniforms, param: 'fragmentShader' | 'vertexShader', start: string, add: string): void;
export { glslModify as u3_glslModify, glslAddStart as u3_glslAddStart, glslAddMain as u3_glslAddMain, glslAddEnd as u3_glslAddEnd, glslAddCode as u3_glslAddCode, };
