import { FC, useState } from 'react';
import VisitList from './VisitList';
import { GetVisitResponseDto } from '../api/response.dto';

interface ArchiveVisitsProps {
  visits_archived: GetVisitResponseDto[];
}

const Archive_visits: FC<ArchiveVisitsProps> = ({ visits_archived }) => {
  const [showArchive, setShowArchive] = useState(false);
  const handleArchiveClick = () => {
    if (!showArchive) {
      window.scrollTo({
        top: document.documentElement.scrollHeight,
        behavior: 'smooth',
      });
    }

    setShowArchive(!showArchive);
  };
  return (
    <>
      <div className="fixed bottom-8 right-8 z-20">
        <button onClick={() => handleArchiveClick()}>
          <a className="group inline-block rounded-full bg-gradient-to-r from-green-300 via-green-500 to-green-700 p-[3px] hover:text-white focus:outline-none active:text-opacity-75">
            <span className="block rounded-full bg-white px-8 py-3 text-sm font-medium group-hover:bg-transparent">
              {showArchive ? 'Archive ausblenden' : 'Archive zeigen'}
            </span>
          </a>
        </button>
      </div>
      {showArchive && <VisitList data={visits_archived} />}
    </>
  );
};
export default Archive_visits;
