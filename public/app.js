import { mountCompactorUi } from "../src/ui.js";

const sampleData = document.querySelector("#demonstrated-sample-source");
if (!sampleData) {
  throw new Error("Missing demonstrated sample source");
}

mountCompactorUi(document, {
  demonstratedSampleSource: JSON.parse(sampleData.textContent),
});
