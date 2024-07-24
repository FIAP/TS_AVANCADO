abstract class Investimento {
    constructor(public nome: string, public valorInvestido: number) {}

    abstract calcularRetornoAnual(): number;
    abstract calcularDepreciacao(): number;
    

    descrever(): string {
        return `Investimento: ${this.nome}, Valor Investido: R$ ${this.valorInvestido}`;
    }
}


function imprimirRetornoAnual(investimento: Investimento): void {
    console.log(investimento.descrever());
    console.log(`Retorno anual: R$ ${investimento.calcularRetornoAnual()}`);
}


class Titulo extends Investimento  {
   
    constructor(
        nome: string,
        valorInvestido: number,
        public taxaDeJurosAnual: number
    ) {
        super(nome, valorInvestido);
    }

    calcularRetornoAnual(): number {
        return this.valorInvestido * (this.taxaDeJurosAnual / 100);
    }

    calcularDepreciacao(): number {
        throw new Error("Method not implemented.");
    }
  

    descrever(): string {
        return `${super.descrever()}, Taxa de Juros Anual: ${this.taxaDeJurosAnual}%`;
    }
}

class Acao extends Investimento  {
  
    constructor(
        public nome: string,
        public valorInvestido: number,
        public quantidade: number,
        public precoPorAcao: number,
        public dividendoAnual: number
    )  {
        super(nome, valorInvestido);
    }

    calcularRetornoAnual(): number {
        return this.quantidade * this.dividendoAnual;
    }

    calcularDepreciacao(): number {
        throw new Error("Method not implemented.");
    }

 
    descrever(): string {
        return `Ação: ${this.nome}, Quantidade: ${this.quantidade}, Preço por Ação: R$ ${this.precoPorAcao}, Dividendo Anual: R$ ${this.dividendoAnual}`;
    }
}

class Imovel extends Investimento  {
    constructor(
        nome: string,
        valorInvestido: number,
        public aluguelMensal: number
    ) {
        super(nome, valorInvestido);
    }

    calcularRetornoAnual(): number {
        return this.aluguelMensal * 12;
    }

    descrever(): string {
        return `${super.descrever()}, Aluguel Mensal: R$ ${this.aluguelMensal}`;
    }  

    calcularDepreciacao(): number {
        return this.valorInvestido * 0.01; 
    }  
   
} 


const acao = new Acao("Empresa X", 5000, 100, 50, 5);
const titulo = new Titulo("Título Y", 10000, 7);
const imovel = new Imovel("Apartamento Z", 300000, 1500);

imprimirRetornoAnual(acao);
imprimirRetornoAnual(titulo);
imprimirRetornoAnual(imovel); 

console.log(`Depreciação anual: R$ ${imovel.calcularDepreciacao()}`);