import styled from 'styled-components'

const IconButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 43px;
  height: 43px;
  background-color: ${props => (props.theme === true ? '#9014FE' : 'white')};
  border-radius: 50%;
  border: 0;
  box-shadow: none;
  flex-shrink: 0;
`

export default IconButton
