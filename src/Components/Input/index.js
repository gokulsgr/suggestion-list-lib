import styled from 'styled-components'

const Input = styled.input`
    width: 100%;
    margin: 0;
    border: 1px solid #b5b5b5;
    height: 45px;
    background-color: white; 
    font-size: 16px;
    box-shadow: none;
    &:focus {
        outline: none;
    }
    &:disabled {
        background-color: #F9F9F9;
    }
`

export default Input
