import React from "react";
import axios from "axios";
import { useState } from "react";
import ReactDOM from "react-dom/client";

const ip = "asdad";
export default class Employee extends React.Component {
  state = {
    persons: [],

    formValues: {
      name: "",
      prenume: "",
      salariu: "",
    },
  };

  componentDidMount() {}

  refrest() {
    axios.get(`http://10.40.0.163:8080/allAngajati`).then((res) => {
      const persons = res.data;
      this.setState({ persons });
    });
  }

  render() {
    return (
      <div>
        <h2>Astia's angajatii:</h2>
        <button onClick={() => this.refrest()}>REFRESH</button>

        <ul>
          {this.state.persons.map((person) => (
            <li key={person.id}>
              {person.nume} - {person.prenume} - {person.salariu} -{" "}
              {person.functie.numeFunctie} - {person.functie.nivel}
            </li>
          ))}
        </ul>

        <br />
        <br />

        <h2>Introdu angajat nou</h2>

        <MyForm />
      </div>
    );
  }
}

function MyForm(props) {
  const [inputs, setInputs] = useState({});

  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setInputs((values) => ({ ...values, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    alert(JSON.stringify(inputs));
  };

  const addAngajat = (e) => {
    // alert("A name was submitted: " + e);
    e.preventDefault();

    const body = {
      nume: inputs.nume,
      prenume: inputs.prenume,
      salariu: inputs.salariu,
      functie: {
        numeFunctie: inputs.functionName,
        nivel: inputs.nivel,
      },
    };

    // alert("ASDASD" + JSON.stringify(JSON.stringify(body)));

    axios.post(`http://10.40.0.163:8080/addAngajat`, body);
    return false;
  };

  const style = {
    color: "black",
    marginRight: "30px",
  };

  return (
    <form onSubmit={(e) => addAngajat(e)}>
      <div className="container">
        <div className="row">
          <div className="col-sm-3 offset-sm-1">
            <div className="form-group">
              <label style={style}>Nume</label>
              <input
                type="text"
                name="nume"
                value={inputs.nume || ""}
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="col-sm-3">
            <div className="form-group">
              <label style={style}>Prenume</label>
              <input
                type="text"
                name="prenume"
                value={inputs.prenume || ""}
                onChange={handleChange}
                className="form-control"
              />
            </div>
          </div>
          <div className="col-sm-3">
            <div className="form-group">
              <label style={style}>Salariu</label>
              <input
                type="text"
                name="salariu"
                value={inputs.salariu}
                className="form-control"
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="col-sm-3">
            <div className="form-group">
              <label style={style}>Functie</label>
              <input
                type="text"
                name="functionName"
                value={inputs.functionName || ""}
                onChange={handleChange}
                className="form-control"
              />
            </div>
          </div>
          <div className="col-sm-3">
            <div className="form-group">
              <label style={style}>Nivel</label>
              <input
                type="text"
                name="nivel"
                value={inputs.nivel || ""}
                onChange={handleChange}
                className="form-control"
              />
            </div>
          </div>
        </div>
      </div>

      <input type="submit" />
    </form>
  );
}
