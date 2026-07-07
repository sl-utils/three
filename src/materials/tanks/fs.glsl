varying vec2 vUv;
varying vec4 vPosition;
uniform vec3 uColor;
uniform sampler2D tImage;
uniform float uLevel;
uniform float uTime;
uniform float uMode;

#include <common>

float random(in vec2 st){
    return fract(sin(dot(st.xy,vec2(12.9898,78.233)))*43758.5453123);
}
float noise(in vec2 st){
    vec2 i=floor(st);
    vec2 f=fract(st);
    // Four corners in 2D of a tile
    float a=random(i);
    float b=random(i+vec2(1.,0.));
    float c=random(i+vec2(0.,1.));
    float d=random(i+vec2(1.,1.));
    // Smooth Interpolation
    // Cubic Hermine Curve.  Same as SmoothStep()
    vec2 u=f*f*(3.-2.*f);
    // u = smoothstep(0.,1.,f);
    // Mix 4 coorners percentages
    return mix(a,b,u.x)+
    (c-a)*u.y*(1.-u.x)+
    (d-b)*u.x*u.y;
}
void main(){
    if(uMode==1.){
        gl_FragColor=vec4(mix(uColor,vec3(1.,1.,1.),.8),.8);
        return;
    }
    float p=sin(fract(vUv.y+uTime/3000.)*PI*35.)/50.;
    if(vPosition.y<uLevel+p){
        float n=noise(vUv*7.);
        vec4 color=texture2D(tImage,vUv);
        gl_FragColor=mix(vec4(.3,.3,.3,.5),vec4(.9,.9,.9,.8),n/10.);
    }else{
        discard;
    }
}