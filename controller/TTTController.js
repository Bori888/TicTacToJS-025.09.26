import TTTModell from '../modell/TTTModell.js';
import TTTView from '../view/TTTView.js';

export default class TTTController {
    constructor(szuloElem, infoElem, kovetkezoElem, utolsoLepesElem, xNevInput, oNevInput) {
        this.szuloElem = szuloElem;
        this.infoElem = infoElem;
        this.kovetkezoElem = kovetkezoElem;
        this.utolsoLepesElem = utolsoLepesElem;
        this.xNevInput = xNevInput;
        this.oNevInput = oNevInput;

        this.modell = new TTTModell();
        this.view = new TTTView(szuloElem, this.modell.getLista());

        this.xNev = 'X játékos';
        this.oNev = 'O játékos';

        this.view.kattintasEsemeny(this.kattintasKezelo.bind(this));

        this.ujrair();

        document.getElementById('nevMentese').addEventListener('click', () => {
            this.xNev = this.xNevInput.value.trim() || 'X játékos';
            this.oNev = this.oNevInput.value.trim() || 'O játékos';
            this.ujrair();
        });
    }

    kattintasKezelo(index) {
        this.modell.setAllapot(index);
        this.view.megjelenit(this.modell.getLista());
        this.ujrair(index);
    }

    ujrair(utolsoIndex = null) {
        const vege = this.modell.getVegeVanE();

        if (vege === 'nincs') {
            const kovetkezoJel = this.modell.getAllapot() === 0 ? 'O' : 'X';
            const kovetkezoNev = kovetkezoJel === 'X' ? this.xNev : this.oNev;
            this.kovetkezoElem.textContent = `${kovetkezoNev} (${kovetkezoJel}) következik.`;

            this.infoElem.textContent = ''; // Nincs végeredmény még

            if (utolsoIndex !== null) {
                const sor = Math.floor(utolsoIndex / 3);
                const oszlop = utolsoIndex % 3;
                const sorBetuk = ['A', 'B', 'C'];
                const lepettJel = this.modell.getLista()[utolsoIndex];
                const lepettNev = lepettJel === 'X' ? this.xNev : this.oNev;
                this.utolsoLepesElem.textContent = `${lepettNev} (${lepettJel}) az alábbi helyre lépett: sor ${sorBetuk[sor]}, oszlop ${oszlop + 1}`;
            } else {
                this.utolsoLepesElem.textContent = '';
            }
        } else if (vege === 'döntetlen') {
            this.kovetkezoElem.textContent = '';
            this.infoElem.textContent = 'Döntetlen lett a játék!';
            this.utolsoLepesElem.textContent = '';
        } else {
            // pl "x nyert" vagy "o nyert"
            this.kovetkezoElem.textContent = '';
            this.infoElem.textContent = `${vege.toUpperCase()}! Gratulálok!`;
            this.utolsoLepesElem.textContent = '';
        }
    }

    ujraindit() {
        this.modell = new TTTModell();
        this.view = new TTTView(this.szuloElem, this.modell.getLista());

        this.view.kattintasEsemeny(this.kattintasKezelo.bind(this));
        this.ujrair();
    }
}  // <-- EZ A ZÁRÓ } NE HIÁNYOZZON!
