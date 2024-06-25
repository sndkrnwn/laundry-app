import { Typography } from "antd";
import { LeftOutlined } from "@ant-design/icons";
import { PackageHeaderStyled } from "./page.styled";

const PackageHeader = () => {
    return (
        <PackageHeaderStyled>
            <LeftOutlined />
            <Typography>
                Paket Lengkap
            </Typography>
        </PackageHeaderStyled>
    )   
}

export default PackageHeader;