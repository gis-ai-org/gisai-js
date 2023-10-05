// This code defines a function for processing images using the 'sharp' library.
// It resizes the input image, adjusts the quality, and saves the processed image to the specified output path.


const sharp = require('sharp');
const fs = require('fs');


/**
 * processImage - A function that processes an image using the 'sharp' library.
 *
 * @param {string} inputImagePath - The file path of the original image to process.
 * @param {string} outputImagePath - The file path to save the processed image.
 * @param {number} resizeWidth - The new width to resize the image.
 * @param {number} resizeHeight - The new height to resize the image.
 * @param {number} quality - The quality of the processed image as a percentage.
 * @param {function} callback - A callback function to handle the result of the image processing.
 */


function processImage(inputImagePath, outputImagePath, resizeWidth, resizeHeight, quality, callback) {
  sharp(inputImagePath)
    .resize(resizeWidth, resizeHeight, {
      fit: 'inside',
      withoutEnlargement: true,
    })
    .jpeg({ quality: quality })
    .toFile(outputImagePath, callback);
}

module.exports = processImage;
