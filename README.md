# Parsel Fizibilite V8

Amaç: yalnızca ilçe belediyesi E-İmar ve belediyenin yayınladığı plan/plan notlarından veri alarak ön fizibilite.

İlk pilot:
Sancaktepe / Sarıgazi / 702 / 1

V8'de TKGM kullanılmaz ve demo m²/emsal kullanılmaz.

Gerçek otomatik sorgu için `localStorage.BELEDIYE_API` üzerinden bir backend gerekir:
POST /api/municipality/zoning

Backend belediyenin izin verdiği açık/resmî veri kaynağını kullanmalıdır. Kimlik doğrulamalı e-Devlet sayfalarının oturumu PWA tarafından taklit edilmez ve şifre istenmez.

Sancaktepe Belediyesi'nin resmi e-Devlet imar durum hizmeti:
https://webgis.sancaktepe.bel.tr/keos/?dsfilter=objectid=28472&tablename=nobetci_eczane.REHBER.nobetci_eczane&guestlogin=true
