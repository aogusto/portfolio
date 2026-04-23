'use client';
import React, { useEffect } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';

interface WaveLinesCanvasProps {
  children?: React.ReactNode;
}

const SPOTLIGHT_SIZE = 800;

const WaveLinesCanvas: React.FC<WaveLinesCanvasProps> = ({ children }) => {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springX = useSpring(mouseX, { stiffness: 60, damping: 25 });
  const springY = useSpring(mouseY, { stiffness: 60, damping: 25 });

  const spotlightX = useTransform(springX, (x) => x - SPOTLIGHT_SIZE / 2);
  const spotlightY = useTransform(springY, (y) => y - SPOTLIGHT_SIZE / 2);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [mouseX, mouseY]);

  return (
    <div className="min-h-screen w-full relative overflow-x-hidden">
      {/* ── Aurora blobs – ambient layer ── */}
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
        <div className="aurora-blob aurora-blob-1" />
        <div className="aurora-blob aurora-blob-2" />
        <div className="aurora-blob aurora-blob-3" />
      </div>

      {/* ── Cursor spotlight ── */}
      <motion.div
        className="fixed z-0 pointer-events-none rounded-full"
        style={{
          width: SPOTLIGHT_SIZE,
          height: SPOTLIGHT_SIZE,
          top: 0,
          left: 0,
          x: spotlightX,
          y: spotlightY,
          background:
            'radial-gradient(circle, rgba(74,222,128,0.09) 0%, rgba(74,222,128,0.03) 45%, transparent 70%)',
        }}
      />

      <div className="relative z-10">{children}</div>
    </div>
  );
};

export default WaveLinesCanvas;
