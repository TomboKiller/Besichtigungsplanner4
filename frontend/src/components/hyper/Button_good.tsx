import { Form } from 'react-router-dom';
import { VisitStatus, Visit } from '../../api';
import { FC } from 'react';
import statusColorClassMap from './CardHeader';



interface Button_goodProps {
  status: VisitStatus;
  id: Visit["id"];
}

const statusButtonClassMap: Record<VisitStatus, string> = {
  see: 'bg-gradient-to-r from-violet-300 via-violet-500 to-violet-700',
  wait: 'bg-gradient-to-r from-blue-300 via-blue-500 to-blue-700',
  interest: 'bg-gradient-to-r from-green-300 via-green-500 to-green-700',
  finish: 'bg-green-500',
  ignore: 'bg-gray-400',
};



const Button_good: FC<Button_goodProps> = ({ id, status }) => {
  switch (status) {
    case 'wait':
      return (
        <Form method="post" action={`/besichtigt/${id}`}>
          <button type="submit">
            <a class="group inline-block rounded-full bg-gradient-to-r from-blue-300 via-blue-500 to-blue-700 p-[3px] hover:text-white focus:outline-none active:text-opacity-75">
              <span class="block rounded-full bg-white px-8 py-3 text-sm font-medium group-hover:bg-transparent">
                Besichtigt
              </span>
            </a>
          </button>
        </Form>
      );
    case 'see':
      return (
        <Form method="post" action={`/interesse/${id}`}>
          <button type="submit">
            <a class="group inline-block rounded-full bg-gradient-to-r from-violet-300 via-violet-500 to-violet-700 p-[3px] hover:text-white focus:outline-none active:text-opacity-75">
              <span class="block rounded-full bg-white px-8 py-3 text-sm font-medium group-hover:bg-transparent">
                Interesse
              </span>
            </a>
          </button>
        </Form>
      );
    case 'interest':
      return (
        <Form method="post" action={`/abschluss/${id}`}>
          <button type="submit">
            <a class="group inline-block rounded-full bg-gradient-to-r from-green-300 via-green-500 to-green-700 p-[3px] hover:text-white focus:outline-none active:text-opacity-75">
              <span class="block rounded-full bg-white px-8 py-3 text-sm font-medium group-hover:bg-transparent">
                Abschluss
              </span>
            </a>
          </button>
        </Form>
      );
  }
};
export default Button_good;
