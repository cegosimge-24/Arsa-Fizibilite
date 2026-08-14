# Backend sözleşmesi

POST /api/municipality/zoning

İstek:
{
  "district":"Sancaktepe",
  "neighborhood":"Sarıgazi",
  "block":"702",
  "parcel":"1"
}

Yanıt:
{
  "parcel":{
    "district":"Sancaktepe",
    "neighborhood":"Sarıgazi",
    "block":"702",
    "parcel":"1",
    "area_m2":0,
    "source":"Sancaktepe Belediyesi E-İmar",
    "checked_at":"YYYY-MM-DD"
  },
  "zoning":{
    "function":"",
    "emsal":null,
    "taks":null,
    "floors":null,
    "hmax":null,
    "order":"",
    "plan_name":"",
    "source":"Sancaktepe Belediyesi",
    "checked_at":"YYYY-MM-DD"
  },
  "plan_notes":[]
}

Alan veya imar koşulu doğrulanamıyorsa null bırakılmalıdır; tahmini değer gönderilmemelidir.
