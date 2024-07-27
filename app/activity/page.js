'use client';
import { useEffect, useState } from "react";
import { Row, Col, Avatar, List } from "antd" 
import PackageHeader from "@/components/package-header";
import ImageBanner from "@/components/image-banner";
import { PackageStyled } from "./page.styled";

export default function Activity() {
  const [listTransaction, setListTransaction] = useState([]);
  useEffect(() => {
    const getListTransaction = localStorage.getItem("list-transaction");
    const getUserIdle = localStorage.getItem("user-idle");
    if(getListTransaction && getUserIdle) {
      const list = JSON.parse(getListTransaction);
      const user = JSON.parse(getUserIdle).username
      const dataFiltered = list.filter(item => item.user === user);
      setListTransaction(dataFiltered)
    }
  }, [])
  return (
    <PackageStyled>
      <PackageHeader history={"landing-page"} backUrl="landing-page"/>
      <Row>
        <Col span={22} offset={1}>
          <ImageBanner />
        </Col>
        <Col span={22} offset={1}>
        <List
            itemLayout="horizontal"
            dataSource={listTransaction}
            renderItem={(item, index) => (
              <List.Item>
                <List.Item.Meta
                  avatar={<Avatar src={`https://api.dicebear.com/7.x/miniavs/svg?seed=${index}`} />}
                  title={<a href="https://ant.design">Paket {item.type}</a>}
                  description={`Harga Rp${item.price}, Durasi ${item.duration} days, Tanggal Pengambilan ${item.endDate}`}
                />
              </List.Item>
            )}
          />
        </Col>
      </Row>
    </PackageStyled>
  )
}