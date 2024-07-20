import { useState } from "react"
import { Row, Col, Image, Typography } from "antd"
import { MinusOutlined } from "@ant-design/icons"
import { PlusOutlined } from "@ant-design/icons"
import { LaundryItemStyled } from "./page.styled"

const LaundryItem = ({
    image,
    label,
    price
}) => {
    const [counter, setCounter] = useState(0);
    const handleCounterMore = () => {
        setCounter(counter + 1)
    }

    const handleCounterLess = () => {
        setCounter(counter - 1);
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
                        <div className="left" onClick={handleCounterLess}>
                            <MinusOutlined />
                        </div>
                        <div className="value">
                            <Typography>{counter}</Typography>
                        </div>
                        <div className="right" onClick={handleCounterMore}>
                            <PlusOutlined />
                        </div>
                    </div>
                </Col>
            </Row>
        </LaundryItemStyled>
    )
}

export default LaundryItem;