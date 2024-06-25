import styled from 'styled-components';

export const ProfileHeaderStyled = styled.div`
    background: #ADEFD1;
    height: 170px;
    border-bottom-right-radius: 16px;
    border-bottom-left-radius: 16px;
    margin-bottom: 24px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    padding-left: 24px;
    padding-right: 24px;
    .profile-image {
        .ant-image {
            margin-bottom: 16px;
        }
    }
    .profile-notification {
        background: #FFFFFF;
        border-radius: 12px;
        .bell {
            padding: 18px;
            border-radius: 12px;
            svg {
                color: #49BE89;
                font-size: 25px;
            }
        }
    }
`;
