import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

const SpiralBackground: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const mouseRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    if (!containerRef.current) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 5;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setClearColor(0x000000, 0); // Transparent background
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    containerRef.current.appendChild(renderer.domElement);

    // --- Spiral Mesh ---
    const segments = 120;
    const circles = 60;
    const radius = 3;
    const depth = 40;
    
    const geometry = new THREE.BufferGeometry();
    const positions: number[] = [];
    const indices: number[] = [];

    for (let j = 0; j <= circles; j++) {
      const z = (j / circles) * depth - depth / 2;
      const r = radius + Math.pow(j / circles, 2) * 10; // Pronounced funnel shape
      const angleOffset = j * 0.3; // Spiral twist

      for (let i = 0; i < segments; i++) {
        const angle = (i / segments) * Math.PI * 2 + angleOffset;
        const x = Math.cos(angle) * r;
        const y = Math.sin(angle) * r;
        positions.push(x, y, z);

        if (j < circles) {
          const current = j * segments + i;
          const next = (j + 1) * segments + i;
          const nextSide = j * segments + (i + 1) % segments;
          
          // Vertical lines
          indices.push(current, next);
          // Horizontal lines
          indices.push(current, nextSide);
        }
      }
    }

    geometry.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
    geometry.setIndex(indices);

    const material = new THREE.ShaderMaterial({
      uniforms: {
        time: { value: 0 },
        color: { value: new THREE.Color(0x00e5c4) },
      },
      vertexShader: `
        varying float vDepth;
        uniform float time;
        void main() {
          vDepth = position.z;
          vec3 pos = position;
          // Subtle wave animation
          pos.x += sin(pos.z * 0.2 + time) * 0.1;
          pos.y += cos(pos.z * 0.2 + time) * 0.1;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
        }
      `,
      fragmentShader: `
        varying float vDepth;
        uniform vec3 color;
        void main() {
          float opacity = (vDepth + 20.0) / 40.0; // Fade based on depth
          opacity = clamp(opacity, 0.1, 0.8);
          gl_FragColor = vec4(color, opacity * 0.5);
        }
      `,
      transparent: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });

    const spiralMesh = new THREE.LineSegments(geometry, material);
    spiralMesh.position.x = -2;
    scene.add(spiralMesh);

    // --- Particles ---
    const particleCount = 2000;
    const pGeometry = new THREE.BufferGeometry();
    const pPositions = new Float32Array(particleCount * 3);
    const pSpeeds = new Float32Array(particleCount);

    for (let i = 0; i < particleCount; i++) {
      const z = Math.random() * depth - depth / 2;
      const normalizedZ = (z + depth / 2) / depth;
      const r = radius + Math.pow(normalizedZ, 2) * 10;
      const angle = Math.random() * Math.PI * 2 + normalizedZ * circles * 0.3;
      
      pPositions[i * 3] = Math.cos(angle) * r;
      pPositions[i * 3 + 1] = Math.sin(angle) * r;
      pPositions[i * 3 + 2] = z;
      
      pSpeeds[i] = 0.05 + Math.random() * 0.1;
    }

    pGeometry.setAttribute('position', new THREE.BufferAttribute(pPositions, 3));
    const pMaterial = new THREE.PointsMaterial({
      color: 0x00e5c4,
      size: 0.04,
      transparent: true,
      opacity: 0.6,
      blending: THREE.AdditiveBlending,
    });

    const particles = new THREE.Points(pGeometry, pMaterial);
    particles.position.x = -2;
    scene.add(particles);

    // --- Interaction ---
    const handleMouseMove = (event: MouseEvent) => {
      mouseRef.current.x = (event.clientX / window.innerWidth) * 2 - 1;
      mouseRef.current.y = -(event.clientY / window.innerHeight) * 2 + 1;
    };

    window.addEventListener('mousemove', handleMouseMove);

    // --- Animation ---
    let time = 0;
    const animate = () => {
      requestAnimationFrame(animate);
      time += 0.01;
      material.uniforms.time.value = time;

      // Rotate spiral
      spiralMesh.rotation.z += 0.001;
      particles.rotation.z += 0.001;

      // Flow particles inward
      const pPosAttr = particles.geometry.attributes.position as THREE.BufferAttribute;
      for (let i = 0; i < particleCount; i++) {
        pPositions[i * 3 + 2] -= pSpeeds[i]; // Move towards camera
        
        if (pPositions[i * 3 + 2] < -depth / 2) {
          pPositions[i * 3 + 2] = depth / 2;
        }

        // Re-calculate X, Y to stay on the funnel
        const z = pPositions[i * 3 + 2];
        const normalizedZ = (z + depth / 2) / depth;
        const r = radius + Math.pow(normalizedZ, 2) * 10;
        const angle = Math.atan2(pPositions[i * 3 + 1], pPositions[i * 3]);
        
        pPositions[i * 3] = Math.cos(angle) * r;
        pPositions[i * 3 + 1] = Math.sin(angle) * r;
      }
      pPosAttr.needsUpdate = true;

      // Mouse Parallax
      camera.position.x += (mouseRef.current.x * 3 - camera.position.x) * 0.05;
      camera.position.y += (mouseRef.current.y * 3 - camera.position.y) * 0.05;
      camera.lookAt(0, 0, -5);

      renderer.render(scene, camera);
    };


    animate();

    // --- Resize ---
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      containerRef.current?.removeChild(renderer.domElement);
      renderer.dispose();
    };
  }, []);

  return (
    <div 
      ref={containerRef} 
      className="fixed inset-0 -z-10 w-full h-full overflow-hidden"
      style={{ touchAction: 'none' }}
    />
  );
};

export default SpiralBackground;
