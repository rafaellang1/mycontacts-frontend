import PropTypes from 'prop-types';

import { useEffect } from 'react';
import { Container } from './styles';

import xCircleIcon from '../../../assets/images/icons/x-circle.svg';
import checkCircleIcon from '../../../assets/images/icons/check-circle.svg';

export default function ToastMessage({ message, onRemoveMessage }) {
  // chamar a funcao de remover mensagem
  useEffect(() => {
    // executar a funcao após um periodo de tempo
    const timeOutId = setTimeout(() => {
      onRemoveMessage(message.id);
    }, message.duration || 7000);

    // remover setTimeout caso o toast for clicado e exec. func handleRemoveToast
    // evita memory leak (vazamento de memoria)
    return () => {
      clearTimeout(timeOutId);
    };
  }, [message, onRemoveMessage]);

  function handleremoveToast() {
    onRemoveMessage(message.id);
  }

  return (
    <Container
      type={message.type}
      onClick={handleremoveToast}
      // acessibilidade para leitores de tela
      tabIndex={0}
      role="button"
    >
      {message.type === 'danger' && <img src={xCircleIcon} alt="X" />}
      {message.type === 'success' && <img src={checkCircleIcon} alt="Check" />}
      <strong>{message.text}</strong>
    </Container>
  );
}

ToastMessage.propTypes = {

  message: PropTypes.shape({
    id: PropTypes.number.isRequired,
    text: PropTypes.string.isRequired,
    // oneOf: define quais valores poderão ser acessados via props
    duration: PropTypes.number,
    type: PropTypes.oneOf(['default', 'success', 'danger']),
  }).isRequired,

  onRemoveMessage: PropTypes.func.isRequired,
};
