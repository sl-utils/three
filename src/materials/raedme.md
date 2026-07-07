gl_FragCoord  片元中粒子的UV(屏幕坐标0-1000) //vec4


1.@attributes 属性 (从缓冲读取数据, 例如Geometry对象的attributes属性、uv属性、法线属性等)
2.@uniforms 全局变量 (一般用来对物体做整体变化、旋转、缩放,例如模型矩阵、视图矩阵、投影矩阵等)
3.@textures 纹理 (从像素或者纹理获得数据)
4.@varyings 变量 (将顶点着色器的变量传给片元着色器)

申明浮点数精度
1.@precision highp float;   -2^16 ~ 2^16
2.@precision mediump float; -2^10 ~ 2^10
3.@precision lowp float;    -2^8  ~ 2^8

物体坐标 @position * 模型矩阵 @modelMatrix * 视图矩阵 @viewMatrix * 投影矩阵 @projectionMatrix
(物体本身的坐标 vec4(p,1.0))*(物体放入世界坐标系时需要自行的缩放,平移,旋转操作)*(视点坐标,观察点坐标,上方向)*(如何投影平行投影或透视投影)
 @gl_Position  顶点着色器的最终输出 /// vec4(r,g,b,a)
 @gl_FragColor  片元着色器的最终输出 /// vec4(r,g,b,a)

 基本类型

void	作为函数的返回类型,表示这个函数不返回值。
bool	布尔类型,可以是true 和false,以及可以产生布尔型的表达式。
int		整型,是十进制的,十六进制的,八进制的。
float	浮点型
bvec2(bvec3,bvec4)	包含2个布尔成分的向量
ivec2(ivec3,ivec4)	包含2个整型成分的向量
mat2或者mat2x2	2×2的浮点数矩阵类型（OpenGL的矩阵是列主顺序的）(mat3,mat4,mat2x3,mat2x4,mat3x2,mat3x4,mat4x2,mat4x3)
sampler1D	用于内建的纹理函数中引用指定的1D纹理的句柄。只可以作为一致变量或者函数参数使用
sampler2D	二维纹理句柄
sampler3D	三维纹理句柄
samplerCube	cube map纹理句柄
sampler1DShadow	一维深度纹理句柄
sampler2DShadow	二维深度纹理句柄

1.3修饰符变量的声明可以使用如下的修饰符：
修饰符		描述
precision	指定数据精度级别precision highp float;mediump;lowp
const		常量值必须在声明时初始化。它是只读的不可修改的。
attribute	表示只读的顶点数据,只用在顶点着色器中。数据来自当前的顶点状态或者顶点数组。它必须是全局范围声明的,不能在函数内部。一个attribute可以是浮点数类型的标量,向量,或者矩阵。不可以是数组或者结构体
uniform	一致变量。在着色器执行期间一致变量的值是不变的。与const常量不同的是,这个值在编译时期是未知的是由着色器外部初始化的。一致变量在顶点着色器和片段着色器之间是共享的。它也只能在全局范围进行声明。
varying	顶点着色器的输出。例如颜色或者纹理坐标,（插值后的数据）作为片段着色器的只读输入数据。必须是全局范围声明的全局变量。可以是浮点数类型的标量,向量,矩阵。不能是数组或者结构体。 centorid varying	在没有多重采样的情况下,与varying是一样的意思。在多重采样时,centorid varying在光栅化的图形内部进行求值而不是在片段中心的固定位置求值。
centorid varying	在没有多重采样的情况下,与varying是一样的意思。在多重采样时,centorid varying在光栅化的图形内部进行求值而不是在片段中心的固定位置求值。
invariant	(不变量)用于表示顶点着色器的输出和任何匹配片段着色器的输入,在不同的着色器中计算产生的值必须是一致的。所有的数据流和控制流,写入一个invariant变量的是一致的。编译器为了保证结果是完全一致的,需要放弃那些可能会导致不一致值的潜在的优化。除非必要,不要使用这个修饰符。在多通道渲染中避免z-fighting可能会使用到。
in	用在函数的参数中,表示这个参数是输入的,在函数中改变这个值,并不会影响对调用的函数产生副作用。（相当于C语言的传值）,这个是函数参数默认的修饰符
out	用在函数的参数中,表示该参数是输出参数,值是会改变的。
inout	用在函数的参数,表示这个参数即是输入参数也是输出参数。

