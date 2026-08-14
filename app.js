const API=localStorage.getItem('BELEDIYE_API')||'';
let current=null;
const officialLinks={
 Sancaktepe:'https://www.turkiye.gov.tr/sancaktepe-belediyesi-imar-durum-sorgulama'
};
function setStatus(text,cls=''){const e=document.getElementById('status');e.textContent=text;e.className=cls}
function openOfficial(){
 const d=document.getElementById('district').value;
 window.open(officialLinks[d]||'https://www.turkiye.gov.tr/arama?aranan=imar%20durum%20bilgisi%20sorgulama','_blank','noopener');
}
async function lookup(){
 const q={district:district.value,neighborhood:neighborhood.value.trim(),block:block.value.trim(),parcel:parcel.value.trim()};
 if(!q.neighborhood||!q.block||!q.parcel){setStatus('Mahalle, ada ve parsel zorunludur.','err');return}
 setStatus('Belediye veri bağlantısı kontrol ediliyor...');
 if(!API){
   setStatus('Otomatik belediye API bağlantısı yok. Gerçek veri uydurulmuyor. Resmî sorguyu açarak doğrulayabilirsiniz.','err');
   return;
 }
 try{
  const r=await fetch(API+'/api/municipality/zoning',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(q)});
  if(!r.ok) throw new Error('HTTP '+r.status);
  current=await r.json(); render(current); setStatus('Belediye verisi alındı.','ok');
 }catch(e){setStatus('Belediye verisi alınamadı: '+e.message,'err')}
}
function render(x){
 document.getElementById('result').classList.remove('hidden');
 const p=x.parcel||{},z=x.zoning||{};
 summary.innerHTML=`<p><b>${p.district||district.value} / ${p.neighborhood||neighborhood.value}</b></p>
 <p>Ada / Parsel: <b>${p.block||block.value} / ${p.parcel||parcel.value}</b></p>
 <p>Gerçek parsel alanı: <b>${p.area_m2??'Alınamadı'} m²</b></p>
 <div class="source">Kaynak: ${p.source||z.source||'Belediye'} | Kontrol: ${p.checked_at||'-'}</div>`;
 zoning.innerHTML=`<p>Fonksiyon: <b>${z.function||'Alınamadı'}</b></p>
 <p>Emsal/KAKS: <b>${z.emsal??'Alınamadı'}</b></p>
 <p>TAKS: <b>${z.taks??'Alınamadı'}</b></p>
 <p>Kat/Hmax: <b>${z.floors??'Alınamadı'} / ${z.hmax??'Alınamadı'}</b></p>
 <p>Nizam: <b>${z.order||'Alınamadı'}</b></p>
 <div class="source">Plan: ${z.plan_name||'-'} | Tarih: ${z.checked_at||'-'}</div>`;
 notes.innerHTML=(x.plan_notes||[]).map(n=>`<p>• ${n}</p>`).join('')||'<p class="warn">Plan notu alınamadı.</p>';
}
function calculate(){
 const a=Number(current?.parcel?.area_m2), e=Number(current?.zoning?.emsal), s=Number(aptSize.value)||90;
 if(!a||!e){calc.innerHTML='<p class="warn">Gerçek belediye parsel alanı ve emsal alınmadan daire hesabı yapılmaz.</p>';return}
 const total=a*e,n=Math.floor(total/s);
 const land=Number(landPrice.value)||0,costM=Number(buildCost.value)||0,saleM=Number(salePrice.value)||0;
 const cost=total*costM,revenue=total*saleM,profit=revenue-cost-land;
 calc.innerHTML=`<p>Emsale esas teorik alan: <b>${total.toLocaleString('tr-TR')} m²</b></p>
 <p>${s} m² ortalama daire: <b>${n} adet</b></p>
 <p>Tahmini inşaat: <b>${cost.toLocaleString('tr-TR')} TL</b></p>
 <p>Tahmini satış: <b>${revenue.toLocaleString('tr-TR')} TL</b></p>
 <p>Tahmini fark: <b>${profit.toLocaleString('tr-TR')} TL</b></p>
 <p class="warn">Ön fizibilitedir. Çekmeler, otopark, ortak alanlar, emsal dışı alanlar ve plan notları bağımsız bölüm sayısını değiştirebilir.</p>`;
}
