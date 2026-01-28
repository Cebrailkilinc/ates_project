import React from "react";
import { Layout, Button, Avatar, Dropdown, Typography } from "antd";
import { UserOutlined, LoginOutlined, LogoutOutlined } from "@ant-design/icons";

const { Header } = Layout;

const NavBar = ({
  logo = "ATEŞ İNŞAAT AŞ.",
  isAuthenticated = true,
  userName = "Hilal",
  onLogin = () => {},
  onLogout = () => {},
  onLogoClick = () => {},
}) => {
  const items = [
    {
      key: "profile",
      icon: <UserOutlined />,
      label: "Profil",
    },
    { type: "divider" },
    {
      key: "logout",
      icon: <LogoutOutlined />,
      label: "Çıkış",
    },
  ];

  const handleMenuClick = ({ key }) => {
    if (key === "logout") onLogout();
  };

  const renderLogo = () => {
    if (typeof logo === "string") {
      return (
        <Typography.Title level={4} style={{ margin: 0 }}>
          {logo}
        </Typography.Title>
      );
    }
    return logo;
  };

  return (
    <Header
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        height: 64,
        zIndex: 1000,
        padding: "0 32px", // sağdan soldan boşluk
        background: "#fff",
        borderBottom: "1px solid #f0f0f0",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        gap: 12,
      }}
    >
      <div
        onClick={onLogoClick}
        style={{ display: "flex", alignItems: "center", cursor: "pointer" }}
      >
        {renderLogo()}
      </div>

      <div>
        {!isAuthenticated ? (
          <Button type="primary" icon={<LoginOutlined />} onClick={onLogin}>
            Giriş Yap
          </Button>
        ) : (
          <Dropdown menu={{ items, onClick: handleMenuClick }} placement="bottomRight">
            <div style={{ display: "flex", alignItems: "center", cursor: "pointer", gap: 8 }}>
              <Avatar size="small">
                {userName?.[0]?.toUpperCase() || "U"}
              </Avatar>
              <Typography.Text strong ellipsis style={{ margin: 0 }}>
                {userName}
              </Typography.Text>
            </div>
          </Dropdown>
        )}
      </div>
    </Header>
  );
};

export default NavBar;

/**
 * Kullanım:
 *
 * import NavBar from "./NavBar";
 * import "antd/dist/reset.css";
 *
 * <NavBar
 *   logo={"Dashboard"}
 *   isAuthenticated={false}
 *   onLogin={() => console.log("login")}
 *   onLogout={() => console.log("logout")}
 *   onLogoClick={() => console.log("logo clicked")}
 * />
 */