1.4 数组‍	GLSL中只能使用一维数组。数组的类型可以是一切基本类型或者结构体。声明方式如下：vec4 transMatrix[4];vec4 affineMatrix[4] = {0, 1, 2, 3};vec4 rotateMatrix = affineMatrix;1.5 结构体‍	结构体的定义方式和C语言类似,可以组合基本类型和数组来形成用户自定义的类型, 区别是GLSL的结构体不支持嵌套定义,只有预先声明的结构体可以嵌套其中,参考代码如下：struct rotateMatrix {	float x;	float y;	float coeff[8];}struct positionInfo {	vec2 coord;	float value;	rotateMatrix matrix;}

1.6 4×4 矩阵（如变换矩阵）表示空间变换（平移、旋转、缩放等）。vec4 表示一个四维向量 (x, y, z, w)，通常用于表示三维坐标 (x, y, z)，其中 w 为齐次分量（通常为 1.0 表示点，0.0 表示方向）。
       ┌ a  b  c  d ┐   ┌ x ┐   ┌ ax + by + cz + dw ┐
       │ e  f  g  h │ × │ y │ = │ ex + fy + gz + hw │
       │ i  j  k  l │   │ z │   │ ix + jy + kz + lw │
       └ m  n  o  p ┘   └ w ┘   └ mx + ny + oz + pw ┘

# （以下所有的内置函数使用时可将该函数的*所有float*替换为*vec2*、*vec3*、*vec4*,能部分替换的会特殊申明）
# 角度和三角函数
# 将角度值转化为弧度值,即n*degree/180
 float radians(float degree)
# 将弧度值转化为角度值,即180*radian/n
float degrees(float radian)
# 标准三角正弦函数,angie 是弧度值返回值在[-1,1]区间内
float sin(float angle)
# 标准三角余弦函数,angle 是弧度值返回值在[-1,1]区间内
float cos(float angle)
# 标准三角正切函数,angle 是弧度值
float tan(float angle)
# 反正弦函数,返回角度(弧度值)的正弦值为x。返四值在[-n/2,n/2】区间内,如果x<-1或者x>+1则返回未定义的值
float asin(float x)
#  反余弦函数,返回角度(弧度值)的余弦值为x。返回值在[-n/2,n/2]区间内,如果x<-1或者x>+1则返回未定义的值
float acos(float x)
# 反正切函数,返回角度(弧度值)的正切值为y/x。x和y的符号决定了角度在哪个象限,返回角度在[-n,n]区间中。如果x和y都是0,则返回未定义的值。注意,对于矢量而言,这是一个逐分量的运算
float atan(float y,float x)
# 反正切函数,返回角度(弧度值)的正切值为y/x。x和y的符号决定了角度在哪个象限,返回角度在【-n,n]区间中。如果x和y都是0,则返回未定义的值。注意,对于矢量而言,这是一个逐分量的运算 
float atan(float y_over_x)

# 指数函数
# 返回x的y次幂,即x。如果x<0,则返回未定义值。如果x=0而y<0,则返回未定义值。注意,对于矢量而言,这是一个逐分量的运算
float pow(float x,float y)
# 返回x的自然指数幂,即 e x
float exp(float x)
# 返回x的自然对数,即返回y使得满足x=e”如果x<0,则返回未定义值
float log(float x)
# 返回2的X次幂,即2
float exp2(float x)
# 返回以2为底的对数值,即返回y使得满足x=2^y 如果x≤0,则返回未定义值
float log2 (float x)
# 返回√￣x。如果x<0,则返回未定义值
float sqrt(float x)
# 返回1 / √￣x。如果x<0,则返四未定义值
float inversesqrt(float x)

