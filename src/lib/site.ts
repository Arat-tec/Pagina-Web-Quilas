/**
 * Datos de contacto del hotel.
 * TODO: reemplazar con la información real antes de publicar.
 */
export const site = {
  name: "Quilas",
  // Número en formato internacional sin signos, para el enlace de WhatsApp.
  whatsapp: "5214811234567",
  // Número para mostrar y para el enlace tel:
  phoneDisplay: "+52 481 123 4567",
  phoneHref: "+524811234567",
  facebook: "https://www.facebook.com/",
  addressLine: "Huichihuayán, Huehuetlán, San Luis Potosí, México",
  // Coordenadas aproximadas de Huichihuayán (ajustar a la ubicación exacta).
  lat: 21.4747,
  lng: -98.9422,
} as const;

export const whatsappUrl = (message: string) =>
  `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(message)}`;

export const googleMapsUrl = `https://www.google.com/maps/dir/?api=1&destination=${site.lat},${site.lng}`;

export const wazeUrl = `https://waze.com/ul?ll=${site.lat},${site.lng}&navigate=yes`;

export const mapEmbedUrl = `https://www.google.com/maps?q=${site.lat},${site.lng}&z=14&output=embed`;
