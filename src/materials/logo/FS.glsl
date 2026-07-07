varying vec2 vUv;
uniform vec3 uColor;
uniform vec3 uColorWater;
uniform float uProgress;
uniform float uTime;
void main()
{     
    float y = vUv.y,x = vUv.x; 
    float progress = 1.0 - uProgress + sin(x*3.1*8.0+uTime)*0.05;
    if( y >= progress){
        gl_FragColor = vec4(mix(uColorWater,uColor,0.8),1.0);
    }else{
        gl_FragColor = vec4(uColor,1.0);
    }
}
