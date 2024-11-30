import { BarChart, Bar, ResponsiveContainer, XAxis, YAxis } from "recharts";
import { useState, useEffect } from "react";
import { Box } from "@mui/material";
import { getTrainings } from "../api";
import { _ } from "lodash";

function TrainingStatistics() {
  const [trainings, setTrainings] = useState([]);

  useEffect(() => {
    handleFetchTrainings();
  }, []);

  const handleFetchTrainings = () => {
    try {
      getTrainings().then((res) => setTrainings(res));
    } catch (error) {
      console.error(error.message);
    }
  };

  const groupOfTrainingTypes = _.chain(trainings).groupBy("activity").value();

  const data = Object.keys(groupOfTrainingTypes).map((trainingType) => {
    return {
      name: trainingType,
      duration: _.sumBy(groupOfTrainingTypes[trainingType], "duration"),
    };
  });

  return (
    <Box sx={{ height: "80vh", width: "70vw", margin: "auto", marginTop: 10 }}>
      <ResponsiveContainer height="85%">
        <BarChart data={data} barSize={150}>
          <XAxis dataKey="name" />

          <YAxis
            label={{
              value: "Duration (min)",
              angle: -90,
              position: "insideLeft",
              fill: "black",
              fontSize: 20,
            }}
          />
          <Bar dataKey="duration" fill="#8884d8" />
        </BarChart>
      </ResponsiveContainer>
    </Box>
  );
}

export default TrainingStatistics;
