import * as yup from "yup";
import { validateCPF } from "../utils/validateCPF";

export const clientValidationSchema = yup.object().shape({
    name: yup.string().required("Nome é obrigatório"),
    birthDate: yup.string().required("Data de nascimento é obrigatória"),
    gender: yup.string().required("Sexo é obrigatório"),
    cpf: yup
        .string()
        .required("CPF é obrigatório")
        .test("cpf-valido", "CPF inválido", (value) => validateCPF(value)),
    email: yup.string().nullable().email("E-mail inválido"),
});