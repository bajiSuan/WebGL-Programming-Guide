// DrawRectangle.js
function main()
{
    // Retrieve <canvas> element
    // 获取（取回）<canvas>元素
    let canvas = document.getElementById('example')
    if (!canvas)
    {
        console.log('Failed to retrieve the <canvas> element')
    }

    // Get the rendering context for 2DCG
    // 获取渲染（绘制）二维图形的绘图上下文
    let context = canvas.getContext('2d')

    // Draw a blue rectangle
    // 绘制蓝色矩形
    context.fillStyle = 'rgba(0, 0, 255, 1.0)'  // Set a blue color
    context.fillRect(120, 10, 150, 150)         // Fill a rectangle with the color  
}