'use client';
import { useState, useRef, useEffect } from "react"
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';
import useHistory from "@/app/hooks/useHistory";
import { Row, Col, Typography, Divider, Button, notification, Image } from "antd" 
import PackageHeader from "@/components/package-header";
import ImageBanner from "@/components/image-banner";
import Watermark from '@/public/image/watermark.png';
import { DetailStyled } from "./page.styled";

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
    const [isLoadingDownload, setLoadingDownload] = useState(false);
    const [isLoadingAccept, setLoadingAccept] = useState(false);
    const [isLoadingReject, setLoadingReject] = useState(false);
    const [isLoadingComplete, setLoadingComplete] = useState(false);
    const cardRef = useRef();
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
            value: detailTransaction.status === 0 ? "Waiting" : detailTransaction.status === 1 ? "Accepted" : detailTransaction.status === 2 ? "Rejected" : "Completed"
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
            setLoadingDownload(false);
            setLoadingReject(false);
            setLoadingAccept(false);
            setLoadingComplete(false);
            replace("/activity")
        }, 1500)
    };
    
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

    const handleComplete = () => {
        setLoadingComplete(true)
        const hasListTransaction = localStorage.getItem("list-transaction");
        if(hasListTransaction) {
            const listTransaction = JSON.parse(hasListTransaction);
            const updatedData = listTransaction.find((val) => val.id === detailTransaction.id);
            if(updatedData) {
                updatedData.status = 3;
            }
            setTimeout(() => {
                openNotificationWithRedirect('Data has been updated', listTransaction)
            }, 2500)
        }
    }

    const handleDownloadPDF = async () => {
        setLoadingDownload(true);
        const element = cardRef.current;
        const canvas = await html2canvas(element);
        const dataImage = canvas.toDataURL('image/png');
    
        const pdf = new jsPDF();
        const imgProperties = pdf.getImageProperties(dataImage);
        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = (imgProperties.height * pdfWidth) / imgProperties.width;
    
        pdf.addImage(dataImage, 'PNG', 0, 0, pdfWidth, pdfHeight);
        pdf.save('download.pdf');
        setTimeout(() => {
            api.info({
                message: `Success`,
                description: "Invoice downloaded",
                placement: "top",
            });
            setLoadingDownload(false)
        }, 1500)
      };
    

    return (
        <DetailStyled>
             {contextHolder}
            <PackageHeader history={`Detail ${slug}`} backUrl={`activity`} />
            <Row ref={cardRef}>
                <Col span={22} offset={1}>
                <ImageBanner />
                </Col>
                <Row className="section-item">
                    {
                        detailTransaction.status === 3 ? <Image src={Watermark.src} width={300}  preview={false}/> : null
                    }
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
            </Row>
            {
                dataUserIdle.username === "admin" ?
                detailTransaction.status === 0 ?
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
                detailTransaction.status === 1 ?
                <Row>
                    <Col span={22} offset={1}>
                        <Row>
                            <Col span={24}>
                                <div className="standard-button" style={{
                                    paddingLeft: "12px",
                                    paddingRight: "12px",
                                    marginTop: "24px"
                                }}>
                                    <Button type="primary" block onClick={handleComplete} loading={isLoadingComplete}>Complete</Button>
                                </div>
                            </Col>
                        </Row>
                    </Col>
                </Row>
                :
                null
                :
                <div className="standard-button" style={{
                    paddingLeft: "12px",
                    paddingRight: "12px",
                    marginTop: "24px"
                }}>
                    <Button type="primary" block onClick={handleDownloadPDF} loading={isLoadingDownload}>Download Invoice</Button>
                </div>
            }
        </DetailStyled>
  )
}