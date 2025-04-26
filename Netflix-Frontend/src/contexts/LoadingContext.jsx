import React, { createContext, useContext, useState } from 'react';

const LoadingContext = createContext();

export const useLoading = () => useContext(LoadingContext);

export const LoadingProvider = ({ children }) => {
  const [loading, setLoading] = useState(false);

  const setLoadingContext = (state) => {
    setLoading(state); // Update loading state
  };

  return (
    <LoadingContext.Provider value={{ loading, setLoadingContext }}>
      {children}
    </LoadingContext.Provider>
  );
};
