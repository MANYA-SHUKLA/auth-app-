'use client';

import { motion } from 'framer-motion';
import { Box, useTheme } from '@mui/material';
import { useState, useEffect, useMemo } from 'react';

interface ShapeConfig {
  size: number;
  initialX: number;
  initialY: number;
  duration: number;
  delay: number;
  xRange: [number, number];
  yRange: [number, number];
  gradient: string;
}

interface SmallShapePosition {
  x: number;
  y: number;
  xRange?: [number, number];
  yRange?: [number, number];
}

/**
 * FloatingShapes component - Creates animated background shapes
 */
export default function FloatingShapes() {
  const [mounted, setMounted] = useState(false);
  const theme = useTheme();
  const isDark = theme.palette.mode === 'dark';

  useEffect(() => {
    setMounted(true);
  }, []);

  const largeShapes = useMemo<ShapeConfig[]>(
    () => [
      {
        size: 200,
        initialX: 10,
        initialY: 10,
        duration: 25,
        delay: 0,
        xRange: [5, 40],
        yRange: [5, 35],
        gradient: isDark
          ? 'linear-gradient(135deg, rgba(99, 102, 241, 0.5), rgba(139, 92, 246, 0.4))'
          : 'linear-gradient(135deg, rgba(99, 102, 241, 0.6), rgba(139, 92, 246, 0.5))',
      },
      {
        size: 150,
        initialX: 90,
        initialY: 15,
        duration: 30,
        delay: 4,
        xRange: [60, 95],
        yRange: [5, 40],
        gradient: isDark
          ? 'linear-gradient(135deg, rgba(139, 92, 246, 0.5), rgba(236, 72, 153, 0.4))'
          : 'linear-gradient(135deg, rgba(139, 92, 246, 0.6), rgba(236, 72, 153, 0.5))',
      },
      {
        size: 180,
        initialX: 10,
        initialY: 70,
        duration: 28,
        delay: 2,
        xRange: [5, 45],
        yRange: [60, 95],
        gradient: isDark
          ? 'linear-gradient(135deg, rgba(236, 72, 153, 0.5), rgba(99, 102, 241, 0.4))'
          : 'linear-gradient(135deg, rgba(236, 72, 153, 0.6), rgba(99, 102, 241, 0.5))',
      },
      {
        size: 120,
        initialX: 80,
        initialY: 75,
        duration: 32,
        delay: 5,
        xRange: [55, 95],
        yRange: [60, 95],
        gradient: isDark
          ? 'linear-gradient(135deg, rgba(99, 102, 241, 0.4), rgba(236, 72, 153, 0.5))'
          : 'linear-gradient(135deg, rgba(99, 102, 241, 0.5), rgba(236, 72, 153, 0.6))',
      },
      {
        size: 100,
        initialX: 50,
        initialY: 50,
        duration: 22,
        delay: 1,
        xRange: [30, 70],
        yRange: [30, 70],
        gradient: isDark
          ? 'linear-gradient(135deg, rgba(139, 92, 246, 0.4), rgba(99, 102, 241, 0.5))'
          : 'linear-gradient(135deg, rgba(139, 92, 246, 0.5), rgba(99, 102, 241, 0.6))',
      },
    ],
    [isDark]
  );

  const smallShapePositions: SmallShapePosition[] = useMemo(
    () => [
      { x: 12, y: 12 },
      { x: 88, y: 18 },
      { x: 18, y: 78 },
      { x: 82, y: 88 },
      { x: 42, y: 8 },
      { x: 58, y: 92 },
      { x: 8, y: 48 },
      { x: 92, y: 52 },
    ],
    []
  );

  const geometricPositions: SmallShapePosition[] = useMemo(
    () => [
      { x: 5, y: 10, xRange: [0, 30], yRange: [0, 30] },
      { x: 25, y: 5, xRange: [15, 45], yRange: [0, 25] },
      { x: 45, y: 15, xRange: [35, 65], yRange: [0, 30] },
      { x: 65, y: 8, xRange: [55, 85], yRange: [0, 25] },
      { x: 85, y: 12, xRange: [70, 100], yRange: [0, 30] },
      { x: 95, y: 20, xRange: [80, 100], yRange: [10, 40] },
      { x: 8, y: 40, xRange: [0, 35], yRange: [25, 55] },
      { x: 30, y: 45, xRange: [15, 50], yRange: [30, 60] },
      { x: 70, y: 50, xRange: [50, 85], yRange: [35, 65] },
      { x: 92, y: 55, xRange: [75, 100], yRange: [40, 70] },
      { x: 15, y: 75, xRange: [0, 40], yRange: [60, 100] },
      { x: 50, y: 85, xRange: [35, 65], yRange: [70, 100] },
    ],
    []
  );

  const getMovementPath = (shape: ShapeConfig) => {
    const xMovement = [
      shape.initialX,
      shape.xRange[1],
      shape.xRange[0],
      (shape.xRange[0] + shape.xRange[1]) / 2,
      shape.xRange[1] - 10,
      shape.xRange[0] + 10,
      shape.initialX,
    ];

    const yMovement = [
      shape.initialY,
      shape.yRange[0] + 5,
      shape.yRange[1] - 5,
      (shape.yRange[0] + shape.yRange[1]) / 2,
      shape.yRange[1],
      shape.yRange[0],
      shape.initialY,
    ];

    return {
      x: xMovement.map((x) => `${x}%`),
      y: yMovement.map((y) => `${y}%`),
    };
  };

  if (!mounted) {
    return null;
  }

  return (
    <Box
      sx={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        overflow: 'hidden',
        pointerEvents: 'none',
        zIndex: 0,
      }}
    >
      {largeShapes.map((shape, index) => {
        const movement = getMovementPath(shape);
        return (
          <motion.div
            key={`large-${index}`}
            initial={{
              x: `${shape.initialX}%`,
              y: `${shape.initialY}%`,
              opacity: isDark ? 0.3 : 0.4,
              scale: 0.8,
            }}
            animate={{
              ...movement,
              rotate: index % 2 === 0 ? [0, 180, 360, 180, 0] : [360, 180, 0, 180, 360],
              scale: index % 2 === 0 ? [0.8, 1.1, 0.9, 1.05, 0.8] : [0.8, 0.95, 1.15, 0.85, 0.8],
              opacity: isDark
                ? [0.3, 0.5, 0.4, 0.45, 0.3]
                : [0.4, 0.6, 0.5, 0.55, 0.4],
            }}
            transition={{
              duration: shape.duration,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: shape.delay,
            }}
            whileHover={{
              scale: 1.3,
              opacity: isDark ? 0.7 : 0.8,
              transition: { duration: 0.3 },
            }}
            style={{
              position: 'absolute',
              borderRadius: '50%',
              filter: isDark ? 'blur(40px)' : 'blur(50px)',
              mixBlendMode: isDark ? 'screen' : 'multiply',
              pointerEvents: 'auto',
              cursor: 'pointer',
            }}
          >
            <Box
              sx={{
                width: shape.size,
                height: shape.size,
                borderRadius: '50%',
                background: shape.gradient,
                position: 'relative',
              }}
            />
          </motion.div>
        );
      })}

      {smallShapePositions.map((pos, index) => {
        const size = 60 + (index % 3) * 20;
        const duration = 15 + (index % 5) * 3;

        return (
          <motion.div
            key={`shape-${index}`}
            initial={{
              x: `${pos.x}%`,
              y: `${pos.y}%`,
              opacity: isDark ? 0.2 : 0.25,
              rotate: 0,
            }}
            animate={{
              y: [
                pos.y,
                pos.y + (index % 2 === 0 ? -15 : 18),
                pos.y + (index % 2 === 0 ? 12 : -10),
                pos.y,
              ].map((y) => `${y}%`),
              x: [
                pos.x,
                pos.x + (index % 2 === 0 ? 12 : -10),
                pos.x + (index % 2 === 0 ? -6 : 8),
                pos.x,
              ].map((x) => `${x}%`),
              rotate:
                index % 3 === 0
                  ? [0, 180, 360]
                  : index % 3 === 1
                    ? [360, 180, 0]
                    : [0, 270, 180, 360],
              opacity: isDark ? [0.2, 0.35, 0.28, 0.2] : [0.25, 0.4, 0.3, 0.25],
            }}
            transition={{
              duration: duration,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: index * 0.8 + (index % 2) * 1.2,
            }}
            whileHover={{
              scale: 1.5,
              opacity: isDark ? 0.5 : 0.6,
              rotate: 360,
              transition: { duration: 0.5 },
            }}
            style={{
              position: 'absolute',
              pointerEvents: 'auto',
            }}
          >
            <Box
              sx={{
                width: size,
                height: size,
                borderRadius: index % 2 === 0 ? '50%' : '20%',
                background:
                  index % 3 === 0
                    ? isDark
                      ? 'linear-gradient(135deg, rgba(99, 102, 241, 0.25), rgba(139, 92, 246, 0.25))'
                      : 'linear-gradient(135deg, rgba(99, 102, 241, 0.3), rgba(139, 92, 246, 0.3))'
                    : index % 3 === 1
                      ? isDark
                        ? 'linear-gradient(135deg, rgba(139, 92, 246, 0.25), rgba(236, 72, 153, 0.25))'
                        : 'linear-gradient(135deg, rgba(139, 92, 246, 0.3), rgba(236, 72, 153, 0.3))'
                      : isDark
                        ? 'linear-gradient(135deg, rgba(236, 72, 153, 0.25), rgba(99, 102, 241, 0.25))'
                        : 'linear-gradient(135deg, rgba(236, 72, 153, 0.3), rgba(99, 102, 241, 0.3))',
                filter: isDark ? 'blur(25px)' : 'blur(30px)',
                mixBlendMode: isDark ? 'screen' : 'multiply',
              }}
            />
          </motion.div>
        );
      })}

      {geometricPositions.map((pos, index) => {
        const shapeTypes: Array<'circle' | 'square' | 'rectangle'> = ['circle', 'square', 'rectangle'];
        const shapeType = shapeTypes[index % 3];
        const baseSize = shapeType === 'rectangle' ? 80 : shapeType === 'square' ? 60 : 50;
        const width = shapeType === 'rectangle' ? baseSize * 1.5 : baseSize;
        const height = shapeType === 'rectangle' ? baseSize : baseSize;
        const duration = 12 + (index % 9) * 2.5;
        const delay = index * 0.8 + (index % 3) * 1.5;

        const colors = [
          isDark
            ? 'linear-gradient(135deg, rgba(99, 102, 241, 0.6), rgba(99, 102, 241, 0.4))'
            : 'linear-gradient(135deg, rgba(99, 102, 241, 0.7), rgba(99, 102, 241, 0.5))',
          isDark
            ? 'linear-gradient(135deg, rgba(139, 92, 246, 0.6), rgba(139, 92, 246, 0.4))'
            : 'linear-gradient(135deg, rgba(139, 92, 246, 0.7), rgba(139, 92, 246, 0.5))',
          isDark
            ? 'linear-gradient(135deg, rgba(236, 72, 153, 0.6), rgba(236, 72, 153, 0.4))'
            : 'linear-gradient(135deg, rgba(236, 72, 153, 0.7), rgba(236, 72, 153, 0.5))',
        ];
        const color = colors[index % colors.length];

        const xMovement = pos.xRange
          ? [
              pos.x,
              pos.xRange[1],
              pos.xRange[0],
              (pos.xRange[0] + pos.xRange[1]) / 2,
              pos.xRange[1] - 8,
              pos.xRange[0] + 8,
              pos.x,
            ]
          : [pos.x, pos.x];
        const yMovement = pos.yRange
          ? [
              pos.y,
              pos.yRange[0] + 5,
              pos.yRange[1] - 5,
              (pos.yRange[0] + pos.yRange[1]) / 2,
              pos.yRange[1],
              pos.yRange[0],
              pos.y,
            ]
          : [pos.y, pos.y];

        return (
          <motion.div
            key={`geometric-${index}`}
            initial={{
              x: `${pos.x}%`,
              y: `${pos.y}%`,
              opacity: isDark ? 0.4 : 0.5,
              rotate: 0,
            }}
            animate={{
              x: xMovement.map((x) => `${x}%`),
              y: yMovement.map((y) => `${y}%`),
              rotate:
                index % 3 === 0
                  ? [0, 90, 180, 270, 360, 180, 0]
                  : index % 3 === 1
                    ? [0, 180, 360, 180, 0, 270, 360]
                    : [360, 270, 180, 90, 0, 180, 360],
              opacity: isDark
                ? [0.4, 0.6, 0.5, 0.55, 0.45, 0.5, 0.4]
                : [0.5, 0.7, 0.6, 0.65, 0.55, 0.6, 0.5],
              scale:
                index % 3 === 0
                  ? [1, 1.3, 0.8, 1.2, 0.9, 1.1, 1]
                  : index % 3 === 1
                    ? [1, 0.9, 1.4, 0.85, 1.2, 0.95, 1]
                    : [1, 1.2, 0.7, 1.3, 0.85, 1.15, 1],
            }}
            transition={{
              duration: duration,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: delay,
            }}
            whileHover={{
              scale: 1.5,
              opacity: isDark ? 0.8 : 0.9,
              rotate: 360,
              transition: { duration: 0.3 },
            }}
            style={{
              position: 'absolute',
              pointerEvents: 'auto',
              cursor: 'pointer',
            }}
          >
            <Box
              sx={{
                width: width,
                height: height,
                borderRadius:
                  shapeType === 'circle' ? '50%' : shapeType === 'square' ? '12px' : '16px',
                background: color,
                border: `3px solid ${isDark ? 'rgba(255, 255, 255, 0.2)' : 'rgba(255, 255, 255, 0.4)'}`,
                boxShadow: isDark
                  ? '0 8px 30px rgba(99, 102, 241, 0.4)'
                  : '0 8px 30px rgba(99, 102, 241, 0.3)',
                backdropFilter: 'blur(8px)',
              }}
            />
          </motion.div>
        );
      })}
    </Box>
  );
}
