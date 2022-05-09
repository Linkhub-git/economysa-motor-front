import React, { useEffect, useState } from "react";
import { FaArrowLeft, FaSave } from "react-icons/fa";
import { useNavigate, useParams } from "react-router-dom";
import { apiUrl } from "../../api/apiUrl";
import { PageContainer } from "../layout/pageContainer";
import { Title } from "../layout/Title";
import { RiLoader3Fill } from "react-icons/ri";
import "./Formularios.css";
import { toast } from "react-toastify";

function FormularioUsuarios() {
  const navigate = useNavigate();
  const params = useParams();
  const { id } = params;
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState(null);
  const [{ name, last_name, email, password, role, phone }, setFormValues] =
    useState({
      name: "",
      last_name: "",
      email: "",
      password: "",
      role: "",
      phone: "",
    });

  const fetchData = async () => {
    try {
      const { data } = await apiUrl.get(`/user/${id}`);
      setUser(data);
      setLoading(false);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    if (id) {
      setLoading(true);
      fetchData();
    }
  }, [id]);

  useEffect(() => {
    if (user) {
      setFormValues((st) => ({
        ...st,
        name: user.name,
        last_name: user.lastName,
        email: user.email,
        phone: user.phone,
        role: user.role,
      }));
    }
  }, [user]);

  const handleChange = ({ target }) => {
    setFormValues((st) => ({
      ...st,
      [target.name]: target.value,
    }));
  };

  const handleCreateUser = async (e) => {
    e.preventDefault();
    if (name.trim() === "") {
      toast.error("Nombre es obligatorio");
      return;
    }
    if (last_name.trim() === "") {
      toast.error("Apellido es obligatorio");
      return;
    }
    if (email.trim() === "" || !email.includes("a")) {
      toast.error("Correo es obligatorio y debe ser válido");
      return;
    }
    if (password.trim() === "") {
      toast.error("La contraseña es obligatoria");
      return;
    }
    if (role.trim() === "") {
      toast.error("El rol es obligatorio");
      return;
    }
    if (phone.trim() === "") {
      toast.error("El teléfono es obligatorio");
      return;
    }
    if (!phone.match(/[ 0-9]+/)) {
      toast.error("El teléfono no puede contener letras");
      return;
    }

    try {
      const res = await apiUrl.post("/user", {
        name,
        email,
        password,
        role,
        lastName: last_name,
        phone,
      });
      res.status === 201 && navigate("/security");
    } catch (err) {
      toast.error(err.response.data.detail);
    }
  };
  const handleEditUser = async (e) => {
    e.preventDefault();
    if (name.trim() === "") {
      toast.error("Nombre es obligatorio");
      return;
    }
    if (last_name.trim() === "") {
      toast.error("Apellido es obligatorio");
      return;
    }

    if (role.trim() === "") {
      toast.error("El rol es obligatorio");
      return;
    }
    if (phone.trim() === "") {
      toast.error("El teléfono es obligatorio");
      return;
    }
    if (!phone.match(/[ 0-9]+/)) {
      toast.error("El teléfono no puede contener letras");
      return;
    }

    try {
      const res = await apiUrl.put(`/user/${user.id}`, {
        role,
        name,
        lastName: last_name,
        phone,
      });
      console.log(res);
      if (res.status === 200) {
        navigate("/security");
      }
    } catch (err) {
      toast.error(err.response.data.detail);
    }
  };

  return (
    <div>
      {loading ? (
        <div className="w-full h-full flex justify-center items-center">
          <RiLoader3Fill />
        </div>
      ) : (
        <PageContainer>
          <Title title={`${user ? "Detalles de Usuario" : "Crear Usuario"}`} />
          <form
            className="bg-gray-200 px-3 py-2 mt-4 rounded"
            onSubmit={user ? handleEditUser : handleCreateUser}
          >
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              <div className="flex flex-col">
                <label htmlFor="name">Nombre</label>
                <input
                  type="text"
                  className="border rounded outline py-1 px-2 border-gray-200"
                  id="name"
                  name="name"
                  value={name}
                  onChange={handleChange}
                />
              </div>
              <div className="flex flex-col">
                <label htmlFor="last-name">Apellido</label>
                <input
                  type="text"
                  className="border rounded outline py-1 px-2 border-gray-200"
                  id="last-name"
                  name="last_name"
                  value={last_name}
                  onChange={handleChange}
                />
              </div>
              <div className="flex flex-col">
                <label htmlFor="email">Correo electrónico</label>
                <input
                  disabled={user}
                  type="email"
                  className="border rounded outline py-1 px-2 border-gray-200"
                  id="email"
                  name="email"
                  value={email}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mt-3">
              {!user && (
                <div className="flex flex-col">
                  <label htmlFor="password">Contraseña</label>
                  <input
                    type="password"
                    className="border rounded outline py-1 px-2 border-gray-200"
                    id="password"
                    name="password"
                    value={password}
                    onChange={handleChange}
                  />
                </div>
              )}
              <div className="flex flex-col">
                <label htmlFor="role">Rol</label>
                <select
                  id="role"
                  name="role"
                  value={role}
                  onChange={handleChange}
                  className="py-1 px-2 rounded outline-none disabled:opacity-50"
                  disabled={user}
                >
                  <option value="" disabled>
                    Seleccione un rol
                  </option>
                  <option value="admin">Administrador</option>
                  <option value="editor">Editor</option>
                  <option value="consultor">Consultor</option>
                </select>
              </div>
              <div className="flex flex-col">
                <label htmlFor="phone">Teléfono</label>
                <input
                  type="tel"
                  className="border rounded outline py-1 px-2 border-gray-200"
                  id="phone"
                  name="phone"
                  value={phone}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="w-full flex justify-center items-center mt-4 mb-2">
              <button
                type="submit"
                className="flex items-center justify-center text-white bg-[#1F2937] py-1 px-3 rounded"
              >
                <FaSave className="mr-2" /> Guardar
              </button>
              <button
                type="button"
                className="ml-3 flex items-center justify-center text-white bg-gray-400 py-1 px-3 rounded"
                onClick={() => navigate(-1)}
              >
                <FaArrowLeft className="mr-2" /> Atrás
              </button>
            </div>
          </form>
        </PageContainer>
      )}
    </div>
  );
}

export default FormularioUsuarios;
