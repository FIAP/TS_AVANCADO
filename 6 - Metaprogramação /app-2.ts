function tipoDeInvestimento(tipo: string) {
    return function (constructor: Function) {
        constructor.prototype.tipo = tipo;
    }
}

function validarMontante(minimo: number) {
    return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
        const originalMethod = descriptor.value;
        descriptor.value = function (...args: any[]) {
            if (args[0] < minimo) {
                throw new Error(`O montante investido deve ser no mínimo R$${minimo}`);
            }
            return originalMethod.apply(this, args);
        }
    }
}

@tipoDeInvestimento("Ação")
class Acao {
    
    @validarMontante(5000)
    investir(montante: number) {
        console.log(`Investindo R$${montante} em ações.`);
    }
}

@tipoDeInvestimento("Título")
class Titulo {
    @validarMontante(1000)
    investir(montante: number) {
        console.log(`Investindo R$${montante} em títulos.`);
    }
}

try {
    const acao = new Acao();
    acao.investir(6000); 
} catch (e) {
    if (e instanceof Error) {
        console.error(e.message);
    } else {
        console.error('Erro desconhecido', e);
    }
}

const titulo = new Titulo();
titulo.investir(1500); 
