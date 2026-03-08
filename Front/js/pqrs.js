
const PQRS = {
    trigger:document.getElementById('pqrs-trigger'),
    panel:document.getElementById('pqrs-panel'),
    closeBtn:document.getElementById('pqrs-close'),
    form:document.getElementById('pqrsForm'),
    formWrap:document.getElementById('pqrs-form-wrapper'),
    success:document.getElementById('pqrs-success'),
    newBtn:document.getElementById('pqrs-new'),
    tipoSelect:document.getElementById('pqrs-tipo'),
    asuntoInput:document.getElementById('pqrs-asunto'),
    nombreInput:document.getElementById('pqrs-nombre'),
    telInput:document.getElementById('pqrs-tel'),
    mensajeTextarea:document.getElementById('pqrs-mensaje'),
    emailInput:document.getElementById('pqrs-email'),


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

    async captureFormData() {
        const formData = {
            full_name: this.nombreInput.value,
            email: this.emailInput.value,
            subject: this.asuntoInput.value,
            description: this.mensajeTextarea.value,
        };

        const createPQRS = async (pqrs) => {
            await fetch(`http://localhost:3003/pqrs`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(pqrs)
            });
        }
        await createPQRS(formData)

        await fetch(`https://accountcho.app.n8n.cloud/webhook/pqrs-nueva`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(formData)
        });
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
            this.captureFormData();
            this.showSuccess();
        });
        
        this.newBtn.addEventListener('click', () => this.resetForm());

        this.tipoSelect.addEventListener('change', () => {
            const selectedOption = this.tipoSelect.options[this.tipoSelect.selectedIndex];
            this.asuntoInput.value = selectedOption.text.trim();
            console.log(`Tipo seleccionado: ${selectedOption.text.trim()}`);
        });
    }
};

document.addEventListener('DOMContentLoaded', () => PQRS.init());
