export default function Column({ title, count, accent, badgeBg, children }) {
  return (
    <div style={{
      background: '#fff',
      border: '0.5px solid #E5E2DC',
      borderRadius: 14,
      overflow: 'hidden',
    }}>
      {/* Column header */}
      <div style={{
        padding: '12px 16px',
        borderBottom: '0.5px solid #E5E2DC',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}>
        <span style={{ fontSize: 12, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.06em', color: accent }}>
          {title}
        </span>
        <span style={{ fontSize: 11, fontWeight: 500, padding: '2px 8px', borderRadius: 10, background: badgeBg, color: accent }}>
          {count}
        </span>
      </div>

      {/* Column body */}
      <div style={{ padding: 10, display: 'flex', flexDirection: 'column', gap: 7, minHeight: 120 }}>
        {children}
      </div>
    </div>
  );
}