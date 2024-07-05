export default function toast({ type, text }) {
  const event = new CustomEvent('addtoast', {
    detail: {
      type,
      text,
    },
  });

  // Para disparar o evento
  document.dispatchEvent(event);
}
