import React, { createContext, useContext, useState, ReactNode } from 'react';

export interface Program {
    id: string;
    name: string;
    description: string;
    icon: string;
    category: 'core' | 'track' | 'extra';
}

interface AcademicProgramsContextType {
    coreSubjects: Program[];
    tracks: Program[];
    extraActivities: Program[];
    addProgram: (program: Omit<Program, 'id'>) => void;
    updateProgram: (id: string, program: Omit<Program, 'id'>) => void;
    deleteProgram: (id: string) => void;
    isAuthorized: boolean;
}

const AcademicProgramsContext = createContext<AcademicProgramsContextType | undefined>(undefined);

const initialPrograms: Program[] = [
    // Core Subjects
    {
        id: 'math',
        name: 'Mathematics',
        description: 'Comprehensive mathematics curriculum aligned with DepEd standards',
        icon: 'Calculate',
        category: 'core'
    },
    {
        id: 'science',
        name: 'Science',
        description: 'Hands-on scientific exploration and discovery',
        icon: 'Science',
        category: 'core'
    },
    {
        id: 'english',
        name: 'English',
        description: 'Developing strong communication and literacy skills',
        icon: 'Translate',
        category: 'core'
    },
    {
        id: 'filipino',
        name: 'Filipino',
        description: 'Celebrating our language and cultural heritage',
        icon: 'MenuBook',
        category: 'core'
    },
    {
        id: 'socstud',
        name: 'Social Studies',
        description: 'Understanding our society and history',
        icon: 'HistoryEdu',
        category: 'core'
    },

    // Senior High School Tracks
    {
        id: 'acad',
        name: 'Academic Track',
        description: 'Prepares students for college education',
        icon: 'School',
        category: 'track'
    },
    {
        id: 'tech',
        name: 'Technical-Vocational',
        description: 'Develops practical skills for employment',
        icon: 'Build',
        category: 'track'
    },
    {
        id: 'arts',
        name: 'Arts and Design',
        description: 'Nurtures creativity and artistic talent',
        icon: 'Palette',
        category: 'track'
    },
    {
        id: 'sports',
        name: 'Sports',
        description: 'Develops athletic excellence',
        icon: 'SportsSoccer',
        category: 'track'
    },

    // Extracurricular Activities
    {
        id: 'gov',
        name: 'Student Government',
        description: 'Developing leadership skills',
        icon: 'AccountBalance',
        category: 'extra'
    },
    {
        id: 'sports_club',
        name: 'Sports Clubs',
        description: 'Promoting physical fitness and teamwork',
        icon: 'Sports',
        category: 'extra'
    },
    {
        id: 'academic_club',
        name: 'Academic Clubs',
        description: 'Expanding knowledge beyond the classroom',
        icon: 'School',
        category: 'extra'
    },
    {
        id: 'arts_culture',
        name: 'Arts and Culture',
        description: 'Expressing creativity through various art forms',
        icon: 'TheaterComedy',
        category: 'extra'
    },
    {
        id: 'community',
        name: 'Community Service',
        description: 'Making a positive impact in our community',
        icon: 'VolunteerActivism',
        category: 'extra'
    }
];

export const AcademicProgramsProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [programs, setPrograms] = useState<Program[]>(() => {
        const savedPrograms = localStorage.getItem('academic_programs');
        return savedPrograms ? JSON.parse(savedPrograms) : initialPrograms;
    });

    const [isAuthorized] = useState(() => {
        return localStorage.getItem('isAdminAuthorized') === 'true';
    });

    // Save programs to localStorage whenever they change
    React.useEffect(() => {
        localStorage.setItem('academic_programs', JSON.stringify(programs));
    }, [programs]);

    const coreSubjects = programs.filter(p => p.category === 'core');
    const tracks = programs.filter(p => p.category === 'track');
    const extraActivities = programs.filter(p => p.category === 'extra');

    const addProgram = (program: Omit<Program, 'id'>) => {
        if (!isAuthorized) throw new Error('Unauthorized');
        const newProgram: Program = {
            ...program,
            id: Date.now().toString()
        };
        setPrograms(prev => [...prev, newProgram]);
    };

    const updateProgram = (id: string, program: Omit<Program, 'id'>) => {
        if (!isAuthorized) throw new Error('Unauthorized');
        setPrograms(prev => prev.map(item => 
            item.id === id ? { ...program, id } : item
        ));
    };

    const deleteProgram = (id: string) => {
        if (!isAuthorized) throw new Error('Unauthorized');
        setPrograms(prev => prev.filter(item => item.id !== id));
    };

    return (
        <AcademicProgramsContext.Provider value={{
            coreSubjects,
            tracks,
            extraActivities,
            addProgram,
            updateProgram,
            deleteProgram,
            isAuthorized
        }}>
            {children}
        </AcademicProgramsContext.Provider>
    );
};

export const useAcademicPrograms = () => {
    const context = useContext(AcademicProgramsContext);
    if (context === undefined) {
        throw new Error('useAcademicPrograms must be used within an AcademicProgramsProvider');
    }
    return context;
};
