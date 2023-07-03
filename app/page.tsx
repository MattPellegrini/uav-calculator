"use client";

import CSS from "csstype";
import { Divider } from "@mui/material";
import TextField from "@mui/material/TextField";
import { useState, useEffect } from "react";
import { Results, do_calculation } from "./model";

export default function Home() {
  const [mass, setMass] = useState<number>();
  const [XArea, setXArea] = useState<number>();
  const [dragCoefficient, setDragCoefficient] = useState<number>();
  const [height, setHeight] = useState<number>();
  const [speed, setSpeed] = useState<number>();
  const [windSpeed, setWindSpeed] = useState<number>();
  const [airDensity, setAirDensity] = useState<number>(1.293);
  const [results, setResults] = useState<Results>();

  // Derrived state
  const validMass = mass !== undefined && mass !== null && mass > 0;
  const validXArea = XArea !== undefined && XArea !== null && XArea > 0;
  const validDragCoefficient =
    dragCoefficient !== undefined &&
    dragCoefficient !== null &&
    dragCoefficient > 0;
  const validHeight = height !== undefined && height !== null && height > 0;
  const validSpeed = speed !== undefined && speed !== null && speed > 0;
  const validWindSpeed =
    windSpeed !== undefined && windSpeed !== null && windSpeed > 0;
  const validAirDensity =
    airDensity !== undefined && airDensity !== null && airDensity > 0;

  // recalculate results on change of any of the input variables
  useEffect(() => {
    if (
      validMass &&
      validXArea &&
      validDragCoefficient &&
      validHeight &&
      validSpeed &&
      validWindSpeed &&
      validAirDensity
    ) {
      setResults(
        do_calculation(
          height,
          speed,
          windSpeed,
          airDensity,
          mass,
          XArea,
          dragCoefficient
        )
      );
    }
  }, [
    mass,
    XArea,
    dragCoefficient,
    height,
    speed,
    windSpeed,
    airDensity,
    validMass,
    validXArea,
    validDragCoefficient,
    validHeight,
    validSpeed,
    validWindSpeed,
    validAirDensity,
  ]);

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <h1 style={sectionHeaderStyle}>Input data</h1>
      <div className="inputs" style={inputRowStyle}>
        <div className="uav-inputs" style={inputColumnStyle}>
          <Divider textAlign="left">UAV</Divider>
          <TextField
            id="uavMass"
            label="Mass (kg)"
            variant="outlined"
            type="number"
            style={inputTextFieldStyle}
            required
            error={!validMass}
            onChange={(e) => setMass(parseFloat(e.target.value))}
            value={mass?.toString()}
          />
          <TextField
            id="uavXArea"
            label="Area (m²)"
            variant="outlined"
            type="number"
            style={inputTextFieldStyle}
            required
            error={!validXArea}
            onChange={(e) => setXArea(parseFloat(e.target.value))}
            value={XArea?.toString()}
          />
          <TextField
            id="dragCoefficient"
            label="Drag coefficient"
            variant="outlined"
            type="number"
            style={inputTextFieldStyle}
            required
            error={!validDragCoefficient}
            onChange={(e) => setDragCoefficient(parseFloat(e.target.value))}
            value={dragCoefficient?.toString()}
          />
        </div>
        <div className="operational-inputs" style={inputColumnStyle}>
          <Divider textAlign="left">Operation</Divider>
          <TextField
            id="height"
            label="Height (m)"
            variant="outlined"
            type="number"
            required
            style={inputTextFieldStyle}
            error={!validHeight}
            onChange={(e) => setHeight(parseFloat(e.target.value))}
            value={height}
          />
          <TextField
            id="speed"
            label="Speed (m/s)"
            variant="outlined"
            type="number"
            style={inputTextFieldStyle}
            required
            error={!validSpeed}
            onChange={(e) => setSpeed(parseFloat(e.target.value))}
            value={speed}
          />
        </div>
        <div className="environmental-inputs" style={inputColumnStyle}>
          <Divider textAlign="left">Environment</Divider>
          <TextField
            id="windSpeed"
            label="Wind Speed (kts)"
            variant="outlined"
            type="number"
            style={inputTextFieldStyle}
            required
            error={!validWindSpeed}
            onChange={(e) => setWindSpeed(parseFloat(e.target.value))}
            value={windSpeed}
          />
          <TextField
            id="airDensity"
            label="Air Density (kg/m³)"
            variant="outlined"
            type="number"
            style={inputTextFieldStyle}
            required
            value={airDensity}
            error={!validAirDensity}
            onChange={(e) => setAirDensity(parseFloat(e.target.value))}
          />
        </div>
      </div>

      <h1 style={sectionHeaderStyle}>Output data</h1>
      <div className="outputs" style={outputRowStyle}>
        <TextField
          id="ResultantPosition"
          label="Position (m)"
          variant="outlined"
          type="number"
          style={inputTextFieldStyle}
          InputProps={{ readOnly: true }}
          value={results?.horizontal_distance.toFixed(2) || "Unknown"}
        />
        <TextField
          id="ResultantVelocity"
          label="Velocity (m/s)"
          variant="outlined"
          type="number"
          style={inputTextFieldStyle}
          InputProps={{ readOnly: true }}
          value={results?.velocity.toFixed(2) || "Unknown"}
        />
        <TextField
          id="ResultantKineticEnergy"
          label="Kinetic Energy (J)"
          variant="outlined"
          type="number"
          style={inputTextFieldStyle}
          InputProps={{ readOnly: true }}
          value={results?.kinetic_energy.toFixed(2) || "Unknown"}
        />
      </div>
    </main>
  );
}

const inputRowStyle: CSS.Properties = {
  display: "flex",
  flexDirection: "row",
  flex: 2,
  justifyContent: "center",
  width: "100%",
  paddingTop: "10px",
  paddingBottom: "10px",
};
const inputColumnStyle: CSS.Properties = {
  flexDirection: "column",
  flex: 1,
  paddingLeft: "5px",
  paddingRight: "5px",
};
const outputRowStyle: CSS.Properties = {
  display: "flex",
  flexDirection: "row",
  justifyContent: "space-between",
  flex: 1,
  width: "100%",
};
const inputTextFieldStyle: CSS.Properties = {
  width: "fit-content",
  padding: "5px",
  margin: "5px",
};

const brickStyle: CSS.Properties = {
  backgroundColor: "pink",
  width: "20px",
  height: "10px",
  borderWidth: "1px",
  borderColor: "brown",
};

const sectionHeaderStyle: CSS.Properties = {
  fontSize: "1.2rem",
  textAlign: "left",
  alignSelf: "flex-start",
};
