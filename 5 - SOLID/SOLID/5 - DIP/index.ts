interface Depreciacao {
    calcularDepreciacao(): number;
}

abstract class Investimento {
    constructor(public nome: string, public valorInvestido: number) {}

    abstract calcularRetornoAnual(): number;

    descrever(): string {
        return `Investimento: ${this.nome}, Valor Investido: R$ ${this.valorInvestido}`;
    }
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

    descrever(): string {
        return `${super.descrever()}, Taxa de Juros Anual: ${this.taxaDeJurosAnual}%`;
    }
}

class Acao extends Investimento  {
    constructor(
        nome: string,
        valorInvestido: number,
        public quantidade: number,
        public precoPorAcao: number,
        public dividendoAnual: number
    ) {
        super(nome, valorInvestido);
    }

    calcularRetornoAnual(): number {
        return this.quantidade * this.dividendoAnual;
    }

    descrever(): string {
        return `Ação: ${this.nome}, Quantidade: ${this.quantidade}, Preço por Ação: R$ ${this.precoPorAcao}, Dividendo Anual: R$ ${this.dividendoAnual}`;
    }
}

class Imovel extends Investimento implements  Depreciacao {
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

    calcularDepreciacao(): number {
        return this.valorInvestido * 0.01; 
    }

    descrever(): string {
        return `${super.descrever()}, Aluguel Mensal: R$ ${this.aluguelMensal}`;
    }
}

interface Depreciacao {
    calcularDepreciacao(): number;
}

class InvestimentoUseCase {
    calcularRetornoAnual(rendavel: Investimento): number {
        return rendavel.calcularRetornoAnual();
    }

    calcularDepreciacao(depreciavel: Depreciacao): number {
        return depreciavel.calcularDepreciacao();
    }

    descreverInvestimento(investimento: Investimento): string {
        return investimento.descrever();
    }
}
const titulo = new Titulo("Título Y", 10000, 7);
const acao = new Acao("Empresa X", 5000, 100, 50, 5);
const imovel = new Imovel("Apartamento Z", 300000, 1500);


const investimentoService = new InvestimentoUseCase();
console.log(`Retorno anual: R$ ${investimentoService.calcularRetornoAnual(acao)}`);
console.log(`Retorno anual: R$ ${investimentoService.calcularRetornoAnual(titulo)}`);
console.log(`Retorno anual: R$ ${investimentoService.calcularRetornoAnual(imovel)}`);


