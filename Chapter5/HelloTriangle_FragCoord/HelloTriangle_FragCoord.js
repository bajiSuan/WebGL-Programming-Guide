// HelloTriangle_FragCoord.js

const VERTEX_SHADER =
    `
attribute vec4 a_Position;
void main()
{
    gl_Position = a_Position;
    gl_PointSize = 10.0;
}
`

const FRAGMENT_SHADER =
    `
precision mediump float;
uniform float u_Width;
uniform float u_Height;
void main()
{ 
    gl_FragColor = vec4(gl_FragCoord.x/u_Width, 0.0, gl_FragCoord.y/u_Height, 1.0);
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
            0.0, 0.5,
            -0.5, -0.5,
            0.5, -0.5
        ]
    )

    // Create a buffer object
    let vertexBuffer = gl.createBuffer()
    if (!vertexBuffer)
    {
        console.log('Failed to create the buffer object')
        return -1
    }

    // Write vertex coordinates and point sizes to the buffer object and enable it
    gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer)
    gl.bufferData(gl.ARRAY_BUFFER, verticesColors, gl.STATIC_DRAW)

    // Get the storage location of a_Position, allocate buffer, & enable
    let a_Position = gl.getAttribLocation(gl.program, 'a_Position')
    if (a_Position < 0)
    {
        console.log('Failed to get the storage location of a_Position.')
        return -1
    }
    gl.vertexAttribPointer(a_Position, 2, gl.FLOAT, false, 0, 0)

    let u_Width = gl.getUniformLocation(gl.program, 'u_Width');
    if (!u_Width)
    {
        console.log('Failed to get the storage location of u_Width');
        return;
    }

    let u_Height = gl.getUniformLocation(gl.program, 'u_Height');
    if (!u_Height)
    {
        console.log('Failed to get the storage location of u_Height');
        return;
    }

    // Pass the width and hight of the <canvas>
    gl.uniform1f(u_Width, gl.drawingBufferWidth);
    gl.uniform1f(u_Height, gl.drawingBufferHeight);

    // Enable the generic vertex attribute array
    gl.enableVertexAttribArray(a_Position)

    // Unbind the buffer object
    gl.bindBuffer(gl.ARRAY_BUFFER, null);

    return n;
}
