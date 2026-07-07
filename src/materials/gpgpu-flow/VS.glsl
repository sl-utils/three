attribute vec2 aParticlesUv;
uniform sampler2D  uParticlesTexture;
uniform vec2 uResolution;
varying vec3 vColor;
void main(){
    vec4 particle = texture2D( uParticlesTexture, aParticlesUv ); 
    vec4 modelPosition = modelMatrix * vec4(particle.xyz,1.0);
    vec4 viewPosition = viewMatrix * modelPosition;
    gl_Position = projectionMatrix * viewPosition;
    /**让粒子跟随可视区大小变化*/
    gl_PointSize = 0.15 * uResolution.y;
    gl_PointSize = gl_PointSize * (1.0 / - viewPosition.z);
    vColor = vec3(pow(0.5,2.));
}