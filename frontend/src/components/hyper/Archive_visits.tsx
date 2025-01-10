import { useState } from 'react';
import VisitList from '../VisitList';

const Archive_visits = ({ visits_deleted }) => {
  const [showArchive, setShowArchive] = useState(false);
  console.log(visits_deleted);

  return (
    <>
      <div className="w-full mb-10 flex justify-center mt-8">
        <button onClick={() => setShowArchive(!showArchive)}>
          <a className="group inline-block rounded-full bg-gradient-to-r from-green-300 via-green-500 to-green-700 p-[3px] hover:text-white focus:outline-none active:text-opacity-75">
            <span className="block rounded-full bg-white px-8 py-3 text-sm font-medium group-hover:bg-transparent">
              <span> Visits Archive </span>
            </span>
          </a>
        </button>
      </div>
      {showArchive && <VisitList data={visits_deleted} />}
    </>
  );
};
export default Archive_visits;
