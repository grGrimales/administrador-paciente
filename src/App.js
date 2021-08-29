import React, { Fragment, useState, useEffect } from "react";
import { Formulario } from "./components/Formulario";
import { Cita } from "./components/Cita";

function App() {
  //Citas en local storage
  let citasIniciales = JSON.parse(localStorage.getItem("citas"));

  if (!citasIniciales) {
    citasIniciales = [];
  }
  //Arreglo de citas
  const [citas, setCitas] = useState(citasIniciales);

  //useEffect para realiar ciertas operaciones cuando el state cambia
  useEffect(() => {
    localStorage.setItem("citas", JSON.stringify(citas));
  }, [citas, citasIniciales]);

  //Fucion para tomar las citas actuales y agregue la nueva

  const crearCita = (cita) => {
    setCitas([...citas, cita]);
  };

  //Eliminar cita
  const eliminarCita = (id) => {
    const nuevasCitas = citas.filter((cita) => cita.id !== id);
    setCitas(nuevasCitas);
  };

  //Mensaje condicional
  const titulo = citas.length === 0 ? "No hay citas" : "Administra tus citas";

  console.log(citas);

  return (
    <Fragment>
      <h1>Administrador de Pacientes</h1>;
      <div className="container">
        <div className="row">
          <div className="one-half column">
            <Formulario crearCita={crearCita} />
          </div>

          <div className="one-half column">
            <h2>{titulo}</h2>

            {citas.map((cita) => (
              <Cita
                key={cita.id}
                cita={cita}
                eliminarCita={eliminarCita}
                citas={citas}
              />
            ))}
          </div>
        </div>
      </div>
    </Fragment>
  );
}

export default App;
