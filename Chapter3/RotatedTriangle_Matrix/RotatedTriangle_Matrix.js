// RotatedTriangle_Matrix.js

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

// Translation
let Tx = 0.5
let Ty = 0.5
let Tz = 0

// Rotation
let ANGLE = 90.0

// Scaling
let Sx = 1.0
let Sy = 1.5
let Sz = 1.0

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

    // Create a rotation matrix
    let radian = Math.PI * ANGLE / 180.0    // Convert to radians
    let cosB = Math.cos(radian)
    let sinB = Math.sin(radian)


    // Note: WebGL is colume major order
    // Float32Array的矩阵是列主序的

    // Rotation Matrix
    // | cos b  -sin b | x  
    // | sin b   cos b | y
    let xformMatrix = new Float32Array
    (
        [
            cosB, sinB, 0.0, 0.0,
            -sinB, cosB, 0.0, 0.0,
            0.0, 0.0, 1.0, 0.0,
            0.0, 0.0, 0.0, 1.0
        ]
    )

    // // Translation Matrix
    // let xformMatrix = new Float32Array
    // (
    //     [
    //         1.0, 0.0, 0.0, 0.0,
    //         0.0, 1.0, 0, 0.0,
    //         0.0, 0.0, 1.0, 0.0,
    //         Tx, Ty, Tz, 1.0
    //     ]
    // )

    // // Scaling Matrix
    // let xformMatrix = new Float32Array
    // (
    //     [
    //         Sx, 0.0, 0.0, 0.0,
    //         0.0, Sy, 0, 0.0,
    //         0.0, 0.0, Sz, 0.0,
    //         0.0, 0.0, 0.0, 1.0
    //     ]
    // )

    let u_xformMatrix = gl.getUniformLocation(gl.program, 'u_xformMatrix')
    if (u_xformMatrix < 0)
    {
        console.log('Failed to get the storage location of u_xformMatrix.')
        return
    }

    gl.uniformMatrix4fv(u_xformMatrix, false, xformMatrix)

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
