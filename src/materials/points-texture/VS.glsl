uniform vec2 uResolution;
uniform sampler2D uMainTexture;
uniform sampler2D uCanvasTexture;
varying vec3 vColor;
attribute float aIntensities;
attribute float aAngles;
void main(){
    float displacement = smoothstep(0.1,0.3,texture2D(uCanvasTexture, uv).r);
    vec3 displacementVector = vec3(cos(aAngles), sin(aAngles), 1.0);
    displacementVector = normalize(displacementVector);
    
    displacementVector *= displacement; 
    displacementVector *= 3.;
    displacementVector *= aIntensities;
    vec4 modelPosition = modelMatrix * vec4(position+displacementVector,1.0);
    vec4 viewPosition = viewMatrix * modelPosition;
    gl_Position = projectionMatrix * viewPosition;
    float pictureIntensity = texture2D(uMainTexture, uv).r;
    /**让粒子跟随可视区大小变化*/
    gl_PointSize = 0.1 * pictureIntensity * uResolution.y;
    gl_PointSize = gl_PointSize * (1.0 / - viewPosition.z);
    vColor = vec3(pow(pictureIntensity,2.));
}