import Link from 'next/link';
import { Typography } from "antd"
import { HomeFilled } from "@ant-design/icons"
import { UserOutlined } from "@ant-design/icons"
import { LogoutOutlined } from "@ant-design/icons"

import { FooterMenuStyled } from "./page.styled"

const FOOTER_MENU = [
    {
        label: "Home",
        icon: <HomeFilled />,
        link: "/landing-page"
    }, 
    {
        label: "Profile",
        icon: <UserOutlined />,
        link: "/profile"
    }, 
    {
        label: "Log Out",
        icon: <LogoutOutlined />,
        link: "/login"
    }, 
]

const FooterMenu = () => {
    return (
        <FooterMenuStyled>
            {
                FOOTER_MENU.map((item, i) => {
                    return (
                        <Link href={item.link} key={`key-${item.label}`}>
                            <div>
                                {item.icon}
                                <Typography>{item.label}</Typography>
                            </div>
                        </Link>
                    )
                })
            }
        </FooterMenuStyled>
    )
}

export default FooterMenu