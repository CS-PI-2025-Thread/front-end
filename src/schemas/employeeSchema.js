import * as yup from "yup";

export const employeeValidationSchema = yup.object().shape({
  name: yup
    .string()
    .required("O nome do funcionário é obrigatório")
    .min(3, "O nome deve ter pelo menos 3 caracteres")
    .max(100, "Máximo de 100 caracteres"),
  email: yup
    .string()
    .required("O email é obrigatório")
    .email("Formato de email inválido")
    .min(3, "O e-mail deve ter no mínimo 3 caracteres")
    .max(100, "O e-mail deve ter no máximo 100 caracteres"),
  password: yup
    .string()
    .required("A senha é obrigatória")
    .min(8, "A senha deve ter no mínimo 8 caracteres")
    .max(30, "A senha deve ter no máximo 30 caracteres"),
  birthDate: yup
      .string()
      .transform((value) => {
        if (typeof value === "string" && !/\d/.test(value)) {
          return null;
        }
        return value;
      })
      .required("A data de nascimento é obrigatória"),
  gender: yup.string().required("O sexo é obrigatório"),
  maritalStatus: yup.string().nullable(),
  cpf: yup
    .string()
    .required("O CPF é obrigatório")
    .matches(
      /^\d{3}\.\d{3}\.\d{3}-\d{2}$/,
      "CPF deve estar no formato 000.000.000-00"
    ),
  rg: yup
    .string()
    .nullable()
    .max(20, "Máximo de 20 caracteres")
    .test("rg-format", "O RG deve conter apenas letras e números", (value) => {
      if (!value) return true;

      return /^[A-Za-z0-9]+$/.test(value);
    })
    .test(
      "numero-positivo",
      "O RG não pode conter número zero ou negativo",
      (value) => {
        if (!value) return true;
        const numeros = value.replace(/[^0-9]/g, "");
        if (!numeros) return true;
        return Number(numeros) > 0;
      }
    ),
  professionalRegister: yup
    .string()
    .required("O registro profissional é obrigatório")
    .max(100, "Máximo de 100 caracteres"),
  guardianPhone: yup
    .string()
    .nullable()
    .transform((value) => (value === "" ? null : value))
    .notRequired()
    .min(15, "Telefone incompleto"),
  cellphone: yup
    .string()
    .nullable()
    .transform((value) => (value === "" ? null : value))
    .notRequired()
    .min(15, "Celular incompleto"),
  role: yup.string().required("O cargo é obrigatório"),
  status: yup.string().required("O status é obrigatório"),
  cep: yup
    .string()
    .nullable()
    .transform((value) => (value === "" ? null : value))
    .notRequired()
    .min(9, "CEP incompleto"),
  address: yup.string().nullable().max(300, "Máximo de 300 caracteres"),
  number: yup.string().nullable().max(10, "Máximo de 10 caracteres"),
  complement: yup.string().nullable().max(100, "Máximo de 100 caracteres"),
  district: yup.string().nullable().max(100, "Máximo de 100 caracteres"),
  city: yup
    .string()
    .transform((value) => (value === "" ? null : value))
    .nullable()
    .notRequired()
    .max(100, "Máximo de 100 caracteres")
    .matches(/^[\p{L} ]+$/u, "Deve conter apenas letras"),
  state: yup
    .string()
    .transform((value) => (value === "" ? null : value))
    .nullable()
    .notRequired()
    .max(2, "Máximo de 2 letras")
    .matches(/^[\p{L} ]+$/u, "Deve conter apenas letras"),
  shift: yup.string().nullable(),
  timeMin: yup
    .string()
    .transform((value, originalValue) => (originalValue === "" ? null : value))
    .required("Horário de entrada é obrigatório")
    .matches(/^(\d{2}):(\d{2})$/, "O formato do horário deve ser 'hh:mm'"),
  timeMax: yup
    .string()
    .transform((value, originalValue) => (originalValue === "" ? null : value))
    .required("Horário de saída é obrigatório")
    .matches(/^(\d{2}):(\d{2})$/, "O formato do horário deve ser 'hh:mm'"),
  weekDays: yup
    .array()
    .of(yup.string())
    .min(1, "Escolha ao menos um dia da semana")
    .required("O campo de dias da semana é obrigatório"),
});
