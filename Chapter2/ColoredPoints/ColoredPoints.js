// ColoredPoints.js

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
uniform vec4 u_FragColor;

void main()
{
    gl_FragColor = u_FragColor;
}
`


function main()
{
    let canvas = document.getElementById('webgl')

    let gl = getWebGLContext(canvas)
    if (!gl)
    {
        console.log('Failed to get the rendering context of WebGL')
        return
    }

    if (!initShaders(gl, VERTEX_SHADER, FRAGMENT_SHADER))
    {
        console.log('Failed to initialize shaders.')
        return
    }

    let a_Position = gl.getAttribLocation(gl.program, 'a_Position')
    if (a_Position < 0)
    {
        console.log('Failed to get the storage location of a_Position.')
        return
    }
    let u_FragColor = gl.getUniformLocation(gl.program, 'u_FragColor')
    if (u_FragColor <0)
    {
        console.log('Failed to get the storage location of u_Fragment.')
        return
    }

    canvas.onmousedown =
    function(ev)
    {
        click(ev, gl, canvas, a_Position, u_FragColor)
    }

    gl.clearColor(0.0, 0.0, 0.0, 1.0)
    gl.clear(gl.COLOR_BUFFER_BIT)
}


let g_points = []
let g_colors = []
function click(ev, gl, canvas, a_Position, u_FragColor)
{
    let x = ev.clientX
    let y = ev.clientY

    let rect = ev.target.getBoundingClientRect()

    x = ((x - rect.left) - canvas.width/2) / (canvas.width/2)
    y = (canvas.height/2 - (y - rect.top)) / (canvas.height/2)

    g_points.push([x, y])
    if (x >= 0.0 && y >= 0.0)
    {
        g_colors.push([1.0, 0.0, 0.0, 1.0])
    }
    else if (x < 0.0 && y < 0.0)
    {
        g_colors.push([0.0, 1.0, 0.0, 1.0])
    }
    else
    {
        g_colors.push([1.0, 1.0, 1.0, 1.0])
    }

    gl.clear(gl.COLOR_BUFFER_BIT)

    let len = g_points.length
    for (let i = 0; i < len; ++i)
    {
        gl.vertexAttrib3f(a_Position, g_points[i][0], g_points[i][1], 0.0)
        gl.uniform4fv(u_FragColor, g_colors[i])
        gl.drawArrays(gl.POINTS, 0, 1)
    }
}