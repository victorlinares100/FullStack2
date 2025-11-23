import "../../styles/organisms/fixedFooter.css";

export default function FixedFooter() {
  const year = new Date().getFullYear();
  return <footer className="footer-fixed">© {year} Aurea - Todos los derechos reservados</footer>;
}
