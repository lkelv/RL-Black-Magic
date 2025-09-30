function WhyBlackMagic() {
    return (
      <section className="bg-slate-800 py-16">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-12 text-white">
            Why Black Magic?
          </h2>
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div className="bg-slate-700 p-6 rounded-lg">
              <div className="aspect-video bg-slate-600 rounded-lg flex items-center justify-center">
                <span className="text-6xl">📱</span>
              </div>
            </div>
            <div className="text-white space-y-4">
              <p className="text-lg leading-relaxed">
                In high-stakes timed exams like VCE Methods and Specialist Maths, every second counts.
              </p>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <span className="text-green-400 mr-2">✓</span>
                  <span>Solve problems faster</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-400 mr-2">✓</span>
                  <span>Check solutions instantly</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    );
  }
  
  export default WhyBlackMagic;