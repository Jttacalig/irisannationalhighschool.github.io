import React, { createContext, useContext, useState, ReactNode } from 'react';

export interface ImportantDate {
    id: string;
    title: string;
    date: string;
    details: string;
}

interface ImportantDatesContextType {
    dates: ImportantDate[];
    addDate: (date: Omit<ImportantDate, 'id'>) => void;
    updateDate: (id: string, date: Omit<ImportantDate, 'id'>) => void;
    deleteDate: (id: string) => void;
    isAuthorized: boolean;
}

const ImportantDatesContext = createContext<ImportantDatesContextType | undefined>(undefined);

const initialDates: ImportantDate[] = [
    {
        id: '1',
        title: 'Early Registration',
        date: 'January 15 - February 28, 2024',
        details: 'Special considerations for early registrants'
    },
    {
        id: '2',
        title: 'Regular Registration',
        date: 'March 1 - May 31, 2024',
        details: 'Standard admission period'
    },
    {
        id: '3',
        title: 'Late Registration',
        date: 'June 1 - 15, 2024',
        details: 'Subject to slot availability'
    }
];

export const ImportantDatesProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [dates, setDates] = useState<ImportantDate[]>(() => {
        const savedDates = localStorage.getItem('important_dates');
        return savedDates ? JSON.parse(savedDates) : initialDates;
    });

    const [isAuthorized] = useState(() => {
        return localStorage.getItem('isAdminAuthorized') === 'true';
    });

    // Save dates to localStorage whenever they change
    React.useEffect(() => {
        localStorage.setItem('important_dates', JSON.stringify(dates));
    }, [dates]);

    const addDate = (date: Omit<ImportantDate, 'id'>) => {
        if (!isAuthorized) throw new Error('Unauthorized');
        const newDate: ImportantDate = {
            ...date,
            id: Date.now().toString()
        };
        setDates(prev => [...prev, newDate]);
    };

    const updateDate = (id: string, date: Omit<ImportantDate, 'id'>) => {
        if (!isAuthorized) throw new Error('Unauthorized');
        setDates(prev => prev.map(item => 
            item.id === id ? { ...date, id } : item
        ));
    };

    const deleteDate = (id: string) => {
        if (!isAuthorized) throw new Error('Unauthorized');
        setDates(prev => prev.filter(item => item.id !== id));
    };

    return (
        <ImportantDatesContext.Provider value={{
            dates,
            addDate,
            updateDate,
            deleteDate,
            isAuthorized
        }}>
            {children}
        </ImportantDatesContext.Provider>
    );
};

export const useImportantDates = () => {
    const context = useContext(ImportantDatesContext);
    if (context === undefined) {
        throw new Error('useImportantDates must be used within an ImportantDatesProvider');
    }
    return context;
};
