varying vec2 vUv;
uniform float uProgress;

void main()
{     
    if( vUv.y > (1. - uProgress)){
        gl_FragColor = vec4( 1.0, .0, .0, 1.0 );
    } else{
        gl_FragColor = vec4( 1.0, 1.0, 1.0, 1.0 );
    }
}