import { FaPen } from "react-icons/fa";

export const ActionCell = ({ editar }) => {
  return (
    <div className="h-full w-full block my-2">
      {editar && (
        <div className="flex text-sky-900">
          <FaPen className="mx-auto rounded text-lg cursor-pointer " />
        </div>
      )}
    </div>
  );
};
