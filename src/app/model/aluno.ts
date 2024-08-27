export interface Aluno {
    id: number;
    Nome: string;
    Email:  string;
    DataNascimento: string;
    Sexo: Genero;
}

export enum Genero {
    Feminino = 'Feminino',
    Masculino = 'Masculino'
}