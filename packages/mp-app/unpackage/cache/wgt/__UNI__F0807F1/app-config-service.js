
  ;(function(){
  let u=void 0,isReady=false,onReadyCallbacks=[],isServiceReady=false,onServiceReadyCallbacks=[];
  const __uniConfig = {"pages":[],"globalStyle":{"backgroundColor":"#F8F8F8","navigationBar":{"backgroundColor":"#F8F8F8","titleText":"uni-app","type":"default","titleColor":"#000000"},"isNVue":false},"nvue":{"compiler":"uni-app","styleCompiler":"uni-app","flex-direction":"column"},"renderer":"auto","appname":"mp-app","splashscreen":{"alwaysShowBeforeRender":true,"autoclose":true},"compilerVersion":"3.96","entryPagePath":"pages/index/index","entryPageQuery":"","realEntryPagePath":"","networkTimeout":{"request":60000,"connectSocket":60000,"uploadFile":60000,"downloadFile":60000},"tabBar":{"position":"bottom","color":"#7A7E83","selectedColor":"#d4237a","borderStyle":"black","blurEffect":"none","fontSize":"10px","iconWidth":"24px","spacing":"3px","height":"50px","backgroundColor":"#F8F8F8","list":[{"pagePath":"pages/index/index","iconPath":"/static/index.png","selectedIconPath":"/static/index-selected.png","text":"首页"},{"pagePath":"pages/community/community","iconPath":"/static/community.png","selectedIconPath":"/static/community-selected.png","text":"社区"},{"pagePath":"pages/session/session","iconPath":"/static/session-.png","selectedIconPath":"/static/session-selected.png","text":"消息"},{"pagePath":"pages/self/self","iconPath":"/static/self.png","selectedIconPath":"/static/self-selected.png","text":"我的"}],"selectedIndex":0,"shown":true},"locales":{},"darkmode":false,"themeConfig":{}};
  const __uniRoutes = [{"path":"pages/index/index","meta":{"isQuit":true,"isEntry":true,"isTabBar":true,"tabBarIndex":0,"navigationBar":{"titleText":"华中农业大学","type":"default"},"isNVue":false}},{"path":"pages/self/self","meta":{"isQuit":true,"isTabBar":true,"tabBarIndex":3,"enablePullDownRefresh":false,"navigationBar":{"titleText":"","style":"custom","type":"default"},"isNVue":false}},{"path":"pages/session/session","meta":{"isQuit":true,"isTabBar":true,"tabBarIndex":2,"enablePullDownRefresh":false,"navigationBar":{"titleText":"","type":"default"},"isNVue":false}},{"path":"pages/community/community","meta":{"isQuit":true,"isTabBar":true,"tabBarIndex":1,"enablePullDownRefresh":true,"navigationBar":{"titleText":"","type":"default"},"isNVue":false}},{"path":"pages/chat/chat","meta":{"enablePullDownRefresh":false,"navigationBar":{"titleText":"","type":"default"},"isNVue":false}},{"path":"pages/community/post/post","meta":{"enablePullDownRefresh":false,"navigationBar":{"titleText":"帖子详情","type":"default"},"isNVue":false}},{"path":"pages/community/publish/publish","meta":{"enablePullDownRefresh":false,"navigationBar":{"titleText":"写帖子","type":"default"},"isNVue":false}}].map(uniRoute=>(uniRoute.meta.route=uniRoute.path,__uniConfig.pages.push(uniRoute.path),uniRoute.path='/'+uniRoute.path,uniRoute));
  __uniConfig.styles=[];//styles
  __uniConfig.onReady=function(callback){if(__uniConfig.ready){callback()}else{onReadyCallbacks.push(callback)}};Object.defineProperty(__uniConfig,"ready",{get:function(){return isReady},set:function(val){isReady=val;if(!isReady){return}const callbacks=onReadyCallbacks.slice(0);onReadyCallbacks.length=0;callbacks.forEach(function(callback){callback()})}});
  __uniConfig.onServiceReady=function(callback){if(__uniConfig.serviceReady){callback()}else{onServiceReadyCallbacks.push(callback)}};Object.defineProperty(__uniConfig,"serviceReady",{get:function(){return isServiceReady},set:function(val){isServiceReady=val;if(!isServiceReady){return}const callbacks=onServiceReadyCallbacks.slice(0);onServiceReadyCallbacks.length=0;callbacks.forEach(function(callback){callback()})}});
  service.register("uni-app-config",{create(a,b,c){if(!__uniConfig.viewport){var d=b.weex.config.env.scale,e=b.weex.config.env.deviceWidth,f=Math.ceil(e/d);Object.assign(__uniConfig,{viewport:f,defaultFontSize:16})}return{instance:{__uniConfig:__uniConfig,__uniRoutes:__uniRoutes,global:u,window:u,document:u,frames:u,self:u,location:u,navigator:u,localStorage:u,history:u,Caches:u,screen:u,alert:u,confirm:u,prompt:u,fetch:u,XMLHttpRequest:u,WebSocket:u,webkit:u,print:u}}}}); 
  })();
  