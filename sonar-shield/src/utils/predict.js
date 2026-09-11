import { MODEL_PARAMS } from '../data/modelParams';

/**
 * Sigmoid activation function
 */
function sigmoid(z) {
  return 1 / (1 + Math.exp(-z));
}

/**
 * Predict using trained Logistic Regression coefficients.
 *
 * sklearn classes_ = ['M', 'R']:
 *   decision_function = dot(coef, x) + intercept
 *   P('R') = sigmoid(decision_function)   [class[1] = 'R']
 *   P('M') = 1 - P('R')
 *
 * @param {number[]} features - 60 numerical values
 * @returns {{ prediction: 'R'|'M', probRock: number, probMine: number }}
 */
export function predict(features) {
  if (features.length !== 60) {
    throw new Error('Expected 60 features, got ' + features.length);
  }
  const { coef, intercept } = MODEL_PARAMS;
  let z = intercept;
  for (let i = 0; i < 60; i++) {
    z += coef[i] * features[i];
  }
  const probRock = sigmoid(z);
  const probMine = 1 - probRock;
  return {
    prediction: probRock >= 0.5 ? 'R' : 'M',
    probRock: Math.round(probRock * 10000) / 100,
    probMine: Math.round(probMine * 10000) / 100,
  };
}
