import { useEffect } from 'react';
import {createPortal} from 'react-dom'
import {ModalDiv, Overlay} from './Modal.styled.jsx';
import PropTypes from 'prop-types';

const modalRoot = document.querySelector('#modal-root');

export default function Modal ({children}) {

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    }
    
  }, []);


    const handleKeyDown = e => {
    if (e.code === 'Escape') {
      this.props.onClose();
    }
    };

    const handleBackdropClick = event => {
    if (event.currentTarget === event.target) {
      this.props.onClose();
    }
  };
    
 
      return createPortal(
            <Overlay onClick={handleBackdropClick}>
                <ModalDiv >
                    {children}
                </ModalDiv>
            </Overlay>, modalRoot
        );
};

Modal.propTypes = {
  children: PropTypes.node.isRequired,
};
