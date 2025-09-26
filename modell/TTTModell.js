export default class TTTModell {
    constructor() {
        this.lista = Array(9).fill('_');
        this.allapot = 0; // 0: X, 1: O
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
        if (this.lista[index] === '_' && this.vegeVanE === 'nincs') {
            this.lista[index] = this.allapot === 0 ? 'X' : 'O';
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
                this.vegeVanE = this.lista[a]; // 'X' vagy 'O'
                return;
            }
        }

        if (!this.lista.includes('_')) {
            this.vegeVanE = 'döntetlen';
        }
    }
}
