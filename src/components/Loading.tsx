import React from "react";
import { CircularProgress, Container } from "@material-ui/core";

const Loading: React.FC = () => {
  return (
    <Container
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <CircularProgress />
    </Container>
  );
};

export default Loading;
export {};