"use client";

import React, { useEffect, useRef } from "react";

const WaveBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const gl = canvas.getContext("webgl");
    if (!gl) {
      alert("WebGL is not supported in your browser.");
      return;
    }

    const vsSource = `
      attribute vec2 a_position;
      void main() {
        gl_Position = vec4(a_position, 0.0, 1.0);
      }
    `;

    const fsSource = `
      precision mediump float;
      uniform float u_time;
      uniform vec2 u_resolution;
      #define NUM_LINES 16

      void main() {
        // Normalize coordinates: uv ranges from 0.0 to 1.0
        vec2 uv = gl_FragCoord.xy / u_resolution;
        uv.x *= u_resolution.x / u_resolution.y;
        // Use the sum of uv components for a diagonal coordinate (roughly 0 to 2)
        float d = uv.x + uv.y;
        
        // Set up a looping phase (period T seconds)
        float T = 5.0;
        float t = mod(u_time, T);
        float phase = t / T * 6.2831853; // maps to 0..2π

        // Compute a diagonal drift that oscillates (moves from 0 to ~0.2 and back)
        float diag = 0.1 * (1.0 - cos(phase));
        
        float mask = 0.0;
        // Spacing between base positions for each line along the diagonal.
        float spacing = 0.3;
        for (int i = 0; i < NUM_LINES; i++) {
          float fi = float(i);
          // Base position along the diagonal plus the oscillatory diagonal drift.
          float base = fi * spacing + diag;
          // Offset the base with a sinusoidal function to vary the sequence.
          float offset = 0.05 * sin(phase + fi * 1.3);
          // Add a horizontal wave perturbation for extra variation.
          float wave = 0.03 * sin(uv.x * 10.0 + phase + fi * 2.0);
          float linePos = base + offset + wave;
          
          // Vary the thickness so that sometimes lines merge.
          // The thickness oscillates between 0.01 and 0.03.
          float mergeFactor = 0.5 + 0.5 * sin(phase * 2.0 + fi * 2.0);
          float thickness = 0.01 + 0.02 * mergeFactor;
          
          // Compute distance from the current pixel (diagonally) to this line.
          float diff = abs(d - linePos);
          float lineMask = 1.0 - step(thickness, diff);
          mask = max(mask, lineMask);
        }
        vec3 base = vec3(0.964705882, 0.5647058823529412, 0.43137254901960786);
        vec3 line = vec3(0.964705882, 0.803921568627451, 0.7333333333333333);
        vec3 color = mix(base, line, mask);
        color *= 1.1;

        gl_FragColor = vec4(color, 1.0);
      }
    `;

    // Utility function to compile shaders
    function compileShader(
      gl: WebGLRenderingContext,
      source: string,
      type: number,
    ) {
      const shader = gl.createShader(type);
      if (!shader) {
        console.error("Shader creation error");
        return null;
      }
      gl.shaderSource(shader, source);
      gl.compileShader(shader);
      if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        console.error("Shader compile error:", gl.getShaderInfoLog(shader));
        gl.deleteShader(shader);
        return null;
      }
      return shader;
    }

    const vertexShader = compileShader(gl, vsSource, gl.VERTEX_SHADER);
    const fragmentShader = compileShader(gl, fsSource, gl.FRAGMENT_SHADER);

    // Create and link the shader program
    const program = gl.createProgram();
    if (vertexShader && fragmentShader) {
      gl.attachShader(program, vertexShader);
      gl.attachShader(program, fragmentShader);
    }
    gl.linkProgram(program);
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      console.error("Program link error:", gl.getProgramInfoLog(program));
    }
    gl.useProgram(program);

    // Define vertices for a full-screen quad (two triangles)
    const vertices = new Float32Array([
      -1, -1, 1, -1, -1, 1, -1, 1, 1, -1, 1, 1,
    ]);
    const positionBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);

    const positionLocation = gl.getAttribLocation(program, "a_position");
    gl.enableVertexAttribArray(positionLocation);
    gl.vertexAttribPointer(positionLocation, 2, gl.FLOAT, false, 0, 0);

    // Get uniform locations for time and resolution
    const timeLocation = gl.getUniformLocation(program, "u_time");
    const resolutionLocation = gl.getUniformLocation(program, "u_resolution");
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    gl.viewport(0, 0, canvas.width, canvas.height);
    gl.uniform2f(resolutionLocation, canvas.width, canvas.height);

    let startTime = Date.now();

    // Render loop: updates the time uniform so the shader animation loops indefinitely.
    function render() {
      let currentTime = Date.now();
      let time = (currentTime - startTime) / 10000.0;
      if (gl) {
        gl.uniform1f(timeLocation, time);
        gl.drawArrays(gl.TRIANGLES, 0, 6);
      }
      requestAnimationFrame(render);
    }
    render();

    // Update canvas size and viewport on window resize.
    window.addEventListener("resize", () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      gl.viewport(0, 0, canvas.width, canvas.height);
      gl.uniform2f(resolutionLocation, canvas.width, canvas.height);
    });
  }, []);
  return <canvas ref={canvasRef} className="h-full w-full"></canvas>;
};

export default WaveBackground;
