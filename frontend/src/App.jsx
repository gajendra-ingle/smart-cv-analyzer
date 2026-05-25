import { useState } from "react";
import Sidebar from "./components/Sidebar";
import DashboardPage from "./pages/DashboardPage";
import UploadPage from "./pages/UploadPage";
import JDMatchPage from "./pages/JDMatchPage";
import SkillsPage from "./pages/SkillsPage";
import ATSPage from "./pages/ATSPage";
import CoverLetterPage from "./pages/CoverLetterPage";
import SuggestionsPage from "./pages/SuggestionsPage";
import AboutPage from "./pages/AboutPage";

export default function App() {
  const [page, setPage] = useState("dashboard");
  const [analysis, setAnalysis] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleAnalyzed = (data) => {
    setAnalysis(data);
    setPage("dashboard");
    setSidebarOpen(false);
  };

  const handleJDResult = (jdResult) => {
    setAnalysis((prev) => (prev ? { ...prev, jdMatch: jdResult } : prev));
  };

  const pages = {
    dashboard: (
      <DashboardPage
        data={analysis}
        onNav={setPage}
        onUpload={() => setPage("upload")}
      />
    ),
    upload: <UploadPage onAnalyzed={handleAnalyzed} />,
    jdmatch: <JDMatchPage data={analysis} onJDResult={handleJDResult} />,
    skills: <SkillsPage data={analysis} />,
    ats: <ATSPage data={analysis} />,
    coverletter: <CoverLetterPage data={analysis} />,
    suggestions: <SuggestionsPage data={analysis} />,
    about: <AboutPage />,
  };

  return (
    <>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link
        rel="preconnect"
        href="https://fonts.gstatic.com"
        crossOrigin="anonymous"
      />
      <link
        href="https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,400;0,9..40,500;0,9..40,600;0,9..40,700;0,9..40,800&display=swap"
        rel="stylesheet"
      />
      <style>{`
      *, *::before, *::after { box-sizing: border-box; }
      html, body, #root { height: 100%; }
      html { scroll-behavior: smooth; }
      body { margin: 0; height: 100%; font-family: 'DM Sans', sans-serif; background: radial-gradient(circle at top, #f0fdf4 0%, #f9fafb 45%, #e5e7eb 100%); color: #111827; overflow: auto; -webkit-overflow-scrolling: touch; }
      #root { min-height: 100%; height: 100%; }
        button { font-family: inherit; }
        .app-shell { display: flex; min-height: 100%; width: min(1320px, calc(100% - 32px)); margin: 0 auto; gap: 24px; padding: 24px 0 32px; }
        .app-sidebar { width: 280px; flex-shrink: 0; background: rgba(255, 255, 255, 0.96); border-radius: 28px; box-shadow: 0 28px 80px rgba(15, 23, 42, 0.08); position: sticky; top: 24px; height: calc(100vh - 48px); overflow: auto; }
        .app-main { flex: 1; min-width: 0; height: calc(100vh - 56px); }
        .app-content { background: rgba(255, 255, 255, 0.95); border-radius: 28px; padding: 32px; box-shadow: 0 28px 80px rgba(15, 23, 42, 0.06); height: 100%; overflow: auto; }
        .page-meta { display: flex; align-items: center; justify-content: space-between; gap: 16px; margin-bottom: 24px; }
        .page-meta h1 { margin: 0; font-size: 26px; font-weight: 900; color: #111827; }
        .page-meta button { appearance: none; border: none; border-radius: 999px; background: #16a34a; color: #fff; padding: 12px 22px; font-weight: 700; cursor: pointer; transition: transform 0.2s ease, box-shadow 0.2s ease; }
        .page-meta button:hover { transform: translateY(-1px); box-shadow: 0 18px 30px rgba(22, 163, 74, 0.18); }
        .app-footer { margin-top: 30px; color: #64748b; font-size: 13px; }
        .sidebar-mobile-toggle { display: none; }
        @media (max-width: 1024px) {
          .app-shell { display: block; width: calc(100% - 24px); padding: 20px 12px 28px; }
          .app-sidebar { width: 100%; height: auto; position: relative; top: 0; margin-bottom: 20px; }
          .app-content { padding: 26px; }
        }
        @media (max-width: 720px) {
          .page-meta { flex-direction: column; align-items: flex-start; }
          .page-meta button { width: 100%; }
        }
      `}</style>
      <div className="app-shell">
        <aside className="app-sidebar">
          <Sidebar active={page} onNav={(pageId) => setPage(pageId)} />
        </aside>

        <main className="app-main">
          <div className="app-content">
            <div className="page-meta">
              <h1>Resume Analyzer AI</h1>
              <button type="button" onClick={() => setPage("upload")}>
                Upload Resume
              </button>
            </div>
            {pages[page] || pages.dashboard}
            <div className="app-footer"></div>
          </div>
        </main>
      </div>
    </>
  );
}
