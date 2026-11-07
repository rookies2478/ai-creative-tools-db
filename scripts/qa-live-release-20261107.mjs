import { chromium } from 'playwright';
import { mkdirSync, writeFileSync } from 'node:fs';

const RELEASES=[
 {label:'tldv',url:'https://www.ai-gijiroku-navi.com/tools/tldv/',expected:'tl;dvを調べる目的別'},
 {label:'speaker-diarization',url:'https://www.ai-gijiroku-navi.com/guides/speaker-diarization/',expected:'導入前の確認方法'},
 {label:'fotor-ai',url:'https://aicreative-db.com/tools/fotor-ai/',expected:'無料・透かし・商用利用：用途別の確認ポイント'}
];
const REQUIRED_SHA='6e5a99238ac0cfc9a120e3c28bbe00724e8c4433';
const OUT='qa-release-results';
mkdirSync(OUT,{recursive:true});
const results=[];
async function readPublishedSha(){
 const url='https://aicreative-db.com/deployment-commit.txt?release_qa='+Date.now();
 try {
   const r=await fetch(url,{signal:AbortSignal.timeout(20000),headers:{'Cache-Control':'no-cache'}});
   const text=(await r.text()).trim();
   return {status:r.status,actual:r.ok?text:'HTTP_'+r.status,expected:REQUIRED_SHA,
      exactMatch:r.ok&&text===REQUIRED_SHA};
 }catch(e){return {status:'ERROR',actual:String(e?.message??e),expected:REQUIRED_SHA,exactMatch:false}}
}
const marker=await readPublishedSha();
console.log('PUBLIC_SHA '+JSON.stringify(marker));
const browser=await chromium.launch({headless:true,args:['--no-sandbox']});
for(const cfg of RELEASES){
 for(const width of [1440,375]){
   const mobile=width===375;
   const context=await browser.newContext({viewport:{width,height:mobile?812:900},deviceScaleFactor:1,isMobile:mobile,hasTouch:mobile});
   const page=await context.newPage();
   const consoleErrors=[],pageErrors=[];
   page.on('console',m=>{if(m.type()==='error')consoleErrors.push(m.text().slice(0,200))});
   page.on('pageerror',e=>pageErrors.push(String(e.message).slice(0,200)));
   let response,loaded=false;
   try{
     response=await page.goto(cfg.url+'?release_qa='+Date.now(),{waitUntil:'domcontentloaded',timeout:35000});
     await page.waitForTimeout(1800);
     loaded=true;
     const data=await page.evaluate(({expected})=>{
       const d=document.documentElement,b=document.body;
       const txt=b?.innerText??'';
       const canonical=document.querySelector('link[rel="canonical"]')?.href??'';
       const h1=document.querySelector('h1')?.innerText?.trim()??'';
       const title=document.title;
       const unfilledImages=[...document.images].filter(i=>!i.complete||i.naturalWidth===0)
          .slice(0,6).map(i=>i.currentSrc?.slice(0,150));
       const primaryLinks=[...document.querySelectorAll('a[href]')].filter(a=>a.offsetWidth>0&&a.offsetHeight>0);
       const visibleTables=[...document.querySelectorAll('table')].filter(t=>t.getBoundingClientRect().height>0);
       return {h1,title,canonical,exists:txt.includes(expected),docWidth:d.scrollWidth,bodyWidth:b?.scrollWidth??0,
         viewportWidth:innerWidth,imageProblems:unfilledImages,visibleLinks:primaryLinks.length,
         tableCount:visibleTables.length,bodyCharacters:txt.length,
         mainExists:!!document.querySelector('main')};
     },{expected:cfg.expected});
     const result={label:cfg.label,viewport:width,http:response?.status(),...data,
      jsPageErrors:pageErrors,consoleErrors:consoleErrors.slice(0,6),
      pass:response?.status()===200&&data.exists&&data.h1.length>0&&
       data.docWidth<=width+10&&data.mainExists&&data.visibleLinks>0};
     results.push(result);
     await page.screenshot({path:OUT+'/'+cfg.label+'-'+width+'.png',fullPage:true,animations:'disabled',timeout:15000});
     console.log('VIEW '+JSON.stringify(result));
   }catch(err){
     const fail={label:cfg.label,viewport:width,loaded,http:response?.status()??0,pass:false,error:String(err.message).slice(0,350)};
     results.push(fail);console.log('VIEW '+JSON.stringify(fail));
     try{await page.screenshot({path:OUT+'/'+cfg.label+'-'+width+'-error.png',timeout:8000})}catch{}
   }
   await context.close();
 }
}
await browser.close();
const output={checkedAt:new Date().toISOString(),marker,results,
  passAll:marker.exactMatch&&results.length===6&&results.every(r=>r.pass)};
writeFileSync(OUT+'/report.json',JSON.stringify(output,null,2)+'\n');
console.log('SUMMARY '+JSON.stringify({markerPass:marker.exactMatch,viewsPass:results.filter(r=>r.pass).length,views:results.length,overall:output.passAll}));
if(!output.passAll)process.exitCode=1;
