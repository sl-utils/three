import { BufferAttribute, BufferGeometry, Points } from 'three';
import { MaterialParticle } from '../../../materials/particle/particle';
export class AirParticle {
    constructor(scene, start, num = 90) {
        this.scene = scene;
        this.bufferGeometry = new BufferGeometry();
        this.start = start;
        this.num = num;
        this.position = new Float32Array(num * 3);
        this.uposition = new Float32Array(num * 4);
        this.arotate = new Float32Array(num);
        this.bufferGeometry.setAttribute('position', new BufferAttribute(this.position, 3));
        this.bufferGeometry.setAttribute('uposition', new BufferAttribute(this.uposition, 4));
        this.bufferGeometry.setAttribute('arotate', new BufferAttribute(this.arotate, 1));
        this.material = new MaterialParticle(start);
        this.particle = new Points(this.bufferGeometry, this.material);
        scene.container.add(this.particle);
    }
    onSetAirState(state) {
        if (state === 0) {
            this.scene.container.remove(this.particle);
            return;
        }
        const { material, start } = this;
        material.uniforms.ustate.value = state;
        material.uniforms.utime.value = (100 + Math.random() * 100) | 0.5;
        this.onSetPosition(start, state);
    }
    onSetPosition(start, state) {
        const { num, position, uposition, arotate, bufferGeometry } = this;
        const { x, y, z } = start;
        for (let i = 0, all = num * 3; i < all; i += 3) {
            position[i] = x;
            position[i + 1] = y;
            position[i + 2] = z;
            arotate[i / 3] = 0;
        }
        for (let i = 0, all = num * 4; i < all; i += 4) {
            if (state === 2) {
                uposition[i] = x + (Math.random() - 0.5) * 0.1;
                uposition[i + 1] = y + (Math.random() - 0.2) * 0.2;
                uposition[i + 2] = z + (Math.random() - 0.5) * 0.1;
                uposition[i + 3] = Math.random() * 0.5 + 0.2;
            }
            else {
                uposition[i] = x + (Math.random() - 0.5) * 0.17;
                uposition[i + 1] = y + (Math.random() - 0.2) * 0.25;
                uposition[i + 2] = z + (Math.random() - 0.5) * 0.17;
                uposition[i + 3] = Math.random() * 0.5 + 1.2;
            }
        }
        bufferGeometry.attributes.position.needsUpdate = true;
        bufferGeometry.attributes.arotate.needsUpdate = true;
        bufferGeometry.attributes.uposition.needsUpdate = true;
    }
}
//# sourceMappingURL=air-particle.js.map