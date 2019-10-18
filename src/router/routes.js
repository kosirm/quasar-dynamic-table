const routes = [
  {
    path: "/",
    component: () => import("../layouts/Landing.vue")
  },
  {
    path: "/home",
    component: () => import("../layouts/MainLayout.vue"),
    children: [
      {
        path: "",
        component: () => import("../features/Index.vue")
      },
      // {
      //   path: "/example-form",
      //   component: () => import("../components/ExampleForm.vue")
      // },
      {
        path: "/tabs",
        component: () => import("../components/Tabs.vue")
      },
      {
        path: "/inception",
        component: () => import("../features/Inception/Inception.vue")
      },
      {
        path: "/render",
        component: () => import("../features/RenderSamps/RenderSamps.vue")
      },
      {
        path: "/dynamic-table",
        component: () => import("../features/DynamicTable/DynamicTable.vue")
      },
      {
        path: "/vuex-data-table",
        component: () => import("../features/VuexDataTable/TableSample.vue")
      }
    ]
  }
];

routes.push({
  path: "*",
  component: () => import("../features/Error404.vue")
});
export default routes;
