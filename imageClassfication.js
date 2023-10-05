const gdal = require('gdal-async');
const tf = require('@tensorflow/tfjs');
const mobilenet = require('@tensorflow-models/mobilenet');
const { error } = require('npmlog');
const { async } = require('regenerator-runtime');


/**
 * readImageData - A function that reads image data from a file using the 'gdal-async' library.
 *
 * @param {string} filePath - The file path of the original image to read.
 * @returns {Promise<Array>} A promise that resolves to an array containing the width, height, and data of the image.
 */

exports.readImageData = async function (filePath) {
    try {
        dataset = await gdal.openAsync(filePath, 'r');

        try {
            const band = dataset.bands.get(1);
            const width = band.size.x;
            const height = band.size.y;
            const data = new Uint8Array(width * height * 3);

            return [width, height, data];

        } catch (error) {
            console.error('An error occurred:', error.message);
        }

    } catch (error) {
        console.error('An error occurred reading the file:', error.message);
    }
}

/**
 * imageTensor - A function that converts image data into a TensorFlow tensor.
 *
 * @param {string} filePath - The file path of the original image.
 * @returns {Promise<Tensor>} A promise that resolves to a TensorFlow tensor representing the image.
 */
exports.imageTensor = async function (filePath) {
    try {
        const [width, height, data] = await exports.readImageData(filePath);

        return tf.tensor3d(data, [height, width, 3]);

    } catch (error) {
        console.error('An error occurred:', error.message);
    }
}

/**
 * imageClassification - A function that performs image classification using the MobileNet model.
 *
 * @param {string} filePath - The file path of the original image to classify.
 */
exports.imageClassification = async function (filePath) {
    const model = await mobilenet.load();
    predictions = await model.classify(await exports.imageTensor(filePath));
    console.log(predictions);
}
