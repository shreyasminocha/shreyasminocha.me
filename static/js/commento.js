window.commentoOrigin='https://commento.io';
window.commentoCdn='https://cdn.commento.io';
window.stripePublicKey='pk_live_TgKejzJqx0b6YFU4kBVOkZrQ';
!function(t,i){"use strict";var m="commento",a="commento-main-area",h="commento-login-box-container",x="commento-login-box",k="commento-login-box-header",b="commento-login-box-subtitle",y="commento-login-box-email-input",f="commento-login-box-password-input",w="commento-login-box-name-input",T="commento-login-box-website-input",H="commento-login-box-email-button",C="commento-login-box-login-link-container",S="commento-login-box-login-link",L="commento-login-box-hr",M="commento-login-box-oauth-pretext",B="commento-login-box-oauth-buttons-container",r="commento-mod-tools",l="commento-mod-tools-lock-button",s="commento-error",u="commento-logged-container",d="commento-comments-area",p="commento-textarea-super-container-",v="commento-textarea-container-",g="commento-textarea-",E="commento-comment-card-",N="commento-comment-body-",A="commento-comment-subtitle-",O="commento-comment-score-",R="commento-comment-options-",D="commento-comment-edit-",U="commento-comment-reply-",I="commento-comment-collapse-",q="commento-comment-upvote-",_="commento-comment-downvote-",P="commento-comment-approve-",j="commento-comment-remove-",J="commento-comment-sticky-",z="commento-comment-contents-",W="commento-footer",X=t.commentoOrigin,Y=t.commentoCdn,F=null,c=void 0,G=void 0,$=!1,K=[],Q=[],V=!1,Z={root:!1},oo=!1,eo=!1,no="none",to={},n={},io=[],co="signup",mo=!1;function ao(o){return i.getElementById(o)}function ro(o,e){o.appendChild(e)}function lo(o,e){o.classList.add("commento-"+e)}function so(o,e){o.classList.remove("commento-"+e)}function uo(o){return i.createElement(o)}function po(o){o.parentNode.removeChild(o)}function vo(o,e){var n=o.attributes[e];if(void 0!==n)return n.value}function go(o,e,n){o.setAttribute(e,n)}function fo(o,e,n){var t=new XMLHttpRequest;t.open("POST",o,!0),t.setRequestHeader("Content-type","application/x-www-form-urlencoded"),t.onload=function(){n(JSON.parse(t.response))},t.send(JSON.stringify(e))}function ho(o){"function"==typeof o&&o()}function xo(o,e){var n,t=new Date;t.setTime(t.getTime()+31536e6),n="; expires="+t.toUTCString(),i.cookie=o+"="+e+n+"; path=/"}function ko(){var o=function(o){var e=("; "+i.cookie).split("; "+o+"=");if(2==e.length)return e.pop().split(";").shift()}("commentoCommenterToken");return void 0===o?"anonymous":o}function bo(o,e){var n=uo("link"),t=i.getElementsByTagName("head")[0];n.type="text/css",go(n,"href",o),go(n,"rel","stylesheet"),go(n,"onload",e),ro(t,n)}function yo(e){var o={commenterToken:ko(),domain:location.host,path:location.pathname};fo(X+"/api/comment/list",o,function(o){o.success?(o.requireModeration,o.requireIdentification,V=o.isModerator,o.isFrozen,eo=o.attributes.isLocked,no=o.attributes.stickyCommentHex,to=o.features,K=o.comments,Q=o.commenters,io=o.configuredOauths,o.requireIdentification||io.push("anonymous"),bo(Y+"/css/commento.css","window.loadCssOverride()"),ho(e)):wo(o.message)})}function wo(o){var e=ao(s);e.innerText=o,go(e,"style","display: block;")}function To(o){var e,n=uo("div"),t=uo("div"),i=uo("textarea");if(n.id=p+o,t.id=v+o,i.id=g+o,lo(t,"textarea-container"),$||oo)go(i,"placeholder","Join the discussion!"),go(i,"onclick","showSubmitButton('"+o+"')");else{var c=uo("div"),m=uo("div"),a=uo("div"),r=uo("div"),l=uo("div");lo(c,"account-buttons-container"),lo(m,"account-buttons-question"),lo(a,"account-buttons"),lo(r,"button"),lo(r,"create-button"),lo(l,"button"),lo(l,"login-button"),go(r,"onclick","loginBoxShow()"),go(l,"onclick","loginBoxShow(); loginSwitch(true);"),go(i,"disabled",!0),r.innerText="Create an Account",l.innerText="Login",m.innerText="Want to add to the discussion?",ro(a,r),ro(a,l),ro(c,a),ro(t,m),ro(t,c)}return i.oninput=(e=i,function(){e.style.height="",e.style.height=Math.min(Math.max(e.scrollHeight,75),400)+"px"}),ro(t,i),ro(n,t),n}function Ho(o){var e=uo("div");return lo(e,"moderation-notice"),e.innerText=o,e}function Co(o){for(var e=["#35b2de","#62cd0a","#383838","#e4a90f","#f80707","#f0479c"],n=0,t=0;t<o.length;t++)n+=o.charCodeAt(t);return e[n%e.length]}function So(o){return 1!=o?o+" points":o+" point"}function Lo(C,S){var o=C[S];if(!o||!o.length)return null;o.sort(function(o,e){if(to["sticky-comments"]){if(o.commentHex==no)return-1/0;if(e.commentHex==no)return 1/0}return e.score-o.score});var L=uo("div");return o.forEach(function(o){var e,n,t,i,c,m=Q[o.commenterHex],a=uo("div"),r=uo("div"),l=uo("div"),s=uo("div"),u=uo("div"),d=uo("div"),p=uo("button"),v=uo("button"),g=uo("button"),f=uo("button"),h=uo("button"),x=uo("button"),k=uo("button"),b=uo("button"),y=Lo(C,o.commentHex),w=uo("div"),T=Co(m.name);n="undefined"!=m.link&&"https://undefined"!=m.link&&""!=m.link?uo("a"):uo("div"),a.id=E+o.commentHex,u.id=N+o.commentHex,l.id=A+o.commentHex,s.id=O+o.commentHex,d.id=R+o.commentHex,p.id=D+o.commentHex,v.id=U+o.commentHex,g.id=I+o.commentHex,f.id=q+o.commentHex,h.id=_+o.commentHex,x.id=P+o.commentHex,k.id=j+o.commentHex,b.id=J+o.commentHex,w.id=z+o.commentHex,g.title="Collapse",f.title="Upvote",h.title="Downvote",p.title="Edit",v.title="Reply",x.title="Approve",k.title="Remove",no==o.commentHex?b.title=V?"Unsticky":"This comment has been stickied":b.title="Sticky",a.style.borderLeft="2px solid "+T,n.innerText=m.name,u.innerHTML=o.html,l.innerHTML=(t=(new Date).getTime(),i=Date.parse(o.creationDate),(c=t-i)<5e3?"just now":c<6e4?Math.round(c/1e3)+" seconds ago":c<36e5?Math.round(c/6e4)+" minutes ago":c<864e5?Math.round(c/36e5)+" hours ago":c<2592e6?Math.round(c/864e5)+" days ago":c<94608e7?Math.round(c/2592e6)+" months ago":Math.round(c/94608e7)+" years ago"),s.innerText=So(o.score),"undefined"==m.photo?((e=uo("div")).style.background=T,e.style.boxShadow="0px 0px 0px 2px "+T,e.innerHTML=m.name[0].toUpperCase(),lo(e,"avatar")):(e=uo("img"),"google"==m.provider?go(e,"src",m.photo+"?sz=50"):go(e,"src",m.photo),lo(e,"avatar-img")),lo(a,"card"),V&&"unapproved"==o.state&&lo(a,"dark-card"),lo(r,"header"),lo(n,"name"),lo(l,"subtitle"),lo(s,"score"),lo(u,"body"),lo(d,"options"),lo(p,"option-button"),lo(p,"option-edit"),lo(v,"option-button"),lo(v,"option-reply"),lo(g,"option-button"),lo(g,"option-collapse"),lo(f,"option-button"),lo(f,"option-upvote"),lo(h,"option-button"),lo(h,"option-downvote"),lo(x,"option-button"),lo(x,"option-approve"),lo(k,"option-button"),lo(k,"option-remove"),lo(b,"option-button"),no==o.commentHex?lo(b,"option-unsticky"):lo(b,"option-sticky"),$&&(0<o.direction?lo(f,"upvoted"):o.direction<0&&lo(h,"downvoted")),go(p,"onclick","startEdit('"+o.commentHex+"')"),go(g,"onclick","commentCollapse('"+o.commentHex+"')"),go(x,"onclick","commentApprove('"+o.commentHex+"')"),go(k,"onclick","commentDelete('"+o.commentHex+"')"),$&&go(b,"onclick","commentSticky('"+o.commentHex+"')"),$?0<o.direction?(go(f,"onclick","vote('"+o.commentHex+"', 1, 0)"),go(h,"onclick","vote('"+o.commentHex+"', 1, -1)")):o.direction<0?(go(f,"onclick","vote('"+o.commentHex+"', -1, 1)"),go(h,"onclick","vote('"+o.commentHex+"', -1, 0)")):(go(f,"onclick","vote('"+o.commentHex+"', 0, 1)"),go(h,"onclick","vote('"+o.commentHex+"', 0, -1)")):(go(f,"onclick","loginBoxShow()"),go(h,"onclick","loginBoxShow()")),go(v,"onclick",$||oo?"replyShow('"+o.commentHex+"')":"loginBoxShow()"),"undefined"!=m.link&&"https://undefined"!=m.link&&""!=m.link&&go(n,"href",m.link),ro(d,g),ro(d,h),ro(d,f),eo||ro(d,v),V?("root"==S&&to["sticky-comments"]&&ro(d,b),ro(d,k),"unapproved"==o.state&&ro(d,x)):no==o.commentHex&&ro(d,b),go(d,"style","width: "+32*(d.childNodes.length+1)+"px;");for(var H=0;H<d.childNodes.length;H++)go(d.childNodes[H],"style","right: "+32*H+"px;");ro(l,s),ro(r,d),ro(r,e),ro(r,n),ro(r,l),ro(w,u),y&&(lo(y,"body"),ro(w,y)),ro(a,r),ro(a,w),ro(L,a),Z[o.commentHex]=!1}),L}function Mo(){var e,n={},o=ao(d);K.forEach(function(o){(e=o.parentHex)in n||(n[e]=[]),n[e].push(o)});var t=Lo(n,"root");t&&ro(o,t)}function Bo(o){ao(m).innerHTML="",Z={root:!1},n={},main(o)}function Eo(o,e){fo(X+"/api/commenter/login",{email:o,password:e},function(o){if(!o.success)return loginBoxClose(),void wo(o.message);xo("commentoCommenterToken",o.commenterToken),Bo()})}function No(e){var o={isLocked:eo,stickyCommentHex:no},n={commenterToken:ko(),domain:location.host,path:location.pathname,attributes:o};fo(X+"/api/page/update",n,function(o){o.success?ho(e):wo(o.message)})}function o(){for(var o,e=(o="script",i.getElementsByTagName(o)),n=0;n<e.length;n++)e[n].src.match(/\/js\/commento\.js$/)&&(c=vo(e[n],"data-css-override"),G=vo(e[n],"data-auto-init"),void 0===(m=vo(e[n],"data-id-root"))&&(m="commento"))}t.logout=function(){xo("commentoCommenterToken","anonymous"),Bo()},t.commentNew=function(i){var o=ao(g+i),e=o.value;if(""!=e){so(o,"red-border");var n={commenterToken:ko(),domain:location.host,path:location.pathname,parentHex:i,markdown:e};fo(X+"/api/comment/new",n,function(t){t.success?(ao(g+i).value="",yo(function(){if(ao(d).innerHTML="",Mo(),!t.approved)if("root"==i){var o=ao(p+i);e=o,n=Ho("Your comment is under moderation."),e.prepend(n)}else{ro(o=ao(N+i),Ho("Your comment is under moderation."))}var e,n})):wo(t.message)})}else lo(o,"red-border")},t.commentApprove=function(t){var o={commenterToken:ko(),commentHex:t};fo(X+"/api/comment/approve",o,function(o){if(o.success){var e=ao(E+t),n=(ao(R+t),ao(P+t));so(e,"dark-card"),po(n)}else wo(o.message)})},t.commentDelete=function(e){var o={commenterToken:ko(),commentHex:e};fo(X+"/api/comment/delete",o,function(o){o.success?po(ao(E+e)):wo(o.message)})},t.vote=function(o,e,n){var t=ao(q+o),i=ao(_+o),c=ao(O+o),m={commenterToken:ko(),commentHex:o,direction:n};0<n?(go(t,"onclick","vote('"+o+"', 1, 0)"),go(i,"onclick","vote('"+o+"', 1, -1)")):n<0?(go(t,"onclick","vote('"+o+"', -1, 1)"),go(i,"onclick","vote('"+o+"', -1, 0)")):(go(t,"onclick","vote('"+o+"', 0, 1)"),go(i,"onclick","vote('"+o+"', 0, -1)")),so(t,"upvoted"),so(i,"downvoted"),0<n?lo(t,"upvoted"):n<0&&lo(i,"downvoted"),c.innerText=So(parseInt(c.innerText.replace(/[^\d-.]/g,""))+n-e),fo(X+"/api/comment/vote",m,function(o){})},t.replyShow=function(o){if(!(o in n&&n[o])){ro(ao(N+o),To(o)),n[o]=!0;var e=ao(U+o);so(e,"option-reply"),lo(e,"option-cancel"),e.title="Cancel reply",go(e,"onclick","replyCollapse('"+o+"')")}},t.replyCollapse=function(o){var e=ao(U+o);ao(p+o).remove(),n[o]=!1,Z[o]=!1,lo(e,"option-reply"),so(e,"option-cancel"),e.title="Reply to this comment",go(e,"onclick","replyShow('"+o+"')")},t.commentCollapse=function(o){var e=ao(z+o),n=ao(I+o);lo(e,"hidden"),so(n,"option-collapse"),lo(n,"option-uncollapse"),n.title="Expand",go(n,"onclick","commentUncollapse('"+o+"')")},t.commentUncollapse=function(o){var e=ao(z+o),n=ao(I+o);so(e,"hidden"),so(n,"option-uncollapse"),lo(n,"option-collapse"),n.title="Collapse",go(n,"onclick","commentCollapse('"+o+"')")},t.showSubmitButton=function(o){if(!(o in Z&&Z[o])){Z[o]=!0;var e=ao(p+o),n=uo("button");n.id="commento-submit-button-"+o,n.innerText="Add Comment",lo(n,"button"),lo(n,"submit-button"),lo(e,"button-margin"),go(n,"onclick","commentNew('"+o+"')"),ro(e,n)}},t.commentoAuth=function(n){if("anonymous"==n)return xo("commentoCommenterToken","anonymous"),oo=!0,void Bo();var o,e,t,i=window.open("","_blank");o=X+"/api/commenter/token/new",e=function(o){if(o.success){xo("commentoCommenterToken",o.commenterToken),i.location=X+"/api/oauth/"+n+"/redirect?commenterToken="+o.commenterToken;var e=setInterval(function(){i.closed&&(Bo(),clearInterval(e))},250)}else wo(o.message)},(t=new XMLHttpRequest).open("GET",o,!0),t.onload=function(){e(JSON.parse(t.response))},t.send(null)},t.signupRender=function(){var o=ao(h),e=uo("div"),n=uo("div"),t=uo("div"),i=uo("div"),c=uo("div"),m=uo("input"),a=uo("button"),r=uo("div"),l=uo("a"),s=uo("hr"),u=uo("div"),d=uo("div"),p=uo("div"),v=uo("div");e.id=x,n.id=k,t.id=b,m.id=y,a.id=H,l.id=S,r.id=C,s.id=L,u.id=M,d.id=B,n.innerText="Create an account to join the discussion!",lo(o,"login-box-container"),lo(e,"login-box"),lo(n,"login-box-header"),lo(t,"login-box-subtitle"),lo(i,"email-container"),lo(c,"email"),lo(m,"input"),lo(a,"email-button"),lo(r,"login-link-container"),lo(l,"login-link"),lo(u,"login-box-subtitle"),lo(d,"oauth-buttons-container"),lo(p,"oauth-buttons"),lo(v,"login-box-close"),lo(F,"root-min-height"),a.innerText="Continue",l.innerText="Already have an account? Log in.",t.innerText="Sign up with your email to vote and comment.",u.innerText="Or proceed with social login.",go(o,"style","display: none; opacity: 0;"),go(m,"name","email"),go(m,"placeholder","Email address"),go(m,"type","text"),go(a,"onclick","passwordAsk()"),go(l,"onclick","loginSwitch()"),go(v,"onclick","loginBoxClose()");for(var g=0;g<io.length;g++){var f=uo("button");lo(f,"button"),lo(f,io[g]+"-button"),f.innerText=io[g],go(f,"onclick","commentoAuth('"+io[g]+"')"),ro(p,f)}ro(e,n),ro(e,t),ro(c,m),ro(c,a),ro(i,c),ro(e,i),ro(r,l),ro(e,r),0<io.length?(ro(e,s),ro(e,u),ro(d,p),ro(e,d),mo=!0):mo=!1,ro(e,v),co="signup",o.innerHTML="",ro(o,e)},t.loginSwitch=function(o){var e=ao(k),n=ao(b),t=ao(S),i=ao(L),c=ao(B),m=ao(M);e.innerText="Login to continue",t.innerText="Don't have an account? Sign up.",n.innerText="Enter your email address to start with.",go(t,"onclick","signupSwitch()"),co="login",ouathButtonsShown&&!0!==o&&0<io.length&&(po(i),po(m),po(c),mo=!1)},t.signupSwitch=function(){loginBoxClose(),loginBoxShow()},t.login=function(){var o=ao(y),e=ao(f);Eo(o.value,e.value)},t.signup=function(){var e=ao(y),o=ao(w),n=ao(T),t=ao(f),i={email:e.value,name:o.value,website:n.value,password:t.value};fo(X+"/api/commenter/new",i,function(o){if(!o.success)return loginBoxClose(),void wo(o.message);Eo(e.value,t.value)})},t.passwordAsk=function(){var o=ao(x),e=ao(b),n=(ao(y),ao(H)),t=ao(C),i=ao(L),c=ao(B),m=ao(M);if(po(n),po(t),mo&&0<io.length&&(po(i),po(m),po(c)),"signup"==co)var a=["name","website","password"],r=[w,T,f],l=["text","text","password"],s=["Real Name","Website (Optional)","Password"];else a=["password"],r=[f],l=["password"],s=["Password"];e.innerText="signup"==co?"Finish the rest of your profile to complete.":"Enter your password to log in.";for(var u=0;u<a.length;u++){var d=uo("div"),p=uo("div"),v=uo("input");if(v.id=r[u],lo(d,"email-container"),lo(p,"email"),lo(v,"input"),go(v,"name",a[u]),go(v,"type",l[u]),go(v,"placeholder",s[u]),ro(p,v),ro(d,p),"password"==a[u]){var g=uo("button");lo(g,"email-button"),g.innerText=co,go(g,"onclick","signup"==co?"signup()":"login()"),ro(p,g)}ro(o,d)}"signup"==co?ao(ID_LOGIN_BOX_PASSWORD_NAME).focus():ao(f).focus()},t.threadLockToggle=function(){var e=ao(l);eo=!eo,e.disabled=!0,No(function(o){e.disabled=!1,e.innerHTML=eo?"Unlock Thread":"Lock Thread"})},t.commentSticky=function(n){if("none"!=no){var o=ao(J+no);null===o?no="none":(so(o,"option-unsticky"),lo(o,"option-sticky"))}no=no==n?"none":n,No(function(o){var e=ao(J+n);no==n?(so(e,"option-sticky"),lo(e,"option-unsticky")):(so(e,"option-unsticky"),lo(e,"option-sticky"))})},t.loadCssOverride=function(){void 0===c?t.allShow():bo(c,"window.allShow()")},t.allShow=function(){var o=ao(a),e=ao(r),n=ao(u),t=ao(W);go(o,"style",""),V&&go(e,"style",""),n&&go(n,"style",""),go(t,"style",""),function(){for(var o=i.getElementsByClassName("commento-name"),e=0;e<o.length;e++)go(o[e],"style","max-width: "+(o[e].getBoundingClientRect().width+20)+"px;")}()},t.loginBoxClose=function(){var o=ao(a),e=ao(h);so(o,"blurred"),so(F,"root-min-height"),go(e,"style","display: none")},t.loginBoxShow=function(o){var e=ao(a),n=ao(h);t.signupRender(),lo(e,"blurred"),go(n,"style",""),window.location.hash=h,ao(y).focus()};var e=!(t.main=function(c){var o,e,n;lo(F=ao(m),"root"),(o=uo("div")).id=h,ro(F,o),(e=uo("div")).id=s,lo(e,"error-box"),go(e,"style","display: none;"),ro(F,e),(n=uo("div")).id=a,lo(n,"main-area"),go(n,"style","display: none"),ro(F,n),function(a){if("anonymous"==ko())return $=!1,ho(a);var o={commenterToken:ko()};fo(X+"/api/commenter/self",o,function(o){if(!o.success)return xo("commentoCommenterToken","anonymous"),void ho(a);var e,n=uo("div"),t=uo("div"),i=uo("a"),c=uo("div"),m=Co(o.commenter.name);n.id=u,lo(n,"logged-container"),lo(t,"logged-in-as"),lo(i,"name"),lo(c,"logout"),i.innerText=o.commenter.name,c.innerText="Logout",go(n,"style","display: none"),go(c,"onclick","logout()"),go(i,"href",o.commenter.link),"undefined"==o.commenter.photo?((e=uo("div")).style.background=m,e.style.boxShadow="0px 0px 0px 2px "+m,e.innerHTML=o.commenter.name[0].toUpperCase(),lo(e,"avatar")):(e=uo("img"),"google"==o.commenter.provider?go(e,"src",o.commenter.photo+"?sz=50"):go(e,"src",o.commenter.photo),lo(e,"avatar-img")),ro(t,e),ro(t,i),ro(n,t),ro(n,c),ro(F,n),$=!0,ho(a)})}(function(){yo(function(){var o,e,n,t,i;o=uo("div"),e=uo("button"),o.id=r,e.id=l,lo(o,"mod-tools"),lo(e,"mod-tools-lock-button"),e.innerHTML=eo?"Unlock Thread":"Lock Thread",go(o,"style","display: none"),go(e,"onclick","threadLockToggle()"),ro(o,e),ro(F,o),n=function(){var o,e,n,t,i;Mo(),o=uo("div"),e=uo("div"),n=uo("a"),t=uo("img"),i=uo("span"),o.id=W,lo(o,"footer"),lo(e,"logo-container"),lo(n,"logo"),lo(t,"logo-svg"),lo(i,"logo-text"),go(o,"style","display: none"),go(n,"href","https://commento.io"),go(n,"target","_blank"),go(t,"src",Y+"/images/logo.svg"),i.innerText="Powered by Commento",ro(n,t),ro(n,i),ro(e,n),ro(o,e),ro(F,o),go(F,"style",""),ho(c)},t=ao(a),(i=uo("div")).id=d,lo(i,"comments"),i.innerHTML="",ro(t,eo?Ho("This thread is locked. You cannot create new comments."):To("root")),ro(t,i),ro(F,t),ho(n)})})});function Ao(){e||(e=!0,o(),"true"==G||void 0===G?main(void 0):"false"!=G&&console.log("[commento] error: invalid value for data-auto-init; allowed values: true, false"))}var Oo=function(){var o=i.readyState;"loading"==o?i.addEventListener("readystatechange",Oo):"interactive"==o?Ao():"complete"==o&&Ao()};Oo()}(window,document);