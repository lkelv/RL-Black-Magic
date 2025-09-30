function ContactUs() {
    return (
      <div className="min-h-screen bg-slate-900 text-white py-16">
        <div className="max-w-4xl mx-auto px-4">
          <h1 className="text-4xl font-bold mb-8">Contact Us</h1>
          <div className="bg-slate-800 rounded-lg p-8">
            <div className="space-y-4">
              <input 
                type="text" 
                placeholder="Your Name" 
                className="w-full p-3 rounded bg-slate-700 border border-slate-600"
              />
              <input 
                type="email" 
                placeholder="Your Email" 
                className="w-full p-3 rounded bg-slate-700 border border-slate-600"
              />
              <textarea 
                placeholder="Your Message" 
                rows="6"
                className="w-full p-3 rounded bg-slate-700 border border-slate-600"
              />
              <button className="bg-yellow-500 hover:bg-yellow-600 text-slate-900 px-6 py-3 rounded font-bold">
                Send Message
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
  
  export default ContactUs;