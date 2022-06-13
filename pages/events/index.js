import Card from "../../components/Card/Card";
import Form from "../../components/Form/Form";
import { useState } from "react";

export default function Events({ eventsList }) {
  const [filter, setFilter] = useState({ year: "", month: "" });


  return (
    <div className="container">
      <div className="container-input">
        <Form events={eventsList} updateFilter={setFilter} />
      </div>
      <div className="container-cards">
        {(filter.year !== "default" ||
        filter.month !== "default") && (filter.year !== "" ||
        filter.month !== "")
          ? eventsList
              .filter((event) => {
                if (
                  Object.values(filter).filter((val) => val !== "default")
                    .length === 2
                ) {
                  return (
                    event.date.split("-")[0] === filter.year &&
                    event.date.split("-")[1] === filter.month
                  );
                } else {
                  if (
                    Object.keys(filter).filter(
                      (key) => filter[key] !== "default"
                    )[0] === "year"
                  ) {
                    return event.date.split("-")[0] === filter.year;
                  }
                  return event.date.split("-")[1] === filter.month;
                }
              })
              .map((event) => (
                <Card
                  key={event.id}
                  event={event}
                  id={`card-${eventsList.indexOf(event)}`}
                />
              ))
          : eventsList.map((event) => (
              <Card
                key={event.id}
                event={event}
                id={`card-${eventsList.indexOf(event)}`}
              />
            ))}
      </div>
    </div>
  );
}

export async function getStaticProps() {
  const data = await import("/data/dummydata.json");
  const eventsList = data.events;

  return {
    props: {
      eventsList,
    },
  };
}
