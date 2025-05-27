
import React, { useState, useEffect } from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import './index.scss';

import { validationSchemaTurma } from '../../utils/validation';
import ColorPicker from '../../components/selecaoCores';
import { Input, Select, Textarea, Button } from "../../components";

function Formulario({ turmaEditando, aoSalvar, aoCancelar }) {
  const [locais, setLocais] = useState(['Sala 101', 'Laboratório 2', 'Auditório']);
  const [novoLocal, setNovoLocal] = useState('');
  const [mostrarCampoNovoLocal, setMostrarCampoNovoLocal] = useState(false);

  const methods = useForm({
    resolver: yupResolver(validationSchemaTurma),
    defaultValues: {
      turma: '',
      vagas: '',
      tempo: '',
      local: '',
      observacoes: '',
      cor: '#000000',
    },
  });

  const { handleSubmit, watch, setValue, reset } = methods;
  const localSelecionado = watch('local');

  useEffect(() => {
    if (turmaEditando) {
      const valores = { ...turmaEditando };
      valores.tempo = valores.tempo?.replace(' minutos', '');
      reset(valores);
    }
  }, [turmaEditando, reset]);

  const onSubmit = (data) => {
    const novaTurma = {
      turma: data.turma,
      vagas: data.vagas,
      tempo: `${data.tempo} minutos`,
      local: data.local,
      observacoes: data.observacoes,
      cor: data.cor,
    };

    try {
      let turmasSalvas = JSON.parse(localStorage.getItem('turmas')) || [];

      if (turmaEditando) {
        turmasSalvas = turmasSalvas.map(t => t.turma === turmaEditando.turma ? novaTurma : t);
      } else {
        turmasSalvas.push(novaTurma);
      }

      localStorage.setItem('turmas', JSON.stringify(turmasSalvas));
      alert(`Turma ${turmaEditando ? 'atualizada' : 'cadastrada'} com sucesso!`);
      aoSalvar();
    } catch (e) {
      console.error("Erro ao salvar turma:", e);
    }
  };

  const handleNovoLocal = () => {
    if (novoLocal.trim() !== '') {
      setLocais([...locais, novoLocal]);
      setValue('local', novoLocal);
      setNovoLocal('');
      setMostrarCampoNovoLocal(false);
    }
  };

  useEffect(() => {
    if (localSelecionado === 'novo-local') {
      setMostrarCampoNovoLocal(true);
    }
  }, [localSelecionado]);

  return (
    <div className="container" style={{ paddingTop: '2rem' }}>
      <FormProvider {...methods}>
        <form className="form" onSubmit={handleSubmit(onSubmit)}>
          <h1>{turmaEditando ? 'Editar Turma' : 'Cadastro de Turma'}</h1>

          <Input
            name="turma"
            label="Nome da turma"
            required
            placeholder="Digite o nome da turma"
          />

          <div className="row">
            <Input
              name="vagas"
              label="Quantidade de vagas"
              required
              placeholder="Ex: 30"
            />
            <Input
              name="tempo"
              label="Duração (minutos)"
              required
              placeholder="Ex: 50"
            />

            <div className="campo-local">
              <Select name="local" label="Local da aula" required>
                <option value="">Selecione o local</option>
                {locais.map(loc => (
                  <option key={loc} value={loc}>{loc}</option>
                ))}
                <option value="novo-local">➕ Adicionar novo local</option>
              </Select>

              {mostrarCampoNovoLocal && (
                <div className="widget-novo-local">
                  <input
                    type="text"
                    value={novoLocal}
                    onChange={(e) => setNovoLocal(e.target.value)}
                    placeholder="Digite o novo local"
                    className="input-novo-local"
                  />
                  <button
                    type="button"
                    onClick={handleNovoLocal}
                    className="btn-salvar-local"
                  >
                    Salvar local
                  </button>
                </div>
              )}
            </div>
          </div>

          <Textarea
            name="observacoes"
            label="Observações"
            placeholder="Caso necessário"
          />

          <div className="cor-picker-wrapper">
            <ColorPicker name="cor" />
          </div>

          <div className="botoes-acao">
            <Button type="submit">{turmaEditando ? 'Salvar Alterações' : 'Cadastrar Turma'}</Button>
            <Button type="button" variant="secondary" onClick={aoCancelar}>Cancelar</Button>
          </div>
        </form>
      </FormProvider>
    </div>
  );
}

export default Formulario;