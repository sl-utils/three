// import CANNON from "cannon";

export class Cannon {
    // constructor() {
    //     this.world.gravity.set(0, -9.82, 0);
    //     /**创建材质 */
    //     const defaultMaterial = new CANNON.Material('default');
    //     /**设定材质间的各种系数 */
    //     const defaultContactMaterial = new CANNON.ContactMaterial(defaultMaterial, defaultMaterial, {
    //         //摩擦力
    //         friction: 0.3,
    //         //弹性
    //         restitution: 0.7,
    //     })
    //     this.world.addContactMaterial(defaultContactMaterial);
    //     /**设定世界各物体的默认材质 */
    //     this.world.defaultContactMaterial = defaultContactMaterial;

    //     const sphereShape = new CANNON.Sphere(0.5);
    //     const sphereBody = this.sphere = new CANNON.Body({
    //         mass: 1,
    //         position: new CANNON.Vec3(0, 3, 0),
    //         shape: sphereShape,
    //         material: defaultMaterial
    //     })
    //     this.world.addBody(sphereBody);
    //     /**监听物体碰撞 */
    //     sphereBody.addEventListener('collide', (event) => {console.log(event)})

    //     const planeShape = new CANNON.Plane();
    //     const planeBody = new CANNON.Body({
    //         mass: 0,
    //         shape: planeShape,
    //         position: new CANNON.Vec3(0, 0, 0),
    //         material: defaultMaterial
    //     })
    //     planeBody.quaternion.setFromAxisAngle(new CANNON.Vec3(-1, 0, 0), Math.PI / 2)
    //     this.world.addBody(planeBody)

    //     sphereBody.applyLocalForce(new CANNON.Vec3(150, 0, 0), new CANNON.Vec3(0, 0, 0))

    //     /**定义碰撞检测方式 */
    //     this.world.broadphase = new CANNON.SAPBroadphase();
    //     /**休眠静止物体增强性能 */
    //     this.world.allowSleep = true;


    // }
    // /**创建物理世界 */
    // public readonly world: CANNON.World = new CANNON.World();
    // public sphere: CANNON.Body;

    // public createSphere(radius: number, options) {
    //     const sphereShape = new CANNON.Sphere(radius);
    // }

}