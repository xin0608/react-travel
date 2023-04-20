import React, { useState, useEffect } from "react";
import { RouteComponentProps, useParams } from 'react-router-dom';
// import axios from "axios";
import { Spin, Row, Col, DatePicker, Divider, Typography, Anchor, Menu, Button } from 'antd';
import styles from './DetailPage.module.css';
import { ProductIntro, ProductComments } from "../../components";
// import { productInfo } from './mockups';
import { ProductDetailSlice, getProductDetail } from "../../redux/productDetail/slice";
import { useSelector } from "../../redux/hooks";
import { useDispatch } from "react-redux";
import { MainLayout } from "../../layouts/mainLayout";
import { ShoppingCartOutlined } from "@ant-design/icons";
import { addShoppingCartItem } from "../../redux/shoppingCart/slice";

const { RangePicker } = DatePicker;

interface MatchParams {
    touristRouteId: string;
}

export const DetailPage: React.FC<RouteComponentProps<MatchParams>> = (props) => {
    // console.log(props.history);
    // console.log(props.location);
    // console.log(props.match);
    // return <h1>旅游路线详情页面，路线ID：{props.match.params.touristRouteId}</h1>

    const { touristRouteId } = useParams<MatchParams>();
    // const [loading, setLoading] = useState<boolean>(true);
    // const [product, setProduct] = useState<any>(null);
    // const [error, setError] = useState<string | null>(null);

    const loading = useSelector((state) => state.productDetail.loading);
    const error = useSelector((state) => state.productDetail.error);
    const product = useSelector(state => state.productDetail.data);

    const jwt = useSelector(s => s.user.tooken) as string
    const shoppingCartLoading = useSelector(s => s.shoppingCart.loading)

    const dispatch = useDispatch();

    useEffect(() => {
        // const fetchData = async () => {
        //     // setLoading(true);
        //     dispatch(ProductDetailSlice.actions.fetchStart());
        //     try {
        //         const { data } = await axios.get(`https://www.fastmock.site/mock/1ea9f73780777794e8f3e0cbd9113fbc/react_tour/api/detail/${touristRouteId}`);
        //         // setProduct(data.data);
        //         // // console.log(data.data);
        //         // // console.log(product);
        //         // // setProduct(productInfo);
        //         // setLoading(false);
        //         dispatch(ProductDetailSlice.actions.fetchSuccess(data.data));
        //     } catch (error: any) {
        //         // setError(error.message);
        //         // setLoading(false);
        //         dispatch(ProductDetailSlice.actions.fetchFail(error.message));
        //     }

        // };
        // fetchData();
        dispatch(getProductDetail(touristRouteId));
    }, []);

    if (loading) {
        return (
            <Spin
                size="large"
                style={{
                    marginTop: 200,
                    marginBottom: 200,
                    marginLeft: "auto",
                    marginRight: "auto",
                    width: "100%",
                }}
            />
        );
    }
    if (error) {
        return <div>网站出错：{error}</div>;
    }

    return (
        <>
            <MainLayout>
                {/* 产品简介 与 日期选择 */}
                <div className={styles['product-intro-container']}>
                    <Row>
                        <Col span={13}>
                            <ProductIntro
                                title={product.title}
                                shortDescription={product.description}
                                price={product.originalPrice}
                                coupons={product.coupons}
                                points={product.points}
                                discount={product.price}
                                rating={product.rating}
                                pictures={product.touristRoutePictures?.map(p => p.url)}
                            />
                        </Col>
                        <Col span={11}>
                            <Button
                                style={{ marginTop: 50, marginBottom: 30, display: "block" }}
                                type="primary"
                                danger
                                loading={shoppingCartLoading}
                            // onClick={() => {
                            //     dispatch(
                            //         addShoppingCartItem({ jwt, touristRouteId: product.id })
                            //     );
                            // }}
                            >
                                <ShoppingCartOutlined />
                                放入购物车
                            </Button>
                            <RangePicker open style={{ marginTop: 20 }} />
                        </Col>
                    </Row>
                </div>

                {/* 锚点菜单 */}

                <Anchor className={styles['product-detail-anchor']}>
                    <Menu mode="horizontal">
                        <Menu.Item key={1}>
                            <Anchor.Link href="#feature" title='产品特色'></Anchor.Link>
                        </Menu.Item>
                        <Menu.Item key={3}>
                            <Anchor.Link href="#fees" title='费用'></Anchor.Link>
                        </Menu.Item>
                        <Menu.Item key={4}>
                            <Anchor.Link href="#notes" title='预订须知'></Anchor.Link>
                        </Menu.Item>
                        <Menu.Item key={5}>
                            <Anchor.Link href="#comments" title='商品评价'></Anchor.Link>
                        </Menu.Item>
                    </Menu>
                </Anchor>

                {/* 产品特色 */}
                <div id="feature" className={styles['product-detail-container']}>
                    <Divider orientation={'center'}>
                        <Typography.Title level={3}>产品特色</Typography.Title>
                    </Divider>
                    <div dangerouslySetInnerHTML={{ __html: product.features }} style={{ margin: 50 }}></div>

                </div>
                {/* 费用 */}
                <div id="fees" className={styles['product-detail-container']}>
                    <Divider orientation={'center'}>
                        <Typography.Title level={3}>费用</Typography.Title>
                    </Divider>
                    <div dangerouslySetInnerHTML={{ __html: product.fees }} style={{ margin: 50 }}></div>
                </div>

                {/* 预订须知 */}
                <div id="notes" className={styles['product-detail-container']}>
                    <Divider orientation={'center'}>
                        <Typography.Title level={3}>预订须知</Typography.Title>
                    </Divider>
                    <div dangerouslySetInnerHTML={{ __html: product.notes }} style={{ margin: 50 }}></div>
                </div>

                {/* 商品评价 */}
                <div id="comments" className={styles['product-detail-container']}>
                    <Divider orientation={'center'}>
                        <Typography.Title level={3}>商品评价 </Typography.Title>
                    </Divider>
                    <div style={{ margin: 40 }}>
                        <ProductComments data={product.comments} />
                    </div>
                </div>
            </MainLayout>
        </>
    )
}