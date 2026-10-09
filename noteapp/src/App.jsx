
import { useState } from 'react'

function App() {
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [notes, setNotes] = useState([])
  const [search, setSearch] = useState('')

  const colors = [
    'bg-yellow-100',
    'bg-green-100',
    'bg-blue-100',
    'bg-pink-100',
    'bg-purple-100',
    'bg-orange-100',
    'bg-teal-100',
    'bg-rose-100',
  ]

  function addNote() {
    if (content.trim() === '') {
      alert('Please enter note content!')
      return
    }

    if (title.length > 100) {
      alert('Title cannot exceed 100 characters!')
      return
    }

    const randomColor =
      colors[Math.floor(Math.random() * colors.length)]

    const newNote = {
      id: Date.now(),
      title: title.trim(),
      content: content.trim(),
      color: randomColor,
      createdAt: new Date().toLocaleDateString(),
    }

    setNotes((prevNotes) => [newNote, ...prevNotes])
    setTitle('')
    setContent('')
  }

  function deleteNote(id) {
    const confirmed = window.confirm(
      'Are you sure you want to delete this note?'
    )

    if (confirmed) {
      setNotes((prevNotes) =>
        prevNotes.filter((note) => note.id !== id)
      )
    }
  }

  const filteredNotes = notes.filter(
    (note) =>
      note.title.toLowerCase().includes(search.toLowerCase()) ||
      note.content.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div className="min-h-screen bg-stone-50 px-4 py-6 sm:px-8 sm:py-10">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <header className="mb-8 flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-yellow-300 text-2xl shadow-sm">
            📝
          </div>

          <div>
            <h1 className="text-3xl font-bold tracking-tight text-stone-800">
              My Notes
            </h1>
            <p className="mt-1 text-sm text-stone-500">
              Your thoughts, organized.
            </p>
          </div>
        </header>

        {/* Search */}
        <div className="mb-8">
          <div className="mx-auto flex max-w-2xl items-center gap-3 rounded-2xl border border-stone-200 bg-white px-4 py-3 shadow-sm transition focus-within:border-stone-400 focus-within:shadow-md">
            <span className="text-xl" aria-hidden="true">
              
            </span>

            <input
              type="search"
              placeholder="Search your notes..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-transparent text-stone-700 outline-none placeholder:text-stone-400"
              aria-label="Search notes"
            />
          </div>
        </div>

        {/* Create Note Form */}
        <form
          onSubmit={(e) => {
            e.preventDefault()
            addNote()
          }}
          className="mx-auto mb-12 max-w-2xl rounded-2xl border border-stone-200 bg-white p-5 shadow-sm transition hover:shadow-md sm:p-6"
        >
          <input
            type="text"
            placeholder="Title (optional)"
            value={title}
            maxLength={100}
            onChange={(e) => setTitle(e.target.value)}
            className="mb-3 w-full bg-transparent text-lg font-semibold text-stone-800 outline-none placeholder:text-stone-400"
          />

          <div className="mb-2 text-right text-xs text-stone-400">
            {title.length}/100 characters
          </div>

          <textarea
            placeholder="What's on your mind?"
            value={content}
            maxLength={5000}
            onChange={(e) => setContent(e.target.value)}
            className="min-h-28 w-full resize-y bg-transparent leading-6 text-stone-700 outline-none placeholder:text-stone-400"
          />

          <div className="mt-2 flex items-center justify-between gap-3 border-t border-stone-100 pt-4">
            <span className="text-xs text-stone-400">
              {content.length}/5000 characters
            </span>

            <button
              type="submit"
              className="rounded-xl bg-stone-900 px-5 py-2.5 font-semibold text-white transition hover:bg-stone-700 active:scale-95"
            >
              + Add Note
            </button>
          </div>
        </form>

        {/* Notes Heading */}
        <div className="mb-5 flex items-center justify-between">
          <h2 className="text-xl font-bold text-stone-800">
            Your Notes
          </h2>

          <span className="rounded-full bg-stone-200 px-3 py-1 text-sm font-medium text-stone-600">
            {filteredNotes.length}
          </span>
        </div>

        {/* Notes Grid */}
        {filteredNotes.length === 0 ? (
          <div className="rounded-2xl border-2 border-dashed border-stone-200 px-4 py-16 text-center">
            <div className="mb-4 text-5xl">
              {search ? '🔎' : '🗒️'}
            </div>

            <h3 className="text-lg font-semibold text-stone-700">
              {search ? 'No matching notes' : 'No notes yet'}
            </h3>

            <p className="mt-2 text-sm text-stone-400">
              {search
                ? 'Try searching with another keyword.'
                : 'Create your first note to get started!'}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {filteredNotes.map((note) => (
              <article
                key={note.id}
                className={`${note.color} group relative flex min-h-40 flex-col rounded-2xl border border-black/5 p-5 shadow-sm transition-all duration-200 hover:-translate-y-1 hover:shadow-lg`}
              >
                <h3 className="mb-3 break-words pr-7 text-lg font-bold text-stone-800">
                  {note.title || 'Untitled note'}
                </h3>

                <p className="flex-1 whitespace-pre-wrap break-words text-sm leading-6 text-stone-700">
                  {note.content}
                </p>

                <div className="mt-5 flex items-center justify-between border-t border-black/10 pt-3">
                  <span className="text-xs text-stone-500">
                    {note.createdAt}
                  </span>

                  <button
                    type="button"
                    onClick={() => deleteNote(note.id)}
                    aria-label="Delete note"
                    title="Delete note"
                    className="rounded-lg px-3 py-1.5 text-sm font-medium text-stone-600 transition hover:bg-white/60 hover:text-red-600"
                  >
                    Delete
                  </button>
                </div>
              </article>
            ))}
          </div>
        )}

        {/* Footer */}
        <footer className="mt-12 text-center text-xs text-stone-400">
          Made with React & Tailwind CSS
        </footer>
      </div>
    </div>
  )
}

export default App