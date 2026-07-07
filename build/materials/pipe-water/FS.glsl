varying vec2 vUv;
uniform vec2 uRepeat;
uniform vec3 uColor;
uniform float uProgress;
/** 0 - 1 保证和progress动画方向一致*/
uniform float uOffset;
/**水流的方向*/
uniform float uDirection;
uniform sampler2D tImage;
void main()
{     
    vec4 color=vec4 (mix(uColor,vec3(1.0,1.0,1.0),0.8) ,1.0);
    if(uDirection < .0 && vUv.x < (1.0 - uProgress)){
        gl_FragColor =  color ;
    } else if(uDirection > .0 && vUv.x > uProgress ) {
        gl_FragColor =  color ;
    }else{
        /** 使用 -uOffset 保证和 progress 动画方向一致*/
        vec2 p = fract(vUv * uRepeat - vec2(uDirection * uOffset,0.0));
        vec4 tcolor = texture2D(tImage, p);
        //确定颜色
        gl_FragColor = mix(color,tcolor,0.9);
    }

}
