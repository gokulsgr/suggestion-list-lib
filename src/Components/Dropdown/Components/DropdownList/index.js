import styled from 'styled-components';

const DropdownList = styled.ul`
    background: #FFFFFF;
    box-shadow: 0 8px 15px 0 rgba(0,0,0,0.06);
    padding: 0;
    margin: 0;
    max-height: ${props => (`${props.no*32}px`)};
    overflow-y: scroll;
    position: absolute;
    left: 0;
    right: 0;
    top: 100%;
    z-index: 1;
    display: none;
    &.active {
        display: block;
    }
`;

export default DropdownList;