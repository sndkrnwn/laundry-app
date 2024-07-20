import { useEffect, useState } from 'react'
import { Typography, Image } from "antd";
import { BellFilled } from "@ant-design/icons";
import AVATAR from '@/public/image/avatar.png';
import { ProfileHeaderStyled } from "./page.styled";

const ProfileHeader = () => {
    const [user, setUser] = useState({
        fullname: "John Doe",
        username: "johndoe",
        password: "password"
    });
    useEffect(() => {
        const getUser = localStorage.getItem("user-idle");
        if(getUser) {
            setUser(JSON.parse(getUser))
        }
    }, []);
    return (
        <ProfileHeaderStyled>
            <div className="profile-image">
                <Image src={AVATAR.src} width={50}  preview={false}/>
                <Typography>{user.fullname}</Typography>
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