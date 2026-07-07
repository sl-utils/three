#include <uv_pars_fragment>
void main(){
    #include <uv_vertex>
    vec4 modelViewPosition = modelViewMatrix * vec4(position, 1.0);
    gl_Position = projectionMatrix * modelViewPosition;
}