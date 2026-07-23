import { defineComponent, ref, onMounted, onBeforeUnmount } from "vue";
import * as THREE from "three";

export default defineComponent({
  name: "HeroCanvas",

  setup() {
    const containerRef = ref(null);
    let renderer, scene, camera, particleSystem, animationFrameId;

    // Mouse tracking for subtle interactive reaction
    const mouse = { x: 0, y: 0, targetX: 0, targetY: 0 };

    const handleMouseMove = (event) => {
      const { innerWidth, innerHeight } = window;
      mouse.targetX = (event.clientX / innerWidth - 0.5) * 0.8;
      mouse.targetY = (event.clientY / innerHeight - 0.5) * 0.8;
    };

    onMounted(() => {
      if (!containerRef.value) return;

      const width = containerRef.value.clientWidth;
      const height = containerRef.value.clientHeight;

      // 1. Scene & Camera Setup
      scene = new THREE.Scene();
      camera = new THREE.PerspectiveCamera(60, width / height, 0.1, 1000);
      camera.position.z = 2.8;

      // 2. Renderer Setup
      renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
      renderer.setSize(width, height);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      containerRef.value.appendChild(renderer.domElement);

      // 3. Generate Particle Orb Geometry
      const particleCount = 1800;
      const geometry = new THREE.BufferGeometry();
      const positions = new Float32Array(particleCount * 3);
      const colors = new Float32Array(particleCount * 3);

      const colorCyan = new THREE.Color("#22d3ee");
      const colorBlue = new THREE.Color("#3b82f6");
      const colorPurple = new THREE.Color("#a855f7");

      const radius = 1.0;

      for (let i = 0; i < particleCount; i++) {
        // Distribute points evenly on a sphere using Fibonacci sphere algorithm
        const phi = Math.acos(-1 + (2 * i) / particleCount);
        const theta = Math.sqrt(particleCount * Math.PI) * phi;

        const jitter = (Math.random() - 0.5) * 0.08;
        const currentRadius = radius + jitter;

        positions[i * 3] = currentRadius * Math.cos(theta) * Math.sin(phi);
        positions[i * 3 + 1] = currentRadius * Math.sin(theta) * Math.sin(phi);
        positions[i * 3 + 2] = currentRadius * Math.cos(phi);

        // Gradient color mix based on position
        const mixRatio = (positions[i * 3 + 1] + radius) / (2 * radius);
        const particleColor = mixRatio > 0.5 
          ? colorCyan.clone().lerp(colorBlue, (mixRatio - 0.5) * 2) 
          : colorBlue.clone().lerp(colorPurple, mixRatio * 2);

        colors[i * 3] = particleColor.r;
        colors[i * 3 + 1] = particleColor.g;
        colors[i * 3 + 2] = particleColor.b;
      }

      geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
      geometry.setAttribute("color", new THREE.BufferAttribute(colors, 3));

      // 4. Particle Material
      const material = new THREE.PointsMaterial({
        size: 0.022,
        vertexColors: true,
        transparent: true,
        opacity: 0.85,
        blending: THREE.AdditiveBlending,
      });

      particleSystem = new THREE.Points(geometry, material);
      scene.add(particleSystem);

      // 5. Responsive Resize
      const handleResize = () => {
        if (!containerRef.value) return;
        const newW = containerRef.value.clientWidth;
        const newH = containerRef.value.clientHeight;
        camera.aspect = newW / newH;
        camera.updateProjectionMatrix();
        renderer.setSize(newW, newH);
      };

      window.addEventListener("resize", handleResize);
      window.addEventListener("mousemove", handleMouseMove);

      // 6. Animation Loop
      const clock = new THREE.Clock();

      const animate = () => {
        const elapsedTime = clock.getElapsedTime();

        // Smooth mouse interpolation (lerp)
        mouse.x += (mouse.targetX - mouse.x) * 0.05;
        mouse.y += (mouse.targetY - mouse.y) * 0.05;

        // Rotate particle orb
        particleSystem.rotation.y = elapsedTime * 0.15 + mouse.x * 0.8;
        particleSystem.rotation.x = elapsedTime * 0.08 + mouse.y * 0.8;

        renderer.render(scene, camera);
        animationFrameId = requestAnimationFrame(animate);
      };

      animate();

      // Store cleanup function
      containerRef.value._cleanup = () => {
        window.removeEventListener("resize", handleResize);
        window.removeEventListener("mousemove", handleMouseMove);
        cancelAnimationFrame(animationFrameId);
        geometry.dispose();
        material.dispose();
        renderer.dispose();
      };
    });

    onBeforeUnmount(() => {
      if (containerRef.value?._cleanup) {
        containerRef.value._cleanup();
      }
    });

    return () => <div ref={containerRef} class="h-full w-full" />;
  },
});