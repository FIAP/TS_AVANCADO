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

class AcaoService {
    calcularRetornoAnual(acao: Acao): number {
        return acao.quantidade * acao.dividendoAnual;
    }

    descrever(acao: Acao): string {
        return `Ação: ${acao.nome}, Quantidade: ${acao.quantidade}, Preço por Ação: R$ ${acao.precoPorAcao}, Dividendo Anual: R$ ${acao.dividendoAnual}`;
    }

    save(acao: Acao): void {
        console.log(`Saving investment: ${JSON.stringify(acao)}`);
    }
}

const acao = new Acao("Empresa X", 5000, 100, 50, 5);
const acaoService = new AcaoService();
console.log(acaoService.descrever(acao));
console.log(`Retorno anual: R$ ${acaoService.calcularRetornoAnual(acao)}`);
acaoService.save(acao);


class AcaoRetornoService {
    calcularRetornoAnual(acao: Acao): number {
        return acao.quantidade * acao.dividendoAnual;
    }
}

class AcaoDescricaoService {
    descrever(acao: Acao): string {
        return `Ação: ${acao.nome}, Quantidade: ${acao.quantidade}, Preço por Ação: R$ ${acao.precoPorAcao}, Dividendo Anual: R$ ${acao.dividendoAnual}`;
    }
}


interface IRepository<T> {
    save(investimento: T): void;
}

class Repository<T> implements IRepository<T> {
    save(investimento: T): void {
        console.log(`Saving investment: ${JSON.stringify(investimento)}`);
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
container.register<IRepository<Acao>>("AcaoRepository", Repository);
container.register<AcaoRetornoService>("AcaoRetornoService", AcaoRetornoService);
container.register<AcaoDescricaoService>("AcaoDescricaoService", AcaoDescricaoService);

const acaoRepository = container.resolve<IRepository<Acao>>("AcaoRepository");
const acaoRetornoService = container.resolve<AcaoRetornoService>("AcaoRetornoService");
const acaoDescricaoService = container.resolve<AcaoDescricaoService>("AcaoDescricaoService");


console.log(acaoDescricaoService.descrever(acao));
console.log(`Retorno anual: R$ ${acaoRetornoService.calcularRetornoAnual(acao)}`);
acaoRepository.save(acao);