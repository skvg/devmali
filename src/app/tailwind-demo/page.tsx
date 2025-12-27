export default function TailwindDemo() {
  return (
    <div className="p-8 space-y-8">
      <h1 className="text-3xl font-bold mb-8">Tailwind Class Generation Demo</h1>
      
      {/* Border Radius Examples */}
      <section>
        <h2 className="text-xl font-semibold mb-4">Border Radius (rounded-* classes)</h2>
        <div className="flex gap-4">
          <div className="w-20 h-20 bg-blue-500 rounded-none">none</div>
          <div className="w-20 h-20 bg-blue-500 rounded-sm">sm</div>
          <div className="w-20 h-20 bg-blue-500 rounded-cultural">cultural</div>
          <div className="w-20 h-20 bg-blue-500 rounded-spiritual">spiritual</div>
        </div>
      </section>

      {/* Color Examples */}
      <section>
        <h2 className="text-xl font-semibold mb-4">Custom Colors</h2>
        <div className="flex gap-4">
          <div className="w-20 h-20 bg-primary-saffron">saffron</div>
          <div className="w-20 h-20 bg-primary-maroon">maroon</div>
          <div className="w-20 h-20 bg-primary-golden">golden</div>
          <div className="w-20 h-20 bg-secondary-sage">sage</div>
        </div>
      </section>

      {/* Shadow Examples */}
      <section>
        <h2 className="text-xl font-semibold mb-4">Custom Shadows</h2>
        <div className="flex gap-4">
          <div className="w-20 h-20 bg-white shadow-cultural">cultural</div>
          <div className="w-20 h-20 bg-white shadow-spiritual">spiritual</div>
          <div className="w-20 h-20 bg-white shadow-golden">golden</div>
          <div className="w-20 h-20 bg-white shadow-earth">earth</div>
        </div>
      </section>

      {/* Custom Spacing */}
      <section>
        <h2 className="text-xl font-semibold mb-4">Custom Spacing</h2>
        <div className="flex gap-4">
          <div className="w-18 h-18 bg-red-500">w-18 h-18</div>
          <div className="w-88 h-8 bg-green-500">w-88 h-8</div>
        </div>
      </section>
    </div>
  );
}