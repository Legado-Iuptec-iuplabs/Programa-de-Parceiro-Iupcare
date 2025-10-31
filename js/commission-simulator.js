// Simulador de comissões - Somente para programa-parceiros.html
const comissoes = {
    bronze: {indicador:10,representante:12,var:22},
    prata: {indicador:11,representante:15,var:25},
    ouro: {indicador:12,representante:20,var:30}
};

const limites = {
    bronze: {min:1,max:250},
    prata: {min:250,max:500},
    ouro: {min:501,max:999999}
};

function formatMoney(a) {
    return 'R$ ' + a.toLocaleString('pt-BR', {minimumFractionDigits:2, maximumFractionDigits:2});
}

function validarLimites(a,b) {
    const c = document.getElementById(a+'-clinicas'),
          d = document.getElementById(a+'-profissionais'),
          e = document.getElementById(a+'-warning');
    let f = !0;
    
    if (b < limites[a].min) {
        e.textContent = '⚠️ Mínimo: ' + limites[a].min + ' clientes';
        e.classList.add('show');
        c.classList.add('error');
        d.classList.add('error');
        f = !1;
    } else if (b > limites[a].max && 'ouro' !== a) {
        e.textContent = '⚠️ Máximo: ' + limites[a].max + ' clientes';
        e.classList.add('show');
        c.classList.add('error');
        d.classList.add('error');
        f = !1;
    } else {
        e.classList.remove('show');
        c.classList.remove('error');
        d.classList.remove('error');
    }
    return f;
}

function calcularNivel(a) {
    const b = parseInt(document.getElementById(a+'-clinicas').value) || 0,
          c = parseInt(document.getElementById(a+'-profissionais').value) || 0,
          d = parseFloat(document.getElementById(a+'-ticket').value) || 0,
          e = b * c,
          f = e * d;
    
    validarLimites(a,e);
    
    const g = f * (comissoes[a].indicador/100),
          h = f * (comissoes[a].representante/100),
          i = f * (comissoes[a].var/100);
    
    document.getElementById(a+'-total-clientes').textContent = e;
    document.getElementById(a+'-faturamento').textContent = formatMoney(f);
    document.getElementById(a+'-indicador').textContent = formatMoney(g);
    document.getElementById(a+'-sales').textContent = formatMoney(h);
    document.getElementById(a+'-var').textContent = formatMoney(i);
}

function calcularTodos() {
    calcularNivel('bronze');
    calcularNivel('prata');
    calcularNivel('ouro');
    atualizarExemplo();
}

function atualizarExemplo() {
    const a = document.getElementById('ouro-total-clientes').textContent,
          b = document.getElementById('ouro-var').textContent,
          c = parseFloat(b.replace('R$','').replace(/\./g,'').replace(',','.')) || 0,
          d = c * 12;
    
    document.getElementById('example-clients').textContent = a;
    document.getElementById('example-value').textContent = formatMoney(c);
    document.getElementById('example-year').textContent = formatMoney(d);
}

// Inicializar ouvintes de eventos
document.addEventListener('DOMContentLoaded', function() {
    const inputs = [
        'bronze-clinicas', 'bronze-profissionais', 'bronze-ticket',
        'prata-clinicas', 'prata-profissionais', 'prata-ticket',
        'ouro-clinicas', 'ouro-profissionais', 'ouro-ticket'
    ];
    
    inputs.forEach(a => {
        const b = document.getElementById(a);
        if (b) {
            b.addEventListener('input', calcularTodos);
            b.addEventListener('change', calcularTodos);
        }
    });
    
    calcularTodos();
});