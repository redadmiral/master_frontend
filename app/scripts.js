console.log("load JS.")

var endpoint = "http://master.marco-lehner.de:8000"


function link_entities() {
  input = document.getElementById("input-area").value

  postData(endpoint, { document: input })
    .then(data => {
      console.log(data); // JSON data parsed by `data.json()` call

      output = document.getElementById('output')
      output.innerHTML = data.content.highlightEntities(data)
    });

}

// Example POST method implementation:
async function postData(url = '', data = {}) {
  // Default options are marked with *
  const response = await fetch(url, {
    method: 'POST', // *GET, POST, PUT, DELETE, etc.
    mode: 'cors', // no-cors, *cors, same-origin
    cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
    credentials: 'same-origin', // include, *same-origin, omit
    headers: {
      'Content-Type': 'application/json'
      // 'Content-Type': 'application/x-www-form-urlencoded',
    },
    redirect: 'follow', // manual, *follow, error
    referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
    body: JSON.stringify(data) // body data type must match "Content-Type" header
  });
  return response.json(); // parses JSON response into native JavaScript objects
}

String.prototype.highlightEntities = function (data) {

  content = this

  for (var i = data.named_entities.length-1; i >= 0; i--) {
    start = data.named_entities[i].start_char
    end = data.named_entities[i].end_char
    type = data.named_entities[i].type

    try {
      id = data.named_entities[i].best_candidate.uri
      label = data.named_entities[i].best_candidate.label
      score = data.named_entities[i].best_candidate.local_score
    } catch (error) {
      if (error instanceof TypeError) {
      id = "NIL"
      label = "NIL"
      score = "0"
    } else if (error instanceof NetworkError) {
      console.log("siens")
    }
  }

    tooltiptext = createTooltip(id, type, label, score)
    bg_color = backgroundColor(type)

    content =  content.substr(0, end) + '</span>' + content.substr(end);
    content =  content.substr(0, start) + '<span class="tooltip" style="background-color:' + bg_color + '" id="' + id + '" >' + tooltiptext + content.substr(start);
  }

  return content
};

function createTooltip(id, type, label, probability) {

  id_short = id.split("/").slice(-1)[0]

  return `
  <span class="tooltiptext">
  <div class="tooltipwrapper">
    <h3 class="tooltip_header">` + label + `</h3>
    <ul>
      <li>id: <a href="`+ id +`" target="_blank"> ` + id_short + `</a></li>
      <li>type: ` + type + `</li>
      <li>score: ` + score + `</li>
    </ul>
    </div>
  </span>
  `
}

function backgroundColor(type) {
  switch (type) {
    case "PER":
      return "gold"
    case "MISC":
      return "lightgreen"
    case "LOC":
      return "lightblue"
    case "ORG":
      return "coral"
    default:
      return "yellow"
  }
}

function dismiss() {
  elem = document.getElementById('disclaimer')
  elem.parentNode.removeChild(disclaimer)
  console.log("meh")
}

