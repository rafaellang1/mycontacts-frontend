import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';

export default function ReactPortal({ containerId, children }) {
  let container = document.getElementById(containerId);

  if (!container) {
    // criando a div root para o modal
    container = document.createElement('div');
    container.setAttribute('id', containerId);
    // qual elementp queremos colocar no final do body
    document.body.appendChild(container);
  }

  return ReactDOM.createPortal(children, container);
}

ReactPortal.propTypes = {
  containerId: PropTypes.string,
  children: PropTypes.node.isRequired,
};

ReactPortal.defaultProps = {
  containerId: 'portal-root',
};
