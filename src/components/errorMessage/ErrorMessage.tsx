import { IErrorMessageProps } from "../../models";
import ErrorIcon from "../UI/ErrorIcon";

const ErrorMessage: React.FC<IErrorMessageProps> = ({ message }) => {
  return (
    <div className="grid place-items-center bg-primary-bg">
      <div className="grid gap-1 place-items-center">
        <ErrorIcon />
        <h2 className="text-lg font-bold text-center text-primary-text">
          {message}
        </h2>
      </div>
    </div>
  );
};

export default ErrorMessage;
