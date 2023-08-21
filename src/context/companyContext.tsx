import React, { createContext, useContext, useState, ReactNode } from 'react';

interface CompanyContextProps {
    CompanyId: string|undefined;
    AccountingTools: number|undefined;
    setCompanyId: (value: string) => void;
    setAccountingToolType: (value: number) => void;
}

const CompanyContext = createContext<CompanyContextProps | undefined>(undefined);

export const CompanyContextProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [CompanyId, setInternalCompanyId] = useState<string|undefined>();
    const [AccountingTools, setInternalAccountingTools] = useState<number|undefined>();

    const setCompanyId = (value: string) => {
        setInternalCompanyId(value);
    };

    const setAccountingToolType = (value: number) => {
        setInternalAccountingTools(value);
    };

    return (
        <CompanyContext.Provider value={{ CompanyId, AccountingTools, setCompanyId, setAccountingToolType }}>
            {children}
        </CompanyContext.Provider>
    );
};

export const useCompanyContext = (): CompanyContextProps => {
    const context = useContext(CompanyContext);
    if (!context) {
        throw new Error('useCompany must be used within a CompanyProvider');
    }
    return context;
};
