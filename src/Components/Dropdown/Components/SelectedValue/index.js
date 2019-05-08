import styled from 'styled-components';

const Dropdown = styled.div`
    display: flex;
    align-items: center;
    max-width: 280px;
    width: 100%;
    background-color: #EBEBEB;
    justify-content: space-between;
    border-radius: 25px;
    padding: 12px 1.25rem;
    font-size: 14px;
    margin-top: 12px;
    cursor: pointer;
    span {
        text-overflow: ellipsis;
        overflow: hidden;
        white-space: nowrap;
        padding-right: 10px;
        color: #687385;
        font-weight: 500;
    }
    svg {
        display: flex;
        flex-shrink: 0;
    }
`;

export default Dropdown;
