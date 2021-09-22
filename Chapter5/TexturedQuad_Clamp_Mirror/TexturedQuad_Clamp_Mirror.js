// TexturedQuad_Clamp_Mirror.js

async function main()
{
    const VERTEX_SHADER = await readShaderFile('./VertexShader.vert')
    const FRAGMENT_SHADER = await readShaderFile('./FragmentShader.frag')

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
    if (n < 0)
    {
        console.log('Failed to set the vertex information.')
        return
    }

    // Specify the color for cleaning <canvas>
    gl.clearColor(0.0, 0.0, 0.0, 1.0)

    // Set texture
    if (!initTextures(gl, n))
    {
        console.log('Failed to intialize the texture.');
        return;
    }

    return
}

function initTextures(gl, n)
{
    let texture = gl.createTexture()        // Create a texture object
    if (!texture)
    {
        console.log('Failed to create the texture object');
        return false;
    }

    // Get the storage location of u_Sampler
    let u_Sampler = gl.getUniformLocation(gl.program, 'u_Sampler');
    if (!u_Sampler)
    {
        console.log('Failed to get the storage location of u_Sampler');
        return false;
    }

    let image = new Image()                 // Create an image object
    if (!image)
    {
        console.log('Failed to create the image object');
        return false;
    }

    // Register the event handler to be called on loading an image
    image.onload = function ()
    {
        loadTexture(gl, n, texture, u_Sampler, image)
    }

    // Tell the browser to load an image
    image.src = '../../resources/sky.jpg'

    return true
}

function loadTexture(gl, n, texture, u_Sampler, image)
{
    gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, 1)       // Flip the image's y axis

    // Enable the texture unit 0
    gl.activeTexture(gl.TEXTURE0)
    // Bind the texture object to the target
    gl.bindTexture(gl.TEXTURE_2D, texture);

    // Set the texture parameters
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR)
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE)
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.MIRRORED_REPEAT)

    // Set the texture image
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGB, gl.RGB, gl.UNSIGNED_BYTE, image)

    // Set the texture unit 0 to the sampler
    gl.uniform1i(u_Sampler, 0);

    gl.clear(gl.COLOR_BUFFER_BIT);   // Clear <canvas>
    gl.drawArrays(gl.TRIANGLE_STRIP, 0, n)
}

function initVertexBuffers(gl)
{
    let verticesTexCoords = new Float32Array(
        [
            -0.5, 0.5, -0.3, 1.7,
            -0.5, -0.5, -0.3, -0.2,
            0.5, 0.5, 1.7, 1.7,
            0.5, -0.5, 1.7, -0.2
        ]
    )
    let n = 4       // The number of vertices

    // Create the buffer object
    let vertexTexCoordBuffer = gl.createBuffer()
    if (!vertexTexCoordBuffer)
    {
        console.log('Failed to create the buffer object')
        return -1
    }

    // Write the vertex coords and textures coords to the object buffer
    gl.bindBuffer(gl.ARRAY_BUFFER, vertexTexCoordBuffer)
    gl.bufferData(gl.ARRAY_BUFFER, verticesTexCoords, gl.STATIC_DRAW)

    let FSIZE = verticesTexCoords.BYTES_PER_ELEMENT
    // Get the storage location of a_Position, allocate buffer, & enable
    let a_Position = gl.getAttribLocation(gl.program, 'a_Position')
    if (a_Position < 0)
    {
        console.log('Failed to get the storage location of a_Position.')
        return -1
    }
    gl.vertexAttribPointer(a_Position, 2, gl.FLOAT, false, FSIZE * 4, 0)
    gl.enableVertexAttribArray(a_Position)          // Enable buffer allocation

    // Allocate the texture coordinates to a_TexCoord, and enable it.
    let a_TexCoord = gl.getAttribLocation(gl.program, 'a_TexCoord')
    if (a_TexCoord < 0)
    {
        console.log('Failed to get the storage location of a_TexCoord')
        return -1
    }
    // Assign the buffer to a a_TexCoord variable
    gl.vertexAttribPointer(a_TexCoord, 2, gl.FLOAT, false, FSIZE * 4, FSIZE * 2)
    gl.enableVertexAttribArray(a_TexCoord)          // Enable buffer allocation

    return n
}

