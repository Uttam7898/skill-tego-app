import React, { useRef, useEffect } from 'react';

interface InteractiveReelCanvasProps {
  reelId: string;
  ambientColor: string;
  secondaryColor: string;
  isPlaying: boolean;
}

export const InteractiveReelCanvas: React.FC<InteractiveReelCanvasProps> = ({
  reelId,
  ambientColor,
  secondaryColor,
  isPlaying,
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let t = 0;

    // Resize canvas to match display pixel ratio for razor-sharp rendering
    const handleResize = () => {
      const rect = canvas.getBoundingClientRect();
      const dpr = window.devicePixelRatio || 1;
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      ctx.scale(dpr, dpr);
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    const render = () => {
      if (isPlaying) {
        t += 0.03;
      }

      const rect = canvas.getBoundingClientRect();
      const w = rect.width;
      const h = rect.height;

      ctx.clearRect(0, 0, w, h);

      if (reelId === 'reel-1') {
        // AI Resume & AST Semantic Vector Parser Visualizer
        // Glowing matrix cyber lines + scanning radar + AST Node graph
        ctx.fillStyle = 'rgba(10, 12, 26, 0.4)';
        ctx.fillRect(0, 0, w, h);

        // Grid lines
        ctx.strokeStyle = 'rgba(99, 102, 241, 0.15)';
        ctx.lineWidth = 1;
        const gridSize = 36;
        for (let x = 0; x < w; x += gridSize) {
          ctx.beginPath();
          ctx.moveTo(x, 0);
          ctx.lineTo(x, h);
          ctx.stroke();
        }
        for (let y = 0; y < h; y += gridSize) {
          ctx.beginPath();
          ctx.moveTo(0, y);
          ctx.lineTo(w, y);
          ctx.stroke();
        }

        // Animated Scanning Line
        const scanY = (Math.sin(t * 1.5) * 0.5 + 0.5) * h;
        const grad = ctx.createLinearGradient(0, scanY - 30, 0, scanY + 30);
        grad.addColorStop(0, 'transparent');
        grad.addColorStop(0.5, ambientColor);
        grad.addColorStop(1, 'transparent');
        ctx.fillStyle = grad;
        ctx.fillRect(0, scanY - 20, w, 40);

        // AST Semantic Nodes & Connections
        const nodes = [
          { x: w * 0.3, y: h * 0.35 + Math.sin(t) * 12, label: 'Candidate Vector', score: '99.4%' },
          { x: w * 0.7, y: h * 0.45 + Math.cos(t) * 10, label: 'Job Embedding', score: '50k AST' },
          { x: w * 0.5, y: h * 0.65 + Math.sin(t * 1.2) * 15, label: 'Semantic Match', score: 'Cosine 0.98' },
        ];

        // Draw connections
        ctx.strokeStyle = 'rgba(6, 182, 212, 0.6)';
        ctx.lineWidth = 2;
        ctx.setLineDash([4, 4]);
        ctx.beginPath();
        ctx.moveTo(nodes[0].x, nodes[0].y);
        ctx.lineTo(nodes[1].x, nodes[1].y);
        ctx.lineTo(nodes[2].x, nodes[2].y);
        ctx.closePath();
        ctx.stroke();
        ctx.setLineDash([]);

        // Draw Nodes
        nodes.forEach((n, i) => {
          ctx.shadowColor = i === 2 ? '#06b6d4' : '#6366f1';
          ctx.shadowBlur = 15;
          ctx.fillStyle = i === 2 ? '#06b6d4' : '#6366f1';
          ctx.beginPath();
          ctx.arc(n.x, n.y, 16, 0, Math.PI * 2);
          ctx.fill();
          ctx.shadowBlur = 0;

          // Outer pulse ring
          ctx.strokeStyle = 'rgba(255, 255, 255, 0.6)';
          ctx.lineWidth = 1.5;
          ctx.beginPath();
          ctx.arc(n.x, n.y, 22 + Math.sin(t * 3 + i) * 4, 0, Math.PI * 2);
          ctx.stroke();

          // Label
          ctx.fillStyle = '#ffffff';
          ctx.font = 'bold 11px JetBrains Mono, monospace';
          ctx.textAlign = 'center';
          ctx.fillText(n.label, n.x, n.y - 28);
          ctx.fillStyle = '#67e8f9';
          ctx.font = '10px JetBrains Mono, monospace';
          ctx.fillText(n.score, n.x, n.y + 35);
        });

      } else if (reelId === 'reel-2') {
        // WebGL 3D Raymarching Shader Simulation
        // Reactive rotating kaleidoscopic geometric toruses & audio frequencies
        const centerX = w / 2;
        const centerY = h / 2 - 20;
        const radius = Math.min(w, h) * 0.32;

        // Radial audio waves
        for (let i = 0; i < 36; i++) {
          const angle = (i / 36) * Math.PI * 2 + t * 0.5;
          const amp = Math.sin(t * 3 + i * 0.6) * 25 + 10;
          const x1 = centerX + Math.cos(angle) * (radius - 10);
          const y1 = centerY + Math.sin(angle) * (radius - 10);
          const x2 = centerX + Math.cos(angle) * (radius + amp);
          const y2 = centerY + Math.sin(angle) * (radius + amp);

          ctx.strokeStyle = i % 2 === 0 ? ambientColor : secondaryColor;
          ctx.lineWidth = 3;
          ctx.beginPath();
          ctx.moveTo(x1, y1);
          ctx.lineTo(x2, y2);
          ctx.stroke();
        }

        // Rotating Wireframe Icosahedron Rings
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.85)';
        ctx.lineWidth = 2;
        ctx.beginPath();
        for (let j = 0; j < 8; j++) {
          const a = (j / 8) * Math.PI * 2 + t;
          const px = centerX + Math.cos(a) * (radius * 0.65);
          const py = centerY + Math.sin(a * 2) * (radius * 0.45);
          if (j === 0) ctx.moveTo(px, py);
          else ctx.lineTo(px, py);
        }
        ctx.closePath();
        ctx.stroke();

        // Center glowing core
        const coreGrad = ctx.createRadialGradient(centerX, centerY, 5, centerX, centerY, radius * 0.5);
        coreGrad.addColorStop(0, '#f472b6');
        coreGrad.addColorStop(0.6, '#a855f7');
        coreGrad.addColorStop(1, 'transparent');
        ctx.fillStyle = coreGrad;
        ctx.beginPath();
        ctx.arc(centerX, centerY, radius * 0.5, 0, Math.PI * 2);
        ctx.fill();

      } else if (reelId === 'reel-3') {
        // High-Throughput Go & Raft Distributed Cluster
        // 5 Raft Nodes with packet bursts and live QPS ticker
        const centerX = w / 2;
        const centerY = h / 2 - 30;
        const clusterRadius = Math.min(w, h) * 0.28;
        const nodeCount = 5;

        // Ring
        ctx.strokeStyle = 'rgba(16, 185, 129, 0.25)';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.arc(centerX, centerY, clusterRadius, 0, Math.PI * 2);
        ctx.stroke();

        // Raft Nodes
        for (let i = 0; i < nodeCount; i++) {
          const angle = (i / nodeCount) * Math.PI * 2 - Math.PI / 2;
          const nx = centerX + Math.cos(angle) * clusterRadius;
          const ny = centerY + Math.sin(angle) * clusterRadius;
          const isLeader = i === 0;

          // Packet pulses traveling to peers
          const packetProgress = (t * 2 + i * 0.7) % 1;
          const targetAngle = ((i + 1) / nodeCount) * Math.PI * 2 - Math.PI / 2;
          const tx = centerX + Math.cos(targetAngle) * clusterRadius;
          const ty = centerY + Math.sin(targetAngle) * clusterRadius;
          const px = nx + (tx - nx) * packetProgress;
          const py = ny + (ty - ny) * packetProgress;

          ctx.fillStyle = '#6ee7b7';
          ctx.beginPath();
          ctx.arc(px, py, 4, 0, Math.PI * 2);
          ctx.fill();

          // Node Circle
          ctx.fillStyle = isLeader ? '#10b981' : '#047857';
          ctx.shadowColor = '#10b981';
          ctx.shadowBlur = isLeader ? 20 : 8;
          ctx.beginPath();
          ctx.arc(nx, ny, isLeader ? 18 : 14, 0, Math.PI * 2);
          ctx.fill();
          ctx.shadowBlur = 0;

          ctx.fillStyle = '#ffffff';
          ctx.font = 'bold 10px JetBrains Mono, monospace';
          ctx.textAlign = 'center';
          ctx.fillText(isLeader ? 'LEADER' : `Node-${i}`, nx, ny + 4);
        }

        // Live QPS HUD in center
        ctx.fillStyle = 'rgba(6, 78, 59, 0.75)';
        ctx.roundRect?.(centerX - 65, centerY - 22, 130, 44, 8);
        ctx.fill();
        ctx.strokeStyle = '#10b981';
        ctx.stroke();

        ctx.fillStyle = '#a7f3d0';
        ctx.font = 'bold 13px JetBrains Mono, monospace';
        ctx.textAlign = 'center';
        ctx.fillText('1,280,412 QPS', centerX, centerY - 2);
        ctx.fillStyle = '#34d399';
        ctx.font = '9px JetBrains Mono, monospace';
        ctx.fillText('0.12ms p99 · 0 LOCKS', centerX, centerY + 13);

      } else if (reelId === 'reel-4') {
        // Edge AI & Autonomous Robotics Vision HUD
        // Bounding boxes, 3D trajectory path, FPS counter, crosshair
        const boxX = w * 0.2 + Math.sin(t * 1.5) * 35;
        const boxY = h * 0.3 + Math.cos(t) * 25;
        const boxW = w * 0.55;
        const boxH = h * 0.28;

        // Bounding Box
        ctx.strokeStyle = '#f59e0b';
        ctx.lineWidth = 2.5;
        ctx.strokeRect(boxX, boxY, boxW, boxH);

        // Corner accents
        const cornerLen = 14;
        ctx.fillStyle = '#ef4444';
        ctx.fillRect(boxX - 2, boxY - 2, cornerLen, 4);
        ctx.fillRect(boxX - 2, boxY - 2, 4, cornerLen);
        ctx.fillRect(boxX + boxW - cornerLen + 2, boxY - 2, cornerLen, 4);
        ctx.fillRect(boxX + boxW - 2, boxY - 2, 4, cornerLen);

        // Tag label
        ctx.fillStyle = '#f59e0b';
        ctx.fillRect(boxX, boxY - 20, 160, 20);
        ctx.fillStyle = '#000000';
        ctx.font = 'bold 10px JetBrains Mono, monospace';
        ctx.textAlign = 'left';
        ctx.fillText('TARGET: DRONE [99.8%]', boxX + 6, boxY - 6);

        // Dynamic 3D Trajectory trail
        ctx.strokeStyle = 'rgba(239, 68, 68, 0.7)';
        ctx.lineWidth = 2;
        ctx.beginPath();
        for (let step = 0; step < 20; step++) {
          const trailT = t - step * 0.08;
          const tx = w * 0.2 + Math.sin(trailT * 1.5) * 35 + boxW / 2;
          const ty = h * 0.3 + Math.cos(trailT) * 25 + boxH / 2;
          if (step === 0) ctx.moveTo(tx, ty);
          else ctx.lineTo(tx, ty);
        }
        ctx.stroke();

        // Crosshairs in target center
        const cx = boxX + boxW / 2;
        const cy = boxY + boxH / 2;
        ctx.strokeStyle = '#38bdf8';
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.arc(cx, cy, 18, 0, Math.PI * 2);
        ctx.moveTo(cx - 24, cy);
        ctx.lineTo(cx + 24, cy);
        ctx.moveTo(cx, cy - 24);
        ctx.lineTo(cx, cy + 24);
        ctx.stroke();

        // Spatial Coordinates HUD
        ctx.fillStyle = 'rgba(0, 0, 0, 0.65)';
        ctx.fillRect(w * 0.1, h * 0.65, w * 0.8, 55);
        ctx.strokeStyle = 'rgba(245, 158, 11, 0.5)';
        ctx.strokeRect(w * 0.1, h * 0.65, w * 0.8, 55);

        ctx.fillStyle = '#fbbf24';
        ctx.font = 'bold 11px JetBrains Mono, monospace';
        ctx.fillText(`XYZ: [${(Math.sin(t) * 12.4).toFixed(2)}, ${(Math.cos(t) * 8.2).toFixed(2)}, 42.10m]`, w * 0.14, h * 0.65 + 20);
        ctx.fillStyle = '#34d399';
        ctx.fillText('INFERENCE: 11.8ms · 62 FPS (INT8 Pi5)', w * 0.14, h * 0.65 + 40);

      } else {
        // Spring Physics & Motion UI Engine
        // Interactive bouncing springs and fluid cards
        const cardY = h * 0.42 + Math.sin(t * 2.5) * 45;
        const cardW = w * 0.75;
        const cardH = 110;
        const cardX = (w - cardW) / 2;

        // Draw spring coils above
        ctx.strokeStyle = 'rgba(6, 182, 212, 0.8)';
        ctx.lineWidth = 3;
        ctx.beginPath();
        ctx.moveTo(w / 2, h * 0.2);
        for (let seg = 0; seg < 10; seg++) {
          const sy = h * 0.2 + (seg / 10) * (cardY - h * 0.2);
          const sx = w / 2 + (seg % 2 === 0 ? 15 : -15);
          ctx.lineTo(sx, sy);
        }
        ctx.lineTo(w / 2, cardY);
        ctx.stroke();

        // Floating Physics Card
        ctx.fillStyle = 'rgba(15, 23, 42, 0.85)';
        ctx.shadowColor = '#06b6d4';
        ctx.shadowBlur = 25;
        ctx.roundRect?.(cardX, cardY, cardW, cardH, 16);
        ctx.fill();
        ctx.shadowBlur = 0;
        ctx.strokeStyle = '#38bdf8';
        ctx.stroke();

        ctx.fillStyle = '#ffffff';
        ctx.font = 'bold 13px Outfit, sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText('⚡ Aura Spring Physics v3', w / 2, cardY + 35);

        ctx.fillStyle = '#94a3b8';
        ctx.font = '10px JetBrains Mono, monospace';
        ctx.fillText('Tension: 170 · Damping: 26', w / 2, cardY + 60);

        ctx.fillStyle = '#38bdf8';
        ctx.font = 'bold 11px JetBrains Mono, monospace';
        ctx.fillText('Velocity: ' + (Math.cos(t * 2.5) * 4.2).toFixed(2) + ' px/ms', w / 2, cardY + 85);
      }

      animationFrameId = requestAnimationFrame(render);
    };

    animationFrameId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
    };
  }, [reelId, ambientColor, secondaryColor, isPlaying]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none z-10 transition-opacity duration-500"
    />
  );
};
