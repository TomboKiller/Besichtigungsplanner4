import { FC, useState } from 'react';
import { GetRentalResponseDto } from '../api/response_rentals.dto';

interface RentalSidebarProps {
  data: GetRentalResponseDto[];
}

const Sidebar: FC<RentalSidebarProps> = ({ data }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isAddingUnit, setIsAddingUnit] = useState(false);
  const [newUnitName, setNewUnitName] = useState('');
  const [units, setUnits] = useState(data);

  const toggleAddUnit = () => {
    setIsAddingUnit(!isAddingUnit);
    // Reset input when closing
    if (isAddingUnit) {
      setNewUnitName('');
    }
  };

  const handleAddUnit = () => {
    if (newUnitName.trim()) {
      const newUnit = {
        id: units.length + 1,
        name: newUnitName.trim(),
      };
      setUnits([...units, newUnit]);
      setNewUnitName('');
      setIsAddingUnit(false);
    }
  };

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

          {/* Main Navigation */}
          <div className="space-y-6">
            <div>
              <div className="flex justify-between items-center">
                <h2 className="text-gray-500 text-sm font-medium mb-2 mt-10">
                  Wohneinheiten
                </h2>
                <button
                  onClick={toggleAddUnit}
                  className="inline-flex items-center ml-2"
                >
                  <svg
                    className="h-5 w-5 text-blue-600 hover:text-blue-700"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    {isAddingUnit ? (
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M6 18L18 6M6 6l12 12"
                      />
                    ) : (
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M12 4v16m8-8H4"
                      />
                    )}
                  </svg>
                </button>
              </div>

              {/* Add Unit Input */}
              {isAddingUnit && (
                <div className="mb-2 flex">
                  <input
                    type="text"
                    value={newUnitName}
                    onChange={(e) => setNewUnitName(e.target.value)}
                    placeholder="Name der Wohneinheit"
                    className="w-full px-2 py-1 border rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    autoFocus
                  />
                  <button
                    onClick={handleAddUnit}
                    className="bg-blue-500 text-white px-2 rounded-r-md hover:bg-blue-600"
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
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  </button>
                </div>
              )}

              <div className="space-y-1">
                {units.map((rental) => (
                  <p
                    key={rental.id}
                    className="flex items-center text-gray-700 px-2 py-2 rounded-md hover:bg-gray-100"
                  >
                    {rental.name}
                  </p>
                ))}
              </div>
            </div>
          </div>

          {/* Spacer to push profile to bottom */}
          <div className="flex-grow" />

          {/* User Profile */}
          <div className="mt-auto border-t pt-4">
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
