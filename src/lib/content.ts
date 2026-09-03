import roomCabana from "@/assets/room-cabana.jpg";
import roomDoble from "@/assets/room-doble.jpg";
import roomTriple from "@/assets/room-triple.jpg";
import atrNacimiento from "@/assets/atr-nacimiento.jpg";
import atrVado from "@/assets/atr-vado.jpg";
import atrHuahuas from "@/assets/atr-huahuas.jpg";
import atrLasPozas from "@/assets/atr-laspozas.jpg";
import atrCarrington from "@/assets/atr-carrington.jpg";
import atrBetoRamon from "@/assets/atr-betoramon.jpg";
import atrTambaque from "@/assets/atr-tambaque.jpg";
import atrGolondrinas from "@/assets/atr-golondrinas.jpg";
import atrPuenteAquismon from "@/assets/atr-puentedios-aquismon.jpg";
import atrTamasopo from "@/assets/atr-tamasopo.jpg";
import atrPuenteTamasopo from "@/assets/atr-puentedios-tamasopo.jpg";
import atrTamul from "@/assets/atr-tamul.jpg";

export type Lang = "es" | "en";

export type Slide = {
  image: string;
  title: string;
  badge?: string;
  description: string;
  alt: string;
  /** Valor CSS de object-position para acomodar la foto dentro del marco (p. ej. "center bottom"). */
  objectPosition?: string;
};

const roomImages = [roomCabana, roomDoble, roomTriple];

const nearImages = [
  atrNacimiento,
  atrVado,
  atrHuahuas,
  atrLasPozas,
  atrCarrington,
  atrBetoRamon,
];

const farImages = [
  atrTambaque,
  atrGolondrinas,
  atrPuenteAquismon,
  atrTamasopo,
  atrPuenteTamasopo,
  atrTamul,
];

// Acomodo de la foto dentro del marco del carrusel (object-position).
// Tambaque: la foto es vertical y el agua está abajo; se ancla a la parte baja.
const farPositions = ["center bottom"];

type Entry = { title: string; badge?: string; description: string; alt: string };

const withImages = (
  images: string[],
  entries: Entry[],
  positions: string[] = [],
): Slide[] =>
  entries.map((entry, i) => ({
    ...entry,
    image: images[i] ?? "",
    objectPosition: positions[i],
  }));


