# AI/ML

Keep model experiments separate from the live API. Production inference can later be imported by the backend through a clear service interface.

```text
AI_ML/
  src/           reusable feature, training, and inference code
  models/        local model artifacts
  notebooks/     exploratory notebooks
  tests/         model/unit tests
```
