var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var Investimento = /** @class */ (function () {
    function Investimento(nome, valorInvestido) {
        this.nome = nome;
        this.valorInvestido = valorInvestido;
    }
    Investimento.prototype.descrever = function () {
        return "Investimento: ".concat(this.nome, ", Valor Investido: R$ ").concat(this.valorInvestido);
    };
    return Investimento;
}());
var Acao = /** @class */ (function (_super) {
    __extends(Acao, _super);
    function Acao(nome, valorInvestido, quantidade, precoPorAcao, dividendoAnual) {
        var _this = _super.call(this, nome, valorInvestido) || this;
        _this.quantidade = quantidade;
        _this.precoPorAcao = precoPorAcao;
        _this.dividendoAnual = dividendoAnual;
        return _this;
    }
    Acao.prototype.calcularRetornoAnual = function () {
        return this.quantidade * this.dividendoAnual;
    };
    Acao.prototype.descrever = function () {
        return "".concat(_super.prototype.descrever.call(this), ", Quantidade: ").concat(this.quantidade, ", Pre\u00E7o por A\u00E7\u00E3o: R$ ").concat(this.precoPorAcao, ", Dividendo Anual: R$ ").concat(this.dividendoAnual);
    };
    Acao.prototype.obterQuantidade = function () {
        return this.quantidade;
    };
    Acao.prototype.definirQuantidade = function (quantidade) {
        this.quantidade = quantidade;
    };
    return Acao;
}(Investimento));
var Titulo = /** @class */ (function (_super) {
    __extends(Titulo, _super);
    function Titulo(nome, valorInvestido, taxaDeJurosAnual) {
        var _this = _super.call(this, nome, valorInvestido) || this;
        _this.taxaDeJurosAnual = taxaDeJurosAnual;
        return _this;
    }
    Titulo.prototype.calcularRetornoAnual = function () {
        return this.valorInvestido * (this.taxaDeJurosAnual / 100);
    };
    Titulo.prototype.descrever = function () {
        return "".concat(_super.prototype.descrever.call(this), ", Taxa de Juros Anual: ").concat(this.taxaDeJurosAnual, "%");
    };
    Titulo.prototype.obterTaxaDeJurosAnual = function () {
        return this.taxaDeJurosAnual;
    };
    Titulo.prototype.definirTaxaDeJurosAnual = function (taxaDeJurosAnual) {
        this.taxaDeJurosAnual = taxaDeJurosAnual;
    };
    return Titulo;
}(Investimento));
var Imovel = /** @class */ (function (_super) {
    __extends(Imovel, _super);
    function Imovel(nome, valorInvestido, aluguelMensal) {
        var _this = _super.call(this, nome, valorInvestido) || this;
        _this.aluguelMensal = aluguelMensal;
        return _this;
    }
    Imovel.prototype.calcularRetornoAnual = function () {
        return this.aluguelMensal * 12;
    };
    Imovel.prototype.descrever = function () {
        return "".concat(_super.prototype.descrever.call(this), ", Aluguel Mensal: R$ ").concat(this.aluguelMensal);
    };
    Imovel.prototype.obterAluguelMensal = function () {
        return this.aluguelMensal;
    };
    Imovel.prototype.definirAluguelMensal = function (aluguelMensal) {
        this.aluguelMensal = aluguelMensal;
    };
    return Imovel;
}(Investimento));
function processarInvestimentos(investimentos) {
    investimentos.forEach(function (investimento) {
        console.log(investimento.descrever());
    });
}
var acao = new Acao("Empresa X", 5000, 100, 50, 5);
var titulo = new Titulo("Título Y", 10000, 7);
var imovel = new Imovel("Apartamento Z", 300000, 1500);
var meusInvestimentos = [acao, titulo, imovel];
processarInvestimentos(meusInvestimentos);
