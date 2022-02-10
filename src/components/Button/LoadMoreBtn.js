import React from "react";
import {Button, ButtonDiv} from './LoadMoreBtn.styled.jsx'
import PropTypes from 'prop-types';

const LoadMoreBtn = ({ onClick }) => {
    return (
        <ButtonDiv>
        <Button
        type="submit"
        onClick={onClick}
    > Load more
            </Button>
            </ButtonDiv>
    )
};

export default LoadMoreBtn;

LoadMoreBtn.propTypes = {
    onClick: PropTypes.func.isRequired,
};