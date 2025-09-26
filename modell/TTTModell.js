// modell/TTTModell.js
export default class TTTModell {
    constructor(xJel = 'X', oJel = 'O') {
        // a kiválasztott jelek
        this.xJel = xJel;
        this.oJel = oJel;

        // játék állapota
        this.lista = Array(9).fill('_');
        this.allapot = 0; // 0: X-játékos lép, 1: O-játékos lép (értelmezés a controller szerint)
        this.vegeVanE = 'nincs'; // 'nincs' | 'döntetlen' | <nyerő jel>
    }

    getLista() {
        return this.lista;
    }

    getAllapot() {
        return this.allapot;
    }

    getVegeVanE() {
        return this.vegeVanE;
    }

    setAllapot(index) {
        if (this.lista[index] === '_' && this.vegeVanE === 'nincs') {
            const jel = this.allapot === 0 ? this.xJel : this.oJel;
            this.lista[index] = jel;
            this.#ellenoriz();
            if (this.vegeVanE === 'nincs') {
                this.#valtAllapot();
            }
            return true;
        }
        return false;
    }

    #valtAllapot() {
        this.allapot = 1 - this.allapot;
    }

    #ellenoriz() {
        const nyeroMintak = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8],
            [0, 3, 6], [1, 4, 7], [2, 5, 8],
            [0, 4, 8], [2, 4, 6],
        ];

        for (const [a, b, c] of nyeroMintak) {
            if (
                this.lista[a] !== '_' &&
                this.lista[a] === this.lista[b] &&
                this.lista[b] === this.lista[c]
            ) {
                this.vegeVanE = this.lista[a]; // a győztes jel (a kiválasztott jel lesz)
                return;
            }
        }

        if (!this.lista.includes('_')) {
            this.vegeVanE = 'döntetlen';
        }
    }

    // (opcionális) gyors újraindító — ha egyszerűbb akarod hívni a modellből
    ujraallit(xJel = this.xJel, oJel = this.oJel) {
        this.xJel = xJel;
        this.oJel = oJel;
        this.lista = Array(9).fill('_');
        this.allapot = 0;
        this.vegeVanE = 'nincs';
    }
}
