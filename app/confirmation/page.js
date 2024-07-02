'use client';
import { Row, Col, Typography, Divider } from "antd" 
import PackageHeader from "@/components/package-header";
import ImageBanner from "@/components/image-banner";
import FooterAction from "@/components/footer-action";
import { ConfirmationStyled } from "./page.styled";

const LIST_DETAIL_LAUNDRY = [
    {
        label: "ID Laundry",
        value: "ID123123"
    },
    {
        label: "Tanggal Laundry",
        value: "Dec 24, 2024"
    },
    {
        label: "Tanggal Pengambilan",
        value: "Dec 28, 2024"
    },
]


const LIST_ITEM_DETAIL_LAUNDRY = [
    {
        label: "T-Shit",
        value: "40000"
    },
    {
        label: "Pants",
        value: "40000"
    },
    {
        label: "Jeans",
        value: "40000"
    },
    {
        label: "Short",
        value: "40000"
    },
]


export default function ConfirmationLaundry() {
  return (
    <ConfirmationStyled>
      <PackageHeader />
      <Row>
        <Col span={22} offset={1}>
          <ImageBanner />
        </Col>
        <Col span={22} offset={1}>
          <Typography.Title level={5}> Detail Laundry </Typography.Title>
          <div className="text-list">
              {
                  LIST_DETAIL_LAUNDRY.map((item, i) => {
                      return (
                          <div className="text-item" key={i}>
                            <Typography>{item.label}</Typography>
                            <Typography className="text-bold">{item.value}</Typography>
                          </div>
                      )
                  })
              }
          </div>
        </Col>
        <Col span={22} offset={1}>
            <Divider />
        </Col>
        <Col span={22} offset={1}>
          <Typography.Title level={5}> Jenis Paket: Lengkap </Typography.Title>
          <div className="text-list">
              {
                  LIST_ITEM_DETAIL_LAUNDRY.map((item, i) => {
                      return (
                          <div className="text-item" key={i}>
                            <Typography>{item.label}</Typography>
                            <Typography className="text-bold">Rp{item.value}</Typography>
                          </div>
                      )
                  })
              }
          </div>
        </Col>
        <Col span={22} offset={1}>
              <div className="total">
                  <Typography>Total Rp16.000</Typography>
              </div>
        </Col>
      </Row>
      <FooterAction linkTo="/landing-page"/>
    </ConfirmationStyled>
  )
}