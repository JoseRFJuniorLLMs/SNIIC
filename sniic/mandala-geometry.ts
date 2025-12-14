/**
 * Geometria da Mandala Cultural Brasileira para SNIIC 2.0
 */
import * as THREE from 'three';

export const mandalaColors = {
    verde: 0x168821,
    azul: 0x0066CC,
    amarelo: 0xFFD700,
    coral: 0xFF6B6B,
    turquesa: 0x4ECDC4
};

export function createMandalaLayers(scene: THREE.Scene) {
    const mandalaGroup = new THREE.Group();

    // Centro dourado
    const centerGeometry = new THREE.CircleGeometry(0.5, 64);
    const centerMaterial = new THREE.MeshPhongMaterial({
        color: mandalaColors.amarelo,
        emissive: mandalaColors.amarelo,
        emissiveIntensity: 0.8,
        side: THREE.DoubleSide
    });
    const centerCircle = new THREE.Mesh(centerGeometry, centerMaterial);

    // Anéis das 5 regiões
    const rings: THREE.Mesh[] = [];
    const ringColors = [
        mandalaColors.verde,
        mandalaColors.azul,
        mandalaColors.amarelo,
        mandalaColors.coral,
        mandalaColors.turquesa
    ];

    for (let i = 0; i < 5; i++) {
        const innerRadius = 1 + i * 0.6;
        const outerRadius = innerRadius + 0.5;
        const ringGeometry = new THREE.RingGeometry(innerRadius, outerRadius, 64);
        const ringMaterial = new THREE.MeshPhongMaterial({
            color: ringColors[i],
            emissive: ringColors[i],
            emissiveIntensity: 0.4,
            side: THREE.DoubleSide,
            transparent: true,
            opacity: 0.7
        });
        const ring = new THREE.Mesh(ringGeometry, ringMaterial);
        rings.push(ring);
        mandalaGroup.add(ring);
    }

    // Pétalas (cestaria indígena)
    const petalGroup = new THREE.Group();
    const petalCount = 12;

    for (let i = 0; i < petalCount; i++) {
        const angle = (i / petalCount) * Math.PI * 2;
        const radius = 3;

        const petalShape = new THREE.Shape();
        petalShape.moveTo(0, 0);
        petalShape.quadraticCurveTo(0.3, 0.5, 0, 1.2);
        petalShape.quadraticCurveTo(-0.3, 0.5, 0, 0);

        const petalGeometry = new THREE.ShapeGeometry(petalShape);
        const petalMaterial = new THREE.MeshPhongMaterial({
            color: ringColors[i % ringColors.length],
            emissive: ringColors[i % ringColors.length],
            emissiveIntensity: 0.3,
            side: THREE.DoubleSide
        });

        const petal = new THREE.Mesh(petalGeometry, petalMaterial);
        petal.position.x = Math.cos(angle) * radius;
        petal.position.y = Math.sin(angle) * radius;
        petal.rotation.z = angle + Math.PI / 2;

        petalGroup.add(petal);
    }

    // Triângulos (grafismos geométricos)
    const triangleGroup = new THREE.Group();
    const triangleCount = 24;

    for (let i = 0; i < triangleCount; i++) {
        const angle = (i / triangleCount) * Math.PI * 2;
        const radius = 4.5;

        const triangleShape = new THREE.Shape();
        triangleShape.moveTo(0, 0.3);
        triangleShape.lineTo(0.2, -0.2);
        triangleShape.lineTo(-0.2, -0.2);
        triangleShape.lineTo(0, 0.3);

        const triangleGeometry = new THREE.ShapeGeometry(triangleShape);
        const triangleMaterial = new THREE.MeshPhongMaterial({
            color: 0xFFFFFF,
            emissive: ringColors[i % ringColors.length],
            emissiveIntensity: 0.5,
            side: THREE.DoubleSide
        });

        const triangle = new THREE.Mesh(triangleGeometry, triangleMaterial);
        triangle.position.x = Math.cos(angle) * radius;
        triangle.position.y = Math.sin(angle) * radius;
        triangle.rotation.z = angle;

        triangleGroup.add(triangle);
    }

    // Linhas radiais
    const lineGroup = new THREE.Group();
    const lineCount = 36;

    for (let i = 0; i < lineCount; i++) {
        const angle = (i / lineCount) * Math.PI * 2;
        const points = [
            new THREE.Vector3(Math.cos(angle) * 0.5, Math.sin(angle) * 0.5, 0),
            new THREE.Vector3(Math.cos(angle) * 5, Math.sin(angle) * 5, 0)
        ];

        const lineGeometry = new THREE.BufferGeometry().setFromPoints(points);
        const lineMaterial = new THREE.LineBasicMaterial({
            color: 0xFFFFFF,
            transparent: true,
            opacity: 0.15
        });

        const line = new THREE.Line(lineGeometry, lineMaterial);
        lineGroup.add(line);
    }

    mandalaGroup.add(centerCircle);
    mandalaGroup.add(petalGroup);
    mandalaGroup.add(triangleGroup);
    mandalaGroup.add(lineGroup);

    return {
        mandalaGroup,
        centerCircle,
        rings,
        petalGroup,
        triangleGroup,
        lineGroup
    };
}