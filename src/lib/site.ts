/**
 * Datos de contacto del hotel.
 * TODO: reemplazar con la información real antes de publicar.
 */
export const site = {
  name: "Quilas",
  // Número en formato internacional sin signos, para el enlace de WhatsApp.
  whatsapp: "5214833600114",
  // Número para mostrar y para el enlace tel:
  phoneDisplay: "+52 483 360 0114",
  phoneHref: "+524833600114",
  facebook: "https://m.me/lasquilashotel",
  addressLine: "Huichihuayán, Huehuetlán, San Luis Potosí, México",
  // Coordenadas aproximadas de Huichihuayán (ajustar a la ubicación exacta).
  lat: 21.466659837207434,
  lng: -98.96654519391727,
} as const;

export const whatsappUrl = (message: string) =>
  `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(message)}`;

export const googleMapsUrl = `https://www.google.com/maps/dir/?api=1&destination=${site.lat},${site.lng}`;

export const wazeUrl = `https://waze.com/ul?ll=${site.lat},${site.lng}&navigate=yes`;

export const mapEmbedUrl = `https://www.google.com/maps?q=${site.lat},${site.lng}&z=14&output=embed`;