# 通用函数
# 返回x的无符号绝对值,即如果x>0,返回x,否期返回-X
float abs(float x)
# 如果x>0返回1.0,如果x=0返回0.0,否期返回-1.0
float sign(float x)
# 返回小于等于x且最接近x的整数
float floor(float x)
# 返回大于等于x且最接近x的整数
float ceil(float x)
# 返回x的小数部分,即返回x-floor(x)
float fract(float x)
# 模数(模),返回x除以y的余数,即(x-y*floor(x/y))给定两个正整数x和y,mod(x,y)可以求得x除以y的余数。注意,对于矢量而言,这是一个逐分量的运算
float mod(float x,float y)    
vec2 mod(vec2 x,float y)        vec3 mod(vec3 x,float y)    vec4 mod(vec4 x,float y)
# 返回最小值,即如果y<x则返回y,否则返回x,注意,对于矢量而言,这是一个逐分量的运算
float min(float x,float y)       
vec2 min(vec2 x,float y)        vec3 min(vec3 x,float y)    vec4 min(vec4 x,float y)
# 返回最大值,即如果x<y则返回y,否则返回X。注意,对于矢量而言,这是一个逐分量的运算
float max(float x,float y)    
vec2 max(vec2 Xfloat y)         vec3 max(vec3 x,float y)   vec4 max(vec4 x,float y)
# 将x限制在minVal和max之间,即返回min(max(x,minVal),max)如果minVal>max,则返回未定义值
float clamp(float x,float min,float max)    
vec2 clamp(vec2 x,float minVal,float max)  vec3 clamp(vec3 x,float minVal,float max)   vec4 clamp(vec4x,float minVal,float max)
# 返四x和y的线性混合,即x*(1-a)+y*a
float mix(float x,float y,float a)
vec2 mix(vec2 x,vec2 y,float a)     vec3 mix(vec3 x,vec3 y,float a)     vec4 mix(vec4 x,vec4 y,float a)
vec2 mix(vec2 x,float y,vec2 a)     vec3 mix(vec3 x,float y,vec3 a)     vec4 mix(vec4 X,float y,vec4 a)
# 根据两个数值生成阶梯函数,即,如果x<edge则返回0.0,否则返四1.0
float step(float edge,float x)
vec2 step(float edge,vec2 x)        vec3 step(lloat edge,vec3 x)        vec4 step(float edge,vec4 X)
# 经过 Hermite插值的阶梯函数。如果xSedge0则返回0.0.如果x2edge1则返四1.0,否则按照如下方法插值出一个值并返回 //genType is float、vec2、vec3 道 vec4genType t;t-clamp((x-edge0)/(edge1-edge0),0,1)EeといEn t*t*(3-2*七),如果egde0zedge1 则返四未定义值
float smoothstep(float edge0,float eagel,float x)

