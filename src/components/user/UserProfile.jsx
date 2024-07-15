import React from 'react'

const UserProfile = () => {
  return (
    <div className="md:h 152 bg-gradient-to-br to-teal-700 flex items-center justify-center p-4 mt-20">
  <div className="max-w-4xl w-full bg-white rounded-2xl shadow-2xl overflow-hidden">
    <div className="md:flex">
 
      <div className="md:w-1/3 bg-gradient-to-b from-emerald-400 to-teal-600 p-8 flex flex-col items-center justify-center">
        <div className="w-48 h-48 rounded-full bg-white border-4 border-emerald-200 shadow-lg flex items-center justify-center mb-6">
          <span className="text-6xl font-bold text-emerald-500">JP</span>
        </div>
        <h1 className="text-3xl font-bold text-white text-center mb-2">John Doe</h1>
        <p className="text-emerald-100 text-center">Web Developer</p>
      </div>
      
      <div className="md:w-2/3 p-8">
        <h2 className="text-3xl font-semibold text-emerald-600 mb-6">Personal Information</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <p className="text-gray-600 mb-1">Name</p>
            <p className="font-medium text-gray-800">John Doe</p>
          </div>
          <div>
            <p className="text-gray-600 mb-1">Email</p>
            <p className="font-medium text-gray-800">johndoe@example.com</p>
          </div>
          <div>
            <p className="text-gray-600 mb-1">Cell Phone</p>
            <p className="font-medium text-gray-800">+1 (555) 123-4567</p>
          </div>
          <div>
            <p className="text-gray-600 mb-1">Telephone</p>
            <p className="font-medium text-gray-800">+1 (555) 987-6543</p>
          </div>
          <div className="md:col-span-2">
            <p className="text-gray-600 mb-1">Address</p>
            <p className="font-medium text-gray-800">123 Main St, Anytown, ST 12345</p>
          </div>
        </div>
        
        <div className="mt-8">
          <h3 className="text-xl font-semibold text-emerald-600 mb-4">Skills</h3>
          <div className="flex flex-wrap gap-2">
            <span className="bg-emerald-100 text-emerald-800 px-3 py-1 rounded-full text-sm">HTML</span>
            <span className="bg-emerald-100 text-emerald-800 px-3 py-1 rounded-full text-sm">CSS</span>
            <span className="bg-emerald-100 text-emerald-800 px-3 py-1 rounded-full text-sm">JavaScript</span>
            <span className="bg-emerald-100 text-emerald-800 px-3 py-1 rounded-full text-sm">React</span>
            <span className="bg-emerald-100 text-emerald-800 px-3 py-1 rounded-full text-sm">Node.js</span>
          </div>
        </div>
        
        <div className="mt-8 text-center">
          <button className="bg-emerald-500 hover:bg-emerald-600 text-white font-bold py-2 px-6 rounded-full transition duration-300">
            Edit Profile
          </button>
        </div>
      </div>
    </div>
  </div>
</div>

  )
}

export default UserProfile
