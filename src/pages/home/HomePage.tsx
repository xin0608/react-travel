import React from "react";
import { SideMenu, Carousel, ProductCollection, Enterprise } from '../../components';
import { Typography, Row, Col, Spin } from 'antd';
// import { productList1, productList2, productList3 } from './mockups'
import sideImage1 from '../../assets/images/sider_2019_12-09.png'
import sideImage2 from '../../assets/images/sider_2019_02-04.png'
import sideImage3 from '../../assets/images/sider_2019_02-04-2.png'
// import { Trans } from 'react-i18next';
import { withTranslation, WithTranslation } from "react-i18next";
// import axios from 'axios';
import { connect } from "react-redux";
import { /*fetchRecommendProductsStartActionCreator, fetchRecommendProductsSuccessActionCreator, fetchRecommendProductsFailActionCreator,*/ giveMeDataActionCreator } from "../../redux/recommendProducts/recommendProductsActions";
import { RootState } from "../../redux/store";
import { MainLayout } from "../../layouts/mainLayout";

// interface State {
//     loading: boolean;
//     error: string | null;
//     productList: any[];
// }

const mapStateToProps = (state: RootState) => {
    return {
        loading: state.recommendProducts.loading,
        error: state.recommendProducts.error,
        productList: state.recommendProducts.productList
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        // fetchStart: () => {
        //     dispatch(fetchRecommendProductsStartActionCreator());
        // },
        // fetchSuccess: (data) => {
        //     dispatch(fetchRecommendProductsSuccessActionCreator(data));
        // },
        // fetchFail: (error) => {
        //     dispatch(fetchRecommendProductsFailActionCreator(error));
        // }
        giveMeData: () => {
            dispatch(giveMeDataActionCreator());
        }
    }
}

type PropsType = WithTranslation & ReturnType<typeof mapStateToProps> & ReturnType<typeof mapDispatchToProps>;

class HomePageComponent extends React.Component<PropsType/*, State*/> {
    // constructor(props) {
    //     super(props);
    //     this.state = {
    //         loading: true,
    //         error: null,
    //         productList: []
    //     }
    // }

    async componentDidMount() {
        // this.props.fetchStart();
        // try {
        //     const { data } = await axios.get('https://www.fastmock.site/mock/1ea9f73780777794e8f3e0cbd9113fbc/react_tour/api/productCollections');
        //     // console.log(data.data);
        //     // console.log(response);

        //     // this.setState({
        //     //     loading: false,
        //     //     error: null,
        //     //     productList: data.data
        //     // });

        //     this.props.fetchSuccess(data.data);
        // } catch (error: any) {
        //     // this.setState({
        //     //     error: error.message,
        //     //     loading: false
        //     // });

        //     this.props.fetchFail(error.message);
        // }

        this.props.giveMeData();

    }

    render() {
        const { t, productList, loading, error } = this.props;
        // const { loading, error, productList } = this.state;
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
                    <Row style={{ marginTop: 20 }}>
                        <Col span={6}>
                            <SideMenu />
                        </Col>
                        <Col span={18}>
                            <Carousel />
                        </Col>
                    </Row>
                    <ProductCollection
                        title={<Typography.Title level={3} type="warning">
                            {/* <Trans>home_page.hot_recommended</Trans> */}
                            {t('home_page.hot_recommended')}
                        </Typography.Title>}
                        sideImage={sideImage1}
                        products={productList[0]}
                    />
                    <ProductCollection
                        title={<Typography.Title level={3} type="danger">
                            {/* <Trans>home_page.new_arrival</Trans> */}
                            {t('home_page.new_arrival')}
                        </Typography.Title>}
                        sideImage={sideImage2}
                        products={productList[1]}
                    />
                    <ProductCollection
                        title={<Typography.Title level={3} type="success">
                            {/* <Trans>home_page.domestic_travel</Trans> */}
                            {t('home_page.domestic_travel')}
                        </Typography.Title>}
                        sideImage={sideImage3}
                        products={productList[2]}
                    />
                    <Enterprise />
                </MainLayout>
            </>
        )
    }
}

export const HomePage = connect(mapStateToProps, mapDispatchToProps)(withTranslation()(HomePageComponent));