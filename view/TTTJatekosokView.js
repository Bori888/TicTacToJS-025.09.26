export default class TTTJatekosokView {
    constructor(szuloElem) {
        this.szuloElem = szuloElem;

        this.kovetkezoElem = document.createElement('p');
        this.utolsoLepesElem = document.createElement('p');

        this.szuloElem.appendChild(this.kovetkezoElem);
        this.szuloElem.appendChild(this.utolsoLepesElem);
    }

    megjelenit(szoveg) {
        this.kovetkezoElem.textContent = szoveg;
    }

    kiirUtsoLepes(szoveg) {
        this.utolsoLepesElem.textContent = szoveg;
    }
}
