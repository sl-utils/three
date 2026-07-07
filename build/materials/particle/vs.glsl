uniform vec3 ustart;
uniform float ustate;
uniform float utime;
varying float vprogress;
varying float vangle;
attribute vec4 uposition;
attribute float arotate;
void main(){
    vprogress = fract(utime/uposition.w);
    vangle = arotate;
    vec3 start=ustart;
    vec3 target=vec3(uposition.xyz);

    //进气状态交换起点和终点
    if(ustate==2.){
        start=target;
        target=ustart;
    }

    // 添加缓动效果，使运动更自然
    float easeProgress = vprogress < 0.5 ? 2.0 * vprogress * vprogress : 1.0 - pow(-2.0 * vprogress + 2.0, 2.0) * 0.5;

    vec3 cur=start+(target-start) * easeProgress;
    vec4 viewPosition=modelMatrix*viewMatrix*vec4(cur,1.);
    gl_Position=projectionMatrix*viewPosition;

    // 减小粒子大小，根据进度调整大小
    if(ustate == 2.) {
        gl_PointSize = 80.0 * (1.0 - vprogress * 0.6);    // 进气状态粒子更小
    } else {
        gl_PointSize = 80.0 * (1.0 - vprogress * 0.3);
    }

    gl_PointSize*=1./-(modelViewMatrix*vec4(cur,1.)).z;
}