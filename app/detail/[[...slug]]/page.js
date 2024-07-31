'use client';
import { useState } from "react"
import useHistory from "@/app/hooks/useHistory";
import { Row, Col, Typography, Divider, Button, notification } from "antd" 
import PackageHeader from "@/components/package-header";
import ImageBanner from "@/components/image-banner";
import { DetailStyled } from "./page.styled";
import { useEffect } from "react";

export default function DetailLaundry({ params: {slug} }) {
    const [userIdle, setUserIdle] = useState(null);
    const [detailTransaction, setDetailTransaction] = useState(null);
    useEffect(() => {
        const getDetailTransaction = localStorage.getItem("list-transaction");
        const getUserIdle = localStorage.getItem("user-idle");
        if(getDetailTransaction && getUserIdle) {
            const dataDetail = JSON.parse(getDetailTransaction).find((val) => val.id === slug[0]);
            const dataUserIdle = JSON.parse(getUserIdle)
            setDetailTransaction(dataDetail)
            setUserIdle(dataUserIdle)
        }
    }, [])

    if(detailTransaction !== null && userIdle !== null) {
        return <RenderContent slug={slug[0]} detailTransaction={detailTransaction} dataUserIdle={userIdle}/>
    } else {
        return <></>
    }
   
}

const RenderContent = ({ slug, detailTransaction, dataUserIdle }) => {
    const [isLoading, setLoading] = useState(false);
    const [isLoadingAccept, setLoadingAccept] = useState(false);
    const [isLoadingReject, setLoadingReject] = useState(false);

    const [api, contextHolder] = notification.useNotification();
    const { replace } = useHistory();
    const getEndDate = (value, duration) => {
        if(value.length === 0 || duration === 0) {
            return null
        }
        const startDate = new Date(value, );

        const daysToAdd = duration;
        const dateWithDuration = new Date(startDate);
        dateWithDuration.setDate(dateWithDuration.getDate() + daysToAdd);
        
        return dateWithDuration.toISOString().split('T')[0];
    }

    const LIST_DETAIL_LAUNDRY = [
        {
            label: "ID Laundry",
            value: detailTransaction.id
        },
        {
            label: "Nama Pelanggan",
            value: detailTransaction.user
        },
        {
            label: "Tanggal Laundry",
            value: detailTransaction.startDate
        },
        {
            label: "Tanggal Pengambilan",
            value: getEndDate(detailTransaction.startDate, detailTransaction.duration)
        },
        {
            label: "Status",
            value: detailTransaction.status === 0 ? "Waiting" : detailTransaction.status === 1 ? "Accepted" : "Rejected"
        },
    ]

    const LIST_ITEM_DETAIL_LAUNDRY = [
        ...(detailTransaction.tShirt > 0 ? [{
            label: `T-Shirt x ${detailTransaction.tShirt} (${detailTransaction.type === "Lengkap" ? "3000" : "1500"})`,
            value: detailTransaction.type === "Lengkap" ? 3000 * detailTransaction.tShirt : 1500 * detailTransaction.tShirt
        }] : []),
        ...(detailTransaction.pants > 0 ? [{
            label: `Pants x ${detailTransaction.pants} (${detailTransaction.type === "Lengkap" ? "5000" : "2500"})`,
            value: detailTransaction.type === "Lengkap" ? 5000 * detailTransaction.pants : 2500 * detailTransaction.pants
        }] : []),
        ...(detailTransaction.jeans > 0 ? [{
            label:`Jeans x ${detailTransaction.jeans} (${detailTransaction.type === "Lengkap" ? "10000" : "5000"})`,
            value: detailTransaction.type === "Lengkap" ? 10000 * detailTransaction.jeans : 5000 * detailTransaction.jeans
        }] : []),
        ...(detailTransaction.shorts > 0 ? [{
            label: `Shorts x ${detailTransaction.shorts} (${detailTransaction.type === "Lengkap" ? "4000" : "2000"})`,
            value: detailTransaction.type === "Lengkap" ? 4000 * detailTransaction.shorts : 2000 * detailTransaction.shorts
        }] : []),
        ...(detailTransaction.shirt > 0 ? [{
            label: `Shirt x ${detailTransaction.shirt} (${detailTransaction.type === "Lengkap" ? "4000" : "2000"})`,
            value: detailTransaction.type === "Lengkap" ? 4000 * detailTransaction.shirt : 2000 * detailTransaction.shirt
        }] : []),
    ]

    const totalPrice = LIST_ITEM_DETAIL_LAUNDRY.reduce((sum, item) => sum + item.value, 0);

    const openNotificationWithRedirect = (message, dataTransaction) => {
        api.info({
          message: `Congratulations`,
          description: message,
          placement: "top",
        });
        setTimeout(() => {
            localStorage.setItem("list-transaction", JSON.stringify(dataTransaction))
            replace("/activity")
        }, 1500)
    };

    const handleSubmit = () => {
        setLoading(true);
        const hasListTransaction = localStorage.getItem("list-transaction");
        if(hasListTransaction) {
            let prevTransaction = JSON.parse(hasListTransaction);
            let newTransactionWithPrev = [transaction];
            let updateTransaction = [...prevTransaction, ...newTransactionWithPrev]
            setTimeout(() => {
                openNotificationWithRedirect("Congratulation, your laundry request has been sent", updateTransaction)
                setLoading(false);
                setLoadingReject(false);
                setLoadingAccept(false);
            }, 2500)
        } else {
            setTimeout(() => {
                let newTransaction = [transaction];
                openNotificationWithRedirect("Congratulation, your laundry request has been sent", newTransaction)
                setLoading(false);
                setLoadingReject(false);
                setLoadingAccept(false);
            }, 2500)
        }
    }

    const handleReject = () => {
        setLoadingReject(true)
        const hasListTransaction = localStorage.getItem("list-transaction");
        if(hasListTransaction) {
            const listTransaction = JSON.parse(hasListTransaction);
            const updatedData = listTransaction.find((val) => val.id === detailTransaction.id);
            if(updatedData) {
                updatedData.status = 2;
            }
            setTimeout(() => {
                openNotificationWithRedirect('Data has been updated', listTransaction)
            }, 2500)
        }
    }

    const handleAccept = () => {
        setLoadingAccept(true)
        const hasListTransaction = localStorage.getItem("list-transaction");
        if(hasListTransaction) {
            const listTransaction = JSON.parse(hasListTransaction);
            const updatedData = listTransaction.find((val) => val.id === detailTransaction.id);
            if(updatedData) {
                updatedData.status = 1;
            }
            setTimeout(() => {
                openNotificationWithRedirect('Data has been updated', listTransaction)
            }, 2500)
        }
    }

    return (
        <DetailStyled>
             {contextHolder}
            <PackageHeader history={`Detail ${slug}`} backUrl={`activity`} />
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
                <Typography.Title level={5}> Jenis Paket: {detailTransaction.type} </Typography.Title>
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
                        <Typography>Total Rp{totalPrice}</Typography>
                    </div>
                </Col>
            </Row>
            {
                dataUserIdle.username === "admin" ?
                <Row>
                    <Col span={22} offset={1}>
                        <Row>
                            <Col span={12}>
                                <div className="standard-button" style={{
                                    paddingLeft: "12px",
                                    paddingRight: "12px",
                                    marginTop: "24px"
                                }}>
                                    <Button block onClick={handleReject} loading={isLoadingReject}>Reject</Button>
                                </div>
                            </Col>
                            <Col span={12}>
                                <div className="standard-button" style={{
                                    paddingLeft: "12px",
                                    paddingRight: "12px",
                                    marginTop: "24px"
                                }}>
                                    <Button type="primary" block onClick={handleAccept} loading={isLoadingAccept}>Accept</Button>
                                </div>
                            </Col>
                        </Row>
                    </Col>
                </Row>
                :
                <div className="standard-button" style={{
                    paddingLeft: "12px",
                    paddingRight: "12px",
                    marginTop: "24px"
                }}>
                    <Button type="primary" block onClick={handleSubmit} loading={isLoading}>Download Invoice</Button>
                </div>
            }
        </DetailStyled>
  )
}