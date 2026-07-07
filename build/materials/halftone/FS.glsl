uniform vec3 uColor;
varying vec3 vNormal;
varying vec3 vPosition;
/**画布大小*/
uniform vec2 uResolution;
/**蒙层重复次数*/
uniform float uRepetitions;
/**蒙层阴影颜色*/
uniform vec3 uShadowColor;
/***/
uniform vec3 uLightColor;
uniform float uLightRepets;

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
/**生成点状蒙层
*@param resolution 画布分辨率
*@param color 颜色
*@param pointColor 点状蒙层颜色
*@param direction 方向
*@param repetitions 重复次数
*@param low 低点
*@param high 高点
*@param normal 法线
*@param position 位置
*@param viewDir 视图方向
*/
vec3 halftone(vec2 resolution, vec3 color,vec3 pointColor, vec3 direction,float repetitions,float low,float high,vec3 normal ){
    /**蒙层点的强度*/
    float intensity = dot(normal,direction);
    /**返回值始终被限定在 [0, 1] 范围内*/
    intensity = smoothstep(low,high,intensity);
    /**除以视图Y以保证为切割为正方形网格 */
    vec2 uv = gl_FragCoord.xy / resolution.y;
    /**重复切割视图为(X/Y*R)*R份正方形网格*/
    uv = mod(uv * repetitions , 1.0);
    /**每个网格到中心的距离*/
    float point = distance(uv, vec2(0.5));
    /**点状蒙层的强度*/
    point = 1.0 - step(0.3 * intensity,point);
    /**混合颜色*/
    return  mix(color,pointColor,point);
}

void main(){
    vec3 viewDir =normalize( vPosition - cameraPosition);
    vec3 color = uColor;
    vec3 normal = normalize(vNormal);
    vec3 light = vec3(0.0);
    light += ambientLight(vec3(1.0),0.3);
    light += directionalLight(vec3(1.0) , 1.0, normal , vec3(1.0,1.0,0.0), viewDir) ;
    // light += pointLight(vec3(1.0,0.1,0.1) , 1.0, normal , vec3(0.0,2.0,0.0), viewDir,vPosition) ;
    color *= light;
    color = halftone(uResolution,color,uLightColor,vec3(1.0,1.0,0.0),uLightRepets,0.5,1.5,normal); 
    color = halftone(uResolution,color,uShadowColor,vec3(0.0,-1.0,0.0),uRepetitions,-0.9,1.3,normal); 
    // Final color
    gl_FragColor = vec4(color,1.0);
    /**添加默认的色调映射*/
    #include <tonemapping_fragment>
    /**添加默认的色调映射*/
    #include <colorspace_fragment>
}