// HelloPoint2.js

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
void main()
{
    gl_FragColor = vec4(1.0, 1.0, 1.0, 1.0);
}
`

function main()
{
    let canvas = document.getElementById('webgl')

    let gl = getWebGLContext(canvas)
    if (!gl)
    {
        console.log('Failed to get the rendering context for WebGL')
        return
    }

    if (!initShaders(gl, VERTEX_SHADER, FRAGMENT_SHADER))
    {
        console.log('Failed to initialize shaders.')
        return
    }

    // get the storage location of attribute variable
    let a_Position = gl.getAttribLocation(gl.program, 'a_Position')
    if (a_Position < 0)
    {
        console.log('Failed to get the storage location of a_Position.')
        return
    }

    // Pass vertex position to attribute variable
    gl.vertexAttrib3f(a_Position, 0.0, 0.0, 0.0)
    
    gl.clearColor(0.0, 0.0, 0.0, 1.0)
    gl.clear(gl.COLOR_BUFFER_BIT)

    gl.drawArrays(gl.POINTS, 0, 1)
}