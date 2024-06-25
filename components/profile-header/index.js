import { Typography, Image } from "antd";
import { BellFilled } from "@ant-design/icons";
import AVATAR from '@/public/image/avatar.png';
import { ProfileHeaderStyled } from "./page.styled";

const ProfileHeader = () => {
    return (
        <ProfileHeaderStyled>
            <div className="profile-image">
                <Image src={AVATAR.src} width={50} />
                <Typography>John Doe</Typography>
            </div>
            <div className="profile-notification">
                <div className="bell">
                    <BellFilled />
                </div>
            </div>
            
        </ProfileHeaderStyled>
    )
}

export default ProfileHeader;