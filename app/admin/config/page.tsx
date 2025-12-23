export default function ConfigPage() {
  return (
    <div className="space-y-6">
      <div className="border-2 border-[var(--neon-magenta)] bg-[var(--noir-dark)] p-8 rounded-lg">
        <h1
          className="text-4xl font-bold mb-4 neon-text-magenta"
          style={{ fontFamily: "var(--font-display)" }}
        >
          GAME CONFIGURATION
        </h1>
        <p className="text-lg text-gray-300">
          Configure game settings, rules, and parameters
        </p>
      </div>

      <div className="border border-[var(--noir-medium)] bg-[var(--noir-dark)] p-8 rounded-lg text-center">
        <div className="text-6xl mb-4">⚙️</div>
        <h2 className="text-2xl font-bold mb-2">Coming Soon</h2>
        <p className="text-gray-400 mb-6">
          This feature is under development. See GitHub Issue #58 for details.
        </p>
        <a
          href="https://github.com/njgerner/localhost-party/issues/58"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block px-6 py-3 bg-[var(--neon-magenta)] text-black font-bold rounded hover:opacity-80 transition-opacity"
        >
          View Issue #58
        </a>
      </div>
    </div>
  );
}
