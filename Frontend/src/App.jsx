import Header from "./components/headers/header";
import ToolsBar from "./components/headers/toolsBar";
import Table from "./components/tables/table";

export default function App() {
  return (
    <>
      <div>
        <Header />
        <div>
          <ToolsBar />
        </div>
        <main>
          <Table />
        </main>
        <footer className="footer">Автор: Михаил Владимирович Бибиков</footer>
      </div>
    </>
  );
}
