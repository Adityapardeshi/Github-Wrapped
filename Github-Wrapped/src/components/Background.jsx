import { useEffect, useRef } from 'react'

export function Background() {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const syncSize = () => {
      const width = canvas.clientWidth || window.innerWidth
      const height = canvas.clientHeight || window.innerHeight

      if (canvas.width !== width || canvas.height !== height) {
        canvas.width = width
        canvas.height = height
      }
    }

    const resizeObserver = typeof ResizeObserver !== 'undefined'
      ? new ResizeObserver(syncSize)
      : null

    if (resizeObserver) {
      resizeObserver.observe(canvas)
    }
    syncSize()

    const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl')
    if (!gl) return

    const vertexShaderSource = `
      attribute vec2 a_position;
      varying vec2 v_texCoord;
      void main() {
        v_texCoord = a_position * 0.5 + 0.5;
        gl_Position = vec4(a_position, 0.0, 1.0);
      }
    `

    const fragmentShaderSource = `
      precision highp float;
      varying vec2 v_texCoord;
      uniform float u_time;

      void main() {
        vec2 uv = v_texCoord;

        vec3 color1 = vec3(0.878, 0.251, 0.627);
        vec3 color2 = vec3(0.4, 0.1, 0.5);
        vec3 color3 = vec3(0.9, 0.3, 0.7);

        float noise = sin(uv.x * 5.0 + u_time * 0.5) * cos(uv.y * 3.0 - u_time * 0.7);
        noise += sin(uv.y * 8.0 + u_time * 0.8) * cos(uv.x * 4.0 - u_time * 0.3);

        vec3 color = mix(color1, color2, uv.y + noise * 0.2);
        color = mix(color, color3, uv.x * 0.5 + noise * 0.1);

        gl_FragColor = vec4(color, 1.0);
      }
    `

    function compileShader(type, source) {
      const shader = gl.createShader(type)
      gl.shaderSource(shader, source)
      gl.compileShader(shader)
      return shader
    }

    const program = gl.createProgram()
    gl.attachShader(program, compileShader(gl.VERTEX_SHADER, vertexShaderSource))
    gl.attachShader(program, compileShader(gl.FRAGMENT_SHADER, fragmentShaderSource))
    gl.linkProgram(program)
    gl.useProgram(program)

    const buffer = gl.createBuffer()
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer)
    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]),
      gl.STATIC_DRAW,
    )

    const positionAttribute = gl.getAttribLocation(program, 'a_position')
    gl.enableVertexAttribArray(positionAttribute)
    gl.vertexAttribPointer(positionAttribute, 2, gl.FLOAT, false, 0, 0)

    const uTime = gl.getUniformLocation(program, 'u_time')

    let animationId

    function render(time) {
      syncSize()
      gl.viewport(0, 0, canvas.width, canvas.height)
      gl.uniform1f(uTime, time * 0.001)
      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4)
      animationId = requestAnimationFrame(render)
    }

    animationId = requestAnimationFrame(render)

    return () => {
      if (resizeObserver) resizeObserver.disconnect()
      cancelAnimationFrame(animationId)
    }
  }, [])

  return <canvas ref={canvasRef} className="fixed inset-0 h-full w-full block" />
}
