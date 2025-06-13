import React, { useState } from 'react';
import { Menu, Users, ChevronLeft, ChevronRight } from 'lucide-react';
import MenuPage from '../pages/Menu';
import EmployeePage from '../pages/Employee';

const Sidebar = ({ activeItem = 'menu', onItemSelect = () => {} }) => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  const navigationItems = [
    {
      id: 'menu',
      label: 'Menu',
      icon: Menu,
      href: '/menu'
    },
    {
      id: 'employee',
      label: 'Employee',
      icon: Users,
      href: '/employee'
    }
  ];

  const handleItemClick = (item) => {
    onItemSelect(item);
    // Close mobile menu after selection
    setIsMobileOpen(false);
  };

  const toggleCollapse = () => {
    setIsCollapsed(!isCollapsed);
  };

  const toggleMobile = () => {
    setIsMobileOpen(!isMobileOpen);
  };

return (
    <>
        {/* Mobile Menu Button */}
        <button
            onClick={toggleMobile}
            className="lg:hidden fixed top-4 left-4 z-50 p-2 bg-slate-900 text-white rounded-lg shadow-lg hover:bg-slate-800 transition-colors"
            aria-label="Toggle menu"
        >
            <Menu size={20} />
        </button>

        {/* Mobile Overlay */}
        {isMobileOpen && (
            <div
                className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-40 transition-opacity"
                onClick={toggleMobile}
            />
        )}

        {/* Sidebar */}
        <div
            className={`
                fixed lg:relative top-0 left-0 h-full bg-gradient-to-b from-slate-900 to-slate-800 
                text-white shadow-2xl z-40 transition-all duration-300 ease-in-out
                ${isCollapsed ? 'w-16' : 'w-64'}
                ${isMobileOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
            `}
        >
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-slate-700">
                {!isCollapsed && (
                    <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                            <span className="text-white font-bold text-sm">A</span>
                        </div>
                        <h1 className="text-xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                            Admin
                        </h1>
                    </div>
                )}
                
                {/* Collapse Toggle - Desktop Only */}
                <button
                    onClick={toggleCollapse}
                    className="hidden lg:flex p-1.5 hover:bg-slate-700 rounded-lg transition-colors"
                    aria-label={isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
                >
                    {isCollapsed ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
                </button>
                
                {/* Close Button - Mobile Only */}
                <button
                    onClick={toggleMobile}
                    className="lg:hidden p-1.5 hover:bg-slate-700 rounded-lg transition-colors"
                    aria-label="Close menu"
                >
                    <ChevronLeft size={16} />
                </button>
            </div>

            {/* Navigation */}
            <nav className="flex-1 p-4">
                <ul className="space-y-2">
                    {navigationItems.map((item) => {
                        const Icon = item.icon;
                        const isActive = activeItem === item.id;
                        
                        return (
                            <li key={item.id}>
                                <button
                                    onClick={() => handleItemClick(item)}
                                    className={`
                                        w-full flex items-center space-x-3 px-3 py-3 rounded-xl
                                        transition-all duration-200 ease-in-out group relative
                                        ${isActive 
                                            ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg' 
                                            : 'text-slate-300 hover:text-white hover:bg-slate-700/50'
                                        }
                                    `}
                                >
                                    {/* Active Indicator */}
                                    {isActive && (
                                        <div className="absolute left-0 top-0 bottom-0 w-1 bg-white rounded-r-full" />
                                    )}
                                    
                                    <Icon 
                                        size={20} 
                                        className={`
                                            transition-transform duration-200
                                            ${isActive ? 'scale-110' : 'group-hover:scale-105'}
                                        `}
                                    />
                                    
                                    {!isCollapsed && (
                                        <span className="font-medium transition-all duration-200">
                                            {item.label}
                                        </span>
                                    )}
                                    
                                    {/* Tooltip for collapsed state */}
                                    {isCollapsed && (
                                        <div className="absolute left-full ml-2 px-2 py-1 bg-slate-800 text-white text-sm rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-50">
                                            {item.label}
                                            <div className="absolute top-1/2 left-0 transform -translate-y-1/2 -translate-x-1 w-2 h-2 bg-slate-800 rotate-45" />
                                        </div>
                                    )}
                                </button>
                            </li>
                        );
                    })}
                </ul>
            </nav>

            {/* Footer */}
            <div className="p-4 border-t border-slate-700">
                {!isCollapsed ? (
                    <div className="text-xs text-slate-400 text-center">
                        <p>Version 1.0.0</p>
                    </div>
                ) : (
                    <div className="w-2 h-2 bg-slate-600 rounded-full mx-auto" />
                )}
            </div>
        </div>
    </>
);
};

// Example usage component
const App = () => {
  const [currentPage, setCurrentPage] = useState('menu');

  return (
    <div className="flex h-screen bg-slate-100 overflow-hidden"> {/* Add overflow-hidden here */}
      <Sidebar 
        activeItem={currentPage}
        onItemSelect={(item) => setCurrentPage(item.id)}
      />
      {/* Main content area moved here */}
      <div className="flex-1 lg:ml-0 p-8 bg-slate-50 min-h-screen h-screen overflow-y-auto"> {/* Add h-screen and overflow-y-auto here */}
        <div className="max-w-4xl mx-auto">
          {currentPage === 'menu' && <MenuPage />}
          {currentPage === 'employee' && <EmployeePage />}
        </div>
      </div>
    </div>
  );
};

export default App;