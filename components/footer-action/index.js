import StandardButton from "../button";
import { FooterActionStyled } from "./page.styled";

const FooterAction = ({ linkTo, disabled  }) => {
    return (
        <FooterActionStyled>
            <StandardButton
                  type="primary"
                  htmlType="button"
                  block
                  label="Continue"
                  buttonLink={linkTo}
                  disabled={disabled}
            />
        </FooterActionStyled>
    )
}

export default FooterAction;