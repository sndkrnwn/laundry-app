'use client';
import { Row, Col, Typography } from "antd" 
import PackageHeader from "@/components/package-header";
import ImageBanner from "@/components/image-banner";
import FooterAction from "@/components/footer-action";
import LaundryItem from "@/components/laundry-item";
import ICONCUCI from '@/public/image/icon-cuci.png';
import { PackageStyled } from "./page.styled";

const ITEM_PAKET_LENGKAP = [
  {
      label: "T-Shirt",
      price: "4000,00",
      img: ICONCUCI.src
  },
  {
      label: "Pants",
      price: "4000,00",
      img: ICONCUCI.src
  },
  {
      label: "Jeans",
      price: "4000,00",
      img: ICONCUCI.src
  },
  {
      label: "Short",
      price: "4000,00",
      img: ICONCUCI.src
  },
  {
      label: "Shirt",
      price: "4000,00",
      img: ICONCUCI.src
  },
]


export default function PackageLaundry() {
  return (
    <PackageStyled>
      <PackageHeader />
      <Row>
        <Col span={22} offset={1}>
          <ImageBanner />
        </Col>
        <Col span={22} offset={1}>
          <Typography> Pilih Pakaian </Typography>
        </Col>
        <div className="item-list">
          {
            ITEM_PAKET_LENGKAP.map((item, i) => {
              return (
                <Col span={22} offset={1} key={`key-${item.label}`}>
                  <LaundryItem label={item.label} image={item.img} price={item.price} />
                </Col>
              )
            })
          }
        </div>
      </Row>
      <FooterAction linkTo="/confirmation" />
    </PackageStyled>
  )
}