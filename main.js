import TTTController from './controller/TTTController.js';

window.addEventListener('DOMContentLoaded', () => {
    const jatekter = document.getElementById('jatekter');
    const jatekinfok = document.getElementById('jatekinfok');
    const xNevInput = document.getElementById('xJatekosNev');
    const oNevInput = document.getElementById('oJatekosNev');
    const ujrainditGomb = document.getElementById('ujraindit');

    // A Controller-nek átadjuk a játékteret és az infó dobozt is
    const controller = new TTTController(jatekter, jatekinfok, xNevInput, oNevInput);

    ujrainditGomb.addEventListener('click', () => {
        controller.ujraindit();
    });
});
