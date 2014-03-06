/*!
 * iCheck v0.9.1, http://git.io/uhUPMA
 * =================================
 * Powerful jQuery plugin for checkboxes and radio buttons customization
 *
 * (c) 2013 Damir Foy, http://damirfoy.com
 * MIT Licensed
 */

(function(e){function t(e,t,i){var s=e[0];o=/er/.test(i)?m:/bl/.test(i)?d:h,active=i==g?{checked:s[h],disabled:s[d],indeterminate:e.attr(m)=="true"||e.attr(v)=="false"}:s[o];if(/^(ch|di|in)/.test(i)&&!active)n(e,o);else if(/^(un|en|de)/.test(i)&&active)r(e,o);else if(i==g)for(var o in active)active[o]?n(e,o,!0):r(e,o,!0);else if(!t||i=="toggle")t||e[x]("ifClicked"),active?s[y]!==c&&r(e,o):n(e,o)}function n(t,n,i){var l=t[0],g=t.parent(),b=n==h,w=n==m,x=w?v:b?p:"enabled",T=s(l,x+o(l[y])),C=s(l,n+o(l[y]));if(l[n]!==!0){if(!i&&n==h&&l[y]==c&&l.name){var k=t.closest("form"),L='input[name="'+l.name+'"]';L=k.length?k.find(L):e(L),L.each(function(){this!==l&&e.data(this,a)&&r(e(this),n)})}w?(l[n]=!0,l[h]&&r(t,h,"force")):(i||(l[n]=!0),b&&l[m]&&r(t,m,!1)),u(t,b,n,i)}l[d]&&!!s(l,N,!0)&&g.find("."+f).css(N,"default"),g[E](C||s(l,n)),g[S](T||s(l,x)||"")}function r(e,t,n){var r=e[0],i=e.parent(),a=t==h,l=t==m,c=l?v:a?p:"enabled",g=s(r,c+o(r[y])),b=s(r,t+o(r[y]));if(r[t]!==!1){if(l||!n||n=="force")r[t]=!1;u(e,a,c,n)}!r[d]&&!!s(r,N,!0)&&i.find("."+f).css(N,"pointer"),i[S](b||s(r,t)||""),i[E](g||s(r,c))}function i(t,n){if(e.data(t,a)){var r=e(t);r.parent().html(r.attr("style",e.data(t,a).s||"")[x](n||"")),r.off(".i").unwrap(),e(T+'[for="'+t.id+'"]').add(r.closest(T)).off(".i")}}function s(t,n,r){if(e.data(t,a))return e.data(t,a).o[n+(r?"":"Class")]}function o(e){return e.charAt(0).toUpperCase()+e.slice(1)}function u(e,t,n,r){r||(t&&e[x]("ifToggled"),e[x]("ifChanged")[x]("if"+o(n)))}var a="iCheck",f=a+"-helper",l="checkbox",c="radio",h="checked",p="un"+h,d="disabled",v="determinate",m="in"+v,g="update",y="type",b="click",w="touchbegin.i touchend.i",E="addClass",S="removeClass",x="trigger",T="label",N="cursor",C=/ipad|iphone|ipod|android|blackberry|windows phone|opera mini/i.test(navigator.userAgent);e.fn[a]=function(s,o){var u=":"+l+", :"+c,p=e(),v=function(t){t.each(function(){var t=e(this);t.is(u)?p=p.add(t):p=p.add(t.find(u))})};if(/^(check|uncheck|toggle|indeterminate|determinate|disable|enable|update|destroy)$/i.test(s))return s=s.toLowerCase(),v(this),p.each(function(){s=="destroy"?i(this,"ifDestroyed"):t(e(this),!0,s),e.isFunction(o)&&o()});if(typeof s=="object"||!s){var N=e.extend({checkedClass:h,disabledClass:d,indeterminateClass:m,labelHover:!0},s),k=N.handle,L=N.hoverClass||"hover",A=N.focusClass||"focus",O=N.activeClass||"active",M=!!N.labelHover,_=N.labelHoverClass||"hover",D=(""+N.increaseArea).replace("%","")|0;if(k==l||k==c)u=":"+k;return D<-50&&(D=-50),v(this),p.each(function(){i(this);var s=e(this),o=this,u=o.id,p=-D+"%",v=100+D*2+"%",m={position:"absolute",top:p,left:p,display:"block",width:v,height:v,margin:0,padding:0,background:"#fff",border:0,opacity:0},k=C?{position:"absolute",visibility:"hidden"}:D?m:{position:"absolute",opacity:0},P=o[y]==l?N.checkboxClass||"i"+l:N.radioClass||"i"+c,H=e(T+'[for="'+u+'"]').add(s.closest(T)),B=s.wrap('<div class="'+P+'"/>')[x]("ifCreated").parent().append(N.insert),j=e('<ins class="'+f+'"/>').css(m).appendTo(B);s.data(a,{o:N,s:s.attr("style")}).css(k),!!N.inheritClass&&B[E](o.className),!!N.inheritID&&u&&B.attr("id",a+"-"+u),B.css("position")=="static"&&B.css("position","relative"),t(s,!0,g),H.length&&H.on(b+".i mouseenter.i mouseleave.i "+w,function(n){var r=n[y],i=e(this);if(!o[d]){r==b?t(s,!1,!0):M&&(/ve|nd/.test(r)?(B[S](L),i[S](_)):(B[E](L),i[E](_)));if(!C)return!1;n.stopPropagation()}}),s.on(b+".i focus.i blur.i keyup.i keydown.i keypress.i",function(e){var t=e[y],i=e.keyCode;if(t==b)return!1;if(t=="keydown"&&i==32){if(o[y]!=c||!o[h])o[h]?r(s,h):n(s,h);return!1}t=="keyup"&&o[y]==c?!o[h]&&n(s,h):/us|ur/.test(t)&&B[t=="blur"?S:E](A)}),j.on(b+" mousedown mouseup mouseover mouseout "+w,function(e){var n=e[y],r=/wn|up/.test(n)?O:L;if(!o[d]){n==b?t(s,!1,!0):(/wn|er|in/.test(n)?B[E](r):B[S](r+" "+O),H.length&&M&&r==L&&H[/ut|nd/.test(n)?S:E](_));if(!C)return!1;e.stopPropagation()}})})}return this}})(jQuery);