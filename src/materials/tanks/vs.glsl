// 顶点的Y坐标
varying vec2 vUv;
varying vec4 vPosition;
#include <common>
void main() {
    vUv = uv;
    vPosition =  modelMatrix * vec4( position , 1.0 );
    gl_Position = projectionMatrix * viewMatrix * vPosition ;
}