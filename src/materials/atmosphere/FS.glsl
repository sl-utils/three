varying vec3 vNormal;
varying vec3 vPosition;
//太阳光的方向
uniform vec3 uSunDirection;
//辉光颜色
uniform vec3 uColorAtmosphere1;
uniform vec3 uColorAtmosphere2;
void main(){
    vec3 viewDir =normalize( vPosition - cameraPosition);
    vec3 normal = normalize(vNormal);
    vec3 color = vec3(0.0,0.0,0.0);
    vec3 sunDirection = normalize(uSunDirection);
    //光的方向
    float sunOrientation = dot(sunDirection,normal);

    float atmosphereMix = smoothstep(-0.5, 1.0, sunOrientation);
    /**mix混合(夜晚辉光,白天辉光,辉光程度)*/
    vec3 atmosphereColor = mix(uColorAtmosphere2, uColorAtmosphere1, atmosphereMix);
    /**夜晚的辉光极低*/
    color +=atmosphereColor;

    float edgeAlpha = dot(viewDir , normal);
    edgeAlpha = smoothstep(0.0,0.5,edgeAlpha);
    float dayAlpha = smoothstep(-0.5,0.0,sunOrientation);
    float alpha =  edgeAlpha * dayAlpha;
    // Final color
    gl_FragColor = vec4(color,alpha);
    /**添加默认的色调映射*/
    #include <tonemapping_fragment>
    /**添加默认的色调映射*/
    #include <colorspace_fragment>
}