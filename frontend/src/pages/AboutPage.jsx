import { Card, PageHeader } from "../components/ui/Atoms";
import { Logo } from "../components/ui/Atoms";

export default function AboutPage() {
  return (
    <div>
      <PageHeader title="About" sub="Learn more about Resume Analyzer AI." />
      <Card style={{ maxWidth: 560 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 20 }}>
          <Logo size={56} />
          <div>
            <div style={{ fontSize: 22, fontWeight: 800, color: "#1f2937" }}>Resume Analyzer AI</div>
            <div style={{ fontSize: 14, color: "#16a34a", fontWeight: 700 }}>AI Resume Insights</div>
            <div style={{ fontSize: 13, color: "#6b7280" }}>Version 1.0.0</div>
          </div>
        </div>
        <p style={{ fontSize: 14, color: "#6b7280", lineHeight: 1.7 }}>
          AI-powered resume analysis and optimization platform built with modern web technologies and intelligent automation. Our mission is to help job seekers create better resumes and land their dream jobs.
        </p>
        <div style={{ marginTop: 20, display: "flex", flexDirection: "column", gap: 10 }}>
          {[
            "AI-powered resume scoring",
            "Skill detection and categorization",
            "ATS compatibility analysis",
            "Job description matching",
            "Personalized AI suggestions",
            "Cover letter generation",
          ].map((item) => (
            <div key={item} style={{ display: "flex", gap: 10, fontSize: 14, color: "#374151" }}>
              <span style={{ color: "#16a34a", fontWeight: 700 }}>✓</span>
              {item}
            </div>
          ))}
        </div>
        <div style={{ marginTop: 24, display: "flex", gap: 10, flexWrap: "wrap" }}>
          {[
            "React",
            "Vite",
            "OpenAI GPT-4o",
            "PDF parsing",
          ].map((tag) => (
            <span key={tag} style={{ padding: "6px 14px", borderRadius: 8, border: `1.5px solid #e5e7eb`, fontSize: 13, fontWeight: 600, color: "#374151" }}>
              {tag}
            </span>
          ))}
        </div>
        <div style={{ marginTop: 20, fontSize: 13, color: "#6b7280" }}>Made with ❤️ by Gajendra Ingle</div>
      </Card>
    </div>
  );
}
