import { createContext, useCallback, useState, useContext } from "react";

interface IDrawerContextData{
   isDrowerOpen: boolean;
   toggleDrowerOpen: () => void;
}

const DrawerContext = createContext({} as IDrawerContextData);

export const useDrawerContext = () => {
    return useContext(DrawerContext);
}

export const DrawerProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {

    const [isDrowerOpen, setIsDrawerOpen] = useState(false);

    const toggleDrowerOpen = useCallback(() => {
        setIsDrawerOpen(oldDrawerOpen => !oldDrawerOpen);
    }, []);

 
    return(
        <DrawerContext.Provider value={{ isDrowerOpen, toggleDrowerOpen }}>
            {children}
        </DrawerContext.Provider>
    );
}