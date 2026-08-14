let map, marker;
function initMap(){ map=L.map('map').setView([41.0082,28.9784],10); L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',{attribution:'© OpenStreetMap katkıcıları'}).addTo(map); }
function analyze(){
 const d=document.getElementById('district').value,n=document.getElementById('neighborhood').value||'—',b=document.getElementById('block').value||'—',p=document.getElementById('parcel').value||'—';
 // Demo dataset: real TKGM/belediye connectors will replace these values.
 const demo={area:600,taks:.30,emsal:1.50,floors:5,func:'Konut Alanı',order:'Ayrık Nizam'};
 const emsal=demo.area*demo.emsal, taban=demo.area*demo.taks;
 document.getElementById('loc').textContent=d+' / '+n;
 document.getElementById('ap').textContent=b+' / '+p;
 document.getElementById('area').textContent=demo.area.toLocaleString('tr-TR')+' m²';
 document.getElementById('zoning').innerHTML=`<p><b>Fonksiyon:</b> ${demo.func}</p><p><b>Nizam:</b> ${demo.order}</p><p><b>TAKS:</b> ${demo.taks}</p><p><b>Emsal/KAKS:</b> ${demo.emsal}</p><p><b>Kat:</b> ${demo.floors}</p><p><b>Teorik taban:</b> ${taban} m²</p><p><b>Emsale esas teorik alan:</b> ${emsal} m²</p>`;
 const sizes=[70,80,90,100,110,120];
 document.getElementById('scenarios').innerHTML=sizes.map(s=>`<tr><td>${s<=80?'1+1 / küçük':s<=100?'2+1':'3+1'}</td><td>${s} m²</td><td><b>${Math.floor(emsal/s)}</b></td></tr>`).join('');
 document.getElementById('calc').innerHTML=`<p><b>Teorik emsale esas alan:</b> ${emsal.toLocaleString('tr-TR')} m²</p><p><b>Teorik taban alanı:</b> ${taban.toLocaleString('tr-TR')} m²</p><p class="ok">Sonraki sürüm: gerçek parsel + belediye e-imar + plan notu + bölgesel m² verisi bağlantıları.</p>`;
 document.getElementById('src-tkgm').textContent='Gerçek servis bağlantısı bekliyor';
document.getElementById('src-ibb').textContent='İBB plan kaynağı hazır, parsel eşleştirme bekliyor';
document.getElementById('src-bel').textContent=d+' Belediyesi kaynağı eşleştirme bekliyor';
document.getElementById('result').classList.remove('hidden'); if(!map){initMap();} setTimeout(()=>map.invalidateSize(),100);
}
if('serviceWorker' in navigator) navigator.serviceWorker.register('sw.js');

function runFinance(){
 const emsal=600*1.5;
 const land=Number(document.getElementById('landPrice').value)||0;
 const build=Number(document.getElementById('buildCost').value)||0;
 const sale=Number(document.getElementById('salePrice').value)||0;
 const buildTotal=emsal*build, revenue=emsal*sale, profit=revenue-buildTotal-land;
 document.getElementById('finance').innerHTML=`<hr><p><b>Teorik proje alanı:</b> ${emsal.toLocaleString('tr-TR')} m²</p>
 <p><b>Tahmini inşaat:</b> ${buildTotal.toLocaleString('tr-TR')} TL</p>
 <p><b>Tahmini satış geliri:</b> ${revenue.toLocaleString('tr-TR')} TL</p>
 <p><b>Arsa + inşaat sonrası fark:</b> <strong>${profit.toLocaleString('tr-TR')} TL</strong></p>
 <p class="warning">Bu finans hesabı yalnızca girilen varsayımlarla yapılır; finansman, vergi, ruhsat/proje, ortak alan, satış giderleri ve plan kaynaklı alan kayıpları ayrıca eklenmelidir.</p>`;
}
