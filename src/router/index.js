import Vue from "vue";
import VueRouter from "vue-router";
import routes from "./routes";

Vue.use(VueRouter);

export default ({ store }) => {
  console.log("store in router", store);
  const Router = new VueRouter({
    scrollBehavior: () => ({ y: 0 }),
    mode: "history",
    routes
  });

  return Router;
};
// Router.beforeEach((to, from, next) => {
//   if (to.matched.some(record => record.meta.needAuth)) {
//     // console.log('route from =>', from)
//     // console.log('route to =>', to)
//     // console.log('route next =>', next)
//     if (!store.getters['users/token']) {
//       Notify.create({
//         icon: 'warning',
//         color: 'negative',
//         message: 'You need to login.'
//       })
//       LocalStorage.clear()
//       next('/')
//     } else {
//       next()
//     }
//   } else {
//     next() // make sure to always call next()!
//   }
// })
//   console.log("Router", Router);
//   return Router;
// }
