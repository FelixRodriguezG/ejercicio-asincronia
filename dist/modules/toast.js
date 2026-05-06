const crosSVG =`<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="icon icon-tabler icons-tabler-outline icon-tabler-x-mark"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M12 16l3.644 3.644a1.21 1.21 0 0 0 1.712 0l2.288 -2.288a1.21 1.21 0 0 0 0 -1.712l-3.644 -3.644l3.644 -3.644a1.21 1.21 0 0 0 0 -1.712l-2.288 -2.288a1.21 1.21 0 0 0 -1.712 0l-3.644 3.644l-3.644 -3.644a1.21 1.21 0 0 0 -1.712 0l-2.288 2.288a1.21 1.21 0 0 0 0 1.712l3.644 3.644l-3.644 3.644a1.21 1.21 0 0 0 0 1.712l2.288 2.288a1.21 1.21 0 0 0 1.712 0l3.644 -3.644" /></svg>`

export class Toast {
    #container;
    #timeout;

    constructor() {
        this.#container = document.createElement('div');
        this.#container.classList.add('toast-container');
        document.body.append(this.#container);
    }

    #show(message, type) {
        clearTimeout(this.#timeout);

        // Inyectamos el contenido
        this.#container.setHTMLUnsafe(`
            <div class="toast toast-${type}">
                <span class="toast-message">${message}</span>
                <button class="toast-close" aria-label="Close">${crosSVG}</button>
            </div>
        `);

        // IMPORTANTE: Registrar el evento justo después de crear el HTML
        const closeBtn = this.#container.querySelector('.toast-close');
        closeBtn.addEventListener('click', () => this.hide());

        // Un pequeño delay para asegurar que la transición CSS se dispare
        requestAnimationFrame(() => {
            this.#container.classList.add('toast-visible');
        });

        this.#timeout = setTimeout(() => this.hide(), 3000);
    }

    success(message) { this.#show(message, 'success'); }
    error(message)   { this.#show(message, 'error'); }
    info(message)    { this.#show(message, 'info'); }

    hide() {
        this.#container.classList.remove('toast-visible');
        // Opcional: limpiar el HTML después de que termine la animación
        this.#timeout = setTimeout(() => {
            if (!this.#container.classList.contains('toast-visible')) {
                this.#container.innerHTML = '';
            }
        }, 300); // 300ms es el tiempo de tu transición en CSS
    }
}