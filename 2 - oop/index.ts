abstract class Investimento {
    constructor(public nome: string, public valorInvestido: number) {}

    abstract calcularRetornoAnual(): number;

    descrever(): string {
        return `Investimento: ${this.nome}, Valor Investido: R$ ${this.valorInvestido}`;
    }
}


class Acao extends Investimento {
    private quantidade: number;
    private precoPorAcao: number;
    private dividendoAnual: number;

    constructor(
        nome: string,
        valorInvestido: number,
        quantidade: number,
        precoPorAcao: number,
        dividendoAnual: number
    ) {
        super(nome, valorInvestido);
        this.quantidade = quantidade;
        this.precoPorAcao = precoPorAcao;
        this.dividendoAnual = dividendoAnual;
    }

    public calcularRetornoAnual(): number {
        return this.quantidade * this.dividendoAnual;
    }

    public descrever(): string {
        return `${super.descrever()}, Quantidade: ${this.quantidade}, Preço por Ação: R$ ${this.precoPorAcao}, Dividendo Anual: R$ ${this.dividendoAnual}`;
    }

    public obterQuantidade(): number {
        return this.quantidade;
    }

    public definirQuantidade(quantidade: number): void {
        this.quantidade = quantidade;
    }
}

class Titulo extends Investimento {
    private taxaDeJurosAnual: number;

    constructor(
        nome: string,
        valorInvestido: number,
        taxaDeJurosAnual: number
    ) {
        super(nome, valorInvestido);
        this.taxaDeJurosAnual = taxaDeJurosAnual;
    }

    public calcularRetornoAnual(): number {
        return this.valorInvestido * (this.taxaDeJurosAnual / 100);
    }

    public descrever(): string {
        return `${super.descrever()}, Taxa de Juros Anual: ${this.taxaDeJurosAnual}%`;
    }

    public obterTaxaDeJurosAnual(): number {
        return this.taxaDeJurosAnual;
    }

    public definirTaxaDeJurosAnual(taxaDeJurosAnual: number): void {
        this.taxaDeJurosAnual = taxaDeJurosAnual;
    }
}

class Imovel extends Investimento {
    private aluguelMensal: number;

    constructor(
        nome: string,
        valorInvestido: number,
        aluguelMensal: number
    ) {
        super(nome, valorInvestido);
        this.aluguelMensal = aluguelMensal;
    }

    public calcularRetornoAnual(): number {
        return this.aluguelMensal * 12;
    }

    public descrever(): string {
        return `${super.descrever()}, Aluguel Mensal: R$ ${this.aluguelMensal}`;
    }

    public obterAluguelMensal(): number {
        return this.aluguelMensal;
    }

    public definirAluguelMensal(aluguelMensal: number): void {
        this.aluguelMensal = aluguelMensal;
    }
}


function processarInvestimentos(investimentos: Investimento[]): void {
    investimentos.forEach(investimento => {
        console.log(investimento.descrever());
    });
}


const acao = new Acao("Empresa X", 5000, 100, 50, 5);
const titulo = new Titulo("Título Y", 10000, 7);
const imovel = new Imovel("Apartamento Z", 300000, 1500);

const meusInvestimentos: Investimento[] = [acao, titulo, imovel];

processarInvestimentos(meusInvestimentos);

