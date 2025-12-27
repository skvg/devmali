import { Button } from '@/components/ui';

export default function TestColors() {
  return (
    <div className="min-h-screen p-8 bg-gray-50">
      <h1 className="text-3xl font-bold mb-8">Button Component Test</h1>
      
      <div className="space-y-8">
        <div>
          <h2 className="text-xl font-semibold mb-4">Button Variants</h2>
          <div className="flex flex-wrap gap-4">
            <Button variant="primary">Primary Button</Button>
            <Button variant="secondary">Secondary Button</Button>
            <Button variant="cultural">Cultural Button</Button>
            <Button variant="spiritual">Spiritual Button</Button>
            <Button variant="outline">Outline Button</Button>
            <Button variant="ghost">Ghost Button</Button>
          </div>
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-4">Button Sizes</h2>
          <div className="flex flex-wrap items-center gap-4">
            <Button size="sm">Small</Button>
            <Button size="md">Medium</Button>
            <Button size="lg">Large</Button>
            <Button size="xl">Extra Large</Button>
          </div>
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-4">Color Test</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="p-4 bg-primary-saffron text-white rounded">Primary Saffron</div>
            <div className="p-4 bg-primary-maroon text-white rounded">Primary Maroon</div>
            <div className="p-4 bg-primary-golden text-secondary-charcoal rounded">Primary Golden</div>
            <div className="p-4 bg-secondary-sage text-white rounded">Secondary Sage</div>
            <div className="p-4 bg-secondary-cream text-secondary-charcoal rounded">Secondary Cream</div>
            <div className="p-4 bg-secondary-charcoal text-white rounded">Secondary Charcoal</div>
            <div className="p-4 bg-primary-600 text-white rounded">Primary 600</div>
            <div className="p-4 bg-secondary-maroon-600 text-white rounded">Secondary Maroon 600</div>
          </div>
        </div>
      </div>
    </div>
  );
}