import React, { useEffect, useRef } from 'react';

const SpiralMesh: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let time = 0;

    const resize = () => {
      const parent = canvas.parentElement;
      if (parent) {
        canvas.width = parent.clientWidth;
        canvas.height = parent.clientHeight;
      }
    };

    window.addEventListener('resize', resize);
    resize();

    const draw = () => {
      time += 0.001;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const centerX = canvas.width * 0.2;
      const centerY = canvas.height * 0.5;
      
      // Draw the dense mesh background
      ctx.lineWidth = 0.3;
      
      for (let j = 0; j < 12; j++) {
        ctx.strokeStyle = `rgba(20, 255, 236, ${0.05 + Math.sin(time + j) * 0.02})`;
        ctx.beginPath();
        
        const phase = j * (Math.PI / 6);
        const speed = 0.5 + j * 0.05;

        for (let i = 0; i < 500; i++) {
          const angle = 0.1 * i + time * speed + phase;
          const radius = (0.6 * i) * (1 + 0.2 * Math.sin(time * 0.2 + phase));
          
          // Parametric equations for a more complex "lobed" spiral
          const x = centerX + radius * Math.cos(angle) * (1 + 0.3 * Math.cos(angle * 0.5));
          const y = centerY + radius * Math.sin(angle) * (1 + 0.2 * Math.sin(angle * 0.5));

          if (i === 0) {
            ctx.moveTo(x, y);
          } else {
            ctx.lineTo(x, y);
          }
        }
        ctx.stroke();
      }

      // Draw the brighter, more defined glowing paths
      ctx.lineWidth = 1.5;
      ctx.shadowBlur = 25;
      ctx.shadowColor = 'rgba(20, 255, 236, 0.6)';
      
      for (let k = 0; k < 2; k++) {
        ctx.strokeStyle = `rgba(20, 255, 236, ${0.4 + k * 0.2})`;
        ctx.beginPath();
        const kPhase = k * Math.PI;
        
        for (let i = 0; i < 700; i++) {
          const angle = 0.08 * i - time * (1 + k * 0.2) + kPhase;
          const radius = (0.9 * i);
          
          const x = centerX + radius * Math.cos(angle) * (1 + 0.4 * Math.cos(angle * 0.5));
          const y = centerY + radius * Math.sin(angle) * (1 + 0.3 * Math.sin(angle * 0.5));

          if (i === 0) {
            ctx.moveTo(x, y);
          } else {
            ctx.lineTo(x, y);
          }

          // Add particles/dots at intervals
          if (i % 40 === 0) {
            const dotX = x;
            const dotY = y;
            ctx.save();
            ctx.fillStyle = 'rgba(20, 255, 236, 0.8)';
            ctx.beginPath();
            ctx.arc(dotX, dotY, 1.5, 0, Math.PI * 2);
            ctx.fill();
            ctx.restore();
          }
        }
        ctx.stroke();
      }
      
      ctx.shadowBlur = 0;

      animationFrameId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas 
      ref={canvasRef} 
      className="absolute inset-0 pointer-events-none opacity-80"
      style={{ mixBlendMode: 'screen' }}
    />
  );
};

export default SpiralMesh;
