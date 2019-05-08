import styled from 'styled-components';

const Button = styled.button`
border: ${ (props) => {
        if (props.border === true) {
            return '#BFC8D5 1px solid';
        }
        return '0';
    } };
height: ${ (props) => {
        if (props.border === true) {
            return '43px';
        }
        return 'auto';
    } };
border-radius: ${ (props) => {
        if (props.theme === true || props.grey === true || props.border === true) {
            return '22px';
        }
        return '0';
    } };
font-size: ${ props => ((props.theme === true || props.border === true) ? '16px' : '14px') };
color: ${ (props) => {
        if (props.theme === true && props.transparent === true) {
            return '#9014FE';
        }
        if (props.theme === true) {
            return 'white';
        }
        if (props.transparent === true || props.border === true) {
            return '#687385';
        }
        if (props.grey === true) {
            return 'white';
        }
        return '#687385';
    } };
background-color: ${ (props) => {
        if (props.theme === true && props.transparent === true) {
            return 'transparent';
        }
        if (props.theme === true) {
            return '#9014FE';
        }
        if (props.grey === true) {
            return '#687385';
        }
        if (props.transparent === true || props.border === true) {
            return 'transparent';
        }
        return 'transparent';
    } };
width: ${ (props) => {
        if (props.theme === true && props.transparent === true) {
            return 'auto';
        }
        if (props.theme === true) {
            return '100%';
        }
        if (props.transparent === true || props.border === true) {
            return 'auto';
        }
        return 'auto';
    } };
padding: ${ (props) => {
        if (props.theme === true && props.transparent === true) {
            return '0';
        }
        if (props.theme === true || props.grey === true || props.border === true) {
            return '13px';
        }
        if (props.transparent === true) {
            return '0';
        }
        return '0';
    } };
text-decoration: ${ (props) => {
        if (props.theme === true && props.transparent === true) {
            return 'underline';
        }
        if (props.underline === true && props.transparent === true) {
            return 'underline';
        }
        if (props.theme === true || props.transparent === true || props.border === true) {
            return 'none';
        }
        return 'none';
    } };
    &:disabled {
        background-color:#6c757d;
        cursor: not-allowed;
    }
`;

export default Button;
