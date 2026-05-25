import { useState } from "react";
import { Btn, Card, ErrorBox, Empty, PageHeader, ScoreRing, Bar, Tag } from "../components/ui/Atoms";
import { post } from "../services/api";

export default function JDMatchPage({ data, onJDResult }) {
  const [jd, setJd] = useState("");
  const [result, setResult] = useState(data?.jdMatch || null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const matchResume = async () => {
    if (!jd.trim()) return;
    if (!data) {
      setError("Upload a resume first.");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await post("/jd-match", { resumeText: data.resumeText, jobDescription: jd });
      setResult(response);
      onJDResult(response);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const scoreColor = result ? (result.score >= 80 ? "#16a34a" : result.score >= 60 ? "#f59e0b" : "#ef4444") : "#16a34a";

  return (
    <div>
      <PageHeader title="Job Description Match" sub="Match your resume with a job description." />
      <div className="grid-2col">
        <Card>
          <div style={{ fontWeight: 700, color: "#1f2937", marginBottom: 12 }}>Paste Job Description</div>
          <textarea
            value={jd}
            onChange={(event) => setJd(event.target.value)}
            placeholder="Paste the full job description here…"
            style={{
              width: "100%",
              height: 220,
              padding: 14,
              borderRadius: 10,
              border: `1.5px solid #e5e7eb`,
              fontSize: 14,
              color: "#374151",
              resize: "vertical",
              fontFamily: "inherit",
              outline: "none",
              boxSizing: "border-box",
            }}
          />
          <ErrorBox msg={error} />
          <Btn onClick={matchResume} disabled={loading || !jd.trim()} style={{ marginTop: 14 }}>
            {loading ? "Matching…" : "Match Resume"}
          </Btn>
        </Card>

        {result ? (
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            <Card>
              <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 16 }}>
                <div style={{ position: "relative" }}>
                  <ScoreRing score={result.score} size={90} sw={8} />
                  <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
                    <span style={{ fontSize: 20, fontWeight: 800, color: scoreColor }}>{result.score}%</span>
                  </div>
                </div>
                <div>
                  <div style={{ fontSize: 15, fontWeight: 700, color: "#1f2937" }}>Match Score</div>
                  <div style={{ fontSize: 16, fontWeight: 700, color: scoreColor }}>{result.label}</div>
                  <div style={{ fontSize: 13, color: "#6b7280", marginTop: 4 }}>{result.summary}</div>
                </div>
              </div>
              <Bar value={result.score} color={scoreColor} />
            </Card>

            {result.matchedSkills?.length > 0 && (
              <Card>
                <div style={{ fontWeight: 700, color: "#1f2937", marginBottom: 10 }}>Matched Skills</div>
                <div style={{ display: "flex", flexWrap: "wrap" }}>
                  {result.matchedSkills.map((skill) => (
                    <Tag key={skill} text={skill} color="#16a34a" bg="#dcfce7" />
                  ))}
                </div>
              </Card>
            )}

            {result.missingSkills?.length > 0 && (
              <Card>
                <div style={{ fontWeight: 700, color: "#1f2937", marginBottom: 10 }}>Missing Skills</div>
                <div style={{ display: "flex", flexWrap: "wrap" }}>
                  {result.missingSkills.map((skill) => (
                    <Tag key={skill} text={skill} color="#ef4444" bg="#fef2f2" />
                  ))}
                </div>
              </Card>
            )}

            {result.topPoints?.length > 0 && (
              <Card>
                <div style={{ fontWeight: 700, color: "#1f2937", marginBottom: 10 }}>Top Matched Points</div>
                {result.topPoints.map((point, index) => (
                  <div key={index} style={{ display: "flex", gap: 8, marginBottom: 8, fontSize: 13, color: "#6b7280" }}>
                    <span style={{ color: "#16a34a" }}>✓</span>
                    {point}
                  </div>
                ))}
              </Card>
            )}
          </div>
        ) : (
          <Card style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
            <Empty icon="◎" title="Results will appear here" sub="Paste a job description and click Match Resume." />
          </Card>
        )}
      </div>
    </div>
  );
}
