uniform sampler2D usmoke;
uniform sampler2D usmokeIn;
uniform float ustate;
varying float vprogress;
varying float vangle;

// 旋转2D向量的函数
vec2 rotate(vec2 v, float angle) {
    // 计算旋转角度的正弦和余弦值
    float c = cos(angle);
    float s = sin(angle);

    // 应用旋转矩阵: [cosθ, -sinθ; sinθ, cosθ]
    return vec2(
        v.x * c - v.y * s,  // 新的x坐标
        v.x * s + v.y * c   // 新的y坐标
    );
}

void main(){
    vec2 vUv =rotate(gl_PointCoord ,vangle) ;
    vec4 color;

    // 根据状态选择不同的贴图
    if(ustate == 2.0) { // 进气状态
        color = texture2D(usmokeIn, vUv);
        // 进气使用更轻薄的参数
        float a = min(color.a, max(0.0, color.a - vprogress + 0.5));
        if(a < 0.1) discard; // 进气丢弃阈值更高
        gl_FragColor = vec4(color.rgb, a * 0.4); // 进气透明度更低
    } else { // 出气状态
        color = texture2D(usmoke, vUv);
        // 出气保持原有厚重效果
        float a = min(color.a, max(0.0, color.a - vprogress + 0.3));
        if(a < 0.15) discard;
        gl_FragColor = vec4(color.rgb, a * 0.6);
    }
}
