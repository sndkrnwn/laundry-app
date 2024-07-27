import { Image, Typography } from "antd";
import Link from 'next/link';
import { PackageCardStyled } from "./page.styled";

const PackageCard = ({ label, image }) => {
    return (
        <PackageCardStyled>
            <Link href={label === "Aktivitas" ? "activity" : `package-laundry/${label}`}>
                <div className="box">
                    <Image src={image} width={45} preview={false} />
                </div>
                <Typography>
                    {label}
                </Typography>
            </Link>
        </PackageCardStyled>
    )
}

export default PackageCard;