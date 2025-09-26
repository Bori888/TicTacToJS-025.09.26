// model/TTTModel.js

export default class TTTModel {
    constructor() {
        // '_' jelzi az üres mezőt
        this.lista = ['_', '_', '_',
                      '_', '_', '_',
                      '_', '_', '_'];
        this.allapot = 0; // 0 - O következik, 1 - X következik
        this.vegeVanE = 'nincs'; // nincs, x nyert, o nyert, döntetlen
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
        // Ha már foglalt vagy vége a játéknak, nem csinálunk semmit
        if (this.lista[index] !== '_' || this.vegeVanE !== 'nincs') {
            return;
        }

        const jel = this.allapot === 0 ? 'O' : 'X';
        this.lista[index] = jel;

        // Ellenőrizni kell, hogy nyert-e valaki
        this._ellenoriz();

        // Ha még nincs vége, váltjuk a játékost
        if (this.vegeVanE === 'nincs') {
            this.allapot = 1 - this.allapot; // 0 -> 1, 1 -> 0
        }
    }

    _ellenoriz() {
        const nyeroMintak = [
            [0,1,2], [3,4,5], [6,7,8], // sorok
            [0,3,6], [1,4,7], [2,5,8], // oszlopok
            [0,4,8], [2,4,6]           // átlók
        ];

        for (const [a, b, c] of nyeroMintak) {
            if (
                this.lista[a] !== '_' &&
                this.lista[a] === this.lista[b] &&
                this.lista[b] === this.lista[c]
            ) {
                this.vegeVanE = this.lista[a].toLowerCase() + ' nyert'; // "x nyert" vagy "o nyert"
                return;
            }
        }

        // Döntetlen, ha nincs üres hely és nincs nyertes
        if (!this.lista.includes('_')) {
            this.vegeVanE = 'döntetlen';
        }
    }
}
