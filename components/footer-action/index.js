import StandardButton from "../button";
import { FooterActionStyled } from "./page.styled";

const FooterAction = ({ linkTo }) => {
    return (
        <FooterActionStyled>
            <StandardButton
                  type="primary"
                  htmlType="button"
                  block
                  label="Continue"
                  buttonLink={linkTo}
            />
        </FooterActionStyled>
    )
}

export default FooterAction;