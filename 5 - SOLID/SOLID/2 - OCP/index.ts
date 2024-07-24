abstract class Investimento {
    constructor(public nome: string, public valorInvestido: number) {}

    abstract calcularRetornoAnual(): number;

    descrever(): string {
        return `Investimento: ${this.nome}, Valor Investido: R$ ${this.valorInvestido}`;
    }
}

class Acao extends Investimento {
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
        return `${super.descrever()}, Quantidade: ${this.quantidade}, Preço por Ação: R$ ${this.precoPorAcao}, Dividendo Anual: R$ ${this.dividendoAnual}`;
    }
}

class Titulo extends Investimento {
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

class Imovel extends Investimento {
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
}

interface IInvestimentoService<T extends Investimento> {
    calcularRetornoAnual(investimento: T): number;
    descrever(investimento: T): string;
}

class AcaoService implements IInvestimentoService<Acao> {
    calcularRetornoAnual(acao: Acao): number {
        return acao.calcularRetornoAnual();
    }

    descrever(acao: Acao): string {
        return acao.descrever();
    }
}

class TituloService implements IInvestimentoService<Titulo> {
    calcularRetornoAnual(titulo: Titulo): number {
        return titulo.calcularRetornoAnual();
    }

    descrever(titulo: Titulo): string {
        return titulo.descrever();
    }
}

class ImovelService implements IInvestimentoService<Imovel> {
    calcularRetornoAnual(imovel: Imovel): number {
        return imovel.calcularRetornoAnual();
    }

    descrever(imovel: Imovel): string {
        return imovel.descrever();
    }
}


class Container {
    private services = new Map<string, any>();

    register<T>(name: string, implementation: new (...args: any[]) => T): void {
        this.services.set(name, implementation);
    }

    resolve<T>(name: string): T {
        const implementation = this.services.get(name);
        if (!implementation) {
            throw new Error(`Service not found: ${name}`);
        }
        return new implementation();
    }
}

const container = new Container();
container.register<IInvestimentoService<Acao>>("AcaoService", AcaoService);
container.register<IInvestimentoService<Titulo>>("TituloService", TituloService);
container.register<IInvestimentoService<Imovel>>("ImovelService", ImovelService);

const acao = new Acao("Empresa X", 5000, 100, 50, 5);
const titulo = new Titulo("Título Y", 10000, 7);
const imovel = new Imovel("Apartamento Z", 300000, 1500);

const acaoService = container.resolve<IInvestimentoService<Acao>>("AcaoService");
const tituloService = container.resolve<IInvestimentoService<Titulo>>("TituloService");
const imovelService = container.resolve<IInvestimentoService<Imovel>>("ImovelService");


console.log(acaoService.descrever(acao));
console.log(`Retorno anual: R$ ${acaoService.calcularRetornoAnual(acao)}`);

console.log(tituloService.descrever(titulo));
console.log(`Retorno anual: R$ ${tituloService.calcularRetornoAnual(titulo)}`);


console.log(imovelService.descrever(imovel));
console.log(`Retorno anual: R$ ${imovelService.calcularRetornoAnual(imovel)}`);

