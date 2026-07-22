const publicationIndex = document.querySelector("#publication-index");
const publicationStatus = document.querySelector("#publication-status");
const publicationSearch = document.querySelector("#publication-search");
const publicationYear = document.querySelector("#publication-year");
const publicationCount = document.querySelector("#publication-count");
const publicationEntryCount = document.querySelector("#publication-entry-count");

const PREPRINT_VENUE_PATTERN =
  /\b(arxiv|biorxiv|medrxiv|chemrxiv|ssrn|research square|preprint|working paper|technical report|openreview)\b/i;

let publications = [];

function createTextElement(tag, className, value) {
  const element = document.createElement(tag);
  if (className) element.className = className;
  element.textContent = value;
  return element;
}

function renderPublications() {
  const query = publicationSearch.value.trim().toLowerCase();
  const year = publicationYear.value;

  const filtered = publications.filter((publication) => {
    const matchesYear = year === "all" || String(publication.year) === year;
    const haystack = `${publication.title} ${publication.authors} ${publication.venue}`.toLowerCase();
    return matchesYear && (!query || haystack.includes(query));
  });

  publicationIndex.replaceChildren();

  if (!filtered.length) {
    publicationStatus.textContent = "No publications match the current filters.";
    return;
  }

  publicationStatus.textContent = `${filtered.length} publication${filtered.length === 1 ? "" : "s"} shown.`;

  const groups = filtered.reduce((result, publication) => {
    if (!result.has(publication.year)) result.set(publication.year, []);
    result.get(publication.year).push(publication);
    return result;
  }, new Map());

  [...groups.entries()]
    .sort(([yearA], [yearB]) => yearB - yearA)
    .forEach(([groupYear, groupPublications]) => {
      const group = document.createElement("section");
      group.className = "publication-year-group";
      group.append(createTextElement("h3", "", String(groupYear)));

      const items = document.createElement("div");
      items.className = "publication-items";

      groupPublications
        .sort((paperA, paperB) => paperB.citations - paperA.citations)
        .forEach((publication) => {
          const item = document.createElement("article");
          item.className = "publication-item";

          const title = document.createElement("h4");
          const link = document.createElement("a");
          link.href = publication.scholar_url;
          link.textContent = publication.title;
          title.append(link);

          item.append(
            title,
            createTextElement("p", "authors", publication.authors),
            createTextElement("p", "venue", publication.venue)
          );
          items.append(item);
        });

      group.append(items);
      publicationIndex.append(group);
    });
}

async function loadPublications() {
  if (!publicationIndex) return;

  try {
    const response = await fetch("data/publications.json");
    if (!response.ok) throw new Error(`HTTP ${response.status}`);

    const data = await response.json();
    publications = data.publications.filter(
      (publication) => !PREPRINT_VENUE_PATTERN.test(publication.venue)
    );

    if (publicationCount) publicationCount.textContent = String(publications.length);
    if (publicationEntryCount) publicationEntryCount.textContent = String(publications.length);

    const years = [...new Set(publications.map((publication) => publication.year))].sort((a, b) => b - a);
    years.forEach((year) => {
      const option = document.createElement("option");
      option.value = String(year);
      option.textContent = String(year);
      publicationYear.append(option);
    });

    renderPublications();
  } catch (error) {
    publicationStatus.innerHTML =
      'The local publication index needs to be viewed through a static server. ' +
      '<a href="https://scholar.google.com/citations?user=CAAqkAIAAAAJ&amp;hl=en">Browse all publications on Google Scholar</a>.';
  }
}

publicationSearch?.addEventListener("input", renderPublications);
publicationYear?.addEventListener("change", renderPublications);

const yearElement = document.querySelector("#current-year");
if (yearElement) yearElement.textContent = String(new Date().getFullYear());

loadPublications();
