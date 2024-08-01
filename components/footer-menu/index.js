import { Typography } from "antd"
import { useRouter } from "next/navigation";
import { HomeFilled } from "@ant-design/icons"
import { LogoutOutlined } from "@ant-design/icons"

import { FooterMenuStyled } from "./page.styled"

const FOOTER_MENU = [
    {
        label: "Home",
        icon: <HomeFilled />,
        link: "/landing-page"
    }, 
    {
        label: "Log Out",
        icon: <LogoutOutlined />,
        link: "/login"
    }, 
]

const FooterMenu = () => {
    const router = useRouter();
    const handleLink = (url, label) => {
        if(label === "Log Out") {
            localStorage.removeItem("user-idle");
        }
        router.replace(url)
    }
    return (
        <FooterMenuStyled>
            {
                FOOTER_MENU.map((item, i) => {
                    return (
                        <div onClick={() => handleLink(item.link, item.label)} key={`key-${item.label}`}>
                            <div>
                                {item.icon}
                                <Typography>{item.label}</Typography>
                            </div>
                        </div>
                    )
                })
            }
        </FooterMenuStyled>
    )
}

export default FooterMenu