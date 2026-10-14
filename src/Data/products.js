// All the instruments live here as an ARRAY of OBJECTS.
// Each object is one instrument. To add an instrument, copy one object, change the values,
// and give it a new unique id.
//
// Later, this same shape can come from a Supabase table instead (see SUPABASE.md).

export const products = [
    {
        id: "violin",
        category: "Strings / Violin",
        name: "HP Violin",
        price: 1000,
        description:
            "A warm, singing violin built for the concert stage. The spruce top gives it a bright voice, and the maple back keeps the low notes rich.",
        specs: [
            { label: "Size", value: "4/4 full size" },
            { label: "Top", value: "Aged spruce" },
            { label: "Back and Slides", value: "Flamed maple" },
            { label: "Fittings", value: "Ebony" },
            { label: "Body Length", value: "356 mm" },
            { label: "Weight", value: "440g" },
            { label: "Includes", value: "Bow, case, rosin" },
        ],
    },
    {
        id: "guitar",
        category: "Strings / Guitar",
        name: "Solace Classical Guitar",
        price: 480,
        description:
            "A nylon-string guitar with a soft, round tone. Easy on the fingertips, which makes it a good pick for beginners and fingerstyle players alike.",
        specs: [
            { label: "Top", value: "Solid cedar" },
            { label: "Back and Sides", value: "Rosewood" },
            { label: "Neck", value: "Mahogany" },
            { label: "Scale Length", value: "650 mm" },
            { label: "Strings", value: "Nylon" },
            { label: "Weight", value: "1.7 kg" },
            { label: "Includes", value: "Gig bag, strap" },
        ],
    },
    {
        id: "kalimba",
        category: "Percussion / Kalimba",
        name: "Lumen Kalimba",
        price: 85,
        description:
            "A 17-key thumb piano with a gentle, music-box tone. Tuned to C major, so every note you pluck sounds good together.",
        specs: [
            { label: "Keys", value: "17, tuned to C major" },
            { label: "Body", value: "Solid mahogany" },
            { label: "Key Material", value: "Spring steel" },
            { label: "Size", value: "18 x 11 cm" },
            { label: "Weight", value: "340 g" },
            { label: "Includes", value: "Tuning hammer, pouch" },
        ],
    },
    {
        id: "flute",
        category: "Wind / Flute",
        name: "Sora Bamboo Flute",
        price: 120,
        description:
            "A side-blown flute carved from one stalk of seasoned bamboo. The tone is airy and bright, and the six finger holes are easy to learn.",
        specs: [
            { label: "Key", value: "D" },
            { label: "Material", value: "Seasoned bamboo" },
            { label: "Finger Holes", value: "6" },
            { label: "Length", value: "420 mm" },
            { label: "Weight", value: "75 g" },
            { label: "Includes", value: "Cloth sleeve, cleaning rod" },
        ],
    },
    {
        id: "handpan",
        category: "Percussion / Handpan",
        name: "Nocturne Handpan",
        price: 1650,
        description:
            "A hand-tuned steel drum with eight note fields and a center ding. It rings for a long time, so even a few slow taps sound full.",
        specs: [
            { label: "Scale", value: "D minor, 9 notes" },
            { label: "Material", value: "Nitrided steel" },
            { label: "Diameter", value: "53 cm" },
            { label: "Weight", value: "5.2 kg" },
            { label: "Tuning", value: "440 Hz" },
            { label: "Includes", value: "Padded case, stand" },
        ],
    },
];
