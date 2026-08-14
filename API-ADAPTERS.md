# Gerçek Veri Entegrasyonu

Uygulama üç ayrı adaptör kullanacak:

1. `TKGMAdapter`
   - İl / ilçe / mahalle / ada / parsel
   - Parsel alanı
   - Geometri
   - Servis erişimi yetkili/resmî yöntemle sağlanacak.

2. `IBBPlanAdapter`
   - Güncel nazım/uygulama planı
   - Plan adı/tarihi
   - Plan paftası
   - Plan açıklama raporu
   - Plan notları

3. `MunicipalityZoningAdapter`
   - İlçe belediyesi e-imar kaynağı
   - Emsal, TAKS, kat/Hmax, çekmeler
   - Parsel bazlı özel hükümler

Her kayıt `source` ve `checked_at` alanlarını taşıyacak. Veri bulunamazsa uygulama tahmin üretmek yerine “veri doğrulanamadı” gösterecek.
