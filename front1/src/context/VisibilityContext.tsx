import React, { createContext, useContext, useState, ReactNode } from 'react';
import { VisibilityContextType } from '../helpers/types';

const VisibilityContext = createContext<VisibilityContextType | undefined>(undefined);

export const VisibilityProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [isPrivate, setIsPrivate] = useState<boolean>(false);

    return (
        <VisibilityContext.Provider value={{ isPrivate, setIsPrivate }}>
            {children}
        </VisibilityContext.Provider>
    );
};

export const useVisibility = (): VisibilityContextType => {
    const context = useContext(VisibilityContext);
    if (!context) {
        throw new Error('useVisibility must be used within a VisibilityProvider');
    }
    return context;
};