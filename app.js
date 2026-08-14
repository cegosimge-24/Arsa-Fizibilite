const CONFIG={API_BASE:localStorage.getItem('PARSEL_API_BASE')||''};
let current=null;
function setStatus(t,c=''){const e=document.getElementById('status');e.textContent=t;e.className=c}
async function lookup(){
 const q={district:district.value,neighborhood:neighborhood.value.trim(),block:block.value.trim(),parcel:parcel.value.trim()};
 if(!q.neighborhood||!q.block||!q.parcel){setStatus('Mahalle, ada ve parsel zorunlu.','err');return}
 setStatus('Resmî veri kaynağından sorgulanıyor...');
 document.getElementById('result').classList.add('hidden');
 if(!CONFIG.API_BASE){setStatus('Gerçek veri sunucusu henüz bağlanmadı. Demo veri kullanılmıyor. API adresini ayarlayın.','err');return}
 try{
  const r=await fetch(CONFIG.API_BASE+'/api/parcel/analyze',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(q)});
  if(!r.ok) throw new Error('Sunucu '+r.status);
  current=await r.json(); render(current); setStatus('Parsel bulundu ve analiz verileri alındı.','ok');
 }catch(e){setStatus('Gerçek veri alınamadı: '+e.message,'err')}
}
function render(x){
 document.getElementById('result').classList.remove('hidden');
 const p=x.parcel||{},z=x.zoning||{};
 document.getElementById('parcelData').innerHTML=`<p><b>${p.district||'-'} / ${p.neighborhood||'-'}</b></p><p>Ada / Parsel: <b>${p.block||'-'} / ${p.parcel||'-'}</b></p><p>Alan: <b>${p.area_m2??'-'} m²</b></p><div class="source">Kaynak: ${p.source||'-'} | Kontrol: ${p.checked_at||'-'}</div>`;
 document.getElementById('zoningData').innerHTML=`<p>Fonksiyon: <b>${z.function||'-'}</b></p><p>Emsal/KAKS: <b>${z.emsal??'-'}</b></p><p>TAKS: <b>${z.taks??'-'}</b></p><p>Kat/Hmax: <b>${z.floors??'-'} / ${z.hmax??'-'}</b></p><p>Nizam: <b>${z.order||'-'}</b></p><div class="source">Kaynak: ${z.source||'-'} | Plan: ${z.plan_name||'-'}</div>`;
 document.getElementById('notes').innerHTML=(x.plan_notes||[]).map(n=>`<p>${n}</p>`).join('')||'Plan notu alınamadı.';
}
function calculate(){
 if(!current?.parcel?.area_m2||current?.zoning?.emsal){document.getElementById('finance').innerHTML='<p class="warn">Gerçek parsel ve emsal verisi olmadan hesap yapılmaz.</p>';return}
 const a=Number(current.parcel.area_m2),e=Number(current.zoning.emsal),m=Number(apt.value)||90;
 const emsal=a*e,n=Math.floor(emsal/m),landv=Number(land.value)||0,costv=Number(cost.value)||0,salev=Number(sale.value)||0;
 const cost=emsal*costv,revenue=emsal*salev,profit=revenue-cost-landv;
 document.getElementById('finance').innerHTML=`<p>Emsale esas teorik alan: <b>${emsal.toLocaleString('tr-TR')} m²</b></p><p>${m} m² ortalama daire: <b>${n} adet</b> (ön fizibilite)</p><p>İnşaat: <b>${cost.toLocaleString('tr-TR')} TL</b></p><p>Satış: <b>${revenue.toLocaleString('tr-TR')} TL</b></p><p>Tahmini fark: <b>${profit.toLocaleString('tr-TR')} TL</b></p><p class="warn">Kesin bağımsız bölüm sayısı değildir; çekmeler, otopark, ortak alan, emsal dışı alanlar ve plan notları ayrıca uygulanmalıdır.</p>`;
}
