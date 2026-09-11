# Antigravity Prompt — Sonar Shield Local ML Demo

You are given:
- `Rock_vs_Mine_Prediction_with_visualizations.ipynb`
- `Copy of sonar data.csv`

Build a polished **frontend-only local demo** of my actual ML mini-project.

## 1. Inspect the files first

Before coding, inspect both files and understand the exact dataset, workflow, preprocessing, model, prediction method, and results.

Preserve the actual project:
- Sonar dataset
- 208 samples
- 60 numerical sonar features
- Target: `R` = Rock, `M` = Mine
- Main algorithm: **Logistic Regression**
- Binary classification

Do not invent data, metrics, or prediction rules.

## 2. Application

Create a premium website called:

**SONAR SHIELD**
### AI-Powered Rock vs Mine Detection

The user enters 60 sonar signal values and receives a real **Rock** or **Mine** prediction.

Everything must run locally. **No backend, deployment, database, Flask, FastAPI, or API keys.**

Use React + Vite. Run with:
```bash
npm install
npm run dev
```

## 3. Design

Make it look like a premium marine/sonar technology dashboard, not a basic college project.

Use:
- dark navy/ocean theme
- glassmorphism
- subtle gradients/glow
- clean typography
- rounded cards
- professional icons
- ocean/sonar visuals

Use only tasteful, limited animation:
- gentle ocean/wave movement
- subtle ship movement
- sonar radar sweep
- sonar rings/particles
- smooth transitions
- short scan animation

Avoid excessive flashing or flashy effects.

## 4. Hero

Show:
**SONAR SHIELD**
**AI-Powered Rock vs Mine Detection**

Description:
“Analyze sonar signal patterns using machine learning to determine whether an underwater object is a Rock or a Mine.”

Create a cinematic but professional ocean scene with:
- 🚢 ship moving gently on water
- sonar waves below
- underwater detection area
- modern technology/dashboard feel

## 5. Project overview

Show verified project facts:
- Dataset: Sonar
- Samples: 208
- Features: 60
- Classes: 2
- Algorithm: Logistic Regression
- Validation: Train/Test Split + Cross Validation

Clearly distinguish the ML algorithm from supporting analysis techniques.

## 6. Detection interface

Title:
**🔍 Sonar Signal Analysis**

Allow input of all 60 numerical features.

Use a compact responsive grid rather than 60 large boxes. Group them:
- Features 01–20
- Features 21–40
- Features 41–60

Buttons:
- **Load Rock Sample**
- **Load Mine Sample**
- **Clear**
- **Analyze Signal**

Sample buttons must load **real rows from the supplied CSV**, not fake values.

Validate that all 60 values are numerical before prediction.

## 7. Actual frontend prediction

There is no backend.

Implement prediction in the browser while remaining faithful to the notebook.

Preferred:
- extract/reproduce the trained Logistic Regression coefficients/intercept and any required preprocessing from the notebook.

Alternative:
- train Logistic Regression in the browser using the supplied dataset and the same methodology as the notebook.

Do NOT use fake rules such as:
```js
if (...) return "Mine";
else return "Rock";
```

The result must come from the actual Logistic Regression logic.

If probabilities are available from the actual model, show them. Never fabricate confidence values.

## 8. Analysis animation

On **Analyze Signal**, show a short 1–2 second sequence:

`🚢 SONAR ACTIVE`
→ `Scanning underwater signal...`
→ `Extracting 60 signal features...`
→ `Running Logistic Regression...`
→ `🤖 CLASSIFYING`

Then reveal the result.

## 9. Rock result

Show:

**🪨 ROCK DETECTED**

“The sonar signal pattern is classified as a Rock.”

Include:
- underwater rock visual
- Classification: ROCK
- Rock probability
- Mine probability
- Model: Logistic Regression
- Features analyzed: 60
- Status: SAFE TO PROCEED

Ship can continue moving.

## 10. Mine result

Show:

**💣 MINE DETECTED**

“The sonar signal pattern is classified as a Mine.”

Include:
- underwater mine visual
- subtle warning styling
- Classification: MINE
- Rock probability
- Mine probability
- Model: Logistic Regression
- Features analyzed: 60
- Status: ⚠️ HAZARD DETECTED

Ship can slow/stop visually.

Do not use excessive flashing effects.

## 11. Sonar visualization

Include a polished radar/sonar visualization.

During analysis:
- radar sweep
- expanding sonar rings
- subtle particles
- underwater detection point

After prediction, visually reflect Rock vs Mine.

This is only a presentation layer; the prediction itself must come from the actual ML calculation.

## 12. ML explanation

Add a concise flow:

```text
Sonar Data
    ↓
60 Signal Features
    ↓
Data Preparation
    ↓
Logistic Regression
    ↓
Prediction
    ↓
Rock / Mine
```

Simple explanations:
- **Logistic Regression:** suitable because this is binary classification.
- **Train/Test Split:** training teaches the model; testing evaluates unseen data.
- **Cross Validation:** gives a more reliable estimate, especially for this small dataset.
- **PCA:** reduces 60 dimensions to 2 for visualization, if used in the notebook.

## 13. Model insights

Use actual notebook values only.

Show available metrics:
- Training Accuracy
- Testing Accuracy
- Cross-validation score
- Precision
- Recall
- F1-score
- ROC-AUC

Do not invent missing metrics.

Add clean visualizations where appropriate:
- Rock vs Mine distribution
- PCA 2D plot
- Confusion matrix
- ROC curve
- signal/feature visualization

Use tabs/cards so the page is not overcrowded.

## 14. Navigation

Navbar:
- SONAR SHIELD
- Home
- Detection
- Model
- Insights
- About

Use smooth scrolling.

## 15. About

Explain briefly:

“This machine learning mini-project uses 60 sonar signal measurements to classify underwater objects as Rock or Mine using Logistic Regression.”

Use verified project facts only.

## 16. Final testing

After implementation:
1. Install dependencies.
2. Start the local development server.
3. Verify the app opens.
4. Test a real Rock row from the CSV.
5. Test a real Mine row from the CSV.
6. Verify predictions work.
7. Fix runtime/UI errors.
8. Make it polished and presentation-ready.

The final experience must clearly communicate:

**60 sonar inputs → Logistic Regression → Rock/Mine prediction**

Make the visual experience impressive, but keep the ML logic technically faithful to the provided notebook.
Do not retrain the model if the trained model parameters can be extracted from the notebook. First reproduce the exact trained Logistic Regression model from the notebook by extracting its learned coefficients, intercept, and any preprocessing parameters. Store those parameters in the frontend and use them for prediction. Only train a model again if the original trained parameters genuinely cannot be recovered from the notebook. If retraining is necessary, use exactly the same dataset, preprocessing, train/test split, random state, and Logistic Regression configuration as the notebook.
