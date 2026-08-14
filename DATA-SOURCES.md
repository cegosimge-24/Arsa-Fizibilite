# Veri Katmanı Planı

## 1) Kadastro / parsel
TKGM MEGSİS: parsel temel bilgileri ve geometri. WMS/WFS erişimi protokol/yetki koşullarına bağlıdır.

## 2) İstanbul imar
İBB İmar Planları ve Şehir Planlama uygulamaları: güncel/askıdaki planlar, plan geçmişi ve plan dokümanları.

## 3) İlçe belediyesi
Her ilçe için e-imar/plan-notu kaynağı ayrı adaptör olarak tutulacak.

## 4) Analiz motoru
Kaynak verisi -> normalize edilmiş zoning JSON -> plan-notu kuralları -> yapılaşma hesabı -> daire senaryosu -> fizibilite.

## Güvenilirlik
Her sonuç kaynağı ve tarihini taşıyacak. Parsel geometrisi ve imar kararı “ön fizibilite” olarak etiketlenecek; kesin koordinat/yapılaşma için yetkili kurum teyidi gerekecek.
