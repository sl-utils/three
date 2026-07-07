uniform sampler2D ustate1;
uniform sampler2D ustate2;
/**0.0 静止 1.0 排气  2.0 进气*/
uniform float vstate;
uniform float utime;
#include <uv_pars_fragment>
void main(){
    if(vstate==0.)discard;
    float d = 1.0;
    if(vstate==1.) d*=-1.0;
    vec2 vUv=vec2(vUv.xy);
     // 计算 UV 中心点
    vec2 center = vec2(0.5);
    // 计算 UV 偏移量
    vec2 offset = vUv - center;
    vec2 dis= normalize(offset) *0.5;
    // 计算新的 UV 坐标
    vec2 move = dis * fract(utime/37.);
    if( (move.x*move.x +move.y*move.y ) > (offset.x*offset.x +offset.y*offset.y) && vstate==1.0) discard;
    vec2 newUv=vUv + dis * fract(utime/37.) * d;
    vec4 color=vstate==2.?texture2D(ustate1,newUv):texture2D(ustate2,newUv);
    if(color.a<.2)discard;
    gl_FragColor=color;
}