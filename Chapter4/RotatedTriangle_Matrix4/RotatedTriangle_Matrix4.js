// RotatedTriangle_Matrix4.js

const VERTEX_SHADER =
    `
attribute vec4 a_Position;
uniform mat4 u_xformMatrix;

void main()
{
    gl_Position = u_xformMatrix * a_Position; 
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

    let ANGLE = 90.0
    // Create Matrix4 object for a rotation matrix
    let xformMatrix = new Matrix4()
    // Set the rotation matrix to xformMatrix
    xformMatrix.setRotate(ANGLE, 0, 0, 1)

    // Pass the rotation matrix to the vertex shader
    let u_xformMatrix = gl.getUniformLocation(gl.program, 'u_xformMatrix')
    if (u_xformMatrix < 0)
    {
        console.log('Failed to get the storage location of u_xformMatrix.')
        return
    }

    gl.uniformMatrix4fv(u_xformMatrix, false, xformMatrix.elements)

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
    if (a_Position < 0)
    {
        console.log('Failed to get the storage location of a_Position.')
        return -1
    }

    // Assign the buffer object to a_Position variable
    gl.vertexAttribPointer(a_Position, 2, gl.FLOAT, false, 0, 0)

    // Enable the assignment to a_Position variable
    gl.enableVertexAttribArray(a_Position)

    return n
}
