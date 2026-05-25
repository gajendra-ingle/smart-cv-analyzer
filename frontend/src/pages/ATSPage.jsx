import { Card, Empty, PageHeader, ScoreRing, Bar } from "../components/ui/Atoms";

export default function ATSPage({ data }) {
  if (!data) {
    return (
      <div>
        <PageHeader title="ATS Check" sub="Check ATS compatibility and get improvement tips." />
        <Empty icon="⛨" title="No ATS data" sub="Upload a resume first." />
      </div>
    );
  }

  const { atsScore = 0, atsChecks = [], atsRecommendations = [] } = data;

  return (
    <div>
      <PageHeader title="ATS Check" sub="Check ATS compatibility and get improvement tips." />
      <div className="ats-grid">
        <Card style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", minHeight: 260 }}>
          <div className="score-wrap" style={{ position: "relative", marginBottom: 18 }}>
            <ScoreRing score={atsScore} size={160} sw={13} />
            <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
              <span style={{ fontSize: 40, fontWeight: 800, color: "#16a34a" }}>{atsScore}</span>
              <span style={{ fontSize: 13, color: "#6b7280" }}>/ 100</span>
            </div>
          </div>
          <div style={{ fontSize: 18, fontWeight: 700, color: "#16a34a" }}>
            {atsScore >= 80 ? "ATS Friendly" : atsScore >= 60 ? "Partially Optimized" : "Needs Work"}
          </div>
          <div style={{ fontSize: 13, color: "#6b7280", textAlign: "center", marginTop: 6, maxWidth: 220 }}>
            {atsScore >= 80 ? "Your resume is optimized for Applicant Tracking Systems." : "Improve your ATS score by following the recommendations."}
          </div>
        </Card>

        <Card>
          <div style={{ fontWeight: 700, color: "#1f2937", marginBottom: 16 }}>ATS Compatibility Checks</div>
          {atsChecks.length === 0 ? (
            <Empty icon="⛨" title="No checks available" sub="" />
          ) : (
            atsChecks.map((check) => (
              <div key={check.label} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "12px 0", borderBottom: `1px solid #f3f4f6` }}>
                <span style={{ fontSize: 14, color: "#374151" }}>{check.label}</span>
                <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                  <span style={{ fontSize: 13, color: "#6b7280" }}>{check.value}</span>
                  <span style={{ color: check.pass ? "#16a34a" : "#ef4444", fontWeight: 700, fontSize: 18 }}>
                    {check.pass ? "✓" : "✗"}
                  </span>
                </div>
              </div>
            ))
          )}
        </Card>

        {atsRecommendations.length > 0 && (
          <Card style={{ gridColumn: "1 / -1" }}>
            <div style={{ fontWeight: 700, color: "#1f2937", marginBottom: 14 }}>Recommendations</div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))", gap: 12 }}>
              {atsRecommendations.map((recommendation, index) => (
                <div key={index} style={{ padding: 14, borderRadius: 10, background: "#f9fafb", border: `1px solid #e5e7eb`, fontSize: 14, color: "#6b7280", display: "flex", gap: 8 }}>
                  <span style={{ color: "#f59e0b", flexShrink: 0 }}>•</span>
                  {recommendation}
                </div>
              ))}
            </div>
          </Card>
        )}
      </div>
    </div>
  );
}
