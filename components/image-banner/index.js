import { Image } from "antd";
import LOGO from '@/public/image/logo-saung-laundry.png';
import { ImageBannerStyled } from "./page.styled"

const ImageBanner = () => {
    return (
        <ImageBannerStyled>
            <Image src={LOGO.src} width={300} />
        </ImageBannerStyled>
    )
}

export default ImageBanner