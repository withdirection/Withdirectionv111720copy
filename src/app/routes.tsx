import { createBrowserRouter } from "react-router";
import { Layout } from "./pages/Layout";
import { Home } from "./pages/Home";
import { AboutPage } from "./pages/AboutPage";
import { ServicesPage } from "./pages/ServicesPage";
import { CommunityPage } from "./pages/CommunityPage";
import { PortalPage } from "./pages/PortalPage";
import { ResourcesPage } from "./pages/ResourcesPage";
import { ContactPage } from "./pages/ContactPage";
import { PrivacyPage } from "./pages/PrivacyPage";
import { NotFound } from "./pages/NotFound";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Layout,
    children: [
      { index: true, Component: Home, handle: { title: "Home" } },
      { path: "about", Component: AboutPage, handle: { title: "About" } },
      { path: "services", Component: ServicesPage, handle: { title: "Services" } },
      { path: "community", Component: CommunityPage, handle: { title: "Community Calendar" } },
      { path: "portal", Component: PortalPage, handle: { title: "Client & Interpreter Portal" } },
      { path: "resources", Component: ResourcesPage, handle: { title: "Resources & FAQ" } },
      { path: "contact", Component: ContactPage, handle: { title: "Contact" } },
      { path: "privacy", Component: PrivacyPage, handle: { title: "Privacy Policy" } },
      { path: "*", Component: NotFound, handle: { title: "Page Not Found" } },
    ],
  },
]);
