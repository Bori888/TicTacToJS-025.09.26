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
        this.szuloElem.innerHTML = '';
        const tabla = document.createElement('div');
        tabla.classList.add('tabla');

        // sarok cella
        const sarok = document.createElement('div');
        sarok.classList.add('koordinata', 'sarok');
        tabla.appendChild(sarok);

        // oszlop koordináták (1,2,3)
        for (let oszlop = 1; oszlop <= 3; oszlop++) {
            const oszlopKoord = document.createElement('div');
            oszlopKoord.classList.add('koordinata');
            oszlopKoord.textContent = oszlop;
            tabla.appendChild(oszlopKoord);
        }

        const sorBetuk = ['A', 'B', 'C'];
        // sor koordináták és mezők
        for (let sor = 1; sor <= 3; sor++) {
            // sor koordináta betűvel
            const sorKoord = document.createElement('div');
            sorKoord.classList.add('koordinata');
            sorKoord.textContent = sorBetuk[sor - 1];
            tabla.appendChild(sorKoord);

            for (let oszlop = 0; oszlop < 3; oszlop++) {
                const index = (sor - 1) * 3 + oszlop;
                const elem = new TTTElemView(tabla, this.lista[index], index);
                this.elemViewLista.push(elem);
            }
        }

        this.szuloElem.appendChild(tabla);
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
