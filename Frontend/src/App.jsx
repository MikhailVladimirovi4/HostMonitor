import Header from "./components/headers/header";
import Table from "./components/tables/table";
import ToolsBar from "./components/headers/toolsBar";

export default function App() {
  return (
    <>
      <div>
        <Header />
        <main>
          <ToolsBar />
          <Table />
        </main>
        <footer className="footer">Автор: Михаил Владимирович Бибиков</footer>
      </div>
    </>
  );
}
