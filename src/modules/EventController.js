export class EventController {
    constructor(onSubmit) {
        this.onSubmit = onSubmit;
    }

    handleEvent(event) {
        console.log("Evento manejado:", event);
        
        if (event.type === 'submit') {
            event.preventDefault();
            const id = event.target.querySelector('input').value;
            if (!id) return;
            this.onSubmit(id);
        }
    }
}