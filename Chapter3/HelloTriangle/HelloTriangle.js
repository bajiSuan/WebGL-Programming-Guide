// HelloTriangle.js

const VERTEX_SHADER =
    `
attribute vec4 a_Position;
void main()
{
    gl_Position = a_Position;
}
`

const FRAGMENT_SHADER =
    `
void main()
{
    gl_FragColor = vec4(1.0, 0.0, 0.0, 1.0);
}
`

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

    gl.clearColor(0.0, 0.0, 0.0, 1.0)
    gl.clear(gl.COLOR_BUFFER_BIT)

    // Draw a triangle
    gl.drawArrays(gl.TRIANGLES, 0, n)

    // Experimenting
    // gl.drawArrays(gl.LINES, 0, 3)
    // gl.drawArrays(gl.LINE_STRIP, 0, n)
    // gl.drawArrays(gl.LINE_LOOP, 0, n)

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
