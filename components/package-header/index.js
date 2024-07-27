import { Typography } from "antd";
import { LeftOutlined } from "@ant-design/icons";
import Link from "next/link";
import { PackageHeaderStyled } from "./page.styled";

const PackageHeader = ({ history, backUrl }) => {
    return (
        <PackageHeaderStyled>
            <Link href={`/${backUrl}`}>
                <LeftOutlined />
            </Link>
            <Typography>
                Paket {history}
            </Typography>
        </PackageHeaderStyled>
    )   
}

export default PackageHeader;