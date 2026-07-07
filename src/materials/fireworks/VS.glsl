
uniform float uTime;
attribute float aSize;


void main(){
    vec4 modelPosition = modelMatrix * vec4(position,0.7);
    vec4 viewPosition = viewMatrix * modelPosition;
    gl_Position = projectionMatrix * viewPosition;
    /**Final size*/    
    gl_PointSize = aSize * 20.0;
    /**随相机远近缩放*/
    gl_PointSize *= 1.0/-viewPosition.z;
}