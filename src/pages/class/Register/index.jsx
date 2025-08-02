import { useForm, FormProvider, useWatch } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import "./styles.scss";
import { classValidationSchema } from "../../../schemas/classSchema";
import { ColorPicker, Input, Select, Textarea, Button } from "../../../components";
import { toast } from "react-toastify";

const locaisPredefinidos = ["Sala 101", "Laboratório 2", "Auditório"];

const ClassModal = ({ onClose, onSuccess }) => {
  const methods = useForm({
    resolver: yupResolver(classValidationSchema),
    defaultValues: {
      turma: "",
      vagas: "",
      tempo: "",
      local: "",
      observacoes: "",
      cor: "#000000",
    },
  });

  const { handleSubmit } = methods;

  const localSelecionado = useWatch({
    name: "local",
    control: methods.control,
  });

  const onSubmit = (data) => {
    const novaTurma = {
      id: Date.now(),
      turma: data.turma,
      vagas: data.vagas,
      tempo: `${data.tempo} minutos`,
      local: data.local,
      observacoes: data.observacoes,
      cor: data.cor,
    };

    try {
      const turmasSalvas = JSON.parse(localStorage.getItem("turmas")) || [];
      turmasSalvas.push(novaTurma);
      localStorage.setItem("turmas", JSON.stringify(turmasSalvas));

      toast.success("Turma cadastrada com sucesso!");
      onSuccess(); // ação no componente pai, como recarregar lista
      onClose();   // fecha a modal
    } catch (e) {
      console.error("Erro ao salvar turma:", e);
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content form-class">
        <FormProvider {...methods}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <h1>Cadastro de Turma</h1>
            <Input name="turma" id="turma" label="Nome da turma" required placeholder="Digite o nome da turma" />
            <div className="row">
              <Input name="vagas" id="vagas" label="Quantidade de vagas" required placeholder="Ex: 30" />
              <Input name="tempo" id="tempo" label="Duração (minutos)" required placeholder="Ex: 50" />
              <Select name="local" id="local" label="Local da aula" required>
                <option value="">Selecione o local</option>
                {locaisPredefinidos.map((loc) => (
                  <option key={loc} value={loc}>{loc}</option>
                ))}
              </Select>
            </div>
            <Textarea name="observacoes" id="observacoes" label="Observações" placeholder="Caso necessário" />
            <ColorPicker name="cor" label="Selecione uma cor:" />
            <div className="modal-actions">
              <Button type="button" onClick={onClose}>Cancelar</Button>
              <Button type="submit">Cadastrar Turma</Button>
            </div>
          </form>
        </FormProvider>
      </div>
    </div>
  );
};

export default ClassModal;