function insert_example(markus) {
  switch (markus) {
    case "jurist":
      example = "Markus Müller absolvierte sein Studium der Rechtswissenschaften an der Universität Bern 1987 mit dem Lizenziat. 1991 dissertierte er zum Thema „Zwangsmassnahmen als Instrument der Krankheitsbekämpfung – das Epidemiengesetz und die persönliche Freiheit“. 1992 erhielt er das Luzernische Anwaltspatent. Von 1993 bis 2004 war er stellvertretender Generalsekretär der Justiz-, Gemeinde- und Kirchendirektion des Kanton Bern. 2003 habilitierte er zum Thema „Das besondere Rechtsverhältnis – ein altes Rechtsinstitut neu gedacht“ und wurde 2004 Ordinarius für Staats- und Verwaltungsrecht an der Universität Bern. Müller ist zudem einer von 27 Erstunterzeichnern des Zürcher Appell, der sich gegen ein wirtschaftlich interessiertes Sponsoring von Forschung durch Unternehmen einsetzt."
      break;
    case "fussballer":
      example = "Vermutlich eine der spektakulärsten Spieler-Verpflichtung in der Vereinsgeschichte konnte vor einigen Tagen der TSV Wachtendonk- Wankum verkünden. Sein Name: Markus Müller. Der 31- jährige Linksfuß wechselte vom FC Gießen aus der Hessenliga an den Niederrhein in die Bezirksliga. Müller wuchs in Eberswalde/Brandenburg auf, spielte unter anderem in der 2. Liga für Erzgebirge Aue, für den SC Babelsberg in der 3. Liga und in der Regionalliga bei Wormatia Worms und Kickers Offenbach."
      break;
    case "mediziner":
      example = "Markus Müller maturierte 1985 am Theresianum in Wien und begann danach mit dem Studium der Humanmedizin an der Medizinischen Fakultät der Universität Wien. 1993 promovierte er „sub auspiciis praesidentis“ zum Doktor der gesamten Heilkunde. Zwischen 1993 und 2000 erfolgte seine Ausbildung zum Facharzt für Innere Medizin an den Universitätskliniken für Notfallmedizin und Innere Medizin I-III am Allgemeinen Krankenhaus Wien (AKH). 1995 absolvierte er einen Forschungsaufenthalt am Laboratory for Diabetes Research in Göteborg, Schweden zur Entwicklung der Mikrodialyse in der klinischen Forschung. 2000–2001 war er als Gastprofessor an der University of Florida tätig. 2004 wurde er zum Universitätsprofessor und Leiter der Universitätsklinik für Klinische Pharmakologie an der Medizinischen Universität Wien am AKH Wien ernannt. Markus Müller hat etwa 200 wissenschaftliche Publikationen veröffentlicht, unter anderem im New England Journal of Medicine."
      break;
    case "schauspieler":
      example = "Markus Müller studierte Betriebswirtschaftslehre, Theaterwissenschaften, Germanistik und Philosophie in Bamberg, Erlangen und Mannheim. Während seines Studiums arbeitete er am Bamberger E.T.A.-Hoffmann-Theater als Regieassistent, Mitarbeiter in der Öffentlichkeitsarbeit und ab 1995 als Schauspieler und Regisseur. Von 1997 bis 2001 war Müller persönlicher Referent des Generalintendanten Ulrich Schwab am Nationaltheater Mannheim und von 2001 bis 2005 stellvertretender Generalintendant. Darüber hinaus arbeitete er als künstlerischer Leiter verschiedener Festivals und Theaterprojekte."
      break;
    }
    textarea = document.getElementById("input-area")
    textarea.value = example
    }

function expand() {
  // I know that's not how it's done properly. Sry.
  code = `
        <p>
        This early version has various known issues, mainly:

        <ul>
          <li>No support of fuzzy search.</li>
          <li>Long runtime due to missing parallelization of queries.</li>
          <li>Output is not deterministic.</li>
          <li>Surnames coreferencing named persons are not resolved.</li>
        </ul>
        </p>

        <p>If you experience any other problem don't hesitate to open an <a href="https://github.com/redadmiral/entity_linking">Issue on github.</a></p>
        <p>And just in case you're wondering about the name: The idea of this thesis is from a colleague named Alberto Parravicini. He has a name twin who predicted the first living being in orbit would be a dog. That's the point where I started to associate freely and extended the naming convention of mediocre Indie bands to experimental software.</p>

        <p class="dismiss">
        <a href="#" onclick="dismiss()">[dismiss]</a>

        </p>
      `
    box = document.getElementById("warning")
    box.innerHTML = code

}

function examples() {
  code = `
  <p>There are many Markus Müllers in the world. Each button inserts an example text about a different Müller with a different occupation in the linking window above. The First Dog In Space will try it's best to distinguish those Müllers.</p>
  <div class="button-wrapper">

  <button type="button" name="link" onclick="insert_example('mediziner')">M.D.</button>
  <button type="button" name="link" onclick="insert_example('jurist')">Lawyer</button>
  <button type="button" name="link" onclick="insert_example('fussballer')">Football Player</button>
  <button type="button" name="link" onclick="insert_example('schauspieler')">Actor</button>
`
  examples = document.getElementById("examples")
  examples.innerHTML = code

}
