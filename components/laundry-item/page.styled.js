import styled from 'styled-components';

export const LaundryItemStyled = styled.div`
    margin-top: 24px;
    margin-bottom: 24px;
    .image {
        width: 80px;
        height: 80px;
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 50%;
        box-shadow:  0px 0px 12px rgba(168, 216, 243, 0.5);
    }
    .info-item {
        display: flex;
        flex-direction: column;
        justify-content: center;
        height: 100%;
        margin-left: 12px;
    }
    .counter {
        display: flex;
        align-items: center;
        justify-content: space-between;
        height: 100%;
        .left {
            cursor: pointer;
            width: 30px;
            height: 30px;
            display: flex;
            align-items: center;
            justify-content: center;
            border-radius: 50%;
            box-shadow: 0px 0px 12px rgba(168, 216, 243, 0.5);
        }
        .right {
            cursor: pointer;
            background: #ADEFD1;
            width: 30px;
            height: 30px;
            display: flex;
            align-items: center;
            justify-content: center;
            border-radius: 50%;
            box-shadow: 0px 0px 12px rgba(168, 216, 243, 0.5);
        }
    }
}
`;
