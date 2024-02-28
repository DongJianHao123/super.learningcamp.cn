import React, { useState, Suspense } from "react";
import {
  Outlet,
  useNavigate,
  useLocation,
  Navigate,
} from "react-router-dom";
import { MenuProps } from "antd";
import { Layout, Menu, theme, Spin } from "antd";
import HeaderComp from "./components/Header";
import { useLoginStore } from "@stores/index";
import "antd/dist/reset.css";
import { ApartmentOutlined, CodeOutlined, DashboardOutlined, UserOutlined } from "@ant-design/icons";

const { Header, Content, Footer, Sider } = Layout;

const menus = [
  {
    index: true,
    title: "Dashboard",
    icon: <DashboardOutlined />,
  },
  {
    path: "/client/list",
    title: "机构管理",
    icon: <ApartmentOutlined />,
  },
  {
    path: "camp",
    title: "训练营管理",
    icon: <CodeOutlined />,
  },
  {
    path: "student",
    title: "学员管理",
    icon: <UserOutlined />
  },
  // {
  //   path: "account",
  //   title: "个人页",
  //   icon: <UserOutlined />,
  //   children: [
  //     {
  //       path: "/account/center",
  //       title: "个人中心",
  //     },
  //     {
  //       path: "/account/settings",
  //       title: "个人设置",
  //     },
  //   ],
  // },
]

const BasicLayout: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const { userInfo } = useLoginStore();
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const getItems: any = (children: any[]) => {
    return children.map((item) => {
      return {
        key: item.index
          ? "/"
          : item.path?.startsWith("/")
            ? item.path
            : `/${item.path}`,
        icon: item.icon,
        label: item.title,
        children: item.children ? getItems(item.children) : null,
      };
    });
  };


  const menuItems: MenuProps["items"] = getItems(menus);

  const onMenuClick: MenuProps["onClick"] = ({ key }) => {
    navigate(key);
  };

  if (!userInfo) {
    return <Navigate to="/login" replace={true} />;
  }

  const renderOpenKeys = () => {
    const arr = pathname.split("/").slice(0, -1);
    const result = arr.map(
      (_, index) => "/" + arr.slice(1, index + 1).join("/")
    );
    return result;
  };

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider
        style={{
          overflow: "auto",
          height: "100vh",
        }}
        collapsible
        collapsed={collapsed}
        onCollapse={(value) => setCollapsed(value)}
      >
        <div
          style={{
            margin: 16,
          }}
        >
          <img style={{ width: '80%' }} src="/images/logo.png" />
        </div>
        <Menu
          theme="dark"
          selectedKeys={[pathname]}
          defaultOpenKeys={renderOpenKeys()}
          mode="inline"
          items={menuItems}
          onClick={onMenuClick}
        />
      </Sider>
      <Layout className="site-layout">
        <Header style={{ padding: "0 10px", background: colorBgContainer }}>
          <HeaderComp />
        </Header>
        {/* height：Header和Footer的默认高度是64 */}
        <Content
          style={{
            padding: 16,
            overflow: "auto",
            height: `calc(100vh - 128px)`,
          }}
        >
          <Suspense fallback={<Spin size="large" className="content_spin" />}>
            <Outlet />
          </Suspense>
        </Content>
        <Footer style={{ textAlign: "center" }}>
          react template admin ©2023 Created by Jad
        </Footer>
      </Layout>
    </Layout>
  );
};

export default BasicLayout;
