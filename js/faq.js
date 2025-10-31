// Alternar FAQ - Somente para pacote-vendas.html
function toggleFaq(element) {
    const answer = element.nextElementSibling;
    const icon = element.querySelector('span');
    answer.classList.toggle('show');
    icon.textContent = answer.classList.contains('show') ? '▲' : '▼';
}