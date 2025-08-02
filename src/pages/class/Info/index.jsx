import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Button } from "../../../components";
import "./styles.scss";

const InfoTurma = ({ id: propId, onClose }) => {
  const params = useParams();
  const id = propId || params.id;
  const [selectedClass, setSelectedClass] = useState(null);

  useEffect(() => {
    console.log(
      "[InfoTurma] Componente recebeu o ID:",
      id,
      "do tipo:",
      typeof id
    );

    const classes = JSON.parse(localStorage.getItem("turmas")) || [];
    console.log(classes);
const classId = classes.find((t) => t.id === Number(id));

    setSelectedClass(classId);
  }, [id]);

  return (
    <div className="info-turma">
      <h2>Detalhes da Turma</h2>

      {selectedClass ? (
        <>
          <p>
            <strong>Turma:</strong> {selectedClass.turma}
          </p>
          <p>
            <strong>Vagas:</strong> {selectedClass.vagas}
          </p>
          <p>
            <strong>Duração:</strong> {selectedClass.tempo}
          </p>
          <p>
            <strong>Local:</strong> {selectedClass.local}
          </p>
          <p>
            <strong>Observações:</strong> {selectedClass.observacoes}
          </p>
          <div className="color-info">
            <p>
              <strong>Cor:</strong>
            </p>
            <div
              className="color-box"
              style={{ backgroundColor: selectedClass.cor }}
            ></div>
          </div>
        </>
      ) : (
        "Nenhuma Informação encontrada"
      )}

      <Button onClick={onClose}>Fechar</Button>
    </div>
  );
};

export default InfoTurma;
