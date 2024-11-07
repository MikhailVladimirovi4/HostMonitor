import Header from "./components/headers/header";
import Table from "./components/tables/table";

export default function Dashboard({ user, role, token }) {
  return (
    <>
      <div>
        <Header user={user} />
        <main className="main">
          <Table token={token} role={role}/>
        </main>
        {/* <footer className="footer">Автор: Михаил Владимирович Бибиков</footer> */}
      </div>
    </>
  );
}
