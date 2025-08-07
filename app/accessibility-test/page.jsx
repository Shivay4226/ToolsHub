export default function AccessibilityTestPage() {
  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold text-foreground mb-8">Accessibility Test</h1>
      
      <div className="space-y-8">
        {/* Text Contrast */}
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold text-foreground">Text Contrast</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-card border border-border p-4 rounded-lg">
              <h3 className="text-lg font-medium text-foreground mb-2">Foreground Text</h3>
              <p className="text-foreground">This is normal text with good contrast.</p>
            </div>
            <div className="bg-card border border-border p-4 rounded-lg">
              <h3 className="text-lg font-medium text-muted-foreground mb-2">Muted Text</h3>
              <p className="text-muted-foreground">This is secondary/muted text.</p>
            </div>
          </div>
        </section>

        {/* Buttons */}
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold text-foreground">Buttons</h2>
          <div className="flex flex-wrap gap-4">
            <button className="bg-primary text-primary-foreground px-4 py-2 rounded-md hover:bg-primary/90 transition-colors">
              Primary Button
            </button>
            <button className="bg-secondary text-secondary-foreground px-4 py-2 rounded-md hover:bg-secondary/80 transition-colors">
              Secondary Button
            </button>
            <button className="border border-input bg-background hover:bg-accent hover:text-accent-foreground px-4 py-2 rounded-md transition-colors">
              Outline Button
            </button>
          </div>
        </section>

        {/* Cards */}
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold text-foreground">Cards</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-card border border-border p-4 rounded-lg">
                <h3 className="text-lg font-medium text-foreground mb-2">Card {i}</h3>
                <p className="text-muted-foreground text-sm">
                  This is a sample card with some content. The text should be readable in both light and dark modes.
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Form Elements */}
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold text-foreground">Form Elements</h2>
          <div className="space-y-4 max-w-lg">
            <div>
              <label htmlFor="input1" className="block text-sm font-medium text-foreground mb-1">
                Text Input
              </label>
              <input
                type="text"
                id="input1"
                className="w-full px-3 py-2 border border-input rounded-md bg-background text-foreground placeholder:text-muted-foreground/70 focus:outline-none focus:ring-2 focus:ring-primary/50"
                placeholder="Type something..."
              />
            </div>
            <div>
              <label htmlFor="select1" className="block text-sm font-medium text-foreground mb-1">
                Select
              </label>
              <select
                id="select1"
                className="w-full px-3 py-2 border border-input rounded-md bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
              >
                <option value="">Select an option</option>
                <option value="1">Option 1</option>
                <option value="2">Option 2</option>
                <option value="3">Option 3</option>
              </select>
            </div>
            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="checkbox1"
                className="h-4 w-4 rounded border-input text-primary focus:ring-primary/50"
              />
              <label htmlFor="checkbox1" className="text-sm font-medium text-foreground">
                Check me out
              </label>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
