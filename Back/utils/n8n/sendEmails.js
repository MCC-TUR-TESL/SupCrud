
const sendEmail = async () => {
    const response = await fetch('https://tu-n8n.com/webhook/pqrs-nueva', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            name: 'Juan Pérez',
            email: 'juan@email.com',
            type: 'Queja',           // Petición / Queja / Reclamo / Sugerencia
            description: 'Descripción de la PQRS...'
        })
    })

    return response.json()
};

export default sendEmail;
