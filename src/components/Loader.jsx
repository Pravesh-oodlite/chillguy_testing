import { Loader2 } from "lucide-react";
import React from "react";

const Loader = () => {
  return (
    <div
      className="flex items-center justify-center min-h-screen"
      role="status"
      aria-label="Loading"
    >
      <Loader2 className="animate-spin text-blue-500" />
    </div>
  );
};

export default Loader;
