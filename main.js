import TTTController from './controller/TTTController.js';

window.addEventListener('DOMContentLoaded', () => {
    const jatekter = document.getElementById('jatekter');
    const altalanosUzenet = document.getElementById('altalanosUzenet');
    const nyertesUzenet = document.getElementById('nyertesUzenet');
    const legutobbiLepes = document.getElementById('legutobbiLepes');
    const xNevInput = document.getElementById('xJatekosNev');
    const oNevInput = document.getElementById('oJatekosNev');
    const ujrainditGomb = document.getElementById('ujraindit');

    const controller = new TTTController(jatekter, altalanosUzenet, legutobbiLepes, nyertesUzenet, xNevInput, oNevInput);

    ujrainditGomb.addEventListener('click', () => {
        controller.ujraindit();
    });
});
