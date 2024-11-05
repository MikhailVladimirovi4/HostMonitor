import Header from "./components/headers/header";
import Table from "./components/tables/table";

export default function Dashboard({ role, token }) {
  return (
    <>
      <div>
        <Header />
        <main className="main">
          <Table token={token} role={role}/>
        </main>
        {/* <footer className="footer">Автор: Михаил Владимирович Бибиков</footer> */}
      </div>
    </>
  );
}
