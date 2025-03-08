import { createEvent } from 'ics';
import { saveAs } from 'file-saver';
import { GetVisitResponseDto } from '../../api/response.dto';
import { FC } from 'react';
// @ts-ignore
import DeleteIcon from '../../assets/delete.svg?react';
interface CardContentProps {
  visit?: GetVisitResponseDto;
}

const Button_Download_ics: FC<CardContentProps> = ({ visit }) => {
  console.log(visit?.datetime);
  const formattedDate = (): [number, number, number, number, number] | null => {
    if (!visit?.datetime) {
      return null;
    }
    const date = new Date(visit.datetime);
    return [
      date.getUTCFullYear(),
      date.getUTCMonth() + 1, // Months are 0-indexed in JS, need +1 for ICS format
      date.getUTCDate(),
      date.getUTCHours() + 1,
      date.getUTCMinutes(),
    ];
  };

  const handleSave = () => {
    const dateArray = formattedDate();
    if (!dateArray) {
      console.error('No date available for the event');
      return;
    }

    const event = {
      start: dateArray as [number, number, number, number, number],
      duration: { minutes: 30 },
      title: `Besichtigung ${visit?.name}` || 'Untitled Event',
      description: 'Test',
    };

    createEvent(event, (error, value) => {
      const blob = new Blob([value], { type: 'text/plain;charset=utf-8' });
      saveAs(blob, `besichtigung-${visit?.name}.ics`);
    });
  };

  return (
    <button
      // type="submit"
      onClick={handleSave}
      className="text-slate-800 hover:text-blue-600 text-sm bg-white hover:bg-slate-100 border border-slate-200 rounded-lg font-medium px-4 py-2 inline-flex space-x-1 items-center"
    >
      <span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5 mr-1"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
          />
        </svg>
      </span>
    </button>
  );
};
export default Button_Download_ics;
