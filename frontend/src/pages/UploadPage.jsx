import { useCallback, useRef, useState } from "react";
import { Btn, Card, ErrorBox, PageHeader, Spinner } from "../components/ui/Atoms";
import { post } from "../services/api";

export default function UploadPage({ onAnalyzed }) {
  const [drag, setDrag] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const ref = useRef();

  const processFile = useCallback(
    async (file) => {
      if (!file) return;
      if (file.type !== "application/pdf") {
        setError("Only PDF files are supported.");
        return;
      }
      if (file.size > 10 * 1024 * 1024) {
        setError("File size must be under 10 MB.");
        return;
      }

      setError(null);
      setLoading(true);

      try {
        const formData = new FormData();
        formData.append("file", file);
        const data = await post("/analyze", formData, true);
        onAnalyzed(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    },
    [onAnalyzed]
  );

  return (
    <div>
      <PageHeader title="Upload Resume" sub="Upload your PDF resume and let AI analyze it for you." />
      <Card style={{ maxWidth: 620 }}>
        <div
          onDragOver={(event) => {
            event.preventDefault();
            setDrag(true);
          }}
          onDragLeave={() => setDrag(false)}
          onDrop={(event) => {
            event.preventDefault();
            setDrag(false);
            processFile(event.dataTransfer.files[0]);
          }}
          onClick={() => !loading && ref.current.click()}
          style={{
            border: `2px dashed ${drag ? "#16a34a" : "#d1d5db"}`,
            borderRadius: 14,
            padding: "56px 24px",
            textAlign: "center",
            cursor: loading ? "default" : "pointer",
            background: drag ? "#dcfce7" : "#f9fafb",
            transition: "all .2s",
          }}
        >
          <input
            ref={ref}
            type="file"
            accept=".pdf"
            style={{ display: "none" }}
            onChange={(event) => processFile(event.target.files[0])}
          />

          {loading ? (
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 16 }}>
              <Spinner />
              <div style={{ color: "#4b5563", fontWeight: 600 }}>Analyzing your resume…</div>
            </div>
          ) : (
            <>
              <div style={{ fontSize: 48, marginBottom: 14 }}>📄</div>
              <div style={{ fontSize: 16, fontWeight: 700, color: "#374151", marginBottom: 8 }}>
                Drag & drop your resume here
              </div>
              <div style={{ fontSize: 13, color: "#9ca3af", marginBottom: 18 }}>or</div>
              <Btn onClick={(event) => { event.stopPropagation(); ref.current.click(); }}>
                Browse Files
              </Btn>
              <div style={{ fontSize: 12, color: "#9ca3af", marginTop: 14 }}>Only PDF files supported (Max 10 MB)</div>
            </>
          )}
        </div>

        <ErrorBox msg={error} />

        <div style={{ marginTop: 24 }}>
          <div style={{ fontWeight: 700, color: "#1f2937", marginBottom: 10, fontSize: 14 }}>Tips for better analysis</div>
          {[
            "Use a clean, readable format",
            "Ensure experience and skills are clearly mentioned",
            "Keep your resume up to date",
          ].map((tip) => (
            <div key={tip} style={{ display: "flex", gap: 8, marginBottom: 6, fontSize: 13, color: "#6b7280" }}>
              <span style={{ color: "#16a34a" }}>•</span>
              {tip}
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
