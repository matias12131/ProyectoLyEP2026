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

export default {
    crearCliente,
    obtenerClientes
};