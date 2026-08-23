import { Link } from "react-router-dom";
import { BsArrowLeft } from "react-icons/bs";

const BackButton = ({ destination = "/", label = "Back" }) => {
  return (
    <Link
      to={destination}
      className="btn-ghost group animate-fade-in w-fit px-5 text-sm"
    >
      <BsArrowLeft className="text-lg transition-transform duration-300 group-hover:-translate-x-1" />
      {label}
    </Link>
  );
};

export default BackButton;
