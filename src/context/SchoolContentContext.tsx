import React, { createContext, useContext, useState, ReactNode } from 'react';

interface VisionMission {
  vision: string;
  mission: string[];
}

interface History {
  introduction: string;
  milestones: {
    year: string;
    title: string;
    description: string;
  }[];
}

interface ChallengesOpportunities {
  challenges: {
    title: string;
    description: string;
  }[];
  opportunities: {
    title: string;
    description: string;
  }[];
}

interface CommunityEngagement {
  introduction: string;
  programs: {
    title: string;
    description: string;
  }[];
}

interface SchoolContent {
  visionMission: VisionMission;
  history: History;
  challengesOpportunities: ChallengesOpportunities;
  communityEngagement: CommunityEngagement;
}

interface SchoolContentContextType {
  content: SchoolContent;
  updateVisionMission: (data: VisionMission) => void;
  updateHistory: (data: History) => void;
  updateChallengesOpportunities: (data: ChallengesOpportunities) => void;
  updateCommunityEngagement: (data: CommunityEngagement) => void;
  loading: boolean;
  isAuthorized: boolean;
}

const defaultContent: SchoolContent = {
  visionMission: {
    vision: "Irisan National High School envisions itself as a premier educational institution that nurtures academically excellent, technologically competent, environmentally conscious, and morally upright individuals who contribute positively to society's development.",
    mission: [
      "Provide quality education through innovative teaching methods and modern facilities",
      "Foster a learning environment that promotes critical thinking, creativity, and character development",
      "Develop students' technological skills to prepare them for the digital age",
      "Instill environmental awareness and promote sustainable practices",
      "Build strong partnerships with parents, community, and stakeholders",
      "Uphold values of integrity, excellence, and social responsibility"
    ]
  },
  history: {
    introduction: "Since its establishment in 1965, Irisan National High School has been committed to providing quality education and shaping the future of countless students.",
    milestones: [
      {
        year: "1965",
        title: "Foundation",
        description: "Irisan National High School was established to serve the growing educational needs of the community."
      },
      {
        year: "1970",
        title: "First Graduation",
        description: "The first batch of students graduated, marking a significant milestone in the school's history."
      }
    ]
  },
  challengesOpportunities: {
    challenges: [
      {
        title: "Digital Integration",
        description: "Keeping pace with rapidly evolving technology and ensuring all students have equal access to digital resources."
      }
    ],
    opportunities: [
      {
        title: "Innovation in Education",
        description: "Leveraging new technologies and teaching methodologies to enhance learning experiences."
      }
    ]
  },
  communityEngagement: {
    introduction: "We believe in the power of community collaboration to enhance educational experiences and create lasting positive impact.",
    programs: [
      {
        title: "Parent-Teacher Partnership",
        description: "Regular meetings and workshops to strengthen collaboration between parents and teachers."
      }
    ]
  }
};

const SchoolContentContext = createContext<SchoolContentContextType | undefined>(undefined);

export const SchoolContentProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [content, setContent] = useState<SchoolContent>(() => {
    const savedContent = localStorage.getItem('schoolContent');
    return savedContent ? JSON.parse(savedContent) : defaultContent;
  });
  const [loading, setLoading] = useState(false);
  const [isAuthorized, setIsAuthorized] = useState(() => {
    return localStorage.getItem('isAdminAuthorized') === 'true';
  });

  // Listen for changes to admin authorization
  React.useEffect(() => {
    const checkAuth = () => {
      setIsAuthorized(localStorage.getItem('isAdminAuthorized') === 'true');
    };

    // Check auth status when component mounts
    checkAuth();

    // Add event listeners for storage changes and custom auth events
    window.addEventListener('storage', checkAuth);
    window.addEventListener('adminAuthChanged', checkAuth);

    // Cleanup
    return () => {
      window.removeEventListener('storage', checkAuth);
      window.removeEventListener('adminAuthChanged', checkAuth);
    };
  }, []);

  React.useEffect(() => {
    localStorage.setItem('schoolContent', JSON.stringify(content));
  }, [content]);

  const updateVisionMission = (data: VisionMission) => {
    setContent(prev => ({ ...prev, visionMission: data }));
  };

  const updateHistory = (data: History) => {
    setContent(prev => ({ ...prev, history: data }));
  };

  const updateChallengesOpportunities = (data: ChallengesOpportunities) => {
    setContent(prev => ({ ...prev, challengesOpportunities: data }));
  };

  const updateCommunityEngagement = (data: CommunityEngagement) => {
    setContent(prev => ({ ...prev, communityEngagement: data }));
  };

  return (
    <SchoolContentContext.Provider 
      value={{ 
        content, 
        updateVisionMission,
        updateHistory,
        updateChallengesOpportunities,
        updateCommunityEngagement,
        loading,
        isAuthorized
      }}
    >
      {children}
    </SchoolContentContext.Provider>
  );
};

export const useSchoolContent = () => {
  const context = useContext(SchoolContentContext);
  if (!context) {
    throw new Error('useSchoolContent must be used within a SchoolContentProvider');
  }
  return context;
};

export type { 
  VisionMission,
  History,
  ChallengesOpportunities,
  CommunityEngagement,
  SchoolContent
};
