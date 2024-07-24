import { Investment } from './investment';

// Função para adicionar um novo investimento
export const addInvestment = (investments: Investment[], newInvestment: Investment): Investment[] => {
    return [...investments, newInvestment];
};

// Função para calcular o valor total investido
export const calculateTotalInvested = (investments: Investment[]): number => {
    return investments.reduce((total, investment) => total + investment.amount, 0);
};

// Função para filtrar investimentos por tipo
export const filterInvestmentsByType = (investments: Investment[], type: string): Investment[] => {
    return investments.filter(investment => investment.type === type);
};
