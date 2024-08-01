import styled from 'styled-components';

export const PackageCardStyled = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    margin-bottom: 24px;
    text-align: center;
    a {
        display: flex;
        align-items: center;
        flex-direction: column;
    }
    .box {
        display: flex;
        align-items: center;
        justify-content: center;
        height: 90px;
        width: 90px;
        border-radius: 50%;
        box-shadow:  0px 0px 12px rgba(168, 216, 243, 0.5);
        margin-bottom: 12px;
    }
`;
