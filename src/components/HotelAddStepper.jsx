import * as React from "react";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";

const steps = ["Hotel Information", "pricing Information", "Review"];

export default function HotelAddStepper() {
  return (
    <section className="mt-4">
      <Box
        sx={{
          width: "100%",
          "& .MuiStepLabel-root .Mui-completed": {
            color: "#",
            fontWeight: "600",
          }, // ✅ Green for completed steps
          "& .MuiStepLabel-root .Mui-active": { color: "#16a34a" }, // ✅ Green for active label
          "& .MuiStepConnector-line": { borderColor: "#16a34a" }, // ✅ Green connector line
          "& .MuiStepIcon-root.Mui-active": { color: "#16a34a" }, // ✅ Green active circle
          "& .MuiStepIcon-root.Mui-completed": { color: "#16a34a" }, // ✅ Green completed circle
        }}
      >
        <Stepper activeStep={2} alternativeLabel>
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>
      </Box>
    </section>
  );
}
