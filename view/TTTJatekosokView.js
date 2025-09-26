export default class TTTJatekosokView {
    constructor(altalanosUzenetElem, lepesListaElem) {
        this.altalanosUzenetElem = altalanosUzenetElem;
        this.lepesListaElem = lepesListaElem;
        this.lepesListaElem.style.whiteSpace = 'pre-line';
    }

    megjelenit(uzenet) {
        this.altalanosUzenetElem.textContent = uzenet;
    }

    kiirUtsoLepes(uzenet) {
        if (uzenet) {
            this.lepesListaElem.textContent += uzenet + '\n';
        }
    }

    lepesekTorles() {
        this.lepesListaElem.textContent = '';
    }
}
