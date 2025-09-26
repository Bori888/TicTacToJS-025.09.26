// main.js

import TTTController from './controller/TTTController.js';

window.addEventListener('DOMContentLoaded', () => {
    const jatekter = document.getElementById('jatekter');
    const infoSzoveg = document.getElementById('infoSzoveg');

    // Controller példányosítása, elindítja a játékot
    const controller = new TTTController(jatekter, infoSzoveg);
});
