import TTTController from './controller/TTTController.js';

window.addEventListener('DOMContentLoaded', () => {
    const jatekter = document.getElementById('jatekter');
    const infoSzoveg = document.getElementById('infoSzoveg');  // MOST MÁR VAN ILYEN ELEM!
    const kovetkezoJatekos = document.getElementById('kovetkezoJatekos');
    const utolsoLepes = document.getElementById('utolsoLepes');
    const xNevInput = document.getElementById('xJatekosNev');
    const oNevInput = document.getElementById('oJatekosNev');
    const ujrainditGomb = document.getElementById('ujraindit');

    const controller = new TTTController(jatekter, infoSzoveg, kovetkezoJatekos, utolsoLepes, xNevInput, oNevInput);

    ujrainditGomb.addEventListener('click', () => {
        controller.ujraindit();
    });
});
