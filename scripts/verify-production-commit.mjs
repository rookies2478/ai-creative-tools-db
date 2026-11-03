import { setTimeout as delay } from 'node:timers/promises';
const sha = process.env.EXPECTED_SHA;
if (!/^[a-f0-9]{40}$/.test(sha || '')) throw new Error('EXPECTED_SHA missing');
let valid = false;
for (let i=0;i<18;i++) {
  try {
    const response = await fetch('https://aicreative-db.com/deployment-commit.txt?verify='+sha,{signal:AbortSignal.timeout(12000),headers:{'Cache-Control':'no-cache'}});
    const actual = (await response.text()).trim();
    if (response.ok && actual===sha) {
      const home=await fetch('https://aicreative-db.com/',{signal:AbortSignal.timeout(12000)});
      if (home.status===200) {valid=true; break;}
    }
  } catch(error) {console.log('Transient public verification error: '+error.name);}
  console.log('Latest release not yet confirmed; attempt '+(i+1));
  if (i<17) await delay(15000);
}
if (!valid) {console.error('FAIL: published commit not confirmed'); process.exitCode=1;}
else console.log('PASS: public SHA matches release and homepage HTTP 200');
