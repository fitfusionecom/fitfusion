import { GiPlantSeed } from "react-icons/gi";
import { MdNoFood } from "react-icons/md";
import { MdScience } from "react-icons/md";
import { GiRibbonMedal } from "react-icons/gi";
import { FaLeaf } from "react-icons/fa";

const PRODUCT_FEATURES = [
  {
    icon: <GiPlantSeed size={32} color="#4CAF50" />,
    title: "100% Vegetarian",
  },
  {
    icon: <MdNoFood size={32} color="#FF9800" />,
    title: "No Gelatin",
  },
  {
    icon: <MdScience size={32} color="#2196F3" />,
    title: "Scientifically Tested",
  },
  {
    icon: <GiRibbonMedal size={32} color="#FFD700" />,
    title: "Best Quality",
  },
  {
    icon: <FaLeaf size={32} color="#43A047" />,
    title: "Natural and Safe",
  },
];

export default function ProductFeature() {
  return (
    <div
      className="product-features-list d-flex flex-wrap justify-content-between align-items-center"
      style={{
        background: "#f8f9fa",
        borderRadius: "16px",
        padding: "18px 18px 10px 18px",
        marginTop: "18px",
        marginBottom: "0",
        boxShadow: "0 2px 8px rgba(0,0,0,0.04)",
      }}
    >
      {PRODUCT_FEATURES.map((feature, idx) => (
        <div
          key={feature.title}
          className="d-flex flex-column align-items-center justify-content-center"
          style={{
            flex: "1 1 120px",
            minWidth: "110px",
            marginBottom: "8px",
            marginTop: "8px",
          }}
        >
          <div
            style={{
              background: "#fff",
              borderRadius: "50%",
              width: "48px",
              height: "48px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              marginBottom: "8px",
              boxShadow: "0 1px 4px rgba(0,0,0,0.07)",
            }}
          >
            {feature.icon}
          </div>
          <span
            style={{
              fontSize: "0.98rem",
              fontWeight: 500,
              color: "#222",
              textAlign: "center",
              lineHeight: 1.2,
            }}
          >
            {feature.title}
          </span>
        </div>
      ))}
    </div>
  );
}
