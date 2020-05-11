import React from 'react'
import { useHistory, Route, Redirect, Switch } from 'react-router-dom'
import { SettingOutlined, QuestionCircleOutlined, BellOutlined, FormOutlined, LogoutOutlined } from '@ant-design/icons'
import { Layout, Menu } from 'antd'

import Error404 from '../pages/Error/Error404'
import Routes from '../Routers/routes'
import './BasicIndex.scss'

const { Header, Content, Footer } = Layout;
const { SubMenu } = Menu;

function BasicIndex(props: any) {
    const history = useHistory();

    const historyPush = (path: string) => {
        history.push(path)
    }

    // 获取工作台路由
    const RoutePlatform: any = () => {
        let route = Routes.find((v: any) => {
            return v.mode === 'platform';
        })

        console.log(route)
        return route ? route.routes : [];
    }

    return (
        <div className='app-basiclayouts'>
            <Layout className="layout" style={{ background: props.background }}>
                <Header style={{ position: 'fixed', zIndex: 999, width: '100%', background: '#fff' }}>
                    <div className="app-logo" >
                        <img src='http://qdimg.qizhuyun.com/20/05/07/531a5cdcf9b4ef729ac31fc936da86e8.png' />
                    </div>
                    {/* 个人设置 */}
                    <div className="app-setting">
                        <Menu
                            theme="light"
                            mode="horizontal"
                            className='app-setting-menu'>
                            <Menu.Item key="faxian">Aa</Menu.Item>
                            <Menu.Item key="guanzhu">Beta</Menu.Item>
                            <SubMenu icon={<SettingOutlined />} title="消息">
                                <Menu.Item key="setting:1">我的主页</Menu.Item>
                                <Menu.Item key="setting:2">收藏的文章</Menu.Item>
                                <Menu.Item key="setting:3">喜欢的文章</Menu.Item>
                                <Menu.Item key="setting:4"><SettingOutlined />设置</Menu.Item>
                                <Menu.Item key="setting:5"><QuestionCircleOutlined />帮助和反馈</Menu.Item>
                                <Menu.Item key="setting:6"><LogoutOutlined />退出</Menu.Item>
                            </SubMenu>
                            <Menu.Item onClick={() => historyPush('/markdown')} key="xiewenzhang"><FormOutlined />写文章</Menu.Item>
                        </Menu>
                    </div>
                    {/* 文章栏目 */}
                    <Menu
                        theme="light"
                        mode="horizontal"
                        defaultSelectedKeys={props.initTab || []}>
                        <Menu.Item onClick={() => historyPush('/')} key="faxian">发现</Menu.Item>
                        <Menu.Item onClick={() => historyPush('/')} key="guanzhu">关注</Menu.Item>
                        <SubMenu icon={<BellOutlined />} title="消息">
                            <Menu.Item key="news:1">评论</Menu.Item>
                            <Menu.Item key="news:2">间信</Menu.Item>
                            <Menu.Item key="news:3">投稿请求</Menu.Item>
                            <Menu.Item key="news:4">喜欢和赞</Menu.Item>
                            <Menu.Item key="news:5">关注</Menu.Item>
                            <Menu.Item key="news:6">其他提醒</Menu.Item>
                        </SubMenu>
                    </Menu>
                </Header>
                <Content style={{ padding: '0 50px', marginTop: 64 }}>
                    <Switch>
                        {RoutePlatform().map((ele: any) => (
                            <Route
                                key={ele.path}
                                path={ele.path}
                                render={(props) => <ele.component {...props} />}
                                exact
                            />
                        ))}

                        <Redirect from="/platform" to='/platform/dashboard' />
                        <Route path="*" render={() => <Error404 />} />
                    </Switch>
                </Content>
                <Footer style={{ textAlign: 'center', background: props.background || 'transparent' }}>Ant Design ©2018 Created by Ant UED</Footer>
            </Layout>
        </div>
    )
}

export default BasicIndex