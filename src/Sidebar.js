import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import './Sidebar.css';

function Sidebar() {
  const location = useLocation();

  // 判断当前路由是否为活动状态的函数
  const isActive = (match, location) => {
    if (match) {
      return true;
    }
    // 在这里根据你的路由路径规则判断当前页面是否为活动状态
    return (
      location.pathname.startsWith('/account') ||
      location.pathname.startsWith('/donation') ||
      location.pathname.startsWith('/A') ||
      location.pathname.startsWith('/B') ||
      location.pathname.startsWith('/C')
    );
  };

  return (
    <aside className="sidebar">
      <nav className="nav">
        <ul>
          <li>
            <NavLink to="/account" activeClassName="active" isActive={isActive}>
              首頁
            </NavLink>
          </li>
          <li>
            <NavLink to="/donation" activeClassName="active" isActive={isActive}>
              我的任務
            </NavLink>
          </li>
          <li>
            <NavLink to="/A" activeClassName="active" isActive={isActive}>
              新增任務
            </NavLink>
          </li>
          <li>
            <NavLink to="/B" activeClassName="active" isActive={isActive}>
              刪除任務
            </NavLink>
          </li>
          <li>
            <NavLink to="/C" activeClassName="active" isActive={isActive}>
              其他選項
            </NavLink>
          </li>
        </ul>
      </nav>
    </aside>
  );
}

export default Sidebar;
