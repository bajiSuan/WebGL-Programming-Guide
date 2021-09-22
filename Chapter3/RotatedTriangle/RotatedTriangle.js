// RotatedTriangle.js

// x' = x cos b - y sin b
// y' = x sin b + y cos b
// z' = z
const VERTEX_SHADER =
    `
attribute vec4 a_Position;
uniform float u_CosB, u_SinB;

void main()
{
    gl_Position.x = a_Position.x * u_CosB - a_Position.y * u_SinB;
    gl_Position.y = a_Position.x * u_SinB + a_Position.y * u_CosB;
    gl_Position.z = a_Position.z;
    gl_Position.w = 1.0;
}

`

const FRAGMENT_SHADER =
    `
void main()
{
    gl_FragColor = vec4(1.0, 0.0, 0.0, 1.0);
}
`

const ANGLE = 90.0

function main()
{
    let canvas = document.getElementById('webgl')

    let gl = getWebGLContext(canvas)
    if (!gl)
    {
        console.log('Failed to get the rendering context for WebGL.')
        return
    }

    if (!initShaders(gl, VERTEX_SHADER, FRAGMENT_SHADER))
    {
        console.log('Failed to initialize shaders.')
        return
    }

    // Set positions of vertices
    let n = initVertexBuffers(gl)
    if (n < 0)
    {
        console.log('Failed to set the positions of the vertices')
        return
    }

    // Pass the data required to rotate the shape to the vertex shader
    let radian = Math.PI * ANGLE / 180.0    // Convert to radians
    let cosB = Math.cos(radian)
    let sinB = Math.sin(radian)

    let u_CosB = gl.getUniformLocation(gl.program, 'u_CosB')
    if (u_CosB < 0)
    {
        console.log('Failed to get the storage location of u_CosB.')
        return
    }
    let u_SinB = gl.getUniformLocation(gl.program, 'u_SinB')
    if (u_SinB < 0)
    {
        console.log('Failed to get the storage location of u_SinB.')
        return
    }
    gl.uniform1f(u_CosB, cosB)
    gl.uniform1f(u_SinB, sinB)

    // Set the color for clearning <canvas>
    gl.clearColor(0.0, 0.0, 0.0, 1.0)
    gl.clear(gl.COLOR_BUFFER_BIT)

    // Draw a triangle
    gl.drawArrays(gl.TRIANGLES, 0, n)


}

function initVertexBuffers(gl)
{
    let vertices = new Float32Array
    (
        [
            0.0, 0.5,
            -0.5, -0.5,
            0.5, -0.5
        ]
    )
    let n = 3

    // Create a buffer object
    let vertexBuffer = gl.createBuffer()
    if (!vertexBuffer)
    {
        console.log('Failed to create the buffer object')
        return -1
    }

    // Bind the buffer object to target
    gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer)

    // Write data into the buffer object
    gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW)

    let a_Position = gl.getAttribLocation(gl.program, 'a_Position')

    // Assign the buffer object to a_Position variable
    gl.vertexAttribPointer(a_Position, 2, gl.FLOAT, false, 0, 0)

    // Enable the assignment to a_Position variable
    gl.enableVertexAttribArray(a_Position)

    return n
}
