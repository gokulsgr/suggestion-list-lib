import styled from 'styled-components';

const DropdownListItem = styled.li`
    list-style-type: none;
    padding: 10px 1.875rem;
    cursor: pointer;
    font-size: 16px;
    color: #687385;
    font-weight: 500;
    &.focus,
    &:focus,
    &.active,
    &:hover {
        background-color: #F6F6F6;
        color: #687385;
        outline: none;
    }
`;

export default DropdownListItem;
