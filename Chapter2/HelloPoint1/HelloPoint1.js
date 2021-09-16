// HelloPoint1.js 


const VERTEX_SHADER = 
`
void main()
{
    // Coordinates
    gl_Position = vec4(0.0, 0.0, 0.0, 1.0);
    
    // Set the point size
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

    // Initialize Shaders
    if (!initShaders(gl, VERTEX_SHADER, FRAGMENT_SHADER))
    {
        console.log('Failed to initialize shaders.')
        return
    }

    gl.clearColor(0.0, 0.0, 0.0, 1.0)
    gl.clear(gl.COLOR_BUFFER_BIT)

    // Draw a point
    gl.drawArrays(gl.POINT, 0, 1)
}