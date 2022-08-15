import React, { useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { Container, Typography } from "@mui/material";

const Activities = () => {
  const { getActivities, activities } = useAuth();
  useEffect(() => {
    getActivities();
    console.log(activities);
  }, []);
  return (
    <Container>
      <Typography my variant="h4">
        Activities
      </Typography>
      {activities.map((activity, index) => (
        <Typography key={index} my>
          {activity}
        </Typography>
      ))}
    </Container>
  );
};

export default Activities;
