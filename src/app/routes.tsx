import { createBrowserRouter } from "react-router";
import { Layout } from "./pages/Layout";
import { Home } from "./pages/Home";
import { AboutPage } from "./pages/AboutPage";
import { ServicesPage } from "./pages/ServicesPage";
import { CommunityPage } from "./pages/CommunityPage";
import { PortalPage } from "./pages/PortalPage";
import { ResourcesPage } from "./pages/ResourcesPage";
import { ContactPage } from "./pages/ContactPage";
import { NotFound } from "./pages/NotFound";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Layout,
    children: [
      { index: true, Component: Home },
      { path: "about", Component: AboutPage },
      { path: "services", Component: ServicesPage },
      { path: "community", Component: CommunityPage },
      { path: "portal", Component: PortalPage },
      { path: "resources", Component: ResourcesPage },
      { path: "contact", Component: ContactPage },
      { path: "*", Component: NotFound },
    ],
  },
]);
