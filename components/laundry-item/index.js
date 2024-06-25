import { Row, Col, Image, Typography } from "antd"

import { LaundryItemStyled } from "./page.styled"

const LaundryItem = ({
    image,
    label,
    price
}) => {
    return (
        <LaundryItemStyled>
            <Row>
                <Col span={6}>
                    <div className="image">
                        <Image src={image} width={45} />
                    </div>
                </Col>
                <Col span={12}>
                    <div className="info-item">
                        <Typography.Title level={5}>{label}</Typography.Title>
                        <Typography>Rp{price}/ pcs</Typography>
                    </div>
                </Col>
                <Col span={6}>
                    
                </Col>
            </Row>
        </LaundryItemStyled>
    )
}

export default LaundryItem;