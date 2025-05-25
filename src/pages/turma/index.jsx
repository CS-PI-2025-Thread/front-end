import React from 'react';
import { useForm, FormProvider, useWatch } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import './index.scss';

import ColorPicker from '../../components/selecaoCores';
import { Input, Select, Textarea, Button } from "../../components";

const locaisPredefinidos = ['Sala 101', 'Laboratório 2', 'Auditório'];

const validationSchema = Yup.object().shape({
  turma: Yup.string().required('Nome da turma é obrigatório'),
  vagas: Yup.number()
    .typeError('Deve ser um número')
    .required('Número de vagas é obrigatório')
    .positive('Deve ser positivo')
    .integer('Deve ser inteiro'),
  tempo: Yup.number()
    .typeError('Informe a duração em minutos')
    .required('Duração é obrigatória')
    .positive('Deve ser um número positivo')
    .integer('A duração deve ser em minutos inteiros'),
  local: Yup.string().required('Local da aula é obrigatório'),
  observacoes: Yup.string().max(300, 'Máximo de 300 caracteres'),
  cor: Yup.string().required('Selecione uma cor'),
});

function Formulario() {
  const methods = useForm({
    resolver: yupResolver(validationSchema),
    defaultValues: {
      turma: '',
      vagas: '',
      tempo: '',
      local: '',
      observacoes: '',
      cor: '#000000', // cor padrão
    },
  });

  const { handleSubmit } = methods;
  const localSelecionado = useWatch({ name: 'local', control: methods.control });

  const onSubmit = (data) => {
    console.log("Dados recebidos pelo formulário:", data);

    const novaTurma = {
      turma: data.turma,
      vagas: data.vagas,
      tempo: `${data.tempo} minutos`,
      local: data.local,
      observacoes: data.observacoes,
      cor: data.cor,
    };

    try {
      const turmasSalvas = JSON.parse(localStorage.getItem('turmas')) || [];
      turmasSalvas.push(novaTurma);
      localStorage.setItem('turmas', JSON.stringify(turmasSalvas));
      console.log('Turma salva:', novaTurma);
      alert('Turma cadastrada com sucesso!');
    } catch (e) {
      console.error("Erro ao salvar turma:", e);
    }
  };

  return (
    <div className="container">
      <FormProvider {...methods}>
        <form className="form" onSubmit={handleSubmit(onSubmit)}>
          <h1>Cadastro de Turma</h1>
          <Input name="turma" id="turma" label="Nome da turma" required placeholder="Digite o nome da turma" />
          <div className="row">
            <Input name="vagas" id="vagas" label="Quantidade de vagas" required placeholder="Ex: 30" />
            <Input name="tempo" id="tempo" label="Duração (minutos)" required placeholder="Ex: 50" />
            <Select name="local" id="local" label="Local da aula" required>
              <option value="">Selecione o local</option>
              {locaisPredefinidos.map(loc => (
                <option key={loc} value={loc}>{loc}</option>
              ))}
            </Select>
          </div>
          <Textarea name="observacoes" id="observacoes" label="Observações" placeholder="Caso necessário" />
          <ColorPicker name="cor" label="Selecione uma cor:" />
          <Button type="submit">Cadastrar Turma</Button>
        </form>
      </FormProvider>
    </div>
  );
}

export default Formulario;
