// ColoredTriangle.js

const VERTEX_SHADER =
    `
attribute vec4 a_Position;
attribute vec4 a_Color;
varying vec4 v_Color;
void main()
{
    gl_Position = a_Position;
    gl_PointSize = 10.0;
    v_Color = a_Color;
}
`

const FRAGMENT_SHADER =
    `
precision mediump float;
varying vec4 v_Color;
void main()
{ 
    gl_FragColor = v_Color;
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

    gl.drawArrays(gl.TRIANGLES, 0, n)
}

function initVertexBuffers(gl)
{
    let n = 3
    let verticesColors = new Float32Array
    (
        [
            0.0, 0.5, 1.0, 0.0, 0.0,
            -0.5, -0.5, 0.0, 1.0, 0.0,
            0.5, -0.5, 0.0, 0.0, 1.0
        ]
    )

    // Create a buffer object
    let vertexColorBuffer = gl.createBuffer()
    if (!vertexColorBuffer)
    {
        console.log('Failed to create the buffer object')
        return -1
    }

    // Write vertex coordinates and point sizes to the buffer object and enable it
    gl.bindBuffer(gl.ARRAY_BUFFER, vertexColorBuffer)
    gl.bufferData(gl.ARRAY_BUFFER, verticesColors, gl.STATIC_DRAW)

    let FSIZE = verticesColors.BYTES_PER_ELEMENT;
    // Get the storage location of a_Position, allocate buffer, & enable
    let a_Position = gl.getAttribLocation(gl.program, 'a_Position')
    if (a_Position < 0)
    {
        console.log('Failed to get the storage location of a_Position.')
        return -1
    }
    gl.vertexAttribPointer(a_Position, 2, gl.FLOAT, false, FSIZE * 5, 0)
    gl.enableVertexAttribArray(a_Position)

    // Get the storage location of a_Color, allocate buffer, & enable
    let a_Color = gl.getAttribLocation(gl.program, 'a_Color')
    if (a_Color < 0)
    {
        console.log('Failed to get the storage location of a_Color.')
        return -1
    }
    gl.vertexAttribPointer(a_Color, 3, gl.FLOAT, false, FSIZE * 5, FSIZE * 2)
    gl.enableVertexAttribArray(a_Color)

    return n;
}
