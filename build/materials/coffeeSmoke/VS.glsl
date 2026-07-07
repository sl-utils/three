varying vec2 vUv;
varying vec3 vPosition;
uniform float uTime;
uniform sampler2D uPerlinTexture;
/**旋转矩阵*/
vec2 rotate2d(vec2 _st, float _angle){
    float s = sin(_angle);
    float c = cos(_angle);
    mat2 m = mat2(c, s, -s, c);
    return m * _st;
}
void main(){
    vec3 newPosition = position;
    float twistPerlin = texture(uPerlinTexture, vec2(0.5, uv.y * 0.2 - uTime*0.005)).r;
    newPosition.xz = rotate2d(newPosition.xz, twistPerlin*5.0);
    vec2 windOffset = vec2(
        texture(uPerlinTexture, vec2(0.5, uv.y * 0.2 - uTime*0.01)).r-0.5,
        texture(uPerlinTexture, vec2(0.8, uv.y * 0.2 - uTime*0.01)).r-0.5
    );
    windOffset*=pow(uv.y,3.0)*10.0;
    newPosition.xz += windOffset;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(newPosition, 1.0);
    vUv = uv;
}