import { useState } from "react";

const S = {
  wrap: {
    background: "#fff",
    border: "0.5px solid #E5E2DC",
    borderRadius: 14,
    padding: "1.1rem",
    marginBottom: "1.5rem",
  },
  row: { display: "flex", gap: 8, marginBottom: 7 },
  inp: {
    width: "100%",
    background: "#F7F5F0",
    border: "1px solid #D0CCBF",
    borderRadius: 8,
    padding: "8px 12px",
    fontSize: 13,
    fontFamily: "'DM Sans', sans-serif",
    color: "#1A1916",
    outline: "none",
  },
  btn: {
    background: "#2A6B4F",
    color: "#fff",
    border: "none",
    borderRadius: 8,
    padding: "8px 18px",
    fontSize: 13,
    fontWeight: 500,
    fontFamily: "'DM Sans', sans-serif",
    cursor: "pointer",
    whiteSpace: "nowrap",
  },
};

export default function TodoForm({ onAdd }) {
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title.trim()) return setError("Title is required.");
    setError("");
    setLoading(true);
    try {
      await onAdd({ title: title.trim(), description: desc.trim() });
      setTitle("");
      setDesc("");
    } catch {
      setError("Failed to create todo. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={S.wrap}>
      <form onSubmit={handleSubmit}>
        <div style={S.row}>
          <input
            style={S.inp}
            placeholder="What needs to be done? *"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <button
            type="submit"
            disabled={loading}
            style={{ ...S.btn, opacity: loading ? 0.6 : 1 }}
          >
            {loading ? "Adding..." : "+ Add"}
          </button>
        </div>
        <textarea
          style={{ ...S.inp, resize: "none", height: 52 }}
          placeholder="Description (optional)"
          value={desc}
          onChange={(e) => setDesc(e.target.value)}
        />
        {error && (
          <p style={{ color: "#C84B1F", fontSize: 12, marginTop: 4 }}>
            {error}
          </p>
        )}
      </form>
    </div>
  );
}
