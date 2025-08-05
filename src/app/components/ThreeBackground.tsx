'use client';
import { useEffect, useRef } from 'react';

interface Particle {
  x: number;
  y: number;
  z: number;
  vx: number;
  vy: number;
  vz: number;
  size: number;
  color: string;
  alpha: number;
}

interface GeometricShape {
  x: number;
  y: number;
  z: number;
  rotationX: number;
  rotationY: number;
  rotationZ: number;
  size: number;
  color: string;
  type: 'triangle' | 'diamond' | 'hexagon';
}

export default function ThreeBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>();
  const mouseRef = useRef({ x: 0, y: 0 });
  const particlesRef = useRef<Particle[]>([]);
  const shapesRef = useRef<GeometricShape[]>([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Detect mobile
    const isMobile = window.innerWidth < 768;

    // Set canvas size
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeCanvas();

    // Create particles - fewer on mobile
    const createParticles = () => {
      const particles: Particle[] = [];
      const particleCount = isMobile ? 80 : 150; // Reduced for mobile

      for (let i = 0; i < particleCount; i++) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          z: Math.random() * 1000,
          vx: (Math.random() - 0.5) * 0.5,
          vy: (Math.random() - 0.5) * 0.5,
          vz: (Math.random() - 0.5) * 2,
          size: Math.random() * 3 + 1,
          color: `hsl(${220 + Math.random() * 60}, 70%, ${60 + Math.random() * 20}%)`,
          alpha: Math.random() * 0.8 + 0.2,
        });
      }
      particlesRef.current = particles;
    };

    // Create geometric shapes - much fewer on mobile and better spacing
    const createShapes = () => {
      const shapes: GeometricShape[] = [];
      const types: GeometricShape['type'][] = [
        'triangle',
        'diamond',
        'hexagon',
      ];
      const shapeCount = isMobile ? 4 : 12; // Much fewer shapes on mobile
      const minDistance = isMobile ? 120 : 80; // Minimum distance between shapes

      for (let i = 0; i < shapeCount; i++) {
        let x,
          y,
          attempts = 0;
        let validPosition = false;

        // Try to find a position that doesn't overlap with existing shapes
        while (!validPosition && attempts < 50) {
          x = Math.random() * canvas.width;
          y = Math.random() * canvas.height;

          validPosition = true;

          // Check distance from existing shapes
          for (const existingShape of shapes) {
            const distance = Math.sqrt(
              Math.pow(x - existingShape.x, 2) +
                Math.pow(y - existingShape.y, 2)
            );

            if (distance < minDistance) {
              validPosition = false;
              break;
            }
          }

          attempts++;
        }

        // If we couldn't find a good position, skip this shape
        if (!validPosition) continue;

        shapes.push({
          x: x!,
          y: y!,
          z: Math.random() * 500 + 100,
          rotationX: Math.random() * Math.PI * 2,
          rotationY: Math.random() * Math.PI * 2,
          rotationZ: Math.random() * Math.PI * 2,
          size: isMobile ? Math.random() * 25 + 15 : Math.random() * 40 + 20, // Smaller shapes on mobile
          color: `hsl(${240 + Math.random() * 40}, 60%, ${50 + Math.random() * 20}%)`,
          type: types[Math.floor(Math.random() * types.length)],
        });
      }
      shapesRef.current = shapes;
    };

    // Draw geometric shape
    const drawShape = (
      ctx: CanvasRenderingContext2D,
      shape: GeometricShape
    ) => {
      const { x, y, size, color, type, rotationZ } = shape;

      ctx.save();
      ctx.translate(x, y);
      ctx.rotate(rotationZ);
      ctx.strokeStyle = color;
      ctx.lineWidth = 2;
      ctx.globalAlpha = 0.4;

      ctx.beginPath();

      if (type === 'triangle') {
        ctx.moveTo(0, -size);
        ctx.lineTo(-size * 0.866, size * 0.5);
        ctx.lineTo(size * 0.866, size * 0.5);
        ctx.closePath();
      } else if (type === 'diamond') {
        ctx.moveTo(0, -size);
        ctx.lineTo(size, 0);
        ctx.lineTo(0, size);
        ctx.lineTo(-size, 0);
        ctx.closePath();
      } else if (type === 'hexagon') {
        for (let i = 0; i < 6; i++) {
          const angle = (i * Math.PI) / 3;
          const px = Math.cos(angle) * size;
          const py = Math.sin(angle) * size;
          if (i === 0) ctx.moveTo(px, py);
          else ctx.lineTo(px, py);
        }
        ctx.closePath();
      }

      ctx.stroke();
      ctx.restore();
    };

    // Draw particle
    const drawParticle = (
      ctx: CanvasRenderingContext2D,
      particle: Particle
    ) => {
      const { x, y, z, size, color, alpha } = particle;
      const scale = 500 / (z + 500);
      const screenX = x * scale + (canvas.width / 2) * (1 - scale);
      const screenY = y * scale + (canvas.height / 2) * (1 - scale);

      ctx.save();
      ctx.globalAlpha = alpha * scale;
      ctx.fillStyle = color;
      ctx.shadowBlur = 10;
      ctx.shadowColor = color;

      ctx.beginPath();
      ctx.arc(screenX, screenY, size * scale, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    };

    // Animation loop with mobile optimizations
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Update and draw particles
      particlesRef.current.forEach((particle) => {
        particle.x +=
          particle.vx + mouseRef.current.x * (isMobile ? 0.0005 : 0.001); // Less mouse effect on mobile
        particle.y +=
          particle.vy + mouseRef.current.y * (isMobile ? 0.0005 : 0.001);
        particle.z += particle.vz;

        // Wrap around screen
        if (particle.x < 0) particle.x = canvas.width;
        if (particle.x > canvas.width) particle.x = 0;
        if (particle.y < 0) particle.y = canvas.height;
        if (particle.y > canvas.height) particle.y = 0;
        if (particle.z > 1000) particle.z = 0;
        if (particle.z < 0) particle.z = 1000;

        drawParticle(ctx, particle);
      });

      // Update and draw shapes with slower movement on mobile
      shapesRef.current.forEach((shape) => {
        const speedMultiplier = isMobile ? 0.5 : 1; // Slower animations on mobile

        shape.rotationX += 0.005 * speedMultiplier;
        shape.rotationY += 0.003 * speedMultiplier;
        shape.rotationZ += 0.004 * speedMultiplier;
        shape.x +=
          Math.sin(Date.now() * 0.001 + shape.y * 0.01) * 0.1 * speedMultiplier;
        shape.y +=
          Math.cos(Date.now() * 0.001 + shape.x * 0.01) * 0.1 * speedMultiplier;

        // Gentle movement based on mouse
        shape.x +=
          (mouseRef.current.x - canvas.width / 2) *
          (isMobile ? 0.00005 : 0.0001);
        shape.y +=
          (mouseRef.current.y - canvas.height / 2) *
          (isMobile ? 0.00005 : 0.0001);

        // Keep shapes on screen with larger boundaries on mobile
        const boundary = isMobile ? 100 : 50;
        if (shape.x < -boundary) shape.x = canvas.width + boundary;
        if (shape.x > canvas.width + boundary) shape.x = -boundary;
        if (shape.y < -boundary) shape.y = canvas.height + boundary;
        if (shape.y > canvas.height + boundary) shape.y = -boundary;

        drawShape(ctx, shape);
      });

      animationRef.current = requestAnimationFrame(animate);
    };

    // Mouse move handler
    const handleMouseMove = (event: MouseEvent) => {
      mouseRef.current.x = event.clientX;
      mouseRef.current.y = event.clientY;
    };

    // Resize handler
    const handleResize = () => {
      const wasMobile = isMobile;
      const nowMobile = window.innerWidth < 768;

      resizeCanvas();

      // Recreate shapes if mobile status changed
      if (wasMobile !== nowMobile) {
        createParticles();
        createShapes();
      }
    };

    // Initialize
    createParticles();
    createShapes();
    animate();

    // Event listeners
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('resize', handleResize);

    // Cleanup
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div className="fixed inset-0 w-full h-full -z-10">
      {/* Gradient background */}
      <div
        className="absolute inset-0 w-full h-full"
        style={{
          background:
            'linear-gradient(135deg, #0a0a0a 0%, #1a1a2e 50%, #16213e 100%)',
        }}
      />
      {/* Canvas for interactive elements */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full"
        style={{ mixBlendMode: 'screen' }}
      />
      {/* Additional glow effects */}
      <div
        className="absolute inset-0 w-full h-full opacity-30"
        style={{
          background: `
            radial-gradient(circle at 20% 80%, rgba(120, 119, 198, 0.3) 0%, transparent 50%),
            radial-gradient(circle at 80% 20%, rgba(255, 119, 198, 0.15) 0%, transparent 50%),
            radial-gradient(circle at 40% 40%, rgba(120, 219, 255, 0.2) 0%, transparent 50%)
          `,
        }}
      />
    </div>
  );
}
