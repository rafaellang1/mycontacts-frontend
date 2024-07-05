import PropTypes from 'prop-types';

import { StyledButton } from './styles';
import Spinner from '../Spinner';

export default function Button({
  type, disabled, isLoading, children,
}) {
  return (

    //  desabilita o button se disabled ou isLoading for igual a true
    <StyledButton type={type} disabled={disabled || isLoading}>
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
};

Button.defaultProps = {
  type: 'button',
  disabled: false,
  isLoading: false,
};
