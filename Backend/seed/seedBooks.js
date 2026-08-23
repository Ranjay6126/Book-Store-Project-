import mongoose from "mongoose";
import { mongoDBURL } from "../config.js";
import { Book } from "../models/BookModel.js";
import { makeCover } from "./covers.js";

const page = (one, two, three) => [
  `${one}\n\nThe opening pages introduce the setting, the central question, and a character facing a choice that cannot be ignored.`,
  `${two}\n\nAs the stakes rise, the clues and relationships become more complicated, drawing the reader deeper into the world of the story.`,
  `${three}\n\nThis preview ends at a turning point, leaving the full journey, its consequences, and its final answer waiting inside the book.`,
].join("\n---PAGE---\n");

const library = [
  ["The Lantern Keeper", "Mira Sen", 2024, "Literary Mystery", ["#172554", "#7c2d12"], "glass", "On a storm-struck coast, a reluctant keeper follows a light that has no business shining.", page("When Leela takes the post at Aster Point, she expects rust, salt, and empty evenings. Instead, the old lantern begins to blink in a pattern that matches dates in the town's missing-person ledger.", "A fisherman tells her the lighthouse was built to guide ships, but Leela suspects it was built to remember them. Each clue draws her through tide pools, attic maps, and a century-old promise.", "On the longest night of winter, Leela must decide whether to expose the town's cherished lie or keep the lantern burning for someone who may still be at sea.")],
  ["Paper Moons", "Arun Vale", 2023, "Magical Realism", ["#581c87", "#be185d"], "floral", "A bookstore apprentice discovers that moonlit margins can rewrite one small regret.", page("Niko repairs damaged books in a shop that opens only after sunset. One evening, a customer returns a novel with a silver moon pencilled beside a sentence about goodbye.", "When Niko touches the mark, he wakes inside a memory he thought he had lost. He can change one detail—but every alteration leaves a new blank page in his real life.", "To save his sister from a choice she has not made yet, Niko must learn whether a perfect past is worth a future with no surprises.")],
  ["The Quiet Algorithm", "Elena Brooks", 2025, "Tech Thriller", ["#0f766e", "#164e63"], "gears", "A data ethicist hunts the invisible system predicting the city before it happens.", page("Dr. Imani Rao is hired to audit a civic algorithm that claims it can prevent disasters. Its forecasts are eerily precise, down to the minute and the street corner.", "Then the system predicts a fire in a building that does not exist. Imani follows the anomaly through deleted records and discovers the model has been trained on decisions people never knew they made.", "With one forecast left before the city locks itself down, Imani has to teach a machine the value of uncertainty—and convince humans to listen.")],
  ["Salt & Starlight", "Nora Bell", 2022, "Fantasy", ["#0c4a6e", "#6d28d9"], "wave", "A mapmaker sails beyond the known currents to return a stolen constellation.", page("Every map Sera draws changes the coastline by a finger's width. The royal court calls it a gift; the sailors call it a curse.", "When a constellation vanishes from the sky, the sea rises to fill its empty place. Sera joins a crew of smugglers who navigate by songs instead of stars.", "At the edge of the world she finds the constellation trapped in a glass compass, and learns that returning it may erase the island where she was born.")],
  ["A Room Full of Echoes", "Dev Malhotra", 2021, "Contemporary Fiction", ["#7f1d1d", "#92400e"], "mask", "Three strangers inherit a recording studio and the unfinished song that connects them.", page("Maya arrives to sell her late uncle's studio and meets two people with the same key. None of them knew the others existed.", "In the control room they find taped conversations, each ending just before a confession. The voices belong to people who changed their lives without ever meeting them.", "As the final track takes shape, the three heirs discover that listening closely can be its own kind of inheritance.")],
  ["The Orchard at Dawn", "Clara Moss", 2020, "Historical Drama", ["#365314", "#a16207"], "floral", "During a drought, a young botanist protects an orchard carrying a family's last secret.", page("In 1936, Elsie arrives in a valley where the apple trees flower without rain. The orchard's owner refuses every offer to sell, even as the dust storms gather.", "Elsie finds letters hidden beneath the roots, written by women who used the orchard as a meeting place when meetings were forbidden.", "To keep the trees alive, Elsie must choose between a scientific breakthrough and the promise those women trusted her to keep.")],
  ["Northbound, Slowly", "Jonas Reed", 2024, "Adventure", ["#1e3a8a", "#0f766e"], "globe", "A burnt-out photographer takes the last coastal train and finds a town waiting for one picture.", page("Cal boards the northbound train with one camera, no assignment, and a ticket bought to avoid going home. Every stop seems quieter than the last.", "At the end of the line, he meets a village preparing for a festival no outsider has ever photographed. Its rules are simple: arrive alone, leave changed.", "When the weather turns, Cal's final frame becomes a rescue plan—and proof that some journeys only begin after the timetable ends.")],
  ["The Clockmaker's Sparrow", "Iris Rowan", 2023, "Middle Grade Fantasy", ["#9a3412", "#b45309"], "gears", "A clever apprentice and a mechanical bird race to stop time from being sold by the hour.", page("Twelve-year-old Pavi can fix any clock except the broken tower at the centre of town. Inside it, she finds a brass sparrow that speaks in riddles.", "The sparrow reveals that the mayor has been collecting spare minutes from every household. Soon nobody remembers how to rest, play, or dream.", "Pavi and her tiny guide climb through the clockwork before midnight, where she learns the bravest repair is sometimes letting something run free.")],
  ["The Ember Archive", "Priya Nair", 2025, "Fantasy", ["#7f1d1d", "#ea580c"], "bolt", "In a library where every book read burns one of the reader's own memories, an apprentice discovers her name already written in the ash ledger.", page("Tamsin arrives at the Ember Archive expecting dust and quiet cataloguing work. Instead she finds a reading room where every finished book leaves a pile of warm grey ash—and a ledger recording exactly what the reader forgot to pay.", "Her mentor insists the trade is fair: a first kiss for a war memoir, a childhood summer for a forbidden spellbook. But when Tamsin reads the oldest volume, the ash spells out a memory she has not lost yet.", "To learn why her name sits in the ledger, Tamsin must open the one book no keeper survives—unless she can teach the fire to take the archive's secrets instead of hers.")],
  ["Signals from the Deep", "Marcus Chen", 2023, "Science Fiction", ["#134e4a", "#1e3a8a"], "wave", "A deep-sea acoustics crew detects a structured signal rising from a trench where no life should exist.", page("Station Kestrel listens to the ocean for shipping noise and earthquakes. On the night of the storm, its hydrophones record something else: thirty-two tones repeating every eleven minutes, from four kilometres below.", "Engineer Rosa Lin traces the signal to a trench the last survey declared empty rock. Each dive brings the pattern closer to language, and each translation attempt costs the station power it cannot spare.", "When the surface orders Kestrel abandoned before the next typhoon, Rosa must choose between the rescue sub and staying behind to answer a question the deep has waited millennia to ask.")],
  ["The Night Garden", "Amara Okafor", 2021, "Gothic Mystery", ["#166534", "#052e16"], "bat", "A young botanist inherits a walled garden whose flowers bloom only after dark—and keep the estate's oldest promise.", page("Isolde inherits Vell House along with its locked garden and a single instruction from the will: never bring lamplight past the gate. On her first moonlit walk, the flowerbeds open like slow applause.", "The night-blooms seem to answer questions no one has asked aloud, and the village remembers her great-aunt as a woman who never aged a day after 1911. Isolde's photographs keep developing with extra shadows standing behind her.", "To free the garden—or herself—Isolde must break the will's one rule on the longest night of the year, and learn which of the flowers has been keeping her family alive.")],
  ["Letters to Tomorrow", "Sofia Marchetti", 2024, "Romance Drama", ["#9d174d", "#581c87"], "floral", "A dead-letter clerk starts replying to mail postmarked fifty years in the future, and falls for a sender she cannot meet.", page("June sorts undeliverable mail for the city: torn addresses, vanished streets, grief with no forwarding line. One envelope arrives postmarked 2074, addressed simply to 'the person who needs it.'", "She answers. A reply comes the next morning, warmer, funnier, signed only with an initial. As the correspondence deepens, June realizes the letters quietly predict small tragedies she may still be able to prevent.", "When the future asks June for a sacrifice only the past can make, she must decide whether love means saving the world her correspondent describes—or making sure it never needs saving at all.")],
].map(([title, author, publishYear, genre, colors, motif, description, story], index) => ({
  title, author, publishYear, genre, description, story, pages: 224 + index * 18,
  coverImage: makeCover({ title, author, year: publishYear, genre, colors, motif }),
}));

try {
  await mongoose.connect(mongoDBURL);

  // Upsert by title + author instead of wiping the collection, so books the
  // user added through the app are never destroyed by a re-seed.
  let added = 0;
  let refreshed = 0;
  for (const book of library) {
    const result = await Book.updateOne(
      { title: book.title, author: book.author },
      { $set: book },
      { upsert: true }
    );
    if (result.upsertedCount) added += 1;
    else refreshed += 1;
  }

  const total = await Book.countDocuments();
  console.log(
    `Seed complete: ${added} new book(s) added, ${refreshed} refreshed, ${total} total in the library.`
  );
} finally {
  await mongoose.disconnect();
}
