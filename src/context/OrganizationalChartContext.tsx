import React, { createContext, useContext, useState, ReactNode } from 'react';
import { storeFile } from '../utils/fileStorage';

export interface Position {
    id: string;
    title: string;
    name: string;
    level: number;
    description?: string;
    imageKey?: string;
}

interface PositionInput {
    title: string;
    name: string;
    level: number;
    description: string;
    imageFile: File | null;
}

interface OrganizationalChartContextType {
    positions: Position[];
    addPosition: (position: PositionInput) => Promise<void>;
    updatePosition: (id: string, position: PositionInput) => Promise<void>;
    deletePosition: (id: string) => Promise<void>;
    loading: boolean;
    isAuthorized: boolean;
}

const OrganizationalChartContext = createContext<OrganizationalChartContextType | undefined>(undefined);

const initialPositions: Position[] = [
    {
        id: '1',
        title: 'Principal',
        name: 'Dr. Jane Smith',
        level: 1,
        description: 'School Principal'
    }
];

export const OrganizationalChartProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [positions, setPositions] = useState<Position[]>(() => {
        const savedPositions = localStorage.getItem('positions');
        return savedPositions ? JSON.parse(savedPositions) : initialPositions;
    });
    const [loading, setLoading] = useState(false);
    const [isAuthorized] = useState(() => {
        return localStorage.getItem('isAdminAuthorized') === 'true';
    });

    React.useEffect(() => {
        localStorage.setItem('positions', JSON.stringify(positions));
    }, [positions]);

    const addPosition = async (positionData: PositionInput) => {
        try {
            setLoading(true);
            let imageKey: string | undefined;
            
            if (positionData.imageFile) {
                imageKey = await storeFile(positionData.imageFile);
            }

            const newPosition: Position = {
                id: Date.now().toString(),
                title: positionData.title,
                name: positionData.name,
                level: positionData.level,
                description: positionData.description,
                imageKey
            };

            setPositions(prev => [...prev, newPosition]);
        } catch (error) {
            console.error('Error adding position:', error);
            throw error;
        } finally {
            setLoading(false);
        }
    };

    const updatePosition = async (id: string, positionData: PositionInput) => {
        try {
            setLoading(true);
            let newImageKey: string | undefined;

            if (positionData.imageFile) {
                newImageKey = await storeFile(positionData.imageFile);
            }

            setPositions(prev => prev.map(position => {
                if (position.id === id) {
                    return {
                        ...position,
                        title: positionData.title,
                        name: positionData.name,
                        level: positionData.level,
                        description: positionData.description,
                        imageKey: newImageKey || position.imageKey
                    };
                }
                return position;
            }));
        } catch (error) {
            console.error('Error updating position:', error);
            throw error;
        } finally {
            setLoading(false);
        }
    };

    const deletePosition = async (id: string) => {
        try {
            setLoading(true);
            setPositions(prev => prev.filter(position => position.id !== id));
        } catch (error) {
            console.error('Error deleting position:', error);
            throw error;
        } finally {
            setLoading(false);
        }
    };

    return (
        <OrganizationalChartContext.Provider value={{ positions, addPosition, updatePosition, deletePosition, loading, isAuthorized }}>
            {children}
        </OrganizationalChartContext.Provider>
    );
};

export const useOrganizationalChart = () => {
    const context = useContext(OrganizationalChartContext);
    if (!context) {
        throw new Error('useOrganizationalChart must be used within an OrganizationalChartProvider');
    }
    return context;
};
