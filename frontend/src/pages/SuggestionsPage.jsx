import { useState } from "react";
import { Card, Empty, PageHeader } from "../components/ui/Atoms";

const SUGGESTION_TYPES = ["All", "Strength", "Improve", "Suggestion", "Enhance"];

export default function SuggestionsPage({ data }) {
  const [filter, setFilter] = useState("All");

  if (!data) {
    return (
      <div>
        <PageHeader title="AI Suggestions" sub="AI-powered suggestions to improve your resume." />
        <Empty icon="✦" title="No suggestions yet" sub="Upload a resume first." />
      </div>
    );
  }

  const list = filter === "All" ? data.suggestions : data.suggestions.filter((item) => item.type === filter);

  return (
    <div>
      <PageHeader title="AI Suggestions" sub="Personalized AI-powered suggestions to improve your resume." />
      <Card>
        <div style={{ display: "flex", gap: 8, marginBottom: 20, flexWrap: "wrap" }}>
          {SUGGESTION_TYPES.map((item) => {
            const count = item === "All" ? data.suggestions.length : data.suggestions.filter((s) => s.type === item).length;
            const active = filter === item;

            return (
              <button
                key={item}
                onClick={() => setFilter(item)}
                style={{
                  padding: "6px 16px",
                  borderRadius: 8,
                  border: `1.5px solid ${active ? "#16a34a" : "#e5e7eb"}`,
                  background: active ? "#dcfce7" : "#ffffff",
                  color: active ? "#16a34a" : "#6b7280",
                  fontWeight: 600,
                  fontSize: 13,
                  cursor: "pointer",
                  fontFamily: "inherit",
                }}
              >
                {item} ({count})
              </button>
            );
          })}
        </div>

        {list.length === 0 ? (
          <Empty icon="✦" title="No suggestions of this type" sub="Try a different filter." />
        ) : (
          list.map((item, index) => (
            <div
              key={index}
              style={{
                padding: "16px 20px",
                borderRadius: 10,
                background: "#eff6ff",
                marginBottom: 10,
                display: "flex",
                alignItems: "flex-start",
                gap: 14,
                border: `1px solid #3b82f622`,
              }}
            >
              <span style={{ fontSize: 20, color: "#3b82f6", fontWeight: 700 }}>ℹ</span>
              <div>
                <div style={{ fontSize: 14, fontWeight: 700, color: "#3b82f6", marginBottom: 4 }}>{item.type}</div>
                <div style={{ fontSize: 14, color: "#374151" }}>{item.text}</div>
              </div>
            </div>
          ))
        )}
      </Card>
    </div>
  );
}
