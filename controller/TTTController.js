import TTTModell from '../modell/TTTModell.js';
import TTTView from '../view/TTTView.js';
import TTTJatekosokView from '../view/TTTJatekosokView.js';
import TTTAllapotView from '../view/TTTAllapotView.js';

export default class TTTController {
    constructor(szuloElem, altalanosUzenetElem, legutobbiLepesElem, nyertesUzenetElem, xNevInput, oNevInput) {
        this.szuloElem = szuloElem;
        this.altalanosUzenetElem = altalanosUzenetElem;
        this.legutobbiLepesElem = legutobbiLepesElem;
        this.nyertesUzenetElem = nyertesUzenetElem;
        this.xNevInput = xNevInput;
        this.oNevInput = oNevInput;

        this.jatekosokView = new TTTJatekosokView(this.altalanosUzenetElem, this.legutobbiLepesElem);
        this.allapotView = new TTTAllapotView(this.nyertesUzenetElem);

        this.xNevInput.addEventListener('input', () => this.ujraindit());
        this.oNevInput.addEventListener('input', () => this.ujraindit());

        this.ujraindit();
    }

    ujraindit() {
        this.xNev = this.xNevInput.value.trim() || 'X játékos';
        this.oNev = this.oNevInput.value.trim() || 'O játékos';

        this.modell = new TTTModell();

        // Létrehozzuk vagy újraépítjük a view-t
        if (!this.view) {
            this.view = new TTTView(this.szuloElem, this.modell.getLista());
        } else {
            // Ha már létezett, csak megjelenít újra
            this.view.megjelenit(this.modell.getLista(), this.kattintasKezelo.bind(this));
        }

        // Mindig beállítjuk az eseményt az új mezőkre
        this.view.kattintasEsemeny(this.kattintasKezelo.bind(this));

        this.jatekosokView.lepesekTorles();
        this.jatekosokView.megjelenit(`${this.xNev} (X) kezd.`);
        this.allapotView.megjelenit('');
    }

    kattintasKezelo(index) {
        const sikeres = this.modell.setAllapot(index);
        if (sikeres) {
            this.view.frissit(this.modell.getLista());
            this.ujrair(index);
        }
    }

    ujrair(utolsoIndex = null) {
        const vege = this.modell.getVegeVanE();

        if (vege === 'nincs') {
            const kovetkezoJel = this.modell.getAllapot() === 0 ? 'X' : 'O';
            const kovetkezoNev = kovetkezoJel === 'X' ? this.xNev : this.oNev;
            this.jatekosokView.megjelenit(`${kovetkezoNev} (${kovetkezoJel}) következik.`);
            this.allapotView.megjelenit('Játék folyamatban...');

            if (utolsoIndex !== null) {
                const sor = Math.floor(utolsoIndex / 3);
                const oszlop = utolsoIndex % 3;
                const sorBetuk = ['A', 'B', 'C'];
                const jel = this.modell.getLista()[utolsoIndex];
                const nev = jel === 'X' ? this.xNev : this.oNev;
                const szoveg = `${nev} (${jel}) lépett: sor ${sorBetuk[sor]}, oszlop ${oszlop + 1}`;
                this.jatekosokView.kiirUtsoLepes(szoveg);
            }
        } else if (vege === 'döntetlen') {
            this.jatekosokView.megjelenit('A játék döntetlennel zárult.');
            this.allapotView.megjelenit('Döntetlen lett a játék!');
        } else {
            const nyertesNev = vege === 'X' ? this.xNev : this.oNev;
            this.jatekosokView.megjelenit(`${nyertesNev} (${vege}) nyert a játékban.`);
            this.allapotView.megjelenit(`${nyertesNev} (${vege}) nyert! Gratulálok!`, true);
        }
    }
}
