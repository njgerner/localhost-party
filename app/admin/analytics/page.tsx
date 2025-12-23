export default function AnalyticsPage() {
  return (
    <div className="space-y-6">
      <div className="border-2 border-[var(--neon-green)] bg-[var(--noir-dark)] p-8 rounded-lg">
        <h1
          className="text-4xl font-bold mb-4"
          style={{
            fontFamily: "var(--font-display)",
            color: "var(--neon-green)",
            textShadow: "0 0 20px rgba(0, 255, 136, 0.5)",
          }}
        >
          ANALYTICS
        </h1>
        <p className="text-lg text-gray-300">
          View platform statistics and insights
        </p>
      </div>

      <div className="border border-[var(--noir-medium)] bg-[var(--noir-dark)] p-8 rounded-lg text-center">
        <div className="text-6xl mb-4">📊</div>
        <h2 className="text-2xl font-bold mb-2">Coming Soon</h2>
        <p className="text-gray-400 mb-6">
          Analytics dashboard will be implemented in a future release.
        </p>
        <div className="text-sm text-gray-500">
          Planned features: game statistics, player metrics, prompt popularity
        </div>
      </div>
    </div>
  );
}
