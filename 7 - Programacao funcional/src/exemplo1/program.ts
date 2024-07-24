import { Investment } from './investment';
import { addInvestment, calculateTotalInvested, filterInvestmentsByType } from './investmentUtils';

let investments: Investment[] = [];

investments = addInvestment(investments, { id: 1, type: 'stocks', amount: 1000 });
investments = addInvestment(investments, { id: 2, type: 'bonds', amount: 500 });
investments = addInvestment(investments, { id: 3, type: 'stocks', amount: 1500 });

const totalInvested = calculateTotalInvested(investments);
console.log(`Total Invested: $${totalInvested}`); 

const stockInvestments = filterInvestmentsByType(investments, 'bonds');
console.log('Stock Investments:', stockInvestments); 
