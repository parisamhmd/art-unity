import React from "react";

export const AlertContext = React.createContext({
  success: () => Promise.resolve(false),
  error: () => Promise.resolve(false),
  prompt: () => Promise.resolve({ result: false }),
});

export const useAlert = () => React.useContext(AlertContext);
