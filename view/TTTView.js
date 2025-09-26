import TTTElemView from './TTTElemView.js';

export default class TTTView {
    constructor(szuloElem, lista) {
        this.szuloElem = szuloElem;
        this.elem = document.createElement('div');
        this.elem.classList.add('tabla');
        this.szuloElem.appendChild(this.elem);
        this.mezoElemek = [];
        // Az első megjelenítés
        this.megepit(lista, () => {});  // ideiglenes callback
    }

    megepit(lista, kattintasCallback) {
        // Töröl minden korábbi mezőt
        this.elem.innerHTML = '';
        this.mezoElemek = [];

        // Új mezők létrehozása 9 db
        for (let i = 0; i < 9; i++) {
            const ertek = lista[i] !== undefined ? lista[i] : '_';
            const mezo = new TTTElemView(this.elem, ertek, i, kattintasCallback);
            this.mezoElemek.push(mezo);
        }
    }

    megjelenit(lista, kattintasCallback) {
        // Újragenerálunk minden mezőt
        this.megepit(lista, kattintasCallback);
    }

    frissit(lista) {
        // Csak frissíti meglévő mezők tartalmát
        for (let i = 0; i < this.mezoElemek.length; i++) {
            this.mezoElemek[i].frissit(lista[i]);
        }
    }

    kattintasEsemeny(callback) {
        // Beállítja az összes mezőre az eseményt
        for (const mezo of this.mezoElemek) {
            mezo.kattintasEsemeny(callback);
        }
    }
}
