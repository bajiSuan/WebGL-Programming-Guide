// RotatingTriangle.js

const VERTEX_SHADER = 
`
attribute vec4 a_Position;
uniform mat4 u_ModelMatrix;
void main()
{
    gl_Position = u_ModelMatrix * a_Position;    
}

`

const FRAGMENT_SHADER =
`
void main()
{
    gl_FragColor = vec4(1.0, 0.0, 0.0, 1.0);
}
`

const ANGLE_STEP = 45.0

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

    // Set the color for clearning <canvas>
    gl.clearColor(0.0, 0.0, 0.0, 1.0)

    // Pass the model matrix to the vertex shader
    let u_ModelMatrix = gl.getUniformLocation(gl.program, 'u_ModelMatrix')
    if (u_ModelMatrix < 0)
    {
        console.log('Failed to get the storage location of u_ModelMatrix.')
        return
    }

    // Current rotation angle of a triangle
    let currentAngle = 0.0

    // Matrix4 object for model transformation
    let modelMatrix = new Matrix4()

    // Start to draw a triangle
    let tick = function ()
    {
        currentAngle = animate(currentAngle)    // Update the rotation angle
        draw(gl, n, currentAngle, modelMatrix, u_ModelMatrix)

        // Request that the browser calls tick
        requestAnimationFrame(tick)
    }

    tick()
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

function draw(gl, n, currentAngle, modelMatrix, u_ModelMatrix)
{
    // Set up rotation matrix
    modelMatrix.setRotate(currentAngle, 0, 0, 1);

    // Pass the rotation matrix to the vertex shader
    gl.uniformMatrix4fv(u_ModelMatrix, false, modelMatrix.elements)

    // Clear <canvas>
    gl.clear(gl.COLOR_BUFFER_BIT)

    // Draw a triangle
    gl.drawArrays(gl.TRIANGLES, 0, n)
}

// Last time when this function was called
let g_last = Date.now()
function animate(angle)
{
    // Calculate the elapsed time
    // 计算距离上次调用经过的时间
    let now = Date.now()
    let elapsed = now - g_last
    g_last = now
    let newAngle = (angle + (ANGLE_STEP * elapsed / 1000.0)) % 360
    return newAngle
}