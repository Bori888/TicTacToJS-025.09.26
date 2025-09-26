import TTTModell from '../modell/TTTModell.js';
import TTTView from '../view/TTTView.js';

export default class TTTController {
    constructor(szuloElem, infoElem) {
        this.szuloElem = szuloElem;
        this.infoElem = infoElem;
        this.modell = new TTTModell();
        this.view = new TTTView(szuloElem, this.modell.getLista());

        this.view.kattintasEsemeny(this.kattintasKezelo.bind(this));
        this.ujrair();
    }

    kattintasKezelo(index) {
        this.modell.setAllapot(index);
        this.view.megjelenit(this.modell.getLista());
        this.ujrair();
    }

    ujrair() {
        const vege = this.modell.getVegeVanE();

        if (vege === 'nincs') {
            const kovetkezo = this.modell.getAllapot() === 0 ? 'O' : 'X';
            this.infoElem.textContent = `${kovetkezo} következik.`;
        } else if (vege === 'döntetlen') {
            this.infoElem.textContent = 'Döntetlen lett a játék!';
        } else {
            this.infoElem.textContent = `${vege.toUpperCase()}! Gratulálok!`;
        }
    }

    ujraindit() {
        this.modell = new TTTModell();
        this.view = new TTTView(this.szuloElem, this.modell.getLista());

        this.view.kattintasEsemeny(this.kattintasKezelo.bind(this));
        this.ujrair();
    }
}
