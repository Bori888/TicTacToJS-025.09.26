import TTTController from './controller/TTTController.js';

window.addEventListener('DOMContentLoaded', () => {
    const jatekter = document.getElementById('jatekter');
    const infoSzoveg = document.getElementById('infoSzoveg');
    const ujrainditGomb = document.getElementById('ujraindit');

    const controller = new TTTController(jatekter, infoSzoveg);

    ujrainditGomb.addEventListener('click', () => {
        controller.ujraindit();
    });
});
