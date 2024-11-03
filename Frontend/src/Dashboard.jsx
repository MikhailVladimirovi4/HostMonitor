import Header from "./components/headers/header";
import Table from "./components/tables/table";

export default function Dashboard() {
  return (
    <>
      <div>
        <Header />
        <main className="main">
          <Table />
        </main>
        <footer className="footer">Автор: Михаил Владимирович Бибиков</footer>
      </div>
    </>
  );
}
