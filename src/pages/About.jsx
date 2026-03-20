export default function About() {
  return (
    <div className="min-h-screen bg-[#f7f7f5] text-gray-800 px-6 py-12">
      
      {/* Hero Section */}
      <section className="max-w-5xl mx-auto flex flex-col md:flex-row items-center gap-10">
        
        {/* Image */}
        <div className="w-full md:w-1/2">
          <img
            src="/me.jpg"
            alt="Portrait of me"
            className="rounded-2xl shadow-lg object-cover w-full h-[400px]"
          />
        </div>

        {/* Text */}
        <div className="w-full md:w-1/2">
          <h1 className="text-4xl font-semibold mb-4">
        
          </h1>
          <p className="text-lg leading-relaxed mb-4">
           
          </p>
          <p className="leading-relaxed text-gray-600">
          
          </p>
        </div>
      </section>

      {/* Story Section */}
      <section className="max-w-3xl mx-auto mt-16">
        <h2 className="text-2xl font-semibold mb-4">My Story</h2>
        <p className="leading-relaxed text-gray-600 mb-4">
       
        </p>
        <p className="leading-relaxed text-gray-600">
      
        </p>
      </section>

      {/* Approach */}
      <section className="max-w-3xl mx-auto mt-16">
        <h2 className="text-2xl font-semibold mb-4"></h2>
        <p className="leading-relaxed text-gray-600">
       
        </p>
      </section>

      {/* Call to Action */}
      <section className="text-center mt-20">
        <h2 className="text-2xl font-semibold mb-4">
        
        </h2>
        <p className="text-gray-600 mb-6">
     
        </p>
        <button className="px-6 py-3 bg-gray-800 text-white rounded-full hover:bg-gray-700 transition">
        
        </button>
      </section>

    </div>
  );
}