import React from "react";
import { Ring } from "@uiball/loaders";

export const LoadingScreen = () => {
  return (
    <div className="loading__screen">
      <Ring size={80} lineWeight={5} speed={2} color="white" />;
    </div>
  );
};
