import { useTodos } from './hooks/useTodos';
import TodoForm    from './components/TodoForm';
import TodoItem    from './components/TodoItem';
import Column      from './components/Column';

function Empty({ text }) {
  return (
    <p style={{ textAlign: 'center', padding: '2rem 1rem', color: '#C0BDB6', fontSize: 12 }}>
      {text}
    </p>
  );
}

export default function App() {
  const { todos, loading, error, add, edit, toggle, remove } = useTodos();

  const pending = todos.filter(t => !t.done);
  const done    = todos.filter(t => t.done);
  const pct     = todos.length ? Math.round((done.length / todos.length) * 100) : 0;

  return (
    <div style={{ maxWidth: 700, margin: '0 auto', padding: '2rem 1.25rem', fontFamily: "'DM Sans', sans-serif" }}>

      {/* Header */}
      <div style={{ marginBottom: '1.5rem' }}>
        <h1 style={{ fontFamily: "'Instrument Serif', serif", fontSize: '2rem', fontWeight: 400, color: '#1A1916', letterSpacing: '-0.5px' }}>
          My <em style={{ fontStyle: 'italic', color: '#2A6B4F' }}>todos</em>
        </h1>
        <p style={{ fontSize: 13, color: '#7A776E', marginTop: 3 }}>
          Stay organised. Get things done.
        </p>
      </div>

      {/* Stats row */}
      <div style={{ display: 'flex', gap: 8, marginBottom: '1.25rem' }}>
        {[
          ['Total',   todos.length,    '#1A1916'],
          ['Done',    done.length,     '#2A6B4F'],
          ['Pending', pending.length,  '#1A1916'],
        ].map(([label, num, color]) => (
          <div key={label} style={{ background: '#fff', border: '0.5px solid #E5E2DC', borderRadius: 10, padding: '9px 14px', flex: 1, textAlign: 'center' }}>
            <div style={{ fontSize: '1.3rem', fontWeight: 600, color, lineHeight: 1 }}>{num}</div>
            <div style={{ fontSize: 10, color: '#7A776E', marginTop: 2, textTransform: 'uppercase', letterSpacing: '0.04em' }}>{label}</div>
          </div>
        ))}
      </div>

      {/* Progress bar */}
      <div style={{ marginBottom: '1.4rem' }}>
        <div style={{ height: 4, background: '#E5E2DC', borderRadius: 2, overflow: 'hidden' }}>
          <div style={{ height: '100%', width: `${pct}%`, background: '#2A6B4F', borderRadius: 2, transition: 'width 0.4s ease' }} />
        </div>
        <p style={{ fontSize: 11, color: '#7A776E', marginTop: 5, textAlign: 'right' }}>
          {pct}% complete
        </p>
      </div>

      {/* Add form */}
      <TodoForm onAdd={add} />

      {/* Loading / Error states */}
      {loading && <p style={{ textAlign: 'center', color: '#7A776E', fontSize: 14, padding: '2rem 0' }}>Loading...</p>}
      {error   && <p style={{ textAlign: 'center', color: '#C84B1F', fontSize: 14, padding: '1rem 0' }}>{error}</p>}

      {/* Two-column board */}
      {!loading && (
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14, alignItems: 'start' }}>

          <Column title="To Do" count={pending.length} accent="#2A6B4F" badgeBg="#E8F3ED">
            {pending.length === 0
              ? <Empty text="All done! Add a new task above." />
              : pending.map(t => (
                  <TodoItem key={t._id} todo={t} onToggle={toggle} onEdit={edit} onDelete={remove} />
                ))
            }
          </Column>

          <Column title="Done" count={done.length} accent="#7A776E" badgeBg="#F0EDE7">
            {done.length === 0
              ? <Empty text="Complete a task to see it here." />
              : done.map(t => (
                  <TodoItem key={t._id} todo={t} onToggle={toggle} onEdit={edit} onDelete={remove} />
                ))
            }
          </Column>

        </div>
      )}
    </div>
  );
}