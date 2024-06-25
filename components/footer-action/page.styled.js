import styled from 'styled-components';

export const FooterActionStyled = styled.div`
    position: fixed;
    bottom: 0;
    width: 100%;
    padding-left: 12px;
    padding-right: 12px;
    padding-top: 24px;
    padding-bottom: 24px;
    border-top-right-radius: 18px;
    border-top-left-radius: 18px;
    box-shadow:  0px 0px 12px rgba(168, 216, 243, 0.5);
    background: #FFFFFF;
    .ant-form-item {
        margin-bottom: 0 !important;
        button {
            border-radius: 50px !important;
        }
    }
}
`;
