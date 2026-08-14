# V6 Gerçek Veri Sunucusu

Frontend artık demo veri üretmez. `PARSEL_API_BASE` ile bağlanan backend'in `POST /api/parcel/analyze` endpoint'inden gerçek veri bekler.

Örnek yanıt:
{
  "parcel":{"district":"Sancaktepe","neighborhood":"Sarıgazi","block":"702","parcel":"1","area_m2":0,"source":"TKGM","checked_at":"2026-08-15"},
  "zoning":{"function":"","emsal":null,"taks":null,"floors":null,"hmax":null,"order":"","source":"","plan_name":""},
  "plan_notes":[]
}

Backend, TKGM/MEGSİS ve ilgili belediye/İBB kaynaklarına uygun yetkili entegrasyon kullanmalıdır. Resmî servis erişimi yoksa veri uydurulmamalıdır.
