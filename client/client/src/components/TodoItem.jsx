import { useState } from 'react';

const inp = {
  width: '100%',
  background: '#F7F5F0',
  border: '1px solid #D0CCBF',
  borderRadius: 7,
  padding: '6px 9px',
  fontSize: 12,
  fontFamily: "'DM Sans', sans-serif",
  color: '#1A1916',
  outline: 'none',
};

const EditIcon = () => (
  <svg width="12" height="12" viewBox="0 0 16 16" fill="none">
    <path d="M11 2l3 3-9 9H2v-3L11 2z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round"/>
  </svg>
);

const TrashIcon = () => (
  <svg width="11" height="11" viewBox="0 0 16 16" fill="none">
    <path d="M3 4h10M6 4V3h4v1M5 4l.5 9h5L11 4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const CheckIcon = () => (
  <svg width="9" height="7" viewBox="0 0 10 8" fill="none">
    <path d="M1 4L3.5 6.5L9 1" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

export default function TodoItem({ todo, onToggle, onEdit, onDelete }) {
  const [editing, setEditing] = useState(false);
  const [title,   setTitle]   = useState(todo.title);
  const [desc,    setDesc]    = useState(todo.description || '');
  const [hovered, setHovered] = useState(false);

  const save = async () => {
    if (!title.trim()) return;
    await onEdit(todo._id, { title: title.trim(), description: desc.trim() });
    setEditing(false);
  };

  const cancelEdit = () => {
    setTitle(todo.title);
    setDesc(todo.description || '');
    setEditing(false);
  };

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: '#F7F5F0',
        border: '0.5px solid #E5E2DC',
        borderRadius: 10,
        padding: '11px 12px',
        position: 'relative',
        overflow: 'hidden',
        transition: 'box-shadow 0.15s',
        boxShadow: hovered ? '0 2px 8px rgba(0,0,0,0.07)' : 'none',
      }}
    >
      {/* Accent bar */}
      <div style={{
        position: 'absolute', left: 0, top: 10, bottom: 10, width: 3,
        background: todo.done ? '#D0CCBF' : '#2A6B4F',
        borderRadius: '0 2px 2px 0',
        transition: 'background 0.2s',
      }} />

      <div style={{ display: 'flex', alignItems: 'flex-start', gap: 8 }}>

        {/* Circle checkbox */}
        <div
          onClick={() => onToggle(todo._id)}
          title={todo.done ? 'Mark as todo' : 'Mark as done'}
          style={{
            width: 17, height: 17, borderRadius: '50%',
            border: `1.5px solid ${todo.done ? '#2A6B4F' : '#D0CCBF'}`,
            background: todo.done ? '#2A6B4F' : 'transparent',
            cursor: 'pointer', flexShrink: 0, marginTop: 1,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            transition: 'all 0.15s',
          }}
        >
          {todo.done && <CheckIcon />}
        </div>

        {/* Content */}
        <div style={{ flex: 1, minWidth: 0 }}>
          {editing ? (
            <>
              <input
                style={inp}
                value={title}
                onChange={e => setTitle(e.target.value)}
                autoFocus
              />
              <textarea
                style={{ ...inp, resize: 'none', height: 44, marginTop: 5 }}
                value={desc}
                placeholder="Description"
                onChange={e => setDesc(e.target.value)}
              />
              <div style={{ display: 'flex', gap: 5, marginTop: 6 }}>
                <button onClick={save} style={{ background: '#2A6B4F', color: '#fff', border: 'none', borderRadius: 6, padding: '5px 12px', fontSize: 11, fontWeight: 500, cursor: 'pointer', fontFamily: "'DM Sans',sans-serif" }}>
                  Save
                </button>
                <button onClick={cancelEdit} style={{ background: '#F0EDE7', color: '#7A776E', border: '0.5px solid #E5E2DC', borderRadius: 6, padding: '5px 12px', fontSize: 11, cursor: 'pointer', fontFamily: "'DM Sans',sans-serif" }}>
                  Cancel
                </button>
              </div>
            </>
          ) : (
            <>
              <div style={{
                fontSize: 13, fontWeight: 500, lineHeight: 1.35,
                color: todo.done ? '#B0ADA6' : '#1A1916',
                textDecoration: todo.done ? 'line-through' : 'none',
              }}>
                {todo.title}
              </div>
              {todo.description && (
                <div style={{ fontSize: 11, color: '#7A776E', marginTop: 2, lineHeight: 1.45 }}>
                  {todo.description}
                </div>
              )}
              <div style={{ fontSize: 10, color: '#C0BDB6', marginTop: 5 }}>
                {new Date(todo.createdAt).toLocaleDateString()}
              </div>
            </>
          )}
        </div>

        {/* Hover action buttons */}
        {!editing && (
          <div style={{ display: 'flex', gap: 3, opacity: hovered ? 1 : 0, transition: 'opacity 0.15s', flexShrink: 0 }}>
            <button
              onClick={() => setEditing(true)}
              title="Edit"
              style={{ background: 'transparent', border: 'none', borderRadius: 5, width: 24, height: 24, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#7A776E' }}
            >
              <EditIcon />
            </button>
            <button
              onClick={() => onDelete(todo._id)}
              title="Delete"
              style={{ background: 'transparent', border: 'none', borderRadius: 5, width: 24, height: 24, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#7A776E' }}
            >
              <TrashIcon />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}