import React, { useState } from "react";

const gridStyle = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
  gap: "2rem",
  margin: "2rem 0"
};

const cardStyle = {
  background: "rgba(30,34,44,0.97)",
  borderRadius: "22px",
  boxShadow: "0 8px 32px 0 rgba(31, 38, 135, 0.18)",
  padding: "2rem",
  color: "#fff",
  marginBottom: "1.5rem"
};

const catalogueData = [
  {
    country: "France",
    attractions: [
      {
        name: "Eiffel Tower",
        image: "https://upload.wikimedia.org/wikipedia/commons/a/a8/Tour_Eiffel_Wikimedia_Commons.jpg"
      },
      {
        name: "Louvre Museum",
        image: "https://media.cntraveler.com/photos/57d961ce3e6b32bf25f5ad0f/16:9/w_960,c_limit/most-beautiful-paris-louvre-GettyImages-536267205.jpg"
      },
      {
        name: "Mont Saint-Michel",
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/78/Mont-Saint-Michel_vu_du_ciel.jpg/330px-Mont-Saint-Michel_vu_du_ciel.jpg"
      }
    ]
  },
  {
    country: "Japan",
    attractions: [
      {
        name: "Mount Fuji",
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f8/View_of_Mount_Fuji_from_%C5%8Cwakudani_20211202.jpg/500px-View_of_Mount_Fuji_from_%C5%8Cwakudani_20211202.jpg"
      },
      {
        name: "Tokyo Tower",
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/58/Tokyo_Tower_2023.jpg/500px-Tokyo_Tower_2023.jpg"
      },
      {
        name: "Fushimi Inari Shrine",
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/0e/Torii_path_with_lantern_at_Fushimi_Inari_Taisha_Shrine%2C_Kyoto%2C_Japan.jpg/500px-Torii_path_with_lantern_at_Fushimi_Inari_Taisha_Shrine%2C_Kyoto%2C_Japan.jpg"
      }
    ]
  },
  {
    country: "USA",
    attractions: [
      {
        name: "Statue of Liberty",
        image: "https://upload.wikimedia.org/wikipedia/commons/a/a1/Statue_of_Liberty_7.jpg"
      },
      {
        name: "Grand Canyon",
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/31/Canyon_River_Tree_%28165872763%29.jpeg/500px-Canyon_River_Tree_%28165872763%29.jpeg"
      },
      {
        name: "Golden Gate Bridge",
        image: "https://upload.wikimedia.org/wikipedia/commons/0/0c/GoldenGateBridge-001.jpg"
      }
    ]
  },
  {
    country: "Italy",
    attractions: [
      {
        name: "Colosseum",
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/de/Colosseo_2020.jpg/500px-Colosseo_2020.jpg"
      },
      {
        name: "Venice Canals",
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/df/Santa_Maria_della_Salute_%2850428075772%29.jpg/500px-Santa_Maria_della_Salute_%2850428075772%29.jpg"
      },
      {
        name: "Leaning Tower of Pisa",
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4b/Italy_-_Pisa_-_Leaning_Tower.jpg/500px-Italy_-_Pisa_-_Leaning_Tower.jpg"
      }
    ]
  },
  {
    country: "Australia",
    attractions: [
      {
        name: "Sydney Opera House",
        image: "https://upload.wikimedia.org/wikipedia/commons/4/40/Sydney_Opera_House_Sails.jpg"
      },
      {
        name: "Great Barrier Reef",
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4f/ISS-45_StoryOfWater%2C_Great_Barrier_Reef%2C_Australia.jpg/500px-ISS-45_StoryOfWater%2C_Great_Barrier_Reef%2C_Australia.jpg"
      },
      {
        name: "Uluru",
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a8/ULURU.jpg/500px-ULURU.jpg"
      }
    ]
  },
  {
    country: "Brazil",
    attractions: [
      {
        name: "Christ the Redeemer",
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4f/Christ_the_Redeemer_-_Cristo_Redentor.jpg/500px-Christ_the_Redeemer_-_Cristo_Redentor.jpg"
      },
      {
        name: "Iguazu Falls",
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c4/Iguazu_Cataratas2.jpg/500px-Iguazu_Cataratas2.jpg"
      },
      {
        name: "Amazon Rainforest",
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/56/Amazon17_%285641020319%29.jpg/500px-Amazon17_%285641020319%29.jpg"
      }
    ]
  },
  {
    country: "United Kingdom",
    attractions: [
      {
        name: "Big Ben",
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/43/Elizabeth_Tower%2C_June_2022.jpg/500px-Elizabeth_Tower%2C_June_2022.jpg"
      },
      {
        name: "Tower of London",
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/ec/Tower_of_London_from_the_Shard_%288515883950%29.jpg/500px-Tower_of_London_from_the_Shard_%288515883950%29.jpg"
      },
      {
        name: "Stonehenge",
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3c/Stonehenge2007_07_30.jpg/500px-Stonehenge2007_07_30.jpg"
      }
    ]
  },
  {
    country: "Spain",
    attractions: [
      {
        name: "Sagrada Familia",
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5c/%CE%A3%CE%B1%CE%B3%CF%81%CE%AC%CE%B4%CE%B1_%CE%A6%CE%B1%CE%BC%CE%AF%CE%BB%CE%B9%CE%B1_2941_%28cropped%29.jpg/500px-%CE%A3%CE%B1%CE%B3%CF%81%CE%AC%CE%B4%CE%B1_%CE%A6%CE%B1%CE%BC%CE%AF%CE%BB%CE%B9%CE%B1_2941_%28cropped%29.jpg"
      },
      {
        name: "Park Güell",
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/33/Parc_guell_-_panoramio.jpg/500px-Parc_guell_-_panoramio.jpg"
      },
      {
        name: "Alhambra",
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/de/Dawn_Charles_V_Palace_Alhambra_Granada_Andalusia_Spain.jpg/500px-Dawn_Charles_V_Palace_Alhambra_Granada_Andalusia_Spain.jpg"
      }
    ]
  },
  {
    country: "Germany",
    attractions: [
      {
        name: "Brandenburg Gate",
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a6/Brandenburger_Tor_abends.jpg/500px-Brandenburger_Tor_abends.jpg"
      },
      {
        name: "Neuschwanstein Castle",
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f8/Schloss_Neuschwanstein_2013.jpg/500px-Schloss_Neuschwanstein_2013.jpg"
      },
      {
        name: "Cologne Cathedral",
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/04/K%C3%B6lner_Dom_-_Westfassade_2022_ohne_Ger%C3%BCst-0968_b.jpg/500px-K%C3%B6lner_Dom_-_Westfassade_2022_ohne_Ger%C3%BCst-0968_b.jpg"
      }
    ]
  },
  {
    country: "Canada",
    attractions: [
      {
        name: "Niagara Falls",
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/ab/3Falls_Niagara.jpg/500px-3Falls_Niagara.jpg"
      },
      {
        name: "CN Tower",
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/96/Toronto_-_ON_-_Toronto_Harbourfront7.jpg/500px-Toronto_-_ON_-_Toronto_Harbourfront7.jpg"
      },
      {
        name: "Banff National Park",
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c5/Moraine_Lake_17092005.jpg/500px-Moraine_Lake_17092005.jpg"
      }
    ]
  },
  {
    country: "China",
    attractions: [
      {
        name: "Great Wall of China",
        image: "https://upload.wikimedia.org/wikipedia/commons/1/10/20090529_Great_Wall_8185.jpg"
      },
      {
        name: "Forbidden City",
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/ef/The_Forbidden_City_-_View_from_Coal_Hill.jpg/500px-The_Forbidden_City_-_View_from_Coal_Hill.jpg"
      },
      {
        name: "Terracotta Army",
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/88/51714-Terracota-Army.jpg/500px-51714-Terracota-Army.jpg"
      }
    ]
  },
  {
    country: "India",
    attractions: [
      {
        name: "Taj Mahal",
        image: "https://upload.wikimedia.org/wikipedia/commons/d/da/Taj-Mahal.jpg"
      },
      {
        name: "Gateway of India",
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3a/Mumbai_03-2016_30_Gateway_of_India.jpg/500px-Mumbai_03-2016_30_Gateway_of_India.jpg"
      },
      {
        name: "Qutub Minar",
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3c/Qutb_Minar_2022.jpg/330px-Qutb_Minar_2022.jpg"
      }
    ]
  },
  {
    country: "Russia",
    attractions: [
      {
        name: "Red Square",
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/01/Moscow_July_2011-16.jpg/500px-Moscow_July_2011-16.jpg"
      },
      {
        name: "Saint Basil's Cathedral",
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/18/Saint_Basil%27s_Cathedral_in_Moscow.jpg/500px-Saint_Basil%27s_Cathedral_in_Moscow.jpg"
      },
      {
        name: "Lake Baikal",
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6a/Baikal.A2001296.0420.250m-NASA.jpg/500px-Baikal.A2001296.0420.250m-NASA.jpg"
      }
    ]
  },
  {
    country: "Turkey",
    attractions: [
      {
        name: "Hagia Sophia",
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/22/Hagia_Sophia_Mars_2013.jpg/500px-Hagia_Sophia_Mars_2013.jpg"
      },
      {
        name: "Blue Mosque",
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/03/Istanbul_%2834223582516%29_%28cropped%29.jpg/500px-Istanbul_%2834223582516%29_%28cropped%29.jpg"
      },
      {
        name: "Cappadocia",
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/31/Cappadocia_Aerial_View_%286998755984%29.jpg/330px-Cappadocia_Aerial_View_%286998755984%29.jpg"
      }
    ]
  },
  {
    country: "Thailand",
    attractions: [
      {
        name: "Grand Palace",
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c7/0005574_-_Wat_Phra_Kaew_006.jpg/500px-0005574_-_Wat_Phra_Kaew_006.jpg"
      },
      {
        name: "Phi Phi Islands",
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e7/KohPhiPhi.JPG/500px-KohPhiPhi.JPG"
      },
      {
        name: "Wat Arun",
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/%E0%B9%80%E0%B8%88%E0%B8%94%E0%B8%B5%E0%B8%A2%E0%B9%8C%E0%B8%9B%E0%B8%A3%E0%B8%B0%E0%B8%98%E0%B8%B2%E0%B8%99%E0%B8%97%E0%B8%A3%E0%B8%87%E0%B8%9B%E0%B8%A3%E0%B8%B2%E0%B8%87%E0%B8%84%E0%B9%8C%E0%B8%A7%E0%B8%B1%E0%B8%94%E0%B8%AD%E0%B8%A3%E0%B8%B8%E0%B8%932.jpg/500px-%E0%B9%80%E0%B8%88%E0%B8%94%E0%B8%B5%E0%B8%A2%E0%B9%8C%E0%B8%9B%E0%B8%A3%E0%B8%B0%E0%B8%98%E0%B8%B2%E0%B8%99%E0%B8%97%E0%B8%A3%E0%B8%87%E0%B8%9B%E0%B8%A3%E0%B8%B2%E0%B8%87%E0%B8%84%E0%B9%8C%E0%B8%A7%E0%B8%B1%E0%B8%94%E0%B8%AD%E0%B8%A3%E0%B8%B8%E0%B8%932.jpg"
      }
    ]
  },
  {
    country: "Egypt",
    attractions: [
      {
        name: "Pyramids of Giza",
        image: "https://upload.wikimedia.org/wikipedia/commons/e/e3/Kheops-Pyramid.jpg"
      },
      {
        name: "Karnak Temple",
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/60/Temple_de_Louxor_68.jpg/500px-Temple_de_Louxor_68.jpg"
      },
      {
        name: "Valley of the Kings",
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/0c/Luxor%2C_Tal_der_K%C3%B6nige_%281995%2C_860x605%29.jpg/500px-Luxor%2C_Tal_der_K%C3%B6nige_%281995%2C_860x605%29.jpg"
      }
    ]
  },
  {
    country: "South Africa",
    attractions: [
      {
        name: "Table Mountain",
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/dc/Table_Mountain_DanieVDM.jpg/500px-Table_Mountain_DanieVDM.jpg"
      },
      {
        name: "Kruger National Park",
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f0/Kruger_Zebra.JPG/500px-Kruger_Zebra.JPG"
      },
      {
        name: "Cape of Good Hope",
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e7/Playa_Dias%2C_Cape_Point%2C_Sud%C3%A1frica%2C_2018-07-23%2C_DD_103.jpg/960px-Playa_Dias%2C_Cape_Point%2C_Sud%C3%A1frica%2C_2018-07-23%2C_DD_103.jpg"
      }
    ]
  },
  {
    country: "Greece",
    attractions: [
      {
        name: "Acropolis of Athens",
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e6/Classic_view_of_Acropolis.jpg/500px-Classic_view_of_Acropolis.jpg"
      },
      {
        name: "Santorini",
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/37/Oia_sunset_-_panoramio_%282%29.jpg/500px-Oia_sunset_-_panoramio_%282%29.jpg"
      },
      {
        name: "Meteora",
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/7c/Meteora%27s_monastery_2.jpg/500px-Meteora%27s_monastery_2.jpg"
      }
    ]
  },
  {
    country: "Switzerland",
    attractions: [
      {
        name: "Matterhorn",
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/60/Matterhorn_from_Domh%C3%BCtte_-_2.jpg/500px-Matterhorn_from_Domh%C3%BCtte_-_2.jpg"
      },
      {
        name: "Lake Geneva",
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1b/Lake_Geneva_by_Sentinel-2.jpg/500px-Lake_Geneva_by_Sentinel-2.jpg "
      },
      {
        name: "Bern Old Town",
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d3/Bern_Panorama_von_Rosengarten_20211007.jpg/1280px-Bern_Panorama_von_Rosengarten_20211007.jpg"
      }
    ]
  }
];

