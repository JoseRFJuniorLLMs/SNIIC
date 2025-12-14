/**
 * Cria textura canvas com padrões culturais brasileiros
 */
import * as THREE from 'three';

export function createCulturalTexture(): THREE.CanvasTexture {
    const canvas = document.createElement('canvas');
    canvas.width = 2048;
    canvas.height = 2048;
    const ctx = canvas.getContext('2d')!;

    // Gradiente base com cores do Brasil
    const gradient = ctx.createLinearGradient(0, 0, 2048, 2048);
    gradient.addColorStop(0, '#168821');    // Verde
    gradient.addColorStop(0.5, '#0066CC');  // Azul
    gradient.addColorStop(1, '#FFD700');    // Amarelo
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, 2048, 2048);

    // Padrão de cestaria indígena (linhas onduladas)
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.25)';
    ctx.lineWidth = 4;
    for (let i = 0; i < 40; i++) {
        const y = (i * 2048) / 40;
        ctx.beginPath();
        ctx.moveTo(0, y);
        for (let x = 0; x < 2048; x += 40) {
            ctx.lineTo(x, y + Math.sin(x / 50) * 30);
        }
        ctx.stroke();
    }

    // Círculos concêntricos (mandalas culturais)
    ctx.strokeStyle = 'rgba(255, 215, 0, 0.2)';
    ctx.lineWidth = 3;
    for (let r = 100; r < 1000; r += 60) {
        ctx.beginPath();
        ctx.arc(1024, 1024, r, 0, Math.PI * 2);
        ctx.stroke();
    }

    // Triângulos (grafismo indígena)
    ctx.fillStyle = 'rgba(255, 255, 255, 0.12)';
    for (let i = 0; i < 50; i++) {
        const x = Math.random() * 2048;
        const y = Math.random() * 2048;
        const size = 30 + Math.random() * 50;
        ctx.beginPath();
        ctx.moveTo(x, y);
        ctx.lineTo(x + size, y);
        ctx.lineTo(x + size / 2, y - size);
        ctx.closePath();
        ctx.fill();
    }

    // Padrões de azulejo português
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.15)';
    ctx.lineWidth = 2;
    for (let x = 0; x < 2048; x += 200) {
        for (let y = 0; y < 2048; y += 200) {
            ctx.beginPath();
            ctx.arc(x, y, 40, 0, Math.PI * 2);
            ctx.stroke();
            ctx.beginPath();
            ctx.moveTo(x - 40, y);
            ctx.lineTo(x + 40, y);
            ctx.moveTo(x, y - 40);
            ctx.lineTo(x, y + 40);
            ctx.stroke();
        }
    }

    const texture = new THREE.CanvasTexture(canvas);
    texture.wrapS = THREE.RepeatWrapping;
    texture.wrapT = THREE.RepeatWrapping;

    return texture;
}