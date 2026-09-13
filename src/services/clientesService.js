import api from "./api";

const crearCliente = async (cliente) => {

    const respuesta = await api.post(
        "/users",
        cliente
    );

    return respuesta.data;
};

const obtenerClientes = async () => {
  const respuesta = await api.get("/users");
  return respuesta.data;
};

const obtenerCliente = async (id) => {
  const respuesta = await api.get(`/users/${id}`);
  return respuesta.data;
};

const eliminarCliente = async (id) => {
  const respuesta = await api.delete(`/users/${id}`);
  return respuesta;
};

export default {
    crearCliente,
    obtenerClientes,
    obtenerCliente,
    eliminarCliente
};