import{c as t,r as n,j as r,a as s,u as i,b as c,f as p,F as m}from"./index.f98f8810.js";import{M as l}from"./MyNavbar.9dd806d6.js";const h=t(e=>e.genres.genres,e=>e),g=t(e=>e.genres.isLoading,e=>e),f="_card_1rf1o_1";var G={card:f};const u=({genre:e})=>r("div",{className:G.card,children:[s("h2",{children:e.name}),r("span",{children:["Id - ",e.id]})]}),x=n.exports.memo(u),v=()=>{const e=i(),o=c(h),d=c(g);return n.exports.useEffect(()=>{e(p())},[e]),d?s("div",{children:"Loading"}):r(m,{children:[s(l,{}),s("h1",{children:"Genres"}),o.map(a=>s(x,{genre:a},a.id))]})},j=n.exports.memo(v);export{j as GenresPage};
