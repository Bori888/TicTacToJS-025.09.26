export default class TTTModell {
    constructor() {
        this.lista = ['_', '_', '_',
                      '_', '_', '_',
                      '_', '_', '_'];
        this.allapot = 0;
        this.vegeVanE = 'nincs';
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
        if (this.lista[index] === '_') {   // helyes, a mező üres '_'
            this.lista[index] = this.allapot === 0 ? 'X' : 'O';
            this.#allapotValt();
            this._ellenoriz();
            return true; // sikeres lépés
        }
        return false; // már foglalt mező
    }

    #allapotValt() {
        this.allapot = this.allapot === 0 ? 1 : 0;
    }

    _ellenoriz() {
        const nyeroMintak = [
            [0,1,2], [3,4,5], [6,7,8],
            [0,3,6], [1,4,7], [2,5,8],
            [0,4,8], [2,4,6]
        ];

        for (const [a, b, c] of nyeroMintak) {
            if (
                this.lista[a] !== '_' &&
                this.lista[a] === this.lista[b] &&
                this.lista[b] === this.lista[c]
            ) {
                this.vegeVanE = this.lista[a]; // 'X' vagy 'O'
                return;
            }
        }

        if (!this.lista.includes('_')) {
            this.vegeVanE = 'döntetlen';
        }
    }
}
