import { useAtom } from "jotai"
import { transactionAtom } from "@/app/data-management/transaction"
import { Row, Col, Image, Typography } from "antd"
import { MinusOutlined } from "@ant-design/icons"
import { PlusOutlined } from "@ant-design/icons"
import { LaundryItemStyled } from "./page.styled"

const LaundryItem = ({
    image,
    label,
    price,
    name
}) => {
    const [transaction, setTransaction] = useAtom(transactionAtom)
    const handleCounterMore = (key) => {
        setTransaction({
            ...transaction,
            [key]: transaction[name] + 1
        })
    }

    const handleCounterLess = (key) => {
        setTransaction({
            ...transaction,
            [key]: transaction[name] - 1
        })
    }
    return (
        <LaundryItemStyled>
            <Row>
                <Col span={6}>
                    <div className="image">
                        <Image src={image} width={45}  preview={false}/>
                    </div>
                </Col>
                <Col span={12}>
                    <div className="info-item">
                        <Typography.Title level={5}>{label}</Typography.Title>
                        <Typography>Rp{price}/ pcs</Typography>
                    </div>
                </Col>
                <Col span={6}>
                    <div className="counter">
                        <div className="left" onClick={transaction[name] === 0 ? () => {} : () => handleCounterLess(name)}>
                            <MinusOutlined />
                        </div>
                        <div className="value">
                            <Typography>{transaction[name]}</Typography>
                        </div>
                        <div className="right" onClick={() => handleCounterMore(name)}>
                            <PlusOutlined />
                        </div>
                    </div>
                </Col>
            </Row>
        </LaundryItemStyled>
    )
}

export default LaundryItem;