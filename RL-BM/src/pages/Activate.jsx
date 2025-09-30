function Activate() {
    return (
      <div className="min-h-screen bg-slate-900 text-white py-16">
        <div className="max-w-4xl mx-auto px-4">
          <h1 className="text-4xl font-bold mb-8">Activate Your License</h1>
          <div className="bg-slate-800 rounded-lg p-8">
            <p className="mb-4">Enter your activation code below:</p>
            <input 
              type="text" 
              placeholder="Enter activation code" 
              className="w-full p-3 rounded bg-slate-700 border border-slate-600 text-white mb-4"
            />
            <button className="bg-emerald-500 hover:bg-emerald-600 px-6 py-3 rounded font-bold">
              Activate
            </button>
          </div>
        </div>
      </div>
    );
  }
  
  export default Activate;