import React, { createContext, useContext, useState, useEffect } from 'react';

interface AnalyticsData {
  pageViews: {
    total: number;
    byPage: { [key: string]: number };
  };
  userEngagement: {
    averageTimeOnSite: number;
    bounceRate: number;
  };
  demographics: {
    devices: { [key: string]: number };
    browsers: { [key: string]: number };
  };
  interactions: {
    feedbackSubmissions: number;
    enrollmentInquiries: number;
  };
}

interface AnalyticsContextType {
  analyticsData: AnalyticsData;
  refreshAnalytics: () => void;
}

const AnalyticsContext = createContext<AnalyticsContextType | undefined>(undefined);

export const AnalyticsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [analyticsData, setAnalyticsData] = useState<AnalyticsData>({
    pageViews: {
      total: 0,
      byPage: {
        '/': 0,
        '/vision-mission': 0,
        '/history': 0,
        '/organizational-chart': 0,
        '/challenges-opportunities': 0,
        '/community-engagement': 0,
        '/admission': 0,
        '/academic-programs': 0,
      },
    },
    userEngagement: {
      averageTimeOnSite: 0,
      bounceRate: 0,
    },
    demographics: {
      devices: {
        desktop: 0,
        mobile: 0,
        tablet: 0,
      },
      browsers: {
        chrome: 0,
        firefox: 0,
        safari: 0,
        other: 0,
      },
    },
    interactions: {
      feedbackSubmissions: 0,
      enrollmentInquiries: 0,
    },
  });

  const refreshAnalytics = () => {
    // Simulate fetching analytics data
    // In a real application, this would make an API call to your analytics service
    setAnalyticsData({
      pageViews: {
        total: Math.floor(Math.random() * 10000),
        byPage: {
          '/': Math.floor(Math.random() * 5000),
          '/vision-mission': Math.floor(Math.random() * 1000),
          '/history': Math.floor(Math.random() * 800),
          '/organizational-chart': Math.floor(Math.random() * 700),
          '/challenges-opportunities': Math.floor(Math.random() * 600),
          '/community-engagement': Math.floor(Math.random() * 900),
          '/admission': Math.floor(Math.random() * 3000),
          '/academic-programs': Math.floor(Math.random() * 2500),
        },
      },
      userEngagement: {
        averageTimeOnSite: Math.floor(Math.random() * 300), // seconds
        bounceRate: Math.random() * 100, // percentage
      },
      demographics: {
        devices: {
          desktop: Math.floor(Math.random() * 6000),
          mobile: Math.floor(Math.random() * 3000),
          tablet: Math.floor(Math.random() * 1000),
        },
        browsers: {
          chrome: Math.floor(Math.random() * 5000),
          firefox: Math.floor(Math.random() * 2000),
          safari: Math.floor(Math.random() * 2000),
          other: Math.floor(Math.random() * 1000),
        },
      },
      interactions: {
        feedbackSubmissions: Math.floor(Math.random() * 500),
        enrollmentInquiries: Math.floor(Math.random() * 1000),
      },
    });
  };

  useEffect(() => {
    refreshAnalytics();
    // Refresh analytics every 5 minutes
    const interval = setInterval(refreshAnalytics, 300000);
    return () => clearInterval(interval);
  }, []);

  return (
    <AnalyticsContext.Provider value={{ analyticsData, refreshAnalytics }}>
      {children}
    </AnalyticsContext.Provider>
  );
};

export const useAnalytics = () => {
  const context = useContext(AnalyticsContext);
  if (context === undefined) {
    throw new Error('useAnalytics must be used within an AnalyticsProvider');
  }
  return context;
};
