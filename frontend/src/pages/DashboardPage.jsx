import { Card, Chip, Empty, PageHeader, ScoreRing, Bar, Btn } from "../components/ui/Atoms";

const SUGGESTION_CONFIG = {
  Strength: { icon: "✓", color: "#16a34a", bg: "#dcfce7" },
  Improve: { icon: "⚠", color: "#f59e0b", bg: "#fef3c7" },
  Suggestion: { icon: "ℹ", color: "#3b82f6", bg: "#eff6ff" },
  Enhance: { icon: "★", color: "#8b5cf6", bg: "#f5f3ff" },
};

export default function DashboardPage({ data, onNav, onUpload }) {
  if (!data) {
    return (
      <div>
        <PageHeader title="Dashboard" sub="Get AI-powered insights and improve your resume." />
        <Card style={{ maxWidth: 560 }}>
          <Empty icon="📄" title="No resume analyzed yet" sub="Upload a resume to see your dashboard." />
          <div style={{ textAlign: "center", paddingBottom: 8 }}>
            <Btn onClick={onUpload}>Upload Resume</Btn>
          </div>
        </Card>
      </div>
    );
  }

  const { fileName, fileSize, analyzedAt, overallScore = 0, scores = {}, skills = [], suggestions = [], atsScore = 0, jdMatch } = data;
  const scoreColor = overallScore >= 80 ? "#16a34a" : overallScore >= 60 ? "#f59e0b" : "#ef4444";
  const scoreLabel = overallScore >= 80 ? "Excellent" : overallScore >= 70 ? "Good" : overallScore >= 60 ? "Average" : "Needs Work";

  return (
    <div>
      <PageHeader title="Dashboard" sub="Get AI-powered insights and improve your resume." />
      <div className="grid-2col">
        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          <Card>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 20 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                <div
                  style={{
                    width: 42,
                    height: 42,
                    borderRadius: 10,
                    background: "#fef2f2",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: 20,
                  }}
                >
                  📄
                </div>
                <div>
                  <div style={{ fontWeight: 700, color: "#1f2937", fontSize: 15 }}>{fileName}</div>
                  <div style={{ fontSize: 12, color: "#6b7280" }}>
                    Uploaded {new Date(analyzedAt).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })} · {fileSize}
                  </div>
                </div>
              </div>
              <span style={{ padding: "5px 14px", borderRadius: 999, background: "#dcfce7", color: "#16a34a", fontSize: 13, fontWeight: 600 }}>
                ✓ Analysis Complete
              </span>
            </div>

            <div style={{ display: "flex", gap: 28, alignItems: "center" }}>
              <div style={{ position: "relative", flexShrink: 0 }}>
                <ScoreRing score={overallScore} size={130} sw={11} />
                <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
                  <span style={{ fontSize: 30, fontWeight: 800, color: scoreColor }}>{overallScore}</span>
                  <span style={{ fontSize: 11, color: "#6b7280" }}>/ 100</span>
                </div>
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 18, fontWeight: 700, color: "#1f2937", marginBottom: 2 }}>Overall Score</div>
                <div style={{ fontSize: 15, fontWeight: 700, color: scoreColor, marginBottom: 4 }}>{scoreLabel}</div>
                <div style={{ fontSize: 13, color: "#6b7280", marginBottom: 14 }}>
                  Your resume is well-structured but has some areas to improve.
                </div>
                {Object.entries(scores).map(([key, value]) => (
                  <div key={key} style={{ marginBottom: 10 }}>
                    <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4 }}>
                      <span style={{ fontSize: 13, color: "#6b7280" }}>{key}</span>
                      <span style={{ fontSize: 13, fontWeight: 700, color: "#374151" }}>{value}/100</span>
                    </div>
                    <Bar value={value} />
                  </div>
                ))}
              </div>
            </div>
          </Card>

          <Card>
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 16 }}>
              <span style={{ fontSize: 18 }}>✦</span>
              <span style={{ fontWeight: 700, fontSize: 15, color: "#1f2937" }}>AI Suggestions</span>
            </div>
            {suggestions.slice(0, 4).map((suggestion, index) => {
              const cfg = SUGGESTION_CONFIG[suggestion.type] || SUGGESTION_CONFIG.Suggestion;
              return (
                <div
                  key={index}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    padding: "13px 16px",
                    borderRadius: 10,
                    background: cfg.bg,
                    marginBottom: 8,
                    cursor: "pointer",
                  }}
                  onClick={() => onNav("suggestions")}
                >
                  <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                    <span style={{ color: cfg.color, fontSize: 16, fontWeight: 700 }}>{cfg.icon}</span>
                    <div>
                      <div style={{ fontSize: 13, fontWeight: 700, color: cfg.color }}>{suggestion.type}</div>
                      <div style={{ fontSize: 13, color: "#6b7280" }}>{suggestion.text}</div>
                    </div>
                  </div>
                  <span style={{ color: cfg.color }}>›</span>
                </div>
              );
            })}
            <button
              onClick={() => onNav("suggestions")}
              style={{
                background: "none",
                border: "none",
                color: "#16a34a",
                fontWeight: 600,
                fontSize: 13,
                cursor: "pointer",
                padding: "4px 0",
                fontFamily: "inherit",
              }}
            >
              View all suggestions →
            </button>
          </Card>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          <Card>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 12 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <span style={{ fontSize: 18 }}>🤖</span>
                <span style={{ fontWeight: 700, fontSize: 14, color: "#1f2937" }}>Key Skills Detected</span>
              </div>
              <span style={{ padding: "3px 10px", borderRadius: 999, background: "#dcfce7", color: "#16a34a", fontSize: 13, fontWeight: 700 }}>
                {skills.length}
              </span>
            </div>
            <div style={{ display: "flex", flexWrap: "wrap" }}>
              {skills.map((skill) => (
                <Chip key={skill} text={skill} />
              ))}
            </div>
            <button
              onClick={() => onNav("skills")}
              style={{
                background: "none",
                border: "none",
                color: "#16a34a",
                fontWeight: 600,
                fontSize: 13,
                cursor: "pointer",
                padding: "8px 0 0",
                fontFamily: "inherit",
              }}
            >
              View full skills analysis →
            </button>
          </Card>

          <Card>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 10 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <span style={{ fontSize: 18 }}>◎</span>
                <span style={{ fontWeight: 700, fontSize: 14, color: "#1f2937" }}>Job Description Match</span>
              </div>
              {jdMatch && (
                <span style={{ padding: "3px 10px", borderRadius: 8, background: "#16a34a", color: "#ffffff", fontWeight: 700, fontSize: 14 }}>
                  {jdMatch.score}%
                </span>
              )}
            </div>
            {jdMatch ? (
              <>
                <div style={{ fontSize: 14, fontWeight: 700, color: "#16a34a", marginBottom: 4 }}>{jdMatch.label}</div>
                <div style={{ fontSize: 13, color: "#6b7280", marginBottom: 10 }}>{jdMatch.summary}</div>
                <Bar value={jdMatch.score} color="#16a34a" />
              </>
            ) : (
              <div style={{ fontSize: 13, color: "#9ca3af" }}>Paste a job description to see your match score.</div>
            )}
            <button
              onClick={() => onNav("jdmatch")}
              style={{
                background: "none",
                border: "none",
                color: "#16a34a",
                fontWeight: 600,
                fontSize: 13,
                cursor: "pointer",
                padding: "8px 0 0",
                fontFamily: "inherit",
              }}
            >
              {jdMatch ? "View match details →" : "Match now →"}
            </button>
          </Card>

          <Card>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 10 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <span style={{ fontSize: 18 }}>⛨</span>
                <span style={{ fontWeight: 700, fontSize: 14, color: "#1f2937" }}>ATS Check</span>
              </div>
              <span style={{ padding: "3px 10px", borderRadius: 8, background: "#16a34a", color: "#ffffff", fontWeight: 700, fontSize: 14 }}>
                {atsScore}%
              </span>
            </div>
            <div style={{ fontSize: 14, fontWeight: 700, color: "#16a34a", marginBottom: 4 }}>
              {atsScore >= 80 ? "ATS Friendly" : atsScore >= 60 ? "Partially Optimized" : "Needs Improvement"}
            </div>
            <div style={{ fontSize: 13, color: "#6b7280", marginBottom: 10 }}>
              Your resume is optimized for Applicant Tracking Systems.
            </div>
            <Bar value={atsScore} color="#16a34a" />
            <button
              onClick={() => onNav("ats")}
              style={{
                background: "none",
                border: "none",
                color: "#16a34a",
                fontWeight: 600,
                fontSize: 13,
                cursor: "pointer",
                padding: "8px 0 0",
                fontFamily: "inherit",
              }}
            >
              View ATS report →
            </button>
          </Card>
        </div>
      </div>
    </div>
  );
}
