import styled from "styled-components";

export const TweetOnLeft = styled.div`
  width: ${props => props.w};
`;

export const TweetOnRight = styled.div`
  width: 100%;
`;

export const Name = styled.span`
  font-size: 1rem;
  font-weight: 600;
  color: #000;
`;

export const Username = styled(Name)`
  opacity: .5;
`;

export const Tweet = styled.div`
  padding: 0 10px;
  direction: ${props => props.direction};
`;

export const TweetOnBottomRight = styled.div`
  position: absolute;
  bottom: 3px;
  right: 20px;
  display: flex;
`;

export const COLContainer = styled.div`
  width: 36px;
  margin: 0 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  cursor: pointer;
`;

export const TweetContainer = styled.div`
  width: 55%;
  min-width: 340px;
  display: flex;
  flex-direction: column-reverse;

  > div {
    background: ${props => props.bg || '#fff'};
  }
`;