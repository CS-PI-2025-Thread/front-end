import { useState, useEffect, createContext, useContext } from "react";

const GenericContext = createContext();

export const useGenericContext = () => useContext(GenericContext);

const GenericContextProvider = ({ lSName, children }) => {
  const [storageObject, setStorageObject] = useState([]);

  useEffect(() => {
    const stored = localStorage.getItem(lSName);
    if (stored) setStorageObject(JSON.parse(stored));
    else setStorageObject([]);
  }, [lSName]);

  const saveToStorage = (updated) => {
    localStorage.setItem(lSName, JSON.stringify(updated));
    setStorageObject(updated);
  };

  const addStorageObject = (contractData) => {
    const newObj = { ...contractData, id: crypto.randomUUID() };
    const updated = [...storageObject, newObj];
    saveToStorage(updated);
    return newObj;
  };

  const updateStorageObject = (id, updatedData) => {
    const updated = storageObject.map((c) =>
      c.id === id ? { ...c, ...updatedData } : c
    );
    saveToStorage(updated);
  };

  const getStorageObjectById = (id) => {
    return storageObject.find((c) => String(c.id) === String(id)) || null;
  };

  const contextValue = {
    storageObject,
    addStorageObject,
    updateStorageObject,
    getStorageObjectById,
  };

  return (
    <GenericContext.Provider value={contextValue}>
      {children}
    </GenericContext.Provider>
  );
};

export default GenericContextProvider;
