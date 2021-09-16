// HelloCanvas.js 
function main() 
{
    // Retrieve <canvas> element
    let canvas = document.getElementById('webgl')
    
    // Get the rendering context for WebGL
    let gl = getWebGLContext(canvas)

    if (!gl)
    {
        console.log('Failed to get the rendering context for WebGL')
        return
    }

    // Specify the color for clearing <canvas>
    // 指定用来清空<canvas>的颜色
    gl.clearColor(0.0, 0.0, 0.0, 1.0)

    // Clear <canvas>
    gl.clear(gl.COLOR_BUFFER_BIT)
}