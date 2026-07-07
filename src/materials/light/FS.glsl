uniform vec3 uColor;
varying vec3 vNormal;
varying vec3 vPosition;

/**平行光*/
vec3 directionalLight(vec3 lightColor , float lightIntensity , vec3 normal , vec3 lightPosition , vec3 viewDir ){
    /**光的方向*/
    vec3 lightDirection = normalize(lightPosition);
    /**计算反射失量。入射矢量为I,表面法向量为N*/
    vec3 lightReflection = reflect(-lightDirection , normal);
    /**归一化后，两个方向相同的向量点积为1,垂直为0，相反为-1*/
    float shading = dot(normal,lightDirection);
    shading = max(0.0,shading);
    /**计算的反射方向和视角方向相反，则表示正对着光的反射（高光）*/
    float specular = - dot(lightReflection , viewDir);
    specular = max(0.0,specular);
    specular = pow(specular , 21.0);
    /**反射+高光*/
    return  lightColor * lightIntensity * (shading + specular);
}
/**环境光*/
vec3 ambientLight(vec3 lightColor, float lightIntensity){
    return lightColor * lightIntensity;
}
/**点光源*/
vec3 pointLight(vec3 lightColor , float lightIntensity , vec3 normal , vec3 lightPosition , vec3 viewDir, vec3 position){
    vec3 lightDelta =  position - lightPosition;
    float distance = length(lightDelta);
    vec3 lightDir =normalize( lightDelta);
    vec3 lightReflection = reflect(lightDir , normal);
    float shading = dot(normal,lightDir);
    shading = max(0.0,shading);
    float specular = - dot(lightReflection , viewDir);
    specular = max(0.0,specular);
    specular = pow(specular , 21.0);

    float decay = max(0.0 , 1.0 - distance);
    return  lightColor * (lightIntensity * decay) * (shading + specular);


}

void main(){
    vec3 viewDir =normalize( vPosition - cameraPosition);
    vec3 color = uColor;
    vec3 light = vec3(0.0);
    vec3 normal = normalize(vNormal);
    light += ambientLight(vec3(1.0),0.03);
    light += directionalLight(vec3(0.1,0.1,1.0) , 1.0, normal , vec3(0.0,0.0,3.0), viewDir) ;
    light += pointLight(vec3(1.0,0.1,0.1) , 1.0, normal , vec3(0.0,2.0,0.0), viewDir,vPosition) ;
    color *= light;
    // Final color
    gl_FragColor = vec4(color,1.0);
    /**添加默认的色调映射*/
    #include <tonemapping_fragment>
    /**添加默认的色调映射*/
    #include <colorspace_fragment>
}