export default function Catalogue() {
  const [modal, setModal] = useState({ open: false, image: "", caption: "" });

  const openModal = (image, caption) => setModal({ open: true, image, caption });
  const closeModal = () => setModal({ open: false, image: "", caption: "" });

  return (
    <div style={{ minHeight: "100vh", padding: "2rem" }}>
      <h2 style={{
        color: "#a991f7",
        fontWeight: 800,
        fontSize: "2.2rem",
        textAlign: "center",
        marginBottom: "2rem"
      }}>
        🌍 Explore Destinations
      </h2>
      <div style={gridStyle}>
        {catalogueData.map(country => (
          <div key={country.country} style={cardStyle}>
            <h3 style={{ color: "#6e7ff3", fontWeight: 700 }}>{country.country}</h3>
            <ul style={{ padding: 0, listStyle: "none" }}>
              {country.attractions.map(attr => (
                <li key={attr.name} style={{ margin: "1rem 0" }}>
                  <img
                    src={attr.image}
                    alt={attr.name}
                    style={{
                      width: "100%",
                      borderRadius: "12px",
                      boxShadow: "0 4px 16px rgba(31,38,135,0.18)",
                      marginBottom: "0.5rem",
                      cursor: "pointer"
                    }}
                    onClick={() => openModal(attr.image, attr.name)}
                  />
                  <div style={{ color: "#fff", fontWeight: 600 }}>{attr.name}</div>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      {modal.open && (
        <div style={styles.modal.overlay} onClick={closeModal}>
          <div
            style={styles.modal.content}
            onClick={e => e.stopPropagation()}
          >
            <img src={modal.image} alt={modal.caption} style={styles.modal.img} />
            <div style={styles.modal.caption}>{modal.caption}</div>
            <button style={styles.modal.closeBtn} onClick={closeModal}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
}

const styles = {
  modal: {
    overlay: {
      position: "fixed",
      top: 0, left: 0, right: 0, bottom: 0,
      background: "rgba(0,0,0,0.7)",
      zIndex: 1000,
      display: "flex",
      alignItems: "center",
      justifyContent: "center"
    },
    content: {
      background: "#232b3b",
      borderRadius: "18px",
      padding: "1.5rem",
      boxShadow: "0 8px 32px 0 rgba(31, 38, 135, 0.25)",
      maxWidth: "90vw",
      maxHeight: "90vh",
      display: "flex",
      flexDirection: "column",
      alignItems: "center"
    },
    img: {
      maxWidth: "80vw",
      maxHeight: "70vh",
      borderRadius: "12px",
      marginBottom: "1rem"
    },
    caption: {
      color: "#fff",
      fontWeight: 700,
      fontSize: "1.2rem",
      marginBottom: "0.5rem"
    },
    closeBtn: {
      marginTop: "1rem",
      background: "#a991f7",
      color: "#fff",
      border: "none",
      borderRadius: "8px",
      padding: "0.6rem 1.5rem",
      fontWeight: 700,
      fontSize: "1rem",
      cursor: "pointer"
    }
  }
};
