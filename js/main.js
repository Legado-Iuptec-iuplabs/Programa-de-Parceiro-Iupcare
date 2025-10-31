// JavaScript principal - Funcionalidade comum a todas as páginas

// Mobile Alternar
function toggleMobile() {
    document.getElementById('navLinks').classList.toggle('active');
}

//  Rolagem suave e navegação ativa
document.addEventListener('DOMContentLoaded', function() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
                
                // Atualizar navegação ativa
                document.querySelectorAll('.nav-links a').forEach(a => a.classList.remove('active'));
                this.classList.add('active');
                
                // Fechar menu mobile
                document.getElementById('navLinks').classList.remove('active');
            }
        });
    });
    
    // Efeito de rolagem do Header
    window.addEventListener('scroll', () => {
        const header = document.getElementById('header');
        if (window.scrollY > 100) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });
    
    // Observador de interseção para estado ativo de navegação
    const sections = document.querySelectorAll('section[id], div[id]');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const id = entry.target.getAttribute('id');
                if (id) {
                    document.querySelectorAll('.nav-links a').forEach(a => {
                        a.classList.remove('active');
                        if (a.getAttribute('href') === '#' + id) {
                            a.classList.add('active');
                        }
                    });
                }
            }
        });
    }, { threshold: 0.3 });
    
    sections.forEach(section => observer.observe(section));
});

// Função de compra
function comprar(pacote) {
    alert('🎉 Redirecionando para checkout do pacote ' + pacote.toUpperCase() + '!\n\nEm produção, isso abriria a página de pagamento.');
}