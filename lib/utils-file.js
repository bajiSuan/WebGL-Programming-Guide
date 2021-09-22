// utils-file.js

/**
 *
 * @param url the url of shader source file
 * @returns {Promise<string>} the string of source file
 */
async function readShaderFile(url)
{
    const response = await fetch(url)
    return await response.text()
}