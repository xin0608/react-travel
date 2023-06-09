import React, { useEffect, useState } from 'react';
import logo from '../../assets/logo.svg';
import styles from './Header.module.css';
import { Layout, Typography, Input, Menu, Button, Dropdown } from 'antd';
import { GlobalOutlined } from "@ant-design/icons";
import { useHistory/*, useLocation, useParams, useRouteMatch*/ } from "react-router-dom";
import { useSelector } from '../../redux/hooks';
import { useDispatch } from 'react-redux';
// import { Dispatch } from 'redux';
import { /*LanguageActionTypes,*/ addLanguageActionCreator, changeLanguageActionCreator } from '../../redux/language/languageActions';
import { Trans } from 'react-i18next';
import jwt_decode, { JwtPayload as DefaultJwtPayload } from "jwt-decode";
import { userSlice } from '../../redux/user/slice';

interface JwtPayload extends DefaultJwtPayload {
    username: string
}

export const Header: React.FC = () => {
    const history = useHistory();
    // const location = useLocation();
    // const params = useParams();
    // const match = useRouteMatch();
    const language = useSelector((state) => state.language.language);
    const languageList = useSelector((state) => state.language.languageList);
    const dispatch = useDispatch();
    // const dispatch = useDispatch<Dispatch<LanguageActionTypes>>();

    const jwt = useSelector(s => s.user.tooken);
    const flag = useSelector(s => s.user.flag);
    const [username, setUsername] = useState('');

    const shoppingCartItems = useSelector(s => s.shoppingCart.items);
    const shoppingCartLoading = useSelector(s => s.shoppingCart.loading);

    // useEffect(() => {
    //     if (jwt) {
    //         // 写错了，应该是token
    //         const tooken = jwt_decode<JwtPayload>(jwt);
    //         setUsername(tooken.username);
    //     }
    // }, [jwt]);

    useEffect(() => {
        if (flag) {
            setUsername('xin');
        }
    }, [flag]);

    const menuClickHandler = (e) => {
        if (e.key === 'new') {
            dispatch(addLanguageActionCreator('新语言', 'new_lang'));
        } else {
            dispatch(changeLanguageActionCreator(e.key));
        }
    }

    const onLogout = () => {
        dispatch(userSlice.actions.logOut());
        history.push('/');
    }

    return (
        <div className={styles['app-header']}>
            {/* top-header */}
            <div className={styles['top-header']}>
                <div className={styles.inner}>
                    <Typography.Text>
                        <Trans>header.slogan</Trans>
                    </Typography.Text>
                    <Dropdown.Button
                        style={{ marginLeft: 15, display: 'inline' }}
                        overlay={
                            <Menu onClick={menuClickHandler}>
                                {languageList.map(l => {
                                    return <Menu.Item key={l.code}>{l.name}</Menu.Item>
                                })}
                                <Menu.Item key={'new'}>
                                    <Trans>header.add_new_language</Trans>
                                </Menu.Item>
                            </Menu>
                        }
                        icon={<GlobalOutlined />}
                    >
                        {language === 'zh' ? '中文' : 'English'}
                    </Dropdown.Button>

                    {/* {
                        jwt ? (
                            <Button.Group className={styles["button-group"]}>
                                <span>
                                    <Trans>header.welcome</Trans>
                                    <Typography.Text strong>{username}</Typography.Text>
                                </span>
                                <Button><Trans>header.shoppingCart</Trans></Button>
                                <Button onClick={onLogout}><Trans>header.signOut</Trans> </Button>
                            </Button.Group>
                        ) : (<Button.Group
                            style={{ float: 'right', marginTop: '5px' }}
                        >
                            <Button onClick={() => history.push("/register")}>
                                <Trans>header.register</Trans>
                            </Button>
                            <Button onClick={() => history.push("/signin")}>
                                <Trans>header.signin</Trans>
                            </Button>
                        </Button.Group>
                        )
                    } */}
                    {
                        flag ? (
                            <Button.Group style={{ float: 'right', marginTop: '5px' }}>
                                <span>
                                    <Trans>header.welcome</Trans>
                                    <Typography.Text strong style={{ margin: '10px' }}> {username} </Typography.Text>
                                </span>
                                <Button
                                    loading={shoppingCartLoading}
                                    onClick={() => { history.push('/shoppingCart') }}>
                                    <Trans>header.shoppingCart</Trans>({shoppingCartItems.length})
                                </Button>
                                <Button onClick={onLogout}><Trans>header.signOut</Trans> </Button>
                            </Button.Group>
                        ) : (<Button.Group
                            style={{ float: 'right', marginTop: '5px' }}
                        >
                            <Button onClick={() => history.push("/register")}>
                                <Trans>header.register</Trans>
                            </Button>
                            <Button onClick={() => history.push("/signin")}>
                                <Trans>header.signin</Trans>
                            </Button>
                        </Button.Group>
                        )
                    }

                </div>
            </div>
            <Layout.Header className={styles['main-header']}>
                <span onClick={() => history.push("/")}>
                    <img src={logo} alt="logo" className={styles['App-logo']} />
                    <Typography.Title level={3} className={styles.title}>
                        <Trans>header.title</Trans>
                    </Typography.Title>
                </span>
                <Input.Search className={styles['search-input']}
                    placeholder={'请输入旅游目的地、主题或关键字'}
                    onSearch={(keywords) => history.push('/search/' + keywords)}
                />
            </Layout.Header>
            <Menu mode={'horizontal'} className={styles['main-menu']} >
                <Menu.Item key={1}><Trans>header.home_page</Trans></Menu.Item>
                <Menu.Item key={2}><Trans>header.weekend</Trans></Menu.Item>
                <Menu.Item key={3}><Trans>header.group</Trans></Menu.Item>
                <Menu.Item key={4}><Trans>header.backpack</Trans></Menu.Item>
                <Menu.Item key={5}><Trans>header.private</Trans></Menu.Item>
                <Menu.Item key={6}><Trans>header.cruise</Trans></Menu.Item>
                <Menu.Item key={7}><Trans>header.hotel</Trans></Menu.Item>
                <Menu.Item key={8}><Trans>header.local</Trans></Menu.Item>
                <Menu.Item key={9}><Trans>header.theme</Trans></Menu.Item>
                <Menu.Item key={10}><Trans>header.custom</Trans></Menu.Item>
                <Menu.Item key={11}><Trans>header.study</Trans></Menu.Item>
                <Menu.Item key={12}><Trans>header.visa</Trans></Menu.Item>
                <Menu.Item key={13}><Trans>header.enterprise</Trans></Menu.Item>
                <Menu.Item key={14}><Trans>header.high_end</Trans></Menu.Item>
                <Menu.Item key={15}><Trans>header.outdoor</Trans></Menu.Item>
                <Menu.Item key={16}><Trans>header.insurance</Trans></Menu.Item>
            </Menu>
        </div>
    )
}