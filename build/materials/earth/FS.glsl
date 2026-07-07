varying vec2 vUv;
varying vec3 vNormal;
varying vec3 vPosition;
//贴图
uniform sampler2D uDaymap;
uniform sampler2D uNightmap;
uniform sampler2D uSpecularClouds;
//太阳光的方向
uniform vec3 uSunDirection;
//辉光颜色
uniform vec3 uColorAtmosphere1;
uniform vec3 uColorAtmosphere2;


void main(){
    vec3 viewDir =normalize( vPosition - cameraPosition);
    vec3 normal = normalize(vNormal);
    vec3 color = vec3(vUv,1.0);

    vec3 sunDirection = normalize(uSunDirection);
    //day 
    vec3 day = texture2D(uDaymap,vUv).rgb;
    //night
    vec3 night = texture2D(uNightmap,vUv).rgb;
    //高光云彩
    vec3 specularClouds = texture2D(uSpecularClouds,vUv).rgb;
    //光的方向
    float sunOrientation = dot(sunDirection,normal);
    float dayMix = smoothstep(-0.25,0.5,sunOrientation);
    color = mix( night ,day , dayMix); 
    //获取白云
    float  cloudsMix = specularClouds.g;
    cloudsMix = smoothstep(0.5,1.0,cloudsMix);
    //夜晚的云减少
    cloudsMix *= dayMix;
    color = mix(color, vec3(1.0),cloudsMix); 

    // color = vec3(specularClouds.rg,0.0);
    float fresnel = dot(viewDir,normal)+1.0;
    fresnel = pow(fresnel,2.0);
    float atmosphereMix = smoothstep(-0.5, 1.0, sunOrientation);
    /**mix混合(夜晚辉光,白天辉光,辉光程度)*/
    vec3 atmosphereColor = mix(uColorAtmosphere2, uColorAtmosphere1, atmosphereMix);
    /**夜晚的辉光极低*/
    color = mix( color, atmosphereColor, fresnel * atmosphereMix);
    /**高光反射*/
    vec3 lightReflection = reflect(sunDirection, normal);
    float specular = dot(lightReflection, viewDir);
    specular = max(0.0, specular);
    specular = pow(specular, 21.0);
    specular *= specularClouds.r;
    /**反射*/
    vec3 specularColor = mix(vec3(1.0) ,atmosphereColor,fresnel);
    color += specular*specularColor;

    // Final color
    gl_FragColor = vec4(color,1.0);
    /**添加默认的色调映射*/
    #include <tonemapping_fragment>
    /**添加默认的色调映射*/
    #include <colorspace_fragment>
}