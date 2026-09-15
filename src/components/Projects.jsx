// Imports stay the same
import { useState, useRef, useMemo } from "react";
import { PROJECTS } from "../constants";
import { motion } from "framer-motion";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

const VITAL_RANGES = {
  "Blood Glucose": { min: 70, max: 140, unit: "mg/dL" },
  "Diastolic BP": { min: 60, max: 80, unit: "mmHg" },
  "Systolic BP": { min: 110, max: 130, unit: "mmHg" },
  "Cholesterol": { min: 75, max: 200, unit: "mg/dL" },
  "BMI": { min: 18.5, max: 24.9, unit: "kg/m²" },
  "HbA1c (Blood Sugar Level)": { min: 4, max: 5.6, unit: "%" },
};

const TIPS = {
  "Blood Glucose": {
    improve: "Follow a low-glycemic diet and exercise regularly.",
    precaution: "Avoid high-sugar foods and monitor your levels regularly.",
  },
  "Diastolic BP": {
    improve: "Reduce stress and sodium intake.",
    precaution: "Monitor regularly and stay physically active.",
  },
  "Systolic BP": {
    improve: "Maintain a healthy weight and reduce alcohol intake.",
    precaution: "Limit salt and processed foods.",
  },
  "Cholesterol": {
    improve: "Eat more fiber and healthy fats.",
    precaution: "Avoid trans fats and fried foods.",
  },
  "BMI": {
    improve: "Maintain a balanced diet and stay active.",
    precaution: "Avoid overeating and sedentary lifestyle.",
  },
  "HbA1c (Blood Sugar Level)": {
    improve: "Maintain consistent meal timing and avoid refined carbs.",
    precaution: "Track blood sugar regularly and reduce sugar intake.",
  },
};

const DISEASE_PREDICTIONS = {
  "Blood Glucose": {
    high: { name: "Hyperglycemia" },
    low: { name: "Hypoglycemia" },
  },
  "Diastolic BP": {
    high: { name: "Diastolic Hypertension" },
    low: { name: "Diastolic Hypotension" },
  },
  "Systolic BP": {
    high: { name: "Systolic Hypertension" },
    low: { name: "Systolic Hypotension" },
  },
  "Cholesterol": {
    high: { name: "Hypercholesterolemia" },
  },
  "BMI": {
    high: { name: "Obesity" },
    low: { name: "Underweight" },
  },
  "HbA1c (Blood Sugar Level)": {
    high: { name: "Diabetes" },
    low: { name: "Hypoglycemia" },
  },
};

