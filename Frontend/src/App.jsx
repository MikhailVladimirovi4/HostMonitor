import Header from "./components/headers/header";
import Table from "./components/tables/table";
import ToolsBar from "./components/headers/toolsBar";
import './index.css'
export default function App() {
  return (
    <>
      <div>
        <Header />
        <main className="main">
          <ToolsBar />
          <Table />
        </main>
        <footer className="footer">Автор: Михаил Владимирович Бибиков</footer>
      </div>
    </>
  );
}
