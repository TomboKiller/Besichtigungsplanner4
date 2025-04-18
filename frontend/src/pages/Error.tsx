import { Link, useRouteError } from 'react-router-dom';

const Error = () => {
  const error = useRouteError() as any;
  console.log(error);
  if (error.status === 404) {
    return (
      <section className="flex items-center h-full p-16 text-gray-800 dark:text-gray-100">
        <div className="container flex flex-col items-center justify-center px-5 mx-auto my-8">
          <div className="max-w-md text-center">
            <h2 className="mb-8 font-extrabold text-9xl dark:text-gray-600">
              <span className="sr-only">Error</span>
              404
            </h2>
            <p className="text-2xl font-semibold md:text-3xl text-gray-800">
              Sorry, we couldn't find this page.
            </p>
            <p className="mt-4 mb-8 dark:text-gray-400 text-gray-800">
              But dont worry, you can find plenty of other things on our
              homepage.
            </p>
            <Link
              to="/"
              rel="noopener noreferrer"
              className="px-8 py-3 font-semibold rounded bg-gradient-to-r from-green-300 via-green-500 to-green-700"
            >
              Back to homepage
            </Link>
          </div>
        </div>
      </section>
    );
  }
  return (
    <div>
      <h3>something went wrong</h3>
    </div>
  );
};
export default Error;
