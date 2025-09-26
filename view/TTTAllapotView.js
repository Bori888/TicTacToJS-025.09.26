export default class TTTAllapotView {
    constructor(elem) {
        this.elem = elem;
    }

    megjelenit(uzenet, kiemelt = false) {
        this.elem.textContent = uzenet;
        if (kiemelt) {
            this.elem.classList.add('kiemelt');
        } else {
            this.elem.classList.remove('kiemelt');
        }
    }

    torol() {
        this.elem.textContent = '';
        this.elem.classList.remove('kiemelt');
    }
}
