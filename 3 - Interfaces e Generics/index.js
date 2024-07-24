var NotificadorEmail = /** @class */ (function () {
    function NotificadorEmail() {
    }
    NotificadorEmail.prototype.enviarMensagem = function (mensagem) {
        console.log("Enviando email: ".concat(mensagem));
    };
    return NotificadorEmail;
}());
var NotificadorSMS = /** @class */ (function () {
    function NotificadorSMS() {
    }
    NotificadorSMS.prototype.enviarMensagem = function (mensagem) {
        console.log("Enviando SMS: ".concat(mensagem));
    };
    return NotificadorSMS;
}());
var NotificadorApp = /** @class */ (function () {
    function NotificadorApp() {
    }
    NotificadorApp.prototype.enviarMensagem = function (mensagem) {
        console.log("Enviando mensagem via app: ".concat(mensagem));
    };
    return NotificadorApp;
}());
function enviarNotificacoes() {
    var notificadores = [
        new NotificadorEmail(),
        new NotificadorSMS(),
        new NotificadorApp()
    ];
    notificadores.forEach(function (notificador) { return notificador.enviarMensagem("Olá, isso é uma notificação de teste!"); });
}
enviarNotificacoes();
