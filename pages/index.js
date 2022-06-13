import Card from "../components/Card/Card";


export default function Home({ eventsList }) {
  return (
    <div className="container">
      <div className="container-cards">
        <Card event={eventsList[1]} id="card-1"/>
        <Card event={eventsList[2]} id="card-2"/>
      </div>
    </div>
  );
}

export async function getStaticProps() {
  const data = await import("/data/dummydata.json");
  const eventsList = data.events;

  return {
    props: {
      eventsList
    }
  }
}