import TTTModell from '../modell/TTTModell.js';
import TTTView from '../view/TTTView.js';
import TTTJatekosokView from '../view/TTTJatekosokView.js';
import TTTAllapotView from '../view/TTTAllapotView.js';

export default class TTTController {
    constructor(
        szuloElem,
        altalanosUzenetElem,
        legutobbiLepesElem,
        nyertesUzenetElem,
        xNevInput,
        oNevInput,
        xJelSelect,
        oJelSelect
    ) {
        this.szuloElem = szuloElem;
        this.altalanosUzenetElem = altalanosUzenetElem;
        this.legutobbiLepesElem = legutobbiLepesElem;
        this.nyertesUzenetElem = nyertesUzenetElem;
        this.xNevInput = xNevInput;
        this.oNevInput = oNevInput;
        this.xJelSelect = xJelSelect;
        this.oJelSelect = oJelSelect;

        this.jatekosokView = new TTTJatekosokView(this.altalanosUzenetElem, this.legutobbiLepesElem);
        this.allapotView = new TTTAllapotView(this.nyertesUzenetElem);

        this.xNevInput.addEventListener('input', () => this.ujraindit());
        this.oNevInput.addEventListener('input', () => this.ujraindit());
        this.xJelSelect.addEventListener('change', () => this.frissitJelValasztasokat());
        this.oJelSelect.addEventListener('change', () => this.frissitJelValasztasokat());

        this.ujraindit();
    }

    frissitJelValasztasokat() {
        const xJel = this.xJelSelect.value;
        const oJel = this.oJelSelect.value;

        // Frissítjük az elérhető opciókat, hogy ne választhassanak ugyanazt
        for (const opt of this.xJelSelect.options) {
            opt.disabled = opt.value === oJel;
        }

        for (const opt of this.oJelSelect.options) {
            opt.disabled = opt.value === xJel;
        }

        // Ha ugyanaz lett mégis, visszaállítjuk
        if (xJel === oJel) {
            // Automatikusan átváltunk a másikra
            for (const opt of this.oJelSelect.options) {
                if (opt.value !== xJel) {
                    this.oJelSelect.value = opt.value;
                    break;
                }
            }
        }

        this.ujraindit();
    }

    ujraindit() {
        this.xNev = this.xNevInput.value.trim() || 'X játékos';
        this.oNev = this.oNevInput.value.trim() || 'O játékos';

        this.xJel = this.xJelSelect.value;
        this.oJel = this.oJelSelect.value;

        // Modell példány, szimbólumokkal
        this.modell = new TTTModell(this.xJel, this.oJel);

        // Nézet újraépítése vagy megjelenítése
        if (!this.view) {
            this.view = new TTTView(this.szuloElem, this.modell.getLista());
        } else {
            this.view.megjelenit(this.modell.getLista(), this.kattintasKezelo.bind(this));
        }

        this.view.kattintasEsemeny(this.kattintasKezelo.bind(this));

        this.jatekosokView.lepesekTorles();
        this.jatekosokView.megjelenit(`${this.xNev} (${this.xJel}) kezd.`);
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
            const kovetkezoJel = this.modell.getAllapot() === 0 ? this.xJel : this.oJel;
            const kovetkezoNev = this.modell.getAllapot() === 0 ? this.xNev : this.oNev;
            this.jatekosokView.megjelenit(`${kovetkezoNev} (${kovetkezoJel}) következik.`);
            this.allapotView.megjelenit('Játék folyamatban...');

            if (utolsoIndex !== null) {
                const sor = Math.floor(utolsoIndex / 3);
                const oszlop = utolsoIndex % 3;
                const sorBetuk = ['A', 'B', 'C'];
                const jel = this.modell.getLista()[utolsoIndex];
                const nev = jel === this.xJel ? this.xNev : this.oNev;
                const szoveg = `${nev} (${jel}) lépett: sor ${sorBetuk[sor]}, oszlop ${oszlop + 1}`;
                this.jatekosokView.kiirUtsoLepes(szoveg);
            }
        } else if (vege === 'döntetlen') {
            this.jatekosokView.megjelenit('A játék döntetlennel zárult.');
            this.allapotView.megjelenit('Döntetlen lett a játék!');
        } else {
            const nyertesNev = vege === this.xJel ? this.xNev : this.oNev;
            this.jatekosokView.megjelenit(`${nyertesNev} (${vege}) nyert a játékban.`);
            this.allapotView.megjelenit(`${nyertesNev} (${vege}) nyert! Gratulálok!`, true);
        }
    }
}
