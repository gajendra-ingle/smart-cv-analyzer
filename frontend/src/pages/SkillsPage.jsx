import { Card, Chip, Empty, PageHeader, Bar } from "../components/ui/Atoms";

export default function SkillsPage({ data }) {
  if (!data) {
    return (
      <div>
        <PageHeader title="Skills Analysis" sub="Detected skills and relevance analysis." />
        <Empty icon="▦" title="No skills data" sub="Upload a resume first." />
      </div>
    );
  }

  const { skills = [], skillScores = {}, skillCategories = {} } = data;
  const colors = ["#16a34a", "#3b82f6", "#f59e0b", "#8b5cf6", "#ef4444"];

  return (
    <div>
      <PageHeader title="Skills Analysis" sub="AI-detected skills and their relevance." />
      <div className="grid-3col">
        {[
          { label: "Your Skills", count: skills.length, color: "#16a34a" },
          { label: "Matched Skills", count: data.matchedSkillsCount || Math.round(skills.length * 0.75), color: "#3b82f6" },
          { label: "Missing Skills", count: data.missingSkillsCount || 0, color: "#ef4444" },
        ].map((stat) => (
          <Card key={stat.label} style={{ textAlign: "center", padding: 20 }}>
            <div style={{ fontSize: 34, fontWeight: 800, color: stat.color }}>{stat.count}</div>
            <div style={{ fontSize: 13, color: "#6b7280", marginTop: 4 }}>{stat.label}</div>
          </Card>
        ))}
      </div>

      <div className="grid-2col-equal">
        <Card>
          <div style={{ fontWeight: 700, color: "#1f2937", marginBottom: 16 }}>Top Skills</div>
          {skills.slice(0, 10).map((skill, index) => {
            const score = skillScores[skill] || 70;
            return (
              <div key={skill} style={{ marginBottom: 12 }}>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4 }}>
                  <span style={{ fontSize: 14, color: "#374151" }}>{skill}</span>
                  <span style={{ fontSize: 13, fontWeight: 700, color: "#374151" }}>{score}%</span>
                </div>
                <Bar value={score} color={colors[index % colors.length]} />
              </div>
            );
          })}
        </Card>

        <Card>
          <div style={{ fontWeight: 700, color: "#1f2937", marginBottom: 16 }}>Skills by Category</div>
          {Object.keys(skillCategories).length > 0 ? (
            Object.entries(skillCategories).map(([category, items], index) => (
              <div key={category} style={{ marginBottom: 16 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 8, fontSize: 13, fontWeight: 700, color: "#374151" }}>
                  <div style={{ width: 10, height: 10, borderRadius: "50%", background: colors[index % colors.length] }} />
                  {category}
                </div>
                <div style={{ display: "flex", flexWrap: "wrap" }}>
                  {items.map((skill) => (
                    <Chip key={skill} text={skill} />
                  ))}
                </div>
              </div>
            ))
          ) : (
            <Empty icon="▦" title="No categories" sub="Categories will appear after analysis." />
          )}
        </Card>
      </div>
    </div>
  );
}
