import { useEffect, useState, type FC, type ReactNode } from 'react';
import Input from './Input';
import { GetVisitResponseDto } from '../../api/response.dto';
// @ts-ignore
import PersonIcon from '../../assets/person.svg?react';
// @ts-ignore
import MultiplePersonIcon from '../../assets/multiplePersons.svg?react';
// @ts-ignore
import CalenderIcon from '../../assets/calendar.svg?react';
// @ts-ignore
import Pets from '../../assets/pets.svg?react';
// @ts-ignore
import Job from '../../assets/job.svg?react';
// @ts-ignore
import Others from '../../assets/others.svg?react';

import DateInput from './DateInput';
interface CardContentProps {
  visit?: GetVisitResponseDto;
}

const DEFAULT_STATE: GetVisitResponseDto = {
  id: '',
  status: 'wait',
  createdAt: '',
  name: '',
  numberOfPeople: '',
  pets: '',
  jobTitle: '',
  datetime: '',
  other: '',
};

const CardContent: FC<CardContentProps> = ({ visit }) => {
  const [edit, setEdit] = useState(false);

  const [state, setState] = useState<GetVisitResponseDto>(
    visit || DEFAULT_STATE
  );

  return (
    <>
      <div className="my-3 text-sm space-y-4">
        <Input
          name="name"
          disabled={edit}
          placeholder="Name*"
          value={state.name}
          onChange={(name) => {
            setState((s) => ({ ...s, name }));
          }}
        >
          <PersonIcon className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
        </Input>
         
        <DateInput
          name="datetime"
          value={state.datetime}
          onChange={(datetime) => setState((c) => ({ ...c, datetime }))}
          disabled={edit}
        >
          <CalenderIcon className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
        </DateInput>
        <Input
          name="numberOfPeople"
          disabled={edit}
          placeholder="Personenanzahl"
          value={state.numberOfPeople}
          onChange={(numberOfPeople) => {
            setState((s) => ({ ...s, numberOfPeople }));
          }}
        >
          <MultiplePersonIcon className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
        </Input>
        <Input
          name="jobTitle"
          disabled={edit}
          placeholder="Berufstätigkeit"
          value={state.jobTitle}
          onChange={(jobTitle) => {
            setState((s) => ({ ...s, jobTitle }));
          }}
        >
          <Job className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
        </Input>
        <Input
          name="pets"
          disabled={edit}
          placeholder="Haustiere"
          value={state.pets}
          onChange={(pets) => {
            setState((s) => ({ ...s, pets }));
          }}
        >
          <Pets className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
        </Input>
        <Input
          name="other"
          disabled={edit}
          placeholder="Sonstiges"
          value={state.other || ''}
          onChange={(other) => {
            setState((s) => ({ ...s, other }));
          }}
        >
          <Others className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
        </Input>
      </div>
    </>
  );
};

export default CardContent;
