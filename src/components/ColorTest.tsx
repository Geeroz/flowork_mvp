// This is a temporary component to test Flowork custom colors
// You can use this to verify all flowork-* colors are working
// Delete this file after testing

export function ColorTest() {
  return (
    <div className="p-8 space-y-4">
      <h2 className="text-2xl font-bold mb-4 text-flowork-800">Flowork Color Palette Test</h2>
      
      <div className="grid grid-cols-5 gap-4">
        <div className="p-4 bg-flowork-50 border rounded">
          <div className="text-flowork-800 font-bold">flowork-50</div>
          <div className="text-xs text-flowork-600">#DDECF6</div>
        </div>
        
        <div className="p-4 bg-flowork-200 border rounded">
          <div className="text-flowork-800 font-bold">flowork-200</div>
          <div className="text-xs text-flowork-900">#9BCBE5</div>
        </div>
        
        <div className="p-4 bg-flowork-400 border rounded">
          <div className="text-white font-bold">flowork-400</div>
          <div className="text-xs text-flowork-50">#5BA3C6</div>
        </div>
        
        <div className="p-4 bg-flowork-600 border rounded">
          <div className="text-white font-bold">flowork-600</div>
          <div className="text-xs text-flowork-100">#387EA2</div>
        </div>
        
        <div className="p-4 bg-flowork-800 border rounded">
          <div className="text-white font-bold">flowork-800</div>
          <div className="text-xs text-flowork-200">#184E6F</div>
        </div>
      </div>
      
      <div className="mt-8">
        <h3 className="text-lg font-semibold mb-2 text-flowork-700">Example Usage:</h3>
        <div className="space-y-2 text-sm">
          <div>Background: <span className="px-2 py-1 bg-flowork-100 text-flowork-800 rounded">bg-flowork-100</span></div>
          <div>Text: <span className="text-flowork-600 font-semibold">text-flowork-600</span></div>
          <div>Border: <span className="px-2 py-1 border-2 border-flowork-400 rounded">border-flowork-400</span></div>
          <div>
            Button: 
            <button className="ml-2 px-4 py-2 bg-flowork-400 hover:bg-flowork-600 text-white rounded transition-colors">
              Hover Me
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}