import '../css/formcliente.css'
import { useState } from "react";
import { Form, Button, Alert, Spinner } from "react-bootstrap";
import clientesService from "../services/clientesService";

const FormCliente = () => {

    const [nombre, setNombre] = useState("");
    const [email, setEmail] = useState("");
    const [telefono, setTelefono] = useState("");
    const [ciudad, setCiudad] = useState("");

    const [password, setPassword] = useState("");
    const [erroresCampos, setErroresCampos] = useState({});

    const [mensaje, setMensaje] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const manejarSubmit = async (e) => {

        e.preventDefault();

        setMensaje("");
        setError("");

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        const nuevosErrores = {};

        if (nombre.trim() === "") {
            nuevosErrores.nombre = "El nombre es obligatorio.";
        }
        if (email.trim() === "") {
            nuevosErrores.email = "El email es obligatorio.";
        }
        if (telefono.trim() === "") {
            nuevosErrores.telefono = "El teléfono es obligatorio.";
        }
        if (ciudad.trim() === "") {
            nuevosErrores.ciudad = "La ciudad es obligatoria.";
        }

        // Misma regla de complejidad que ya valida Login.jsx, para que
        // ningún cliente nuevo quede con una contraseña débil o repetida.
        if (!password) {
            nuevosErrores.password = "La contraseña es obligatoria.";
        } else if (password.length < 8) {
            nuevosErrores.password = "Mínimo 8 caracteres.";
        } else if (!/[A-Z]/.test(password)) {
            nuevosErrores.password = "Debe tener una mayúscula.";
        } else if (!/[0-9]/.test(password)) {
            nuevosErrores.password = "Debe tener un número.";
        }

        setErroresCampos(nuevosErrores);

        if (Object.keys(nuevosErrores).length > 0) {
            return;
        }

        //Agregado por Apaza Ignacio/ #8
        if (!emailRegex.test(email)) {

            setError("Ingrese un email válido.");

            return;
        }

        const nuevoCliente = {

            email,

            username: nombre.toLowerCase().replace(/\s/g, ""),

            password,

            name: {
                firstname: nombre,
                lastname: "-"
            },

            address: {
                city: ciudad
            },

            phone: telefono
        };

        try {

            setLoading(true);

            const respuesta =
                await clientesService.crearCliente(
                    nuevoCliente
                );

            setMensaje(
                `Cliente creado correctamente. ID: ${respuesta.id}`
            );

            setNombre("");
            setEmail("");
            setTelefono("");
            setCiudad("");
            setPassword("");

        } catch {

            setError(
                "Ocurrió un error al crear el cliente."
            );

        } finally {

            setLoading(false);

        }

    };

    return (

        <div className='formulario-cliente'>

            <h3>Nuevo Cliente</h3>

            <Form onSubmit={manejarSubmit}>

                <Form.Group className="mb-3">

                    <Form.Label>Nombre</Form.Label>

                    <Form.Control
                        type="text"
                        value={nombre}
                        onChange={(e) =>
                            setNombre(e.target.value)
                        }
                        isInvalid={!!erroresCampos.nombre}
                    />

                    <Form.Control.Feedback type="invalid">
                        {erroresCampos.nombre}
                    </Form.Control.Feedback>

                </Form.Group>

                <Form.Group className="mb-3">

                    <Form.Label>Email</Form.Label>

                    <Form.Control
                        type="email"
                        value={email}
                        onChange={(e) =>
                            setEmail(e.target.value)
                        }
                        isInvalid={!!erroresCampos.email}
                    />

                    <Form.Control.Feedback type="invalid">
                        {erroresCampos.email}
                    </Form.Control.Feedback>

                </Form.Group>

                <Form.Group className="mb-3">

                    <Form.Label>Contraseña</Form.Label>

                    <Form.Control
                        type="password"
                        value={password}
                        onChange={(e) =>
                            setPassword(e.target.value)
                        }
                        isInvalid={!!erroresCampos.password}
                    />

                    <Form.Control.Feedback type="invalid">
                        {erroresCampos.password}
                    </Form.Control.Feedback>

                    <Form.Text muted>
                        Mínimo 8 caracteres, con una mayúscula y un número.
                    </Form.Text>

                </Form.Group>

                <Form.Group className="mb-3">

                    <Form.Label>Teléfono</Form.Label>

                    <Form.Control
                        type="text"
                        value={telefono}
                        onChange={(e) =>
                            setTelefono(e.target.value)
                        }
                        isInvalid={!!erroresCampos.telefono}
                    />

                    <Form.Control.Feedback type="invalid">
                        {erroresCampos.telefono}
                    </Form.Control.Feedback>

                </Form.Group>

                <Form.Group className="mb-3">

                    <Form.Label>Ciudad</Form.Label>

                    <Form.Control
                        type="text"
                        value={ciudad}
                        onChange={(e) =>
                            setCiudad(e.target.value)
                        }
                        isInvalid={!!erroresCampos.ciudad}
                    />

                    <Form.Control.Feedback type="invalid">
                        {erroresCampos.ciudad}
                    </Form.Control.Feedback>

                </Form.Group>

                <Button
                    variant="primary"
                    type="submit"
                    disabled={loading}
                >

                    {
                        loading
                            ? <Spinner size="sm" />
                            : "Guardar Cliente"
                    }

                </Button>

            </Form>

            {
                mensaje &&
                <Alert
                    className="mt-3"
                    variant="success"
                >
                    {mensaje}
                </Alert>
            }

            {
                error &&
                <Alert
                    className="mt-3"
                    variant="danger"
                >
                    {error}
                </Alert>
            }

        </div>

    );
};

export default FormCliente;