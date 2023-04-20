import React from 'react';
import logo from '../../assets/logo.svg';
import styles from './Header.module.css';
import { Layout, Typography, Input, Menu, Button, Dropdown } from 'antd';
import { GlobalOutlined } from "@ant-design/icons";
import { withRouter, RouteComponentProps } from "react-router-dom";
import { RootState } from '../../redux/store';
import { addLanguageActionCreator, changeLanguageActionCreator } from '../../redux/language/languageActions';
import { Trans } from 'react-i18next';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';

// interface State extends LanguageState { }

const mapStateToProps = (state: RootState) => {
    return {
        language: state.language.language,
        languageList: state.language.languageList
    }
}

const mapDispatchToProps = (dispatch: Dispatch) => {
    return {
        changeLanguage: (code: 'zh' | 'en') => {
            const action = changeLanguageActionCreator(code);
            dispatch(action);
        },
        addLanguage: (name: string, code: string) => {
            const action = addLanguageActionCreator(name, code);
            dispatch(action);
        }
    }
}

type PropsType = RouteComponentProps & //react-router 路由props类型
    ReturnType<typeof mapStateToProps> &//redux store 映射类型
    ReturnType<typeof mapDispatchToProps>; //redux dispatch 映射类型

class HeaderComponent extends React.Component<PropsType>{
    // constructor(props) {
    //     super(props);
    //     const storeState = store.getState();
    //     this.state = {
    //         language: storeState.language,
    //         languageList: storeState.languageList
    //     };
    //     // 订阅store数据
    //     store.subscribe(this.handleStoreChange)
    // }
    // handleStoreChange = () => {
    //     const storeState = store.getState();
    //     this.setState({
    //         language: storeState.language,
    //         languageList: storeState.languageList
    //     });
    // }

    menuClickHandler = (e) => {
        console.log(e);
        if (e.key === 'new') {
            // 处理新语言添加action
            this.props.addLanguage('新语言', 'new_lang');
        } else {
            this.props.changeLanguage(e.key);
        }
    }

    render() {
        const { history } = this.props;
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
                                <Menu onClick={this.menuClickHandler}>
                                    {this.props.languageList.map(l => {
                                        return <Menu.Item key={l.code}>{l.name}</Menu.Item>
                                    })}
                                    <Menu.Item key={'new'}>
                                        <Trans>header.add_new_language</Trans>
                                    </Menu.Item>
                                </Menu>
                            }
                            icon={<GlobalOutlined />}
                        >
                            {this.props.language === 'zh' ? '中文' : 'English'}
                        </Dropdown.Button>
                        <Button.Group
                            style={{ float: 'right', marginTop: '5px' }}
                        >
                            <Button onClick={() => history.push("register")}>
                                <Trans>header.register</Trans>
                            </Button>
                            <Button onClick={() => history.push("signIn")}>
                                <Trans>header.signin</Trans>
                            </Button>
                        </Button.Group>
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
                        placeholder={'请输入旅游目的地、主题或关键字'} />
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
}

export const Header = connect(mapStateToProps, mapDispatchToProps)(withRouter(HeaderComponent));