import { FaPen,FaTrashAlt } from "react-icons/fa";

export const ActionCell = ({ editar = false, eliminar = false, onClick }) => {
  return (
    <div className="block my-2">
      {editar && (
        <div className="flex text-sky-900">
          <FaPen
            onClick={onClick}
            className="mx-auto rounded text-lg cursor-pointer "
          />
        </div>
      )}
      {eliminar && (
        <div className="flex text-sky-900">
          <FaTrashAlt
            onClick={onClick}
            className="mx-auto rounded text-lg cursor-pointer "
          />
        </div>
      )}
    </div>
  );
};
