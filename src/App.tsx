import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { NewsEventsProvider } from './context/NewsEventsContext';
import { FeedbackProvider } from './context/FeedbackContext';
import { OrganizationalChartProvider } from './context/OrganizationalChartContext';
import { SchoolContentProvider } from './context/SchoolContentContext';
import { ImportantDatesProvider } from './context/ImportantDatesContext';
import { AcademicProgramsProvider } from './context/AcademicProgramsContext';
import { AnalyticsProvider } from './context/AnalyticsContext';
import { AuthProvider } from './context/AuthContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import HomePage from './components/HomePage';
import AcademicPrograms from './components/AcademicPrograms';
import Facilities from './components/Facilities';
import CommunityEngagement from './components/CommunityEngagement';
import ChallengesOpportunities from './components/ChallengesOpportunities';
import ContactInformation from './components/ContactInformation';
import NewsEvents from './components/NewsEvents';
import Admission from './components/Admission';
import FAQs from './components/FAQs';
import EnrollmentForm from './components/EnrollmentForm';
import ManagePosts from './components/ManagePosts';
import ManageOrganizationalChart from './components/ManageOrganizationalChart';
import ManageAcademicContent from './components/ManageAcademicContent';
import FeedbackForm from './components/FeedbackForm';
import ManageFeedback from './components/ManageFeedback';
import AdminDashboard from './components/AdminDashboard';
import AdminLogin from './components/AdminLogin';
import ManageSchoolContent from './components/ManageSchoolContent';
import VisionMission from './components/VisionMission';
import History from './components/History';
import OrganizationalChart from './components/OrganizationalChart';
import PrivacyPolicy from './components/PrivacyPolicy';
import LoadingScreen from './components/LoadingScreen';
import CookieBanner from './components/CookieBanner';
import theme from './theme';

// Protected Route component
const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const isAuthorized = localStorage.getItem('isAdminAuthorized') === 'true';
  return isAuthorized ? <>{children}</> : <Navigate to="/admin-login" />;
};

const App: React.FC = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate loading time
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {loading ? (
        <LoadingScreen />
      ) : (
        <AuthProvider>
          <AnalyticsProvider>
            <SchoolContentProvider>
              <FeedbackProvider>
                <NewsEventsProvider>
                  <OrganizationalChartProvider>
                    <ImportantDatesProvider>
                      <AcademicProgramsProvider>
                        <Router>
                          <div style={{ 
                            minHeight: '100vh',
                            display: 'flex',
                            flexDirection: 'column'
                          }}>
                            <Navbar />
                            <div style={{ flex: 1 }}>
                              <Routes>
                                <Route path="/" element={<HomePage />} />
                                <Route path="/vision-mission" element={<VisionMission />} />
                                <Route path="/history" element={<History />} />
                                <Route path="/organizational-chart" element={<OrganizationalChart />} />
                                <Route path="/academic-programs" element={<AcademicPrograms />} />
                                <Route path="/facilities" element={<Facilities />} />
                                <Route path="/community-engagement" element={<CommunityEngagement />} />
                                <Route path="/challenges-opportunities" element={<ChallengesOpportunities />} />
                                <Route path="/contact" element={<ContactInformation />} />
                                <Route path="/news-events" element={<NewsEvents />} />
                                <Route path="/admission" element={<Admission />} />
                                <Route path="/faqs" element={<FAQs />} />
                                <Route path="/enroll" element={<EnrollmentForm />} />
                                <Route path="/admin-login" element={<AdminLogin />} />
                                
                                {/* Protected Routes */}
                                <Route path="/admin" element={
                                  <ProtectedRoute>
                                    <AdminDashboard />
                                  </ProtectedRoute>
                                } />
                                <Route path="/manage-posts" element={
                                  <ProtectedRoute>
                                    <ManagePosts />
                                  </ProtectedRoute>
                                } />
                                <Route path="/manage-organizational-chart" element={
                                  <ProtectedRoute>
                                    <ManageOrganizationalChart />
                                  </ProtectedRoute>
                                } />
                                <Route path="/manage-academic-content" element={
                                  <ProtectedRoute>
                                    <ManageAcademicContent />
                                  </ProtectedRoute>
                                } />
                                <Route path="/feedback" element={<FeedbackForm />} />
                                <Route path="/manage-feedback" element={
                                  <ProtectedRoute>
                                    <ManageFeedback />
                                  </ProtectedRoute>
                                } />
                                <Route path="/manage-school-content" element={
                                  <ProtectedRoute>
                                    <ManageSchoolContent />
                                  </ProtectedRoute>
                                } />
                                <Route path="/privacy-policy" element={<PrivacyPolicy />} />
                              </Routes>
                            </div>
                            <Footer />
                            {window.location.pathname === '/' && <CookieBanner />}
                          </div>
                        </Router>
                      </AcademicProgramsProvider>
                    </ImportantDatesProvider>
                  </OrganizationalChartProvider>
                </NewsEventsProvider>
              </FeedbackProvider>
            </SchoolContentProvider>
          </AnalyticsProvider>
        </AuthProvider>
      )}
    </ThemeProvider>
  );
};

export default App;
