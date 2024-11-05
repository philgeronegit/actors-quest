import { Alert } from "flowbite-react";
import { HiInformationCircle } from "react-icons/hi";

type ErreurProps = {
  title: string;
  text: string;
};

const Erreur = ({ title, text }: ErreurProps) => {
  return (
    <Alert color="failure" icon={HiInformationCircle}>
      <span className="font-medium">{title}</span> {text}
    </Alert>
  );
};

export default Erreur;
