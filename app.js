const API=localStorage.getItem('BELEDIYE_API')||'';
function msg(t,c=''){const e=document.getElementById('status');e.textContent=t;e.className=c}
async function analyze(){
 const q={district:district.value,neighborhood:neighborhood.value.trim(),block:block.value.trim(),parcel:parcel.value.trim()};
 msg('Belediye E-İmar kaynağı sorgulanıyor...');
 if(!API){msg('Bu deneme sürümünde gerçek belediye API adresi henüz tanımlı. Demo imar verisi kullanılmıyor.','err');return}
 try{const r=await fetch(API+'/api/municipality/zoning',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(q)});if(!r.ok)throw Error('HTTP '+r.status);const x=await r.json();render(x);msg('İmar verisi alındı.','ok')}catch(e){msg('Belediye verisi alınamadı: '+e.message,'err')}
}
function render(x){
 result.classList.remove('hidden');const z=x.zoning||{};
 zoning.innerHTML=`<p>Fonksiyon: <b>${z.function||'-'}</b></p><p>Emsal/KAKS: <b>${z.emsal??'-'}</b></p><p>TAKS: <b>${z.taks??'-'}</b></p><p>Kat/Hmax: <b>${z.floors??'-'} / ${z.hmax??'-'}</b></p><p>Nizam: <b>${z.order||'-'}</b></p><div class="source">Kaynak: ${z.source||'-'} | Plan: ${z.plan_name||'-'} | Tarih: ${z.checked_at||'-'}</div>`;
 notes.innerHTML=(x.plan_notes||[]).map(n=>`<p>• ${n}</p>`).join('')||'<p class="warn">Plan notu alınamadı.</p>';
 area.value=x.parcel?.area_m2||''; emsal.value=z.emsal??'';
}
function calc(){
 const a=Number(area.value),e=Number(emsal.value),s=Number(size.value)||90;
 if(!a||!e){calc.innerHTML='<p class="warn">Gerçek belediye verisi olan parsel alanı ve emsal girilmeden hesap yapılmaz.</p>';return}
 const total=a*e,n=Math.floor(total/s);
 calc.innerHTML=`<p>Emsale esas teorik alan: <b>${total.toLocaleString('tr-TR')} m²</b></p><p>${s} m² ortalama brüt daire: <b>${n} adet</b></p><p class="warn">Bu ön fizibilitedir. Plan notları, çekmeler, otopark, ortak alanlar ve mimari proje ayrıca değerlendirilmelidir.</p>`;
}
