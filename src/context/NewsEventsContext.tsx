import React, { createContext, useContext, useState, useCallback, useEffect } from 'react';
import { storeFile, getFileUrl } from '../utils/fileStorage';

export interface NewsItem {
    id: string;
    title: string;
    description: string;
    date: string;
    images: string[];
}

export interface EventItem {
    id: string;
    title: string;
    venue: string;
    date: string;
    images: string[];
}

interface NewsEventsContextType {
    news: NewsItem[];
    events: EventItem[];
    addNews: (news: Omit<NewsItem, 'id'> & { images: (string | File)[] }) => Promise<void>;
    addEvent: (event: Omit<EventItem, 'id'> & { images: (string | File)[] }) => Promise<void>;
    updateNews: (id: string, news: Partial<NewsItem> & { images?: (string | File)[] }) => Promise<void>;
    updateEvent: (id: string, event: Partial<EventItem> & { images?: (string | File)[] }) => Promise<void>;
    deleteNews: (id: string) => void;
    deleteEvent: (id: string) => void;
}

const NEWS_STORAGE_KEY = 'inhs_news';
const EVENTS_STORAGE_KEY = 'inhs_events';

const NewsEventsContext = createContext<NewsEventsContextType | undefined>(undefined);

export const useNewsEvents = () => {
    const context = useContext(NewsEventsContext);
    if (!context) {
        throw new Error('useNewsEvents must be used within a NewsEventsProvider');
    }
    return context;
};

export const NewsEventsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [news, setNews] = useState<NewsItem[]>(() => {
        const savedNews = localStorage.getItem(NEWS_STORAGE_KEY);
        return savedNews ? JSON.parse(savedNews) : [];
    });

    const [events, setEvents] = useState<EventItem[]>(() => {
        const savedEvents = localStorage.getItem(EVENTS_STORAGE_KEY);
        return savedEvents ? JSON.parse(savedEvents) : [];
    });

    // Save to localStorage whenever news or events change
    useEffect(() => {
        localStorage.setItem(NEWS_STORAGE_KEY, JSON.stringify(news));
    }, [news]);

    useEffect(() => {
        localStorage.setItem(EVENTS_STORAGE_KEY, JSON.stringify(events));
    }, [events]);

    // Helper function to process images
    const processImages = async (images: (string | File)[]): Promise<string[]> => {
        const processedImages: string[] = [];
        
        for (const image of images) {
            if (image instanceof File) {
                // Store new file and get its ID
                const fileId = await storeFile(image);
                const fileUrl = getFileUrl(fileId);
                if (fileUrl) {
                    processedImages.push(fileUrl);
                }
            } else {
                // Keep existing image URLs
                processedImages.push(image);
            }
        }
        
        return processedImages;
    };

    const addNews = useCallback(async (newsItem: Omit<NewsItem, 'id'> & { images: (string | File)[] }) => {
        const processedImages = await processImages(newsItem.images);
        
        const newNews: NewsItem = {
            id: `news_${Date.now()}`,
            title: newsItem.title,
            description: newsItem.description,
            date: newsItem.date,
            images: processedImages
        };

        setNews(prev => [...prev, newNews]);
    }, []);

    const addEvent = useCallback(async (eventItem: Omit<EventItem, 'id'> & { images: (string | File)[] }) => {
        const processedImages = await processImages(eventItem.images);
        
        const newEvent: EventItem = {
            id: `event_${Date.now()}`,
            title: eventItem.title,
            venue: eventItem.venue,
            date: eventItem.date,
            images: processedImages
        };

        setEvents(prev => [...prev, newEvent]);
    }, []);

    const updateNews = useCallback(async (id: string, updates: Partial<NewsItem> & { images?: (string | File)[] }) => {
        let processedImages: string[] | undefined;
        
        if (updates.images) {
            processedImages = await processImages(updates.images);
        }

        setNews(prev => prev.map(item => 
            item.id === id 
                ? { ...item, ...updates, ...(processedImages ? { images: processedImages } : {}) }
                : item
        ));
    }, []);

    const updateEvent = useCallback(async (id: string, updates: Partial<EventItem> & { images?: (string | File)[] }) => {
        let processedImages: string[] | undefined;
        
        if (updates.images) {
            processedImages = await processImages(updates.images);
        }

        setEvents(prev => prev.map(item => 
            item.id === id 
                ? { ...item, ...updates, ...(processedImages ? { images: processedImages } : {}) }
                : item
        ));
    }, []);

    const deleteNews = useCallback((id: string) => {
        setNews(prev => prev.filter(item => item.id !== id));
    }, []);

    const deleteEvent = useCallback((id: string) => {
        setEvents(prev => prev.filter(item => item.id !== id));
    }, []);

    return (
        <NewsEventsContext.Provider value={{
            news,
            events,
            addNews,
            addEvent,
            updateNews,
            updateEvent,
            deleteNews,
            deleteEvent
        }}>
            {children}
        </NewsEventsContext.Provider>
    );
};
