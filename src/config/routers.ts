import Index from "../pages/IndexPage.vue";
import User from "../pages/UserPage.vue";
import Message from "../pages/MessagePage.vue";
import UserEdit from "../pages/UserEditPage.vue";
import Team from "../pages/TeamPage.vue";
import Search from "../pages/SearchPage.vue";
import SearchResult from "../pages/SearchResultPage.vue";
import UserLogin from "../pages/UserLoginPage.vue";
const routes = [
    { path: '/', component: Index },
    { path: '/team', component: Team },
    { path: '/search', component: Search },
    { path: '/user', component: User },
    { path: '/message', component: Message },
    { path: '/user/edit', component: UserEdit },
    { path: '/user/list', component: SearchResult },
    { path: '/user/login', component: UserLogin },
]

export default routes;