export const Projects = () => {
  const [userInputs, setUserInputs] = useState({});
  const [showTips, setShowTips] = useState(false);
  const reportRef = useRef(null);

  const handleInputClick = (title) => {
    const value = prompt(`Enter ${title} value:`);

    if (value !== null && value.trim() !== "") {
      const numericValue = parseFloat(value);
      if (isNaN(numericValue)) {
        alert("Please enter a valid number.");
        return;
      }

      const range = VITAL_RANGES[title];
      let status = "Unknown";

      if (range) {
        if (numericValue >= range.min && numericValue <= range.max) {
          status = "Normal";
        } else {
          status = "Abnormal";
        }
      }

      const updatedInputs = {
        ...userInputs,
        [title]: { value: numericValue, status },
      };

      setUserInputs(updatedInputs);

      const allEntered = Object.keys(VITAL_RANGES).every(
        (key) => updatedInputs[key]
      );
      if (allEntered) setShowTips(true);
    }
  };

  const score = useMemo(() => {
    const total = Object.keys(VITAL_RANGES).length;
    const normalCount = Object.values(userInputs).filter(
      (v) => v.status === "Normal"
    ).length;
    return Math.round((normalCount / total) * 100);
  }, [userInputs]);

  const diseasePredictions = useMemo(() => {
    const results = [];

    Object.entries(userInputs).forEach(([key, data]) => {
      const value = data.value;
      const range = VITAL_RANGES[key];
      const prediction = DISEASE_PREDICTIONS[key];

      if (!range || !prediction) return;

      let deviationPercent = 0;
      let diseaseName = "";
      let isLow = false;

      if (value < range.min && prediction.low) {
        const deviation = range.min - value;
        const base = range.min;
        deviationPercent = Math.min(100, Math.round((deviation / base) * 100));
        diseaseName = prediction.low.name;
        isLow = true;
      } else if (value > range.max && prediction.high) {
        const deviation = value - range.max;
        const base = range.max;
        deviationPercent = Math.min(100, Math.round((deviation / base) * 100));
        diseaseName = prediction.high.name;
      }

      if (diseaseName) {
        results.push({
          name: diseaseName,
          risk: deviationPercent < 20 ? 50 + deviationPercent : 70 + deviationPercent * 0.3,
        });
      }
    });

    return results;
  }, [userInputs]);

  const downloadPDF = () => {
    const input = reportRef.current;
    if (!input) return;
    html2canvas(input, { scale: 2 }).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("p", "mm", "a4");
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
      pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
      pdf.save("health_report.pdf");
    });
  };

  return (
    <div className="pb-4 px-4">
      <motion.h2
        whileInView={{ opacity: 1, y: 0 }}
        initial={{ opacity: 0, y: -100 }}
        transition={{ duration: 0.5 }}
        className="my-32 text-center text-4xl"
      >
        VITALS
      </motion.h2>

      <div>
        {PROJECTS.map((project, index) => (
          <div key={index} className="mb-12 flex flex-wrap lg:justify-center gap-6">
            <motion.div
              whileInView={{ opacity: 1, x: 0 }}
              initial={{ opacity: 0, x: -100 }}
              transition={{ duration: 1 }}
              className="w-full lg:w-1/4 flex justify-center"
            >
              <img
                src={project.image}
                width={250}
                height={250}
                alt={project.title}
                className="mb-6 rounded shadow-lg"
              />
            </motion.div>

            <motion.div
              whileInView={{ opacity: 1, x: 0 }}
              initial={{ opacity: 0, x: 100 }}
              transition={{ duration: 1 }}
              className="w-full max-w-xl lg:w-3/4"
            >
              <h3 className="mb-2 font-semibold text-2xl">{project.title}</h3>
              <p className="mb-4 text-stone-400">{project.description}</p>

              {project.technologies.map((tech, i) => (
                <span
                  className="mr-2 rounded bg-stone-900 p-2 text-sm font-medium text-stone-300"
                  key={i}
                >
                  {tech}
                </span>
              ))}

              <div className="mt-4">
                <button
                  onClick={() => handleInputClick(project.title)}
                  className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded transition"
                >
                  Input {project.title}
                </button>

                {userInputs[project.title] && (
                  <div className="mt-2 text-sm">
                    Last Recorded:{" "}
                    <strong>{userInputs[project.title].value}</strong>{" "}
                    <span
                      className={
                        userInputs[project.title].status === "Normal"
                          ? "text-green-500"
                          : "text-red-500"
                      }
                    >
                      ({userInputs[project.title].status})
                    </span>
                  </div>
                )}
              </div>
            </motion.div>
          </div>
        ))}
      </div>

      {showTips && (
        <>
          <div ref={reportRef}>
            <div className="my-8 text-center">
              <h3 className="text-2xl font-semibold mb-2">Your Health Score</h3>
              <div className="bg-gray-300 rounded-full h-4 w-full max-w-md mx-auto overflow-hidden">
                <div
                  className="h-full bg-green-500 transition-all"
                  style={{ width: `${score}%` }}
                ></div>
              </div>
              <p className="mt-2 text-white">{score} / 100</p>
            </div>

            <div className="mt-10">
              <h3 className="text-2xl font-bold mb-4 text-center">
                Health Recommendations
              </h3>
              <div className="grid md:grid-cols-2 gap-6">
                {Object.keys(userInputs).map((key, i) => (
                  <div
                    key={i}
                    className="bg-neutral-800 p-4 rounded shadow text-white"
                  >
                    <h4 className="text-xl font-semibold mb-2">{key}</h4>
                    <p>
                      <strong>Precaution:</strong> {TIPS[key].precaution}
                    </p>
                    <p>
                      <strong>How to Improve:</strong> {TIPS[key].improve}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-12 bg-red-900 p-6 rounded-xl text-white">
              <h3 className="text-2xl font-semibold mb-4">Disease Risk Prediction</h3>
              {diseasePredictions.length > 0 ? (
                <ul className="list-disc list-inside space-y-2 text-red-200">
                  {diseasePredictions.map((disease, i) => (
                    <li key={i}>
                      <span className="font-semibold">{disease.name}</span> –{" "}
                      Risk Level:{" "}
                      <span
                        className={
                          disease.risk >= 80
                            ? "text-red-400"
                            : disease.risk >= 60
                            ? "text-yellow-300"
                            : "text-orange-300"
                        }
                      >
                        {Math.round(disease.risk)}%
                      </span>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-green-400">
                  No disease risks detected based on current vitals.
                </p>
              )}
            </div>
          </div>

          <div className="mt-8 text-center">
            <button
              onClick={downloadPDF}
              className="bg-emerald-600 hover:bg-emerald-700 text-black px-6 py-3 rounded-lg font-semibold shadow transition"
            >
              Download Health Report
            </button>
          </div>
        </>
      )}
    </div>
  );
};
