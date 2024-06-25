import { Image, Typography } from "antd";
import ICONCUCI from '@/public/image/icon-cuci.png';
import { PackageCardStyled } from "./page.styled";

const PackageCard = ({ label, image }) => {
    return (
        <PackageCardStyled>
            <div className="box">
                <Image src={image} width={45} />
            </div>
            <Typography>
                {label}
            </Typography>
        </PackageCardStyled>
    )
}

export default PackageCard;