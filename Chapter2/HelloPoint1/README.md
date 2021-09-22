### About initShader()

> The third step “Initialize Shaders” initializes and sets up the shaders within the WebGL system. This step is done using the convenience function initShaders() that is defined in cuon-util.js . Again, this is one of those special functions we have provided for this book.

---
**initShaders(gl, vshader, fshader)**

Initialize shaders and set them up in the WebGL system ready for use:

- Parameters
    - gl: Specifies a rendering context.
    - vshader: Specifies a vertex shader program (string).
    - fshader: Specifies a fragment shader program (string).
- Return value
    - true: Shaders successfully initialized.
    - false: Failed to initialize shaders.