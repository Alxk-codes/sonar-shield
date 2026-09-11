# 🌊 SONAR SHIELD

**AI-Powered Rock vs Mine Detection**

Sonar Shield is a premium, frontend-only React application that demonstrates a machine learning model trained to differentiate between rocks and metal cylinders (mines) using sonar signals. 

This project takes a trained **Logistic Regression** model from a Python/Jupyter notebook (`scikit-learn`) and fully embeds its prediction logic directly into the browser using pure JavaScript. **No backend, API keys, or cloud servers are required.**

---

## ✨ Features

* **Interactive Detection Interface**: A sleek 60-feature input grid to manually tweak sonar frequency bands.
* **Quick Paste Input**: Instantly load new test cases by pasting comma-separated rows directly from the dataset.
* **100% Local Inference**: The model's weights (`coef_`) and bias (`intercept_`) are hardcoded. Predictions are calculated instantly in the browser using the Sigmoid function.
* **Model Insights Dashboard**: Dive into the real validation metrics extracted from the notebook, including 5-Fold Cross Validation scores, a Confusion Matrix, and Mean Signal Energy distributions.
* **Premium UI/UX**: Built with a dark navy ocean theme, glassmorphism components, and custom CSS keyframe animations (including a scanning radar, ocean waves, and cruising ships).

## 🧠 How the ML Works

The model was trained on the **UCI Sonar Dataset** (208 samples, 60 features).
1. The original Python notebook used `train_test_split` (stratified) and `LogisticRegression` from `sklearn`.
2. We extracted the exact `coef_` array (60 weights) and the `intercept_`.
3. In `src/utils/predict.js`, the app takes the 60 user inputs, computes the dot product with the weights, adds the intercept, and passes it through a Sigmoid activation function to get a Rock/Mine probability.

## 🚀 How to Run the Project

### Prerequisites
Make sure you have [Node.js](https://nodejs.org/) and `npm` installed on your machine.

### Installation

1. Open your terminal and navigate to the project folder:
   ```bash
   cd sonar-shield
   ```
2. Install the dependencies:
   ```bash
   npm install
   ```

### Running the Development Server

Start the Vite development server:
```bash
npm run dev
```
Open [http://localhost:5173](http://localhost:5173) in your browser to view the app.

### Building for Production

To create an optimized production build:
```bash
npm run build
```
The compiled files will be generated in the `dist/` directory, ready to be deployed to GitHub Pages, Vercel, Netlify, or any static hosting service.

## 📁 Key File Structure

* `src/components/` - All React UI components (Hero, DetectionInterface, SonarRadar, etc.).
* `src/data/modelParams.js` - Contains the extracted Scikit-Learn weights and metrics.
* `src/data/sampleData.js` - Contains highly confident Rock and Mine sample rows for quick testing.
* `src/utils/predict.js` - The pure JavaScript implementation of the Logistic Regression prediction function.
* `src/index.css` - Global design system, CSS variables, and keyframe animations.
