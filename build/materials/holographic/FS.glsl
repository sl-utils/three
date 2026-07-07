varying vec3 vPosition;
uniform vec3 uColor;
uniform float uTime;
/**法线数据*/
varying vec3 vNormal;

void main(){
    vec3 normal = normalize(vNormal); 
    /**判断是否是背面*/
    if(!gl_FrontFacing) normal = -normal; 

    float stripes =mod(( vPosition.y - uTime*0.02 )* 20.0, 1.0);
    stripes = pow(stripes, 3.0);
    /**Fresnel*/
    vec3 viewDir = normalize(vPosition - cameraPosition);
    float fresnel = dot( viewDir, normal ) +1.0;
    fresnel = pow(fresnel , 2.0);

    //falloff 边缘关闭
    float falloff = smoothstep(0.8,0.0,fresnel);
    //holographic
    float holographic = stripes * fresnel;
    holographic += fresnel *1.25;
    holographic *= falloff;
    // Final color
    gl_FragColor = vec4(uColor, holographic);
    /**添加默认的色调映射*/
    #include <tonemapping_fragment>
    /**添加默认的色调映射*/
    #include <colorspace_fragment>
}