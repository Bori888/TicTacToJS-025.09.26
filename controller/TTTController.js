import TTTModell from '../modell/TTTModell.js';
import TTTView from '../view/TTTView.js';
import TTTJatekosokView from '../view/TTTJatekosokView.js';
import TTTAllapotView from '../view/TTTAllapotView.js';

export default class TTTController {
    constructor(szuloElem, infoSzuloElem, xNevInput, oNevInput) {
        this.szuloElem = szuloElem;
        this.infoSzuloElem = infoSzuloElem;
        this.xNevInput = xNevInput;
        this.oNevInput = oNevInput;

        this.modell = new TTTModell();
        this.view = new TTTView(this.szuloElem, this.modell.getLista());

        this.xNev = 'X játékos';
        this.oNev = 'O játékos';

        this.jatekosokView = new TTTJatekosokView(this.infoSzuloElem);
        this.allapotView = new TTTAllapotView(this.infoSzuloElem);

        this.view.kattintasEsemeny(this.kattintasKezelo.bind(this));

        document.getElementById('nevMentese').addEventListener('click', () => {
            this.xNev = this.xNevInput.value.trim() || 'X játékos';
            this.oNev = this.oNevInput.value.trim() || 'O játékos';
            this.ujrair();
        });

        this.ujrair(); // kezdeti megjelenítés
    }

    kattintasKezelo(index) {
        const sikeres = this.modell.setAllapot(index); // sikerült-e lépni?
        if (sikeres) {
            this.view.megjelenit(this.modell.getLista());
            this.ujrair(index);
        }
    }

    ujrair(utolsoIndex = null) {
        const vege = this.modell.getVegeVanE();

        if (vege === 'nincs') {
            const kovetkezoJel = this.modell.getAllapot() === 0 ? 'O' : 'X';
            const kovetkezoNev = kovetkezoJel === 'X' ? this.xNev : this.oNev;
            this.jatekosokView.megjelenit(`${kovetkezoNev} (${kovetkezoJel}) következik.`);
            this.allapotView.megjelenit('Játék folyamatban...');

            if (utolsoIndex !== null) {
                const sor = Math.floor(utolsoIndex / 3);
                const oszlop = utolsoIndex % 3;
                const sorBetuk = ['A', 'B', 'C'];
                const lepettJel = this.modell.getLista()[utolsoIndex];
                const lepettNev = lepettJel === 'X' ? this.xNev : this.oNev;
                const lepesSzoveg = `${lepettNev} (${lepettJel}) lépett: sor ${sorBetuk[sor]}, oszlop ${oszlop + 1}`;
                this.jatekosokView.kiirUtsoLepes(lepesSzoveg);
                this.allapotView.lepesHozzaad(lepesSzoveg);
            }
        } else if (vege === 'döntetlen') {
            this.jatekosokView.megjelenit('');
            this.jatekosokView.kiirUtsoLepes('');
            this.allapotView.megjelenit('Döntetlen lett a játék!');
        } else {
            this.jatekosokView.megjelenit('');
            this.jatekosokView.kiirUtsoLepes('');
            this.allapotView.megjelenit(`${vege.toUpperCase()} nyert! Gratulálok!`);
        }
    }

    ujraindit() {
        this.modell = new TTTModell();
        this.view = new TTTView(this.szuloElem, this.modell.getLista());

        this.view.kattintasEsemeny(this.kattintasKezelo.bind(this));
        this.allapotView.lepesekTorles();
        this.ujrair();
    }
}
