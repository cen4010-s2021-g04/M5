import Dashboard from 'views/Dashboard.js';
import Notifications from 'views/Notifications.js';
import Icons from 'views/Icons.js';
import TableList from 'views/Tables.js';
import UserPage from 'views/User.js';
import Messages from 'views/Messages';

var routes = [
  {
    path: "/dashboard",
    name: "Dashboard",
    icon: "nc-icon nc-bank",
    component: Dashboard,
    layout: "/admin",
  },
  {
    path: "/messages",
    name: "Messages",
    icon: "nc-icon nc-chat-33",
    component: Messages,
    layout: "/admin",
  },
  {
    path: "/user-page",
    name: "User Profile",
    icon: "nc-icon nc-single-02",
    component: UserPage,
    layout: "/admin",
  },
  {
    path: "/contacts",
    name: "Contact List",
    icon: "nc-icon nc-tile-56",
    component: TableList,
    layout: "/admin",
  },
];

export default routes;
