import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

// Type definitions
export interface FeedbackItem {
    id: string;
    userType: 'student' | 'parent' | 'staff';
    category: string;
    rating: number;
    comment: string;
    date: string;
    isApproved: boolean;
}

export interface FeedbackContextType {
    feedback: FeedbackItem[];
    addFeedback: (feedback: Omit<FeedbackItem, 'id' | 'date' | 'isApproved'>) => void;
    deleteFeedback: (id: string) => void;
    updateFeedback: (id: string, feedback: Partial<FeedbackItem>) => void;
    approveFeedback: (id: string) => void;
    isAuthorized: boolean;
    loading: boolean;
}

const FeedbackContext = createContext<FeedbackContextType | undefined>(undefined);

const initialFeedback: FeedbackItem[] = [
    {
        id: '1',
        userType: 'student',
        category: 'Academic Programs',
        rating: 5,
        comment: 'Great learning experience!',
        date: '2024-01-01',
        isApproved: true
    }
];

// Load feedback from localStorage
const loadFeedbackFromStorage = () => {
    const savedFeedback = localStorage.getItem('feedback');
    if (!savedFeedback) return initialFeedback;
    
    try {
        return JSON.parse(savedFeedback);
    } catch (error) {
        console.error('Error loading feedback:', error);
        return initialFeedback;
    }
};

export const FeedbackProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [feedback, setFeedback] = useState<FeedbackItem[]>(loadFeedbackFromStorage);
    const [loading, setLoading] = useState(false);
    const [isAuthorized, setIsAuthorized] = useState(() => {
        return localStorage.getItem('isAdminAuthorized') === 'true';
    });

    // Save feedback to localStorage
    useEffect(() => {
        try {
            localStorage.setItem('feedback', JSON.stringify(feedback));
        } catch (error) {
            console.warn('Failed to save feedback to localStorage:', error);
        }
    }, [feedback]);

    const checkAuthorization = () => {
        if (!isAuthorized) {
            throw new Error('Unauthorized access');
        }
    };

    const addFeedback = (feedbackItem: Omit<FeedbackItem, 'id' | 'date' | 'isApproved'>) => {
        try {
            setLoading(true);
            const newFeedback: FeedbackItem = {
                ...feedbackItem,
                id: Date.now().toString(),
                date: new Date().toISOString().split('T')[0],
                isApproved: false
            };
            setFeedback(prev => [...prev, newFeedback].sort((a, b) => 
                new Date(b.date).getTime() - new Date(a.date).getTime()
            ));
        } catch (error) {
            console.error('Error adding feedback:', error);
            throw error;
        } finally {
            setLoading(false);
        }
    };

    const deleteFeedback = (id: string) => {
        try {
            checkAuthorization();
            setLoading(true);
            setFeedback(prev => prev.filter(item => item.id !== id));
        } catch (error) {
            console.error('Error deleting feedback:', error);
            throw error;
        } finally {
            setLoading(false);
        }
    };

    const updateFeedback = (id: string, feedbackItem: Partial<FeedbackItem>) => {
        try {
            checkAuthorization();
            setLoading(true);
            setFeedback(prev => prev.map(item => 
                item.id === id ? { ...item, ...feedbackItem } : item
            ));
        } catch (error) {
            console.error('Error updating feedback:', error);
            throw error;
        } finally {
            setLoading(false);
        }
    };

    const approveFeedback = (id: string) => {
        try {
            checkAuthorization();
            setLoading(true);
            setFeedback(prev => prev.map(item => 
                item.id === id ? { ...item, isApproved: true } : item
            ));
        } catch (error) {
            console.error('Error approving feedback:', error);
            throw error;
        } finally {
            setLoading(false);
        }
    };

    return (
        <FeedbackContext.Provider
            value={{
                feedback,
                addFeedback,
                deleteFeedback,
                updateFeedback,
                approveFeedback,
                isAuthorized,
                loading
            }}
        >
            {children}
        </FeedbackContext.Provider>
    );
};

export const useFeedback = () => {
    const context = useContext(FeedbackContext);
    if (context === undefined) {
        throw new Error('useFeedback must be used within a FeedbackProvider');
    }
    return context;
};
