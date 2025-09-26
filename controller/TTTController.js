// controller/TTTController.js

import TTTModel from '../model/TTTModel.js';
import TTTView from '../view/TTTView.js';

export default class TTTController {
    constructor(szuloElem, infoElem) {
        this.model = new TTTModel();
        this.view = new TTTView(szuloElem, this.model.getLista());
        this.infoElem = infoElem;

        this.view.kattintasEsemeny(this.kattintasKezelo.bind(this));
        this.ujrair();
    }

    kattintasKezelo(index) {
        // Modell állapotának módosítása
        this.model.setAllapot(index);

        // Nézet frissítése a modellből kapott listával
        this.view.megjelenit(this.model.getLista());

        // Információs szöveg frissítése
        this.ujrair();
    }

    ujrair() {
        const vege = this.model.getVegeVanE();

        if (vege === 'nincs') {
            const kovetkezo = this.model.getAllapot() === 0 ? 'O' : 'X';
            this.infoElem.textContent = `${kovetkezo} következik.`;
        } else if (vege === 'döntetlen') {
            this.infoElem.textContent = 'Döntetlen lett a játék!';
        } else {
            // 'x nyert' vagy 'o nyert' formában van
            this.infoElem.textContent = `${vege.toUpperCase()}! Gratulálok!`;
        }
    }
}
