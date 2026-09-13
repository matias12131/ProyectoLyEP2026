import api from "./api";

const crearCliente = async (cliente) => {

    const respuesta = await api.post(
        "/users",
        cliente
    );

    return respuesta.data;
};

export default {
    crearCliente
};