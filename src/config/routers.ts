import Index from "../pages/IndexPage.vue";
import User from "../pages/UserPage.vue";
import UserUpdate from "../pages/UserUpdatePage.vue";
import Message from "../pages/MessagePage.vue";
import UserEdit from "../pages/UserEditPage.vue";
import Team from "../pages/TeamPage.vue";
import Search from "../pages/SearchPage.vue";
import SearchResult from "../pages/SearchResultPage.vue";
import UserLogin from "../pages/UserLoginPage.vue";
import UserRegister from "../pages/UserRegisterPage.vue";
import UserTeamCreatePage from "../pages/UserTeamCreatePage.vue";
import UserTeamJoinPage from "../pages/UserTeamJoinPage.vue";
import TeamAddPage from "../pages/TeamAddPage.vue";
import TeamUpdatePage from "../pages/TeamUpdatePage.vue";
import MyInvitationPage from "../pages/MyInvitationPage.vue";
import TeamInvitePage from "../pages/TeamInvitePage.vue";
const routes = [
    { path: '/', component: Index },
    { path: '/team',title:'找队伍', component: Team },
    { path: '/team/add',title:'创建队伍', component: TeamAddPage },
    { path: '/team/update',title:'编辑队伍信息', component: TeamUpdatePage },
    { path: '/search',title:'找伙伴', component: Search },
    { path: '/user',title:'用户', component: User },
    { path: '/user/team/create',title:'我创建的队伍', component: UserTeamCreatePage },
    { path: '/user/team/join',title:'我加入的队伍', component: UserTeamJoinPage },
    { path: '/user/update',title:'找队伍', component: UserUpdate },
    { path: '/message',title:'邀请信息', component: MyInvitationPage },
    { path: '/team/invite',title:'邀请用户加入队伍', component: TeamInvitePage },
    { path: '/user/edit',title:'编辑信息', component: UserEdit },
    { path: '/user/list',title:'找伙伴', component: SearchResult },
    { path: '/user/login',title:'登录', component: UserLogin },
    { path: '/user/register',title:'注册', component: UserRegister },
]

export default routes;