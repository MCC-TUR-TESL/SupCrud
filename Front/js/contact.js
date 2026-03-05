const btnContact = document.getElementById('btnContact')

btnContact.addEventListener('click', ()=>{
    const cel = '5733333333333';
    const message = `Hola ToolStore, me interesa contactarme con un asesor de ventas para hacer la compra de unas herramientas.`
    window.open(
        `https://wa.me/${cel}?text=${encodeURIComponent(message)}`,
        "_blank"
    );
});