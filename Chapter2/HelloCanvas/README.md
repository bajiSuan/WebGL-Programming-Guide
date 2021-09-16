### About getWebGLContext()

> Normally, we would use canvas.getContext() as described earlier to get the rendering context for WebGL. However, because the argument specified in canvas.getContext() varies between browsers,*  we have written a special function getWebGLContext() **to hide the differences between the browsers**:
>
> ```javascript
> var gl = getWebGLContext(canvas);
> ```
>
> This is one of the convenience functions mentioned earlier that was written specially for this book and is defined in [coun-util.js](https://github.com/bajiSuan/WebGL-Programming-Guide/blob/main/lib/cuon-utils.js) .
>
> 
> *Although most browsers are settling on “experimental-webgl” for this argument, not all do.
> Additionally, over time, this will evolve to plain ‘webgl,’ so we have chosen to hide this.
