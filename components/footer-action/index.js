import StandardButton from "../button";
import { FooterActionStyled } from "./page.styled";

const FooterAction = () => {
    return (
        <FooterActionStyled>
            <StandardButton
                  type="primary"
                  htmlType="button"
                  block
                  label="Continue"
            />
        </FooterActionStyled>
    )
}

export default FooterAction;