# （以下所有的内置函数使用时不能将该函数的*所有float*替换为*vec2*、*vec3*、*vec4*,能替换的会申明）
# 几何函数
# 返回失量x的长度
float length(float x)       float length(vec2 x)    float length(vec3 x)     float length(vec4 x)
# 返回p0和P之间的距离,即1ength(p0-p1)
float distance(float p0,float p1)      float distance(vec2 p0,vec2 p1)     float distance(vec3 p0,vec3 pl)       float distance(vec4 p0,vec4 p1)
# 返回x和y的点积,对于vec3而言,就是x[0]*y[0]+x[1]*y[1]+x[2]*y[2]
float dot(float x,float y)     float dot(vec2 x,vec2 y)       float dot(vec3 x,vec3 y)      float dot(vec4 x,vec4 y)
# 返回x和y的又积,对于vec3而言,就是reslut[0]=x[1]*y[2]-y[1]*x[2]result[1]=x[2]*y[0]-y[2]*x[0]result[2]-x[0]*y[1]-y[0]*x[1]
vec3 cross(vec3 X,vec3 y)
# 对x进行归一化,保持矢量方向不变但长度为1,即 x/length(x)
float normalize(float x)
# 法向量反向(如果需要)操作,根据入射矢量N和参考失量Wref 来调整法向量。如果dot(Nzef,I)<0则返回N,否则返回-N
float faceforward(float N,float I,float Nref)
# 计算反射失量。入射矢量为I,表面法向量为N,近回 I-2 * dot(N,T) * N 。注意,N必须已经被归一化
float reflect(float I,float N)
# 根据入射光和介质特性计算折射现象。入射光方向为I,表面法向量为N,介质的折射率为eta,
# 返回被折射后的光线方向k=1,0-eta*eta*(1.0-dot(N,I)*dot(N,I))if(k<0.0) //genTyp包括float、vec2、vec3vec4返回 genType(0.0)
# 或者返回 eta*-(eta*dot(N,I)+sqrt(k))*N注意,入射光矢量 I 和表面法向量N必须已经被归一化
float refract(float I,float N,float eta)
vec2 refract(vec2 I,vec2 N,float eta)
vec2 refract(vec3 I,vec3 N,float eta)
vec4 refract(vec4 I,vec4 N,float eta)

# 矩阵函数
# 将矩阵x和矩阵y逐元素相乘,也就是说,result=matrixCompMatrix(x,y)   则 result[i][j]-x[i][j]*y[i][j]
mat2 matrixCompMult(mat2 x,mat2 y)
mat3 matrixCompMult(mat3 x,mat3 y)
mat4 matrixcompMult(mat4 x,mat4 y)
# 矢量函数(可类推vec3、vec4、ivec2、ivec3、ivec4)
# 逐分量比较 x<y是否成立
bvec2 lessThan(vec2 X,vec2 y)
# 逐分量比较x≤y是否成立
bvec2 lessThanEqual(vec2 x,vec2 y)
# 逐分量比较x>y是否成立
bvec2 greaterThan(vec2 x,vec2 y)
# 逐分量比较x≥y是否成立
bvec2 greaterThanEqual(vec2 x,vec2 y)
# 逐分量比较x==y是否成立
bvec2 equal(vec2 x,vec2 y)
# 逐分量比较x!=y是否成立
bvec2 notEqual(vec2 x,vec2 y)
# 失量的任意分量为true,则返回true
bool any(bvec2 x)
# 失量的所有分量都为true,则返回true
boo1 all(bvec2 x)
# 失量逐分量的逻辑补运算
bvec2 not(bvec2 x)
# 纹理查询函数
# 使用纹理坐标 coord,从当前绑定到sampler的二维纹理中读取相应的纹素。对于投影版本(常有Proj的),纹理坐标将从 coord 的最后一个分量中解析出来,而 vec4 类型的coord 的第3个分量将被忽略参数bias 只可在片元着色器中使用,它表示在sampler是MIPMAP纹理时,加在当前Iod 上的值
vec4 texture2D(sampler2D sampler,vec2 coord)
vec4 texture2D(sampler2D sampler,vec2 coord,float bias)
vec4 texture2DProi(sampler2D sampler,vec3 coord)
vec4 texture2DProj(sampler2D sampler,vec3 coord,float bias)
vec4 texture2DProi(sampler2Dsampler,vec4cod)
vec4 texture2DProj(sampler2D sampler,vec4 coord,float bias)
vec4 texture2DLod(sampler2D sampler,vec2 coord,float lod)
vec4 texture2DProjLod(sampler2D sampler,vec3 coord,Toat lod)
# 使用纹理坐标coord,从绑定到sampler的主方体纹理中读取响应纹素。coord 的方向可用来指定立方体纹理的表面
vec4 textureCube(samplerCube sampler,vec3 coord)
vec4 textureCube(samplerCube sampler,vec3 coord,float bias)
vec4 textureCubeLod(samplerCube sampler,vec3 coord,float lod)