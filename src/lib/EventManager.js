export default class EventManager {
  constructor() {
    this.listeners = new Map();
  }

  on(event, listener) {
    // condicional para verificar nao existe um obj dentro de listeners
    // se nao existir, seta um arr vazio
    if (!this.listeners.has(event)) {
      this.listeners.set(event, []);
    }

    // adicionar a lista, e não sobrescrever: get and push
    this.listeners.get(event).push(listener);
  }

  // metodo para emitir evento
  // nome do evento: event / e o que sera passado a ele: payload
  emit(event, payload) {
    if (!this.listeners.has(event)) {
      return;
    }

    this.listeners.get(event).forEach((listeners) => {
      listeners(payload);
    });
  }

  removeListener(event, listenerToRemove) {
    const listeners = this.listeners.get(event);

    if (!listeners) {
      return;
    }
    const filteredListeners = listeners.filter(
      (listener) => listener !== listenerToRemove,
    );

    // sobrescrever a lista: set
    this.listeners.set(event, filteredListeners);
  }
}
