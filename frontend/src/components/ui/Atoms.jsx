import C from "../../constants/colors";

export function Logo({ size = 32 }) {
  return (
    <div
      style={{
        width: size,
        height: size,
        borderRadius: 14,
        background: "linear-gradient(135deg, #16a34a, #22c55e)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexShrink: 0,
        boxShadow: "0 16px 36px rgba(22,163,74,0.2)",
      }}
    >
      <span style={{ color: "#fff", fontSize: size * 0.58, fontWeight: 800, lineHeight: 1, letterSpacing: "-0.05em" }}>{"R"}</span>
    </div>
  );
}

export function Card({ children, style }) {
  return (
    <div
      style={{
        background: C.white,
        borderRadius: 18,
        border: `1px solid ${C.g200}`,
        padding: 24,
        boxShadow: "0 18px 40px rgba(15, 23, 42, 0.04)",
        ...style,
      }}
    >
      {children}
    </div>
  );
}

export function Spinner({ size = 36 }) {
  return (
    <>
      <style>{`@keyframes _spin{to{transform:rotate(360deg)}}`}</style>
      <div
        style={{
          width: size,
          height: size,
          borderRadius: "50%",
          border: `3px solid ${C.g200}`,
          borderTop: `3px solid ${C.green}`,
          animation: "_spin .8s linear infinite",
        }}
      />
    </>
  );
}

export function Empty({ icon, title, sub }) {
  return (
    <div style={{ textAlign: "center", padding: "60px 24px", color: C.g400 }}>
      <div style={{ fontSize: 44, marginBottom: 12 }}>{icon}</div>
      <div style={{ fontSize: 16, fontWeight: 600, color: C.g600, marginBottom: 6 }}>{title}</div>
      <div style={{ fontSize: 14 }}>{sub}</div>
    </div>
  );
}

export function ScoreRing({ score, size = 120, sw = 10 }) {
  const r = (size - sw) / 2;
  const circ = 2 * Math.PI * r;
  const pct = Math.min(Math.max(score || 0, 0), 100) / 100;
  const color = score >= 80 ? C.green : score >= 60 ? C.amber : C.red;

  return (
    <svg width={size} height={size} style={{ transform: "rotate(-90deg)" }}>
      <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke={C.g100} strokeWidth={sw} />
      <circle
        cx={size / 2}
        cy={size / 2}
        r={r}
        fill="none"
        stroke={color}
        strokeWidth={sw}
        strokeDasharray={circ}
        strokeDashoffset={circ * (1 - pct)}
        strokeLinecap="round"
        style={{ transition: "stroke-dashoffset 1s ease" }}
      />
    </svg>
  );
}

export function Bar({ value, color }) {
  const c = color || (value >= 80 ? C.green : value >= 65 ? C.amber : C.red);

  return (
    <div style={{ height: 6, background: C.g100, borderRadius: 999 }}>
      <div
        style={{
          height: "100%",
          width: `${Math.min(value, 100)}%`,
          background: c,
          borderRadius: 999,
          transition: "width 1s ease",
        }}
      />
    </div>
  );
}

export function Btn({ children, onClick, disabled, variant = "primary", style }) {
  const base = {
    padding: "10px 22px",
    borderRadius: 10,
    border: "none",
    fontWeight: 700,
    fontSize: 14,
    cursor: disabled ? "not-allowed" : "pointer",
    opacity: disabled ? 0.6 : 1,
    fontFamily: "inherit",
    transition: "opacity .15s",
    ...style,
  };

  const vars = {
    primary: { background: C.green, color: C.white },
    outline: { background: C.white, color: C.g700, border: `1.5px solid ${C.g200}` },
  };

  return (
    <button onClick={onClick} disabled={disabled} style={{ ...base, ...vars[variant] }}>
      {children}
    </button>
  );
}

export function Chip({ text }) {
  return (
    <span
      style={{
        display: "inline-block",
        margin: 3,
        padding: "5px 12px",
        borderRadius: 8,
        fontSize: 13,
        fontWeight: 500,
        color: C.g700,
        background: C.g100,
        border: `1px solid ${C.g200}`,
      }}
    >
      {text}
    </span>
  );
}

export function Tag({ text, color, bg }) {
  return (
    <span
      style={{
        display: "inline-block",
        margin: 3,
        padding: "4px 10px",
        borderRadius: 6,
        fontSize: 12,
        fontWeight: 600,
        color,
        background: bg,
      }}
    >
      {text}
    </span>
  );
}

export function PageHeader({ title, sub }) {
  return (
    <div style={{ marginBottom: 24 }}>
      <h1 style={{ fontSize: 26, fontWeight: 800, color: C.g800, margin: 0 }}>{title}</h1>
      {sub && <p style={{ fontSize: 14, color: C.g500, margin: "4px 0 0" }}>{sub}</p>}
    </div>
  );
}

export function ErrorBox({ msg }) {
  return msg ? (
    <div style={{ padding: 14, borderRadius: 10, background: C.redLight, color: C.red, fontSize: 14, marginTop: 12 }}>
      {msg}
    </div>
  ) : null;
}
