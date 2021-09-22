// MultiAttributeSize.js

const VERTEX_SHADER =
    `
attribute vec4 a_Position;
attribute float a_PointSize;
void main()
{
    gl_Position = a_Position;
    gl_PointSize = a_PointSize;
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

    // Set the vertex information
    let n = initVertexBuffers(gl);

    gl.clearColor(0.0, 0.0, 0.0, 1.0)
    gl.clear(gl.COLOR_BUFFER_BIT)

    gl.drawArrays(gl.POINTS, 0, n)
}

function initVertexBuffers(gl)
{
    let n = 3
    let vertices = new Float32Array
    (
        [
            0.0, 0.5,
            -0.5, -0.5,
            0.5, -0.5
        ]
    )

    let sizes = new Float32Array
    (
        [
            10.0, 20.0, 30.0    // Point sizes
        ]
    )

    // Create a buffer object
    let vertexBuffer = gl.createBuffer()
    if (!vertexBuffer)
    {
        console.log('Failed to create the buffer object of vertexBuffer')
        return -1
    }
    let a_Position = gl.getAttribLocation(gl.program, 'a_Position')
    if (a_Position < 0)
    {
        console.log('Failed to get the storage location of a_Position.')
        return -1
    }

    // Write vertex coordinates to the buffer object and enable it
    gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer)
    gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW)
    gl.vertexAttribPointer(a_Position, 2, gl.FLOAT, false, 0, 0)
    gl.enableVertexAttribArray(a_Position)


    let sizeBuffer = gl.createBuffer()
    if (!sizeBuffer)
    {
        console.log('Failed to create the buffer object of sizeBuffer')
        return -1
    }
    let a_PointSize = gl.getAttribLocation(gl.program, 'a_PointSize')
    if (a_PointSize < 0)
    {
        console.log('Failed to get the storage location of a_PointSize.')
        return -1
    }

    gl.bindBuffer(gl.ARRAY_BUFFER, sizeBuffer)
    gl.bufferData(gl.ARRAY_BUFFER, sizes, gl.STATIC_DRAW)
    gl.vertexAttribPointer(a_PointSize, 1, gl.FLOAT, false, 0, 0)
    gl.enableVertexAttribArray(a_PointSize)

    return n;
}