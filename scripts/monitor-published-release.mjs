import { execFileSync } from 'node:child_process';
const marker='https://aicreative-db.com/deployment-commit.txt';
const response=await fetch(marker+'?monitor='+process.env.GITHUB_RUN_ID,{signal:AbortSignal.timeout(15000),headers:{'Cache-Control':'no-cache'}});
if(response.status!==200)throw new Error('Published marker HTTP '+response.status);
const sha=(await response.text()).trim();
if(!/^[a-f0-9]{40}$/.test(sha))throw new Error('Missing valid published SHA');
const home=await fetch('https://aicreative-db.com/',{signal:AbortSignal.timeout(15000)});
if(home.status!==200)throw new Error('Homepage HTTP '+home.status);
try {execFileSync('git',['merge-base','--is-ancestor',sha,'HEAD'],{stdio:'pipe'});}
catch {throw new Error('Published SHA not found in checked out master history');}
console.log('PASS: published SHA belongs to master history; homepage HTTP 200; released SHA '+sha);
// Manual-release policy: equality with HEAD is not required.
