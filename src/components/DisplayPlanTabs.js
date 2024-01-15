import React, { useState } from "react";
import { Radio, Tabs } from "antd";
const DisplayPlanTabs = () => {
  const [mode, setMode] = useState("top");

  const handleModeChange = (e) => {
    setMode(e.target.value);
  };

  const tapStyle = {
    height: "40vh",
    width: "40vw",
  };

  return (
    <div style={tapStyle}>
      <Radio.Group
        onChange={handleModeChange}
        value={mode}
        style={{
          marginBottom: 8,
        }}
      >
        {/* <Radio.Button value="top">Horizontal</Radio.Button>
        <Radio.Button value="left">Vertical</Radio.Button> */}
      </Radio.Group>
      <Tabs
        defaultActiveKey="1"
        tabPosition={mode}
        style={{
          height: 220,
        }}
        items={new Array(15).fill(null).map((_, i) => {
          const id = String(i);
          return {
            label: `Day ${i + 1}`,
            key: id,
            disabled: i === 28,
            children: `Destinations of day ${i + 1}`,
          };
        })}
      />
    </div>
  );
};
export default DisplayPlanTabs;
