import { useState } from 'react';

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Hamburger Menu Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="fixed top-4 left-4 z-20 p-2 rounded-md hover:bg-gray-100"
      >
        <svg
          className="h-6 w-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M4 6h16M4 12h16M4 18h16"
          />
        </svg>
      </button>

      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-30"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div
        className={`
        fixed top-0 left-0 h-screen w-64 bg-white z-40 transform transition-transform duration-300 ease-in-out
        ${isOpen ? 'translate-x-0' : '-translate-x-full'}
      `}
      >
        <div className="h-full overflow-y-auto p-4 flex flex-col">
          {/* Close Button */}
          <button
            onClick={() => setIsOpen(false)}
            className="absolute top-4 right-4 p-2 rounded-md hover:bg-gray-100"
          >
            <svg
              className="h-5 w-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>

          {/* Logo */}
          <div className="mb-8 mt-2">
            <img
              src="/api/placeholder/120/40"
              alt="Lesson Organizer"
              className="h-10"
            />
          </div>

          {/* Main Navigation */}
          <div className="space-y-6">
            <div>
              <h2 className="text-gray-500 text-sm font-medium mb-2">
                MEIN BEREICH
              </h2>
              <nav className="space-y-1">
                <a
                  href="#"
                  className="flex items-center text-gray-700 px-2 py-2 rounded-md hover:bg-gray-100"
                >
                  <svg
                    className="h-5 w-5 mr-3"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                    />
                  </svg>
                  <span>Meine Unterrichtsstunden</span>
                  <span className="ml-auto bg-gray-100 text-gray-600 px-2 rounded-md text-sm">
                    1
                  </span>
                </a>
                <a
                  href="#"
                  className="flex items-center text-gray-700 px-2 py-2 rounded-md hover:bg-gray-100"
                >
                  <svg
                    className="h-5 w-5 mr-3"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7"
                    />
                  </svg>
                  <span>Meine Verlaufspläne</span>
                </a>
              </nav>
            </div>

            <div>
              <h2 className="text-gray-500 text-sm font-medium mb-2">
                ARBEITSGRUPPEN
              </h2>
              <nav className="space-y-1">
                <a
                  href="#"
                  className="flex items-center text-gray-700 px-2 py-2 rounded-md hover:bg-gray-100"
                >
                  <span>test</span>
                </a>
              </nav>
            </div>

            <div>
              <h2 className="text-gray-500 text-sm font-medium mb-2">
                COMMUNITY
              </h2>
              <nav className="space-y-1">
                <a
                  href="#"
                  className="flex items-center text-gray-700 px-2 py-2 rounded-md hover:bg-gray-100"
                >
                  <svg
                    className="h-5 w-5 mr-3"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  <span>Öffentliche Stunden</span>
                  <span className="ml-auto bg-gray-100 text-gray-600 px-2 rounded-md text-sm">
                    28
                  </span>
                </a>
              </nav>
            </div>
          </div>

          {/* Promotional Sections */}
          <div className="mt-auto space-y-4">
            <div className="bg-blue-50 p-4 rounded-lg">
              <div className="text-blue-600">
                <span className="text-xl">🎁</span>
                <div className="mt-1">
                  Teile deine Unterrichtsstunden mit der Community und gewinne
                  eine Jahreslizenz!
                </div>
                <a href="#" className="text-blue-700 mt-2 block">
                  Klicke hier für mehr Details
                </a>
              </div>
            </div>

            <div className="p-4 text-gray-700">
              <a href="#" className="flex items-center text-blue-600">
                <span className="text-red-500 mr-2">▶</span>
                Video-Tutorial jetzt ansehen
              </a>
            </div>

            {/* User Profile */}
            <div className="flex items-center p-2">
              <div className="w-10 h-10 rounded-full bg-red-700 flex items-center justify-center text-white">
                DS
              </div>
              <div className="ml-3">
                <div className="font-medium">Daniel</div>
                <div className="text-sm text-gray-500">Schinabeck</div>
              </div>
              <div className="ml-auto flex space-x-2">
                <button className="p-2 hover:bg-gray-100 rounded-md">
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                    />
                  </svg>
                </button>
                <button className="p-2 hover:bg-gray-100 rounded-md">
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                    />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
