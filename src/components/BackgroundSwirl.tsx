import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

export const BackgroundSwirl: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    containerRef.current.appendChild(renderer.domElement);

    // Neural Network Nodes
    const nodesCount = 100;
    const nodesPositions = new Float32Array(nodesCount * 3);
    const nodesVelocities = new Float32Array(nodesCount * 3);
    
    for (let i = 0; i < nodesCount; i++) {
      const i3 = i * 3;
      nodesPositions[i3] = (Math.random() - 0.5) * 20;
      nodesPositions[i3 + 1] = (Math.random() - 0.5) * 20;
      nodesPositions[i3 + 2] = (Math.random() - 0.5) * 20;

      nodesVelocities[i3] = (Math.random() - 0.5) * 0.01;
      nodesVelocities[i3 + 1] = (Math.random() - 0.5) * 0.01;
      nodesVelocities[i3 + 2] = (Math.random() - 0.5) * 0.01;
    }

    const nodesGeometry = new THREE.BufferGeometry();
    nodesGeometry.setAttribute('position', new THREE.BufferAttribute(nodesPositions, 3));

    const nodesMaterial = new THREE.PointsMaterial({
      size: 0.08,
      color: '#00f5d4',
      transparent: true,
      opacity: 0.4,
      blending: THREE.AdditiveBlending,
    });

    const nodes = new THREE.Points(nodesGeometry, nodesMaterial);
    scene.add(nodes);

    // Connecting Lines
    const linesMaterial = new THREE.LineBasicMaterial({
      color: '#00f5d4',
      transparent: true,
      opacity: 0.1,
      blending: THREE.AdditiveBlending,
    });

    const linesGeometry = new THREE.BufferGeometry();
    const linesPositions = new Float32Array(nodesCount * nodesCount * 6); // Max possible lines
    linesGeometry.setAttribute('position', new THREE.BufferAttribute(linesPositions, 3));
    const lines = new THREE.LineSegments(linesGeometry, linesMaterial);
    scene.add(lines);

    camera.position.z = 10;

    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener('resize', handleResize);

    const animate = () => {
      requestAnimationFrame(animate);

      // Update node positions
      const positions = nodesGeometry.attributes.position.array as Float32Array;
      let lineIdx = 0;
      const linePositions = linesGeometry.attributes.position.array as Float32Array;

      for (let i = 0; i < nodesCount; i++) {
        const i3 = i * 3;
        positions[i3] += nodesVelocities[i3];
        positions[i3 + 1] += nodesVelocities[i3 + 1];
        positions[i3 + 2] += nodesVelocities[i3 + 2];

        // Bounce off boundaries
        if (Math.abs(positions[i3]) > 10) nodesVelocities[i3] *= -1;
        if (Math.abs(positions[i3 + 1]) > 10) nodesVelocities[i3 + 1] *= -1;
        if (Math.abs(positions[i3 + 2]) > 10) nodesVelocities[i3 + 2] *= -1;

        // Check distances for lines
        for (let j = i + 1; j < nodesCount; j++) {
          const j3 = j * 3;
          const dx = positions[i3] - positions[j3];
          const dy = positions[i3 + 1] - positions[j3 + 1];
          const dz = positions[i3 + 2] - positions[j3 + 2];
          const distSq = dx * dx + dy * dy + dz * dz;

          if (distSq < 16) { // Connection distance
            linePositions[lineIdx++] = positions[i3];
            linePositions[lineIdx++] = positions[i3 + 1];
            linePositions[lineIdx++] = positions[i3 + 2];
            linePositions[lineIdx++] = positions[j3];
            linePositions[lineIdx++] = positions[j3 + 1];
            linePositions[lineIdx++] = positions[j3 + 2];
          }
        }
      }

      nodesGeometry.attributes.position.needsUpdate = true;
      linesGeometry.setDrawRange(0, lineIdx / 3);
      linesGeometry.attributes.position.needsUpdate = true;

      scene.rotation.y += 0.0005;
      renderer.render(scene, camera);
    };

    animate();

    return () => {
      window.removeEventListener('resize', handleResize);
      if (containerRef.current) {
        containerRef.current.removeChild(renderer.domElement);
      }
      nodesGeometry.dispose();
      nodesMaterial.dispose();
      linesGeometry.dispose();
      linesMaterial.dispose();
    };
  }, []);

  return <div ref={containerRef} className="fixed inset-0 -z-10 pointer-events-none opacity-30" />;
};
