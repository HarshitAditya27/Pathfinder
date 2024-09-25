import React from "react";
import { PathfindingProvider } from "./context/PathfindingContext";

function App() {
  return (
    <PathfindingProvider>
      <h1 className="text-3xl font-bold underline h-screen w-screen bg-blue-500">
        App
      </h1>
    </PathfindingProvider>
  );
}

export default App;
