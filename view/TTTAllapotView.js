export default class TTTAllapotView {
    constructor(szuloElem) {
        this.szuloElem = szuloElem;

        this.allapotElem = document.createElement('p');
        this.allapotElem.style.fontWeight = 'bold';

        this.lepesLista = document.createElement('ul');
        this.lepesLista.style.paddingLeft = '20px';
        this.lepesLista.style.marginTop = '10px';
        this.lepesLista.style.maxHeight = '350px';
        this.lepesLista.style.overflowY = 'auto';
        this.lepesLista.style.fontSize = '0.9em';

        this.szuloElem.appendChild(this.allapotElem);
        this.szuloElem.appendChild(this.lepesLista);
    }

    megjelenit(szoveg) {
        this.allapotElem.textContent = szoveg;
    }

    lepesHozzaad(szoveg) {
        const li = document.createElement('li');
        li.textContent = szoveg;
        this.lepesLista.appendChild(li);
    }

    lepesekTorles() {
        this.lepesLista.innerHTML = '';
    }
}
