import { useState } from "react";
import { Btn, Card, ErrorBox, Empty, PageHeader } from "../components/ui/Atoms";
import { post } from "../services/api";

const fields = [
  { key: "jobTitle", label: "Job Title *", placeholder: "e.g. Backend Developer" },
  { key: "companyName", label: "Company Name *", placeholder: "e.g. Acme Inc." },
  { key: "experienceLevel", label: "Experience Level", placeholder: "e.g. 3-5 Years" },
  { key: "keySkills", label: "Key Skills (comma separated)", placeholder: "Java, React, REST APIs" },
];

export default function CoverLetterPage({ data }) {
  const [form, setForm] = useState({ jobTitle: "", companyName: "", experienceLevel: "", keySkills: "" });
  const [letter, setLetter] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [copied, setCopied] = useState(false);

  const generateLetter = async () => {
    if (!data) {
      setError("Upload a resume first.");
      return;
    }
    if (!form.jobTitle || !form.companyName) {
      setError("Job title and company name are required.");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await post("/cover-letter", { resumeText: data.resumeText, ...form });
      setLetter(response.letter);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const copyLetter = () => {
    if (!letter) return;
    navigator.clipboard.writeText(letter);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div>
      <PageHeader title="Cover Letter AI" sub="Generate personalized cover letters using AI." />
      <div className="grid-responsive">
        <Card>
          <div style={{ fontWeight: 700, color: "#1f2937", marginBottom: 16 }}>Generate Cover Letter</div>
          {fields.map((field) => (
            <div key={field.key} style={{ marginBottom: 14 }}>
              <label style={{ fontSize: 13, fontWeight: 600, color: "#374151", display: "block", marginBottom: 6 }}>{field.label}</label>
              <input
                value={form[field.key]}
                onChange={(event) => setForm((prev) => ({ ...prev, [field.key]: event.target.value }))}
                placeholder={field.placeholder}
                style={{
                  width: "100%",
                  padding: "10px 14px",
                  borderRadius: 8,
                  border: `1.5px solid #e5e7eb`,
                  fontSize: 14,
                  color: "#374151",
                  fontFamily: "inherit",
                  outline: "none",
                  boxSizing: "border-box",
                }}
              />
            </div>
          ))}
          <ErrorBox msg={error} />
          <Btn onClick={generateLetter} disabled={loading} style={{ width: "100%", marginTop: 8 }}>
            {loading ? "Generating…" : "Generate Cover Letter"}
          </Btn>
        </Card>

        {letter ? (
          <Card>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 14 }}>
              <div style={{ fontWeight: 700, color: "#1f2937" }}>Generated Cover Letter</div>
              <Btn variant="outline" onClick={copyLetter} style={{ padding: "7px 16px" }}>
                {copied ? "✓ Copied!" : "📋 Copy"}
              </Btn>
            </div>
            <div style={{ padding: 18, borderRadius: 10, background: "#f9fafb", border: `1px solid #e5e7eb`, fontSize: 14, color: "#374151", lineHeight: 1.75, whiteSpace: "pre-wrap", maxHeight: 480, overflowY: "auto" }}>
              {letter}
            </div>
          </Card>
        ) : (
          <Card style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
            <Empty icon="✎" title="Your cover letter will appear here" sub="Fill in the details and click Generate Cover Letter." />
          </Card>
        )}
      </div>
    </div>
  );
}
