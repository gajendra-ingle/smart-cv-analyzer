import { Logo } from "./ui/Atoms";
import C from "../constants/colors";

const navItems = [
  { id: "dashboard", label: "Dashboard", icon: "⊞" },
  { id: "upload", label: "Upload Resume", icon: "↑" },
  { id: "jdmatch", label: "Job Description Match", icon: "◎" },
  { id: "skills", label: "Skills Analysis", icon: "▦" },
  { id: "ats", label: "ATS Check", icon: "⛨" },
  { id: "coverletter", label: "Cover Letter AI", icon: "✎" },
  { id: "suggestions", label: "AI Suggestions", icon: "✦" },
  { id: "about", label: "About", icon: "ⓘ" },
];

export default function Sidebar({ active, onNav }) {
  return (
    <div className="app-sidebar">
      <div style={{ padding: "26px 22px 20px", borderBottom: `1px solid ${C.g100}` }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <Logo size={42} />
          <div>
            <div style={{ fontSize: 16, fontWeight: 800, color: C.g800, lineHeight: 1.2 }}>Resume Analyzer AI</div>
            <div style={{ fontSize: 12, color: C.green, fontWeight: 700, marginTop: 4 }}>AI Resume Insights</div>
          </div>
        </div>
      </div>

      <nav style={{ flex: 1, padding: "16px 14px", overflowY: "auto" }}>
        {navItems.map((item) => {
          const isActive = active === item.id;
          return (
            <button
              key={item.id}
              type="button"
              onClick={() => onNav(item.id)}
              aria-current={isActive ? "page" : undefined}
              className="nav-button"
              style={{
                display: "flex",
                alignItems: "center",
                gap: 10,
                width: "100%",
                borderRadius: 14,
                border: "none",
                cursor: "pointer",
                background: isActive ? C.greenLight : "transparent",
                color: isActive ? C.green : C.g700,
                fontWeight: isActive ? 700 : 500,
                fontSize: 14,
                textAlign: "left",
                marginBottom: 6,
                padding: "12px 14px",
                transition: "all .18s ease",
                boxShadow: isActive ? "inset 0 0 0 1px rgba(22,163,74,0.08)" : "none",
                fontFamily: "inherit",
              }}
            >
              <span style={{ fontSize: 16, width: 22, textAlign: "center" }}>{item.icon}</span>
              <span>{item.label}</span>
            </button>
          );
        })}
      </nav>
    </div>
  );
}
