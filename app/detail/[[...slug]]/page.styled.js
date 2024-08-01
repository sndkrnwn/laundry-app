import styled from 'styled-components';

export const DetailStyled = styled.div`
  .ant-divider {
      border-block-start: 1px solid rgba(5, 5, 5, 0.3);
  }
  .text-list {
      margin-bottom: 16px;
      margin-top: 16px;
      .text-item {
        display: flex;
        justify-content: space-between;
        margin-bottom: 12px;
      }
      .text-bold {
        font-weight: bold;       
    }
  }
  .total {
    text-align: right;
    font-weight: bold;
    article {
        font-size: 22px;
    }
  }
  .section-item {
    position: relative;
    .ant-image {
      transform: translate(-50%, -50%);
      position: absolute;
      top: 50%;
      left: 50%;
      .ant-image-img {
        transform: rotate(-45deg);
        opacity: .5;
      }
    }
  }
}
`;
