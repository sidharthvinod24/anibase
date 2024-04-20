import { Link, useNavigate } from "react-router-dom";
import { FaExclamationTriangle } from "react-icons/fa";
const NotFoundPage = ({ text = "This Page does not exist" }) => {
  const navigate = useNavigate();
  return (
    <section className="text-center flex flex-col justify-center items-center h-96 text-white">
      <FaExclamationTriangle className="text-yellow-400 text-6xl mb-4" />
      <h1 className="text-6xl font-bold mb-4">404 Not Found</h1>
      <p className="text-xl mb-5">{text}</p>
      <Link
        to="/"
        className=" bg-indigo-700 hover:bg-indigo-900 rounded-md px-3 py-2 mt-4"
      >
        Home Page
      </Link>
      <button
        className=" bg-indigo-700 hover:bg-indigo-900 rounded-md px-3 py-2 mt-4"
        onClick={() => navigate(-1)}
      >
        Go back
      </button>
    </section>
  );
};

export default NotFoundPage;
