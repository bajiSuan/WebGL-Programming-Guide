// ClickedPoints.js

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

    // get the storage location of attribute variable
    let a_Position = gl.getAttribLocation(gl.program, 'a_Position')
    if (a_Position < 0)
    {
        console.log('Failed to get the storage location of a_Position.')
        return
    }

    // Register function (event, handler) to be called on a mouse press
    canvas.onmousedown = 
    function(ev)
    {
        click(ev, gl, canvas, a_Position)
    }
    
    gl.clearColor(0.0, 0.0, 0.0, 1.0)
    gl.clear(gl.COLOR_BUFFER_BIT)
}

let g_points = []
function click(ev, gl, canvas, a_Position)
{
    let x = ev.clientX      // x coordinate of a mouse pointer
    let y = ev.clientY      // y coordinate of a mouse pointer

    // get the position of the <canvas> in the client area
    let rect = ev.target.getBoundingClientRect()

    // The rect.left and rec.top indicate the position of the origin of the <canvas> in the browser’s client area.
    x = ((x - rect.left) - canvas.width/2) / (canvas.width/2)
    y = (canvas.height/2 - (y - rect.top)) / (canvas.height/2)
    g_points.push(x)
    g_points.push(y)
    
    gl.clear(gl.COLOR_BUFFER_BIT)
    
    let len = g_points.length
    for (let i = 0;  i < len; i+=2) 
    {
        gl.vertexAttrib3f(a_Position, g_points[i], g_points[i+1], 0.0)
        gl.drawArrays(gl.POINTS, 0, 1)
    }

}