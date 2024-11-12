function addCard() {
    const cardName = prompt("Digite o nome do cartão:");
    const cardId = prompt("Digite o ID do cartão:");
    
    if (cardName && cardId) {
        const authorizedList = document.getElementById('authorized-list');
        const newCard = document.createElement(GamepadButton);
        newCard.classList.add('authorized-card');
        newCard.innerHTML = `
            <p>${cardName}</p>
            <div class="action remove" onclick="removeCard(this)">Remover</div>
        `;
        authorizedList.appendChild(newCard);
    } else {
        alert("Nome e ID do cartão são obrigatórios.");
    }
}

function removeCard(element) {
    if (confirm("Tem certeza de que deseja remover este cartão?")) {
        const card = element.parentElement;
        card.remove();
    }
}