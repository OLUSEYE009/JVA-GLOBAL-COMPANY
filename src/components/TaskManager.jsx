import React, { useState, useEffect } from 'react';

const TaskManager = () => {
  // STATE FOR DARK MODE
  const [darkMode, setDarkMode] = useState(() => {
    const saved = localStorage.getItem('taskManagerDarkMode');
    return saved ? JSON.parse(saved) : false;
  });

  // STATE FOR USERNAME
  const [username, setUsername] = useState(() => {
    const saved = localStorage.getItem('taskManagerUsername');
    return saved || '';
  });
  
  const [isEditingUsername, setIsEditingUsername] = useState(() => {
    const saved = localStorage.getItem('taskManagerUsername');
    return !saved;
  });

  // NEW STATE FOR MOBILE SIDEBAR
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // STATE FOR ACTIVE TAB
  const [activeTab, setActiveTab] = useState('projects');

  // State for projects and tasks
  const [projects, setProjects] = useState(() => {
    const saved = localStorage.getItem('taskManagerProjects');
    if (saved) {
      return JSON.parse(saved);
    }
    return [
      {
        id: 1,
        title: 'Learn React',
        date: 'Dec 31, 2025',
        description: 'In-depth, from the ground up.',
        tasks: [
          { id: 1, text: 'Learn about components, props & state', completed: false },
          { id: 2, text: 'Explore basic concepts', completed: false }
        ]
      }
    ];
  });

  // STATE FOR TRASH
  const [trash, setTrash] = useState(() => {
    const saved = localStorage.getItem('taskManagerTrash');
    return saved ? JSON.parse(saved) : [];
  });
  
  const [newProjectTitle, setNewProjectTitle] = useState('');
  const [newProjectDate, setNewProjectDate] = useState('');
  const [newProjectDescription, setNewProjectDescription] = useState('');
  const [newTaskText, setNewTaskText] = useState('');
  
  const [selectedProjectId, setSelectedProjectId] = useState(() => {
    const saved = localStorage.getItem('taskManagerSelectedProject');
    return saved ? JSON.parse(saved) : 1;
  });

  // SAVE TO LOCALSTORAGE
  useEffect(() => {
    localStorage.setItem('taskManagerUsername', username);
  }, [username]);

  useEffect(() => {
    localStorage.setItem('taskManagerProjects', JSON.stringify(projects));
  }, [projects]);

  useEffect(() => {
    localStorage.setItem('taskManagerSelectedProject', JSON.stringify(selectedProjectId));
  }, [selectedProjectId]);

  useEffect(() => {
    localStorage.setItem('taskManagerDarkMode', JSON.stringify(darkMode));
  }, [darkMode]);

  useEffect(() => {
    localStorage.setItem('taskManagerTrash', JSON.stringify(trash));
  }, [trash]);

  // CLOSE SIDEBAR WHEN SCREEN SIZE CHANGES TO DESKTOP
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsSidebarOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // TOGGLE DARK MODE FUNCTION
  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  // TOGGLE MOBILE SIDEBAR
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  // CLOSE SIDEBAR WHEN CLICKING ON PROJECT (MOBILE)
  const handleProjectSelect = (projectId) => {
    setSelectedProjectId(projectId);
    if (window.innerWidth < 768) {
      setIsSidebarOpen(false);
    }
  };

  // ADD USERNAME HANDLER FUNCTIONS
  const handleUsernameSubmit = () => {
    if (username.trim() !== '') {
      setIsEditingUsername(false);
    }
  };

  const handleEditUsername = () => {
    setIsEditingUsername(true);
  };

  // MOVE PROJECT TO TRASH
  const moveProjectToTrash = (projectId) => {
    const projectToDelete = projects.find(project => project.id === projectId);
    if (projectToDelete) {
      setProjects(projects.filter(project => project.id !== projectId));
      setTrash([...trash, { ...projectToDelete, deletedAt: new Date().toISOString() }]);
      
      if (selectedProjectId === projectId) {
        const remainingProjects = projects.filter(project => project.id !== projectId);
        if (remainingProjects.length > 0) {
          setSelectedProjectId(remainingProjects[0].id);
        } else {
          setSelectedProjectId(null);
        }
      }
    }
  };

  // RESTORE PROJECT FROM TRASH
  const restoreProjectFromTrash = (projectId) => {
    const projectToRestore = trash.find(project => project.id === projectId);
    if (projectToRestore) {
      setTrash(trash.filter(project => project.id !== projectId));
      const { deletedAt, ...restoredProject } = projectToRestore;
      setProjects([...projects, restoredProject]);
    }
  };

  // PERMANENTLY DELETE PROJECT
  const permanentlyDeleteProject = (projectId) => {
    setTrash(trash.filter(project => project.id !== projectId));
  };

  // Add a new project
  const addProject = () => {
    if (newProjectTitle.trim() === '') return;
    
    const newProject = {
      id: Date.now() + Math.random(),
      title: newProjectTitle,
      date: newProjectDate || 'No date',
      description: newProjectDescription,
      tasks: []
    };
    
    setProjects([...projects, newProject]);
    setNewProjectTitle('');
    setNewProjectDate('');
    setNewProjectDescription('');
  };

  // Add a new task to the selected project
  const addTask = () => {
    if (newTaskText.trim() === '') return;
    
    const updatedProjects = projects.map(project => {
      if (project.id === selectedProjectId) {
        return {
          ...project,
          tasks: [
            ...project.tasks,
            { 
              id: Date.now() + Math.random(),
              text: newTaskText, 
              completed: false 
            }
          ]
        };
      }
      return project;
    });
    
    setProjects(updatedProjects);
    setNewTaskText('');
  };

  // Toggle task completion status
  const toggleTask = (projectId, taskId) => {
    const updatedProjects = projects.map(project => {
      if (project.id === projectId) {
        return {
          ...project,
          tasks: project.tasks.map(task => 
            task.id === taskId ? { ...task, completed: !task.completed } : task
          )
        };
      }
      return project;
    });
    
    setProjects(updatedProjects);
  };

  // Clear a task
  const clearTask = (projectId, taskId) => {
    const updatedProjects = projects.map(project => {
      if (project.id === projectId) {
        return {
          ...project,
          tasks: project.tasks.filter(task => task.id !== taskId)
        };
      }
      return project;
    });
    
    setProjects(updatedProjects);
  };

  // Get the currently selected project
  const selectedProject = projects.find(project => project.id === selectedProjectId);

  // DARK MODE CLASSES
  const bgClass = darkMode ? 'bg-gray-900' : 'bg-gray-50';
  const textClass = darkMode ? 'text-gray-100' : 'text-gray-800';
  const textSecondaryClass = darkMode ? 'text-gray-300' : 'text-gray-600';
  const cardBgClass = darkMode ? 'bg-gray-800' : 'bg-white';
  const borderClass = darkMode ? 'border-gray-700' : 'border-gray-200';
  const inputBgClass = darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300';
  const taskBgClass = darkMode ? 'bg-gray-700' : 'bg-gray-50';

  // USERNAME MODAL
  if (isEditingUsername) {
    return (
      <div className={`min-h-screen ${bgClass} flex items-center justify-center transition-colors duration-200 p-4`}>
        <div className={`${cardBgClass} p-6 md:p-8 rounded-lg shadow-md w-full max-w-md transition-colors duration-200`}>
          <h2 className={`text-xl md:text-2xl font-bold ${textClass} mb-4 text-center`}>Welcome to Task Manager</h2>
          <p className={`${textSecondaryClass} mb-6 text-center`}>Please enter your name to get started</p>
          <div className="space-y-4">
            <input
              type="text"
              placeholder="Enter your name"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleUsernameSubmit()}
              className={`w-full px-3 py-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${inputBgClass}`}
              autoFocus
            />
            <button
              onClick={handleUsernameSubmit}
              className="w-full bg-blue-500 text-white py-3 rounded-md hover:bg-blue-600 transition duration-200 font-medium"
            >
              Get Started
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen ${bgClass} flex transition-colors duration-200`}>
      {/* Mobile Header */}
      <div className={`md:hidden fixed top-0 left-0 right-0 ${cardBgClass} shadow-md z-40 p-4 transition-colors duration-200`}>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <button
              onClick={toggleSidebar}
              className={`p-2 rounded-lg ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
            <div>
              <h1 className={`text-lg font-bold ${textClass}`}>Task Manager</h1>
              <p className={`text-xs ${textSecondaryClass}`}>Hello, {username}</p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <button
              onClick={toggleDarkMode}
              className={`p-2 rounded-lg transition-colors duration-200 ${
                darkMode ? 'bg-gray-700 text-yellow-400' : 'bg-gray-200 text-gray-700'
              }`}
            >
              {darkMode ? (
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" clipRule="evenodd" />
                </svg>
              ) : (
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Sidebar Overlay for Mobile */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div className={`
        fixed md:static inset-y-0 left-0 z-50
        w-64 transform transition-transform duration-300 ease-in-out
        ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
        ${cardBgClass} shadow-md p-6 transition-colors duration-200
        pt-20 md:pt-6
      `}>
        {/* Close button for mobile */}
        <button
          onClick={() => setIsSidebarOpen(false)}
          className="md:hidden absolute top-4 right-4 p-2 text-gray-500 hover:text-gray-700"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {/* Desktop Dark Mode Toggle */}
        <div className="hidden md:flex justify-between items-center mb-4">
          <button
            onClick={toggleDarkMode}
            className={`p-2 rounded-lg transition-colors duration-200 ${
              darkMode ? 'bg-gray-700 text-yellow-400' : 'bg-gray-200 text-gray-700'
            }`}
          >
            {darkMode ? (
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" clipRule="evenodd" />
              </svg>
            ) : (
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
              </svg>
            )}
          </button>
        </div>

        {/* USERNAME SECTION */}
        <div className={`mb-6 pb-4 border-b ${borderClass}`}>
          <div className="flex items-center justify-between">
            <div>
              <p className={`text-sm ${textSecondaryClass}`}>Welcome back,</p>
              <h1 className={`text-xl font-bold ${textClass}`}>{username}</h1>
            </div>
            <button
              onClick={handleEditUsername}
              className="text-blue-500 hover:text-blue-700 text-sm transition-colors duration-200"
            >
              Edit
            </button>
          </div>
        </div>

        {/* NAVIGATION TABS */}
        <div className="flex mb-6 bg-gray-100 dark:bg-gray-700 rounded-lg p-1">
          <button
            onClick={() => setActiveTab('projects')}
            className={`flex-1 py-2 px-3 rounded-md text-sm font-medium transition-colors duration-200 ${
              activeTab === 'projects'
                ? 'bg-white dark:bg-gray-600 text-gray-800 dark:text-white shadow-sm'
                : 'text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-white'
            }`}
          >
            Projects
          </button>
          <button
            onClick={() => setActiveTab('trash')}
            className={`flex-1 py-2 px-3 rounded-md text-sm font-medium transition-colors duration-200 ${
              activeTab === 'trash'
                ? 'bg-white dark:bg-gray-600 text-gray-800 dark:text-white shadow-sm'
                : 'text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-white'
            }`}
          >
            Trash ({trash.length})
          </button>
        </div>
        
        {activeTab === 'projects' ? (
          <>
            <h2 className={`text-lg font-semibold ${textClass} mb-6`}>YOUR PROJECTS</h2>
            
            {/* Add Project Form */}
            <div className="mb-8">
              <h3 className={`text-md font-semibold ${textClass} mb-3`}>Add Project</h3>
              <div className="space-y-3">
                <input
                  type="text"
                  placeholder="Project Title"
                  value={newProjectTitle}
                  onChange={(e) => setNewProjectTitle(e.target.value)}
                  className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${inputBgClass}`}
                />
                <input
                  type="text"
                  placeholder="Date (e.g., Dec 31, 2025)"
                  value={newProjectDate}
                  onChange={(e) => setNewProjectDate(e.target.value)}
                  className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${inputBgClass}`}
                />
                <textarea
                  placeholder="Description"
                  value={newProjectDescription}
                  onChange={(e) => setNewProjectDescription(e.target.value)}
                  className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${inputBgClass}`}
                  rows="2"
                />
                <button
                  onClick={addProject}
                  className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition duration-200"
                >
                  Add Project
                </button>
              </div>
            </div>
            
            {/* Projects List */}
            <div className="max-h-96 overflow-y-auto">
              <h3 className={`text-md font-semibold ${textClass} mb-3`}>Projects ({projects.length})</h3>
              <ul className="space-y-2">
                {projects.map(project => (
                  <li key={project.id} className="group relative">
                    <div className="flex items-center">
                      <button
                        onClick={() => handleProjectSelect(project.id)}
                        className={`flex-1 text-left px-3 py-2 rounded-md transition duration-200 ${
                          selectedProjectId === project.id 
                            ? 'bg-blue-100 text-blue-700' 
                            : `hover:bg-gray-100 dark:hover:bg-gray-700 ${textClass}`
                        }`}
                      >
                        {project.title}
                      </button>
                      <button
                        onClick={() => moveProjectToTrash(project.id)}
                        className="ml-2 p-1 text-gray-400 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-all duration-200"
                        title="Move to trash"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </>
        ) : (
          /* TRASH TAB CONTENT */
          <div className="max-h-96 overflow-y-auto">
            <h2 className={`text-lg font-semibold ${textClass} mb-6`}>TRASH</h2>
            
            {trash.length === 0 ? (
              <p className={`${textSecondaryClass} text-center py-4`}>Trash is empty</p>
            ) : (
              <div className="space-y-3">
                {trash.map(project => (
                  <div key={project.id} className={`p-3 rounded-md border ${borderClass} transition-colors duration-200`}>
                    <h3 className={`font-semibold ${textClass}`}>{project.title}</h3>
                    <p className={`text-sm ${textSecondaryClass} mb-2`}>
                      Deleted: {new Date(project.deletedAt).toLocaleDateString()}
                    </p>
                    <div className="flex space-x-2">
                      <button
                        onClick={() => restoreProjectFromTrash(project.id)}
                        className="flex-1 bg-green-500 text-white py-1 px-3 rounded text-sm hover:bg-green-600 transition duration-200"
                      >
                        Restore
                      </button>
                      <button
                        onClick={() => permanentlyDeleteProject(project.id)}
                        className="flex-1 bg-red-500 text-white py-1 px-3 rounded text-sm hover:bg-red-600 transition duration-200"
                      >
                        Delete Forever
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
      
      {/* Main Content */}
      <div className="flex-1 p-4 md:p-8 mt-16 md:mt-0 transition-all duration-200">
        {selectedProject ? (
          <div className={`${cardBgClass} rounded-lg shadow-md p-4 md:p-6 transition-colors duration-200`}>
            <div className="mb-6">
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <h1 className={`text-xl md:text-2xl font-bold ${textClass} break-words`}>{selectedProject.title}</h1>
                  <p className={`${textSecondaryClass} mt-1`}>{selectedProject.date}</p>
                  <p className={`${textSecondaryClass} mt-2`}>{selectedProject.description}</p>
                </div>
                <button
                  onClick={() => moveProjectToTrash(selectedProject.id)}
                  className="text-red-500 hover:text-red-700 transition duration-200 p-2 ml-2 flex-shrink-0"
                  title="Move to trash"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                </button>
              </div>
            </div>
            
            <hr className={`mb-6 ${borderClass}`} />
            
            <div>
              <h2 className={`text-lg md:text-xl font-semibold ${textClass} mb-4`}>Tasks</h2>
              
              {/* Add Task Form */}
              <div className="mb-6">
                <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2">
                  <input
                    type="text"
                    placeholder="Add Task"
                    value={newTaskText}
                    onChange={(e) => setNewTaskText(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && addTask()}
                    className={`flex-1 px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${inputBgClass}`}
                  />
                  <button
                    onClick={addTask}
                    className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition duration-200 sm:w-auto w-full"
                  >
                    Add
                  </button>
                </div>
              </div>
              
              {/* Tasks List */}
              <div className="space-y-3">
                {selectedProject.tasks.map(task => (
                  <div 
                    key={task.id} 
                    className={`flex items-center justify-between p-3 ${taskBgClass} rounded-md transition-colors duration-200`}
                  >
                    <div className="flex items-center flex-1 min-w-0">
                      <input
                        type="checkbox"
                        checked={task.completed}
                        onChange={() => toggleTask(selectedProject.id, task.id)}
                        className="h-4 w-4 text-blue-500 rounded focus:ring-blue-400 flex-shrink-0"
                      />
                      <span 
                        className={`ml-3 truncate ${task.completed ? 'line-through text-gray-400' : textClass}`}
                      >
                        {task.text}
                      </span>
                    </div>
                    <button
                      onClick={() => clearTask(selectedProject.id, task.id)}
                      className="text-red-500 hover:text-red-700 transition duration-200 ml-2 flex-shrink-0"
                    >
                      Clear
                    </button>
                  </div>
                ))}
                
                {selectedProject.tasks.length === 0 && (
                  <p className={`${textSecondaryClass} text-center py-4`}>No tasks yet. Add a task to get started!</p>
                )}
              </div>
            </div>
          </div>
        ) : (
          <div className={`${cardBgClass} rounded-lg shadow-md p-6 text-center transition-colors duration-200`}>
            <p className={textSecondaryClass}>
              {projects.length === 0 ? 'No projects available. Create your first project!' : 'Select a project to view its details'}
            </p>
            {projects.length === 0 && (
              <button
                onClick={() => setIsSidebarOpen(true)}
                className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition duration-200"
              >
                Create Project
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default TaskManager;