import { useEffect, useState } from 'react'

function App() {
  const [count, setCount] = useState(0)

  useEffect(() => {
    document.title = `Clicked ${count} times`
  }, [count])

  return (
    <main className="p-8">
      <button
        onClick={() => setCount((count) => count + 1)}
        className="rounded-field bg-accent px-5 py-3 font-semibold text-on-accent shadow-soft transition-colors hover:bg-accent-hover"
      >
        Clicked {count} times
      </button>
    </main>
  )
}

export default App