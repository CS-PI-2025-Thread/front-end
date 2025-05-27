import * as yup from "yup";

const fetchAddressByCEP = async (cep) => {
  try {
    const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
    const data = await response.json();
    if (data.erro) return null;
    return data;
  } catch (error) {
    return null;
  }
};

const validateCPF = (cpf) => {
  cpf = cpf.replace(/[^\d]+/g, "");
  if (cpf.length !== 11 || /^(\d)\1{10}$/.test(cpf)) return false;
  let sum = 0;
  for (let i = 0; i < 9; i++) sum += parseInt(cpf[i]) * (10 - i);
  let rest = (sum * 10) % 11;
  if (rest === 10 || rest === 11) rest = 0;
  if (rest !== parseInt(cpf[9])) return false;
  sum = 0;
  for (let i = 0; i < 10; i++) sum += parseInt(cpf[i]) * (11 - i);
  rest = (sum * 10) % 11;
  if (rest === 10 || rest === 11) rest = 0;
  return rest === parseInt(cpf[10]);
};

const validationSchema = yup.object().shape({
  name: yup.string().required("Nome é obrigatório"),
  birthDate: yup.string().required("Data de nascimento é obrigatória"),
  gender: yup.string().required("Sexo é obrigatório"),
  cpf: yup
    .string()
    .required("CPF é obrigatório")
    .test("cpf-valido", "CPF inválido", (value) => validateCPF(value)),
  email: yup.string().nullable().email("E-mail inválido"),
});

const validationSchemaContract = yup.object().shape({
  name: yup.string().required("Nome do Contrato é obrigatório"),
  totalValue: yup.mixed().required("Valor Total é obrigatório"),
  typeExpire: yup.string().required("Tipo de Validade é obrigatório"),
  expire: yup
    .number()
    .typeError("Limite da Validade é obrigatório")
    .required("Limite da Validade é obrigatório")
    .min(1, "Valor deve ser maior ou igual a 1"),
});

const validationSchemaTurma = yup.object().shape({
  turma: yup.string().required('Nome da turma é obrigatório'),
  vagas: yup.number()
    .typeError('Deve ser um número')
    .required('Número de vagas é obrigatório')
    .positive('Deve ser positivo')
    .integer('Deve ser inteiro'),
  tempo: yup.number()
    .typeError('Informe a duração em minutos')
    .required('Duração é obrigatória')
    .positive('Deve ser um número positivo')
    .integer('A duração deve ser em minutos inteiros'),
  local: yup.string().required('Local da aula é obrigatório'),
  observacoes: yup.string().max(300, 'Máximo de 300 caracteres'),
  cor: yup.string().required('Selecione uma cor'),
});

export { fetchAddressByCEP, validationSchema, validationSchemaContract,validationSchemaTurma };
