'use client';
import { useEffect } from 'react';
import { useAtom } from 'jotai'
import { transactionAtom } from '../data-management/transaction';
import { Col, Row, Typography } from 'antd';
import { LandingPageStyled } from './page.styled';
import ProfileHeader from '@/components/profile-header';
import ImageBanner from '@/components/image-banner';
import PackageCard from '@/components/card';
import FooterMenu from '@/components/footer-menu';
import ICONCUCI from '@/public/image/icon-cuci.png';
import ICONSETRISKA from '@/public/image/icon-setriska.png';
import ICONPAKETLENGKAP from '@/public/image/icon-paket-lengkap.png';
import ICONAKTIVITAS from '@/public/image/icon-aktivitas.png';

const SERVICES_LANDING_PAGE = [
    {
        label: "Lengkap",
        img: ICONPAKETLENGKAP.src
    },
    {
        label: "Setriska",
        img: ICONSETRISKA.src
    },
    {
        label: "Cuci",
        img: ICONCUCI.src
    },
]

export default function LandingPage() {
    const [, setTransaction] = useAtom(transactionAtom)
    useEffect(() => {
        setTransaction({
            tShirt: 0,
            pants: 0,
            jeans: 0,
            shorts: 0,
            shirt: 0,
            price: '',
            startDate: '',
            duration: 0,
            endDate: '',
            type: '',
            user: ''
        })
    }, [])
    return (
        <LandingPageStyled>
            <ProfileHeader />
            <Row>
                <Col span={22} offset={1}>
                    <ImageBanner />
                </Col>
            </Row>
            <Row>
                <Col span={22} offset={1}>
                    <Row>
                        <Col span={22} style={{ marginBottom: "14px" }}>
                            <Typography>Services</Typography>
                        </Col>
                        {
                            SERVICES_LANDING_PAGE.map((item, i) => {
                                return (
                                    <Col span={8} key={`key-${item}`}>
                                        <PackageCard label={item.label} image={item.img} history={item.label}/>
                                    </Col>
                                )
                            })
                        }
                    </Row>
                </Col>
                <Col span={22} offset={1}>
                    <Row>
                        <Col span={22} style={{ marginBottom: "14px" }}>
                            <Typography>History</Typography>
                        </Col>
                        <Col span={8}>
                            <PackageCard label="Aktivitas" image={ICONAKTIVITAS.src} />
                        </Col>
                    </Row>
                </Col>
            </Row>
            <FooterMenu />
        </LandingPageStyled>
    )
}