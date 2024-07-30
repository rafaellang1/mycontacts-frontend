import PropTypes from 'prop-types';

import { StyledButton } from './styles';
import Spinner from '../Spinner';

export default function Button({
  type,
  disabled,
  isLoading,
  children,
  danger,
  onClick,
}) {
  return (

    <StyledButton
      type={type}
      //  desabilita o button se disabled ou isLoading for igual a true
      disabled={disabled || isLoading}
      // transient props $ - evita que o comp seja passada diretamente ao DOM
      $danger={danger}
      onClick={onClick}
    >

      {/* se nao estiver carregando, renderiza o children */}
      {!isLoading && children}
      {/* se estiver carregando, renderiza o spiner  */}
      {isLoading && <Spinner size={18} />}

    </StyledButton>
  );
}

Button.propTypes = {
  type: PropTypes.string,
  disabled: PropTypes.bool,
  isLoading: PropTypes.bool,
  children: PropTypes.node.isRequired,
  danger: PropTypes.bool,
  onClick: PropTypes.func,
};

Button.defaultProps = {
  type: 'button',
  disabled: false,
  isLoading: false,
  danger: false,
  onClick: undefined,
};
