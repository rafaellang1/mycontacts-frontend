export default class EventManager {
  constructor() {
    this.listeners = {};
  }

  on(event, listener) {
    // condicional para verificar nao existe um obj dentro de listeners
    // se nao existir, seta um arr vazio
    if (!this.listeners[event]) {
      this.listeners[event] = [];
    }

    this.listeners[event].push(listener);
  }

  // metodo para emitir evento
  // nome do evento: event / e o que sera passado a ele: payload
  emit(event, payload) {
    if (!this.listeners[event]) {
      return;
    }

    this.listeners[event].forEach((listeners) => {
      listeners(payload);
    });
  }

  removeListener(event, listenerToRemove) {
    const listeners = this.listeners[event];

    if (!listeners) {
      return;
    }
    const filteredListeners = listeners.filter(
      (listener) => listener !== listenerToRemove,
    );

    this.listeners[event] = filteredListeners;
  }
}

const toastEventManager = new EventManager();

function addToast1(payload) {
  console.log('addtoast listener1', payload);
}

function addToast2(payload) {
  console.log('addtoast listener2', payload);
}

toastEventManager.on('addtoast', addToast1);
toastEventManager.on('addtoast', addToast2);
toastEventManager.emit('addtoast', { type: 'danger', text: 'Texto' });

toastEventManager.removeListener('addtoast', addToast1);

toastEventManager.emit('addtoast', 'depois de remover...');

console.log(toastEventManager);
