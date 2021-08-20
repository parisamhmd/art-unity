import React from "react";

export const AlertContext = React.createContext({
  error: () => Promise.resolve(false),
  prompt: () => Promise.resolve({ result: false }),
  success: () => Promise.resolve(false),
});

export const useAlert = () => React.useContext(AlertContext);
