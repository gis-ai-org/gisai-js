/**
 * performObjectDetection - A function that performs object detection on an image using TensorFlow.js and COCO-SSD.
 *
 * @param {string} imageUrl - The URL of the image to perform object detection on.
 * @param {number} confidenceThreshold - The confidence threshold for filtering the detection results (default: 0.2).
 * @returns {Promise<Array>} A promise that resolves to an array of filtered detection predictions.
 */



const tf = require('@tensorflow/tfjs');
const cocossd = require('@tensorflow-models/coco-ssd');
const fetch = require('node-fetch');
const { createCanvas, loadImage } = require('canvas');

async function performObjectDetection(imageUrl, confidenceThreshold = 0.2) {
  // Load object detection model.
  const model = await cocossd.load();

  // Fetch the image data from the provided URL.
  const response = await fetch(imageUrl);

  const buffer = await response.buffer();

  // Load the image.
  const image = await loadImage(buffer);
  const canvas = createCanvas(image.width, image.height);
  const context = canvas.getContext('2d');
  context.drawImage(image, 0, 0);

  // Convert image to a TensorFlow tensor.
  const imageTensor = tf.browser.fromPixels(canvas);
  console.log(imageTensor);

  // Perform object detection on the image using the loaded model.
  const predictions = await model.detect(imageTensor);

  // Filter predictions based on confidence
  const filteredPredictions = predictions.filter((prediction) => {
    return prediction.score >= confidenceThreshold;
  });

  return filteredPredictions;
}

module.exports = performObjectDetection;
