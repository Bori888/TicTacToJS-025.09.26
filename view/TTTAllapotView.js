export default class TTTAllapotView {
    constructor(szuloElem) {
        this.szuloElem = szuloElem;
        this.allapotElem = document.createElement('p');
        this.allapotElem.style.fontWeight = 'bold';
        this.szuloElem.appendChild(this.allapotElem);
    }

    megjelenit(szoveg) {
        this.allapotElem.textContent = szoveg;
    }
}
