varying vec3 vPosition;
varying vec3 vNormal;



uniform float uTime;
float random2D(vec2 co){
    return fract(sin(dot(co.xy ,vec2(12.9898,78.233))) * 43758.5453);
}

void main(){
    vec4 modelPosition = modelMatrix * vec4(position,1.0);

    //波动效果
    float time = uTime - modelPosition.y;
    float glitch =sin(time)+ sin(time*3.45)+sin(time*8.76);
    glitch /= 3.0;
    glitch = smoothstep(0.3,0.5,glitch);
    glitch *= 0.25;
    modelPosition.x += (random2D(modelPosition.xz+uTime) -0.5)*glitch;
    modelPosition.z += (random2D(modelPosition.zx+uTime)-0.5)*glitch;
    gl_Position = projectionMatrix * viewMatrix * modelPosition;
    /**  0.0标识矩阵算法中不平移*/
    vec4 modelNormal = modelMatrix * vec4(normal, 0.0);
    vPosition = modelPosition.xyz;
    vNormal =modelNormal.xyz;
}