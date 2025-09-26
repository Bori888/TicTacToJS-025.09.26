// view/TTTView.js
import TTTElemView from './TTTElemView.js';

export default class TTTView {
    constructor(szuloElem, lista) {
        this.szuloElem = szuloElem;
        this.lista = lista;
        this.elemViewLista = [];

        this.#init();
    }

    #init() {
        // Konténer a játéktáblához
        this.szuloElem.innerHTML = ''; // Tisztítjuk az előző tartalmat
        const tabla = document.createElement('div');
        tabla.classList.add('tabla');
        this.szuloElem.appendChild(tabla);

        this.lista.forEach((ertek, index) => {
            const elem = new TTTElemView(tabla, ertek, index);
            this.elemViewLista.push(elem);
        });
    }

    /** Frissíti a megjelenítést új lista alapján */
    megjelenit(lista) {
        this.elemViewLista.forEach((elemView, index) => {
            elemView.frissit(lista[index]);
        });
    }

    /** Feliratkozás minden mező kattintási eseményére */
    kattintasEsemeny(callback) {
        this.elemViewLista.forEach(elem => {
            elem.kattintasEsemeny(callback);
        });
    }
}
