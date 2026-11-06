import { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [tasks, setTasks] = useState(() => {
    const saved = localStorage.getItem("taskflow");
    return saved ? JSON.parse(saved) : [
      { id: 1, title: "Mempelajari React JS", category: "Belajar", done: false },
      { id: 2, title: "Membuat desain dashboard", category: "Design", done: true },
      { id: 3, title: "Menyelesaikan proyek TaskFlow", category: "Project", done: false }
    ];
  });

  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("Project");
  const [search, setSearch] = useState("");

  useEffect(() => {
    localStorage.setItem("taskflow", JSON.stringify(tasks));
  }, [tasks]);

  function addTask(e) {
    e.preventDefault();
    if (!title.trim()) return;

    setTasks([
      ...tasks,
      {
        id: Date.now(),
        title,
        category,
        done: false
      }
    ]);

    setTitle("");
  }

  function toggleTask(id) {
    setTasks(tasks.map(task =>
      task.id === id
        ? { ...task, done: !task.done }
        : task
    ));
  }

  function deleteTask(id) {
    setTasks(tasks.filter(task => task.id !== id));
  }

  const filteredTasks = tasks.filter(task =>
    task.title.toLowerCase().includes(search.toLowerCase())
  );

  const completed = tasks.filter(task => task.done).length;
  const pending = tasks.length - completed;

  return (
    <div className="app">
      <aside className="sidebar">
        <h2>✦ TaskFlow</h2>
        <p className="menu-label">MENU UTAMA</p>
        <div className="menu active">▦ Dashboard</div>
        <div className="menu">✓ Semua Tugas</div>
        <div className="menu">◷ Kalender</div>
        <div className="menu">⚙ Pengaturan</div>

        <div className="profile">
          <div className="avatar">A</div>
          <div>
            <strong>Admin</strong>
            <small>Administrator</small>
          </div>
        </div>
      </aside>

      <main className="main">
        <header>
          <div>
            <p className="welcome">SELAMAT DATANG KEMBALI 👋</p>
            <h1>Dashboard</h1>
            <p className="subtitle">
              Kelola pekerjaanmu dengan lebih mudah.
            </p>
          </div>
          <div className="date">📅 TaskFlow Workspace</div>
        </header>

        <section className="stats">
          <div className="stat-card purple">
            <span>Total Tugas</span>
            <h2>{tasks.length}</h2>
            <p>Semua pekerjaan</p>
          </div>

          <div className="stat-card blue">
            <span>Sedang Dikerjakan</span>
            <h2>{pending}</h2>
            <p>Tugas belum selesai</p>
          </div>

          <div className="stat-card green">
            <span>Selesai</span>
            <h2>{completed}</h2>
            <p>Tugas telah selesai</p>
          </div>
        </section>

        <section className="task-section">
          <div className="task-header">
            <div>
              <h2>Daftar Tugas</h2>
              <p>Kelola semua aktivitasmu di sini.</p>
            </div>
          </div>

          <form className="task-form" onSubmit={addTask}>
            <input
              value={title}
              onChange={e => setTitle(e.target.value)}
              placeholder="Masukkan nama pekerjaan..."
            />

            <select
              value={category}
              onChange={e => setCategory(e.target.value)}
            >
              <option>Project</option>
              <option>Belajar</option>
              <option>Design</option>
              <option>Personal</option>
            </select>

            <button type="submit">+ Tambah Tugas</button>
          </form>

          <input
            className="search"
            placeholder="🔍 Cari pekerjaan..."
            value={search}
            onChange={e => setSearch(e.target.value)}
          />

          <div className="task-list">
            {filteredTasks.map(task => (
              <div className="task-item" key={task.id}>
                <input
                  type="checkbox"
                  checked={task.done}
                  onChange={() => toggleTask(task.id)}
                />

                <div className="task-info">
                  <strong className={task.done ? "done" : ""}>
                    {task.title}
                  </strong>
                  <small>{task.category}</small>
                </div>

                <span className={task.done ? "status selesai" : "status proses"}>
                  {task.done ? "Selesai" : "Proses"}
                </span>

                <button
                  className="delete"
                  onClick={() => deleteTask(task.id)}
                >
                  🗑
                </button>
              </div>
            ))}

            {filteredTasks.length === 0 && (
              <p className="empty">Tidak ada tugas ditemukan.</p>
            )}
          </div>
        </section>

        <footer>© 2026 TaskFlow. Manage your day, achieve your goals.</footer>
      </main>
    </div>
  );
}

export default App;