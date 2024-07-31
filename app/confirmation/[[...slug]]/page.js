'use client';
import { useState } from "react"
import { useAtom } from "jotai"
import useHistory from "@/app/hooks/useHistory";
import { Row, Col, Typography, Divider, Button, notification } from "antd" 
import { transactionAtom } from "@/app/data-management/transaction";
import PackageHeader from "@/components/package-header";
import ImageBanner from "@/components/image-banner";
import FooterAction from "@/components/footer-action";
import { ConfirmationStyled } from "./page.styled";
import { useEffect } from "react";

export default function ConfirmationLaundry({ params: {slug} }) {
    const [isLoading, setLoading] = useState(false);
    const [api, contextHolder] = notification.useNotification();
    const { replace } = useHistory()
    const [transaction, setTransaction] = useAtom(transactionAtom)
    const { tShirt, pants, jeans, shorts, shirt } = transaction;
    const getEndDate = (value, duration) => {
        if(value.length === 0 || duration === 0) {
            return null
        }
        const startDate = new Date(value, );

        // Add 4 days
        const daysToAdd = duration;
        const dateWithDuration = new Date(startDate);
        dateWithDuration.setDate(dateWithDuration.getDate() + daysToAdd);
        
        // Format the date to YYYY-MM-DD
        return dateWithDuration.toISOString().split('T')[0];
    }

    const LIST_DETAIL_LAUNDRY = [
        {
            label: "ID Laundry",
            value: transaction.id
        },
        {
            label: "Tanggal Laundry",
            value: transaction.startDate
        },
        {
            label: "Tanggal Pengambilan",
            value: getEndDate(transaction.startDate, transaction.duration)
        },
    ]

    const LIST_ITEM_DETAIL_LAUNDRY = [
        ...(tShirt > 0 ? [{
            label: `T-Shirt x ${tShirt} (${slug[0] === "Lengkap" ? "3000" : "1500"})`,
            value: slug[0] === "Lengkap" ? 3000 * tShirt : 1500 * tShirt
        }] : []),
        ...(pants > 0 ? [{
            label: `Pants x ${pants} (${slug[0] === "Lengkap" ? "5000" : "2500"})`,
            value: slug[0] === "Lengkap" ? 5000 * pants : 2500 * pants
        }] : []),
        ...(jeans > 0 ? [{
            label:`Jeans x ${jeans} (${slug[0] === "Lengkap" ? "10000" : "5000"})`,
            value: slug[0] === "Lengkap" ? 10000 * jeans : 5000 * jeans
        }] : []),
        ...(shorts > 0 ? [{
            label: `Shorts x ${shorts} (${slug[0] === "Lengkap" ? "4000" : "2000"})`,
            value: slug[0] === "Lengkap" ? 4000 * shorts : 2000 * shorts
        }] : []),
        ...(shirt > 0 ? [{
            label: `Shirt x ${shirt} (${slug[0] === "Lengkap" ? "4000" : "2000"})`,
            value: slug[0] === "Lengkap" ? 4000 * shirt : 2000 * shirt
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

    useEffect(() => {
        const getUser = localStorage.getItem("user-idle");
        if(getUser) {
            setTransaction({
                ...transaction,
                endDate: getEndDate(transaction.startDate, transaction.duration),
                user: JSON.parse(getUser).username,
                price: totalPrice,
                type: slug[0]
            })    
        }
    }, [])

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
                // localStorage.setItem("list-transaction", JSON.stringify(updateTransaction))
                // replace("/activity")
            }, 2500)
        } else {
            setTimeout(() => {
                let newTransaction = [transaction];
                openNotificationWithRedirect("Congratulation, your laundry request has been sent", newTransaction)
                setLoading(false);
                // localStorage.setItem("list-transaction", JSON.stringify(newTransaction))
                // replace("/activity")
            }, 2500)
        }
    }

    return (
        <ConfirmationStyled>
             {contextHolder}
            <PackageHeader history={`Detail ${slug}`} backUrl={`package-laundry/${slug}`} />
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
                <Typography.Title level={5}> Jenis Paket: {slug[0]} </Typography.Title>
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
            {/* <FooterAction linkTo="/landing-page"/> */}
            <div className="standard-button" style={{
                paddingLeft: "12px",
                paddingRight: "12px",
                marginTop: "24px"
            }}>
                <Button type="primary" block onClick={handleSubmit} loading={isLoading}>Submit</Button>
            </div>
        </ConfirmationStyled>
  )
}