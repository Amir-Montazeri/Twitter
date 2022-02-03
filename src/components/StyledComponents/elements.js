import styled from "styled-components";

const btnSizes = {
  'xl': '19px 55px',
  'lg': '18px 42px',
  'md': '10px 27px',
  'sm': '7px 19px',
};

export const Button = styled.button`
  padding: ${props => btnSizes[props.size] || btnSizes['md']};
  color: ${props => props.color || '#fff'};
  background: ${props => props.bg || '#000'};
  border: ${props => props.border || 'none'};
  border-radius: ${props => props.radius || '3px'};
  opacity: ${props => props.disabled ? '.6' : props.opa || '1'};
  cursor: ${props => props.disabled ? 'not-allowed' : props.cur || 'pointer'};
`;