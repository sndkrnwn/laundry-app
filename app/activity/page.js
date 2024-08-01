'use client';
import { useEffect, useState } from "react";
import Link from 'next/link'
import { Row, Col, Avatar, List, Typography, Badge, Button, Form, Input, Select } from "antd" 
import PackageHeader from "@/components/package-header";
import ImageBanner from "@/components/image-banner";
import ICONCUCI from '@/public/image/icon-cuci.png';
import ICONSETRISKA from '@/public/image/icon-setriska.png';
import ICONPAKETLENGKAP from '@/public/image/icon-paket-lengkap.png';
import { PackageStyled } from "./page.styled";


export default function Activity() {
  const [listTransaction, setListTransaction] = useState([]);
  const [formFilter, setFormFilter] = useState({
    jenisPaket: "All",
    idLaundry: ""
  });
  const [formFiltered, setFormFiltered] = useState({
    jenisPaket: "All",
    idLaundry: ""
  });
  const listPaket = ["All", "Lengkap", "Setriska", "Cuci"]

  const filteredData = listTransaction.filter(item => {
    return formFiltered.jenisPaket === item.type || item.id === formFiltered.idLaundry;
  });

  const onChangeFilter = (event, formType) => {
    if(formType === "id-laundry") {
      setFormFilter({
        ...formFilter,
        idLaundry: event.target.value
      })
    } else {
      setFormFilter({
        ...formFilter,
        jenisPaket: event
      })
    }
  }

  const onSubmit = () => {
    setFormFiltered({
      jenisPaket: formFilter.jenisPaket,
      idLaundry: formFilter.idLaundry
    })
  }

  const renderIcon = (type) => {
    switch(type) {
      case "Lengkap":
        return ICONPAKETLENGKAP.src;
      case "Setriska":
        return ICONSETRISKA.src;
      case "Cuci":
        return ICONCUCI.src;
      default:
        return ICONPAKETLENGKAP.src;
    }
  }

  useEffect(() => {
    const getListTransaction = localStorage.getItem("list-transaction");
    const getUserIdle = localStorage.getItem("user-idle");
    if(getListTransaction && getUserIdle) {
      const list = JSON.parse(getListTransaction);
      const user = JSON.parse(getUserIdle).username
      const dataFiltered = list.filter(item => item.user === user);
      setListTransaction(dataFiltered)
    }
    if(getUserIdle && JSON.parse(getUserIdle).username === "admin") {
      const listAdmin = JSON.parse(getListTransaction);
      setListTransaction(listAdmin)
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
        <Row gutter={12} style={{marginBottom: "16px"}}>
          <Col span={6}>
            <Select placeholder="Paket" className="w-100" onChange={(val)=>onChangeFilter(val, "jenis-paket")} value={formFilter.jenisPaket}>
                {
                  listPaket.map((value, i) => {
                    return (
                        <Select.Option value={value} key={i}>{value}</Select.Option>
                    )
                  })
                }
              </Select>
            </Col>
            <Col span={11}>
              <Input placeholder="ID Laundry" onChange={(val) => onChangeFilter(val, "id-laundry")} value={formFilter.idLaundry}/>
            </Col>
            <Col span={6}>
                <div className="standard-button w-radius btn-small">
                     <Button type="primary" block onClick={onSubmit}>Cari</Button>
                </div>
            </Col>
        </Row>
        {
          formFiltered.jenisPaket === "All" ?
            <List
              itemLayout="horizontal"
              dataSource={listTransaction}
              renderItem={(item, index) => (
                <Badge.Ribbon text={item.status === 0 ? "Waiting" : item.status === 1 ? "Accepted" : item.status === 2 ? "Rejected" : item.status === 3 ? "Completed" : "Accpeted"} color={item.status === 0 ? "blue" : item.status === 1 ? "green" : item.status === 2 ? "red" : item.status === 3 ? "yellow" : "green"}>
                    <List.Item>
                      <List.Item.Meta
                        avatar={<Avatar src={renderIcon(item.type)} />}
                        title={
                          <div>
                            <Typography>Paket {item.type} - ID {item.id}</Typography>
                          </div>
                        }
                        description={
                          <div>
                            <Typography>
                              Harga Rp{item.price}, Durasi {item.duration} days, Tanggal Pengambilan {item.endDate}
                            </Typography>
                            <Typography>
                              <b>{item.user}</b>
                            </Typography>
                            <div className="standard-button w-radius" style={{
                                  paddingLeft: "12px",
                                  paddingRight: "12px",
                                  marginTop: "24px",
                              }}>
                                <Link href={`/detail/${item.id}`}>
                                  <Button type="primary" block>Lihat Detail</Button>
                                </Link>
                            </div>
                          </div>
                        }
                      />
                    </List.Item>
                </Badge.Ribbon>
              )}
            />
            :
            filteredData.length > 0 ? 
            <List
              itemLayout="horizontal"
              dataSource={filteredData}
              renderItem={(item, index) => (
                <Badge.Ribbon text={item.status === 0 ? "Waiting" : item.status === 1 ? "Accepted" : item.status === 2 ? "Rejected" : item.status === 3 ? "Completed" : "Accpeted"} color={item.status === 0 ? "blue" : item.status === 1 ? "green" : item.status === 2 ? "red" : item.status === 3 ? "yellow" : "green"}>
                    <List.Item>
                      <List.Item.Meta
                        avatar={<Avatar src={renderIcon(item.type)} />}
                        title={
                          <div>
                            <Typography>Paket {item.type} - ID {item.id}</Typography>
                          </div>
                        }
                        description={
                          <div>
                            <Typography>
                              Harga Rp{item.price}, Durasi {item.duration} days, Tanggal Pengambilan {item.endDate}
                            </Typography>
                            <Typography>
                              <b>{item.user}</b>
                            </Typography>
                            <div className="standard-button w-radius" style={{
                                  paddingLeft: "12px",
                                  paddingRight: "12px",
                                  marginTop: "24px",
                              }}>
                                <Link href={`/detail/${item.id}`}>
                                  <Button type="primary" block>Lihat Detail</Button>
                                </Link>
                            </div>
                          </div>
                        }
                      />
                    </List.Item>
                </Badge.Ribbon>
              )}
            />
            :
            "Data Tidak Ditemukan"
        } 
        </Col>
      </Row>
    </PackageStyled>
  )
}