import TTTElemView from './TTTElemView.js';

export default class TTTView {
    constructor(szuloElem, lista) {
        this.szuloElem = szuloElem; // ez a #jatekter div, ami már CSS grid
        this.mezoElemek = [];
        this.megepit(lista, () => {}); // ideiglenes callback
    }

    megepit(lista, kattintasCallback) {
        // Töröljük a szülőelem tartalmát, ha van
        this.szuloElem.innerHTML = '';
        this.mezoElemek = [];

        // Új mezők létrehozása
        for (let i = 0; i < 9; i++) {
            const ertek = lista[i] !== undefined ? lista[i] : '_';
            const mezo = new TTTElemView(this.szuloElem, ertek, i);
            this.mezoElemek.push(mezo);
        }

        // Eseménykezelők beállítása
        this.kattintasEsemeny(kattintasCallback);
    }

    megjelenit(lista, kattintasCallback) {
        this.megepit(lista, kattintasCallback);
    }

    frissit(lista) {
        for (let i = 0; i < this.mezoElemek.length; i++) {
            this.mezoElemek[i].frissit(lista[i]);
        }
    }

    kattintasEsemeny(callback) {
        for (const mezo of this.mezoElemek) {
            mezo.kattintasEsemeny(callback);
        }
    }
}
