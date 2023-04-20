const routes = [
    {
        path:'/',
        name:'MainInterface',
        component:()=>import('@/components/MainInterface.vue'),
        children: [
            {
                path: 'querydata',
                component:()=>import('@/components/main/queryData/QueryDataView.vue')
            },
            {
                path: 'preprodata',
                component:()=>import('@/components/main/preproData/PreproDataView.vue')
            },
            {
                path: 'statisticsdata',
                component:()=>import('@/components/main/statisticsData/statisticsDataView.vue')
            },
            {
                path: 'predictiondata',
                component:()=>import('@/components/main/predictionData/PredictionDataView.vue')
            }
        ]
    },
    {
        path:'/user',
        name:'UserMain',
        component:()=>import('@/components/user/UserMain.vue'),
        children:[
            {
                path:'login',
                component:()=>import('@/components/user/loginViews/LoginView.vue')
            },
            {
                path:'register',
                component:()=>import('@/components/user/registerViews/RegisterView.vue')
            }
        ]
    },
]

export default routes