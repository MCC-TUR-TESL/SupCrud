
const PQRS = {
    trigger:document.getElementById('pqrs-trigger'),
    panel:document.getElementById('pqrs-panel'),
    closeBtn:document.getElementById('pqrs-close'),
    form:document.getElementById('pqrsForm'),
    formWrap:document.getElementById('pqrs-form-wrapper'),
    success:document.getElementById('pqrs-success'),
    newBtn:document.getElementById('pqrs-new'),


    open() {
        this.panel.classList.add('open');
        this.trigger.setAttribute('aria-expanded', 'true');
    },

    close() {
        this.panel.classList.remove('open');
        this.trigger.setAttribute('aria-expanded', 'false');
    },

    toggle() {
        this.panel.classList.contains('open') ? this.close() : this.open();
    },

    showSuccess() {
        this.formWrap.style.display = 'none';
        this.success.style.display = 'flex';
        this.form.classList.remove('was-validated');
    },

    resetForm() {
        this.form.reset();
        this.formWrap.style.display = 'block';
        this.success.style.display = 'none';
    },

    init() {
        this.trigger.addEventListener('click', () => this.toggle());
        
        this.closeBtn.addEventListener('click', () => this.close());
        
        document.addEventListener('click', (e) => {
            const clickedOutside = !this.panel.contains(e.target) && 
                                  e.target !== this.trigger && 
                                  !this.trigger.contains(e.target);
            if (clickedOutside) this.close();
        });
        
        this.form.addEventListener('submit', (e) => {
            e.preventDefault();
            if (!this.form.checkValidity()) {
                this.form.classList.add('was-validated');
                return;
            }
            this.showSuccess();
        });
        
        this.newBtn.addEventListener('click', () => this.resetForm());
    }
};

document.addEventListener('DOMContentLoaded', () => PQRS.init());