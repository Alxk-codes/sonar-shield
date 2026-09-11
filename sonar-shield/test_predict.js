import { predict } from './src/utils/predict.js';
import { MINE_SAMPLE } from './src/data/sampleData.js';

const result = predict(MINE_SAMPLE);
console.log('Mine Sample Prediction:', result);
