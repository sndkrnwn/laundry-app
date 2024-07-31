'use client';
import { Row, Col, Typography, DatePicker, Select } from "antd" 
import { useAtom } from "jotai"
import dayjs from 'dayjs';
import { v4 } from "uuid";
import { transactionAtom } from "@/app/data-management/transaction";
import PackageHeader from "@/components/package-header";
import ImageBanner from "@/components/image-banner";
import FooterAction from "@/components/footer-action";
import LaundryItem from "@/components/laundry-item";
import ICONCUCI from '@/public/image/icon-cuci.png';
import { PackageStyled } from "./page.styled";
import { useEffect } from "react";

export default function PackageLaundry({ params: { slug } }) {
  const [transaction, setTransaction] = useAtom(transactionAtom);
  const { tShirt, pants, jeans, short, shirt } = transaction;
  const randomId = v4().replace(/-/g, '').substr(0, 10);;
  const LIST_ITEM = [
    {
        label: "T-Shirt",
        name: 'tShirt',
        price: slug[0] === "Lengkap" ? 3000 : 1500,
        img: ICONCUCI.src
    },
    {
        label: "Pants",
        name: 'pants',
        price: slug[0] === "Lengkap" ? 5000 : 2500,
        img: ICONCUCI.src
    },
    {
        label: "Jeans",
        name: 'jeans',
        price: slug[0] === "Lengkap" ? 10000 : 5000,
        img: ICONCUCI.src
    },
    {
        label: "Shorts",
        name: 'shorts',
        price: slug[0] === "Lengkap" ? 4000 : 2000,
        img: ICONCUCI.src
    },
    {
        label: "Shirt",
        name: 'shirt',
        price: slug[0] === "Lengkap" ? 4000 : 2000,
        img: ICONCUCI.src
    },
  ]

  const DURATION = [1,2,3,4,5,6,7];

  const onChangeDate = (date, dateString) => {
    setTransaction({
      ...transaction,
      startDate: dateString
    })
  };

  const onChangeDuration = (value) => {
    setTransaction({
      ...transaction,
      duration: value
    })
  };

  useEffect(() => {
    setTransaction({
      ...transaction,
      startDate: dayjs().format('YYYY-MM-DD'),
      duration: 1,
      status: 0,
      id: randomId
    })
  }, [])

  return (
    <PackageStyled>
      <PackageHeader history={slug[0]} backUrl="landing-page"/>
      <Row>
        <Col span={22} offset={1}>
          <ImageBanner />
        </Col>
        <Col span={22} offset={1} className="mb-primary">
          <Row>
            <Col span={12}>
              <Typography className="mb-secondary"> Tanggal Laundry </Typography>
              <DatePicker onChange={onChangeDate} value={transaction.startDate.length > 0 ? dayjs(transaction.startDate, 'YYYY-MM-DD') : dayjs()} />
            </Col>
            <Col span={12}>
              <Typography className="mb-secondary"> Durasi Laundry </Typography>
                <Select onChange={onChangeDuration} placeholder="Choose duration" className="w-100" value={transaction.duration}>
                  {
                    DURATION.map((value, i) => {
                      return (
                        <Select.Option value={value} key={i}>{value} day</Select.Option>
                      )
                    })
                  }
                </Select>
            </Col>
          </Row>
        </Col>
        <Col span={22} offset={1}>
          <Typography> Pilih Pakaian </Typography>
        </Col>
        <div className="item-list">
          {
            LIST_ITEM.map((item, i) => {
              return (
                <Col span={22} offset={1} key={`key-${item.label}`}>
                  <LaundryItem label={item.label} image={item.img} price={item.price} name={item.name} />
                </Col>
              )
            })
          }
        </div>
      </Row>
      <FooterAction linkTo={`/confirmation/${slug}`} disabled={
        tShirt === 0 && pants === 0 && jeans === 0 && short === 0 && shirt === 0 ? true : false
      }/>
    </PackageStyled>
  )
}