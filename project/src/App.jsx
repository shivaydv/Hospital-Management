import React, { useState } from 'react'
import Sidebar from './components/Sidebar'
import Dashboard from './components/Dashboard'
import Patients from './components/Patients'
import Doctors from './components/Doctors'
import Appointments from './components/Appointments'

function App() {
  const [currentView, setCurrentView] = useState('dashboard')
  const [isSidebarOpen, setSidebarOpen] = useState(false)

  const views = {
    dashboard: <Dashboard />,
    patients: <Patients />,
    doctors: <Doctors />,
    appointments: <Appointments />
  }

  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen)
  }

  return (
    <div className="flex h-screen bg-gray-50 relative">
      {/* Hamburger Menu Button - Only visible on mobile */}
     <div className='lg:hidden fixed w-full px-4 py-2 flex justify-between items-center'>
      <h1 className='text-2xl font-bold text-primary'>HMS</h1>
     <button 
        className=" z-20 p-2 rounded-md hover:bg-gray-200"
        onClick={toggleSidebar}
      >
        <svg 
          className="w-6 h-6" 
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24"
        >
          <path 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            strokeWidth={2} 
            d="M4 6h16M4 12h16M4 18h16" 
          />
        </svg>
      </button>
     </div>

      {/* Overlay for mobile when sidebar is open */}
      {isSidebarOpen && (
        <div 
          className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-30"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar with responsive classes */}
      <div className={`
        fixed   lg:static inset-y-0 left-0 z-40
        transform ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}
        lg:translate-x-0 transition-transform duration-300 ease-in-out
      `}>
        <Sidebar 
          currentView={currentView} 
          setCurrentView={(view) => {
            setCurrentView(view)
            setSidebarOpen(false)  // Close sidebar on mobile after selection
          }} 
        />
      </div>

      {/* Main content with responsive padding */}
      <main className="flex-1 overflow-y-auto p-4 lg:p-8 w-full lg:ml-0">
        {views[currentView]}
      </main>
    </div>
  )
}

export default App