export interface AgendamentoDTO {
    id: string;
    data: string;
    hora: string;
    data_cadastro: string;
    paciente: {
        id: string;
        nome: string;
        telefone: string;
        data_cadastro: string;
    };
    funcionario: {
        id: string;
        nome: string;
        data_nascimento: string;
        sexo: string;
        estado_civil: string;
        cargo: string;
        telefone: string;
        data_cadastro: string;
        data_atualizacao: string;
    };
}