export const content = {
  es: {
    htmlLang: "es",
    nav: {
      home: "Inicio",
      rooms: "Habitaciones",
      attractions: "Atractivos",
      about: "Nosotros",
      contact: "Contacto",
      book: "Reservar",
      menu: "Abrir menú",
      close: "Cerrar menú",
      langLabel: "Cambiar a inglés",
    },
    hero: {
      eyebrow: "Huichihuayán, San Luis Potosí",
      title: "Quilas",
      subtitle:
        "Reconecta contigo y con la naturaleza, en el corazón de la Huasteca Potosina.",
      primary: "Reserva",
      secondary: "Ver atractivos cercanos",
      alt: "Cabañas de madera del hotel Quilas rodeadas de naturaleza al atardecer",
    },
    rooms: {
      eyebrow: "Dónde dormir",
      title: "Nuestras habitaciones",
      intro:
        "Espacios cómodos, rodeados de naturaleza, pensados para descansar de verdad.",
      slides: withImages(roomImages, [
        {
          title: "Cabaña",
          badge: "1 cama matrimonial",
          description: "Hasta 2 adultos y 1 menor de 12 años.",
          alt: "Interior de la cabaña con una cama matrimonial y vista a la selva",
        },
        {
          title: "Habitación Doble",
          badge: "2 camas matrimoniales",
          description: "Capacidad máxima para 4 personas.",
          alt: "Habitación doble con dos camas matrimoniales y techo de madera",
        },
        {
          title: "Habitación Triple",
          badge: "3 camas matrimoniales",
          description: "Capacidad máxima para 6 personas.",
          alt: "Habitación triple amplia con tres camas matrimoniales",
        },
      ]),
    },
    near: {
      eyebrow: "A menos de 35 minutos",
      title: "Lo que tienes a la vuelta",
      intro:
        "Estamos en el punto justo para salir temprano y regresar a descansar el mismo día.",
      slides: withImages(nearImages, [
        {
          title: "Río El Nacimiento",
          badge: "10 min",
          description:
            "Nacimiento de aguas cristalinas, ideal para el calor.",
          alt: "Río de aguas turquesa entre vegetación tropical",
        },
        {
          title: "Vado de Huichihuayán",
          badge: "10 min",
          description:
            "Río de fácil acceso, perfecta para un chapuzón rápido o andar en kayak.",
          alt: "Vado de río poco profundo con árboles en las orillas",
        },
        {
          title: "Sótano de las Huahuas, Aquismón",
          badge: "20 min",
          description:
            "Con 478 metros de profundidad, famosa por sus espectaculos de aves.",
          alt: "Boca de una caverna natural con aves volando al atardecer",
        },
        {
          title: "Las Pozas de Edward James, Xilitla",
          badge: "25 min",
          description:
            "Jardín escultórico evocando al jardin del Edén donde el surrealismo cobra vida entre cascadas y flores.",
          alt: "Escaleras y columnas surrealistas cubiertas de vegetación",
        },
        {
          title: "Museo Leonora Carrington, Xilitla",
          badge: "25 min",
          description:
            "Pinturas, esculturas y objetos que revelan su fascinación por lo surreal, mágico y simbólico.",
          alt: "Fachada colorida de museo con escultura en la entrada",
        },
        {
          title: 'Castillo de la Salud "Beto Ramón", Axtla',
          badge: "25 min",
          description:
            "Centro herbolario basado en relatos bíblicos como la Torre de Babel y el Arca de Noé.",
          alt: "Castillo colorido con naturaleza",
        },
      ]),
    },
    far: {
      eyebrow: "De 35 minutos a 1 h 40",
      title: "Un poco más lejos, pero vale la pena",
      intro:
        "Los grandes clásicos de la Huasteca, todos alcanzables en una excursión de un día.",
      cta: "Reserva y vive todo esto",
      slides: withImages(farImages, [
        {
          title: "Río Tambaque",
          badge: "40 min",
          description:
            "Río de aguas turquesa entre formaciones rocosas, perfecta para nadar y descansar.",
          alt: "Río turquesa entre grandes rocas",
        },
        {
          title: "Sótano de las Golondrinas, Aquismón",
          badge: "1 h",
          description:
            "Uno de los abismos naturales más profundos del mundo, hogar de miles de aves.",
          alt: "Vista aérea de un enorme abismo natural con aves saliendo",
        },
        {
          title: "Puente de Dios, Aquismón",
          badge: "1 h 30 min",
          description:
            "Formación natural con cascadas y pozas turquesa dentro de una cueva.",
          alt: "Pozas turquesa dentro de una cueva con haces de luz",
        },
        {
          title: "Cascadas de Tamasopo",
          badge: "1 h 30 min",
          description:
            "Serie de cascadas de agua naturales con sitios recreativos.",
          alt: "Cascadas cayendo sobre pozas naturales turquesa",
        },
        {
          title: "Puente de Dios, Tamasopo",
          badge: "1 h 35 min",
          description:
            "Cascadas y pozas de aguas rodeadas de vegetación exuberante.",
          alt: "Pozas turquesa con pasarela de madera y vegetación",
        },
        {
          title: "Cascada de Tamul",
          badge: "1 h 40 min",
          description:
            "La caída de agua más alta de la Huasteca, con recorrido en lancha.",
          alt: "Gran cascada vista desde una lancha en el río",
        },
      ]),
    },
    about: {
      eyebrow: "Sobre nosotros",
      title: "Un lugar para bajar el ritmo",
      body: [
        "En Quilas estamos rodeados de naturaleza para que nuestros huéspedes puedan conectar consigo mismos y con su entorno, salir de la rutina y encontrar paz.",
        "Y todo esto a poca distancia de los principales atractivos de la Huasteca Potosina: a 10 minutos del río El Nacimiento y del vado de Huichihuayán, en el punto central perfecto para recorrer la región.",
      ],
      alt: "Terraza de madera con hamacas rodeada de vegetación tropical",
      highlights: [
        "Rodeados de naturaleza",
        "Punto central de la Huasteca",
        "A 10 min del río",
      ],
    },
    contact: {
      eyebrow: "Contacto",
      title: "Escríbenos y te apartamos lugar",
      phone: "Teléfono",
      whatsapp: "WhatsApp",
      airbnb: "Reservar en Airbnb",
      facebook: "Facebook",
      address: "Dirección",
      directions: "Cómo llegar",
      openMaps: "Abrir en Google Maps",
      openWaze: "Abrir en Waze",
      call: "Llamar",
      mapTitle: "Mapa de la ubicación del hotel Quilas en Huichihuayán",
    },
    footer: {
      tagline: "Hotel en Huichihuayán, San Luis Potosí.",
      quickLinks: "Enlaces",
      rights: "Todos los derechos reservados.",
    },
    waMessage:
      "¡Hola! Me interesa reservar en Quilas. ¿Me pueden dar disponibilidad y precios?",
    waFab: "Escribir por WhatsApp",
    carousel: { prev: "Anterior", next: "Siguiente", goTo: "Ir a la foto" },
  },
  en: {
    htmlLang: "en",
    nav: {
      home: "Home",
      rooms: "Rooms",
      attractions: "Attractions",
      about: "About",
      contact: "Contact",
      book: "Book now",
      menu: "Open menu",
      close: "Close menu",
      langLabel: "Switch to Spanish",
    },
    hero: {
      eyebrow: "Huichihuayán, San Luis Potosí",
      title: "Quilas",
      subtitle:
        "Reconnect with yourself and with nature, in the heart of the Huasteca Potosina.",
      primary: "Book",
      secondary: "See nearby attractions",
      alt: "Wooden cabins of Quilas hotel surrounded by nature at sunset",
    },
    rooms: {
      eyebrow: "Where to sleep",
      title: "Our rooms",
      intro:
        "Comfortable spaces, surrounded by nature, made for real rest.",
      slides: withImages(roomImages, [
        {
          title: "Cabin",
          badge: "1 queen bed",
          description: "Up to 2 adults and 1 child under 12.",
          alt: "Cabin interior with one queen bed and jungle view",
        },
        {
          title: "Double Room",
          badge: "2 queen beds",
          description: "Maximum capacity for 4 guests.",
          alt: "Double room with two queen beds and wooden ceiling",
        },
        {
          title: "Triple Room",
          badge: "3 queen beds",
          description: "Maximum capacity for 6 guests.",
          alt: "Spacious triple room with three queen beds",
        },
      ]),
    },
    near: {
      eyebrow: "Under 35 minutes away",
      title: "Right around the corner",
      intro:
        "We're right at the sweet spot: leave early and come back to rest the same day.",
      slides: withImages(nearImages, [
        {
          title: "El Nacimiento River",
          badge: "10 min",
          description:
            "Crystal-clear spring water, ideal for the heat.",
          alt: "Turquoise river surrounded by tropical vegetation",
        },
        {
          title: "Huichihuayán Ford",
          badge: "10 min",
          description:
            "Easy-access river, perfect for a quick dip or kayaking.",
          alt: "Shallow river ford with trees along the banks",
        },
        {
          title: "Sótano de las Huahuas, Aquismón",
          badge: "20 min",
          description:
            "478 meters deep, famous for its displays of birds.",
          alt: "Mouth of a natural cavern with birds flying at sunset",
        },
        {
          title: "Las Pozas by Edward James, Xilitla",
          badge: "25 min",
          description:
            "A sculpture garden evoking the Garden of Eden, where surrealism comes to life among waterfalls and flowers.",
          alt: "Surrealist stairways and columns covered in vegetation",
        },
        {
          title: "Leonora Carrington Museum, Xilitla",
          badge: "25 min",
          description:
            "Paintings, sculptures and objects that reveal her fascination with the surreal, the magical and the symbolic.",
          alt: "Colorful museum facade with a sculpture at the entrance",
        },
        {
          title: '"Beto Ramón" Health Castle, Axtla',
          badge: "25 min",
          description:
            "An herbal-medicine center based on biblical tales such as the Tower of Babel and Noah's Ark.",
          alt: "Colorful castle surrounded by nature",
        },
      ]),
    },
    far: {
      eyebrow: "From 35 minutes to 1 h 40",
      title: "A bit farther, absolutely worth it",
      intro:
        "The great classics of the Huasteca, all reachable on a day trip.",
      cta: "Book now and live all of this",
      slides: withImages(farImages, [
        {
          title: "Tambaque River",
          badge: "40 min",
          description:
            "Turquoise river among rock formations, perfect for swimming and relaxing.",
          alt: "Turquoise river between large rocks",
        },
        {
          title: "Sótano de las Golondrinas, Aquismón",
          badge: "1 h",
          description:
            "One of the deepest natural abysses in the world, home to thousands of birds.",
          alt: "Aerial view of a huge natural pit with birds flying out",
        },
        {
          title: "Puente de Dios, Aquismón",
          badge: "1 h 30 min",
          description:
            "Natural formation with waterfalls and turquoise pools inside a cave.",
          alt: "Turquoise pools inside a cave with light beams",
        },
        {
          title: "Tamasopo Waterfalls",
          badge: "1 h 30 min",
          description:
            "A series of natural waterfalls with recreational areas.",
          alt: "Waterfalls falling into turquoise natural pools",
        },
        {
          title: "Puente de Dios, Tamasopo",
          badge: "1 h 35 min",
          description:
            "Waterfalls and pools surrounded by lush vegetation.",
          alt: "Turquoise pools with a wooden walkway and vegetation",
        },
        {
          title: "Tamul Waterfall",
          badge: "1 h 40 min",
          description:
            "The tallest waterfall in the Huasteca, reached by a boat ride.",
          alt: "Large waterfall seen from a boat on the river",
        },
      ]),
    },
    about: {
      eyebrow: "About us",
      title: "A place to slow down",
      body: [
        "At Quilas we are surrounded by nature so our guests can connect with themselves and with their environment, step out of the routine and find peace.",
        "And all of it a short drive from the main attractions of the Huasteca Potosina: 10 minutes from the El Nacimiento river and the Huichihuayán ford, the perfect home base for exploring the region.",
      ],
      alt: "Wooden terrace with hammocks surrounded by tropical greenery",
      highlights: [
        "Surrounded by nature",
        "Central base in the Huasteca",
        "10 min from the river",
      ],
    },
    contact: {
      eyebrow: "Contact",
      title: "Message us and we'll hold your spot",
      phone: "Phone",
      whatsapp: "WhatsApp",
      airbnb: "Book on Airbnb",
      facebook: "Facebook",
      address: "Address",
      directions: "Get directions",
      openMaps: "Open in Google Maps",
      openWaze: "Open in Waze",
      call: "Call",
      mapTitle: "Map showing Quilas hotel location in Huichihuayán",
    },
    footer: {
      tagline: "Hotel in Huichihuayán, San Luis Potosí.",
      quickLinks: "Links",
      rights: "All rights reserved.",
    },
    waMessage:
      "Hi! I'd like to book a stay at Quilas. Could you share availability and rates?",
    waFab: "Chat on WhatsApp",
    carousel: { prev: "Previous", next: "Next", goTo: "Go to photo" },
  },
} as const;

export type Content = (typeof content)[Lang];
