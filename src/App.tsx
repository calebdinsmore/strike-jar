import "./App.css";
import { StrikeJar } from "./StrikeJar";

const OUT_OF_POCKET_DATE = new Date("06/20/2023");
const STRIKES = 16;

function App() {
  const daysSince = Math.floor(
    (new Date().getTime() - OUT_OF_POCKET_DATE.getTime()) / (1000 * 3600 * 24)
  );
  return (
    <div className="App">
      <h1 className="text-7xl font-extrabold p-5">Reena's Strike Jar</h1>
      <section className="flex justify-center items-center">
        <StrikeJar strikes={STRIKES} />
      </section>
      <section className="p-3">
        <h2 className="flex flex-col sm:flex-row text-3xl font-bold justify-center items-center gap-2">
          Days since Reena was last deeply out of pocket:
          <span className="text-7xl font-extrabold">{daysSince}</span>
        </h2>
      </section>
      <section className="p-3">
        <h2 className="text-5xl font-bold flex justify-center items-center gap-2">
          Strikes:
          <span className="text-7xl font-extrabold">{STRIKES}</span>
        </h2>
      </section>
    </div>
  );
}

export default App;
