import { ROUTES } from "./routes";

export const MENU_SECTIONS = [
  {
    key: "home",
    label: "Home",
    icon: "home",
    route: ROUTES.home,
  },
  {
    key: "events",
    label: "Events",
    icon: "event",
    shouldLoggedIn: true,
    children: [
      { icon: "event", label: "Upcoming Events", route: ROUTES.home },
      { icon: "event-note", label: "Current Events", route: ROUTES.home },
      {
        icon: "add-circle-outline",
        label: "Create Event",
        route: ROUTES.createEvent,
      },
    ],
  },
  {
    key: "market",
    label: "Market",
    icon: "storefront",
    children: [
      { icon: "local-mall", label: "Market Place", route: ROUTES.marketPlace },
      { icon: "place", label: "Venues Near Me", route: ROUTES.venues },
    ],
  },
  {
    key: "pages",
    label: "Pages",
    icon: "view-list",
    children: [
      {
        icon: "dashboard",
        label: "Events",
        route: ROUTES.eventsDashboard,
        perm: "admin:panel",
      },
      {
        icon: "checklist",
        label: "Tasks",
        route: ROUTES.tasks,
        perm: "task:view",
      },
      {
        icon: "storefront",
        label: "Vendor",
        route: ROUTES.vendor,
        perm: "vendor:panel",
      },
      {
        icon: "people",
        label: "Supervisor",
        route: ROUTES.supervisor,
        perm: "supervisor:panel",
      },
      { icon: "verified", label: "QA", route: ROUTES.qa, perm: "qa:panel" },
      {
        icon: "group",
        label: "User Management",
        route: ROUTES.userManagement,
        perm: "admin:panel",
      },
      {
        key: "ourServices",
        label: "Our Services",
        icon: "miscellaneous-services",
        route: ROUTES.ourServices,
      },
    ],
  },
];
