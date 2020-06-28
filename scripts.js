console.log("load JS.")

var endpoint = "http://localhost:8000"

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

  for (var i = data.namedEntities.length-1; i >= 0; i--) {
    start = data.namedEntities[i].start_char
    end = data.namedEntities[i].end_char
    type = data.namedEntities[i].type

    try {
      id = data.namedEntities[i].best_candidate.uri
      label = data.namedEntities[i].best_candidate.label
      score = data.namedEntities[i].best_candidate.local_score
    } catch (TypeError) {
      id = "NIL"
      label = "NIL"
      score = "0"
    }

    tooltiptext = createTooltip(id, type, label, score)
    bg_color = backgroundColor(type)

    content =  content.substr(0, end) + '</span>' + content.substr(end);
    content =  content.substr(0, start) + '<span class="tooltip" style="background-color:' + bg_color + '" id="' + id + '" >' + tooltiptext + content.substr(start);
  }

  return content
};

function createTooltip(id, type, label, probability) {

  id_short = "wdt:" + id.split("/").slice(-1)[0]

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
