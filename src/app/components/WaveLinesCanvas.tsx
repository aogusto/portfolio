'use client';
import React, { useRef, useEffect } from 'react';

interface WaveLinesCanvasProps {
  children?: React.ReactNode;
}

interface LineConfig {
  position: 'top' | 'middle' | 'bottom';
  offset: number;
  length: number;
  amplitude: number;
  speed: number;
  color: string;
  opacity: number;
  strokeWidth: number;
  phaseShift: number;

  y: number;
}

const WaveLinesCanvas: React.FC<WaveLinesCanvasProps> = ({ children }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width: number;
    let height: number;

    const computedStyle = getComputedStyle(document.documentElement);
    const primaryColor =
      computedStyle.getPropertyValue('--primary').trim() || '#7fcd91';
    const foregroundColor =
      computedStyle.getPropertyValue('--foreground').trim() || '#f5eaea';
    const shadowColor =
      computedStyle.getPropertyValue('--shadow').trim() || '#3b3b3b';

    const lines: LineConfig[] = [
      {
        position: 'top',
        offset: 40,
        length: 0.002,
        amplitude: 50,
        speed: 0.05,
        color: primaryColor,
        opacity: 0.15,
        strokeWidth: 1.5,
        phaseShift: Math.random() * Math.PI * 2,
        y: 0,
      },
      {
        position: 'top',
        offset: 90,
        length: 0.003,
        amplitude: 100,
        speed: 0.06,
        color: foregroundColor,
        opacity: 0.1,
        strokeWidth: 1,
        phaseShift: Math.random() * Math.PI * 2,
        y: 0,
      },

      {
        position: 'middle',
        offset: -30,
        length: 0.004,
        amplitude: 70,
        speed: 0.07,
        color: shadowColor,
        opacity: 0.08,
        strokeWidth: 1.2,
        phaseShift: Math.random() * Math.PI * 2,
        y: 0,
      },
      {
        position: 'middle',
        offset: 20,
        length: 0.0025,
        amplitude: 60,
        speed: 0.055,
        color: primaryColor,
        opacity: 0.12,
        strokeWidth: 1.8,
        phaseShift: Math.random() * Math.PI * 2,
        y: 0,
      },

      {
        position: 'bottom',
        offset: -120,
        length: 0.0035,
        amplitude: 80,
        speed: 0.065,
        color: foregroundColor,
        opacity: 0.09,
        strokeWidth: 1,
        phaseShift: Math.random() * Math.PI * 2,
        y: 0,
      },
      {
        position: 'bottom',
        offset: -50,
        length: 0.002,
        amplitude: 90,
        speed: 0.05,
        color: shadowColor,
        opacity: 0.11,
        strokeWidth: 1.5,
        phaseShift: Math.random() * Math.PI * 2,
        y: 0,
      },
    ];

    const handleResize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;

      lines.forEach((line) => {
        if (line.position === 'top') {
          line.y = line.offset;
        } else if (line.position === 'middle') {
          line.y = height / 2 + line.offset;
        } else if (line.position === 'bottom') {
          line.y = height + line.offset;
        }
      });
    };

    handleResize();

    window.addEventListener('resize', handleResize);

    let t = 0;

    const animate = () => {
      ctx.clearRect(0, 0, width, height);

      lines.forEach((line) => {
        ctx.beginPath();
        ctx.lineWidth = line.strokeWidth;
        ctx.strokeStyle = line.color;
        ctx.globalAlpha = line.opacity;

        const startX = 0;
        const startY =
          Math.sin(startX * line.length + t * line.speed + line.phaseShift) *
            line.amplitude +
          line.y;
        ctx.moveTo(startX, startY);

        for (let i = 0; i <= width; i += 5) {
          const x = i;
          const y =
            Math.sin(x * line.length + t * line.speed + line.phaseShift) *
              line.amplitude +
            line.y;
          ctx.lineTo(x, y);
        }

        ctx.stroke();
        ctx.globalAlpha = 1;
      });

      t += 0.05;
      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div className="min-h-screen w-full overflow-hidden relative">
      <canvas
        ref={canvasRef}
        className="fixed top-0 left-0 w-full h-full z-0"
        style={{ pointerEvents: 'none' }}
      />

      <div className="relative z-10">{children}</div>
    </div>
  );
};

export default WaveLinesCanvas;
