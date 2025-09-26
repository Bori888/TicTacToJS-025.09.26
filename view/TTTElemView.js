export default class TTTElemView {
    constructor(szuloElem, ertek, index) {
        this.index = index;
        this.div = document.createElement('div');
        this.div.classList.add('mezo');
        this.div.textContent = ertek === '_' ? '' : ertek;  // ide jött a módosítás
        szuloElem.appendChild(this.div);
    }

    frissit(ertek) {
        this.div.textContent = ertek === '_' ? '' : ertek;  // és ide is
    }

    kattintasEsemeny(callback) {
        this.div.addEventListener('click', () => {
            callback(this.index); // Visszaadja a mező indexét
        });
    }
}
