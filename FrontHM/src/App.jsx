import Header from './components/header/Header.jsx'
import Tools from './components/tools.jsx'
import Table from './components/table/table.jsx'
export default function App() {

  return (
    <>
      <div>
        <Header />
        <div>
          <Tools />
        </div>
        <main>
          <Table />
        </main>
        <footer className="footer">Автор: Михаил Владимирович Бибиков</footer>
      </div>
    </>
  );
}
